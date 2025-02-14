import { formatDistanceToNowStrict } from "date-fns";

export function formatDate(isoString) {
  const date = new Date(isoString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatRelativeTime(timestamp) {
  if (!timestamp) return "Unknown";

  const date = new Date(timestamp); // Convert Supabase TIMESTAMPTZ to Date
  return formatDistanceToNowStrict(date, { addSuffix: true });
}
