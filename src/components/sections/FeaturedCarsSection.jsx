import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const cars = [
    {
        name: "Ferrari SF90 Stradale",
        year: "2023",
        image:
            "https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&w=1400&q=80",
    },
    {
        name: "Lamborghini Urus",
        year: "2022",
        image:
            "https://images.unsplash.com/photo-1621135802920-133df287f89c?auto=format&fit=crop&w=1400&q=80",
    },
    {
        name: "Porsche 911 Turbo S",
        year: "2024",
        image:
            "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=80",
    },
    {
        name: "Mercedes-AMG GT",
        year: "2023",
        image:
            "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1400&q=80",
    },
    {
        name: "Bentley Continental GT",
        year: "2022",
        image:
            "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=1400&q=80",
    },
    {
        name: "Aston Martin DB11",
        year: "2023",
        image:
            "https://images.unsplash.com/photo-1606220838315-056192d5e927?auto=format&fit=crop&w=1400&q=80",
    },
];

function FeaturedCarsSection() {
    const sectionRef = useRef(null);
    const trackRef = useRef(null);
    const bgRef = useRef(null);
    const titleRef = useRef(null);

    useLayoutEffect(() => {
        const section = sectionRef.current;
        const track = trackRef.current;
        const bg = bgRef.current;
        const title = titleRef.current;

        if (!section || !track || !bg || !title) {
            return undefined;
        }

        const mm = gsap.matchMedia();

        mm.add("(min-width: 1024px)", () => {
            const ctx = gsap.context(() => {
                const getScrollDistance = () =>
                    Math.max(track.scrollWidth - window.innerWidth + 160, 0);

                const getAnimationDistance = () => getScrollDistance() * 0.65;

                const setSectionHeight = () => {
                    section.style.height = `${window.innerHeight + getAnimationDistance()}px`;
                };

                setSectionHeight();

                gsap.set(track, {
                    x: 0,
                    force3D: true,
                    willChange: "transform",
                });

                gsap.set(bg, {
                    x: 0,
                    force3D: true,
                    willChange: "transform",
                });

                gsap.set(title, {
                    y: 0,
                    opacity: 1,
                    force3D: true,
                    willChange: "transform, opacity",
                });

                const tl = gsap.timeline({
                    defaults: {
                        ease: "none",
                    },
                    scrollTrigger: {
                        trigger: section,
                        start: "top top",
                        end: () => `+=${getAnimationDistance()}`,
                        scrub: 0.35,
                        invalidateOnRefresh: true,
                        onRefreshInit: setSectionHeight,
                    },
                });

                tl.to(
                    track,
                    {
                        x: () => -getScrollDistance(),
                    },
                    0
                )
                    .to(
                        bg,
                        {
                            x: -120,
                        },
                        0
                    )
                    .to(
                        title,
                        {
                            y: -72,
                            opacity: 0.82,
                        },
                        0
                    );

                const handleResize = () => {
                    setSectionHeight();
                    ScrollTrigger.refresh();
                };

                window.addEventListener("resize", handleResize);

                if (document.fonts?.ready) {
                    document.fonts.ready.then(() => {
                        setSectionHeight();
                        ScrollTrigger.refresh();
                    });
                }

                return () => {
                    window.removeEventListener("resize", handleResize);
                    section.style.height = "";
                    tl.kill();
                };
            }, section);

            return () => ctx.revert();
        });

        return () => mm.revert();
    }, []);

    return (
        <section
            id="featured"
            ref={sectionRef}
            className="relative overflow-clip bg-[#efebe5] text-[#2a2118]"
        >
            <div
                className="
                    sticky top-0 h-screen overflow-hidden
                    px-5 py-20
                    sm:px-6
                    md:px-8
                    lg:px-12 lg:py-0
                    xl:px-20
                "
            >
                <div
                    ref={bgRef}
                    className="pointer-events-none absolute inset-0 hidden lg:block"
                >
                    <div className="absolute left-[8%] top-[18%] h-[24rem] w-[24rem] rounded-full bg-[#d6b27a]/20 blur-[130px]" />

                    <div className="absolute bottom-[10%] right-[4%] h-[22rem] w-[22rem] rounded-full bg-black/5 blur-[120px]" />
                </div>

                <div className="relative z-10 mx-auto flex h-full max-w-[1440px] flex-col justify-center">
                    <div ref={titleRef} className="max-w-[760px]">
                        <p className="text-xs font-medium uppercase tracking-[0.28em] text-[#a9844f]">
                            Featured Cars
                        </p>

                        <h2 className="mt-4 font-serif text-[3rem] leading-[0.95] tracking-[-0.045em] sm:text-[4rem] lg:text-[5.2rem]">
                            Curated Premium Selection
                        </h2>

                        <p className="mt-6 max-w-[560px] text-base leading-7 text-[#2a2118]/65">
                            A handpicked collection of premium and exotic vehicles
                            available through trusted European sourcing channels.
                        </p>
                    </div>

                    <div
                        ref={trackRef}
                        className="
                            mt-14 flex h-[500px] gap-6
                            overflow-x-auto overflow-y-hidden pb-4
                            lg:w-max lg:gap-8 lg:overflow-visible lg:pb-0
                        "
                    >
                        {cars.map((car) => (
                            <article
                                key={`${car.name}-${car.year}`}
                                className="
                                    group relative h-[420px]
                                    w-[82vw] shrink-0 overflow-hidden
                                    rounded-[30px] bg-black
                                    shadow-[0_24px_90px_rgba(0,0,0,0.22)]
                                    sm:w-[520px]
                                    lg:h-[500px] lg:w-[620px]
                                "
                            >
                                <img
                                    src={car.image}
                                    alt={car.name}
                                    className="
                                        h-full w-full object-cover
                                        transition duration-700
                                        group-hover:scale-105
                                    "
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                                    <div className="text-xs font-medium uppercase tracking-[0.24em] text-[#dcc19a]">
                                        {car.year}
                                    </div>

                                    <h3 className="mt-3 text-2xl font-medium tracking-[-0.03em] text-white sm:text-3xl">
                                        {car.name}
                                    </h3>

                                    <button className="mt-6 rounded-xl bg-[#dcc19a] px-5 py-3 text-sm font-medium text-[#2a2118] transition hover:bg-[#e7ccab]">
                                        View Details
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default FeaturedCarsSection;