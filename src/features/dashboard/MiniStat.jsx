import { HiMiniChevronDoubleDown } from "react-icons/hi2";
import DashboardBox from "./DashboardBox";

function MiniStat({ title, count, percentage }) {
  return (
    <DashboardBox extraStyles="col-span-2 flex h-28 flex-col items-center justify-between py-3 md:col-span-1 lg:h-[132px] xl:h-28">
      <p className="text-charcoal-700 dark:text-charcoal-200 font-medium">
        {title}
      </p>
      <div className="bg-ocean-150 dark:bg-ocean-200 dark:text-ocean-900 text-ocean-800 rounded-xl px-2.5 font-medium">
        {count}
      </div>
      <div className="flex items-center">
        <HiMiniChevronDoubleDown size={12} />
        <p className="text-sm">{percentage}%</p>
      </div>
    </DashboardBox>
  );
}

export default MiniStat;
