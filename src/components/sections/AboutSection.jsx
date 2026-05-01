import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HEADER_OFFSET = 88;

const aboutPoints = [
    {
        number: "01",
        title: "Personal Brokerage",
        description:
            "Every request is handled directly and individually, with a focus on discretion, precision, and a genuinely tailored search.",
    },
    {
        number: "02",
        title: "European Access",
        description:
            "We work through trusted dealers, selected partners, and private channels to access premium vehicles across Europe.",
    },
    {
        number: "03",
        title: "Verified Selection",
        description:
            "History, condition, provenance, and specification are reviewed before any option is presented for consideration.",
    },
    {
        number: "04",
        title: "End-to-End Handling",
        description:
            "From sourcing and negotiation to documentation, logistics, and delivery, the process stays coordinated from start to finish.",
    },
];

function AboutSection() {
    const sectionRef = useRef(null);
    const sceneRef = useRef(null);
    const bgRef = useRef(null);
    const glowLeftRef = useRef(null);
    const glowRightRef = useRef(null);
    const contentRef = useRef(null);
    const cardsTrackRef = useRef(null);
    const mobileCardRefs = useRef([]);

    useLayoutEffect(() => {
        const section = sectionRef.current;
        const scene = sceneRef.current;
        const bg = bgRef.current;
        const glowLeft = glowLeftRef.current;
        const glowRight = glowRightRef.current;
        const content = contentRef.current;
        const cardsTrack = cardsTrackRef.current;

        if (!section || !scene || !bg || !glowLeft || !glowRight || !content || !cardsTrack) {
            return undefined;
        }

        const mm = gsap.matchMedia();

        mm.add("(min-width: 1024px)", () => {
            const ctx = gsap.context(() => {
                const getViewportHeight = () => window.innerHeight - HEADER_OFFSET;

                const getStartY = () => getViewportHeight() + 120;

                const getFinalY = () => {
                    const viewportHeight = getViewportHeight();
                    const trackHeight = cardsTrack.scrollHeight;

                    return viewportHeight - trackHeight - viewportHeight * 0.08;
                };

                const getSceneDistance = () => {
                    const viewportHeight = getViewportHeight();
                    const trackHeight = cardsTrack.scrollHeight;

                    return Math.max(trackHeight + viewportHeight * 1.15, 2200);
                };

                gsap.set(cardsTrack, {
                    y: getStartY(),
                    force3D: true,
                });

                gsap.set([bg, glowLeft, glowRight, content], {
                    y: 0,
                    force3D: true,
                });

                const tl = gsap.timeline({
                    defaults: {
                        ease: "none",
                    },
                    scrollTrigger: {
                        trigger: section,
                        start: "top top",
                        end: () => `+=${getSceneDistance()}`,
                        scrub: 1.15,
                        pin: scene,
                        pinSpacing: true,
                        anticipatePin: 1.5,
                        invalidateOnRefresh: true,
                        preventOverlaps: true,
                    },
                });

                tl.to(bg, { y: -130, duration: 1 }, 0)
                    .to(glowLeft, { y: -210, duration: 1 }, 0)
                    .to(glowRight, { y: -160, duration: 1 }, 0)
                    .to(
                        cardsTrack,
                        {
                            y: getFinalY,
                            duration: 0.86,
                            immediateRender: false,
                        },
                        0
                    )
                    .to(
                        content,
                        {
                            y: -80,
                            duration: 0.14,
                        },
                        0.86
                    );

                if (document.fonts?.ready) {
                    document.fonts.ready.then(() => ScrollTrigger.refresh());
                }
            }, section);

            return () => ctx.revert();
        });

        mm.add("(max-width: 1023px)", () => {
            const ctx = gsap.context(() => {
                const cards = mobileCardRefs.current.filter(Boolean);

                cards.forEach((card, index) => {
                    gsap.fromTo(
                        card,
                        {
                            autoAlpha: 0,
                            y: 32,
                        },
                        {
                            autoAlpha: 1,
                            y: 0,
                            duration: 0.65,
                            delay: index * 0.06,
                            ease: "power3.out",
                            scrollTrigger: {
                                trigger: card,
                                start: "top 88%",
                                once: true,
                            },
                        }
                    );
                });
            }, section);

            return () => ctx.revert();
        });

        return () => mm.revert();
    }, []);

    return (
        <section
            id="about"
            ref={sectionRef}
            className="relative overflow-hidden bg-[#050506] text-white"
        >
            <div
                ref={sceneRef}
                className="relative hidden h-screen overflow-hidden lg:block"
            >
                <div ref={bgRef} className="pointer-events-none absolute inset-0">
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,#040405_0%,#070708_45%,#050506_100%)]" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(212,175,55,0.10),transparent_28%),radial-gradient(circle_at_82%_72%,rgba(255,255,255,0.035),transparent_24%)]" />
                    <div className="absolute inset-y-0 left-[12%] w-px bg-gradient-to-b from-transparent via-white/8 to-transparent" />
                    <div className="absolute inset-y-0 right-[10%] w-px bg-gradient-to-b from-transparent via-white/6 to-transparent" />
                </div>

                <div
                    ref={glowLeftRef}
                    className="pointer-events-none absolute left-[-8%] top-[12%] h-[24rem] w-[24rem] rounded-full bg-[#c8a36b]/[0.07] blur-[140px]"
                />

                <div
                    ref={glowRightRef}
                    className="pointer-events-none absolute right-[-6%] top-[45%] h-[18rem] w-[18rem] rounded-full bg-white/[0.03] blur-[120px]"
                />

                <div
                    ref={contentRef}
                    className="
                        relative z-10 mx-auto grid h-full max-w-[1440px]
                        grid-cols-[minmax(300px,0.92fr)_minmax(0,1.08fr)]
                        gap-14 px-12 pt-[88px] xl:px-20
                    "
                >
                    <div className="flex h-[calc(100vh-88px)] items-center">
                        <div className="max-w-[470px]">
                            <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#dcc19a]">
                                Who We Are
                            </p>

                            <h2 className="mt-4 font-serif text-[5rem] leading-[0.9] tracking-[-0.055em] text-white">
                                About Us
                            </h2>

                            <div className="mt-8 h-px w-24 bg-gradient-to-r from-[#dcc19a] to-transparent" />

                            <p className="mt-8 max-w-[400px] text-[1.04rem] leading-8 text-white/60">
                                A discreet, premium-first approach to sourcing remarkable
                                vehicles with clarity, confidence, and personal handling at every stage.
                            </p>
                        </div>
                    </div>

                    <div className="relative h-[calc(100vh-88px)] overflow-hidden">
                        <div
                            ref={cardsTrackRef}
                            className="absolute inset-x-0 top-0 flex flex-col gap-8 pl-10 will-change-transform"
                        >
                            {aboutPoints.map((point) => (
                                <article
                                    key={point.number}
                                    className="
                                        relative w-full max-w-[760px]
                                        rounded-[30px] border border-white/10
                                        bg-[linear-gradient(180deg,rgba(255,255,255,0.055)_0%,rgba(255,255,255,0.028)_100%)]
                                        p-8 backdrop-blur-xl
                                        shadow-[0_24px_90px_rgba(0,0,0,0.30)]
                                    "
                                >
                                    <div className="absolute left-3 top-10 flex h-7 w-7 items-center justify-center rounded-full border border-[#dcc19a]/40 bg-[#0b0b0d] shadow-[0_0_0_6px_rgba(5,5,6,0.95)]">
                                        <div className="h-2 w-2 rounded-full bg-[#dcc19a]" />
                                    </div>

                                    <div className="flex items-start justify-between gap-6 pl-10">
                                        <div className="text-[0.72rem] font-medium uppercase tracking-[0.24em] text-[#dcc19a]">
                                            {point.number}
                                        </div>

                                        <div className="h-px flex-1 translate-y-2 bg-gradient-to-r from-white/12 to-transparent" />
                                    </div>

                                    <h3 className="mt-6 pl-10 text-[2rem] font-medium leading-tight tracking-[-0.035em] text-white">
                                        {point.title}
                                    </h3>

                                    <p className="mt-5 max-w-[585px] pl-10 text-[1.02rem] leading-8 text-white/66">
                                        {point.description}
                                    </p>
                                </article>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative lg:hidden">
                <div className="absolute inset-0 bg-[linear-gradient(180deg,#050506_0%,#080809_100%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(212,175,55,0.10),transparent_28%)]" />

                <div className="relative z-10 px-5 py-20 sm:px-6 sm:py-24">
                    <div className="max-w-[430px]">
                        <p className="text-[0.72rem] font-medium uppercase tracking-[0.28em] text-[#dcc19a]">
                            Who We Are
                        </p>

                        <h2 className="mt-4 font-serif text-[3.2rem] leading-[0.9] tracking-[-0.05em] text-white sm:text-[4rem]">
                            About Us
                        </h2>

                        <div className="mt-6 h-px w-20 bg-gradient-to-r from-[#dcc19a] to-transparent" />

                        <p className="mt-6 max-w-[360px] text-[0.98rem] leading-7 text-white/62 sm:text-[1rem]">
                            A discreet, premium-first approach to sourcing remarkable
                            vehicles with personal handling throughout the process.
                        </p>
                    </div>

                    <div className="mt-12 space-y-5 sm:space-y-6">
                        {aboutPoints.map((point, index) => (
                            <article
                                key={point.number}
                                ref={(el) => {
                                    mobileCardRefs.current[index] = el;
                                }}
                                className="
                                    relative rounded-[24px] border border-white/10
                                    bg-[linear-gradient(180deg,rgba(255,255,255,0.05)_0%,rgba(255,255,255,0.028)_100%)]
                                    p-5 backdrop-blur-xl
                                "
                            >
                                <div className="text-[0.7rem] font-medium uppercase tracking-[0.24em] text-[#dcc19a]">
                                    {point.number}
                                </div>

                                <h3 className="mt-4 text-[1.5rem] font-medium leading-tight tracking-[-0.03em] text-white">
                                    {point.title}
                                </h3>

                                <p className="mt-4 text-[0.98rem] leading-7 text-white/66">
                                    {point.description}
                                </p>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AboutSection;