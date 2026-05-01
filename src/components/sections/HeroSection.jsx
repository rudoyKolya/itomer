import heroBg from "../../assets/hero/hero-full.png";

function HeroSection() {
    return (
        <section id="home" className="relative w-full overflow-hidden">
            <div
                className="
                    relative min-h-screen w-full
                    pt-[76px]
                    md:pt-[88px]
                "
            >
                <div
                    className="
                        absolute inset-0 bg-cover bg-no-repeat
                        bg-[72%_32%]
                        sm:bg-[74%_30%]
                        md:bg-[76%_24%]
                        lg:bg-[center_top]
                    "
                    style={{
                        backgroundImage: `url(${heroBg})`,
                    }}
                />

                <div
                    className="
                        absolute inset-0
                        bg-[linear-gradient(180deg,rgba(0,0,0,0.42)_0%,rgba(0,0,0,0.26)_18%,rgba(5,5,6,0.78)_42%,rgba(5,5,6,0.94)_100%)]
                        lg:bg-[linear-gradient(90deg,rgba(5,5,6,0.96)_0%,rgba(8,8,10,0.88)_22%,rgba(10,10,12,0.56)_42%,rgba(18,14,12,0.24)_68%,rgba(30,20,12,0.22)_100%)]
                    "
                />

                <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20" />

                <div
                    className="
                        relative z-10
                        flex min-h-[calc(100vh-76px)] items-center
                        px-5 py-10
                        sm:px-6 sm:py-12
                        md:min-h-[calc(100vh-88px)] md:px-8 md:py-16
                        lg:min-h-[calc(100vh-88px)] lg:px-12
                        xl:px-20
                    "
                >
                    <div className="w-full">
                        <div className="max-w-[360px] text-left sm:max-w-[430px] md:max-w-[520px] xl:max-w-[560px]">
                            <p
                                className="
                                    text-[0.72rem] font-medium uppercase tracking-[0.26em] text-[#dcc19a]
                                    sm:text-xs
                                "
                            >
                                Premium Car Brokerage
                            </p>

                            <h1
                                className="
                                    mt-4 font-serif leading-[0.94] tracking-[-0.035em] text-white
                                    text-[3rem]
                                    sm:text-[3.7rem]
                                    md:text-[4.3rem]
                                    xl:text-[5.2rem]
                                "
                            >
                                Exclusive Cars,
                                <br />
                                Delivered Personally
                            </h1>

                            <p
                                className="
                                    mt-5 max-w-[320px] text-white/74
                                    text-[1rem] leading-7
                                    sm:mt-6 sm:max-w-[360px] sm:text-lg sm:leading-8
                                    md:max-w-[430px] md:text-[1.12rem]
                                "
                            >
                                We source, negotiate, and secure premium vehicles across Europe with a discreet,
                                hands-on approach.
                            </p>

                            <div className="mt-8 flex flex-col gap-4 sm:mt-9 sm:flex-row sm:items-center">
                                <button
                                    className="
                                        rounded-xl bg-[#dcc19a] px-7 py-4 text-base font-medium text-[#2a2118] transition
                                        hover:bg-[#e7ccab]
                                        sm:px-8 sm:text-lg
                                    "
                                >
                                    Get Started
                                </button>

                                <a
                                    href="#featured-cars"
                                    className="
                                        text-sm font-medium uppercase tracking-[0.18em] text-white/72 transition
                                        hover:text-white
                                    "
                                >
                                    Explore Cars
                                </a>
                            </div>

                            <div
                                className="
                                    mt-10 flex flex-wrap gap-x-10 gap-y-6
                                    border-t border-white/12 pt-7
                                    sm:mt-12 sm:pt-8
                                    lg:mt-14
                                "
                            >
                                <div>
                                    <div className="text-[2rem] leading-none text-[#f4ede2] sm:text-[2.35rem] md:text-4xl">
                                        15+
                                    </div>
                                    <div className="mt-2 text-sm leading-5 text-white/58 sm:text-base">
                                        Years of Experience
                                    </div>
                                </div>

                                <div>
                                    <div className="text-[2rem] leading-none text-[#f4ede2] sm:text-[2.35rem] md:text-4xl">
                                        1,000+
                                    </div>
                                    <div className="mt-2 text-sm leading-5 text-white/58 sm:text-base">
                                        Satisfied Clients
                                    </div>
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