import ContainerLoader from "../../ui/ContainerLoader";
import { useUser } from "../authentication/useUser";
import DashboardHeader from "./DashboardHeader";
import PasswordsByVaultChart from "./PasswordsByVaultChart";
import PasswordStatusChart from "./PasswordStatusChart";
import PasswordGenerator from "./PasswordGenerator";
import PasswordAgeChart from "./PasswordAgeChart";
import StatBlock from "./StatBlock";
import MiniStat from "./MiniStat";
import HealthAndAchievements from "./HealthAndAchievements";
import DashboardBadges from "./DashboardBadges";

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
        <StatBlock
          title="Vaults total"
          count={20}
          percentage={20}
          detailText="are empty"
          linkTo="/vaults"
        />
        <StatBlock
          title="Passwords total"
          count={15}
          percentage={60}
          detailText="are safe"
          linkTo="/passwords"
        />

        <MiniStat title="Strong" count={40} percentage={50} />
        <MiniStat title="Reused" count={150} percentage={20} />
        <MiniStat title="Weak" count={40} percentage={20} />
        <MiniStat title="Leaked" count={10} percentage={80} />

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
