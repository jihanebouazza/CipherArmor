export function getPasswordCountAchievement(count) {
  if (count < 5)
    return {
      title: "Just Getting Started",
      goal: 10,
      barColor: "bg-ruby-500",
      titleColor: "text-ruby-500",
    };
  if (count < 10)
    return {
      title: "Growing Collection",
      goal: 10,
      barColor: "bg-butter-600",
      titleColor: "text-butter-600",
    };
  return {
    title: "Password Pro",
    goal: 10,
    barColor: "bg-mint-500",
    titleColor: "text-mint-500",
  };
}

export function getPasswordHealthAchievement(health) {
  if (health <= 50)
    return {
      title: "Security Rookie",
      goal: 75,
      barColor: "bg-ruby-500",
      titleColor: "text-ruby-500",
    };
  if (health < 75)
    return {
      title: "Cyber Guardian",
      goal: 75,
      barColor: "bg-butter-600",
      titleColor: "text-butter-600",
    };
  return {
    title: "Unbreakable",
    goal: 75,
    barColor: "bg-mint-500",
    titleColor: "text-mint-500",
  };
}

export function getSafePasswordsAchievement(safePercent) {
  if (safePercent === 100)
    return {
      title: "Fort Knox",
      goal: 100,
      barColor: "bg-ruby-500",
      titleColor: "text-ruby-500",
    };
  if (safePercent >= 80)
    return {
      title: "Getting There",
      goal: 100,
      barColor: "bg-butter-600",
      titleColor: "text-butter-600",
    };
  return {
    title: "Needs Work",
    goal: 100,
    barColor: "bg-mint-500",
    titleColor: "text-mint-500",
  };
}

export function getProgress(num, goal) {
  if (!goal || goal <= 0) return 0;
  return Math.min(100, Math.round((num / goal) * 100));
}
