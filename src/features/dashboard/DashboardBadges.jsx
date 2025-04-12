import AllBadges from "./AllBadges";
import BadgeTracker from "./BadgeTracker";
import DashboardBox from "./DashboardBox";

function DashboardBadges() {
  return (
    <DashboardBox extraStyles="col-span-4 row-span-2 px-4 py-3 md:col-span-1 lg:col-span-2">
      <div className="flex items-center justify-between">
        <h4 className="font-heading dark:text-charcoal-100 pb-1 text-xl font-semibold">
          Badges
        </h4>
        <AllBadges />
      </div>
      <div>
        <BadgeTracker />
      </div>
    </DashboardBox>
  );
}

export default DashboardBadges;
