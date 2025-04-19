import { usePasswordStats } from "./usePasswordsStats";
import StatBlock from "./StatBlock";
import MiniStat from "./MiniStat";
import { getStrength } from "../../utils/passwordUtils";
import { useAllVaults } from "../vaults/useAllVaults";

function DashboardStats() {
  const {
    passwordsStats,
    isPending: isPendingPasswords,
    count: passwordsCount,
  } = usePasswordStats();
  const {
    vaults,
    count: vaultsCount,
    isPending: isPendingVaults,
  } = useAllVaults();

  const breachedPasswords = passwordsStats?.filter(
    (p) => p.is_breached === true,
  ).length;
  const reusedPasswords = passwordsStats?.filter(
    (p) => p.is_reused === true,
  ).length;

  const passwordsStrength = passwordsStats?.map(
    (p) => getStrength(p.score).strength,
  );

  const weakPasswords = passwordsStrength?.filter((p) => p === "Weak").length;
  const robustPasswords = passwordsStrength?.filter(
    (p) => p === "Very Strong" || p === "Strong" || p === "Resilient",
  ).length;
  const safePasswords = Math.round((robustPasswords * 100) / passwordsCount);

  const emptyVaults = vaults?.filter((v) => v.password_count === 0).length;
  const emptyVaultsPercentage = Math.round((emptyVaults * 100) / vaultsCount);

  return (
    <>
      <StatBlock
        title="Vaults total"
        count={vaultsCount}
        percentage={emptyVaultsPercentage}
        detailText="are empty"
        linkTo="/vaults"
        inverseColor
        isPending={isPendingVaults}
      />
      <StatBlock
        title="Passwords total"
        count={passwordsCount}
        percentage={safePasswords}
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
