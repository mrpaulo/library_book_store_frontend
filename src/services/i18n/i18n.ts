
import i18next, { i18n as i18nInstance } from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { languages } from "./constants";
import { pt, en } from "./translations";

const createI18n = (language: string): i18nInstance => {
  const i18n = i18next.createInstance().use(initReactI18next);

  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      lng: language,
      fallbackLng: language,
      resources: {
        en: {
          translation: en
        },
        pt: {
          translation: pt
        }
      },
    });

  return i18n;
};

export const i18n = createI18n(languages.en);