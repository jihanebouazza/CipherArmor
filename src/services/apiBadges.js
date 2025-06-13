import { checkCondition } from "../utils/badgeUtils";
import supabase from "./supabase";

export async function getBadges() {
  const { data, error, count } = await supabase
    .from("badges")
    .select("*", { count: "exact" });

  if (error) throw new Error("Vaults could not be loaded.");

  return { data, count };
}

export async function getEarnedBadges() {
  const { data, error, count } = await supabase
    .from("user_badges")
    .select("*", { count: "exact" });

  if (error) throw new Error("Earned badges could not be loaded.");

  return { data, count };
}

export async function addBadges(newBadgeEntries) {
  const { error } = await supabase.from("user_badges").insert(newBadgeEntries);

  if (error) throw new Error("Earned badges could not be added.");

  return null;
}

export async function checkAndAwardBadges(userId, stats) {
  const { data: allBadges } = await getBadges();

  const { data: earnedBadges } = await getEarnedBadges();

  const earnedIds = new Set((earnedBadges || []).map((b) => b.badge_id));

  const newBadgeEntries = [];

  for (const badge of allBadges || []) {
    if (earnedIds.has(badge.id)) continue;

    const passed = checkCondition(
      badge.condition_type,
      badge.condition_value,
      stats,
    );
    if (passed) {
      newBadgeEntries.push({ user_id: userId, badge_id: badge.id });
    }
  }

  if (newBadgeEntries.length > 0) {
    await addBadges(newBadgeEntries);
  }
}

export async function getDetailedEarnedBadges() {}
