import StatBlock from "./StatBlock";
import MiniStat from "./MiniStat";
import { useAllVaults } from "../vaults/useAllVaults";
import { useDashboardStats } from "../../contexts/DashboardStatsContext ";

function DashboardStats() {
  const {
    isPendingPasswords,
    passwordsCount,
    breachedPasswords,
    reusedPasswords,
    strengthCounts,
    safePercent,
    robustPasswords,
  } = useDashboardStats();

  const {
    vaults,
    count: vaultsCount,
    isPending: isPendingVaults,
  } = useAllVaults();

  const weakPasswords = strengthCounts["Weak"];
  const emptyVaults = vaults?.filter((v) => v.password_count === 0).length;
  const emptyVaultsPercentage = Math.round((emptyVaults * 100) / vaultsCount);

  return (
    <>
      <StatBlock
        title="Vaults total"
        count={vaultsCount}
        percentage={Math.round(emptyVaultsPercentage) || 0}
        detailText="are empty"
        linkTo="/vaults"
        inverseColor
        isPending={isPendingVaults}
      />
      <StatBlock
        title="Passwords total"
        count={passwordsCount}
        percentage={Math.round(safePercent) || 0}
        detailText="are safe"
        linkTo="/passwords"
        isPending={isPendingPasswords}
      />

      <MiniStat
        title="Robust"
        count={robustPasswords}
        percentage={50}
        isPending={isPendingPasswords}
      />
      <MiniStat
        title="Reused"
        count={reusedPasswords}
        percentage={20}
        isPending={isPendingPasswords}
      />
      <MiniStat
        title="Weak"
        count={weakPasswords}
        percentage={20}
        isPending={isPendingPasswords}
      />
      <MiniStat
        title="Leaked"
        count={breachedPasswords}
        percentage={80}
        isPending={isPendingPasswords}
      />
    </>
  );
}

export default DashboardStats;
