import ContainerLoader from "../../ui/ContainerLoader";
import Table from "../../ui/Table";
import DashboardHeader from "../dashboard/DashboardHeader";
import { useVaults } from "./useVaults";
import VaultRow from "./VaultRow";
import AddVault from "./AddVault";

function VaultTable() {
  const { vaults, isPending } = useVaults();

  if (isPending) return <ContainerLoader />;

  const vaultCount = vaults.length;

  return (
    <>
      <DashboardHeader title="Vaults">
        Your vault, your rules. <br /> Categorize your passwords for easy
        retrieval.
      </DashboardHeader>
      <div className="py-4">
        <Table.Container
          title="My vaults"
          count={vaultCount}
          action={<AddVault />}
        >
          <Table
            columnsCount={4}
            emptyErrorMessage="No vaults found. Start organizing your passwords by creating your
      first vault!"
          >
            <Table.Head>
              <Table.HeadCell width="20%">Name</Table.HeadCell>
              <Table.HeadCell width="20%">Number of items</Table.HeadCell>
              <Table.HeadCell width="40%">Description</Table.HeadCell>
              <Table.HeadCell width="20%">Added On</Table.HeadCell>
            </Table.Head>
            <Table.Body
              data={vaults}
              render={(vault) => <VaultRow key={vault.id} vault={vault} />}
            ></Table.Body>
          </Table>
        </Table.Container>
      </div>
    </>
  );
}

export default VaultTable;
