import { useState } from "react";
import { Menu, X, Globe } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

const HEADER_OFFSET = 88;

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { language, setLanguage, t } = useLanguage();

    const navItems = [
        { label: t("nav.home"), id: "home" },
        { label: t("nav.about"), id: "about" },
        { label: t("nav.services"), id: "services" },
        { label: t("nav.featured"), id: "featured" },
        { label: t("nav.contact"), id: "contact" },
    ];

    const handleNavClick = (event, targetId) => {
        event.preventDefault();
        const target = document.getElementById(targetId);
        if (!target) return;

        // МАГИЯ ЗДЕСЬ: Если GSAP закрепил секцию, он обернул её в .pin-spacer.
        // Сама секция стала fixed, поэтому мы измеряем позицию её обертки.
        // Если обертки нет (на мобилках или других блоках), измеряем саму секцию.
        const pinSpacer = target.closest('.pin-spacer');
        const measureElement = pinSpacer ? pinSpacer : target;

        // Получаем точную абсолютную позицию элемента от самого верха страницы
        const absoluteTop = measureElement.getBoundingClientRect().top + window.scrollY;

        // Базовый отступ
        let extraOffset = targetId === "about" ? 120 : 0;

        // Дополнительный скролл для GSAP-секции (только на десктопах)
        if (targetId === "featured" && window.innerWidth >= 1024) {
            extraOffset += window.innerWidth * 0.7;
        }

        // Итоговая точка скролла: всегда одинаковая, сколько бы раз ни кликали
        const finalScrollTarget = absoluteTop - HEADER_OFFSET + extraOffset;

        window.scrollTo({
            top: finalScrollTarget,
            behavior: "smooth"
        });

        setIsMenuOpen(false);
    };

    return (
        <header className="fixed left-0 right-0 top-0 z-50">
            <div className="absolute inset-0 border-b border-white/10 bg-black/45 backdrop-blur-md" />

            <div className="relative flex h-[76px] items-center justify-between px-5 sm:px-6 md:h-[88px] md:px-8 xl:px-20">
                <a
                    href="#home"
                    onClick={(event) => handleNavClick(event, "home")}
                    className="text-lg tracking-[0.24em] text-white sm:text-xl"
                    aria-label="ITOMER Home"
                >
                    ITOMER
                </a>

                <nav className="hidden gap-10 text-sm text-white/70 lg:flex" aria-label="Main navigation">
                    {navItems.map((item) => (
                        <a
                            key={item.id}
                            href={`#${item.id}`}
                            onClick={(event) => handleNavClick(event, item.id)}
                            className="transition hover:text-white"
                        >
                            {item.label}
                        </a>
                    ))}
                </nav>

                <div className="hidden lg:flex items-center gap-6">
                    <div className="flex items-center gap-2 text-white/70">
                        <Globe size={16} aria-hidden="true" />
                        <label htmlFor="language-select-desktop" className="sr-only">
                            Change language
                        </label>
                        <select
                            id="language-select-desktop"
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            className="bg-transparent outline-none cursor-pointer hover:text-white uppercase font-medium text-xs"
                            aria-label="Select Language"
                        >
                            <option value="en" className="bg-[#050506]">EN</option>
                            <option value="ru" className="bg-[#050506]">RU</option>
                            <option value="ar" className="bg-[#050506]">AR</option>
                        </select>
                    </div>

                    <button className="rounded-xl bg-[#dcc19a] px-5 py-2.5 text-sm font-bold text-[#1a1a1a] transition hover:bg-[#e7ccab]">
                        {t("buttons.contact_us")}
                    </button>
                </div>

                <button
                    type="button"
                    onClick={() => setIsMenuOpen((value) => !value)}
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    aria-expanded={isMenuOpen}
                    className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white transition hover:bg-white/[0.08] lg:hidden"
                >
                    {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <div className={`lg:hidden absolute left-0 right-0 top-[76px] border-b border-white/10 bg-[#050506]/95 px-5 py-5 backdrop-blur-xl transition duration-300 ${isMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0 pointer-events-none"}`}>
                <nav className="flex flex-col gap-1">
                    {navItems.map((item) => (
                        <a key={item.id} href={`#${item.id}`} onClick={(event) => handleNavClick(event, item.id)} className="rounded-xl px-4 py-3 text-base text-white/72 transition hover:bg-white/[0.04] hover:text-white">
                            {item.label}
                        </a>
                    ))}
                </nav>
                <div className="mt-5 pt-5 border-t border-white/5 flex flex-col gap-4">
                    <div className="relative">
                        <label htmlFor="language-select-mobile" className="sr-only">
                            Change language
                        </label>
                        <select
                            id="language-select-mobile"
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            className="w-full bg-white/[0.04] text-white rounded-xl px-4 py-3 outline-none appearance-none"
                        >
                            <option value="en" className="bg-[#050506]">English</option>
                            <option value="ru" className="bg-[#050506]">Русский</option>
                            <option value="ar" className="bg-[#050506]">العربية</option>
                        </select>
                    </div>
                    <button onClick={(event) => handleNavClick(event, "contact")} className="w-full rounded-xl bg-[#dcc19a] px-5 py-3 text-sm font-bold text-[#1a1a1a]">
                        {t("buttons.contact_us")}
                    </button>
                </div>
            </div>
        </header>
    );
}

export default Header;