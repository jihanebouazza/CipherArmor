import { useQuery } from "@tanstack/react-query";
import { getPasswords } from "../../services/apiPasswords";
import { useSearchParams } from "react-router";

export function usePasswords() {
  const [searchParams] = useSearchParams();

  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const {
    data: { data: passwords, count } = {},
    isPending: isPendingPasswords,
  } = useQuery({
    queryKey: ["passwords", page],
    queryFn: () => getPasswords({ page }),
  });

  return { passwords, count, isPendingPasswords };
}
