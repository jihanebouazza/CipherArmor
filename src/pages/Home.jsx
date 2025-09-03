import Hero from "../features/home/Hero";
import Navbar from "../features/home/Navbar";

function Home() {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <Hero />
    </div>
  );
}

export default Home;
