import { useState, useRef, useEffect, useMemo } from "react";
import { Menu, X, Globe, ChevronDown } from "lucide-react";
import { useLanguage } from "../../context/useLanguage";
import { scrollToSection, scrollToFeaturedStart } from "../../utils/scrollTo";

const LANGUAGES = [
    { code: "cs", label: "Čeština", short: "CZ" },
    { code: "en", label: "English", short: "EN" },
    { code: "de", label: "Deutsch", short: "DE" },
    { code: "fr", label: "Français", short: "FR" },
    { code: "pl", label: "Polski", short: "PL" },
    { code: "es", label: "Español", short: "ES" },
    { code: "it", label: "Italiano", short: "IT" },
    { code: "pt", label: "Português", short: "PT" },
    { code: "tr", label: "Türkçe", short: "TR" },
    { code: "nl", label: "Nederlands", short: "NL" },
    { code: "ar", label: "العربية", short: "AR" },
];

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

    const { language, setLanguage, t } = useLanguage();
    const langMenuRef = useRef(null);

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = "hidden";
            document.documentElement.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
            document.documentElement.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
            document.documentElement.style.overflow = "";
        };
    }, [isMenuOpen]);

    useEffect(() => {
        if (!isLangMenuOpen) return;

        const handleClickOutside = (event) => {
            if (langMenuRef.current && !langMenuRef.current.contains(event.target)) {
                setIsLangMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isLangMenuOpen]);

    const navItems = useMemo(() => [
        { label: t("nav.home"), id: "home" },
        { label: t("nav.about"), id: "about" },
        { label: t("nav.services"), id: "services" },
        { label: t("nav.featured"), id: "featured" },
        { label: t("nav.contact"), id: "contact" },
    ], [t]);

    const handleNavClick = (event, targetId) => {
        event?.preventDefault();

        if (targetId === "featured") {
            scrollToFeaturedStart();
        } else {
            const extraOffset = targetId === "about" ? 120 : 0;
            scrollToSection(targetId, extraOffset);
        }

        setIsMenuOpen(false);
        setIsLangMenuOpen(false);
    };

    return (
        <>
            <header className="fixed left-0 right-0 top-0 z-50 transform-gpu">
                <div className="absolute inset-0 border-b border-white/10 bg-black/45 backdrop-blur-md transform-gpu will-change-transform [backface-visibility:hidden]" />

                <div className="relative flex h-[76px] items-center justify-between px-5 sm:px-6 md:h-[88px] md:px-8 xl:px-20">
                    <a
                        href="#home"
                        onClick={(event) => handleNavClick(event, "home")}
                        className="text-lg tracking-[0.24em] text-white sm:text-xl"
                        aria-label="ITOMER Home"
                    >
                        ITOMER
                    </a>

                    <nav className="hidden gap-2 text-sm text-white/70 lg:flex" aria-label="Main navigation">
                        {navItems.map((item) => (
                            <a
                                key={item.id}
                                href={`#${item.id}`}
                                onClick={(event) => handleNavClick(event, item.id)}
                                className="px-4 py-2 transition hover:text-white"
                            >
                                {item.label}
                            </a>
                        ))}
                    </nav>

                    <div className="hidden items-center gap-6 lg:flex">
                        <div className="relative" ref={langMenuRef}>
                            <button
                                type="button"
                                onClick={() => setIsLangMenuOpen((value) => !value)}
                                className="flex items-center gap-1.5 text-white/70 transition hover:text-white"
                                aria-label="Select Language"
                                aria-expanded={isLangMenuOpen}
                            >
                                <Globe size={16} />
                                <span className="text-xs font-medium uppercase">{language}</span>
                                <ChevronDown
                                    size={14}
                                    className={`transition-transform duration-300 ${
                                        isLangMenuOpen ? "rotate-180" : ""
                                    }`}
                                />
                            </button>

                            <div
                                className={`absolute right-0 top-full mt-4 w-40 origin-top overflow-hidden rounded-xl border border-white/10 bg-[#050506]/95 shadow-2xl backdrop-blur-xl transition-all duration-300 ${
                                    isLangMenuOpen
                                        ? "visible scale-100 opacity-100"
                                        : "invisible scale-95 opacity-0"
                                }`}
                            >
                                <div className="max-h-[60vh] overflow-y-auto py-2 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-track]:bg-transparent">
                                    {LANGUAGES.map((lang) => (
                                        <button
                                            key={lang.code}
                                            type="button"
                                            onClick={() => {
                                                setLanguage(lang.code);
                                                setIsLangMenuOpen(false);
                                            }}
                                            className={`flex w-full items-center px-4 py-2.5 text-sm transition-colors hover:bg-white/10 ${
                                                language === lang.code
                                                    ? "bg-white/5 text-[#dcc19a]"
                                                    : "text-white/70"
                                            }`}
                                        >
                                            {lang.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={(event) => handleNavClick(event, "contact")}
                            className="rounded-xl bg-[#dcc19a] px-5 py-2.5 text-sm font-bold text-[#1a1a1a] transition hover:bg-[#e7ccab]"
                        >
                            {t("buttons.contact_us")}
                        </button>
                    </div>

                    <button
                        type="button"
                        onClick={() => setIsMenuOpen((value) => !value)}
                        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                        aria-expanded={isMenuOpen}
                        className="relative z-50 flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white transition hover:bg-white/[0.08] lg:hidden"
                    >
                        {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </header>

            <div
                className={`fixed inset-0 z-40 flex flex-col bg-[#050506] pt-[76px] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:pt-[88px] lg:hidden ${
                    isMenuOpen ? "visible translate-x-0 opacity-100" : "invisible translate-x-full opacity-0"
                }`}
            >
                <div className="flex flex-1 flex-col overflow-y-auto overscroll-none px-6 py-8">
                    <nav className="flex flex-1 flex-col gap-6">
                        {navItems.map((item) => (
                            <a
                                key={item.id}
                                href={`#${item.id}`}
                                onClick={(event) => handleNavClick(event, item.id)}
                                className="font-serif text-3xl text-white/90 transition-colors active:text-[#dcc19a]"
                            >
                                {item.label}
                            </a>
                        ))}
                    </nav>

                    <div className="mt-8 flex flex-col gap-8 pb-8">
                        <div className="flex flex-wrap justify-center gap-2.5">
                            {LANGUAGES.map((lang) => (
                                <button
                                    key={lang.code}
                                    type="button"
                                    onClick={() => setLanguage(lang.code)}
                                    className={`flex h-[46px] w-[46px] items-center justify-center rounded-xl border text-sm font-bold transition-colors ${
                                        language === lang.code
                                            ? "border-[#dcc19a] bg-[#dcc19a]/10 text-[#dcc19a]"
                                            : "border-white/10 bg-white/[0.04] text-white/50 hover:bg-white/10 hover:text-white"
                                    }`}
                                >
                                    {lang.short}
                                </button>
                            ))}
                        </div>

                        <button
                            type="button"
                            onClick={(event) => handleNavClick(event, "contact")}
                            className="w-full rounded-xl bg-[#dcc19a] px-5 py-4 text-base font-bold text-[#1a1a1a] shadow-lg transition-transform active:scale-[0.98]"
                        >
                            {t("buttons.contact_us")}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Header;