import { analyzeCharacterVariety, getStrength } from "../utils/passwordUtils";
import PasswordValidator from "./PasswordValidator";

function PasswordStrength({ password }) {
  const passwordValidation = {
    isLongEnough: password.trim().length >= 8,
    ...analyzeCharacterVariety(password),
  };

  const strengthScore =
    Object.values(passwordValidation).filter(Boolean).length - 2;
  const strengthPercentage = Math.max(0, (strengthScore / 4) * 100);

  const { background } = getStrength(strengthPercentage);

  return (
    <div>
      <div
        className="bg-charcoal-200 my-2 h-1 w-full overflow-hidden rounded-full"
        role="progressbar"
      >
        <div
          className={`h-full ${background} transition-all duration-500 ease-out`}
          style={{ width: `${strengthPercentage}%` }}
        ></div>
      </div>
      <p className="font-medium">Your password must contain:</p>
      <PasswordValidator
        validationCondition={passwordValidation.isLongEnough}
        validationMessage={"At least 8 character."}
      />
      <PasswordValidator
        validationCondition={passwordValidation.hasUpper}
        validationMessage={"At least one uppercase letter."}
      />
      <PasswordValidator
        validationCondition={passwordValidation.hasSymbol}
        validationMessage={"At least one special character."}
      />
      <PasswordValidator
        validationCondition={passwordValidation.hasNumber}
        validationMessage={"At least one number."}
      />
    </div>
  );
}

export default PasswordStrength;
