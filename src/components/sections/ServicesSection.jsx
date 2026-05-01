import { motion } from "framer-motion";
import { services } from "../../data/services";
import ServiceCard from "../ui/ServiceCard";

function ServicesSection() {
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
                            We Offer a <span className="font-semibold">Full-Service</span> Premium Brokerage Experience
                        </h2>

                        <p className="mt-8 max-w-2xl text-lg leading-8 text-[#6d655d]">
                            For clients who expect more than a listing feed — we provide sourcing,
                            guidance, negotiation support, and import coordination in one premium process.
                        </p>
                    </div>
                </motion.div>

                <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                    {services.map((service, index) => (
                        <ServiceCard key={service.title} service={service} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default ServicesSection;