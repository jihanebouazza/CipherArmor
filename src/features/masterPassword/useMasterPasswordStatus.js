import { useQuery } from "@tanstack/react-query";
import { getMasterPasswordStatus } from "../../services/apiMasterPassword";

export function useMasterPasswordStatus(userId) {
  const { data: hasMasterPassword, isPending } = useQuery({
    queryKey: ["masterPassword", userId],
    queryFn: () => getMasterPasswordStatus(userId),
  });

  return { hasMasterPassword, isPending };
}
