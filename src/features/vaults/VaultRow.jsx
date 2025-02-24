import { HiOutlineKey, HiOutlinePencilSquare } from "react-icons/hi2";
import Menu from "../../ui/Menu";
import Table from "../../ui/Table";
import { formatDate } from "../../utils/helpers";
import VaultIcon from "./VaultIcon";
import { IoTrashOutline } from "react-icons/io5";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteVault } from "./useDeleteVault";
import { useUser } from "../authentication/useUser";
import EditVaultForm from "./EditVaultForm";
import { Link } from "react-router";

function VaultRow({ vault }) {
  const { deleteVault, isDeleting } = useDeleteVault();
  const { isPending, user } = useUser();
  const { id, name, description, created_at, password_count } = vault;

  return (
    <Table.Row>
      <Table.Cell>
        <VaultIcon title={name} />
      </Table.Cell>
      <Table.Cell>{password_count > 0 ? password_count : "None"}</Table.Cell>
      <Table.Cell>{description}</Table.Cell>
      <Table.Cell>{formatDate(created_at)}</Table.Cell>
      <Table.Cell>
        <Modal>
          <Menu.Container>
            <Menu>
              <Menu.Toggle id={id} />
              <Menu.List id={id}>
                <Link to={`/passwords?vault=${id}`}>
                  <Menu.ListButton Icon={<HiOutlineKey />}>
                    Passwords
                  </Menu.ListButton>
                </Link>
                <Modal.Open opens="edit-vault">
                  <Menu.ListButton Icon={<HiOutlinePencilSquare />}>
                    Edit
                  </Menu.ListButton>
                </Modal.Open>

                <Modal.Open opens="delete-vault">
                  <Menu.ListButton Icon={<IoTrashOutline />}>
                    Delete
                  </Menu.ListButton>
                </Modal.Open>
              </Menu.List>
            </Menu>
          </Menu.Container>
          <Modal.Window name="delete-vault">
            <ConfirmDelete
              message="This action is permanent. All contents within the vault will be deleted and cannot be recovered."
              ressourceName="Vault"
              disabled={isPending || isDeleting}
              onConfirm={() => deleteVault({ id, user_id: user?.id })}
            />
          </Modal.Window>
          <Modal.Window name="edit-vault">
            <EditVaultForm vault={vault} />
          </Modal.Window>
        </Modal>
      </Table.Cell>
    </Table.Row>
  );
}

export default VaultRow;
