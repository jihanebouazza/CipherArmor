import { HiOutlineLockClosed } from "react-icons/hi2";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import MasterPasswordForm from "./MasterPasswordForm";

function MasterPassword() {
  return (
    <div className="flex w-full flex-1 flex-col items-center justify-center gap-2">
      <div className="text-center">
        <h3 className="font-heading text-xl font-bold">
          Your passwords are locked.
        </h3>
        <p className="dark:text-charcoal-400 text-charcoal-600">
          Click the button below to enter your master password and unlock them.
        </p>
      </div>
      <Modal>
        <Modal.Open opens="master-password-input">
          <Button>
            <HiOutlineLockClosed size={18} className="mr-1 mb-0.5 inline" />
            <p>Unlock passwords</p>
          </Button>
        </Modal.Open>
        <Modal.Window name="master-password-input">
          <MasterPasswordForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default MasterPassword;
