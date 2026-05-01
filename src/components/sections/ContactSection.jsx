import { motion } from "framer-motion";
import { ArrowRight, Mail, Phone, Star } from "lucide-react";

function ContactSection() {
    return (
        <section
            id="contact"
            className="relative bg-[#f4f1ee] px-4 py-24 text-[#2d2621] md:px-8 md:py-28"
        >
            <div className="mx-auto grid max-w-[1500px] gap-10 lg:grid-cols-[0.85fr_0.95fr_0.45fr]">
                <motion.div
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                >
                    <h2 className="font-serif text-4xl md:text-6xl">Get in Touch</h2>

                    <p className="mt-6 max-w-md text-lg leading-8 text-[#6d655d]">
                        Ready to find your next luxury car? Contact us today to get started.
                    </p>

                    <div className="mt-12 max-w-[520px] overflow-hidden rounded-[1.8rem] bg-[linear-gradient(135deg,#1b1715_0%,#3d3128_100%)] p-6 text-white shadow-[0_18px_60px_rgba(0,0,0,0.14)]">
                        <div className="flex gap-4">
                            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#d8bd96] text-[#2b2219]">
                                <Star className="h-6 w-6" />
                            </div>

                            <div>
                                <p className="text-lg leading-8 text-white/90">
                                    “Outstanding service. ITOMER helped us identify the right car quickly and handled the process with total clarity.”
                                </p>
                                <p className="mt-5 text-sm tracking-[0.18em] text-white/55">
                                    ALEX K. · SATISFIED CLIENT
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.form
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                    className="rounded-[1.8rem] border border-black/5 bg-white p-8 shadow-[0_18px_60px_rgba(0,0,0,0.08)]"
                >
                    <h3 className="mb-6 text-4xl font-serif">Full Name</h3>

                    <div className="space-y-4">
                        <input
                            type="text"
                            placeholder="Your name"
                            className="w-full rounded-xl border border-[#e7ddd3] bg-[#f6f2ee] px-4 py-3.5 outline-none transition focus:border-[#d8bd96]"
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full rounded-xl border border-[#e7ddd3] bg-[#f6f2ee] px-4 py-3.5 outline-none transition focus:border-[#d8bd96]"
                        />
                        <input
                            type="tel"
                            placeholder="Phone Number"
                            className="w-full rounded-xl border border-[#e7ddd3] bg-[#f6f2ee] px-4 py-3.5 outline-none transition focus:border-[#d8bd96]"
                        />
                        <textarea
                            rows={5}
                            placeholder="Message"
                            className="w-full rounded-xl border border-[#e7ddd3] bg-[#f6f2ee] px-4 py-3.5 outline-none transition focus:border-[#d8bd96]"
                        />
                    </div>

                    <button
                        type="submit"
                        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#dcc19a] px-6 py-4 text-lg font-medium text-[#2b2219] transition hover:bg-[#e5cbab]"
                    >
                        Contact Us <ArrowRight className="h-4 w-4" />
                    </button>
                </motion.form>

                <motion.div
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col justify-between"
                >
                    <div className="space-y-6 text-lg text-[#6d655d]">
                        <div className="flex items-center gap-4">
                            <Phone className="h-5 w-5 text-[#b28a58]" />
                            <span>+420 123 456 789</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <Mail className="h-5 w-5 text-[#b28a58]" />
                            <span>info@itomerlux.com</span>
                        </div>
                    </div>

                    <div className="mt-10">
                        <h3 className="font-serif text-4xl text-[#2d2621]">Contact</h3>
                        <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-sm uppercase tracking-[0.18em] text-[#8d857c]">
                            <span>Home</span>
                            <span>About</span>
                            <span>Services</span>
                            <span>Featured Cars</span>
                            <span>Contact</span>
                        </div>
                        <p className="mt-10 text-sm text-[#948c84]">© 2026 | ITOMER. All rights reserved.</p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

export default ContactSection;