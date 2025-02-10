import { useQuery } from "@tanstack/react-query";
import { getVaults } from "../../services/apiVaults";

export function useVaults() {
  const { data: vaults, isPending } = useQuery({
    queryKey: ["vaults"],
    queryFn: getVaults,
  });
  return { vaults, isPending };
}
