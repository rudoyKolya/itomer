import SmoothScroll from "./components/SmoothScroll";
import Header from "./components/layout/Header";
import HeroSection from "./components/sections/HeroSection";
import AboutSection from "./components/sections/AboutSection";
import ServicesSection from "./components/sections/ServicesSection";
import FeaturedCarsSection from "./components/sections/FeaturedCarsSection";
import ContactSection from "./components/sections/ContactSection";

function App() {
    return (
        <SmoothScroll>
            <Header />
            <HeroSection />
            <AboutSection />
            <ServicesSection />
            <FeaturedCarsSection />
            <ContactSection />
        </SmoothScroll>
    );
}

export default App;