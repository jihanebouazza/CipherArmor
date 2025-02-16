import { useQuery } from "@tanstack/react-query";
import { getSecretStatus } from "../../services/apiSecrets";

export function useSecretStatus(userId) {
  const { data: hasMasterPassword, isPending } = useQuery({
    queryKey: ["secrets", userId],
    queryFn: () => getSecretStatus(userId),
  });

  return { hasMasterPassword, isPending };
}
