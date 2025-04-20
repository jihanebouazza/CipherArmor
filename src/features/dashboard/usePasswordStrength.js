import { useMemo } from "react";
import { usePasswordStats } from "./usePasswordsStats";
import { getStrength } from "../../utils/passwordUtils";

const STRENGTH_ORDER = [
  "Very Strong",
  "Strong",
  "Resilient",
  "Moderate",
  "Weak",
];

export function usePasswordStrength() {
  const { passwordsStats, isPending, count } = usePasswordStats();

  const { labels, counts, percentages } = useMemo(() => {
    // Initialize empty structure for all strength categories
    const initialData = STRENGTH_ORDER.reduce(
      (acc, strength) => {
        acc.counts[strength] = 0;
        acc.percentages[strength] = 0;
        return acc;
      },
      { counts: {}, percentages: {} },
    );

    if (!passwordsStats || passwordsStats.length === 0) {
      return {
        labels: [],
        counts: initialData.counts,
        percentages: initialData.percentages,
      };
    }

    // Calculate counts
    const labels = passwordsStats.map((p) => getStrength(p.score).strength);
    const counts = labels.reduce((acc, strength) => {
      acc[strength] = (acc[strength] || 0) + 1;
      return acc;
    }, {});

    // Calculate percentages
    const totalPasswords = count || 1; // Prevent division by zero
    const percentages = STRENGTH_ORDER.reduce((acc, strength) => {
      const categoryCount = counts[strength] || 0;
      acc[strength] = Number(
        ((categoryCount / totalPasswords) * 100).toFixed(1),
      );
      return acc;
    }, {});

    // Ensure order for counts
    const orderedCounts = STRENGTH_ORDER.reduce((acc, strength) => {
      acc[strength] = counts[strength] || 0;
      return acc;
    }, {});

    return {
      labels,
      counts: orderedCounts,
      percentages,
    };
  }, [passwordsStats, count]); // Add count as dependency

  return {
    strengthLabels: labels,
    strengthCounts: counts,
    strengthPercentages: percentages,
    passwordsCount: count,
    passwordsStats,
    isPending,
  };
}
