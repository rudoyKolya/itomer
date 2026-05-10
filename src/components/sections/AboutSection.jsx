import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "../../context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

function AboutSection() {
    const { t } = useLanguage();
    const sectionRef = useRef(null);
    const sceneRef = useRef(null);
    const bgRef = useRef(null);
    const cardsTrackRef = useRef(null);
    const mobileCardRefs = useRef([]);

    const aboutPoints = [
        { number: "01", title: t("about.point_01_title"), description: t("about.point_01_desc") },
        { number: "02", title: t("about.point_02_title"), description: t("about.point_02_desc") },
        { number: "03", title: t("about.point_03_title"), description: t("about.point_03_desc") },
        { number: "04", title: t("about.point_04_title"), description: t("about.point_04_desc") },
    ];

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
                setSectionHeight();
                gsap.set(cardsTrack, { y: () => getViewportHeight(), force3D: true });
                const tl = gsap.timeline({
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
                tl.to(cardsTrack, { y: () => -getTrackHeight() }, 0).to(bg, { y: -80 }, 0);
                window.addEventListener("resize", () => { setSectionHeight(); ScrollTrigger.refresh(); });
            }, section);
            return () => ctx.revert();
        });
        return () => mm.revert();
    }, []);

    return (
        <section id="about" ref={sectionRef} className="relative bg-[#050506] text-white">
            <div ref={sceneRef} className="sticky top-[76px] h-[calc(100svh-76px)] md:top-[88px] md:h-[calc(100svh-88px)] hidden overflow-hidden lg:block">
                <div ref={bgRef} className="pointer-events-none absolute inset-0 transform-gpu will-change-transform">
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,#040405_0%,#070708_45%,#050506_100%)]" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(212,175,55,0.10),transparent_28%)]" />
                </div>

                <div className="relative z-10 mx-auto grid h-full max-w-[1440px] grid-cols-[minmax(300px,0.92fr)_minmax(0,1.08fr)] gap-14 px-12 xl:px-20">
                    <div className="flex h-full items-center">
                        <div className="max-w-[470px]">
                            <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#dcc19a]">{t("about.eyebrow")}</p>
                            <h2 className="mt-4 font-serif text-[5rem] leading-[0.9] tracking-[-0.055em] text-white">{t("about.title")}</h2>
                            <div className="mt-8 h-px w-24 bg-gradient-to-r from-[#dcc19a] to-transparent" />
                            <p className="mt-8 max-w-[400px] text-[1.04rem] leading-8 text-white/60">{t("about.description")}</p>
                        </div>
                    </div>
                    <div className="relative h-full overflow-hidden">
                        <div ref={cardsTrackRef} className="absolute inset-x-0 flex flex-col gap-8 pl-10 transform-gpu will-change-transform">
                            {aboutPoints.map((point) => (
                                <article key={point.number} className="relative w-full max-w-[760px] rounded-[30px] border border-white/10 bg-white/[0.04] p-8 backdrop-blur-md">
                                    <div className="text-[0.72rem] font-medium uppercase tracking-[0.24em] text-[#dcc19a]">{point.number}</div>
                                    <h3 className="mt-6 text-[2rem] font-medium leading-tight text-white">{point.title}</h3>
                                    <p className="mt-5 text-[1.02rem] leading-8 text-white/66">{point.description}</p>
                                </article>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile View */}
            <div className="relative lg:hidden px-5 py-20 sm:px-6">
                <p className="text-[0.72rem] font-medium uppercase tracking-[0.28em] text-[#dcc19a]">{t("about.eyebrow")}</p>
                <h2 className="mt-4 font-serif text-[3.2rem] text-white">{t("about.title")}</h2>
                <p className="mt-6 text-white/62 leading-7">{t("about.description")}</p>
                <div className="mt-12 space-y-5">
                    {aboutPoints.map((point, index) => (
                        <article key={point.number} ref={(el) => { mobileCardRefs.current[index] = el; }} className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-md">
                            <h3 className="text-[1.5rem] font-medium text-white">{point.title}</h3>
                            <p className="mt-4 text-white/66 leading-7">{point.description}</p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default AboutSection;