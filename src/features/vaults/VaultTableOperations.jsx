import SearchInput from "../../ui/SearchInput";
import SortBy from "../../ui/SortBy";
import AddVault from "./AddVault";

function VaultTableOperations({ vaultSearchTerm, setVaultSearchTerm }) {
  return (
    <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
      <SearchInput
        searchTerm={vaultSearchTerm}
        onChange={(e) => setVaultSearchTerm(e.target.value)}
        placeholder="Search vaults..."
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
              value: "password_count-desc",
              label: "Number of items (highest first)",
            },
            {
              value: "password_count-asc",
              label: "Number of items (lowest first)",
            },
          ]}
        />
      </div>
      <div className="mb-2 shrink-0 lg:mb-0">
        <AddVault />
      </div>
    </div>
  );
}
export default VaultTableOperations;
