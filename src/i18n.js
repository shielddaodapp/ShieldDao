import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import zh from "./locales/zh.json";
import en from "./locales/en.json";

// 此处决定采用sessionStorage来记录当前语言版本
const changeLange = () => {
    const lang = sessionStorage.getItem("lang");

    if (!lang) {
        sessionStorage.setItem("lang", "en");
        return "en";
    }

    return lang;
};

const resources = {
    en: {
        translation: en,
    },
    zh: {
        translation: zh,
    },
};

i18n.use(initReactI18next).init({
    resources,
    lng: changeLange(),
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
