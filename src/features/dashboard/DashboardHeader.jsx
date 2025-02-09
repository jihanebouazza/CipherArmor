import ThemeSwitch from "../../ui/ThemeSwitch";

function DashboardHeader({ title, children }) {
  return (
    <div className="flex items-start justify-between">
      <div>
        <h3 className="font-heading text-sm text-[32px] font-bold">{title}</h3>
        <p className="dark:text-charcoal-400 text-charcoal-600 leading-5">
          {children}
        </p>
      </div>
      <div>
        <ThemeSwitch />
      </div>
    </div>
  );
}

export default DashboardHeader;
