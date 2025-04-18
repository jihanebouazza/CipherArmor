import { HiOutlinePencilSquare } from "react-icons/hi2";
import Table from "../../ui/Table";
import VaultIcon from "../vaults/VaultIcon";
import PasswordCell from "./PasswordCell";
import PlatformCell from "./PlatformCell";
import { formatDate, formatRelativeTime } from "../../utils/helpers";
import Menu from "../../ui/Menu";
import { IoTrashOutline } from "react-icons/io5";
import Modal from "../../ui/Modal";
import EditPasswordForm from "./EditPasswordForm";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeletePassword } from "./useDeletePassword";
import { useUser } from "../authentication/useUser";
import StrengthCell from "./StrengthCell";

function PasswordRow({ decryptedPassword }) {
  const { deletePassword, isDeleting } = useDeletePassword();
  const { isPending, user } = useUser();
  const {
    id,
    platform,
    platform_url,
    username,
    password,
    vaults,
    last_updated,
    created_at,
    is_reused,
    is_breached,
    score,
  } = decryptedPassword;

  return (
    <Table.Row>
      <Table.Cell>
        <PlatformCell platformName={platform} platformUrl={platform_url} />
      </Table.Cell>
      <Table.Cell>{username}</Table.Cell>
      <Table.Cell>
        <PasswordCell password={password} />
      </Table.Cell>
      <Table.Cell>
        <VaultIcon title={vaults.name} tag />
      </Table.Cell>
      <Table.Cell>
        <StrengthCell
          score={score}
          is_reused={is_reused}
          is_breached={is_breached}
        />
      </Table.Cell>
      <Table.Cell>{formatRelativeTime(last_updated)}</Table.Cell>
      <Table.Cell>{formatDate(created_at)}</Table.Cell>
      <Table.Cell>
        <Modal>
          <Menu.Container>
            <Menu>
              <Menu.Toggle id={id} />
              <Menu.List id={id}>
                <Modal.Open opens="edit-password">
                  <Menu.ListButton Icon={<HiOutlinePencilSquare />}>
                    Edit
                  </Menu.ListButton>
                </Modal.Open>
                <Modal.Open opens="delete-password">
                  <Menu.ListButton Icon={<IoTrashOutline />}>
                    Delete
                  </Menu.ListButton>
                </Modal.Open>
              </Menu.List>
            </Menu>
          </Menu.Container>
          <Modal.Window name="edit-password">
            <EditPasswordForm password={decryptedPassword} />
          </Modal.Window>
          <Modal.Window name="delete-password">
            <ConfirmDelete
              message="This action is permanent. The password will be deleted and cannot be recovered."
              ressourceName="Password"
              disabled={isPending || isDeleting}
              onConfirm={() => deletePassword({ id, user_id: user?.id })}
            />
          </Modal.Window>
        </Modal>
      </Table.Cell>
    </Table.Row>
  );
}

export default PasswordRow;
