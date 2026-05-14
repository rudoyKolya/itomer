import { useCallback, useEffect, useMemo, useState } from "react";

import ar from "../locales/ar";
import cs from "../locales/cs";
import de from "../locales/de";
import en from "../locales/en";
import es from "../locales/es";
import fr from "../locales/fr";
import it from "../locales/it";
import nl from "../locales/nl";
import pl from "../locales/pl";
import pt from "../locales/pt";
import tr from "../locales/tr";

import { LanguageContext } from "./LanguageContext.js";

const translations = { cs, en, ar, de, fr, pl, es, it, pt, tr, nl };
const validLanguages = Object.keys(translations);

export function LanguageProvider({ children }) {
    const [language, setLanguage] = useState(() => {
        const savedLanguage = localStorage.getItem("app_language");

        return validLanguages.includes(savedLanguage) ? savedLanguage : "cs";
    });

    useEffect(() => {
        if (!validLanguages.includes(language)) {
            setLanguage("cs");
            return;
        }

        localStorage.setItem("app_language", language);

        const isRtl = language === "ar";

        document.documentElement.dir = isRtl ? "rtl" : "ltr";
        document.documentElement.lang = language;
    }, [language]);

    const t = useCallback((path) => {
        const keys = path.split(".");
        let result = translations[language];

        for (const key of keys) {
            if (result && result[key] !== undefined) {
                result = result[key];
            } else {
                return path;
            }
        }

        return result;
    }, [language]);

    const contextValue = useMemo(
        () => ({ language, setLanguage, t }),
        [language, t]
    );

    return (
        <LanguageContext.Provider value={contextValue}>
            {children}
        </LanguageContext.Provider>
    );
}
