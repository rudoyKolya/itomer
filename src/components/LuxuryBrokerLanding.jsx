import React, { useMemo, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import {
    ArrowRight,
    ChevronRight,
    Mail,
    MapPin,
    Phone,
    ShieldCheck,
    Sparkles,
    Truck,
    BadgeCheck,
    Search,
    CircleDollarSign,
    Globe // Для меню языков
} from "lucide-react";

const featuredCars = [
    { title: "Ferrari SF90", year: "2023", image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80" },
    { title: "Lamborghini Urus", year: "2022", image: "https://images.unsplash.com/photo-1494905998402-395d579af36f?auto=format&fit=crop&w=1200&q=80" },
    { title: "Porsche 911 Turbo S", year: "2024", image: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1200&q=80" },
];

function SectionHeading({ eyebrow, title, description, light = false }) {
    return (
        <div className="mx-auto max-w-3xl text-center">
            {eyebrow && <p className={`mb-4 text-xs font-semibold uppercase tracking-[0.35em] ${light ? "text-white/60" : "text-neutral-500"}`}>{eyebrow}</p>}
            <h2 className={`text-3xl font-light tracking-tight md:text-5xl ${light ? "text-white" : "text-neutral-950"}`}>{title}</h2>
            {description && <p className={`mx-auto mt-5 max-w-2xl text-sm leading-7 md:text-base ${light ? "text-white/70" : "text-neutral-600"}`}>{description}</p>}
        </div>
    );
}

function LuxuryBrokerLanding() {
    const { t, language, setLanguage } = useLanguage(); // ИНИЦИАЛИЗАЦИЯ ЯЗЫКА
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const heroBgY = useTransform(scrollYProgress, [0, 0.25], ["0%", "18%"]);
    const heroCarY = useTransform(scrollYProgress, [0, 0.25], ["0%", "8%"]);
    const heroContentY = useTransform(scrollYProgress, [0, 0.18], ["0%", "-6%"]);
    const glowY = useTransform(scrollYProgress, [0, 0.25], ["0%", "24%"]);

    const reveal = useMemo(() => ({
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.2 },
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    }), []);

    // Локализованные массивы данных
    const services = [
        { icon: Search, title: t("services.items.0.title"), description: t("services.items.0.desc") },
        { icon: ShieldCheck, title: t("services.items.1.title"), description: t("services.items.1.desc") },
        { icon: CircleDollarSign, title: t("services.items.2.title"), description: t("services.items.2.desc") },
        { icon: Truck, title: t("services.items.3.title"), description: t("services.items.3.desc") },
    ];

    const steps = [
        { number: "01", title: t("process.items.0.title"), description: t("process.items.0.desc") },
        { number: "02", title: t("process.items.1.title"), description: t("process.items.1.desc") },
        { number: "03", title: t("process.items.2.title"), description: t("process.items.2.desc") },
        { number: "04", title: t("process.items.3.title"), description: t("process.items.3.desc") },
    ];

    const stats = [
        { value: "15+", label: t("hero.stats_years") },
        { value: "1,000+", label: t("hero.stats_clients") },
        { value: "24/7", label: t("hero.stats_support") },
    ];

    const whyUsItems = [
        t("why_us.items.0"), t("why_us.items.1"), t("why_us.items.2"), t("why_us.items.3")
    ];

    return (
        <div ref={containerRef} className="min-h-screen bg-[#0a0a0a] text-white">
            <div className="relative overflow-x-hidden">

                {/* HEADER */}
                <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur-xl">
                    <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
                        <div className="text-xl font-semibold tracking-[0.35em] text-white">ITOMER</div>
                        <nav className="hidden items-center gap-8 text-sm text-white/75 md:flex">
                            <a href="#home" className="transition hover:text-white">{t("nav.home")}</a>
                            <a href="#services" className="transition hover:text-white">{t("nav.services")}</a>
                            <a href="#featured" className="transition hover:text-white">{t("nav.featured")}</a>
                            <a href="#process" className="transition hover:text-white">{t("nav.process")}</a>
                            <a href="#contact" className="transition hover:text-white">{t("nav.contact")}</a>
                        </nav>

                        <div className="flex items-center gap-6">
                            <div className="hidden lg:flex items-center gap-2 text-white/70">
                                <Globe size={16} />
                                <select
                                    value={language}
                                    onChange={(e) => setLanguage(e.target.value)}
                                    className="bg-transparent outline-none cursor-pointer hover:text-white uppercase text-xs"
                                >
                                    <option value="en" className="bg-[#050506]">EN</option>
                                    <option value="ru" className="bg-[#050506]">RU</option>
                                    <option value="ar" className="bg-[#050506]">AR</option>
                                </select>
                            </div>
                            <a href="#contact" className="rounded-full border border-[#d6b27a]/50 bg-[#d6b27a] px-5 py-2.5 text-sm font-medium text-black transition hover:scale-[1.02]">
                                {t("buttons.contact_us")}
                            </a>
                        </div>
                    </div>
                </header>

                {/* HERO */}
                <section id="home" className="relative flex min-h-screen items-center overflow-hidden pt-28">
                    <motion.div style={{ y: heroBgY }} className="absolute inset-0 bg-[radial-gradient(circle_at_18%_25%,rgba(195,143,84,0.28),transparent_26%),radial-gradient(circle_at_82%_20%,rgba(255,227,189,0.18),transparent_18%),linear-gradient(135deg,#050505_0%,#111111_50%,#1b1713_100%)]" />
                    <motion.div style={{ y: glowY }} className="absolute bottom-0 right-[-10%] h-[28rem] w-[28rem] rounded-full bg-[#c7955f]/20 blur-3xl md:h-[36rem] md:w-[36rem]" />
                    <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.15),rgba(0,0,0,0.45))]" />

                    <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-10 px-6 pb-12 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
                        <motion.div style={{ y: heroContentY }} className="max-w-xl">
                            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-6 text-xs font-semibold uppercase tracking-[0.38em] text-[#d6b27a]">
                                {t("hero.landing_subtitle")}
                            </motion.p>
                            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.05 }} className="text-5xl font-light leading-[1.02] tracking-tight text-white md:text-7xl">
                                {t("hero.landing_title")}
                            </motion.h1>
                            <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.12 }} className="mt-6 max-w-lg text-base leading-8 text-white/72 md:text-lg">
                                {t("hero.description")}
                            </motion.p>
                            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.18 }} className="mt-10 flex flex-wrap gap-4">
                                <a href="#contact" className="inline-flex items-center gap-2 rounded-full bg-[#d6b27a] px-6 py-3 text-sm font-medium text-black transition hover:scale-[1.02]">
                                    {t("buttons.get_started")} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                                </a>
                                <a href="#featured" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white transition hover:border-white/40 hover:bg-white/5">
                                    {t("buttons.view_cars")} <ChevronRight className="h-4 w-4 rtl:rotate-180" />
                                </a>
                            </motion.div>
                            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.24 }} className="mt-16 grid max-w-xl grid-cols-3 gap-6 border-t border-white/10 pt-8">
                                {stats.map((stat) => (
                                    <div key={stat.label}>
                                        <div className="text-3xl font-light tracking-tight text-white md:text-4xl">{stat.value}</div>
                                        <div className="mt-2 text-sm leading-5 text-white/55">{stat.label}</div>
                                    </div>
                                ))}
                            </motion.div>
                        </motion.div>
                        <motion.div style={{ y: heroCarY }} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }} className="relative">
                            <div className="absolute inset-x-10 bottom-6 h-24 rounded-full bg-black/60 blur-2xl md:h-28" />
                            <img src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1800&q=80" alt="Luxury sports car" className="relative z-10 w-full object-contain drop-shadow-[0_20px_80px_rgba(0,0,0,0.55)]" />
                        </motion.div>
                    </div>
                </section>

                {/* SERVICES */}
                <section id="services" className="relative bg-[#f5f2ee] py-24 text-neutral-950 md:py-32">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(214,178,122,0.15),transparent_24%)]" />
                    <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
                        <motion.div {...reveal}>
                            <SectionHeading eyebrow={t("services.badge")} title={t("services.landing_title")} description={t("services.landing_desc")} />
                        </motion.div>
                        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                            {services.map((service, index) => {
                                const Icon = service.icon;
                                return (
                                    <motion.div key={service.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.55, delay: index * 0.08 }} className="group rounded-[2rem] border border-black/5 bg-white/80 p-7 shadow-[0_16px_60px_rgba(0,0,0,0.08)] backdrop-blur">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f4e1bf] text-neutral-900">
                                            <Icon className="h-5 w-5" />
                                        </div>
                                        <h3 className="mt-6 text-2xl font-light tracking-tight text-neutral-950">{service.title}</h3>
                                        <p className="mt-4 text-sm leading-7 text-neutral-600">{service.description}</p>
                                        <button className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-neutral-900 transition group-hover:gap-3">
                                            {t("buttons.learn_more")} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                                        </button>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* FEATURED CARS */}
                <section id="featured" className="relative overflow-hidden py-24 md:py-32">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(214,178,122,0.18),transparent_20%),linear-gradient(180deg,#0d0d0d_0%,#141414_100%)]" />
                    <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
                        <motion.div {...reveal}>
                            <SectionHeading eyebrow={t("featured.eyebrow")} title={t("featured.landing_title")} description={t("featured.description")} light />
                        </motion.div>
                        <div className="mt-14 grid gap-6 lg:grid-cols-3">
                            {featuredCars.map((car, index) => (
                                <motion.article key={car.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.55, delay: index * 0.08 }} className="group overflow-hidden rounded-[2rem] border border-white/10 bg-white/5">
                                    <div className="relative h-72 overflow-hidden">
                                        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                                        <img src={car.image} alt={car.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                                    </div>
                                    <div className="flex items-end justify-between gap-4 p-6">
                                        <div>
                                            <p className="text-sm uppercase tracking-[0.25em] text-[#d6b27a]">{car.year}</p>
                                            <h3 className="mt-2 text-2xl font-light tracking-tight text-white">{car.title}</h3>
                                        </div>
                                        <button className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white transition hover:border-[#d6b27a] hover:bg-[#d6b27a] hover:text-black">
                                            <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                                        </button>
                                    </div>
                                </motion.article>
                            ))}
                        </div>
                        <motion.div {...reveal} className="mt-10 flex justify-center">
                            <button className="rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white transition hover:border-white/30 hover:bg-white/5">
                                {t("buttons.view_all_cars")}
                            </button>
                        </motion.div>
                    </div>
                </section>

                {/* PROCESS */}
                <section id="process" className="bg-[#f7f4ef] py-24 text-neutral-950 md:py-32">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <motion.div {...reveal}>
                            <SectionHeading eyebrow={t("process.eyebrow")} title={t("process.title")} description={t("process.description")} />
                        </motion.div>
                        <div className="mt-16 grid gap-6 lg:grid-cols-4">
                            {steps.map((step, index) => (
                                <motion.div key={step.number} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.55, delay: index * 0.08 }} className="relative rounded-[2rem] border border-black/5 bg-white p-7 shadow-[0_16px_50px_rgba(0,0,0,0.06)]">
                                    <div className="text-sm font-semibold tracking-[0.28em] text-[#b08a51]">{step.number}</div>
                                    <h3 className="mt-4 text-2xl font-light tracking-tight text-neutral-950">{step.title}</h3>
                                    <p className="mt-4 text-sm leading-7 text-neutral-600">{step.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* WHY US */}
                <section className="relative overflow-hidden py-24 md:py-32">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(214,178,122,0.16),transparent_18%),linear-gradient(180deg,#0d0d0d_0%,#111111_100%)]" />
                    <div className="relative mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
                        <motion.div {...reveal} className="max-w-xl">
                            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#d6b27a]">{t("why_us.eyebrow")}</p>
                            <h2 className="mt-5 text-4xl font-light tracking-tight text-white md:text-5xl">{t("why_us.title")}</h2>
                            <p className="mt-6 text-base leading-8 text-white/70">{t("why_us.description")}</p>
                        </motion.div>
                        <div className="grid gap-6 md:grid-cols-2">
                            {whyUsItems.map((item, index) => (
                                <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.55, delay: index * 0.08 }} className="rounded-[2rem] border border-white/10 bg-white/5 p-7">
                                    <BadgeCheck className="h-6 w-6 text-[#d6b27a]" />
                                    <p className="mt-5 text-lg leading-8 text-white/85">{item}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CONTACT */}
                <section id="contact" className="bg-[#f5f2ee] py-24 text-neutral-950 md:py-32">
                    <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
                        <motion.div {...reveal} className="max-w-xl">
                            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#b08a51]">{t("contact.eyebrow")}</p>
                            <h2 className="mt-5 text-4xl font-light tracking-tight text-neutral-950 md:text-5xl">{t("contact.title")}</h2>
                            <p className="mt-6 text-base leading-8 text-neutral-600">{t("contact.description")}</p>

                            <div className="mt-10 rounded-[2rem] bg-[#1a1714] p-6 text-white shadow-[0_16px_60px_rgba(0,0,0,0.14)]">
                                <div className="flex items-start gap-4">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#d6b27a] text-black">
                                        <Sparkles className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <p className="text-lg leading-8 text-white/85">{t("contact.testimonial")}</p>
                                        <p className="mt-4 text-sm uppercase tracking-[0.25em] text-white/45">{t("contact.client_name")}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 space-y-4 text-sm text-neutral-700">
                                <div className="flex items-center gap-3"><Phone className="h-4 w-4 text-[#b08a51]" /> <span dir="ltr">{t("contact.phone")}</span></div>
                                <div className="flex items-center gap-3"><Mail className="h-4 w-4 text-[#b08a51]" /> <span>{t("contact.email")}</span></div>
                                <div className="flex items-center gap-3"><MapPin className="h-4 w-4 text-[#b08a51]" /> <span>{t("contact.location")}</span></div>
                            </div>
                        </motion.div>

                        <motion.form {...reveal} className="rounded-[2rem] border border-black/5 bg-white p-8 shadow-[0_18px_60px_rgba(0,0,0,0.08)]">
                            <div className="grid gap-5 md:grid-cols-2">
                                <label className="block">
                                    <span className="mb-2 block text-sm text-neutral-600">{t("contact.form_title")}</span>
                                    <input type="text" placeholder={t("contact.placeholder_name")} className="w-full rounded-2xl border border-neutral-200 bg-[#faf8f5] px-4 py-3 outline-none transition focus:border-[#d6b27a]" />
                                </label>
                                <label className="block">
                                    <span className="mb-2 block text-sm text-neutral-600">Email</span>
                                    <input type="email" placeholder={t("contact.placeholder_email")} className="w-full rounded-2xl border border-neutral-200 bg-[#faf8f5] px-4 py-3 outline-none transition focus:border-[#d6b27a]" />
                                </label>
                                <label className="block md:col-span-2">
                                    <span className="mb-2 block text-sm text-neutral-600">{t("contact.placeholder_phone")}</span>
                                    <input type="tel" placeholder={t("contact.placeholder_phone")} className="w-full rounded-2xl border border-neutral-200 bg-[#faf8f5] px-4 py-3 outline-none transition focus:border-[#d6b27a]" />
                                </label>
                                <label className="block md:col-span-2">
                                    <span className="mb-2 block text-sm text-neutral-600">What car are you looking for?</span>
                                    <textarea rows={5} placeholder={t("contact.placeholder_car")} className="w-full rounded-[1.5rem] border border-neutral-200 bg-[#faf8f5] px-4 py-3 outline-none transition focus:border-[#d6b27a]" />
                                </label>
                            </div>
                            <button type="submit" className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#d6b27a] px-6 py-4 text-sm font-medium text-black transition hover:scale-[1.01]">
                                {t("buttons.contact_us")} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                            </button>
                        </motion.form>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default LuxuryBrokerLanding;