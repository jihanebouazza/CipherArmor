import { useQuery } from "@tanstack/react-query";
import { getAllVaults } from "../../services/apiVaults";

export function useAllVaults() {
  const { data: { data: vaults, count } = {}, isPending } = useQuery({
    queryKey: ["vaults"],
    queryFn: getAllVaults,
  });

  return { vaults, count, isPending };
}
