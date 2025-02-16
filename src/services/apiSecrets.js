import supabase from "./supabase";

export async function getSecretStatus(userId) {
  if (!userId) return false;

  const { data, error } = await supabase
    .from("user_secrets")
    .select("user_id")
    .eq("user_id", userId);

  if (error) throw new Error(error.message);

  return !!data.length;
}

export async function addSecret(userSecret) {
  const { data, error } = await supabase
    .from("user_secrets")
    .insert([userSecret])
    .select();

  if (error) throw new Error(error.message);

  return data;
}

export async function getSecret(userId) {
  const { data: secret, error } = await supabase
    .from("user_secrets")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error) throw new Error(error.message);

  return secret;
}
