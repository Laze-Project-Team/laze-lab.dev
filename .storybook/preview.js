import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import { MyApp } from '../src/pages/_app';

export const decorators = [
  (Story) => (
    <I18nextProvider i18n={i18n}>
      <MyApp Component={Story}></MyApp>
    </I18nextProvider>
  ),
];

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
