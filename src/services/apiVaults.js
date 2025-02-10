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

  // if (error) throw new Error("Vault could not be added.");
  if (error) throw new Error(error.message);

  return data;
}

export async function deleteVault() {}

export async function editVault() {}
