const HEADER_OFFSET = 88;

function Header() {
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
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50">
            <div className="absolute inset-0 border-b border-white/10 bg-black/45 backdrop-blur-md" />

            <div className="relative flex h-[76px] items-center justify-between px-5 sm:px-6 md:h-[88px] md:px-8 xl:px-20">
                <div className="text-lg tracking-[0.24em] text-white sm:text-xl">
                    ITOMER
                </div>

                <nav className="hidden gap-10 text-sm text-white/70 lg:flex">
                    <a href="#home" onClick={(event) => handleNavClick(event, "home")} className="border-b border-[#d6b27a] pb-1 text-white">
                        Home
                    </a>
                    <a href="#about" onClick={(event) => handleNavClick(event, "about")} className="hover:text-white">
                        About Us
                    </a>
                    <a href="#services" onClick={(event) => handleNavClick(event, "services")} className="hover:text-white">
                        Services
                    </a>
                    <a href="#featured" onClick={(event) => handleNavClick(event, "featured")} className="hover:text-white">
                        Featured Cars
                    </a>
                    <a href="#contact" onClick={(event) => handleNavClick(event, "contact")} className="hover:text-white">
                        Contact
                    </a>
                </nav>

                <button className="rounded-xl bg-[#dcc19a] px-4 py-2.5 text-sm text-[#2a2118] hover:bg-[#e7ccab] sm:px-5 sm:py-3">
                    Contact Us
                </button>
            </div>
        </header>
    );
}

export default Header;