import { lazy, Suspense } from "react";
import SmoothScroll from "./components/SmoothScroll";
import Header from "./components/layout/Header";
import HeroSection from "./components/sections/HeroSection";
import { LanguageProvider } from "./context/LanguageProvider";
import CustomCursor from "./components/ui/CustomCursor.jsx";

const AboutSection = lazy(() => import("./components/sections/AboutSection"));
const ServicesSection = lazy(() => import("./components/sections/ServicesSection"));
const EuropeMap = lazy(() => import("./components/ui/EuropeMap.jsx"));
const FeaturedCarsSection = lazy(() => import("./components/sections/FeaturedCarsSection"));
const ContactSection = lazy(() => import("./components/sections/ContactSection"));

function App() {
    return (
        <LanguageProvider>
            <SmoothScroll>
                <CustomCursor />
                <Header />
                <HeroSection />
                <Suspense fallback={null}>
                    <AboutSection />
                    <ServicesSection />
                    <EuropeMap />
                    <FeaturedCarsSection />
                    <ContactSection />
                </Suspense>
            </SmoothScroll>
        </LanguageProvider>
    );
}

export default App;