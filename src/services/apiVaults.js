import { PAGE_SIZE } from "../utils/constants";
import supabase from "./supabase";

export async function getAllVaults() {
  let { data, count, error } = await supabase
    .from("vaults")
    .select("*", { count: "exact" });

  if (error) throw new Error("Vaults could not be loaded.");

  return { data, count };
}

export async function getVaults({ page }) {
  let query = supabase.from("vaults").select("*", { count: "exact" });

  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    query = query.range(from, to);
  }

  let { data, count, error } = await query;

  if (error) throw new Error("Vaults could not be loaded.");

  return { data, count };
}

export async function addVault({ vault, user_id }) {
  const { data, error } = await supabase
    .from("vaults")
    .insert([{ ...vault, user_id }])
    .select();

  if (error) throw new Error("Vault could not be added.");

  return data;
}

export async function deleteVault({ id, user_id }) {
  const { data, error } = await supabase
    .from("vaults")
    .delete()
    .eq("id", id)
    .eq("user_id", user_id);

  if (error) throw new Error("Vault could not be deleted.");

  return data;
}

export async function editVault({ id, user_id, vault }) {
  console.log(vault);
  const { data, error } = await supabase
    .from("vaults")
    .update(vault)
    .eq("id", id)
    .eq("user_id", user_id)
    .select();

  // if (error) throw new Error("Vault could not be updated.");
  if (error) throw new Error(error.message);

  return data;
}
