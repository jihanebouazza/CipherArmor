import supabase from "./supabase";

export async function getVaults() {
  let { data, error } = await supabase.from("vaults").select("*");

  if (error) throw new Error("Vaults could not be loaded.");

  return data;
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

export async function editVault() {}
