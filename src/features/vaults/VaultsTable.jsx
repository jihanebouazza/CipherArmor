import Table from "../../ui/Table";
import DashboardHeader from "../dashboard/DashboardHeader";
import VaultIcon from "./VaultIcon";

function VaultsTable() {
  return (
    <>
      <DashboardHeader title="Vaults">
        Your vault, your rules. <br /> Categorize your passwords for easy
        retrieval.
      </DashboardHeader>
      <div className="py-4">
        <Table.Container
          title="My vaults"
          count={15}
          action={<Table.Container.Action title="Add vault" />}
        >
          <Table>
            <Table.Head>
              <Table.HeadCell width="20%">Name</Table.HeadCell>
              <Table.HeadCell width="20%">Number of items</Table.HeadCell>
              <Table.HeadCell width="40%">Description</Table.HeadCell>
              <Table.HeadCell width="20%">Added On</Table.HeadCell>
            </Table.Head>
            <Table.Body>
              <Table.Row>
                <Table.Cell>
                  <VaultIcon title="Work" icon="Work" />
                </Table.Cell>
                <Table.Cell>Hello World</Table.Cell>
                <Table.Cell>
                  Hello World Hello World Hello World Hello World Hello World
                  Hello World
                </Table.Cell>
                <Table.Cell>Hello World</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <VaultIcon title="Hello World" icon="Hello World" />
                </Table.Cell>
                <Table.Cell>Hello World</Table.Cell>
                <Table.Cell>Hello World</Table.Cell>
                <Table.Cell>Hello World</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Table.Container>
      </div>
    </>
  );
}

export default VaultsTable;
