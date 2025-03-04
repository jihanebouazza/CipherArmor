import { HiOutlineInformationCircle } from "react-icons/hi2";
import Tooltip from "../../ui/Tooltip";
import StrengthTooltip from "./StrengthTooltip";

export default function StrengthCell({ analysis }) {
  const {
    strength = "",
    background = "",
    description = "",
  } = analysis?.strengthInfo || {};

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1.5">
        <div className={`h-2 w-2 rounded-full ${background}`}></div>
        <p>{analysis?.score}%</p>
      </div>
      <Tooltip>
        <Tooltip.Trigger isButton>
          <button>
            <HiOutlineInformationCircle
              size={20}
              className="text-charcoal-600 dark:text-charcoal-100 cursor-pointer"
            />
          </button>
        </Tooltip.Trigger>
        <Tooltip.Content>
          <StrengthTooltip
            analysis={analysis}
            strength={strength}
            description={description}
          />
        </Tooltip.Content>
      </Tooltip>
    </div>
  );
}
