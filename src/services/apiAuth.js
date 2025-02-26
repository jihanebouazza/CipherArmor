import { addVault } from "./apiVaults";
import supabase from "./supabase";

export async function signup({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { fullName },
    },
  });

  if (error) throw new Error(error.message);

  await addVault({
    vault: {
      name: "Default",
      description: "Generic vault for miscellaneous accounts.",
    },
    user_id: data.user.id,
  });

  return data;
}

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw new Error(error.message);

  return data;
}

export async function getCurrentUser() {
  // to get data from localStorage
  const { data: session } = await supabase.auth.getSession();

  //  if the session doesn't exist return
  if (!session.session) return null;

  // if the session exists get the user data
  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function forgotPassword(email) {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email);

  if (error) throw new Error(error.message);

  return data;
}

export async function resetPassword({ token, password }) {
  // Update user with the password reset token
  const { data, error } = await supabase.auth.updateUser(
    { password },
    { accessToken: token },
  );

  if (error) throw new Error(error.message);

  return data;
}

export async function updateAccount(updateData) {
  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) {
    if (error.message.includes("rate limit")) {
      throw new Error("Too many attempts. Please try again later.");
    }
    throw new Error(error.message);
  }

  return data;
}

export async function updatePassword(password) {
  const { data, error } = await supabase.auth.updateUser({
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function verifyEmailChange(emailChangeData) {
  const { data, error } = await supabase.auth.verifyOtp(emailChangeData);

  if (error) throw new Error(error.message);

  return data;
}
