import { Outlet } from "react-router";
import Logo from "../../ui/Logo";
import AuthFooter from "./AuthFooter";
import AuthBentoBox from "./AuthBentoBox";

function AuthLayout() {
  return (
    <main className={`dark:bg-charcoal-800 bg-ocean-100 flex h-screen`}>
      <section className="flex h-screen w-1/2 items-center justify-center">
        {/* border dark:border-charcoal-500 border-ocean-200  */}
        <div className="flex h-screen flex-col items-center justify-between py-4">
          <Logo />
          <div className="dark:text-charcoal-100 min-w-[70%] rounded-2xl p-6">
            <Outlet />
          </div>
          <AuthFooter />
        </div>
      </section>
      <section className="bg-ocean-200 border-ocean-100 dark:bg-charcoal-900 dark:border-charcoal-800 grid h-screen w-1/2 grid-cols-5 grid-rows-3 gap-4 rounded-[40px] border-16 p-4">
        <AuthBentoBox />
      </section>
    </main>
  );
}

export default AuthLayout;
