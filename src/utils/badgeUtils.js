export function checkCondition(type, value, stats) {
  switch (type) {
    case "min_password_health":
      return stats.password_health >= value;

    case "password_health_equals":
      return stats.password_health === value;

    case "all_unique_and_strong":
      return (
        stats.reused_count === 0 &&
        stats.weak_count === 0 &&
        stats.moderate_count === 0
      );

    case "max_breach_count":
      return stats.breach_count <= value;

    case "safe_percent":
      return stats.safe_percent === value;

    case "no_weak_or_reused":
      return stats.weak_count === 0 && stats.reused_count === 0;

    case "min_vault_count":
      return stats.vault_count >= value;

    case "min_total_passwords":
      return stats.total_count >= value;

    case "passwords_updated_days":
      return stats.max_password_age <= value.max_days;

    case "vaults_and_passwords":
      return (
        stats.vault_count >= value.min_vaults &&
        stats.total_count >= value.min_passwords
      );

    default:
      return false;
  }
}
