import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getVaults } from "../../services/apiVaults";
import { useSearchParams } from "react-router";
import { PAGE_SIZE } from "../../utils/constants";

export function useVaults() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const sortByRaw = searchParams.get("sortBy") || "created_at-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  const { data: { data: vaults, count } = {}, isPending } = useQuery({
    queryKey: ["vaults", page, sortBy],
    queryFn: () => getVaults({ page, sortBy }),
  });

  // PRE-FETCHING
  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["vaults", sortBy, page + 1],
      queryFn: () => getVaults({ sortBy, page: page + 1 }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["vaults", sortBy, page - 1],
      queryFn: () => getVaults({ sortBy, page: page - 1 }),
    });

  return { vaults, count, isPending };
}
