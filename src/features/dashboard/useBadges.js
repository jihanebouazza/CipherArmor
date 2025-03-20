import { useQuery } from "@tanstack/react-query";
import { getBadges } from "../../services/apiBadges";

export function useBadges() {
  const { data: { data: badges, count } = {}, isPending } = useQuery({
    queryKey: ["badges"],
    queryFn: getBadges,
  });

  return { badges, count, isPending };
}
