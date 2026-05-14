import { lazy, Suspense, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence } from "framer-motion";
import { useLanguage } from "../../context/useLanguage";
import CarCard from "../ui/CarCard";

const CarModal = lazy(() => import("../ui/CarModal"));

gsap.registerPlugin(ScrollTrigger);

const baseUrl = import.meta.env.BASE_URL;

const baseCarsData = [
    {
        id: "ferrari",
        year: "2023",
        image: `${baseUrl}images/cars/ferrari-sf90.avif`,
        audio: `${baseUrl}audio/cars/ferrari-sf90.mp3`,
        specs: {
            engine: "4.0L V8 Hybrid",
            power: "1,000 hp",
            acceleration: "2.5 sec",
            top_speed: "340 km/h",
            transmission: "8-Speed DCT",
            drivetrain: "AWD",
            mileage: "2,500 km",
            fuel: "Hybrid",
            body: "Coupe",
            condition: "Like New",
        },
    },
    {
        id: "lamborghini",
        year: "2022",
        image: `${baseUrl}images/cars/lamborghini-urus.avif`,
        audio: `${baseUrl}audio/cars/lamborghini-urus.mp3`,
        specs: {
            engine: "4.0L V8 Turbo",
            power: "641 hp",
            acceleration: "3.6 sec",
            top_speed: "305 km/h",
            transmission: "8-Speed Auto",
            drivetrain: "AWD",
            mileage: "18,000 km",
            fuel: "Petrol",
            body: "SUV",
            condition: "Excellent",
        },
    },
    {
        id: "porsche",
        year: "2024",
        image: `${baseUrl}images/cars/porsche-911.avif`,
        audio: `${baseUrl}audio/cars/porsche-911.mp3`,
        specs: {
            engine: "3.8L Flat-6",
            power: "640 hp",
            acceleration: "2.6 sec",
            top_speed: "330 km/h",
            transmission: "8-Speed PDK",
            drivetrain: "AWD",
            mileage: "1,200 km",
            fuel: "Petrol",
            body: "Coupe",
            condition: "New",
        },
    },
    {
        id: "mercedes",
        year: "2023",
        image: `${baseUrl}images/cars/amg-gt.avif`,
        audio: `${baseUrl}audio/cars/amg-gt.mp3`,
        specs: {
            engine: "4.0L V8 BiTurbo",
            power: "523 hp",
            acceleration: "3.7 sec",
            top_speed: "312 km/h",
            transmission: "7-Speed DCT",
            drivetrain: "RWD",
            mileage: "8,500 km",
            fuel: "Petrol",
            body: "Coupe",
            condition: "Excellent",
        },
    },
    {
        id: "bentley",
        year: "2022",
        image: `${baseUrl}images/cars/bentley-gt.avif`,
        audio: `${baseUrl}audio/cars/bentley-gt.mp3`,
        specs: {
            engine: "6.0L W12 Turbo",
            power: "626 hp",
            acceleration: "3.6 sec",
            top_speed: "333 km/h",
            transmission: "8-Speed DCT",
            drivetrain: "AWD",
            mileage: "12,000 km",
            fuel: "Petrol",
            body: "Coupe",
            condition: "Excellent",
        },
    },
    {
        id: "aston_martin",
        year: "2023",
        image: `${baseUrl}images/cars/aston-martin-db11.avif`,
        audio: `${baseUrl}audio/cars/aston-martin-db11.mp3`,
        specs: {
            engine: "4.0L V8 Turbo",
            power: "528 hp",
            acceleration: "4.0 sec",
            top_speed: "309 km/h",
            transmission: "8-Speed Auto",
            drivetrain: "RWD",
            mileage: "5,000 km",
            fuel: "Petrol",
            body: "Coupe",
            condition: "Like New",
        },
    },
];

function FeaturedCarsSection() {
    const { t, language } = useLanguage();
    const isRtl = language === "ar";
    const [selectedCar, setSelectedCar] = useState(null);

    const sectionRef = useRef(null);
    const trackRef = useRef(null);

    const localizedCarsData = baseCarsData.map((car) => ({
        ...car,
        name: t(`cars.${car.id}.name`),
        description: t(`cars.${car.id}.description`),
    }));

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
    }, [isRtl, language]);

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