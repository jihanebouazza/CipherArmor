import Loader from "../../ui/Loader";

function DashboardLoader({ width = 50 }) {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Loader width={width} />
    </div>
  );
}

export default DashboardLoader;
