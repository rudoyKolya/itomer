import { useLayoutEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "../../context/useLanguage";

gsap.registerPlugin(ScrollTrigger);

function InteractiveCard({ point }) {
    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
        e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
    };

    return (
        <article
            onMouseMove={handleMouseMove}
            className="group relative w-full max-w-[760px] overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.04] p-8 backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:border-[#dcc19a]/30 hover:bg-white/[0.06] hover:shadow-[0_20px_40px_-15px_rgba(220,193,154,0.1)]"
        >
            <div
                className="pointer-events-none absolute -inset-px z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                    background:
                        "radial-gradient(600px circle at var(--mouse-x, 0) var(--mouse-y, 0), rgba(220,193,154,0.12), transparent 40%)",
                }}
            />

            <div className="relative z-10">
                <div className="text-[0.72rem] font-medium uppercase tracking-[0.24em] text-[#dcc19a] transition-colors duration-300 group-hover:text-white">
                    {point.number}
                </div>

                <h3 className="mt-6 text-[2rem] font-medium leading-tight text-white transition-transform duration-300 group-hover:translate-x-2">
                    {point.title}
                </h3>

                <p className="mt-5 text-[1.02rem] leading-8 text-white/66 transition-colors duration-300 group-hover:text-white/80">
                    {point.description}
                </p>
            </div>
        </article>
    );
}

function AboutSection() {
    const { t } = useLanguage();
    const sectionRef = useRef(null);
    const sceneRef = useRef(null);
    const bgRef = useRef(null);
    const cardsTrackRef = useRef(null);
    const mobileCardRefs = useRef([]);

    const aboutPoints = useMemo(() => [
        { number: "01", title: t("about.point_01_title"), description: t("about.point_01_desc") },
        { number: "02", title: t("about.point_02_title"), description: t("about.point_02_desc") },
        { number: "03", title: t("about.point_03_title"), description: t("about.point_03_desc") },
        { number: "04", title: t("about.point_04_title"), description: t("about.point_04_desc") },
    ], [t]);

    useLayoutEffect(() => {
        const section = sectionRef.current;
        const bg = bgRef.current;
        const cardsTrack = cardsTrackRef.current;

        if (!section || !bg || !cardsTrack) return undefined;

        const mm = gsap.matchMedia();

        mm.add("(min-width: 1024px)", () => {
            const ctx = gsap.context(() => {
                const getTrackHeight = () => cardsTrack.scrollHeight;
                const getViewportHeight = () => window.innerHeight;

                const setSectionHeight = () => {
                    const totalDistance = getTrackHeight() + getViewportHeight();

                    section.style.height = `${getViewportHeight() + totalDistance * 0.8}px`;
                };

                const handleResize = () => {
                    setSectionHeight();
                    ScrollTrigger.refresh();
                };

                setSectionHeight();

                gsap.set(cardsTrack, {
                    y: () => getViewportHeight(),
                    force3D: true,
                });

                const timeline = gsap.timeline({
                    defaults: { ease: "none" },
                    scrollTrigger: {
                        trigger: section,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 1.2,
                        invalidateOnRefresh: true,
                        onRefreshInit: setSectionHeight,
                    },
                });

                timeline
                    .to(cardsTrack, { y: () => -getTrackHeight() }, 0)
                    .to(bg, { y: -80 }, 0);

                window.addEventListener("resize", handleResize);

                return () => {
                    window.removeEventListener("resize", handleResize);
                };
            }, section);

            return () => ctx.revert();
        });

        mm.add("(max-width: 1023px)", () => {
            const ctx = gsap.context(() => {
                mobileCardRefs.current.forEach((card) => {
                    if (!card) return;

                    gsap.fromTo(
                        card,
                        { opacity: 0, y: 30 },
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.8,
                            ease: "power2.out",
                            scrollTrigger: {
                                trigger: card,
                                start: "top 85%",
                            },
                        }
                    );
                });
            }, section);

            return () => ctx.revert();
        });

        return () => {
            mm.revert();
        };
    }, []);

    return (
        <section id="about" ref={sectionRef} className="relative bg-[#050506] text-white">
            <div
                ref={sceneRef}
                className="sticky top-[76px] hidden h-[calc(100svh-76px)] overflow-hidden md:top-[88px] md:h-[calc(100svh-88px)] lg:block"
            >
                <div
                    ref={bgRef}
                    className="pointer-events-none absolute inset-0 transform-gpu will-change-transform"
                >
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,#040405_0%,#070708_45%,#050506_100%)]" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(212,175,55,0.10),transparent_28%)]" />
                </div>

                <div className="relative z-10 mx-auto grid h-full max-w-[1440px] grid-cols-[minmax(300px,0.92fr)_minmax(0,1.08fr)] gap-14 px-12 xl:px-20">
                    <div className="flex h-full items-center">
                        <div className="max-w-[470px]">
                            <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#dcc19a]">
                                {t("about.eyebrow")}
                            </p>

                            <h2 className="mt-4 font-serif text-[5rem] leading-[0.9] tracking-[-0.055em] text-white">
                                {t("about.title")}
                            </h2>

                            <div className="mt-8 h-px w-24 bg-gradient-to-r from-[#dcc19a] to-transparent" />

                            <p className="mt-8 max-w-[400px] text-[1.04rem] leading-8 text-white/60">
                                {t("about.description")}
                            </p>
                        </div>
                    </div>

                    <div className="relative h-full overflow-hidden">
                        <div
                            ref={cardsTrackRef}
                            className="absolute inset-x-0 flex flex-col gap-8 pl-10 transform-gpu will-change-transform"
                        >
                            {aboutPoints.map((point) => (
                                <InteractiveCard key={point.number} point={point} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative px-5 py-20 sm:px-6 lg:hidden">
                <p className="text-[0.72rem] font-medium uppercase tracking-[0.28em] text-[#dcc19a]">
                    {t("about.eyebrow")}
                </p>

                <h2 className="mt-4 font-serif text-[3.2rem] text-white">
                    {t("about.title")}
                </h2>

                <p className="mt-6 leading-7 text-white/62">
                    {t("about.description")}
                </p>

                <div className="mt-12 space-y-5 overflow-hidden">
                    {aboutPoints.map((point, index) => (
                        <div
                            key={point.number}
                            ref={(el) => {
                                mobileCardRefs.current[index] = el;
                            }}
                        >
                            <InteractiveCard point={point} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default AboutSection;