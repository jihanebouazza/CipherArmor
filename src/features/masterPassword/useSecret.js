import { useQuery } from "@tanstack/react-query";
import { getSecret } from "../../services/apiSecrets";

export function useSecret(userId) {
  const { data: secret, isPending } = useQuery({
    queryKey: ["secrets", userId],
    queryFn: () => getSecret(userId),
  });

  return { secret, isPending };
}
