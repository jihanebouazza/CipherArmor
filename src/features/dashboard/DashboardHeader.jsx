import ThemeSwitch from "../../ui/ThemeSwitch";

function DashboardHeader({ title, children }) {
  return (
    <div className="flex items-start justify-between">
      <div>
        <h3 className="font-heading text-2xl font-bold md:text-[32px]">
          {title}
        </h3>
        <p className="dark:text-charcoal-400 text-charcoal-600 text-sm leading-5 md:text-base">
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
