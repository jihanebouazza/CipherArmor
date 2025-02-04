import Tooltip from "./Tooltip";
import { useState } from "react";
import { RxEyeClosed, RxEyeOpen } from "react-icons/rx";
import PasswordStrength from "./PasswordStrength";

function PasswordInput({ id, placeholder, register, disabled }) {
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const { onChange, ...restRegister } = register(id, {
    required: "This field is required.",
    validate: (value) => {
      if (
        value.length < 8 ||
        !/[A-Z]/.test(value) ||
        !/[0-9]/.test(value) ||
        !/[!@#$%^&*]/.test(value)
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
            {...restRegister} // Spread remaining register props
            onChange={handleChange} // Use merged handler
          />
          <div
            className="bg-ocean-100 dark:bg-charcoal-800 absolute top-2 right-2.5"
            onClick={() => setIsVisible((is) => !is)}
          >
            {isVisible ? <RxEyeClosed size={20} /> : <RxEyeOpen size={20} />}
          </div>
        </div>
      </Tooltip.Trigger>
      <Tooltip.Content>
        <PasswordStrength password={password} />
      </Tooltip.Content>
    </Tooltip>
  );
}

export default PasswordInput;
