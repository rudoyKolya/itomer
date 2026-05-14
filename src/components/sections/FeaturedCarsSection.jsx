import { lazy, Suspense, useLayoutEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence } from "framer-motion";
import { useLanguage } from "../../context/useLanguage";
import CarCard from "../ui/CarCard";

const CarModal = lazy(() => import("../ui/CarModal"));

gsap.registerPlugin(ScrollTrigger);

const baseUrl = import.meta.env.BASE_URL;

const carImages = (folder, count) =>
    Array.from({ length: count }, (_, index) => `${baseUrl}images/cars/${folder}/${folder}-${index + 1}.jpg`);

const carAssetsData = [
    {
        id: "bentley_bentayga_s",
        image: `${baseUrl}images/cars/Bentley_Bentayga_S/Bentley_Bentayga_S-1.jpg`,
        images: carImages("Bentley_Bentayga_S", 3),
        audio: `${baseUrl}audio/cars/Bentley_Bentayga_S.mp3`,
    },
    {
        id: "bmw_m8_competition_cabriolet",
        image: `${baseUrl}images/cars/BMW_M8_Competition/BMW_M8_Competition-1.jpg`,
        images: carImages("BMW_M8_Competition", 3),
        audio: `${baseUrl}audio/cars/BMW_M8_Competition.mp3`,
    },
    {
        id: "ferrari_296_gts",
        image: `${baseUrl}images/cars/ferrari_296_GTS_supercar_technology/ferrari_296_GTS_supercar_technology-1.jpg`,
        images: carImages("ferrari_296_GTS_supercar_technology", 5),
        audio: `${baseUrl}audio/cars/ferrari_296_GTS_supercar_technology.mp3`,
    },
    {
        id: "ferrari_purosangue",
        image: `${baseUrl}images/cars/Ferrari_Purosangue/Ferrari_Purosangue-1.jpg`,
        images: carImages("Ferrari_Purosangue", 3),
        audio: `${baseUrl}audio/cars/Ferrari_Purosangue.mp3`,
    },
    {
        id: "ferrari_12cilindri",
        image: `${baseUrl}images/cars/ferrarri_12cilindri/ferrarri_12cilindri-1.jpg`,
        images: carImages("ferrarri_12cilindri", 5),
        audio: `${baseUrl}audio/cars/ferrarri_12cilindri.mp3`,
    },
    {
        id: "mercedes_amg_sl_63_roadster",
        image: `${baseUrl}images/cars/MercedesBenz_SL_63_AMG/MercedesBenz_SL_63_AMG-1.jpg`,
        images: carImages("MercedesBenz_SL_63_AMG", 5),
        audio: `${baseUrl}audio/cars/MercedesBenz_SL_63_AMG.mp3`,
    },
    {
        id: "mercedes_amg_g_63",
        image: `${baseUrl}images/cars/Mercedes_AMG_G_63_Iconic/Mercedes_AMG_G_63_Iconic-1.jpg`,
        images: carImages("Mercedes_AMG_G_63_Iconic", 4),
        audio: `${baseUrl}audio/cars/Mercedes_AMG_G_63_Iconic.mp3`,
    },
    {
        id: "porsche_911_turbo_s_cabriolet",
        image: `${baseUrl}images/cars/porsche_911/porsche_911-1.jpg`,
        images: carImages("porsche_911", 6),
        audio: `${baseUrl}audio/cars/porsche_911.mp3`,
    },
];

