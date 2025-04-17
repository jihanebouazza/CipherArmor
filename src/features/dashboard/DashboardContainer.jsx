import ContainerLoader from "../../ui/ContainerLoader";
import { useUser } from "../authentication/useUser";
import DashboardHeader from "./DashboardHeader";
import PasswordsByVaultChart from "./PasswordsByVaultChart";
import PasswordStatusChart from "./PasswordStatusChart";
import PasswordGenerator from "./PasswordGenerator";
import PasswordAgeChart from "./PasswordAgeChart";
import HealthAndAchievements from "./HealthAndAchievements";
import DashboardBadges from "./DashboardBadges";
import DashboardStats from "./DashboardStats";

function DashboardContainer() {
  const { user, isPending } = useUser();

  if (isPending) return <ContainerLoader />;

  return (
    <>
      <DashboardHeader title="Dashboard">
        Welcome back,{" "}
        <span className="capitalize">{user?.user_metadata?.fullName}!</span>
        <br />
        Let&apos;s see what&apos;s new.
      </DashboardHeader>
      <div className="grid w-full grid-flow-row grid-cols-4 grid-rows-[minmax(7rem,auto)_minmax(7rem,auto)] gap-3 rounded-2xl py-4 lg:grid-cols-12">
        <DashboardStats />

        <HealthAndAchievements />

        <PasswordsByVaultChart />

        <PasswordStatusChart />

        <PasswordAgeChart />

        <PasswordGenerator />

        <DashboardBadges />
      </div>
    </>
  );
}

export default DashboardContainer;
