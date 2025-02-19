import {
  analyzeCharacterVariety,
  getStrength,
} from "../../utils/passwordUtils";
import MasterPasswordValidator from "./MasterPasswordValidator";

function MasterPasswordStrength({ password, isBreached, hasCommonPassword }) {
  const passwordValidation = {
    isLongEnough: password.trim().length >= 12,
    ...analyzeCharacterVariety(password),
  };

  const strengthScore =
    Object.values(passwordValidation).filter(Boolean).length - 1;
  const adjustedScore =
    strengthScore + (!hasCommonPassword ? 1 : 0) + (!isBreached ? 1 : 0);
  const strengthPercentage = Math.max(0, (adjustedScore / 7) * 100);

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
      <MasterPasswordValidator
        validationCondition={passwordValidation.isLongEnough}
        validationMessage={"At least 12 character."}
      />
      <MasterPasswordValidator
        validationCondition={passwordValidation.hasUpper}
        validationMessage={"At least one uppercase letter."}
      />
      <MasterPasswordValidator
        validationCondition={passwordValidation.hasLower}
        validationMessage={"At least one lowercase letter."}
      />
      <MasterPasswordValidator
        validationCondition={passwordValidation.hasSymbol}
        validationMessage={"At least one special character."}
      />
      <MasterPasswordValidator
        validationCondition={passwordValidation.hasNumber}
        validationMessage={"At least one number."}
      />
      <MasterPasswordValidator
        validationCondition={!isBreached}
        validationMessage={
          isBreached ? "Found in a data breach." : "Safe from known breaches."
        }
      />
      <MasterPasswordValidator
        validationCondition={!hasCommonPassword}
        validationMessage={
          hasCommonPassword
            ? "Matches typical password patterns."
            : "Distinct from password patterns."
        }
      />
    </div>
  );
}

export default MasterPasswordStrength;
