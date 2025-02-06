import Loader from "./Loader";

function ContainerLoader() {
  return (
    <div className="bg-ocean-100 dark:bg-charcoal-800 flex h-screen w-full items-center justify-center">
      <Loader width="80" />
    </div>
  );
}

export default ContainerLoader;
