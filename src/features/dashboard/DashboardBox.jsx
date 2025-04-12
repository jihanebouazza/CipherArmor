function DashboardBox({ children, extraStyles }) {
  return (
    <div
      className={`border-ocean-200 shadow-ocean-200 dark:border-charcoal-700 dark:shadow-charcoal-700 rounded-2xl border shadow-xs ${extraStyles}`}
    >
      {children}
    </div>
  );
}

export default DashboardBox;
