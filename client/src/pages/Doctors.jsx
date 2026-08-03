import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Services from "../components/Services";
import Doctors from "../components/Doctors";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <Doctors />
    </>
  );
}

export default Home;