function Button({
  type = "primary",
  extraStyles = "",
  children,
  disabled,
  reset = false,
  onClick = () => {},
}) {
  const base = `${extraStyles} font-heading cursor-pointer 2xl:text-[18px] flex items-center justify-center focus:outline-none focus:ring-1 focus:ring-offset-2 focus:dark:ring-offset-charcoal-800 transition duration-300 `;

  const styles = {
    primary:
      base +
      "hover:bg-ocean-600 px-4 py-1.5 bg-ocean-500 text-blanc-100 rounded-lg focus:ring-ocean-400 dark:focus:ring-charcoal-600",
    secondary:
      base +
      "px-4 py-1.5 border rounded-lg bg-transparent dark:border-charcoal-100 dark:text-charcoal-100 hover:bg-charcoal-800 hover:text-charcoal-100 ",
    primarysm:
      base +
      "hover:bg-ocean-600 px-2 py-0.5 bg-ocean-500 text-blanc-100 rounded-xl focus:ring-ocean-400 dark:focus:ring-charcoal-600",
    primaryxs:
      base +
      "hover:bg-ocean-600 px-2 bg-ocean-500 text-blanc-100 rounded-lg focus:ring-ocean-400 dark:focus:ring-charcoal-600",
    secondarysm:
      base +
      "px-2 py-0.5 border bg-transparent rounded-xl dark:border-charcoal-100 dark:text-charcoal-100 hover:bg-charcoal-800 hover:text-charcoal-100 dark:hover:bg-charcoal-100 dark:hover:text-charcoal-800",
    raw:
      base +
      "rounded-lg focus:ring-charcoal-100 focus:ring-offset-ocean-100 dark:focus:ring-charcoal-700 border border-charcoal-100 px-4 py-1.5",
    rawlg:
      base +
      "rounded-lg focus:ring-charcoal-100 focus:ring-offset-ocean-100 dark:focus:ring-charcoal-700 border border-charcoal-100 p-2",
    rawsm:
      base +
      "rounded-lg focus:ring-charcoal-100 focus:ring-offset-ocean-100 dark:focus:ring-charcoal-700 border border-charcoal-100",
    rawmd:
      base +
      "rounded-lg focus:ring-charcoal-100 focus:ring-offset-ocean-100 dark:focus:ring-charcoal-700 border border-charcoal-100 px-2 py-0.5",
    rawxs:
      base +
      "rounded-lg focus:ring-charcoal-100 focus:ring-offset-ocean-100 dark:focus:ring-charcoal-700 border border-charcoal-100 px-2",
    danger:
      base +
      "bg-ruby-500 dark:bg-ruby-600 px-4 py-1.5 text-blanc-100 rounded-lg focus:ring-ruby-600 dark:focus:ring-ruby-900",
    dangersecondary:
      base +
      "text-ruby-500 dark:text-ruby-400 border border-ruby-500 dark:border-ruby-400 px-4 py-1.5 rounded-lg focus:ring-ruby-600 dark:focus:ring-ruby-900",
  };

  return (
    <button
      className={styles[type]}
      onClick={onClick}
      disabled={disabled}
      type={reset ? "reset" : undefined}
    >
      {children}
    </button>
  );
}

export default Button;
