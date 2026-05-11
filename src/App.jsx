import SmoothScroll from "./components/SmoothScroll";
import Header from "./components/layout/Header";
import HeroSection from "./components/sections/HeroSection";
import AboutSection from "./components/sections/AboutSection";
import ServicesSection from "./components/sections/ServicesSection";
import FeaturedCarsSection from "./components/sections/FeaturedCarsSection";
import ContactSection from "./components/sections/ContactSection";
import { LanguageProvider } from "./context/LanguageContext";
import EuropeMap from "./components/ui/EuropeMap.jsx";
import CustomCursor from "./components/ui/CustomCursor.jsx";

function App() {
    return (
        <LanguageProvider>
            <SmoothScroll>
                <CustomCursor />
                <Header />
                <HeroSection />
                <AboutSection />
                <ServicesSection />
                <EuropeMap />
                <FeaturedCarsSection />
                <ContactSection />
            </SmoothScroll>
        </LanguageProvider>
    );
}

export default App;