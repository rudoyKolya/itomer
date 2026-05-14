import heroBg from "../../assets/hero/hero-full.webp";
import { useLanguage } from "../../context/useLanguage";
import { handleAnchorClick } from "../../utils/scrollTo";

function HeroSection() {
    const { t } = useLanguage();

    return (
        <section id="home" className="relative w-full overflow-hidden" aria-label="Hero section">
            <div className="relative min-h-[100svh] w-full">
                <div className="absolute inset-0">
                    <img
                        src={heroBg}
                        alt="Luxury premium car showcase"
                        fetchPriority="high"
                        loading="eager"
                        className="h-full w-full object-cover object-[72%_35%] lg:object-[center_15%]"
                    />
                </div>

                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.42)_0%,rgba(0,0,0,0.26)_18%,rgba(5,5,6,0.78)_42%,rgba(5,5,6,0.94)_100%)] lg:bg-[linear-gradient(90deg,rgba(5,5,6,0.96)_0%,rgba(8,8,10,0.88)_22%,rgba(10,10,12,0.56)_42%,rgba(18,14,12,0.24)_68%,rgba(30,20,12,0.22)_100%)]" />

                <div className="relative z-10 flex min-h-[100svh] items-center px-5 pt-[76px] md:px-8 md:pt-[88px] xl:px-20">
                    <div className="w-full">
                        <div className="max-w-[560px]">
                            <p className="text-[0.72rem] font-bold uppercase tracking-[0.26em] text-[#dcc19a] sm:text-xs">
                                {t("hero.subtitle")}
                            </p>

                            <h1 className="mt-4 font-serif text-[3rem] leading-[0.94] tracking-[-0.035em] text-white sm:text-[4.3rem] xl:text-[5.2rem] whitespace-pre-line">
                                {t("hero.title")}
                            </h1>

                            <p className="mt-6 max-w-[430px] text-white/80 text-lg leading-8">
                                {t("hero.description")}
                            </p>

                            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                                <a
                                    href="#about"
                                    onClick={(e) => handleAnchorClick(e, "about")}
                                    className="rounded-xl bg-[#dcc19a] px-8 py-4 text-center text-lg font-bold text-[#1a1a1a] transition hover:bg-[#e7ccab]"
                                    aria-label="Get started with our premium services"
                                >
                                    {t("buttons.get_started")}
                                </a>
                                <a
                                    href="#featured"
                                    onClick={(e) => handleAnchorClick(e, "featured", window.innerWidth >= 1024 ? window.innerWidth * 0.7 : 0)}
                                    className="text-sm font-medium uppercase tracking-[0.18em] text-white/80 transition hover:text-white"
                                >
                                    {t("buttons.explore_cars")}
                                </a>
                            </div>

                            <div className="mt-12 flex flex-wrap gap-x-10 gap-y-6 border-t border-white/12 pt-8">
                                <div>
                                    <div className="text-[2.35rem] font-serif leading-none text-[#f4ede2] md:text-4xl">15+</div>
                                    <div className="mt-2 text-sm text-white/60">{t("hero.stats_years")}</div>
                                </div>
                                <div>
                                    <div className="text-[2.35rem] font-serif leading-none text-[#f4ede2] md:text-4xl">1,000+</div>
                                    <div className="mt-2 text-sm text-white/60">{t("hero.stats_clients")}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HeroSection;