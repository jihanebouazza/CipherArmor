import { useSearchParams } from "react-router";

function Filter({ filterField, options }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentFilter = searchParams.get(filterField) || options.at(0).value;

  function handleChange(e) {
    const value = e.target.value;
    searchParams.set(filterField, value);
    if (searchParams.get("page")) searchParams.set("page", 1);
    setSearchParams(searchParams);
  }

  return (
    <select className="input" onChange={handleChange} value={currentFilter}>
      <option value="all" disabled={currentFilter ==="all"}>All</option>
      {options.map((option) => (
        <option
          value={option.value}
          key={option.value}
          disabled={currentFilter === option.value}
        >
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default Filter;
