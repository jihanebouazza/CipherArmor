import { useQuery } from "@tanstack/react-query";
import { getPasswords } from "../../services/apiPasswords";
import { useSearchParams } from "react-router";

export function usePasswords() {
  const [searchParams] = useSearchParams();

  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const filterValue = searchParams.get("vault");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "vault_id", value: filterValue, };

  const {
    data: { data: passwords, count } = {},
    isPending: isPendingPasswords,
  } = useQuery({
    queryKey: ["passwords", page, filter],
    queryFn: () => getPasswords({ page, filter }),
  });

  return { passwords, count, isPendingPasswords };
}
