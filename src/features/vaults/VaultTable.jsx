import ContainerLoader from "../../ui/ContainerLoader";
import Table from "../../ui/Table";
import DashboardHeader from "../dashboard/DashboardHeader";
import { useVaults } from "./useVaults";
import VaultRow from "./VaultRow";
import AddVault from "./AddVault";
import { PAGE_SIZE } from "../../utils/constants";
import Pagination from "../../ui/Pagination";

function VaultTable() {
  const { vaults, count, isPending } = useVaults();

  if (isPending) return <ContainerLoader />;
  return (
    <>
      <DashboardHeader title="Vaults">
        Your vault, your rules. <br /> Categorize your passwords for easy
        retrieval.
      </DashboardHeader>
      <div className="py-4">
        <Table.Container title="My vaults" count={count} action={<AddVault />}>
          <Table
            columnsCount={5}
            emptyErrorMessage="No vaults found. Start organizing your passwords by creating your
      first vault!"
          >
            <Table.Head>
              <Table.HeadCell width="20%">Name</Table.HeadCell>
              <Table.HeadCell width="15%">Number of items</Table.HeadCell>
              <Table.HeadCell width="40%">Description</Table.HeadCell>
              <Table.HeadCell width="20%">Added on</Table.HeadCell>
              <Table.HeadCell width="5%"></Table.HeadCell>
            </Table.Head>
            <Table.Body
              data={vaults}
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
    </>
  );
}

export default VaultTable;
