import { useState } from "react";
import { Menu, X } from "lucide-react";

const HEADER_OFFSET = 88;

const navItems = [
    { label: "Home", id: "home" },
    { label: "About Us", id: "about" },
    { label: "Services", id: "services" },
    { label: "Featured Cars", id: "featured" },
    { label: "Contact", id: "contact" },
];

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleNavClick = (event, targetId) => {
        event.preventDefault();

        const target = document.getElementById(targetId);

        if (!target) {
            return;
        }

        const extraOffset = targetId === "about" ? 120 : 0;

        const targetTop =
            target.getBoundingClientRect().top +
            window.scrollY -
            HEADER_OFFSET +
            extraOffset;

        window.scrollTo({
            top: targetTop,
            behavior: "smooth",
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
                >
                    ITOMER
                </a>

                <nav className="hidden gap-10 text-sm text-white/70 lg:flex">
                    {navItems.map((item) => (
                        <a
                            key={item.id}
                            href={`#${item.id}`}
                            onClick={(event) => handleNavClick(event, item.id)}
                            className={
                                item.id === "home"
                                    ? "border-b border-[#d6b27a] pb-1 text-white"
                                    : "transition hover:text-white"
                            }
                        >
                            {item.label}
                        </a>
                    ))}
                </nav>

                <button className="hidden rounded-xl bg-[#dcc19a] px-4 py-2.5 text-sm text-[#2a2118] transition hover:bg-[#e7ccab] sm:px-5 sm:py-3 lg:block">
                    Contact Us
                </button>

                <button
                    type="button"
                    onClick={() => setIsMenuOpen((value) => !value)}
                    className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white transition hover:bg-white/[0.08] lg:hidden"
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    aria-expanded={isMenuOpen}
                >
                    {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
            </div>

            <div
                className={`
                    lg:hidden
                    absolute left-0 right-0 top-[76px]
                    border-b border-white/10 bg-[#050506]/95 px-5 py-5 backdrop-blur-xl
                    transition duration-300 md:top-[88px] md:px-8
                    ${
                    isMenuOpen
                        ? "pointer-events-auto translate-y-0 opacity-100"
                        : "pointer-events-none -translate-y-4 opacity-0"
                }
                `}
            >
                <nav className="flex flex-col gap-1">
                    {navItems.map((item) => (
                        <a
                            key={item.id}
                            href={`#${item.id}`}
                            onClick={(event) => handleNavClick(event, item.id)}
                            className="rounded-xl px-4 py-3 text-base text-white/72 transition hover:bg-white/[0.04] hover:text-white"
                        >
                            {item.label}
                        </a>
                    ))}
                </nav>

                <button
                    type="button"
                    onClick={(event) => handleNavClick(event, "contact")}
                    className="mt-5 w-full rounded-xl bg-[#dcc19a] px-5 py-3 text-sm font-medium text-[#2a2118] transition hover:bg-[#e7ccab]"
                >
                    Contact Us
                </button>
            </div>
        </header>
    );
}

export default Header;