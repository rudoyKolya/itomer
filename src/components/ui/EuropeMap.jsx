import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "../../context/LanguageContext"; // Подключаем контекст

gsap.registerPlugin(ScrollTrigger);

// Названия городов (name) отсюда можно убрать, но я оставил их для наглядности структуры.
// В самом рендере мы будем использовать их id для перевода.
const cities = [
    { id: "prague", name: "Prague", x: 520, y: 470, isHub: true },
    { id: "warsaw", name: "Warsaw", x: 590, y: 410 },
    { id: "berlin", name: "Berlin", x: 505, y: 430 },
    { id: "paris", name: "Paris", x: 380, y: 495 },
    { id: "london", name: "London", x: 360, y: 440 },
    { id: "madrid", name: "Madrid", x: 290, y: 620 },
    { id: "rome", name: "Rome", x: 507, y: 610 },
    { id: "monaco", name: "Monaco", x: 435, y: 580 },
    { id: "stockholm", name: "Stockholm", x: 540, y: 310 },
    { id: "dublin", name: "Dublin", x: 303, y: 395 },
    { id: "kyiv", name: "Kyiv", x: 695, y: 440 },
    { id: "bucharest", name: "Bucharest", x: 665, y: 550 },
    { id: "sarajevo", name: "Sarajevo", x: 575, y: 575 },
    { id: "oslo", name: "Oslo", x: 475, y: 300 },
    { id: "athens", name: "Athens", x: 660, y: 660 },
    { id: "riga", name: "Riga", x: 605, y: 340 },
];

