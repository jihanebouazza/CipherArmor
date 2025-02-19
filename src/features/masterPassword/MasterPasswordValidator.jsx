import { HiX } from "react-icons/hi";
import { HiMiniCheck } from "react-icons/hi2";

function MasterPasswordValidator({ validationCondition, validationMessage }) {
  return (
    <p className="flex items-center gap-1">
      <span
        className={`${validationCondition ? "text-mint-500 dark:text-mint-700 bg-mint-100" : "text-ruby-500 dark:text-ruby-700 bg-ruby-100"} inline-flex items-center justify-center rounded-full p-0.5`}
      >
        {validationCondition ? (
          <HiMiniCheck size={12} className="inline" />
        ) : (
          <HiX size={12} className="inline" />
        )}
      </span>{" "}
      <span>{validationMessage}</span>
    </p>
  );
}

export default MasterPasswordValidator
