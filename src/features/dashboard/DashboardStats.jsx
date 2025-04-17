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

  return (
    <>
      <StatBlock
        title="Vaults total"
        count={vaultsCount}
        percentage={20}
        detailText="are empty"
        linkTo="/vaults"
      />
      <StatBlock
        title="Passwords total"
        count={passwordsCount}
        percentage={60}
        detailText="are safe"
        linkTo="/passwords"
      />

      <MiniStat title="Robust" count={robustPasswords} percentage={50} />
      <MiniStat title="Reused" count={reusedPasswords} percentage={20} />
      <MiniStat title="Weak" count={weakPasswords} percentage={20} />
      <MiniStat title="Leaked" count={breachedPasswords} percentage={80} />
    </>
  );
}

export default DashboardStats;
