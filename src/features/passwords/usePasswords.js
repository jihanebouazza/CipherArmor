import { useQuery } from "@tanstack/react-query";
import { getPasswords } from "../../services/apiPasswords";

export function usePasswords() {
  const { data: passwords, isPending: isPendingPasswords } = useQuery({
    queryKey: ["passwords"],
    queryFn: getPasswords,
  });
  
  return { passwords, isPendingPasswords };
}
