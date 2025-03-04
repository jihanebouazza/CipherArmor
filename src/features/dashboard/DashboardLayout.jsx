import { Outlet } from "react-router";
import DashboardNavbar from "./DashboardNavbar";

function DashboardLayout() {
  return (
    <main className="bg-ocean-100 dark:bg-charcoal-800 dark:text-blanc-100 flex h-fit w-full justify-between">
      <DashboardNavbar />
      <section className="ml-16 flex min-h-screen w-full flex-col bg-inherit px-6 py-4">
        <Outlet />
      </section>
    </main>
  );
}

export default DashboardLayout;
