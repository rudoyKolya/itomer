import { useEffect, useState } from "react";

import ar from "../locales/ar";
import be from "../locales/be";
import cs from "../locales/cs";
import de from "../locales/de";
import en from "../locales/en";
import es from "../locales/es";
import fr from "../locales/fr";
import it from "../locales/it";
import pl from "../locales/pl";
import uk from "../locales/uk";

import { LanguageContext } from "./LanguageContext.js";

const translations = { cs, en, ar, de, fr, pl, es, it, be, uk };
const validLanguages = Object.keys(translations);

export function LanguageProvider({ children }) {
    const [language, setLanguage] = useState(() => {
        const savedLanguage = localStorage.getItem("app_language");

        return validLanguages.includes(savedLanguage) ? savedLanguage : "cs";
    });

    useEffect(() => {
        localStorage.setItem("app_language", language);

        const isRtl = language === "ar";

        document.documentElement.dir = isRtl ? "rtl" : "ltr";
        document.documentElement.lang = language;
    }, [language]);

    const t = (path) => {
        const keys = path.split(".");
        let result = translations[language];

        for (const key of keys) {
            if (result && result[key]) {
                result = result[key];
            } else {
                return path;
            }
        }

        return result;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}