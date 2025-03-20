import supabase from "./supabase";

export async function getBadges() {
  const { data, error, count } = await supabase
    .from("badges")
    .select("*", { count: "exact" });
  if (error) throw new Error("Vaults could not be loaded.");

  return { data, count };
}
