import Filter from "../../ui/Filter";
import { useAllVaults } from "../vaults/useAllVaults";
import AddPassword from "./AddPassword";

function PasswordTableOperations() {
  const { vaults, count, isPending } = useAllVaults();

  const filterVaults = vaults?.map((vault) => ({
    value: vault.id,
    label: vault.name,
  }));

  if (isPending) return <p>Loading....</p>;

  return (
    <div className="flex items-center gap-2">
      {count > 0 && <Filter filterField="vault" options={filterVaults} />}
      <div className="flex-shrink-0">
        <AddPassword />
      </div>
    </div>
  );
}

export default PasswordTableOperations;
