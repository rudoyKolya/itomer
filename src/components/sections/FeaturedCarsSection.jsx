import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "../../context/LanguageContext";
import { AnimatePresence } from "framer-motion";
import CarCard from "../ui/CarCard";
import CarModal from "../ui/CarModal";

gsap.registerPlugin(ScrollTrigger);

// Теперь здесь только технические данные и пути к медиафайлам
const baseCarsData = [
    {
        id: "ferrari", // Уникальный ключ для локализации
        year: "2023",
        image: "/itomer/images/cars/ferrari-sf90.avif",
        audio: "/itomer/audio/cars/ferrari-sf90.mp3",
        specs: { engine: "4.0L V8 Hybrid", power: "1,000 hp", acceleration: "2.5 sec", top_speed: "340 km/h", transmission: "8-Speed DCT", drivetrain: "AWD", mileage: "2,500 km", fuel: "Hybrid", body: "Coupe", condition: "Like New" }
    },
    {
        id: "lamborghini",
        year: "2022",
        image: "/itomer/images/cars/lamborghini-urus.avif",
        audio: "/itomer/audio/cars/lamborghini-urus.mp3",
        specs: { engine: "4.0L V8 Turbo", power: "641 hp", acceleration: "3.6 sec", top_speed: "305 km/h", transmission: "8-Speed Auto", drivetrain: "AWD", mileage: "18,000 km", fuel: "Petrol", body: "SUV", condition: "Excellent" }
    },
    {
        id: "porsche",
        year: "2024",
        image: "/itomer/images/cars/porsche-911.avif",
        audio: "/itomer/audio/cars/porsche-911.mp3",
        specs: { engine: "3.8L Flat-6", power: "640 hp", acceleration: "2.6 sec", top_speed: "330 km/h", transmission: "8-Speed PDK", drivetrain: "AWD", mileage: "1,200 km", fuel: "Petrol", body: "Coupe", condition: "New" }
    },
    {
        id: "mercedes",
        year: "2023",
        image: "/itomer/images/cars/amg-gt.avif",
        audio: "/itomer/audio/cars/amg-gt.mp3",
        specs: { engine: "4.0L V8 BiTurbo", power: "523 hp", acceleration: "3.7 sec", top_speed: "312 km/h", transmission: "7-Speed DCT", drivetrain: "RWD", mileage: "8,500 km", fuel: "Petrol", body: "Coupe", condition: "Excellent" }
    },
    {
        id: "bentley",
        year: "2022",
        image: "/itomer/images/cars/bentley-gt.avif",
        audio: "/itomer/audio/cars/bentley-gt.mp3",
        specs: { engine: "6.0L W12 Turbo", power: "626 hp", acceleration: "3.6 sec", top_speed: "333 km/h", transmission: "8-Speed DCT", drivetrain: "AWD", mileage: "12,000 km", fuel: "Petrol", body: "Coupe", condition: "Excellent" }
    },
    {
        id: "aston_martin",
        year: "2023",
        image: "/itomer/images/cars/aston-martin-db11.avif",
        audio: "/itomer/audio/cars/aston-martin-db11.mp3",
        specs: { engine: "4.0L V8 Turbo", power: "528 hp", acceleration: "4.0 sec", top_speed: "309 km/h", transmission: "8-Speed Auto", drivetrain: "RWD", mileage: "5,000 km", fuel: "Petrol", body: "Coupe", condition: "Like New" }
    }
];

function FeaturedCarsSection() {
    const { t, language } = useLanguage();
    const isRtl = language === "ar";
    const [selectedCar, setSelectedCar] = useState(null);

    const sectionRef = useRef(null);
    const trackRef = useRef(null);

    // Собираем финальный массив машин с переведенным текстом
    const localizedCarsData = baseCarsData.map((car) => ({
        ...car,
        name: t(`cars.${car.id}.name`),
        description: t(`cars.${car.id}.description`),
    }));

    useLayoutEffect(() => {
        const section = sectionRef.current;
        const track = trackRef.current;
        if (!section || !track) return;

        const mm = gsap.matchMedia();
        mm.add("(min-width: 1024px)", () => {
            const ctx = gsap.context(() => {
                const trackWidth = track.scrollWidth;
                const windowWidth = window.innerWidth;
                const totalDistance = trackWidth + windowWidth;

                gsap.set(track, { x: isRtl ? -windowWidth : windowWidth });

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: section,
                        start: "top top",
                        end: () => `+=${totalDistance * 0.8}`,
                        scrub: 1.5,
                        pin: true,
                        invalidateOnRefresh: true,
                    }
                });

                tl.to(track, {
                    x: () => isRtl ? trackWidth : -trackWidth,
                    ease: "none"
                });

            }, section);
            return () => ctx.revert();
        });
        return () => mm.revert();
    }, [isRtl]);

    return (
        <section id="featured" ref={sectionRef} className="relative bg-[#efebe5] text-[#2a2118] overflow-hidden">
            <div className="flex flex-col justify-center lg:h-screen py-24 lg:py-0">
                <div className="mx-auto w-full max-w-[1440px] px-5 md:px-8 xl:px-20">
                    <div className="mb-12 max-w-[760px] shrink-0 text-center md:text-left">
                        <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#856333]">{t("featured.eyebrow")}</p>
                        <h2 className="mt-2 font-serif text-[3rem] sm:text-[4rem] lg:text-[5.2rem] leading-[0.95]">{t("featured.title")}</h2>
                    </div>
                </div>

                <div
                    ref={trackRef}
                    className="flex flex-col items-center gap-10 px-5 md:px-8 lg:flex-row lg:items-start lg:gap-8 lg:px-20 lg:h-[500px] will-change-transform"
                >
                    {localizedCarsData.map((car) => (
                        <CarCard key={car.id} car={car} onOpen={setSelectedCar} />
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {selectedCar && (
                    <CarModal car={selectedCar} isOpen={!!selectedCar} onClose={() => setSelectedCar(null)} />
                )}
            </AnimatePresence>
        </section>
    );
}

export default FeaturedCarsSection;