import { useQuery } from "@tanstack/react-query";
import { getDetailedEarnedBadges } from "../../services/apiBadges";

export function useDetailedEarnedBadges(userId) {
  const { data: { data: earnedBadges, count } = {}, isPending } = useQuery({
    queryKey: ["earnedBadges"],
    queryFn: () => getDetailedEarnedBadges(userId),
  });

  return { earnedBadges, count, isPending };
}
