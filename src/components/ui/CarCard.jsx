import { useLanguage } from "../../context/useLanguage";

function CarCard({ car, onOpen }) {
    const { t } = useLanguage();

    return (
        <div
            onClick={() => onOpen(car)}
            // Жестко фиксируем высоту:
            // h-[420px] для мобилок и планшетов,
            // lg:h-full для десктопа (чтобы вписаться в GSAP-трек)
            className="group relative flex w-full max-w-[400px] shrink-0 cursor-pointer flex-col justify-end overflow-hidden rounded-[2rem] bg-[#0a0a0a] shadow-lg h-[420px] lg:h-full lg:w-[380px] xl:w-[420px]"
        >
            {/* Обертка для картинки */}
            <div className="absolute inset-0">
                <img
                    src={car.image}
                    alt={car.name}
                    loading="lazy"
                    // object-cover заставит любую картинку идеально заполнить карточку
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
            </div>

            {/* Градиент для читаемости текста (затемнение снизу) */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050506]/90 via-[#050506]/30 to-transparent transition-opacity duration-500 group-hover:from-[#050506]" />

            {/* Контент карточки */}
            <div className="relative z-10 p-6 sm:p-8">
                <div className="transform transition-transform duration-500 ease-out lg:translate-y-4 lg:group-hover:translate-y-0">
                    <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#dcc19a]">
                        {car.year}
                    </p>

                    <h3 className="mt-1 font-serif text-2xl leading-tight text-white sm:text-3xl">
                        {car.name}
                    </h3>

                    <div className="mt-5">
                        {/* Кнопка "View Details", как на скриншоте */}
                        <button className="rounded-xl bg-[#dcc19a] px-6 py-2.5 text-sm font-bold text-[#1a1a1a] transition hover:bg-[#e7ccab]">
                            {/* Добавил fallback на случай, если ключа нет в переводах */}
                            {t("buttons.view_details") || "View Details"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CarCard;