function EuropeMap() {
    const sectionRef = useRef(null);
    const { t } = useLanguage(); // Достаем функцию перевода

    const hub = cities.find(c => c.isHub);
    const destinations = cities.filter(c => !c.isHub);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.set(".real-map-bg", { opacity: 0, scale: 1.05, transformOrigin: "50% 50%" });
            gsap.set(".map-line", { strokeDasharray: 1000, strokeDashoffset: 1000 });
            gsap.set(".map-label", { opacity: 0, y: 5 });
            gsap.set(".map-point", { attr: { r: 0 } });
            gsap.set(".map-hub-point", { attr: { r: 0 } });
            gsap.set(".info-fade-up", { opacity: 0, y: 30 });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 65%",
                }
            });

            tl.to(".info-fade-up", { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power2.out" });
            tl.to(".real-map-bg", { opacity: 0.8, scale: 1, duration: 2, ease: "power2.out" }, "-=0.4");
            tl.to(".map-hub-point", { attr: { r: 5 }, duration: 0.6, ease: "power2.out" }, "-=1.2");
            tl.to(".map-line", { strokeDashoffset: 0, duration: 1.8, stagger: 0.1, ease: "power3.inOut" }, "-=1.2");
            tl.to(".map-point", { attr: { r: 3 }, duration: 0.5, stagger: 0.05, ease: "power2.out" }, "-=1.2");
            tl.to(".map-label", { opacity: 1, y: 0, duration: 0.4, stagger: 0.05 }, "-=1.2");

            gsap.fromTo(".map-hub-pulse-1",
                { attr: { r: 5 }, opacity: 0.6 },
                { attr: { r: 24 }, opacity: 0, duration: 2, repeat: -1, ease: "power2.out" }
            );
            gsap.fromTo(".map-hub-pulse-2",
                { attr: { r: 5 }, opacity: 0.4 },
                { attr: { r: 24 }, opacity: 0, duration: 2, repeat: -1, ease: "power2.out", delay: 1 }
            );

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="logistics"
            ref={sectionRef}
            className="relative bg-[#efebe5] py-24 lg:py-32 overflow-hidden"
        >
            <div className="mx-auto w-full max-w-[1440px] px-5 md:px-8 xl:px-20">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

                    {/* Текстовый блок (Слева) */}
                    <div className="w-full lg:w-[35%] flex flex-col">
                        <div className="info-fade-up inline-flex items-center gap-2 rounded-full border border-[#856333]/30 bg-[#856333]/10 px-3 py-1 mb-6 w-max">
                            <div className="h-1.5 w-1.5 rounded-full bg-[#856333] animate-pulse" />
                            <span className="text-[10px] font-bold uppercase tracking-widest text-[#856333]">
                                {t("map.badge")}
                            </span>
                        </div>

                        {/* Добавлен класс whitespace-pre-line для переносов строк из JSON (\n) */}
                        <h2 className="info-fade-up font-serif text-[2.5rem] md:text-[4rem] lg:text-[4.8rem] leading-[1] text-[#2a2118] mb-6 whitespace-pre-line">
                            {t("map.title")}
                        </h2>

                        <p className="info-fade-up text-base md:text-lg text-[#2a2118]/70 mb-10 leading-relaxed">
                            {t("map.description")}
                        </p>

                        <div className="info-fade-up grid grid-cols-2 gap-8 border-t border-[#2a2118]/10 pt-8">
                            <div className="flex flex-col gap-1">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-[#2a2118]/40">
                                    {t("map.stats_hubs")}
                                </span>
                                <span className="font-serif text-4xl text-[#2a2118]">15+</span>
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

                    {/* Блок с картой (Справа) */}
                    <div className="relative w-full lg:w-[65%] aspect-[1024/723] rounded-[2.5rem] bg-[#050506] shadow-[0_20px_50px_rgba(0,0,0,0.2)] overflow-hidden">
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_30%,_#050506_100%)] z-10 pointer-events-none" />

                        <svg viewBox="0 0 1024 723" className="w-full h-full relative z-0">
                            <image
                                href="/itomer/images/europe-map-dark.png"
                                width="1024"
                                height="723"
                                className="real-map-bg"
                            />

                            {/* Линии связи */}
                            {destinations.map((city) => (
                                <path
                                    key={`line-${city.id}`}
                                    d={`M ${hub.x} ${hub.y} Q ${(hub.x + city.x) / 2} ${(hub.y + city.y) / 2 - 40} ${city.x} ${city.y}`}
                                    fill="none"
                                    stroke="url(#map-grad)"
                                    strokeWidth="1.5"
                                    className="map-line opacity-70"
                                />
                            ))}

                            {/* Города */}
                            {destinations.map((city) => (
                                <g key={`node-${city.id}`}>
                                    <circle cx={city.x} cy={city.y} r="0" fill="#ffffff" className="map-point shadow-glow" />
                                    <text
                                        x={city.x}
                                        y={city.y - 12}
                                        textAnchor="middle"
                                        fill="#f0f0f0"
                                        fontSize="11"
                                        fontWeight="600"
                                        stroke="#050506"
                                        strokeWidth="4"
                                        paintOrder="stroke"
                                        strokeLinejoin="round"
                                        className="map-label tracking-wider uppercase"
                                    >
                                        {/* Переводим названия городов */}
                                        {t(`map.cities.${city.id}`)}
                                    </text>
                                </g>
                            ))}

                            {/* Прага (Hub) */}
                            <g className="map-hub">
                                <circle cx={hub.x} cy={hub.y} r="0" fill="#dcc19a" className="map-hub-pulse-1" />
                                <circle cx={hub.x} cy={hub.y} r="0" fill="#dcc19a" className="map-hub-pulse-2" />
                                <circle cx={hub.x} cy={hub.y} r="0" fill="#dcc19a" className="map-hub-point" />
                                <text
                                    x={hub.x}
                                    y={hub.y - 18}
                                    textAnchor="middle"
                                    fill="#dcc19a"
                                    fontSize="14"
                                    fontWeight="800"
                                    stroke="#050506"
                                    strokeWidth="5"
                                    paintOrder="stroke"
                                    strokeLinejoin="round"
                                    className="map-label tracking-[0.1em] uppercase"
                                >
                                    {/* Переводим хаб */}
                                    {t(`map.cities.${hub.id}`)}
                                </text>
                            </g>

                            <defs>
                                <linearGradient id="map-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#dcc19a" stopOpacity="1" />
                                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0.2" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default EuropeMap;