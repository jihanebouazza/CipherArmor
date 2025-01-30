import Tooltip from "./Tooltip";
import { useState } from "react";
import { RxEyeClosed, RxEyeOpen } from "react-icons/rx";
import PasswordStrength from "./PasswordStrength";

function PasswordInput({ id, placeholder, register, setValue }) {
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const passwordValidation = {
    isLongEnough: password.length >= 8,
    hasUppercase: /[A-Z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecialChar: /[!@#$%^&*]/.test(password),
  };

  const strengthScore =
    Object.values(passwordValidation).filter(Boolean).length;

  const handlePasswordChange = (e) => {
    const newValue = e.target.value;
    setPassword(newValue); // Update local state
    setValue(id, newValue); // Update React Hook Form's state
  };
  return (
    <Tooltip>
      <Tooltip.Trigger>
        <div className="relative">
          <input
            id={id}
            type={isVisible ? "text" : "password"}
            placeholder={placeholder}
            className="input"
            {...register(id)}
            onChange={handlePasswordChange}
          />
          <div
            className="absolute top-2 right-2.5"
            onClick={() => setIsVisible((is) => !is)}
          >
            {isVisible ? <RxEyeClosed size={20} /> : <RxEyeOpen size={20} />}
          </div>
        </div>
      </Tooltip.Trigger>
      <Tooltip.Content>
        <PasswordStrength
          strengthScore={strengthScore}
          passwordValidation={passwordValidation}
        />
      </Tooltip.Content>
    </Tooltip>
  );
}

export default PasswordInput;
