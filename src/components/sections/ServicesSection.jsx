import { motion } from "framer-motion";
import ServiceCard from "../ui/ServiceCard";
import { useLanguage } from "../../context/LanguageContext";
import { Search, ShieldCheck, CircleDollarSign, Truck } from "lucide-react";
import EuropeMap from "../ui/EuropeMap";

function ServicesSection() {
    const { t } = useLanguage();

    // Создаем массив сервисов, подтягивая текст из локализаций
    const servicesData = [
        {
            icon: Search,
            title: t("services.items.0.title"),
            description: t("services.items.0.desc"),
        },
        {
            icon: ShieldCheck,
            title: t("services.items.1.title"),
            description: t("services.items.1.desc"),
        },
        {
            icon: CircleDollarSign,
            title: t("services.items.2.title"),
            description: t("services.items.2.desc"),
        },
        {
            icon: Truck,
            title: t("services.items.3.title"),
            description: t("services.items.3.desc"),
        },
    ];

    return (
        <section
            id="services"
            className="relative bg-[#f4f1ee] px-4 py-24 text-[#2d2621] md:px-8 md:py-28"
        >
            <div className="mx-auto max-w-[1500px]">
                <motion.div
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                >
                    <div className="max-w-[1100px] px-2">
                        <h2 className="font-serif text-4xl leading-tight md:text-6xl">
                            {t("services.title").split("{badge}")[0]}
                            <span className="font-semibold">{t("services.badge")}</span>
                            {t("services.title").split("{badge}")[1]}
                        </h2>

                        <p className="mt-8 max-w-2xl text-lg leading-8 text-[#6d655d]">
                            {t("services.description")}
                        </p>
                    </div>
                </motion.div>

                <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                    {servicesData.map((service, index) => (
                        <ServiceCard key={service.title} service={service} index={index} />
                    ))}
                </div>
                <div className="mt-20">
                    <div className="text-center mb-10">
                        <h3 className="text-2xl font-serif text-white mb-2">European Sourcing Network</h3>
                        <p className="text-white/50 text-sm">Direct access to premium vehicles across all major hubs.</p>
                    </div>
                    <EuropeMap />
                </div>
            </div>
        </section>
    );
}

export default ServicesSection;