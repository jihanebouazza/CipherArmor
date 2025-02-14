import { useState } from "react";
import { RxEyeClosed, RxEyeOpen } from "react-icons/rx";

function PasswordCell({ password }) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="flex items-center justify-between">
      <p>{isVisible ?  password  : "••••••••••••••"}</p>
      <div
        className="text-charcoal-800 dark:text-charcoal-100 cursor-pointer"
        onClick={() => setIsVisible((is) => !is)}
      >
        {isVisible ? <RxEyeClosed size={20} /> : <RxEyeOpen size={20} />}
      </div>
    </div>
  );
}

export default PasswordCell;
