export const i18n = {
  defaultLocale: 'en',
  locales: ['en', 'tr', 'de', 'ru']
};

export type Locale = (typeof i18n)['locales'][number];

// Daha kolay erişim için varsayılan değerleri dışa aktarıyoruz
export const defaultLocale = i18n.defaultLocale;
export const locales = i18n.locales;

// URL'den dil kodunu çıkarmak için yardımcı fonksiyon
export function extractLocaleFromPath(path: string): string {
  for (const locale of locales) {
    if (path.startsWith(`/${locale}/`) || path === `/${locale}`) {
      return locale;
    }
  }
  return defaultLocale;
} 