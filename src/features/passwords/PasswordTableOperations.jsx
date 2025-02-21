import Filter from "../../ui/Filter";
import { useAllVaults } from "../vaults/useAllVaults";
import AddPassword from "./AddPassword";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";

function PasswordTableOperations({
  platformSearchTerm,
  setPlatformSearchTerm,
}) {
  const { vaults, count, isPending } = useAllVaults();

  const filterVaults = vaults?.map((vault) => ({
    value: vault.id,
    label: vault.name,
  }));

  if (isPending) return <p>Loading....</p>;

  return (
    <div className="flex items-center gap-2">
      <div className="relative shrink-0">
        <input
          className="input"
          placeholder="Search platforms..."
          value={platformSearchTerm}
          onChange={(e) => setPlatformSearchTerm(e.target.value)}
        />
        <div className="bg-ocean-100 dark:bg-charcoal-800 text-charcoal-300 absolute top-2 right-2.5">
          <HiOutlineMagnifyingGlass size={18} className="mt-1" />
        </div>
      </div>
      {count > 0 && <Filter filterField="vault" options={filterVaults} />}
      <div className="shrink-0">
        <AddPassword />
      </div>
    </div>
  );
}

export default PasswordTableOperations;
