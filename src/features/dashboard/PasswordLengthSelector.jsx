function PasswordLengthSelector({ length, setLength, min }) {
  return (
    <div className="flex items-center justify-between">
      <p className="dark:text-charcoal-50 font-medium">Length</p>
      <div className="flex w-full items-center gap-2">
        <input
          min={min > 8 ? min : 8}
          max={50}
          type="range"
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          className="accent-ocean-500 active:accent-ocean-500 hover:accent-ocean-500 ml-auto h-1 w-2/3 outline-none"
        />
        <p className="dark:text-charcoal-50">{length}</p>
      </div>
    </div>
  );
}

export default PasswordLengthSelector;
