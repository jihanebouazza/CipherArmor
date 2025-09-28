import FeaturesSection from "../features/home/FeaturesSection";
import Footer from "../features/home/Footer";
import Hero from "../features/home/Hero";
import Navbar from "../features/home/Navbar";
import SecurityAssuranceSection from "../features/home/SecurityAssuranceSection";

function Home() {
  return (
   <div>
      <Navbar/> 
      <Hero /> 
      <FeaturesSection />
      <SecurityAssuranceSection />
      <Footer />
    </div>
  );
}

export default Home;
