import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslation from './locales/en/translation.json';
import trTranslation from './locales/tr/translation.json';

const resources = {
  en: { translation: enTranslation },
  tr: { translation: trTranslation },
};

const initI18n = async () => {
  let language = await AsyncStorage.getItem('language');
  if (!language) {
    language = Localization.locale;
  }

  i18n.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    resources,
    lng: language || 'tr',
    fallbackLng: 'tr',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });
};

initI18n();

export default i18n;
