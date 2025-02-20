import { useQuery } from "@tanstack/react-query";
import { getVaults } from "../../services/apiVaults";
import { useSearchParams } from "react-router";

export function useVaults() {
  const [searchParams] = useSearchParams();

  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const { data: { data: vaults, count } = {}, isPending } = useQuery({
    queryKey: ["vaults", page],
    queryFn: () => getVaults({ page }),
  });

  return { vaults, count, isPending };
}
