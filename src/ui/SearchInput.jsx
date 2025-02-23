import { HiOutlineMagnifyingGlass } from "react-icons/hi2";

function SearchInput({ searchTerm, onChange, placeholder }) {
  return (
    <div className="relative shrink-0">
      <input
        className="input"
        placeholder={placeholder}
        value={searchTerm}
        onChange={onChange}
      />
      <div className="bg-ocean-100 dark:bg-charcoal-800 text-charcoal-300 absolute top-2 right-2.5">
        <HiOutlineMagnifyingGlass size={18} className="mt-1" />
      </div>
    </div>
  );
}

export default SearchInput;
