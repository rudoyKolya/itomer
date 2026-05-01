import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { featuredCars } from "../../data/featuredCars";
import SectionTitle from "../layout/SectionTitle";
import FeaturedCarCard from "../ui/FeaturedCarCard";

function FeaturedCarsSection() {
    return (
        <section id="featured" className="relative overflow-hidden px-4 py-24 md:px-8 md:py-28">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(214,178,122,0.14),transparent_16%),linear-gradient(180deg,#121212_0%,#171412_100%)]" />

            <div className="relative mx-auto max-w-[1500px]">
                <motion.div
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center"
                >
                    <SectionTitle title="Discover Our Featured Cars" dark centered />
                </motion.div>

                <div className="mt-14 flex items-center gap-4">
                    <button className="hidden h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/70 transition hover:border-white/30 hover:text-white lg:inline-flex">
                        <ChevronLeft className="h-4 w-4" />
                    </button>

                    <div className="grid flex-1 gap-6 lg:grid-cols-3">
                        {featuredCars.map((car, index) => (
                            <FeaturedCarCard key={car.title} car={car} index={index} />
                        ))}
                    </div>

                    <button className="hidden h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/70 transition hover:border-white/30 hover:text-white lg:inline-flex">
                        <ChevronRight className="h-4 w-4" />
                    </button>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                    className="mt-10 flex justify-center"
                >
                    <button className="rounded-xl border border-white/15 bg-white/5 px-7 py-3.5 text-base text-white transition hover:border-white/30 hover:bg-white/10">
                        View All Cars
                    </button>
                </motion.div>
            </div>
        </section>
    );
}

export default FeaturedCarsSection;