import { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Volume2, VolumeX, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "../../context/useLanguage";

const SLIDE_INTERVAL = 4000;

function CarModal({ car, isOpen, onClose }) {
    const { t } = useLanguage();
    const [isPlaying, setIsPlaying] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [direction, setDirection] = useState(1);
    const audioRef = useRef(null);
    const timerRef = useRef(null);

    const images = car?.images?.length > 0 ? car.images : car ? [car.image] : [];
    const hasMultiple = images.length > 1;

    useEffect(() => {
        if (isOpen) {
            setActiveIndex(0);
            setDirection(1);
        }
    }, [isOpen, car?.id]);

    // Auto-advance timer — pauses when only 1 image
    const startTimer = useCallback(() => {
        if (!hasMultiple) return;
        clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
            setDirection(1);
            setActiveIndex((i) => (i + 1) % images.length);
        }, SLIDE_INTERVAL);
    }, [hasMultiple, images.length]);

    useEffect(() => {
        if (isOpen && hasMultiple) {
            startTimer();
        }
        return () => clearInterval(timerRef.current);
    }, [isOpen, hasMultiple, startTimer]);

    const goTo = useCallback((index) => {
        setDirection(index > activeIndex ? 1 : -1);
        setActiveIndex(index);
        startTimer(); // reset timer on manual nav
    }, [activeIndex, startTimer]);

    const prev = useCallback(() => {
        setDirection(-1);
        setActiveIndex((i) => (i - 1 + images.length) % images.length);
        startTimer();
    }, [images.length, startTimer]);

    const next = useCallback(() => {
        setDirection(1);
        setActiveIndex((i) => (i + 1) % images.length);
        startTimer();
    }, [images.length, startTimer]);

    // Keyboard navigation
    useEffect(() => {
        if (!isOpen) return;
        const onKey = (e) => {
            if (e.key === "ArrowLeft") prev();
            else if (e.key === "ArrowRight") next();
            else if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [isOpen, prev, next, onClose]);

    // Scroll lock
    useEffect(() => {
        if (!isOpen) return;
        const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
        const origHtml = document.documentElement.style.overflow;
        const origBody = document.body.style.overflow;
        const origPad = document.body.style.paddingRight;

        document.documentElement.style.overflow = "hidden";
        document.body.style.overflow = "hidden";
        if (scrollBarWidth > 0) document.body.style.paddingRight = `${scrollBarWidth}px`;

        const preventScroll = (e) => {
            const scrollable = document.getElementById("modal-scrollable-content");
            if (scrollable && scrollable.contains(e.target)) return;
            e.preventDefault();
        };
        window.addEventListener("wheel", preventScroll, { passive: false });
        window.addEventListener("touchmove", preventScroll, { passive: false });

        return () => {
            document.documentElement.style.overflow = origHtml;
            document.body.style.overflow = origBody;
            document.body.style.paddingRight = origPad;
            window.removeEventListener("wheel", preventScroll);
            window.removeEventListener("touchmove", preventScroll);
        };
    }, [isOpen]);

    // Audio
    useEffect(() => {
        const audio = audioRef.current;
        if (isOpen && car && audio) {
            audio.pause();
            audio.src = car.audio;
            audio.load();
            const playAudio = () => {
                audio.play().then(() => setIsPlaying(true)).catch(() => {});
            };
            audio.addEventListener("canplaythrough", playAudio, { once: true });
            return () => {
                audio.removeEventListener("canplaythrough", playAudio);
                audio.pause();
            };
        }
    }, [isOpen, car]);

    const toggleAudio = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            audioRef.current.play().then(() => setIsPlaying(true));
        }
    };

    if (!car || !isOpen) return null;

    const slideVariants = {
        enter: (dir) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
        center: { x: 0, opacity: 1 },
        exit: (dir) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0 }),
    };

    return createPortal(
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
            data-lenis-prevent="true"
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-3 sm:p-6 backdrop-blur-md"
            onClick={onClose}
        >
            <audio ref={audioRef} preload="none" onEnded={() => setIsPlaying(false)} />

            <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
                className="relative flex w-full max-w-[1000px] flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#0a0a0a] shadow-2xl max-h-[95vh] md:max-h-[85vh] md:flex-row"
            >
                <button
                    onClick={onClose}
                    aria-label="Close"
                    className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white transition hover:bg-[#dcc19a] hover:text-black md:right-4 md:top-4 md:h-10 md:w-10"
                >
                    <X size={18} />
                </button>

                {/* Image panel */}
                <div className="relative h-[220px] w-full shrink-0 overflow-hidden sm:h-[260px] md:h-auto md:w-5/12 lg:w-1/2">
                    <AnimatePresence initial={false} custom={direction} mode="sync">
                        <motion.img
                            key={activeIndex}
                            src={images[activeIndex]}
                            alt={`${car.name} — photo ${activeIndex + 1}`}
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                            className="absolute inset-0 h-full w-full object-cover"
                        />
                    </AnimatePresence>

                    {/* Gradient overlay */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-[#0a0a0a]" />

                    {/* Prev / Next arrows — only when multiple images */}
                    {hasMultiple && (
                        <>
                            <button
                                onClick={prev}
                                aria-label="Previous photo"
                                className="absolute left-3 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition hover:bg-[#dcc19a] hover:text-black md:left-4 md:h-9 md:w-9"
                            >
                                <ChevronLeft size={18} />
                            </button>
                            <button
                                onClick={next}
                                aria-label="Next photo"
                                className="absolute right-3 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition hover:bg-[#dcc19a] hover:text-black md:right-4 md:h-9 md:w-9"
                            >
                                <ChevronRight size={18} />
                            </button>
                        </>
                    )}

                    {/* Dot indicators */}
                    {hasMultiple && (
                        <div className="absolute bottom-14 left-1/2 z-10 flex -translate-x-1/2 gap-1.5 md:bottom-16">
                            {images.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => goTo(i)}
                                    aria-label={`Photo ${i + 1}`}
                                    className={`h-1.5 rounded-full transition-all duration-300 ${
                                        i === activeIndex
                                            ? "w-5 bg-[#dcc19a]"
                                            : "w-1.5 bg-white/40 hover:bg-white/70"
                                    }`}
                                />
                            ))}
                        </div>
                    )}

                    {/* Audio button */}
                    <button
                        onClick={toggleAudio}
                        className={`absolute bottom-4 left-4 z-10 flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium transition backdrop-blur-md md:bottom-6 md:left-6 md:px-5 md:py-3 md:text-sm ${
                            isPlaying ? "bg-[#dcc19a] text-black" : "bg-black/50 text-white"
                        }`}
                    >
                        {isPlaying ? <VolumeX size={16} /> : <Volume2 size={16} />}
                        {isPlaying ? t("modal.stop_sound") : t("modal.play_sound")}
                    </button>
                </div>

                {/* Content */}
                <div
                    id="modal-scrollable-content"
                    className="flex w-full flex-col overflow-y-auto p-5 text-white sm:p-6 md:w-7/12 md:p-8 lg:w-1/2"
                    style={{ overscrollBehavior: "contain" }}
                >
                    <div className="text-[10px] font-medium uppercase tracking-[0.24em] text-[#dcc19a] md:text-xs">
                        {car.year}
                    </div>

                    <h2 className="mt-1 font-serif text-2xl leading-tight sm:text-3xl md:mt-2 md:text-4xl">
                        {car.name}
                    </h2>

                    <p className="mt-2 text-xs text-white/70 leading-relaxed sm:text-sm md:mt-4 md:text-base">
                        {car.description}
                    </p>

                    <div className="mt-4 border-t border-white/10 pt-4 md:mt-6 md:pt-6">
                        <h3 className="mb-3 text-start text-[10px] font-semibold uppercase tracking-wider text-white/50 md:text-xs">
                            {t("modal.specs_title")}
                        </h3>

                        <div className="grid grid-cols-3 gap-x-2 gap-y-3 sm:gap-x-4 sm:gap-y-4 md:grid-cols-2 lg:grid-cols-3">
                            {Object.entries(car.specs).map(([key, value]) => (
                                <div key={key} className="flex flex-col gap-0.5 text-start">
                                    <span className="text-[9px] text-white/40 uppercase tracking-wider sm:text-[10px] md:text-xs">
                                        {t(`modal.specs.${key}`)}
                                    </span>
                                    <span className="text-xs font-medium text-white/90 sm:text-sm">
                                        <bdi>{value}</bdi>
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>,
        document.getElementById("modal-root")
    );
}

export default CarModal;
