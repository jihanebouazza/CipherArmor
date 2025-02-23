function Select({ options, onChange, value, defaultSelected }) {
  return (
    <select className="input" onChange={onChange} value={value}>
      {defaultSelected && (
        <option
          value={defaultSelected.value}
          disabled={value === defaultSelected.value}
        >
          {defaultSelected.label}
        </option>
      )}
      {options.map((option) => (
        <option
          value={option.value}
          key={option.value}
          disabled={value === option.value}
        >
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default Select;
