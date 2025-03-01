import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import EditPasswordForm from "./EditPasswordForm";

function EditPassword() {
  return (
    <Modal>
      <Modal.Open opens="edit-password">
        <Button type="raw" extraStyles="w-fit">
          Edit
        </Button>
      </Modal.Open>
      <Modal.Window name="edit-password">
        <EditPasswordForm />
      </Modal.Window>
    </Modal>
  );
}

export default EditPassword;
