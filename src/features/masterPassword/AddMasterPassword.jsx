import { HiOutlineLockOpen } from "react-icons/hi2";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import AddMasterPasswordForm from "./AddMasterPasswordForm";

function AddMasterPassword() {
  return (
    <div className="flex w-full flex-1 flex-col items-center justify-center gap-2">
      <div className="text-center">
        <h3 className="font-heading text-xl font-bold">
          Set Up Your Master Password.
        </h3>
        <p className="dark:text-charcoal-400 text-charcoal-600">
          Before you can save or view passwords, create a master password.
        </p>
      </div>
      <Modal>
        <Modal.Open opens="add-master-password">
          <Button>
            <HiOutlineLockOpen size={18} className="mr-1 mb-0.5 inline" />
            <p>Create master password</p>
          </Button>
        </Modal.Open>
        <Modal.Window name="add-master-password">
          <AddMasterPasswordForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddMasterPassword;
