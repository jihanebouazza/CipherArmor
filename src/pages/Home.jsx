import FeaturesSection from "../features/home/FeaturesSection";
import Footer from "../features/home/Footer";
import Hero from "../features/home/Hero";
import Navbar from "../features/home/Navbar";
import SecurityAssuranceSection from "../features/home/SecurityAssuranceSection";

function Home() {
  return (
    <>
      <div className="flex h-screen flex-col">
        <Navbar />
        <Hero />
      </div>
      <FeaturesSection />
      <SecurityAssuranceSection />
      <Footer />
    </>
  );
}

export default Home;
