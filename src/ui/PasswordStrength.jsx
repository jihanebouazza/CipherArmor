import PasswordValidator from "./PasswordValidator";

function PasswordStrength({ strengthScore, passwordValidation }) {
  function getStrengthColor(score) {
    if (score <= 1) return "bg-ruby-500 dark:bg-ruby-600";
    if (score <= 2) return "bg-rust-500 dark:bg-rust-600";
    if (score === 3) return "bg-yellow-500 dark:bg-yellow-600";
    return "bg-mint-500 dark:bg-mint-600";
  }
  return (
    <div>
      <div
        className="bg-charcoal-200 my-2 h-1 w-full overflow-hidden rounded-full"
        role="progressbar"
      >
        <div
          className={`h-full ${getStrengthColor(strengthScore)} transition-all duration-500 ease-out`}
          style={{ width: `${(strengthScore / 4) * 100}%` }}
        ></div>
      </div>
      <p className="font-medium">Your password must contain:</p>
      <PasswordValidator
        validationCondition={passwordValidation.isLongEnough}
        validationText={"At least 8 character."}
      />
      <PasswordValidator
        validationCondition={passwordValidation.hasUppercase}
        validationText={"At least one uppercase letter."}
      />
      <PasswordValidator
        validationCondition={passwordValidation.hasSpecialChar}
        validationText={"At least one special character."}
      />
      <PasswordValidator
        validationCondition={passwordValidation.hasNumber}
        validationText={"At least one number."}
      />
    </div>
  );
}

export default PasswordStrength;
