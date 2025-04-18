"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import LanguageSwitcher from '@/components/LanguageSwitcher';

// Dictionary tipi tanımı
interface Dictionary {
  header?: {
    welcome?: string;
    nav?: {
      home?: string;
      villas?: string;
      regions?: string;
      about?: string;
      contact?: string;
    };
    languages?: {
      tr?: string;
      en?: string;
      ar?: string;
      es?: string;
      no?: string;
      sv?: string;
      nl?: string;
      it?: string;
      fr?: string;
      ru?: string;
      de?: string;
    };
    languageSelection?: string;
    mobileMenu?: {
      openMenu?: string;
      closeMenu?: string;
    };
  };
  [key: string]: unknown; // Diğer özellikler için esnek yapı
}

// Props tipini tanımlıyoruz
type HeaderComponentProps = {
  locale: string;
  dictionary: Dictionary;
};

const HeaderComponent = ({ locale, dictionary }: HeaderComponentProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Güvenli bir şekilde header özelliklerine erişim
  const villasText = dictionary.header?.nav?.villas || 'Villas';
  const regionsText = dictionary.header?.nav?.regions || 'Regions';
  const aboutText = dictionary.header?.nav?.about || 'About Us';
  const contactText = dictionary.header?.nav?.contact || 'Contact';
  const languageSelectionText = dictionary.header?.languageSelection || 'Language Selection';
  const openMenuText = dictionary.header?.mobileMenu?.openMenu || 'Open Menu';
  const closeMenuText = dictionary.header?.mobileMenu?.closeMenu || 'Close Menu';

  // ESC tuşu kontrolü
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <header className="bg-white border-b border-border py-2">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href={`/${locale}`} className="relative z-10 group transition-all duration-300 flex items-center">
            <div className="h-12 md:h-16 w-auto relative flex items-center justify-center">
              <Image
                src="/logo-siyah.svg"
                alt="Inn Elegance"
                width={150}
                height={45}
                className="transition-all duration-300 group-hover:scale-105"
                style={{ width: 'auto', height: 'auto', maxWidth: '150px' }}
                priority
              />
            </div>
          </Link>

          {/* Masaüstü Navigasyon */}
          <nav className="hidden md:flex items-center space-x-6">
            {/* Menü Linkleri */}
            <Link 
              href={`/${locale}/villa-kiralama`}
              className="relative transition-colors text-foreground hover:text-accent group text-sm font-medium"
            >
              {villasText}
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-current transition-all duration-300 ${
                pathname?.includes('/villa-kiralama') ? 'w-full' : 'w-0 group-hover:w-full'
              }`} />
            </Link>
            <Link 
              href={`/${locale}/bolgeler`}
              className="relative transition-colors text-foreground hover:text-accent group text-sm font-medium"
            >
              {regionsText}
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-current transition-all duration-300 ${
                pathname?.includes('/bolgeler') ? 'w-full' : 'w-0 group-hover:w-full'
              }`} />
            </Link>
            <Link 
              href={`/${locale}/hakkinda`}
              className="relative transition-colors text-foreground hover:text-accent group text-sm font-medium"
            >
              {aboutText}
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-current transition-all duration-300 ${
                pathname?.includes('/hakkinda') ? 'w-full' : 'w-0 group-hover:w-full'
              }`} />
            </Link>
            <Link 
              href={`/${locale}/iletisim`}
              className="relative transition-colors text-foreground hover:text-accent group text-sm font-medium"
            >
              {contactText}
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-current transition-all duration-300 ${
                pathname?.includes('/iletisim') ? 'w-full' : 'w-0 group-hover:w-full'
              }`} />
            </Link>

            {/* Dil Seçimi */}
            <LanguageSwitcher 
              currentLocale={locale} 
              variant="dropdown" 
              dictionary={dictionary}
            />
          </nav>

          {/* Mobil Menü Butonu */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-md"
            aria-label={isMobileMenuOpen ? closeMenuText : openMenuText}
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 text-foreground transition-transform duration-300 active:rotate-90" />
            ) : (
              <Menu className="w-5 h-5 text-foreground transition-transform duration-300 active:rotate-180" />
            )}
          </button>
        </div>
      </div>

      {/* Mobil Menü */}
      <div 
        className={`md:hidden bg-white w-full shadow-md overflow-hidden transition-all duration-300 ${
          isMobileMenuOpen ? 'max-h-[500px]' : 'max-h-0'
        }`}
      >
        <div className="container mx-auto py-4 px-4">
          <nav className="flex flex-col space-y-3">
            <Link
              href={`/${locale}/villa-kiralama`}
              className="text-base font-medium px-3 py-2.5 rounded-md transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {villasText}
            </Link>
            <Link
              href={`/${locale}/bolgeler`}
              className="text-base font-medium px-3 py-2.5 rounded-md transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {regionsText}
            </Link>
            <Link
              href={`/${locale}/hakkinda`}
              className="text-base font-medium px-3 py-2.5 rounded-md transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {aboutText}
            </Link>
            <Link
              href={`/${locale}/iletisim`}
              className="text-base font-medium px-3 py-2.5 rounded-md transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {contactText}
            </Link>

            <div className="pt-4 mt-1 border-t border-border">
              <div className="flex flex-col space-y-3">
                <div className="font-medium text-sm text-muted-foreground">{languageSelectionText}</div>
                <LanguageSwitcher 
                  currentLocale={locale} 
                  variant="minimal" 
                  className="flex flex-wrap gap-2"
                  showFullNames={true}
                  dictionary={dictionary}
                />
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default HeaderComponent;