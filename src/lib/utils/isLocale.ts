export const locales = ['ja', 'en'] as const;
export type localeId = (typeof locales)[number];

export const isLocale = (locale: unknown): locale is localeId => {
  if (typeof locale !== 'string') return false;

  return locales.includes(locale as localeId);
};
