import { cloneElement, useContext, useState } from "react";
import { createContext } from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";

const MenuContext = createContext();

function Container({ children }) {
  return <div className="flex items-center justify-end">{children}</div>;
}

function Menu({ children }) {
  const [openId, setOpenId] = useState("");
  const [position, setPosition] = useState(null);

  const open = (id) => setOpenId(id);
  const close = () => setOpenId("");

  return (
    <div className="flex items-center justify-end">
      <MenuContext.Provider
        value={{ open, close, openId, position, setPosition }}
      >
        {children}
      </MenuContext.Provider>
    </div>
  );
}

function Toggle({ id }) {
  const { openId, open, close, setPosition } = useContext(MenuContext);

  function handleClick(e) {
    e.stopPropagation();

    const rect = e.target.closest("button").getBoundingClientRect();
    setPosition({
      x: rect.right,
      y: rect.bottom + 4,
    });

    openId === "" || openId !== id ? open(id) : close();
  }

  return (
    <button className="cursor-pointer" onClick={handleClick}>
      <HiEllipsisVertical size={20} />
    </button>
  );
}

function List({ id, children }) {
  const { openId, position } = useContext(MenuContext);

  if (openId !== id) return null;

  return createPortal(
    <ul
      className="bg-ocean-100 dark:bg-charcoal-800 dark:text-charcoal-100 border-charcoal-100 dark:shadow-charcoal-700 divide-charcoal-100 fixed z-50 flex flex-col divide-y-1 rounded-xl border shadow-md"
      style={{
        top: `${position.y}px`,
        left: `${position.x}px`,
        transform: "translateX(-100%)",
      }}
    >
      {children}
    </ul>,
    document.body,
  );
}

function ListButton({ Icon, children, onClick }) {
  const { close } = useContext(MenuContext);

  function handleClick() {
    onClick?.();
    close();
  }

  return (
    <button
      onClick={handleClick}
      className="text-charcoal-800 dark:text-charcoal-100 cursor-pointer px-3 py-1"
    >
      <div className="flex items-start gap-1 py-1">
        {cloneElement(Icon, { size: 18, className: "mt-[1px]" })}
        <p className="">{children}</p>
      </div>
    </button>
  );
}

Menu.Container = Container;
Menu.Toggle = Toggle;
Menu.List = List;
Menu.ListButton = ListButton;

export default Menu;
