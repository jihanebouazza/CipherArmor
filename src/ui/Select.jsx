function Select({ options, onChange, value }) {
  return (
    <select className="input" onChange={onChange} value={value}>
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
