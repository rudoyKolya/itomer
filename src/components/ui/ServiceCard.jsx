import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

function ServiceCard({ service, index }) {
    const Icon = service.icon;

    return (
        <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: index * 0.08 }}
            className="rounded-[1.8rem] border border-black/5 bg-white/85 p-8 shadow-[0_15px_50px_rgba(0,0,0,0.06)]"
        >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#e7d7bf] bg-[#f7ecdc] text-[#8e6d46]">
                <Icon className="h-6 w-6" />
            </div>

            <h3 className="mt-7 text-3xl font-medium leading-tight text-[#2d2621]">
                {service.title}
            </h3>

            <p className="mt-5 text-base leading-8 text-[#6d655d]">
                {service.description}
            </p>

            <button className="mt-7 inline-flex items-center gap-2 rounded-lg border border-black/8 px-4 py-2 text-sm text-[#5a5148] transition hover:border-[#d8bd96] hover:text-[#2d2621]">
                Learn More <ArrowRight className="h-4 w-4" />
            </button>
        </motion.article>
    );
}

export default ServiceCard;