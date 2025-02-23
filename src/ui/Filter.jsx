import { useSearchParams } from "react-router";
import Select from "./Select";

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
    <Select
      options={options}
      onChange={handleChange}
      value={currentFilter}
      defaultSelected={{ value: "all", label: "All" }}
    />
  );
}

export default Filter;
