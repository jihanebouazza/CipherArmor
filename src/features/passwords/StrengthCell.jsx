import {
  HiOutlineArrowPath,
  HiOutlineExclamationTriangle,
  HiOutlineInformationCircle,
  HiOutlineShieldCheck,
  HiOutlineShieldExclamation,
} from "react-icons/hi2";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import PasswordTag from "./PasswordTag";

function StrengthCell({ analysis, strength, description }) {
  return (
    <>
      <PasswordTag
        Icon={
          strength === "Very Strong" || strength === "Strong"
            ? HiOutlineShieldCheck
            : HiOutlineShieldExclamation
        }
        title={strength}
        type={
          strength === "Very Strong" || strength === "Strong"
            ? "safe"
            : strength === "Moderate"
              ? "warning"
              : "danger"
        }
      />
      <PasswordTag
        Icon={HiOutlineArrowPath}
        title={analysis.isReused ? "Reused" : "Unique"}
        type={analysis.isReused ? "danger" : "safe"}
      />
      <PasswordTag
        Icon={
          analysis.isBreached
            ? HiOutlineExclamationTriangle
            : IoIosCheckmarkCircleOutline
        }
        title={analysis.isBreached ? "Breached" : "Safe"}
        type={analysis.isBreached ? "danger" : "safe"}
      />
      <p className="dark:text-charcoal-100 text-charcoal-600 flex gap-1 text-sm font-light italic">
        <HiOutlineInformationCircle size={14} className="mt-0.5" />
        <span>{description}</span>
      </p>
    </>
  );
}

export default StrengthCell;
