'use client';

// Client tarafından erişilebilecek i18n özellikleri
import { locales, defaultLocale, type Locale } from './i18n';

// Geçerli URL yolundan dil kodunu çıkarır
export function getLocaleFromPathname(pathname: string): Locale {
  for (const locale of locales) {
    if (pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`) {
      return locale as Locale;
    }
  }
  return defaultLocale as Locale;
}

// Belirli bir URL'ye dil kodu ekler
export function addLocaleToPath(path: string, locale: Locale): string {
  // Zaten bir dil kodu varsa onu değiştir
  for (const l of locales) {
    if (path.startsWith(`/${l}/`)) {
      return `/${locale}${path.substring(l.length + 1)}`;
    }
    if (path === `/${l}`) {
      return `/${locale}`;
    }
  }
  
  // Dil kodu yoksa ekle
  return `/${locale}${path === '/' ? '' : path}`;
}

// Yardımcı i18n özellikleri
export {
  locales,
  defaultLocale,
  type Locale
}; 