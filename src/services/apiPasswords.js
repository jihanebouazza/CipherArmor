import { PAGE_SIZE } from "../utils/constants";
import supabase from "./supabase";

export async function getPasswords({ page, filter, sortBy }) {
  let query = supabase
    .from("passwords")
    .select("*, vaults(id, name)", { count: "exact" });

  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    query = query.range(from, to);
  }

  if (filter) {
    query = query[filter.method || "eq"](filter.field, filter.value);
  }

  if (sortBy) {
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    });
  }

  const { data, count, error } = await query;

  if (error) throw new Error(error.message);

  return { data, count };
}

export async function addPassword(password) {
  const { data, error } = await supabase
    .from("passwords")
    .insert([password])
    .select();

  if (error) throw new Error("Password could not be added.");

  return data;
}

export async function deletePassword({ id, user_id }) {
  const { data, error } = await supabase
    .from("passwords")
    .delete()
    .eq("id", id)
    .eq("user_id", user_id);

  if (error) throw new Error("Password could not be deleted.");

  return data;
}

export async function editPassword({ updatedPassword, id, user_id }) {
  const { data, error } = await supabase
    .from("passwords")
    .update(updatedPassword)
    .eq("id", id)
    .eq("user_id", user_id)
    .select();

  if (error) throw new Error("Password could not be updated.");

  return data;
}

// Check password against HIBP API
export async function checkPasswordBreach(password) {
  password = password.trim();
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

export async function getPasswordsStats() {
  const { data, count, error } = await supabase
    .from("passwords")
    .select("is_reused, is_breached, score, created_at, last_updated", { count: "exact" });

  if (error) throw new Error("Password stats could not be loaded.");

  return { data, count };
}
