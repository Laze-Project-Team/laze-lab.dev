/**
 * @type {import('next-i18next').UserConfig}
 */

module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ja'],
  },
  localePath: './src/locales/',
  returnNull: false,

  // reload locale file while "yarn dev"
  reloadOnPrerender: true,
};
