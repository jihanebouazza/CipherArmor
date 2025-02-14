import { useQuery } from "@tanstack/react-query";
import { fetchPlatformIcon } from "../../services/apiIcons";

export function usePlatformIcon(platformName, color) {
  const {
    data: icon,
    error: iconError,
    isPending: isLoadingIcon,
  } = useQuery({
    queryKey: ["platformIcon", platformName, color],
    queryFn: () => fetchPlatformIcon(platformName, color),
    retry: 1, // Retry once before showing error
  });

  return { icon, iconError, isLoadingIcon };
}
