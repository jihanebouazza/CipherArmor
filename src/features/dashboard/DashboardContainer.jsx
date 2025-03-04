import ContainerLoader from "../../ui/ContainerLoader";
import { useUser } from "../authentication/useUser";
import DashboardHeader from "./DashboardHeader";

function DashboardContainer() {
  const { user, isPending } = useUser();

  if (isPending) return <ContainerLoader />;

  return (
    <>
      <DashboardHeader title="Dashboard">
        Welcome back,{" "}
        <span className="capitalize">{user?.user_metadata?.fullName}!</span>
        <br />
        Let&apos;s see what&apos;s new.
      </DashboardHeader>
      <div className="grid w-full grid-cols-12 gap-2 rounded-2xl py-4">
        <div className="border-ocean-200 col-span-2 rounded-2xl border px-4 py-3 shadow-xs">
          Hello world Hello world Hello world
        </div>
      </div>
    </>
  );
}

export default DashboardContainer;
