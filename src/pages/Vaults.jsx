import DashboardHeader from "../features/dashboard/DashboardHeader";
import VaultTable from "../features/vaults/VaultTable";

function Vaults() {
  return (
    <>
      <DashboardHeader title="Vaults">
        Your vault, your rules. <br /> Categorize your passwords for easy
        retrieval.
      </DashboardHeader>{" "}
      <VaultTable />
    </>
  );
}

export default Vaults;
