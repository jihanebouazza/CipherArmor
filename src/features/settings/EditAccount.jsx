import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import EditAccountForm from "./EditAccountForm";

function EditAccount() {
  return (
    <Modal>
      <Modal.Open opens="edit-username">
        <Button type="raw">Edit</Button>
      </Modal.Open>
      <Modal.Window name="edit-username">
        <EditAccountForm />
      </Modal.Window>
    </Modal>
  );
}

export default EditAccount;
