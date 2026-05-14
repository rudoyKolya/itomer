import { useEffect } from "react";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function SmoothScroll({ children }) {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.1,
            smoothWheel: true,
            wheelMultiplier: 0.9,
            touchMultiplier: 1.2,
        });

        lenis.on("scroll", ScrollTrigger.update);

        let rafId;

        const raf = (time) => {
            lenis.raf(time);
            rafId = requestAnimationFrame(raf);
        };

        rafId = requestAnimationFrame(raf);

        ScrollTrigger.refresh();

        return () => {
            if (rafId) {
                cancelAnimationFrame(rafId);
            }

            lenis.off("scroll", ScrollTrigger.update);
            lenis.destroy();
        };
    }, []);

    return children;
}

export default SmoothScroll;