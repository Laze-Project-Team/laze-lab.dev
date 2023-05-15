import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  ja: {
    common: require('../src/locales/ja/common.json'),
    compete: require('../src/locales/ja/compete.json'),
    docs: require('../src/locales/ja/docs.json'),
    editor: require('../src/locales/ja/editor.json'),
    guideline: require('../src/locales/ja/guideline.json'),
    index: require('../src/locales/ja/index.json'),
    layout: require('../src/locales/ja/layout.json'),
    learn: require('../src/locales/ja/learn.json'),
    license: require('../src/locales/ja/license.json'),
    login: require('../src/locales/ja/login.json'),
    privacy: require('../src/locales/ja/privacy.json'),
    profile: require('../src/locales/ja/profile.json'),
    signup_complete: require('../src/locales/ja/signup_complete.json'),
    signup: require('../src/locales/ja/signup.json'),
    terms: require('../src/locales/ja/terms.json'),
    404: require('../src/locales/ja/404.json'),
  },
  en: {
    common: require('../src/locales/en/common.json'),
    compete: require('../src/locales/en/compete.json'),
    docs: require('../src/locales/en/docs.json'),
    editor: require('../src/locales/en/editor.json'),
    guideline: require('../src/locales/en/guideline.json'),
    index: require('../src/locales/en/index.json'),
    layout: require('../src/locales/en/layout.json'),
    learn: require('../src/locales/en/learn.json'),
    license: require('../src/locales/en/license.json'),
    login: require('../src/locales/en/login.json'),
    privacy: require('../src/locales/en/privacy.json'),
    profile: require('../src/locales/en/profile.json'),
    signup_complete: require('../src/locales/en/signup_complete.json'),
    signup: require('../src/locales/en/signup.json'),
    terms: require('../src/locales/en/terms.json'),
    404: require('../src/locales/en/404.json'),
  },
};

i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  supportedLngs: ['en', 'ja'],
  debug: true,
  returnNull: false,
  resources,
});

export default i18n;
