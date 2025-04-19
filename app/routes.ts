import type { Locale } from './i18n';

type RouteTranslations = Record<Locale, string>;

// Desteklenen sayfalar ve dil bazlı yolları
export const routes = {
  villas: {
    en: 'villas',
    de: 'villen',
    ru: 'виллы',
    tr: 'villalar',
    fr: 'villas',
    it: 'ville',
    nl: 'villas',
    sv: 'villor',
    no: 'villaer',
    es: 'villas',
    ar: 'فيلات',
  } as RouteTranslations,
  about: {
    en: 'about',
    de: 'uber',
    ru: 'о-нас',
    tr: 'hakkinda',
    fr: 'a-propos',
    it: 'chi-siamo',
    nl: 'over-ons',
    sv: 'om-oss',
    no: 'om-oss',
    es: 'sobre-nosotros',
    ar: 'عنا',
  } as RouteTranslations,
  contact: {
    en: 'contact',
    de: 'kontakt',
    ru: 'контакты',
    tr: 'villa-kiralama-iletisim',
    fr: 'contact',
    it: 'contatti',
    nl: 'contact',
    sv: 'kontakt',
    no: 'kontakt',
    es: 'contacto',
    ar: 'اتصل',
  } as RouteTranslations,
} as const;

// Rota tipleri
export type RouteKey = keyof typeof routes;

/**
 * Belirli bir dil için bir rota adı alma
 * @param routeKey Rota anahtarı (örn: "villas")
 * @param locale Dil kodu (örn: "en")
 * @returns Dil için uygun rota adı
 */
export function getRouteByLocale(routeKey: RouteKey, locale: Locale): string {
  // Tip güvenliği için anahtarları kontrol ediyoruz
  const routeObj = routes[routeKey] as RouteTranslations;
  return routeObj[locale] || routeObj.en; // Varsayılan olarak İngilizce
}

/**
 * Bir yoldan hangi rota olduğunu bulma
 * @param path Sayfa yolu (örn: "villas", "villen")
 * @param locale Dil kodu (örn: "en")
 * @returns Rota anahtarı veya null
 */
export function getRouteKeyFromPath(path: string, locale: Locale): RouteKey | null {
  // Type-safe yaklaşım
  for (const routeKey of Object.keys(routes) as RouteKey[]) {
    const routeObj = routes[routeKey] as RouteTranslations;
    if (routeObj[locale] === path) {
      return routeKey;
    }
  }
  return null;
} 