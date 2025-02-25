function SettingBlock({ children, heading, subHeading }) {
  return (
    <div className="flex items-center justify-between gap-2 py-2">
      <div>
        <p className="leading-5 font-medium">{heading}</p>
        <p className="dark:text-charcoal-400 text-charcoal-600 text-sm leading-5">
          {subHeading}
        </p>
      </div>
      {children}
    </div>
  );
}

export default SettingBlock;
