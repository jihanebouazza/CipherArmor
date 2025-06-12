import { createContext } from "react";
import { usePasswordStrength } from "../features/dashboard/usePasswordStrength";
import { useContext } from "react";
import { getMaxPasswordAge } from "../utils/passwordUtils";

const DashboardStatsContext = createContext();

function DashboardStatsProvider({ children }) {
  const {
    passwordsCount,
    isPending: isPendingPasswords,
    strengthPercentages,
    passwordsStats,
    strengthCounts,
  } = usePasswordStrength();

  const breachedPasswords = passwordsStats?.filter(
    (p) => p.is_breached === true,
  ).length;
  const breachedPasswordsPercent = (breachedPasswords * 100) / passwordsCount;

  const reusedPasswords = passwordsStats?.filter(
    (p) => p.is_reused === true,
  ).length;
  const reusedPasswordsPercent = (reusedPasswords * 100) / passwordsCount;

  const robustPasswords =
    strengthCounts["Very Strong"] +
    strengthCounts["Strong"] +
    strengthCounts["Resilient"];
  const safePercent = (robustPasswords * 100) / passwordsCount;

  const passwordHealth = Math.round(
    Math.max(
      0,
      Math.min(
        100,
        strengthPercentages["Very Strong"] * 1.4 +
          strengthPercentages["Strong"] * 1.2 +
          strengthPercentages["Resilient"] * 0.8 +
          strengthPercentages["Moderate"] * 0.5 -
          (strengthPercentages["Weak"] * 1.2 +
            reusedPasswordsPercent * 1.5 +
            breachedPasswordsPercent * 1.8),
      ),
    ),
  );

  const maxPasswordAge = getMaxPasswordAge(passwordsStats);

  return (
    <DashboardStatsContext.Provider
      value={{
        passwordHealth,
        robustPasswords,
        safePercent,
        strengthCounts,
        strengthPercentages,
        isPendingPasswords,
        breachedPasswords,
        breachedPasswordsPercent,
        reusedPasswords,
        reusedPasswordsPercent,
        passwordsCount,
        maxPasswordAge,
      }}
    >
      {children}
    </DashboardStatsContext.Provider>
  );
}

function useDashboardStats() {
  const context = useContext(DashboardStatsContext);
  if (context === undefined)
    throw new Error(
      "Dashboard Stats Context was used outside of Dashboard Stats Provider.",
    );
  return context;
}

export { DashboardStatsProvider, useDashboardStats };
