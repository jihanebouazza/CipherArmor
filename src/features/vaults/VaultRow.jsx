import { HiOutlinePencilSquare } from "react-icons/hi2";
import Menu from "../../ui/Menu";
import Table from "../../ui/Table";
import { formatDate } from "../../utils/helpers";
import VaultIcon from "./VaultIcon";
import { IoTrashOutline } from "react-icons/io5";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../pages/ConfirmDelete";
import { useDeleteVault } from "./useDeleteVault";
import { useUser } from "../authentication/useUser";

function VaultRow({ vault }) {
  const { deleteVault, isDeleting } = useDeleteVault();
  const { isPending, user } = useUser();
  const { id, name, description, created_at } = vault;

  return (
    <Table.Row>
      <Table.Cell>
        <VaultIcon title={name} />
      </Table.Cell>
      <Table.Cell>15</Table.Cell>
      <Table.Cell>{description}</Table.Cell>
      <Table.Cell>{formatDate(created_at)}</Table.Cell>
      <Table.Cell>
        <Modal>
          <Menu.Container>
            <Menu>
              <Menu.Toggle id={id} />
              <Menu.List id={id}>
                <Menu.ListButton Icon={<HiOutlinePencilSquare />}>
                  Edit
                </Menu.ListButton>

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
        </Modal>
      </Table.Cell>
    </Table.Row>
  );
}

export default VaultRow;
