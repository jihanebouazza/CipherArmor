import Loader from "./Loader";

function ContainerLoader() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Loader width="80" />
    </div>
  );
}

export default ContainerLoader;
