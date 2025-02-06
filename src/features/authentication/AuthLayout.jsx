import { Outlet, useNavigate } from "react-router";
import Logo from "../../ui/Logo";
import AuthFooter from "./AuthFooter";
import AuthBentoBox from "./AuthBentoBox";
import ThemeSwitch from "../../ui/ThemeSwitch";
import { useUser } from "./useUser";
import { useEffect } from "react";
import ContainerLoader from "../../ui/ContainerLoader";

function AuthLayout() {
  const { isAuthenticated, isPending } = useUser();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (isAuthenticated && !isPending) navigate("/", { replace: true });
    },
    [isAuthenticated, isPending, navigate],
  );

  if (isPending) return <ContainerLoader />;

  if (isAuthenticated && !isPending) return null;

  return (
    <main className="dark:bg-charcoal-800 bg-ocean-100 3xl:justify-center flex h-fit flex-col xl:h-screen xl:flex-row xl:items-start xl:justify-between 2xl:text-[18px]">
      <section className="3xl:w-full flex h-auto items-center justify-center lg:mx-auto lg:w-[70%] xl:h-screen xl:w-1/2">
        <div className="3xl:p-12 3xl:m-0 flex h-fit flex-col items-center gap-4 py-4 md:items-center md:justify-between xl:h-screen 2xl:-mr-25 2xl:py-25 2xl:pl-10">
          <div className="flex w-full items-center justify-between px-4 md:block md:w-auto md:items-start md:justify-start md:px-0">
            <Logo />
            <div className="block md:hidden">
              <ThemeSwitch />
            </div>
          </div>

          <div className="dark:text-charcoal-100 mx-auto w-full max-w-[400px] min-w-[70%] rounded-2xl p-6 2xl:p-8">
            <Outlet />
          </div>
          <AuthFooter />
        </div>
      </section>
      <section className="bg-ocean-200 border-ocean-100 dark:bg-charcoal-900 dark:border-charcoal-800 3xl:hidden mx-auto grid h-auto grid-cols-5 gap-4 rounded-[40px] border-16 p-4 lg:w-[85%] xl:h-screen xl:w-1/2 xl:grid-rows-3 2xl:gap-4 2xl:rounded-[150px] 2xl:border-100 2xl:p-6">
        <AuthBentoBox />
      </section>
    </main>
  );
}

export default AuthLayout;
