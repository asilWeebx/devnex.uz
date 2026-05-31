import { LangProvider } from "./context/LangContext";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import TechOrbit from "./components/TechOrbit";
import Process from "./components/Process";
import Portfolio from "./components/Portfolio";
import CtaBanner from "./components/CtaBanner";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <LangProvider>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <TechOrbit />
        <Process />
        <Portfolio />
        <CtaBanner />
        <Contact />
      </main>
      <Footer />
    </LangProvider>
  );
}
