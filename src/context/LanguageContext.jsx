import { createContext, useContext, useState, useEffect } from "react";
import en from "../locales/en";
import ru from "../locales/ru";
import ar from "../locales/ar";

const translations = { en, ru, ar };
const LanguageContext = createContext();

export function LanguageProvider({ children }) {
    const [language, setLanguage] = useState(() => {
        return localStorage.getItem("app_language") || "en";
    });

    useEffect(() => {
        localStorage.setItem("app_language", language);
        const isRtl = language === "ar";
        document.documentElement.dir = isRtl ? "rtl" : "ltr";
        document.documentElement.lang = language;
    }, [language]);

    // Улучшенная функция перевода для вложенных ключей (напр. "hero.title")
    const t = (path) => {
        const keys = path.split(".");
        let result = translations[language];

        for (const key of keys) {
            if (result[key]) {
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

export const useLanguage = () => useContext(LanguageContext);