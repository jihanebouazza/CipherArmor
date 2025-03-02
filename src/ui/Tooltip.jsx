import {
  cloneElement,
  createContext,
  useContext,
  useEffect,
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

  function handleTooltipClick() {
    setIsVisibleTooltip((is) => !is);
  }

  return (
    <TooltipContext.Provider
      value={{
        triggerRef,
        handleTooltipOnFocus,
        handleTooltipOnFocusLoss,
        handleTooltipClick,
        isVisibleTooltip,
      }}
      className="relative"
    >
      {children}
    </TooltipContext.Provider>
  );
}

function Trigger({ children, isButton = false }) {
  const {
    triggerRef,
    handleTooltipOnFocus,
    handleTooltipOnFocusLoss,
    handleTooltipClick,
  } = useContext(TooltipContext);

  return cloneElement(children, {
    ref: triggerRef,
    onFocus: !isButton ? handleTooltipOnFocus : undefined,
    onBlur: !isButton ? handleTooltipOnFocusLoss : undefined,
    onClick: isButton ? handleTooltipClick : undefined,
  });
}

function Content({ children }) {
  const { triggerRef, isVisibleTooltip } = useContext(TooltipContext);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const modalContent = triggerRef.current.closest('[role="dialog"]');

      if (modalContent) {
        const modalRect = modalContent.getBoundingClientRect();
        setPosition({
          top: rect.bottom - modalRect.top + 22,
          left: rect.left - modalRect.left + rect.width / 2,
        });
      } else {
        setPosition({
          top: rect.bottom + window.scrollY + 8,
          left: rect.left + window.scrollX + rect.width / 2,
        });
      }
    }
  }, [triggerRef, isVisibleTooltip]);

  return (
    <div
      role="tooltip"
      className={`bg-ocean-100 dark:bg-charcoal-800 border-charcoal-400 absolute z-99 min-w-max ${isVisibleTooltip ? "pointer-events-auto visible delay-200" : "pointer-events-none hidden delay-200"} rounded-xl border p-3 shadow-md transition-opacity duration-300`}
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
        transform: "translateX(-50%)",
      }}
    >
      <div className="border-charcoal-400 dark:bg-charcoal-800 bg-ocean-100 absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 transform border-t border-l"></div>
      {children}
    </div>
  );
}

Tooltip.Trigger = Trigger;
Tooltip.Content = Content;

export default Tooltip;
