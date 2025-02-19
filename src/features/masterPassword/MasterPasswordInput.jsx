import { useEffect, useMemo, useRef, useState } from "react";
import Tooltip from "../../ui/Tooltip";
import VisibilityToggle from "../../ui/VisibilityToggle";
import MasterPasswordStrength from "./MasterPasswordStrength";
import { checkPasswordBreach } from "../../services/apiPasswords";
import zxcvbn from "zxcvbn";
import { isCommonPassword } from "../../utils/passwordUtils";

function MasterPasswordInput({ register, disabled }) {
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isBreached, setIsBreached] = useState(true);
  const timeoutRef = useRef(null);

  const zxcvbnResult = useMemo(
    () => (password ? zxcvbn(password) : null),
    [password],
  );
  const hasCommonPassword = useMemo(
    () => (zxcvbnResult ? isCommonPassword(zxcvbnResult) : true),
    [zxcvbnResult],
  );

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current); // Clear previous timer

    timeoutRef.current = setTimeout(async () => {
      if (password.length > 0) {
        const res = await checkPasswordBreach(password);
        setIsBreached(res);
      }
    }, 500); // Wait 500ms before calling API

    return () => clearTimeout(timeoutRef.current); // Cleanup on unmount
  }, [password]);

  const { onChange, ...restRegister } = register("masterPassword", {
    required: "This field is required.",
    validate: (value) => {
      if (
        value.trim().length < 8 ||
        !/[A-Z]/.test(value) ||
        !/[a-z]/.test(value) ||
        !/\d/.test(value) ||
        !/[!@#$%^&*(),.?":{}|<>]/.test(value) ||
        isBreached ||
        hasCommonPassword
      ) {
        return "Invalid password.";
      }
      return true;
    },
  });

  // Merge register's onChange with your state update
  // because if I don't my custom onChange will override register's onChange
  // which is responsible of handling form state and triggering validation
  const handleChange = (e) => {
    onChange(e); // Let React Hook Form handle validation
    setPassword(e.target.value); // Update local state
  };

  return (
    <Tooltip>
      <Tooltip.Trigger>
        <div className="relative">
          <input
            id="masterPassword"
            type={isVisible ? "text" : "password"}
            placeholder="Master password"
            className="input"
            disabled={disabled}
            {...restRegister} // Spread remaining register props
            onChange={handleChange} // Use merged handler
          />
          <VisibilityToggle
            isVisible={isVisible}
            onToggle={() => setIsVisible((is) => !is)}
          />
        </div>
      </Tooltip.Trigger>
      <Tooltip.Content>
        <MasterPasswordStrength
          password={password}
          isBreached={isBreached}
          hasCommonPassword={hasCommonPassword}
        />
      </Tooltip.Content>
    </Tooltip>
  );
}

export default MasterPasswordInput;
