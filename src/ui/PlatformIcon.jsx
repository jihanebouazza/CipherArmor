import { HiOutlineGlobeEuropeAfrica } from "react-icons/hi2";
import Loader from "./Loader";
import { usePlatformIcon } from "../features/icons/usePlatformIcon";

function PlatformIcon({ platformName, color }) {
  const { icon, iconError, isLoadingIcon } = usePlatformIcon(
    platformName,
    color,
  );

  if (isLoadingIcon)
    return <Loader secondColor="#fafbfd" borderWidth="3" width="20" />;

  if (iconError)
    return <HiOutlineGlobeEuropeAfrica className="text-charcoal-500 h-5 w-5" />;

  return <img className="h-5 w-5" src={icon} alt={`${platformName} icon`} />;
}

export default PlatformIcon;
