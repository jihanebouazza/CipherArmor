import ContainerLoader from "../../ui/ContainerLoader";
import Table from "../../ui/Table";
import { useVaults } from "./useVaults";
import VaultRow from "./VaultRow";
import { PAGE_SIZE } from "../../utils/constants";
import Pagination from "../../ui/Pagination";
import VaultTableOperations from "./VaultTableOperations";
import { useState } from "react";

function VaultTable() {
  const { vaults, count, isPending } = useVaults();
  const [vaultSearchTerm, setVaultSearchTerm] = useState("");

  const filteredVaults = vaults?.filter(
    (vault) =>
      vault.name.toLowerCase().includes(vaultSearchTerm.toLowerCase()) ||
      vault.description.toLowerCase().includes(vaultSearchTerm.toLowerCase()),
  );

  if (isPending) return <ContainerLoader />;
  return (
    <div className="py-4">
      <Table.Container
        title="My vaults"
        count={count}
        actions={
          <VaultTableOperations
            vaultSearchTerm={vaultSearchTerm}
            setVaultSearchTerm={setVaultSearchTerm}
          />
        }
      >
        <Table
          columnsCount={5}
          emptyErrorMessage="No vaults found. Start organizing your passwords by creating your
      first vault!"
        >
          <Table.Head>
            <Table.HeadCell width="20%">Name</Table.HeadCell>
            <Table.HeadCell width="15%">Number of items</Table.HeadCell>
            <Table.HeadCell width="45%">Description</Table.HeadCell>
            <Table.HeadCell width="15%">Added on</Table.HeadCell>
            <Table.HeadCell width="5%"></Table.HeadCell>
          </Table.Head>
          <Table.Body
            data={filteredVaults}
            render={(vault) => <VaultRow key={vault.id} vault={vault} />}
          ></Table.Body>
          {Math.ceil(count / PAGE_SIZE) > 1 && (
            <Table.Footer>
              <Pagination count={count} />
            </Table.Footer>
          )}
        </Table>
      </Table.Container>
    </div>
  );
}

export default VaultTable;
