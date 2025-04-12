import AchievementProgress from "./AchievementProgress";
import DashboardBox from "./DashboardBox";
import PasswordHealthChart from "./PasswordHealthChart";

function HealthAndAchievements() {
  return (
    <DashboardBox extraStyles="col-span-4 row-span-3 flex flex-col justify-between gap-3 px-5 py-4 lg:col-span-4">
      <div className="flex items-center justify-center">
        <PasswordHealthChart />
      </div>
      <div className="divide-charcoal-400 divide-y-1">
        <h4 className="font-heading dark:text-charcoal-100 pb-2 text-xl font-semibold">
          Achievements
        </h4>
        <AchievementProgress
          title="Just Getting Started"
          percentage="20%"
          progressLabel="2/10"
          description="Save 10 passwords."
          barColor="bg-ruby-500"
          titleColor="text-ruby-500"
        />
        <AchievementProgress
          title="Cyber Guardian"
          percentage="50%"
          progressLabel="50%"
          description="Reach 75% password health."
          barColor="bg-rust-500"
          titleColor="text-rust-500"
        />
        <AchievementProgress
          title="Needs Work"
          percentage="45%"
          progressLabel="45%"
          description="Achieve 50% strong passwords."
          barColor="bg-butter-600"
          titleColor="text-butter-600"
        />
      </div>
    </DashboardBox>
  );
}

export default HealthAndAchievements;
