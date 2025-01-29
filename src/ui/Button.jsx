function Button({ type = "primary",extraStyles='' , children, onClick=()=>{} }) {
  const base = `${extraStyles} font-heading cursor-pointer `;

  const styles = {
    primary: base + "px-4 py-1.5 bg-ocean-500 text-blanc-100 rounded-lg",
    secondary:
      base +
      "px-4 py-1.5 border rounded-lg bg-transparent dark:border-charcoal-100 dark:text-charcoal-100 hover:bg-charcoal-800 hover:text-charcoal-100 transition duration-300",
    primarysm: base + "px-2 py-0.5 bg-ocean-500 text-blanc-100 rounded-xl",
    secondarysm: base + "px-2 py-0.5 border bg-transparent rounded-xl dark:border-charcoal-100 dark:text-charcoal-100 hover:bg-charcoal-800 hover:text-charcoal-100 dark:hover:bg-charcoal-100 dark:hover:text-charcoal-800 transition duration-300",
  };

  return <button onClick={onClick} className={styles[type]}>{children}</button>;
}

export default Button;
