import { motion } from "framer-motion";

function FeaturedCarCard({ car, index }) {
    return (
        <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: index * 0.08 }}
            className="group overflow-hidden rounded-[1.8rem] border border-white/10 bg-white/5"
        >
            <div className="relative h-[320px] overflow-hidden">
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
                <img
                    src={car.image}
                    alt={car.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
            </div>

            <div className="p-6 text-2xl text-white">
                {car.year} {car.title}
            </div>
        </motion.article>
    );
}

export default FeaturedCarCard;