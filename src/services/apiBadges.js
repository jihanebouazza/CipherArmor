import { checkCondition } from "../utils/badgeUtils";
import supabase from "./supabase";

export async function getBadges() {
  const { data, error, count } = await supabase
    .from("badges")
    .select("*", { count: "exact" });
  if (error) throw new Error("Vaults could not be loaded.");

  return { data, count };
}

export async function checkAndAwardBadges(userId, stats) {
  const { data: allBadges, error: allBadgesError } = await supabase
    .from("badges")
    .select("*");

  if (allBadgesError) throw new Error("Badges could not be loaded.");

  const { data: earnedBadges, error: earnedBadgesError } = await supabase
    .from("user_badges")
    .select("badge_id")
    .eq("user_id", userId);

  if (earnedBadgesError) throw new Error("Earned badges could not be loaded.");

  const earnedIds = new Set((earnedBadges || []).map((b) => b.badge_id));

  for (const badge of allBadges || []) {
    if (earnedIds.has(badge.id)) continue;

    const passed = checkCondition(
      badge.condition_type,
      badge.condition_value,
      stats,
    );

    if (passed) {
      await supabase.from("user_badges").insert({
        user_id: userId,
        badge_id: badge.id,
      });
    }
  }
}
