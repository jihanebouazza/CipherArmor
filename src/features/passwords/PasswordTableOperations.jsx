import Filter from "../../ui/Filter";
import Loader from "../../ui/Loader";
import SearchInput from "../../ui/SearchInput";
import SortBy from "../../ui/SortBy";
import { useAllVaults } from "../vaults/useAllVaults";
import AddPassword from "./AddPassword";

function PasswordTableOperations({
  platformSearchTerm,
  setPlatformSearchTerm,
}) {
  const { vaults, count, isPending } = useAllVaults();

  const filterVaults = vaults?.map((vault) => ({
    value: vault.id,
    label: vault.name,
  }));

  if (isPending)
    return <Loader secondColor="#fafbfd" borderWidth="3" width="20" />;

  return (
    <div className="flex items-center gap-2">
      <SearchInput
        searchTerm={platformSearchTerm}
        onChange={(e) => setPlatformSearchTerm(e.target.value)}
        placeholder="Search platforms..."
      />
      <div className="flex-none">
        <SortBy
          options={[
            {
              value: "created_at-desc",
              label: "Added on (recent first)",
            },
            {
              value: "created_at-asc",
              label: "Added on (earlier first)",
            },
            {
              value: "last_updated-desc",
              label: "Last updated (recent first)",
            },
            {
              value: "last_updated-asc",
              label: "Last updated (earlier first)",
            },
          ]}
        />
      </div>
      <div className="flex-none">
        {count > 0 && <Filter filterField="vault" options={filterVaults} />}{" "}
      </div>
      <div className="shrink-0">
        <AddPassword />
      </div>
    </div>
  );
}

export default PasswordTableOperations;
