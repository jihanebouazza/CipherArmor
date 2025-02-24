import Tooltip from "./Tooltip";
import { useState } from "react";
import PasswordStrength from "./PasswordStrength";
import VisibilityToggle from "./VisibilityToggle";

function PasswordInput({
  id,
  placeholder,
  register,
  disabled,
  defaultValue = "",
}) {
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const { onChange, ...restRegister } = register(id, {
    required: "This field is required.",
    validate: (value) => {
      if (
        value.trim().length < 8 ||
        !/[A-Z]/.test(value) ||
        !/\d/.test(value) ||
        !/[!@#$%^&*(),.?":{}|<>]/.test(value)
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
            id={id}
            type={isVisible ? "text" : "password"}
            placeholder={placeholder}
            className="input"
            disabled={disabled}
            defaultValue={defaultValue}
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
        <PasswordStrength password={password} />
      </Tooltip.Content>
    </Tooltip>
  );
}

export default PasswordInput;
