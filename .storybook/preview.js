import { useEffect, Suspense } from 'react';
import { I18nextProvider } from 'react-i18next';

import i18n from './i18n';
import { MyApp } from '../src/pages/_app';

const withI18next = (Story, { globals: { locale } }) => {
  // When the locale global changes
  // Set the new locale in i18n
  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [locale]);

  return (
    <Suspense fallback={<div>loading translations...</div>}>
      <I18nextProvider i18n={i18n}>
        <Story />
      </I18nextProvider>
    </Suspense>
  );
};

const withMyApp = (Story, { globals: { theme } }) => {
  if (!['light', 'dark'].includes(theme)) {
    throw new Error(`"${theme}" is not valid as PaletteMode`);
  }

  return <MyApp Component={Story} preferTheme={theme} />;
};

export const decorators = [withI18next, withMyApp];

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const globalTypes = {
  locale: {
    name: 'Locale',
    description: 'Internationalization locale',
    defaultValue: 'en',
    toolbar: {
      icon: 'globe',
      items: [
        { value: 'en', right: '🇺🇸', title: 'English' },
        { value: 'ja', right: 'jp', title: 'Japanese' },
      ],
    },
  },
  theme: {
    name: 'Theme',
    description: 'Color Theme',
    defaultValue: 'light',
    toolbar: {
      icon: 'flag',
      items: [
        { value: 'dark', title: 'Dark' },
        { value: 'light', title: 'Light' },
      ],
    },
  },
};
