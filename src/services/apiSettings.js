import supabase from "./supabase";

export async function updateAccount(updateData) {
  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) {
    if (
      error.message.includes("rate limit") ||
      error.message.includes("For security purposes")
    ) {
      throw new Error("Too many attempts. Please try again later.");
    }
    throw new Error(error.message);
  }

  return data;
}

export async function updatePassword({ oldPassword, password, email }) {
  const { error: signInError } = await supabase.auth.signInWithPassword({
    email,
    password: oldPassword,
  });

  if (signInError) {
    throw new Error("Incorrect old password. Please try again.");
  }

  const { data, error: updateError } = await supabase.auth.updateUser({
    password,
  });

  if (updateError) throw new Error(updateError.message);

  return data;
}
