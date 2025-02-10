import AddButton from "../../ui/AddButton";
import Modal from "../../ui/Modal";
import AddVaultForm from "./AddVaultForm";

function AddVault() {
  return (
    <Modal>
      <Modal.Open opens="add-vault">
        <AddButton>Add vault</AddButton>
      </Modal.Open>

      <Modal.Window name="add-vault">
        <AddVaultForm />
      </Modal.Window>
    </Modal>
  );
}

export default AddVault;
