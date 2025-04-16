import {
  HiOutlineArrowPath,
  HiOutlineExclamationTriangle,
  HiOutlineInformationCircle,
  HiOutlineShieldCheck,
  HiOutlineShieldExclamation,
} from "react-icons/hi2";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import PasswordTag from "./PasswordTag";

function StrengthTooltip({ strength, description, is_reused, is_breached }) {
  return (
    <>
      <PasswordTag
        Icon={
          strength === "Very Strong" || strength === "Resilient"
            ? HiOutlineShieldCheck
            : HiOutlineShieldExclamation
        }
        title={strength}
        type={
          strength === "Very Strong"
            ? "safe"
            : strength === "Resilient"
              ? "caution"
              : strength === "Moderate"
                ? "warning"
                : "danger"
        }
      />
      <PasswordTag
        Icon={HiOutlineArrowPath}
        title={is_reused ? "Reused" : "Unique"}
        type={is_reused ? "danger" : "safe"}
      />
      <PasswordTag
        Icon={
          is_breached
            ? HiOutlineExclamationTriangle
            : IoIosCheckmarkCircleOutline
        }
        title={is_breached ? "Breached" : "Safe"}
        type={is_breached ? "danger" : "safe"}
      />
      <p className="dark:text-charcoal-100 text-charcoal-600 flex gap-1 text-sm font-light italic">
        <HiOutlineInformationCircle size={14} className="mt-[2.5px]" />
        <span>{description}</span>
      </p>
    </>
  );
}

export default StrengthTooltip;
