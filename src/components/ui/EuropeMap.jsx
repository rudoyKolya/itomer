import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "../../context/useLanguage";

gsap.registerPlugin(ScrollTrigger);

const baseUrl = import.meta.env.BASE_URL;

const MAP_WIDTH = 2400;
const MAP_HEIGHT = 1300;

const cities = [
    {
        id: "prague",
        name: "Prague",
        x: 701,
        y: 134,
        isHub: true,
        labelDx: 0,
        labelDy: -42,
        labelAnchor: "middle",
    },

    {
        id: "rotterdam",
        name: "Rotterdam",
        x: 359,
        y: 71,
        labelDx: -24,
        labelDy: -26,
        labelAnchor: "end",
    },
    {
        id: "zurich",
        name: "Zurich",
        x: 499,
        y: 227,
        labelDx: -12,
        labelDy: -28,
        labelAnchor: "end",
    },
    {
        id: "monaco",
        name: "Monaco",
        x: 460,
        y: 351,
        labelDx: -16,
        labelDy: -24,
        labelAnchor: "end",
    },
    {
        id: "algiers",
        name: "Algiers",
        x: 311,
        y: 590,
        labelDx: -12,
        labelDy: -26,
        labelAnchor: "end",
    },
    {
        id: "tripoli",
        name: "Tripoli",
        x: 658,
        y: 722,
        labelDx: 0,
        labelDy: -28,
        labelAnchor: "middle",
    },
    {
        id: "cairo",
        name: "Cairo",
        x: 1277,
        y: 820,
        labelDx: 0,
        labelDy: -28,
        labelAnchor: "middle",
    },
    {
        id: "athens",
        name: "Athens",
        x: 1019,
        y: 548,
        labelDx: -10,
        labelDy: -28,
        labelAnchor: "end",
    },
    {
        id: "constanta",
        name: "Constanta",
        x: 1187,
        y: 337,
        labelDx: 0,
        labelDy: -28,
        labelAnchor: "middle",
    },
    {
        id: "istanbul",
        name: "Istanbul",
        x: 1199,
        y: 444,
        labelDx: 0,
        labelDy: -30,
        labelAnchor: "middle",
    },
    {
        id: "antalya",
        name: "Antalya",
        x: 1259,
        y: 585,
        labelDx: 12,
        labelDy: -22,
        labelAnchor: "start",
    },
    {
        id: "cyprus",
        name: "Cyprus",
        x: 1352,
        y: 646,
        labelDx: 12,
        labelDy: -18,
        labelAnchor: "start",
    },
    {
        id: "tbilisi",
        name: "Tbilisi",
        x: 1743,
        y: 420,
        labelDx: 12,
        labelDy: -24,
        labelAnchor: "start",
    },
    {
        id: "baku",
        name: "Baku",
        x: 1915,
        y: 465,
        labelDx: 12,
        labelDy: -18,
        labelAnchor: "start",
    },
    {
        id: "riyadh",
        name: "Riyadh",
        x: 1806,
        y: 1002,
        labelDx: -16,
        labelDy: 40,
        labelAnchor: "end",
    },
    {
        id: "doha",
        name: "Doha",
        x: 1972,
        y: 982,
        labelDx: 0,
        labelDy: -28,
        labelAnchor: "middle",
    },
    {
        id: "abu_dhabi",
        name: "Abu Dhabi",
        x: 2070,
        y: 1011,
        labelDx: 12,
        labelDy: 40,
        labelAnchor: "start",
    },
    {
        id: "dubai",
        name: "Dubai",
        x: 2101,
        y: 985,
        labelDx: 12,
        labelDy: -24,
        labelAnchor: "start",
    },
];

const routeOrder = [
    "rotterdam",
    "zurich",
    "monaco",
    "algiers",
    "tripoli",
    "cairo",
    "riyadh",
    "doha",
    "abu_dhabi",
    "dubai",
    "baku",
    "tbilisi",
    "constanta",
    "istanbul",
    "antalya",
    "cyprus",
    "athens",
];

