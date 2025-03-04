import { useSearchParams } from "react-router";
import Select from "./Select";

function Filter({ filterField, options }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const newOptions = [{ value: "all", label: "All" }, ...options];

  const currentFilter = searchParams.get(filterField) || newOptions.at(0).value;

  function handleChange(e) {
    const value = e.target.value;
    searchParams.set(filterField, value);
    if (searchParams.get("page")) searchParams.set("page", 1);
    setSearchParams(searchParams);
  }

  return (
    <Select
      options={newOptions}
      onChange={handleChange}
      value={currentFilter}
    />
  );
}

export default Filter;
