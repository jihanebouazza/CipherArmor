import {
  cloneElement,
  createContext,
  useContext,
  useRef,
  useState,
} from "react";

const TooltipContext = createContext();

function Tooltip({ children }) {
  const triggerRef = useRef(0);
  const [isVisibleTooltip, setIsVisibleTooltip] = useState(false);

  function handleTooltipOnFocus() {
    setIsVisibleTooltip(true);
  }

  function handleTooltipOnFocusLoss() {
    setIsVisibleTooltip(false);
  }

  return (
    <TooltipContext.Provider
      value={{
        triggerRef,
        handleTooltipOnFocus,
        handleTooltipOnFocusLoss,
        isVisibleTooltip,
      }}
      className="relative"
    >
      {children}
    </TooltipContext.Provider>
  );
}

function Trigger({ children }) {
  const { triggerRef, handleTooltipOnFocus, handleTooltipOnFocusLoss } =
    useContext(TooltipContext);

  return cloneElement(children, {
    ref: triggerRef,
    onFocus: handleTooltipOnFocus,
    onBlur: handleTooltipOnFocusLoss,
  });
}

function Content({ children }) {
  const { triggerRef, isVisibleTooltip } = useContext(TooltipContext);
  const triggerHeight = triggerRef.offsetHeight;

  return (
    <div
      role="tooltip"
      className={`bg-ocean-100 dark:bg-charcoal-800 dark:border-charcoal-300 border-ocean-300 absolute top-[${triggerHeight}] ${isVisibleTooltip ? "visible" : "invisible"} inline rounded-xl border p-3 shadow-md`}
    >
      <div className="border-ocean-300 dark:border-charcoal-300 dark:bg-charcoal-800 bg-ocean-100 absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 transform border-t border-l"></div>
      {children}
    </div>
  );
}

Tooltip.Trigger = Trigger;
Tooltip.Content = Content;

export default Tooltip;
