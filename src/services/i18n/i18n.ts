
import i18next, { i18n as i18nInstance } from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { languages } from "./constants";
import { pt, en } from "./translations";
import moment from 'moment';

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
      interpolation: {
        format: function (value, format, lng) {          
          if (value instanceof Date) {
            console.log("AQUI:")
            console.log(value)
            return moment(value.setDate(value.getDate() + 1)).format(format);  
          }
          if (typeof value === "number") return new Intl.NumberFormat().format(value);
          return value;
        }
      }
    });

  return i18n;
};

export const i18n = createI18n(languages.en);
