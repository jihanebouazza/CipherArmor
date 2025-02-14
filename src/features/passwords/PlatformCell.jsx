import { Link } from "react-router";
import PlatformIcon from "../../ui/PlatformIcon";
import { HiOutlineLink } from "react-icons/hi2";

function PlatformCell({ platformName, platformUrl }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex gap-2">
        <PlatformIcon platformName={platformName} />
        <p>{platformName}</p>
      </div>
      <Link to={platformUrl} target="_blank" rel="noopener noreferrer">
        <HiOutlineLink
          size={18}
          className="text-charcoal-600 dark:text-charcoal-100"
        />
      </Link>
    </div>
  );
}

export default PlatformCell;
