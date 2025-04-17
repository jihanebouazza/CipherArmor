import { useQuery } from "@tanstack/react-query";
import { getPasswordsStats } from "../../services/apiPasswords";

export function usePasswordStats() {
  const { data: { data: passwordsStats, count } = {}, isPending } = useQuery({
    queryKey: ["passwords"],
    queryFn: getPasswordsStats,
  });

  return { passwordsStats, isPending, count };
}
