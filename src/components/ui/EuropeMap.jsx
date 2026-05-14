import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "../../context/useLanguage";

gsap.registerPlugin(ScrollTrigger);

const baseUrl = import.meta.env.BASE_URL;

const MAP_WIDTH = 2400;
const MAP_HEIGHT = 1300;

// Geo bounds: lon -6..64, lat 16..54
// x = (lon - (-6)) / (64 - (-6)) * 2400
// y = (54 - lat) / (54 - 16) * 1300
const cities = [
    {
        id: "prague",
        name: "Prague",
        x: 700,
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
        labelDx: -14,
        labelDy: 68,
        labelAnchor: "end",
    },
    {
        id: "zurich",
        name: "Zurich",
        x: 499,
        y: 227,
        labelDx: 14,
        labelDy: -24,
        labelAnchor: "start",
    },
    {
        id: "monaco",
        name: "Monaco",
        x: 460,
        y: 351,
        labelDx: 14,
        labelDy: -22,
        labelAnchor: "start",
    },
    {
        id: "algiers",
        name: "Algiers",
        x: 311,
        y: 590,
        labelDx: 14,
        labelDy: -24,
        labelAnchor: "start",
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
        x: 1188,
        y: 336,
        labelDx: 0,
        labelDy: -28,
        labelAnchor: "middle",
    },
    {
        id: "istanbul",
        name: "Istanbul",
        x: 1198,
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
        x: 1338,
        y: 646,
        labelDx: 12,
        labelDy: -18,
        labelAnchor: "start",
    },
    {
        id: "tbilisi",
        name: "Tbilisi",
        x: 1743,
        y: 421,
        labelDx: -14,
        labelDy: -24,
        labelAnchor: "end",
    },
    {
        id: "baku",
        name: "Baku",
        x: 1916,
        y: 465,
        labelDx: -14,
        labelDy: -18,
        labelAnchor: "end",
    },
    {
        id: "riyadh",
        name: "Riyadh",
        x: 1808,
        y: 1003,
        labelDx: -14,
        labelDy: -28,
        labelAnchor: "end",
    },
    {
        id: "doha",
        name: "Doha",
        x: 1972,
        y: 982,
        labelDx: -14,
        labelDy: -28,
        labelAnchor: "end",
    },
    {
        id: "abu_dhabi",
        name: "Abu Dhabi",
        x: 2070,
        y: 1010,
        labelDx: -14,
        labelDy: -28,
        labelAnchor: "end",
    },
    {
        id: "dubai",
        name: "Dubai",
        x: 2102,
        y: 985,
        labelDx: -14,
        labelDy: 40,
        labelAnchor: "end",
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

// Trail points count for the comet tail
const TRAIL_COUNT = 8;

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
            // Initial states
            gsap.set(".real-map-bg", { opacity: 0, scale: 1.03, transformOrigin: "50% 50%" });
            gsap.set(".info-fade-up", { opacity: 0, y: 30 });
            gsap.set(".map-hub-point", { attr: { r: 0 } });
            gsap.set(".hub-label", { autoAlpha: 0, scale: 0.96, transformOrigin: "50% 50%" });
            gsap.set(".city-point", { attr: { r: 0 }, opacity: 0 });
            gsap.set(".city-label", { autoAlpha: 0, scale: 0.96, transformOrigin: "50% 50%" });
            gsap.set(".city-pulse", { attr: { r: 0 }, opacity: 0 });

            gsap.set(".moving-dot", {
                x: hub.x,
                y: hub.y,
                opacity: 0,
                transformOrigin: "50% 50%",
            });

            // Hide all trail dots initially
            for (let i = 0; i < TRAIL_COUNT; i++) {
                gsap.set(`.trail-dot-${i}`, { x: hub.x, y: hub.y, opacity: 0 });
            }

            // quickSetters — zero-overhead per-frame position updates
            const setDotX = gsap.quickSetter(".moving-dot", "x", "px");
            const setDotY = gsap.quickSetter(".moving-dot", "y", "px");
            const trailSetX = Array.from({ length: TRAIL_COUNT }, (_, i) =>
                gsap.quickSetter(`.trail-dot-${i}`, "x", "px")
            );
            const trailSetY = Array.from({ length: TRAIL_COUNT }, (_, i) =>
                gsap.quickSetter(`.trail-dot-${i}`, "y", "px")
            );

            // Ring buffer: store last N positions for smooth trail
            const posHistory = Array.from({ length: TRAIL_COUNT + 1 }, () => ({ x: hub.x, y: hub.y }));
            let historyHead = 0;

            const dotPos = { x: hub.x, y: hub.y };

            const travelTl = gsap.timeline({
                paused: true,
                repeat: -1,
                repeatDelay: 0.6,
                onRepeat: () => {
                    gsap.set(".city-point", { attr: { r: 0 }, opacity: 0, fill: "#dcc19a" });
                    gsap.set(".city-label", { autoAlpha: 0, scale: 0.96 });
                    gsap.set(".city-pulse", { attr: { r: 0 }, opacity: 0 });
                    dotPos.x = hub.x;
                    dotPos.y = hub.y;
                    setDotX(hub.x); setDotY(hub.y);
                    for (let i = 0; i < TRAIL_COUNT; i++) {
                        trailSetX[i](hub.x); trailSetY[i](hub.y);
                        gsap.set(`.trail-dot-${i}`, { opacity: 0 });
                        posHistory[i] = { x: hub.x, y: hub.y };
                    }
                    posHistory[TRAIL_COUNT] = { x: hub.x, y: hub.y };
                    historyHead = 0;
                },
            });

            const updateTrail = () => {
                // Write current position into ring buffer
                posHistory[historyHead] = { x: dotPos.x, y: dotPos.y };
                historyHead = (historyHead + 1) % (TRAIL_COUNT + 1);
                // Each trail dot reads a progressively older position
                for (let i = 0; i < TRAIL_COUNT; i++) {
                    const idx = (historyHead - 1 - i + TRAIL_COUNT + 1) % (TRAIL_COUNT + 1);
                    trailSetX[i](posHistory[idx].x);
                    trailSetY[i](posHistory[idx].y);
                }
                setDotX(dotPos.x);
                setDotY(dotPos.y);
            };

            let previousCity = hub;

            destinations.forEach((city) => {
                const distance = Math.hypot(city.x - previousCity.x, city.y - previousCity.y);
                const travelDuration = Math.min(2, Math.max(0.9, distance / 540));

                const pointSelector = `#point-${city.id}`;
                const pulseSelector = `#pulse-${city.id}`;
                const labelSelector = `#label-${city.id}`;

                travelTl.to(dotPos, {
                    x: city.x,
                    y: city.y,
                    duration: travelDuration,
                    ease: "power2.inOut",
                    onUpdate: updateTrail,
                });

                // City point appears when dot arrives
                travelTl.to(
                    pointSelector,
                    { attr: { r: 7 }, opacity: 1, duration: 0.2, ease: "power2.out" },
                    "<"
                );

                // Pulse ring expands outward
                travelTl.fromTo(
                    pulseSelector,
                    { attr: { r: 8 }, opacity: 0.7 },
                    { attr: { r: 32 }, opacity: 0, duration: 0.85, ease: "power2.out" },
                    "<"
                );

                // Label fades in
                travelTl.to(
                    labelSelector,
                    { autoAlpha: 1, scale: 1, duration: 0.3, ease: "back.out(1.4)" },
                    "<0.05"
                );

                // Brief pause at city
                travelTl.to({}, { duration: 0.85 });

                // Label fades out, point shrinks to resting state
                travelTl.to(labelSelector, {
                    autoAlpha: 0,
                    scale: 0.97,
                    duration: 0.22,
                    ease: "power2.inOut",
                });

                travelTl.to(
                    pointSelector,
                    { attr: { r: 5 }, opacity: 0.85, duration: 0.22, ease: "power2.inOut" },
                    "<"
                );

                // Fade trail dots when stopping
                travelTl.to(
                    [...Array(TRAIL_COUNT)].map((_, i) => `.trail-dot-${i}`),
                    { opacity: 0, duration: 0.3, ease: "power2.out" },
                    "<"
                );

                previousCity = city;
            });

            // Return to hub
            travelTl.to(dotPos, {
                x: hub.x,
                y: hub.y,
                duration: 1.2,
                ease: "power2.inOut",
                onUpdate: updateTrail,
            });

            travelTl.to(
                [...Array(TRAIL_COUNT)].map((_, i) => `.trail-dot-${i}`),
                { opacity: 0, duration: 0.35, ease: "power2.out" },
                "<0.8"
            );

            // Pause hub pulses until section is visible
            gsap.set(".map-hub-pulse-1", { attr: { r: 9 }, opacity: 0 });
            gsap.set(".map-hub-pulse-2", { attr: { r: 9 }, opacity: 0 });

            let hubPulse1, hubPulse2, hubGlow;

            const introTl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 65%",
                    once: true,
                },
                onComplete: () => {
                    hubPulse1 = gsap.fromTo(
                        ".map-hub-pulse-1",
                        { attr: { r: 9 }, opacity: 0.5 },
                        { attr: { r: 40 }, opacity: 0, duration: 2.2, repeat: -1, ease: "power2.out" }
                    );
                    hubPulse2 = gsap.fromTo(
                        ".map-hub-pulse-2",
                        { attr: { r: 9 }, opacity: 0.32 },
                        { attr: { r: 40 }, opacity: 0, duration: 2.2, repeat: -1, ease: "power2.out", delay: 1.1 }
                    );
                    hubGlow = gsap.to(".map-hub-glow", {
                        attr: { r: 22 },
                        opacity: 0.25,
                        duration: 1.4,
                        repeat: -1,
                        yoyo: true,
                        ease: "sine.inOut",
                    });
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
                { opacity: 1, scale: 1, duration: 1.6, ease: "power2.out" },
                "-=0.4"
            );

            introTl.to(
                ".map-hub-point",
                { attr: { r: 9 }, duration: 0.35, ease: "power2.out" },
                "-=0.9"
            );

            introTl.to(
                ".hub-label",
                { autoAlpha: 1, scale: 1, duration: 0.3, ease: "power2.out" },
                "-=0.45"
            );

            introTl.to(
                ".moving-dot",
                { opacity: 1, duration: 0.3, ease: "power2.out" },
                "-=0.2"
            );

        }, sectionRef);

        return () => {
            ctx.revert();
        };
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

                        <svg viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`} className="relative z-0 h-full w-full">
                            <defs>
                                {/* Safe area clip — keeps labels away from rounded corners */}
                                <clipPath id="label-safe-area">
                                    <rect x="60" y="20" width={MAP_WIDTH - 120} height={MAP_HEIGHT - 40} />
                                </clipPath>

                                {/* Hub glow filter */}
                                <filter id="hub-glow" x="-80%" y="-80%" width="260%" height="260%">
                                    <feGaussianBlur stdDeviation="8" result="blur" />
                                    <feMerge>
                                        <feMergeNode in="blur" />
                                        <feMergeNode in="SourceGraphic" />
                                    </feMerge>
                                </filter>

                                {/* Moving dot glow */}
                                <filter id="dot-glow" x="-100%" y="-100%" width="300%" height="300%">
                                    <feGaussianBlur stdDeviation="6" result="blur" />
                                    <feMerge>
                                        <feMergeNode in="blur" />
                                        <feMergeNode in="SourceGraphic" />
                                    </feMerge>
                                </filter>

                                {/* City arrival glow */}
                                <filter id="city-glow" x="-80%" y="-80%" width="260%" height="260%">
                                    <feGaussianBlur stdDeviation="5" result="blur" />
                                    <feMerge>
                                        <feMergeNode in="blur" />
                                        <feMergeNode in="SourceGraphic" />
                                    </feMerge>
                                </filter>
                            </defs>

                            <image
                                href={`${baseUrl}images/emea-map.png`}
                                width={MAP_WIDTH}
                                height={MAP_HEIGHT}
                                className="real-map-bg"
                            />

                            {/* City destination points */}
                            {destinations.map((city) => {
                                const label = getCityLabel(city);
                                const anchor = city.labelAnchor || "middle";
                                // Approximate text width in SVG units (font-size 54, tracking ~0.06em, uppercase ~0.65 char width)
                                const approxW = label.length * 54 * 0.65 * 1.06;
                                let lx = city.x + (city.labelDx || 0);
                                const PAD = 80;
                                if (anchor === "start") lx = Math.min(lx, MAP_WIDTH - PAD - approxW);
                                if (anchor === "end")   lx = Math.max(lx, PAD + approxW);
                                if (anchor === "middle") {
                                    lx = Math.max(lx, PAD + approxW / 2);
                                    lx = Math.min(lx, MAP_WIDTH - PAD - approxW / 2);
                                }

                                return (
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
                                        filter="url(#city-glow)"
                                        className="city-point"
                                    />

                                    <text
                                        id={`label-${city.id}`}
                                        x={lx}
                                        y={city.y + (city.labelDy || -28)}
                                        textAnchor={anchor}
                                        fill="#ffffff"
                                        fontSize="54"
                                        fontWeight="800"
                                        stroke="#050506"
                                        strokeWidth="14"
                                        paintOrder="stroke"
                                        strokeLinejoin="round"
                                        className="city-label uppercase tracking-[0.06em]"
                                    >
                                        {label}
                                    </text>
                                </g>
                                );
                            })}

                            {/* Hub (Prague / ISHub) */}
                            <g className="map-hub" filter="url(#hub-glow)">
                                {/* Soft glow core */}
                                <circle
                                    cx={hub.x}
                                    cy={hub.y}
                                    r="14"
                                    fill="#dcc19a"
                                    opacity="0.15"
                                    className="map-hub-glow"
                                />
                                {/* Pulse rings */}
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
                                {/* Hub dot */}
                                <circle
                                    cx={hub.x}
                                    cy={hub.y}
                                    r="0"
                                    fill="#dcc19a"
                                    className="map-hub-point"
                                />
                                {/* Hub inner bright core */}
                                <circle cx={hub.x} cy={hub.y} r="3.5" fill="#ffffff" opacity="0.9" />

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

                            {/* Comet trail dots (rendered behind moving dot) */}
                            {[...Array(TRAIL_COUNT)].map((_, i) => {
                                const scale = 1 - (i + 1) / (TRAIL_COUNT + 1);
                                const r = Math.max(1.5, 7 * scale);
                                return (
                                    <circle
                                        key={`trail-${i}`}
                                        className={`trail-dot-${i}`}
                                        r={r}
                                        fill="#dcc19a"
                                        opacity="0"
                                        filter="url(#dot-glow)"
                                    />
                                );
                            })}

                            {/* Moving dot (head of the comet) */}
                            <g className="moving-dot" filter="url(#dot-glow)">
                                {/* Outer soft glow */}
                                <circle r="28" fill="#dcc19a" opacity="0.12" />
                                {/* Mid glow */}
                                <circle r="16" fill="#dcc19a" opacity="0.22" />
                                {/* Main dot */}
                                <circle r="8" fill="#dcc19a" />
                                {/* Bright core */}
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