function FeaturedCarsSection() {
    const { t, language } = useLanguage();
    const isRtl = language === "ar";
    const [selectedCar, setSelectedCar] = useState(null);

    const sectionRef = useRef(null);
    const trackRef = useRef(null);

    const localizedCarsData = useMemo(
        () => carAssetsData.map((car) => {
            const translation = t(`cars.${car.id}`);
            const hasTranslation = translation && typeof translation === "object";

            return {
                ...car,
                name: hasTranslation ? translation.name : car.id,
                description: hasTranslation ? translation.description : "",
                year: hasTranslation ? translation.year : "",
                specs: hasTranslation ? translation.specs : {},
            };
        }),
        [t]
    );

    useLayoutEffect(() => {
        const section = sectionRef.current;
        const track = trackRef.current;

        if (!section || !track) return undefined;

        const mm = gsap.matchMedia();

        mm.add("(min-width: 1024px)", () => {
            const ctx = gsap.context(() => {
                const getWindowWidth = () => window.innerWidth;
                const getTrackWidth = () => track.scrollWidth;
                const getStartOffset = () => getWindowWidth() * 0.35;
                const getEndOffset = () => getWindowWidth() * 0.45;
                const getTotalDistance = () => getTrackWidth() + getStartOffset() + getEndOffset();

                gsap.set(track, {
                    x: () => (isRtl ? -getStartOffset() : getStartOffset()),
                    force3D: true,
                });

                const timeline = gsap.timeline({
                    defaults: { ease: "none" },
                    scrollTrigger: {
                        trigger: section,
                        start: "top top",
                        end: () => `+=${getTotalDistance() * 0.58}`,
                        scrub: 1.5,
                        pin: true,
                        pinSpacing: true,
                        anticipatePin: 1,
                        invalidateOnRefresh: true,
                        refreshPriority: 1,
                        fastScrollEnd: false,
                        onRefreshInit: () => {
                            const startOffset = getStartOffset();

                            gsap.set(track, {
                                x: isRtl ? -startOffset : startOffset,
                            });
                        },
                    },
                });

                timeline.to(track, {
                    x: () => {
                        const endX = getTrackWidth() - getEndOffset();

                        return isRtl ? endX : -endX;
                    },
                });

                const handleLoad = () => {
                    ScrollTrigger.refresh();
                };

                const handleResize = () => {
                    ScrollTrigger.refresh();
                };

                window.addEventListener("load", handleLoad);
                window.addEventListener("resize", handleResize);

                return () => {
                    window.removeEventListener("load", handleLoad);
                    window.removeEventListener("resize", handleResize);
                };
            }, section);

            return () => ctx.revert();
        });

        mm.add("(max-width: 1023px)", () => {
            gsap.set(track, { clearProps: "transform" });

            return () => {
                gsap.set(track, { clearProps: "transform" });
            };
        });

        return () => mm.revert();
    }, [isRtl]);

    return (
        <section
            id="featured"
            ref={sectionRef}
            className="relative overflow-hidden bg-[#efebe5] text-[#2a2118]"
        >
            <div className="flex flex-col justify-center py-24 lg:h-screen lg:py-0">
                <div className="mx-auto w-full max-w-[1440px] px-5 md:px-8 xl:px-20">
                    <div className="mb-12 max-w-[760px] shrink-0 text-center md:text-left">
                        <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#856333]">
                            {t("featured.eyebrow")}
                        </p>

                        <h2 className="mt-2 font-serif text-[3rem] leading-[0.95] sm:text-[4rem] lg:text-[5.2rem]">
                            {t("featured.title")}
                        </h2>
                    </div>
                </div>

                <div
                    ref={trackRef}
                    data-track=""
                    className="flex flex-col items-center gap-10 px-5 will-change-transform md:px-8 lg:h-[500px] lg:flex-row lg:items-start lg:gap-8 lg:px-20"
                >
                    {localizedCarsData.map((car) => (
                        <CarCard key={car.id} car={car} onOpen={setSelectedCar} />
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {selectedCar && (
                    <Suspense fallback={null}>
                        <CarModal
                            car={selectedCar}
                            isOpen={!!selectedCar}
                            onClose={() => setSelectedCar(null)}
                        />
                    </Suspense>
                )}
            </AnimatePresence>
        </section>
    );
}

export default FeaturedCarsSection;
