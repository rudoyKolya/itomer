import { useEffect, useRef } from "react";
import { gsap } from "gsap";

function CustomCursor() {
    const cursorRef = useRef(null);
    const followerRef = useRef(null);

    useEffect(() => {
        const mq = window.matchMedia("(max-width: 1024px)");
        if (mq.matches) return;

        const cursor = cursorRef.current;
        const follower = followerRef.current;

        gsap.set([cursor, follower], { xPercent: -50, yPercent: -50, opacity: 0 });

        const xTo = gsap.quickTo(follower, "x", { duration: 0.6, ease: "power3" });
        const yTo = gsap.quickTo(follower, "y", { duration: 0.6, ease: "power3" });

        let isVisible = false;

        const handleMqChange = (e) => {
            if (e.matches) {
                gsap.set([cursor, follower], { opacity: 0 });
                isVisible = false;
            }
        };
        mq.addEventListener("change", handleMqChange);

        const onMouseMove = (e) => {
            // Показываем курсор при первом движении
            if (!isVisible) {
                gsap.to([cursor, follower], { opacity: 1, duration: 0.3 });
                isVisible = true;
            }
            // Точка следует мгновенно
            gsap.set(cursor, { x: e.clientX, y: e.clientY });
            // Кольцо следует плавно
            xTo(e.clientX);
            yTo(e.clientY);
        };

        // --- СОСТОЯНИЯ (фиксированные цвета, никакой инверсии) ---

        // 1. Обычное состояние
        const setIdleState = () => {
            gsap.to(follower, {
                width: 30, height: 30, borderRadius: "50%",
                backgroundColor: "transparent", borderWidth: "1.5px",
                borderColor: "#dcc19a",
                boxShadow: "0 0 0 1px rgba(0,0,0,0.25)",
                duration: 0.3,
            });
            gsap.to(cursor, {
                opacity: 1, scale: 1, width: 7, height: 7,
                backgroundColor: "#dcc19a",
                boxShadow: "0 0 0 1.5px rgba(0,0,0,0.35)",
                duration: 0.3,
            });
        };

        // 2. Hover на кнопки/ссылки
        const setHoverState = () => {
            gsap.to(follower, {
                width: 50, height: 50, borderRadius: "50%",
                backgroundColor: "rgba(220,193,154,0.18)", borderColor: "#dcc19a",
                borderWidth: "1.5px",
                boxShadow: "0 0 0 1px rgba(0,0,0,0.2)",
                duration: 0.3,
            });
            gsap.to(cursor, { scale: 0.8, backgroundColor: "#dcc19a", duration: 0.3 });
        };

        // 3. Текстовое поле
        const setTextState = () => {
            gsap.to(follower, {
                width: 3, height: 28, borderRadius: "2px",
                backgroundColor: "#dcc19a", borderWidth: "0px",
                boxShadow: "0 0 0 1px rgba(0,0,0,0.3)",
                duration: 0.3,
            });
            gsap.to(cursor, { opacity: 0, duration: 0.1 });
        };

        const handleMouseOver = (e) => {
            const target = e.target;
            if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
                setTextState();
            } else if (target.closest('a, button, select, .cursor-pointer, [role="button"]')) {
                setHoverState();
            } else {
                setIdleState();
            }
        };

        // Обработка ухода/прихода в окно браузера
        const handleMouseLeave = () => {
            gsap.to([cursor, follower], { opacity: 0, duration: 0.3 });
        };

        const handleMouseEnter = () => {
            // Показываем только если страница уже получила `mousemove`
            if (isVisible) {
                gsap.to([cursor, follower], { opacity: 1, duration: 0.3 });
            }
        };

        window.addEventListener("mousemove", onMouseMove);
        // Вешаем глобальные слушатели на `document` (window), чтобы ловить наведение везде
        document.addEventListener("mouseover", handleMouseOver);
        document.addEventListener("mouseleave", handleMouseLeave);
        document.addEventListener("mouseenter", handleMouseEnter);

        return () => {
            mq.removeEventListener("change", handleMqChange);
            window.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseover", handleMouseOver);
            document.removeEventListener("mouseleave", handleMouseLeave);
            document.removeEventListener("mouseenter", handleMouseEnter);
        };
    }, []);

    return (
        <>
            {/* Я убрал статические CSS классы размытия и цвета, всё управляется JS */}
            <div
                ref={cursorRef}
                style={{ zIndex: 1000000 }} // Экстремальный z-index, чтобы быть выше порталов
                className="fixed top-0 left-0 rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2"
            />
            <div
                ref={followerRef}
                style={{ zIndex: 999999 }}
                className="fixed top-0 left-0 border border-[#dcc19a] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2"
            />
        </>
    );
}

export default CustomCursor;