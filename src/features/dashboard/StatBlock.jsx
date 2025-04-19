import { Link } from "react-router";
import DashboardBox from "./DashboardBox";
import { HiOutlineChevronRight } from "react-icons/hi2";
import DashboardLoader from "./DashboardLoader";

function StatBlock({
  title,
  count,
  percentage,
  detailText,
  linkTo,
  inverseColor = false,
  isPending,
}) {
  
  if (isPending)
    return (
      <DashboardBox extraStyles="col-span-4 flex h-28 flex-col justify-between px-4 py-3 md:col-span-2 lg:h-[132px] xl:h-28">
        <DashboardLoader />
      </DashboardBox>
    );

  return (
    <DashboardBox extraStyles="col-span-4 flex h-28 flex-col justify-between px-4 py-3 md:col-span-2 lg:h-[132px] xl:h-28">
      <p className="font-heading text-lg font-medium lg:text-base xl:text-lg">
        {title}
      </p>
      <h2 className="text-2xl leading-none font-light md:text-[32px] lg:text-2xl xl:text-[32px] 2xl:text-4xl">
        {count}
      </h2>
      <div className="flex items-end justify-between gap-1 leading-5 lg:items-center xl:items-end">
        <p
          className={`${(inverseColor ? percentage < 50 : percentage > 50) ? "text-mint-500" : "text-ruby-500"}`}
        >
          {percentage}%{" "}
          <span className="text-charcoal-700 dark:text-charcoal-200 text-sm">
            {detailText}
          </span>
        </p>
        <Link to={linkTo}>
          <span className="bg-ocean-700 inline-flex items-center justify-center rounded-lg p-1">
            <HiOutlineChevronRight
              size={18}
              className="text-ocean-100 inline rounded-lg"
            />
          </span>
        </Link>
      </div>
    </DashboardBox>
  );
}

export default StatBlock;
