function SectionTitle({ title, description, dark = false, centered = false }) {
    return (
        <div className={centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
            <h2
                className={`font-serif text-4xl leading-tight md:text-6xl ${
                    dark ? "text-white" : "text-[#2d2621]"
                }`}
            >
                {title}
            </h2>

            {description ? (
                <p
                    className={`mt-6 max-w-2xl text-base leading-8 ${
                        dark ? "text-white/70" : "text-[#6d655d]"
                    } ${centered ? "mx-auto" : ""}`}
                >
                    {description}
                </p>
            ) : null}
        </div>
    );
}

export default SectionTitle;