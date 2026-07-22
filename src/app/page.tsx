import AboutUs from "./components/AboutUs";
import Brands from "./components/Brands";
import Clients from "./components/Clients";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Gallery from "./components/Gallery";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import WhatsAppButton from "./components/WhatsAppButton";

export default function HomePage() {
  return (
    <>
      <Header />

      <main>
        <Hero />

        <AboutUs />

        <Services />

        <Gallery />

        <Brands />

        <Clients />

        <Contact />
      </main>

      <Footer />

      <WhatsAppButton />
    </>
  );
}