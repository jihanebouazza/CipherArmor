import AddButton from "../../ui/AddButton";
import Table from "../../ui/Table";
import DashboardHeader from "../dashboard/DashboardHeader";
import PasswordRow from "./PasswordRow";

function PasswordTable() {
  return (
    <>
      <DashboardHeader title="Passwords">
        Protect your digital identity. <br /> Keep hackers locked out.
      </DashboardHeader>
      <div className="py-4">
        <Table.Container
          title="My passwords"
          count={15}
          action={<AddButton>Add password</AddButton>}
        >
          <Table
            columnsCount={8}
            emptyErrorMessage="No passwords found. Begin adding your secure logins and organize them in your vault!"
          >
            <Table.Head>
              <Table.HeadCell width="20%">Platform</Table.HeadCell>
              <Table.HeadCell width="15%">Username</Table.HeadCell>
              <Table.HeadCell width="15%">Password</Table.HeadCell>
              <Table.HeadCell width="10%">Vault</Table.HeadCell>
              <Table.HeadCell width="10%">Strength</Table.HeadCell>
              <Table.HeadCell width="15%">Last updated</Table.HeadCell>
              <Table.HeadCell width="10%">Added on</Table.HeadCell>
              <Table.HeadCell width="5%"></Table.HeadCell>
            </Table.Head>
            <Table.Body data={[1]} render={() => <PasswordRow key={1} />} />
          </Table>
        </Table.Container>
      </div>
    </>
  );
}

export default PasswordTable;
