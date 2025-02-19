function PasswordTag({ Icon, title = "", type = "safe" }) {
  const colors = {
    danger: "text-ruby-500 dark:text-ruby-600 bg-ruby-100",
    caution: "text-butter-500 dark:text-butter-600 bg-butter-100",
    warning: "text-rust-500 dark:text-rust-600 bg-rust-100",
    safe: "text-mint-500 dark:text-mint-600 bg-mint-100",
  };

  return (
    <div
      className={`${colors[type]} mb-2 flex w-fit items-center justify-center gap-1 rounded-2xl px-3 py-1 text-sm`}
    >
      <div>
        <Icon size={18} />
      </div>
      <p>{title}</p>
    </div>
  );
}

export default PasswordTag;
