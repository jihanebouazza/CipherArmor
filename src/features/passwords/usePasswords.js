import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getPasswords } from "../../services/apiPasswords";
import { useSearchParams } from "react-router";
import { PAGE_SIZE } from "../../utils/constants";

export function usePasswords() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const filterValue = searchParams.get("vault");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "vault_id", value: filterValue };

  const sortByRaw = searchParams.get("sortBy") || "created_at-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  const {
    data: { data: passwords, count } = {},
    isPending: isPendingPasswords,
  } = useQuery({
    queryKey: ["passwords", page, filter, sortBy],
    queryFn: () => getPasswords({ page, filter, sortBy }),
  });

  // PRE-FETCHING
  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["passwords", filter, sortBy, page + 1],
      queryFn: () => getPasswords({ filter, sortBy, page: page + 1 }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["passwords", filter, sortBy, page - 1],
      queryFn: () => getPasswords({ filter, sortBy, page: page - 1 }),
    });

  return { passwords, count, isPendingPasswords };
}
