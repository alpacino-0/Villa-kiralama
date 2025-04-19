'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { locales, type Locale, addLocaleToPath } from '../app/i18n-client';
import { Button } from '@/components/ui/button';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

// Dictionary tipini tanımlıyoruz
interface DictionaryType {
  header?: {
    languages?: Record<string, string>;
    languageSelection?: string;
  };
}

interface LanguageSwitcherProps {
  currentLocale: string;
  variant?: 'dropdown' | 'buttons' | 'minimal';
  className?: string;
  showFullNames?: boolean;
  dictionary?: DictionaryType;
}

// Dil adlarını tanımlayan obje - varsayılan değerler olarak kullanılır
const languageNames: Record<string, string> = {
  tr: 'Türkçe',
  en: 'English',
  ru: 'Русский',
  de: 'Deutsch'
};

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ 
  currentLocale, 
  variant = 'dropdown',
  className,
  showFullNames = false,
  dictionary
}) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Yalnızca baştaki dil kodunu kaldırır
  const pathWithoutLocale = pathname.replace(new RegExp(`^/${currentLocale}`), '') || '/';

  // Menü dışına tıklandığında dropdown'ı kapat
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // ESC tuşuyla dropdown'ı kapat
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Dil adını getirme fonksiyonu
  const getLanguageName = (locale: string): string => {
    // Eğer dictionary varsa ve dil adları tanımlıysa onları kullan
    if (dictionary?.header?.languages?.[locale]) {
      return dictionary.header.languages[locale];
    }
    
    // Aksi halde varsayılan değerleri kullan
    return languageNames[locale] || locale.toUpperCase();
  };

  // Dil değiştirme düğmesi etiketi
  const languageSelectionLabel = dictionary?.header?.languageSelection || 'Language Selection';

  // Dropdown stili
  if (variant === 'dropdown') {
    return (
      <div className={cn("relative", className)} ref={dropdownRef}>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1 text-foreground group hover:bg-accent hover:text-white transition-colors"
          aria-label={languageSelectionLabel}
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          <Globe className="h-4 w-4 mr-1 group-hover:text-white" />
          <span className="uppercase">{currentLocale}</span>
          <ChevronDown 
            className="h-4 w-4 ml-1 transition-transform duration-300" 
            style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0)' }} 
          />
        </Button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-card rounded-md shadow-lg overflow-hidden z-20 animate-in slide-in-from-top-3 fade-in-20 border border-border">
            <div className="py-1 max-h-80 overflow-y-auto">
              {locales.map((locale: Locale) => {
                const isActive = currentLocale === locale;
                const localizedPath = addLocaleToPath(pathWithoutLocale, locale);

                return (
                  <Link
                    key={locale}
                    href={localizedPath}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center justify-between px-4 py-2 text-sm transition-colors",
                      isActive 
                        ? "bg-accent/10 text-accent font-medium" 
                        : "text-card-foreground hover:bg-accent hover:text-white"
                    )}
                  >
                    {getLanguageName(locale)}
                    {isActive && <Check className="h-4 w-4" />}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Buton stili
  if (variant === 'buttons') {
    return (
      <div className={cn("flex flex-wrap gap-2", className)}>
        {locales.map((locale: Locale) => {
          const isActive = currentLocale === locale;
          const localizedPath = addLocaleToPath(pathWithoutLocale, locale);

          return (
            <Button
              key={locale}
              variant={isActive ? "default" : "outline"}
              size="sm"
              asChild
              className={cn(
                "transition-colors",
                isActive 
                  ? "bg-accent text-accent-foreground hover:bg-accent/90" 
                  : "hover:bg-accent hover:text-white"
              )}
            >
              <Link href={localizedPath}>
                {showFullNames ? getLanguageName(locale) : locale.toUpperCase()}
              </Link>
            </Button>
          );
        })}
      </div>
    );
  }

  // Minimal stil - Mobil için iyileştirilmiş
  return (
    <div className={cn("flex flex-wrap gap-1.5 md:gap-2", className)}>
      {locales.map((locale: Locale) => {
        const isActive = currentLocale === locale;
        const localizedPath = addLocaleToPath(pathWithoutLocale, locale);

        return isActive ? (
          <span
            key={locale}
            className="px-2 py-1 md:px-3 md:py-1.5 text-xs md:text-sm font-medium bg-accent text-white rounded-md flex items-center justify-center gap-1 transition-colors"
            aria-current="true"
          >
            {showFullNames ? getLanguageName(locale) : locale.toUpperCase()}
            <Check className="h-3 w-3 md:h-3.5 md:w-3.5 text-white" />
          </span>
        ) : (
          <Link
            key={locale}
            href={localizedPath}
            className="px-2 py-1 md:px-3 md:py-1.5 text-xs md:text-sm font-medium text-foreground hover:bg-accent hover:text-white rounded-md transition-colors flex items-center justify-center"
            aria-label={`${languageSelectionLabel}: ${getLanguageName(locale)}`}
          >
            {showFullNames ? getLanguageName(locale) : locale.toUpperCase()}
          </Link>
        );
      })}
    </div>
  );
};

export default LanguageSwitcher;