function EuropeMap() {
    const sectionRef = useRef(null);
    const { t } = useLanguage();

    const hub = cities.find((city) => city.isHub);
    const destinations = routeOrder
        .map((cityId) => cities.find((city) => city.id === cityId))
        .filter(Boolean);

    const getCityLabel = (city) => {
        const key = `map.cities.${city.id}`;
        const value = t(key);

        return value === key ? city.name : value;
    };

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.set(".real-map-bg", {
                opacity: 0,
                scale: 1.03,
                transformOrigin: "50% 50%",
            });

            gsap.set(".info-fade-up", {
                opacity: 0,
                y: 30,
            });

            gsap.set(".map-hub-point", {
                attr: { r: 0 },
            });

            gsap.set(".hub-label", {
                autoAlpha: 0,
                scale: 0.96,
                transformOrigin: "50% 50%",
            });

            gsap.set(".city-point", {
                attr: { r: 0 },
                opacity: 0,
            });

            gsap.set(".city-label", {
                autoAlpha: 0,
                scale: 0.96,
                transformOrigin: "50% 50%",
            });

            gsap.set(".city-pulse", {
                attr: { r: 0 },
                opacity: 0,
            });

            gsap.set(".moving-dot", {
                x: hub.x,
                y: hub.y,
                opacity: 0,
                transformOrigin: "50% 50%",
            });

            const travelTl = gsap.timeline({
                paused: true,
                repeat: -1,
                repeatDelay: 0.8,
                onRepeat: () => {
                    gsap.set(".city-point", {
                        attr: { r: 0 },
                        opacity: 0,
                        fill: "#dcc19a",
                    });

                    gsap.set(".city-label", {
                        autoAlpha: 0,
                        scale: 0.96,
                    });

                    gsap.set(".city-pulse", {
                        attr: { r: 0 },
                        opacity: 0,
                    });

                    gsap.set(".moving-dot", {
                        x: hub.x,
                        y: hub.y,
                    });
                },
            });

            let previousCity = hub;

            destinations.forEach((city) => {
                const distance = Math.hypot(city.x - previousCity.x, city.y - previousCity.y);
                const travelDuration = Math.min(2, Math.max(0.9, distance / 540));

                const pointSelector = `#point-${city.id}`;
                const pulseSelector = `#pulse-${city.id}`;
                const labelSelector = `#label-${city.id}`;

                travelTl.to(".moving-dot", {
                    x: city.x,
                    y: city.y,
                    duration: travelDuration,
                    ease: "power2.inOut",
                });

                travelTl.to(
                    pointSelector,
                    {
                        attr: { r: 7 },
                        opacity: 1,
                        duration: 0.2,
                        ease: "power2.out",
                    },
                    "<"
                );

                travelTl.fromTo(
                    pulseSelector,
                    {
                        attr: { r: 8 },
                        opacity: 0.65,
                    },
                    {
                        attr: { r: 28 },
                        opacity: 0,
                        duration: 0.8,
                        ease: "power2.out",
                    },
                    "<"
                );

                travelTl.to(
                    labelSelector,
                    {
                        autoAlpha: 1,
                        scale: 1,
                        duration: 0.25,
                        ease: "power2.out",
                    },
                    "<"
                );

                travelTl.to({}, { duration: 0.9 });

                travelTl.to(labelSelector, {
                    autoAlpha: 0,
                    scale: 0.98,
                    duration: 0.2,
                    ease: "power2.inOut",
                });

                travelTl.to(
                    pointSelector,
                    {
                        attr: { r: 5 },
                        opacity: 0.9,
                        duration: 0.2,
                        ease: "power2.inOut",
                    },
                    "<"
                );

                previousCity = city;
            });

            travelTl.to(".moving-dot", {
                x: hub.x,
                y: hub.y,
                duration: 1.2,
                ease: "power2.inOut",
            });

            const introTl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 65%",
                    once: true,
                },
                onComplete: () => {
                    travelTl.play(0);
                },
            });

            introTl.to(".info-fade-up", {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: "power2.out",
            });

            introTl.to(
                ".real-map-bg",
                {
                    opacity: 1,
                    scale: 1,
                    duration: 1.6,
                    ease: "power2.out",
                },
                "-=0.4"
            );

            introTl.to(
                ".map-hub-point",
                {
                    attr: { r: 9 },
                    duration: 0.35,
                    ease: "power2.out",
                },
                "-=0.9"
            );

            introTl.to(
                ".hub-label",
                {
                    autoAlpha: 1,
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out",
                },
                "-=0.45"
            );

            introTl.to(
                ".moving-dot",
                {
                    opacity: 1,
                    duration: 0.3,
                    ease: "power2.out",
                },
                "-=0.2"
            );

            gsap.fromTo(
                ".map-hub-pulse-1",
                { attr: { r: 9 }, opacity: 0.45 },
                {
                    attr: { r: 36 },
                    opacity: 0,
                    duration: 2,
                    repeat: -1,
                    ease: "power2.out",
                }
            );

            gsap.fromTo(
                ".map-hub-pulse-2",
                { attr: { r: 9 }, opacity: 0.3 },
                {
                    attr: { r: 36 },
                    opacity: 0,
                    duration: 2,
                    repeat: -1,
                    ease: "power2.out",
                    delay: 1,
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, [hub, t]);

    return (
        <section
            id="logistics"
            ref={sectionRef}
            className="relative overflow-hidden bg-[#efebe5] py-24 lg:py-32"
        >
            <div className="mx-auto w-full max-w-[1440px] px-5 md:px-8 xl:px-20">
                <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-20">
                    <div className="flex w-full flex-col lg:w-[35%]">
                        <div className="info-fade-up mb-6 inline-flex w-max items-center gap-2 rounded-full border border-[#856333]/30 bg-[#856333]/10 px-3 py-1">
                            <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#856333]" />
                            <span className="text-[10px] font-bold uppercase tracking-widest text-[#856333]">
                                {t("map.badge")}
                            </span>
                        </div>

                        <h2 className="info-fade-up mb-6 whitespace-pre-line font-serif text-[2.5rem] leading-[1] text-[#2a2118] md:text-[4rem] lg:text-[4.8rem]">
                            {t("map.title")}
                        </h2>

                        <p className="info-fade-up mb-10 text-base leading-relaxed text-[#2a2118]/70 md:text-lg">
                            {t("map.description")}
                        </p>

                        <div className="info-fade-up grid grid-cols-2 gap-8 border-t border-[#2a2118]/10 pt-8">
                            <div className="flex flex-col gap-1">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-[#2a2118]/40">
                                    {t("map.stats_hubs")}
                                </span>
                                <span className="font-serif text-4xl text-[#2a2118]">17+</span>
                            </div>

                            <div className="flex flex-col gap-1">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-[#2a2118]/40">
                                    {t("map.stats_shipping")}
                                </span>
                                <span className="font-serif text-3xl text-[#856333]">
                                    {t("map.shipping_value")}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="relative aspect-[2400/1300] w-full overflow-hidden rounded-[2.5rem] bg-[#050506] shadow-[0_20px_50px_rgba(0,0,0,0.2)] lg:w-[65%]">
                        <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_#050506_100%)]" />

                        <svg viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`} className="relative z-0 h-full w-full">
                            <image
                                href={`${baseUrl}images/emea-map.png`}
                                width={MAP_WIDTH}
                                height={MAP_HEIGHT}
                                className="real-map-bg"
                            />

                            {destinations.map((city) => (
                                <g key={`node-${city.id}`}>
                                    <circle
                                        id={`pulse-${city.id}`}
                                        cx={city.x}
                                        cy={city.y}
                                        r="0"
                                        fill="#dcc19a"
                                        className="city-pulse"
                                    />

                                    <circle
                                        id={`point-${city.id}`}
                                        cx={city.x}
                                        cy={city.y}
                                        r="0"
                                        fill="#dcc19a"
                                        className="city-point"
                                    />

                                    <text
                                        id={`label-${city.id}`}
                                        x={city.x + (city.labelDx || 0)}
                                        y={city.y + (city.labelDy || -28)}
                                        textAnchor={city.labelAnchor || "middle"}
                                        fill="#ffffff"
                                        fontSize="54"
                                        fontWeight="800"
                                        stroke="#050506"
                                        strokeWidth="14"
                                        paintOrder="stroke"
                                        strokeLinejoin="round"
                                        className="city-label uppercase tracking-[0.06em]"
                                    >
                                        {getCityLabel(city)}
                                    </text>
                                </g>
                            ))}

                            <g className="map-hub">
                                <circle
                                    cx={hub.x}
                                    cy={hub.y}
                                    r="0"
                                    fill="#dcc19a"
                                    className="map-hub-pulse-1"
                                />
                                <circle
                                    cx={hub.x}
                                    cy={hub.y}
                                    r="0"
                                    fill="#dcc19a"
                                    className="map-hub-pulse-2"
                                />
                                <circle
                                    cx={hub.x}
                                    cy={hub.y}
                                    r="0"
                                    fill="#dcc19a"
                                    className="map-hub-point"
                                />
                                <text
                                    x={hub.x + (hub.labelDx || 0)}
                                    y={hub.y + (hub.labelDy || -36)}
                                    textAnchor={hub.labelAnchor || "middle"}
                                    fill="#dcc19a"
                                    fontSize="60"
                                    fontWeight="900"
                                    stroke="#050506"
                                    strokeWidth="16"
                                    paintOrder="stroke"
                                    strokeLinejoin="round"
                                    className="hub-label uppercase tracking-[0.08em]"
                                >
                                    {getCityLabel(hub)}
                                </text>
                            </g>

                            <g className="moving-dot">
                                <circle r="24" fill="#dcc19a" opacity="0.18" />
                                <circle r="8" fill="#dcc19a" />
                                <circle r="3" fill="#ffffff" opacity="0.95" />
                            </g>
                        </svg>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default EuropeMap;