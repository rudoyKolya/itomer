import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { X, Volume2, VolumeX } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

function CarModal({ car, isOpen, onClose }) {
    const { t } = useLanguage();
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    // Блокировка скролла фона
    useEffect(() => {
        if (!isOpen) return;

        const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
        const originalHtmlOverflow = document.documentElement.style.overflow;
        const originalBodyOverflow = document.body.style.overflow;
        const originalPadding = document.body.style.paddingRight;

        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';

        if (scrollBarWidth > 0) {
            document.body.style.paddingRight = `${scrollBarWidth}px`;
        }

        const preventScroll = (e) => {
            const scrollableDiv = document.getElementById('modal-scrollable-content');
            if (scrollableDiv && scrollableDiv.contains(e.target)) return;
            e.preventDefault();
        };

        window.addEventListener('wheel', preventScroll, { passive: false });
        window.addEventListener('touchmove', preventScroll, { passive: false });

        return () => {
            document.documentElement.style.overflow = originalHtmlOverflow;
            document.body.style.overflow = originalBodyOverflow;
            document.body.style.paddingRight = originalPadding;
            window.removeEventListener('wheel', preventScroll);
            window.removeEventListener('touchmove', preventScroll);
        };
    }, [isOpen]);

    // Логика аудио
    useEffect(() => {
        const audio = audioRef.current;
        if (isOpen && car && audio) {
            audio.pause();
            audio.src = car.audio;
            audio.load();

            const playAudio = () => {
                audio.play()
                    .then(() => setIsPlaying(true))
                    .catch(() => console.log("Autoplay blocked"));
            };

            audio.addEventListener('canplaythrough', playAudio, { once: true });
            return () => {
                audio.removeEventListener('canplaythrough', playAudio);
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
                // Высота автоматически подстраивается под контент, но не больше 95% экрана
                className="relative flex w-full max-w-[1000px] flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#0a0a0a] shadow-2xl max-h-[95vh] md:max-h-[85vh] md:flex-row"
            >
                <button
                    onClick={onClose}
                    aria-label="Close"
                    className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white transition hover:bg-[#dcc19a] hover:text-black md:right-4 md:top-4 md:h-10 md:w-10"
                >
                    <X size={18} />
                </button>

                {/* Уменьшена высота картинки для мобильных (180px), чтобы дать место тексту */}
                <div className="relative h-[180px] w-full shrink-0 sm:h-[220px] md:h-auto md:w-5/12 lg:w-1/2">
                    <img src={car.image} alt={car.name} className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-[#0a0a0a]" />

                    <button
                        onClick={toggleAudio}
                        className={`absolute bottom-4 left-4 flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium transition backdrop-blur-md md:bottom-6 md:left-6 md:px-5 md:py-3 md:text-sm ${isPlaying ? 'bg-[#dcc19a] text-black' : 'bg-black/50 text-white'}`}
                    >
                        {isPlaying ? <VolumeX size={16} /> : <Volume2 size={16} />}
                        {isPlaying ? t("modal.stop_sound") : t("modal.play_sound")}
                    </button>
                </div>

                {/* Контент: отступы и размеры шрифтов уплотнены */}
                <div
                    id="modal-scrollable-content"
                    className="flex w-full flex-col overflow-y-auto p-5 text-white sm:p-6 md:w-7/12 md:p-8 lg:w-1/2"
                    style={{ overscrollBehavior: 'contain' }}
                >
                    <div className="text-[10px] font-medium uppercase tracking-[0.24em] text-[#dcc19a] md:text-xs">
                        {car.year}
                    </div>

                    <h2 className="mt-1 text-2xl font-serif leading-tight sm:text-3xl md:mt-2 md:text-4xl">
                        {car.name}
                    </h2>

                    <p className="mt-2 text-xs text-white/70 leading-relaxed sm:text-sm md:mt-4 md:text-base">
                        {car.description}
                    </p>

                    {/* Характеристики: теперь в 3 колонки (grid-cols-3) на мобильных */}
                    <div className="mt-4 border-t border-white/10 pt-4 md:mt-6 md:pt-6">
                        <h3 className="mb-3 text-start text-[10px] font-semibold uppercase tracking-wider text-white/50 md:text-xs">
                            {t("modal.specs_title")}
                        </h3>

                        <div className="grid grid-cols-3 gap-x-2 gap-y-3 sm:gap-x-4 sm:gap-y-4 md:grid-cols-2 lg:grid-cols-3">
                            {Object.entries(car.specs).map(([key, value]) => (
                                // Добавили text-start на весь контейнер характеристики
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