import Button from "../../ui/Button";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Modal from "../../ui/Modal";
import { useUser } from "../authentication/useUser";
import SettingBlock from "./SettingBlock";
import { useDeactivateAccount } from "./useDeactivateAccount";
import { useDeleteUser } from "./useDeleteUser";

function AccountManagementBlock() {
  const { deleteUser, isDeleting } = useDeleteUser();
  const { deactivateAccount, isDeactivating } = useDeactivateAccount();
  const { user, isPending } = useUser();

  return (
    <SettingBlock
      heading="Account Management"
      subHeading="Control your account status."
    >
      <div className="border-charcoal-100 flex items-center gap-2">
        <Modal>
          <Modal.Open opens="deactivate-user">
            <Button type="dangersecondary">Deactivate Account</Button>
          </Modal.Open>

          <Modal.Open opens="delete-user">
            <Button type="danger">Delete Account</Button>
          </Modal.Open>

          <Modal.Window name="deactivate-user">
            <ConfirmDelete
              message="This action will deactivate your account. You will not be able to reactivate it within the next 24 hours."
              ressourceName="Account"
              disabled={isDeactivating || isPending}
              onConfirm={() => deactivateAccount(user?.id)}
              action="Deactivate"
            />
          </Modal.Window>

          <Modal.Window name="delete-user">
            <ConfirmDelete
              message="This action is permanent. Your account and all associated data will be deleted and cannot be recovered."
              ressourceName="Account"
              disabled={isDeleting}
              onConfirm={() => deleteUser()}
            />
          </Modal.Window>
        </Modal>
      </div>
    </SettingBlock>
  );
}

export default AccountManagementBlock;
