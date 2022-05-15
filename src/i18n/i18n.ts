import i18n from "i18next"
import { initReactI18next } from "react-i18next"

// import LanguageDetector from 'i18next-browser-languagedetector';
import enJSON from "./translations/en"
import kmJSON from "./translations/km"

const resources = {
  en: { translation: enJSON },
  km: { translation: kmJSON },
}

i18n
  // .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    keySeparator: false,
    lng: "en",
    fallbackLng: "en",
    react: {
      useSuspense: true,
    },
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
