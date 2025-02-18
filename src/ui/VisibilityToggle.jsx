import { RxEyeClosed, RxEyeOpen } from "react-icons/rx";

function VisibilityToggle({ isVisible, onToggle, color = "" }) {
  return (
    <div
      className={`bg-ocean-100 dark:bg-charcoal-800 absolute top-2 right-2.5 cursor-pointer ${color}`}
      onClick={onToggle}
    >
      {isVisible ? <RxEyeClosed size={20} /> : <RxEyeOpen size={20} />}
    </div>
  );
}

export default VisibilityToggle;
