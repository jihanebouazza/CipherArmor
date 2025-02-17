import supabase from "./supabase";

export async function getPasswords() {
  const { data, error } = await supabase
    .from("passwords")
    .select("*, vaults(name)");

  if (error) throw new Error(error.message);

  return data;
}

export async function addPassword(password) {
  const { data, error } = await supabase
    .from("passwords")
    .insert([password])
    .select();

  if (error) throw new Error(error.message);

  return data;
}

export async function deletePassword() {}

export async function editPassword() {}

// Check password against HIBP API
export async function checkPasswordBreach(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-1", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
    .toUpperCase();

  const prefix = hashHex.substring(0, 5);
  const suffix = hashHex.substring(5);

  try {
    const response = await fetch(
      `https://api.pwnedpasswords.com/range/${prefix}`,
    );
    const results = await response.text();
    return results.includes(suffix);
  } catch (error) {
    console.error("Breach check failed:", error);
    return false;
  }
}
