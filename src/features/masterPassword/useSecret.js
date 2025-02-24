import { useQuery } from "@tanstack/react-query";
import { getSecret } from "../../services/apiSecrets";
import { useSecurity } from "../../contexts/SecurityContext";

export function useSecret(userId) {
  const { sessionNonce } = useSecurity();

  const { data: secret, isPending } = useQuery({
    queryKey: ["secrets", userId, sessionNonce],
    queryFn: () => getSecret(userId),
    retry: (failureCount, error) => {
      // Only retry on network errors
      return error.message.includes("Network") && failureCount < 3;
    },
    staleTime: 0, // Always fresh
  });

  return { secret, isPending };
}
