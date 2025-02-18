import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import Button from "./Button";
import { HiMiniXMark } from "react-icons/hi2";

const ModalContext = createContext();

function Modal({ children }) {
  const [openName, setOpenName] = useState("");

  const open = (name) => setOpenName(name);

  const close = () => setOpenName("");

  return (
    <ModalContext.Provider value={{ open, close, openName }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens: opensWindowName }) {
  const { open } = useContext(ModalContext);

  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

function Window({ children, name }) {
  const { openName, close } = useContext(ModalContext);

  if (openName !== name) return null;

  return createPortal(
    <div className="bg-ocean-100/40 dark:bg-charcoal-800/40 fixed inset-0 z-[1000] h-screen w-full backdrop-blur-sm">
      <div className="bg-ocean-100 dark:bg-charcoal-800 dark:text-charcoal-100 border-charcoal-100 dark:shadow-charcoal-700 fixed top-1/2 left-1/2 w-1/3 -translate-x-1/2 -translate-y-1/2 transform rounded-3xl border px-6 py-4 shadow-md transition-all duration-500">
        <div className="flex justify-end">
          <Button type="rawsm" onClick={close}>
            <HiMiniXMark size={28} />
          </Button>
        </div>
        <div className="relative pt-4">
          {cloneElement(children, { onCloseModal: close })}
        </div>
      </div>
    </div>,
    document.body,
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
