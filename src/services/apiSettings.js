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

export async function deleteUser() {
  const { error } = await supabase.rpc("delete_user");

  if (error) {
    throw new Error(error.message);
  }

  return null;
}

export async function deactivateAccount(userId) {
  const { error } = await supabase
    .from("profiles")
    .update({
      is_active: false,
      deactivated_at: new Date().toISOString(),
    })
    .eq("id", userId);

  if (error) throw new Error(error.message);

  return null;
}

export async function reactivateAccount(userId) {
  const { error: updateError } = await supabase
    .from("profiles")
    .update({
      is_active: true,
      deactivated_at: null,
    })
    .eq("id", userId);

  if (updateError) throw updateError;

  return null;
}

export async function checkEligibility(userId) {
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("deactivated_at, is_active")
    .eq("id", userId)
    .single();

  if (error) throw new Error(error.message);

  // Return immediately if account is active
  if (profile.is_active) {
    return { is_active: true };
  }

  // Check reactivation cooldown
  const cooldown = 24 * 60 * 60 * 1000; // 24 hours
  const deactivationTime = new Date(profile.deactivated_at).getTime();
  const timeSinceDeactivation = Date.now() - deactivationTime;

  if (timeSinceDeactivation < cooldown) {
    const hoursRemaining = Math.ceil(
      (cooldown - timeSinceDeactivation) / 3600000,
    );
    throw new Error(`Account can be reactivated in ${hoursRemaining} hours.`);
  }

  return { is_active: false, eligible: true };
}