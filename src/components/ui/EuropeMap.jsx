import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
    const mapRef = useRef(null);
    const hub = cities.find(c => c.isHub);
    const destinations = cities.filter(c => !c.isHub);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Подготовка начальных состояний
            gsap.set(".real-map-bg", { opacity: 0, scale: 1.05, transformOrigin: "50% 50%" });
            gsap.set(".map-line", { strokeDasharray: 1000, strokeDashoffset: 1000 });
            gsap.set(".map-label", { opacity: 0, y: 5 });

            // Задаем всем точкам радиус 0 (чтобы они были невидимы)
            gsap.set(".map-point", { attr: { r: 0 } });
            gsap.set(".map-hub-point", { attr: { r: 0 } });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: mapRef.current,
                    start: "top 75%",
                }
            });

            // 1. Появление фона
            tl.to(".real-map-bg", { opacity: 0.8, scale: 1, duration: 2, ease: "power2.out" });

            // 2. Плавный рост радиуса хаба (Праги) до 5
            tl.to(".map-hub-point", { attr: { r: 5 }, duration: 0.6, ease: "power2.out" }, "-=1.2");

            // 3. Рисование золотых линий
            tl.to(".map-line", {
                strokeDashoffset: 0,
                duration: 1.8,
                stagger: 0.1,
                ease: "power3.inOut"
            }, "-=1");

            // 4. Плавный рост радиуса городов-спутников до 3
            tl.to(".map-point", { attr: { r: 3 }, duration: 0.5, stagger: 0.05, ease: "power2.out" }, "-=1.2");

            // 5. Плавное появление названий
            tl.to(".map-label", { opacity: 1, y: 0, duration: 0.4, stagger: 0.05 }, "-=1.2");

            // Бесконечная пульсация хаба (тоже через радиус)
            gsap.fromTo(".map-hub-pulse-1",
                { attr: { r: 5 }, opacity: 0.6 },
                { attr: { r: 24 }, opacity: 0, duration: 2, repeat: -1, ease: "power2.out" }
            );
            gsap.fromTo(".map-hub-pulse-2",
                { attr: { r: 5 }, opacity: 0.4 },
                { attr: { r: 24 }, opacity: 0, duration: 2, repeat: -1, ease: "power2.out", delay: 1 }
            );

        }, mapRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={mapRef} className="relative w-full max-w-[1024px] mx-auto aspect-[1024/723] rounded-[2rem] border border-white/5 bg-[#050506] shadow-2xl overflow-hidden flex items-center justify-center">

            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_30%,_#050506_100%)] z-10 pointer-events-none" />

            <svg viewBox="0 0 1024 723" className="w-full h-full relative z-0">
                <image
                    href="/itomer/images/europe-map-dark.png"
                    width="1024"
                    height="723"
                    className="real-map-bg"
                />

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

                {destinations.map((city) => (
                    <g key={`node-${city.id}`}>
                        <circle cx={city.x} cy={city.y} r="0" fill="#ffffff" className="map-point shadow-glow" />
                        <text
                            x={city.x}
                            y={city.y - 12}
                            textAnchor="middle"
                            fill="#a3a3a3"
                            fontSize="12"
                            className="map-label font-medium tracking-wider uppercase drop-shadow-md"
                        >
                            {city.name}
                        </text>
                    </g>
                ))}

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
                        className="map-label font-bold tracking-[0.1em] uppercase drop-shadow-md"
                    >
                        {hub.name}
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
    );
}

export default EuropeMap;