import supabase from "./supabase";

export async function getMasterPasswordStatus(userId) {
  if (!userId) return false;

  const { data, error } = await supabase
    .from("user_secrets")
    .select("user_id")
    .eq("user_id", userId);

  if (error) throw new Error(error.message);

  return !!data.length;
}

export async function addMasterPassword(userSecret) {
  console.log(userSecret.user_id)
  const { data, error } = await supabase
    .from("user_secrets")
    .insert([userSecret])
    .select();

  if (error) throw new Error(error.message);

  return data;
}
