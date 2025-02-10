import Table from "../../ui/Table";
import { formatDate } from "../../utils/helpers";
import VaultIcon from "./VaultIcon";

function VaultRow({ vault }) {
  const { id, name, description, created_at } = vault;

  return (
    <Table.Row>
      <Table.Cell>
        <VaultIcon title={name} />
      </Table.Cell>
      <Table.Cell>15</Table.Cell>
      <Table.Cell>{description}</Table.Cell>
      <Table.Cell>{formatDate(created_at)}</Table.Cell>
    </Table.Row>
  );
}

export default VaultRow;
