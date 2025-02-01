function Button({
  type = "primary",
  extraStyles = "",
  children,
  onClick = () => {},
}) {
  const base = `${extraStyles} font-heading cursor-pointer 2xl:text-[18px] `;

  const styles = {
    primary:
      base +
      "hover:bg-ocean-600 px-4 py-1.5 bg-ocean-500 text-blanc-100 rounded-lg transition duration-300 ",
    secondary:
      base +
      "px-4 py-1.5 border rounded-lg bg-transparent dark:border-charcoal-100 dark:text-charcoal-100 hover:bg-charcoal-800 hover:text-charcoal-100",
    primarysm:
      base +
      "hover:bg-ocean-600 px-2 py-0.5 bg-ocean-500 text-blanc-100 rounded-xl",
    secondarysm:
      base +
      "px-2 py-0.5 border bg-transparent rounded-xl dark:border-charcoal-100 dark:text-charcoal-100 hover:bg-charcoal-800 hover:text-charcoal-100 dark:hover:bg-charcoal-100 dark:hover:text-charcoal-800",
  };

  return (
    <button onClick={onClick} className={styles[type]}>
      {children}
    </button>
  );
}

export default Button;
