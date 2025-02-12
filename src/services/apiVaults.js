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

export async function editVault({ id, user_id, vault }) {
  console.log(vault)
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
