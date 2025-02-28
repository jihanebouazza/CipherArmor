import { HiOutlineExclamationCircle } from "react-icons/hi2";
import Button from "./Button";

function ConfirmDelete({
  message,
  onCloseModal,
  onConfirm,
  disabled = false,
  ressourceName,
  action = "Delete",
}) {
  return (
    <>
      <div className="flex flex-col items-center text-center">
        <HiOutlineExclamationCircle
          className="text-ruby-500 dark:text-ruby-600 mb-2"
          size={32}
        />
        <h3 className="font-heading text-xl font-bold">
          Are You Sure You Want to {action} This {ressourceName}?
        </h3>
        <p className="dark:text-charcoal-400 text-charcoal-600">{message}</p>
      </div>
      <div className="mt-3 flex justify-end gap-2">
        <Button type="raw" onClick={() => onCloseModal()} disabled={disabled}>
          Cancel
        </Button>
        <Button type="danger" onClick={onConfirm} disabled={disabled}>
          {action}
        </Button>
      </div>
    </>
  );
}

export default ConfirmDelete;
