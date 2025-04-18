import type { Locale } from './i18n';
import { locales } from './i18n';

const dictionaries = {
  en: () => import('./dictionaries/en.json').then((module) => module.default),
  tr: () => import('./dictionaries/tr.json').then((module) => module.default),
  de: () => import('./dictionaries/de.json').then((module) => module.default),
  ru: () => import('./dictionaries/ru.json').then((module) => module.default),
  fr: () => import('./dictionaries/fr.json').then((module) => module.default),
  it: () => import('./dictionaries/it.json').then((module) => module.default),
  nl: () => import('./dictionaries/nl.json').then((module) => module.default),
  sv: () => import('./dictionaries/sv.json').then((module) => module.default),
  no: () => import('./dictionaries/no.json').then((module) => module.default),
  es: () => import('./dictionaries/es.json').then((module) => module.default),
  ar: () => import('./dictionaries/ar.json').then((module) => module.default),
};

export const getDictionary = async (locale: string) => {
  // Desteklenen diller için locales array'ini kullan
  // Eğer desteklenmeyen bir dil varsa varsayılan olarak İngilizce kullan
  const selectedLocale = locales.includes(locale as Locale) ? locale : 'en';
  return dictionaries[selectedLocale as keyof typeof dictionaries]();
}; 