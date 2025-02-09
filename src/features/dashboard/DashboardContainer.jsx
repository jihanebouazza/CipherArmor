import ContainerLoader from "../../ui/ContainerLoader";
import { useUser } from "../authentication/useUser";
import DashboardHeader from "./DashboardHeader";

function DashboardContainer() {
  const { isPending, user } = useUser();

  if (isPending) return <ContainerLoader />;

  return (
    <>
      <DashboardHeader title="Dashboard">
        Welcome back,{" "}
        <span className="capitalize">{user?.user_metadata?.fullName}!</span>
        <br />
        Let&apos;s see what&apos;s new.
      </DashboardHeader>
      <div className="py-4">Dashboard</div>
    </>
  );
}

export default DashboardContainer;
