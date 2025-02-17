import AddButton from "../../ui/AddButton";
import Modal from "../../ui/Modal";
import AddPasswordForm from "./AddPasswordForm";

function AddPassword() {
  return (
    <Modal>
      <Modal.Open opens="add-password">
        <AddButton>Add password</AddButton>
      </Modal.Open>
      <Modal.Window name="add-password">
        <AddPasswordForm />
      </Modal.Window>
    </Modal>
  );
}

export default AddPassword;
