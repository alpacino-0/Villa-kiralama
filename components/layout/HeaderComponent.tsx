"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Building2, Info, Mail, ChevronDown, Globe } from 'lucide-react';
import { usePathname } from 'next/navigation';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { MapIcon } from 'lucide-react';
import { locales, addLocaleToPath, type Locale } from '@/app/i18n-client';

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
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const langDropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Güvenli bir şekilde header özelliklerine erişim
  const villasText = dictionary.header?.nav?.villas || 'Villas';
  const regionsText = dictionary.header?.nav?.regions || 'Regions';
  const aboutText = dictionary.header?.nav?.about || 'About Us';
  const contactText = dictionary.header?.nav?.contact || 'Contact';
  const languageSelectionText = dictionary.header?.languageSelection || 'Language Selection';
  const openMenuText = dictionary.header?.mobileMenu?.openMenu || 'Open Menu';
  const closeMenuText = dictionary.header?.mobileMenu?.closeMenu || 'Close Menu';

  // Menü öğeleri
  const menuItems = [
    { id: 'villas', text: villasText, href: '/villa-kiralama', icon: Building2, active: pathname?.includes('/villa-kiralama') },
    { id: 'regions', text: regionsText, href: '/bolgeler', icon: MapIcon, active: pathname?.includes('/bolgeler') },
    { id: 'about', text: aboutText, href: '/hakkinda', icon: Info, active: pathname?.includes('/hakkinda') },
    { id: 'contact', text: contactText, href: '/iletisim', icon: Mail, active: pathname?.includes('/iletisim') },
  ];

  // Scroll durumunu kontrol et
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Başlangıçta kontrol et

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ESC tuşu kontrolü ve doküman tıklama olayları
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
        setIsLangDropdownOpen(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      // Headerın dışına tıklandığında mobil menüyü kapat
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setIsMobileMenuOpen(false);
      }
      
      // Dil dropdown menüsünün dışına tıklandığında kapat
      if (langDropdownRef.current && !langDropdownRef.current.contains(e.target as Node)) {
        setIsLangDropdownOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Vücut scroll kilidi
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Dil dropdown toggle
  const toggleLangDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLangDropdownOpen(prev => !prev);
  };

  // Dil adını varsayılan olarak getiren yardımcı fonksiyon
  const getDefaultLanguageName = (code: string): string => {
    const languageNames: Record<string, string> = {
      tr: 'Türkçe',
      en: 'English',
      ru: 'Русский',
      de: 'Deutsch'
    };
    
    return languageNames[code] || code.toUpperCase();
  };

  // Desteklenen dil kodlarını i18n-client'tan alıyoruz
  const supportedLocales = locales.map(code => {
    return {
      code,
      name: dictionary.header?.languages && 
            code in (dictionary.header.languages as Record<string, string>) 
            ? dictionary.header.languages[code as keyof typeof dictionary.header.languages] 
            : getDefaultLanguageName(code)
    };
  });

  // Mevcut yoldan dil kodunu kaldırır ve yeni dil kodunu ekler
  // i18n-client.ts'deki addLocaleToPath fonksiyonunu kullanıyoruz
  const switchLocale = (newLocale: string) => {
    if (!pathname) return `/${newLocale}`;
    
    // i18n-client içindeki addLocaleToPath fonksiyonunu kullanarak URL oluştur
    return addLocaleToPath(pathname.replace(new RegExp(`^/${locale}`), '') || '/', newLocale as Locale);
  };

  return (
    <header 
      ref={headerRef}
      className={`sticky top-0 z-50 bg-background border-b border-border transition-all duration-300
                 ${isScrolled ? 'shadow-md py-1 backdrop-blur-sm bg-background/95' : 'py-2'}`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            href={`/${locale}`} 
            className="relative z-10 group transition-all duration-300 flex items-center"
            aria-label="Ana Sayfa"
          >
            <div className="h-10 md:h-14 w-auto relative flex items-center justify-center">
              <Image
                src="/logo-siyah.svg"
                alt="Inn Elegance"
                width={150}
                height={45}
                className={`transition-all duration-300 transform ${isScrolled ? 'scale-95' : 'group-hover:scale-105'}`}
                style={{ width: 'auto', height: 'auto', maxWidth: isScrolled ? '130px' : '150px' }}
                priority
              />
            </div>
          </Link>

          {/* Masaüstü Navigasyon */}
          <nav className="hidden md:flex items-center space-x-6">
            {/* Menü Linkleri */}
            {menuItems.map((item) => (
              <Link 
                key={item.id}
                href={`/${locale}${item.href}`}
                className={`relative transition-all duration-300 group text-sm font-medium
                          hover:text-accent ${item.active ? 'text-accent' : 'text-foreground'}`}
              >
                {item.text}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-current transition-all duration-300 
                                ${item.active ? 'w-full' : 'w-0 group-hover:w-full'}`} />
              </Link>
            ))}

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
            className="md:hidden p-2 rounded-md hover:bg-muted transition-colors duration-300 active:scale-95"
            aria-label={isMobileMenuOpen ? closeMenuText : openMenuText}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 text-accent transition-transform duration-300 active:rotate-90" />
            ) : (
              <Menu className="w-5 h-5 text-foreground transition-transform duration-300 active:rotate-180" />
            )}
          </button>
        </div>
      </div>

      {/* Mobil Menü */}
      <div 
        className={`absolute top-full left-0 right-0 md:hidden bg-background shadow-md overflow-hidden transition-all duration-300 transform origin-top
                   ${isMobileMenuOpen 
                     ? 'max-h-[80vh] opacity-100 translate-y-0 animate-fade-in-down' 
                     : 'max-h-0 opacity-0 -translate-y-4'}`}
        aria-hidden={!isMobileMenuOpen}
      >
        <div className="container mx-auto py-4 px-4">
          <nav className="flex flex-col space-y-1">
            {menuItems.map((item, index) => (
              <Link
                key={item.id}
                href={`/${locale}${item.href}`}
                className={`flex items-center text-base font-medium px-3 py-3 rounded-lg transition-all duration-200 ease-in-out
                          ${item.active 
                            ? 'bg-muted text-accent' 
                            : 'hover:bg-muted/50 hover:text-accent active:scale-98'}
                          ${isMobileMenuOpen ? `animate-slide-in-right animate-delay-${index * 100}` : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.text}
              </Link>
            ))}

            {/* Yeni Dil Seçimi Dropdown'ı */}
            <div 
              className="mt-4 pt-4 border-t border-border"
              style={{ animationDelay: `${menuItems.length * 50 + 50}ms` }}
            >
              <div className="relative" ref={langDropdownRef}>
                {/* Dil Seçimi Başlığı ve Dropdown Butonu */}
                <button
                  type="button"
                  onClick={toggleLangDropdown}
                  className={`w-full flex items-center justify-between px-3 py-3 rounded-lg transition-all duration-200 
                             text-base font-medium ${isMobileMenuOpen ? 'animate-slide-in-right animate-delay-500' : ''}
                             ${isLangDropdownOpen ? 'bg-muted text-accent' : 'hover:bg-muted/50'}`}
                  aria-expanded={isLangDropdownOpen}
                  aria-haspopup="true"
                >
                  <div className="flex items-center">
                    <Globe className="w-5 h-5 mr-3 text-accent" />
                    <span className="font-medium">{languageSelectionText}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2 font-semibold uppercase bg-accent/10 text-accent px-2 py-0.5 rounded text-xs">
                      {locale}
                    </span>
                    <ChevronDown 
                      className={`h-5 w-5 transition-transform duration-300 ${isLangDropdownOpen ? 'rotate-180 text-accent' : ''}`} 
                    />
                  </div>
                </button>

                {/* Dropdown İçeriği - Özel Tasarlanmış */}
                <div
                  className={`mt-1 rounded-lg overflow-hidden transition-all duration-300 origin-top bg-background/95 backdrop-blur-sm
                             shadow-md border border-border
                             ${isLangDropdownOpen 
                               ? 'max-h-[300px] opacity-100 scale-y-100 animate-fade-in-down' 
                               : 'max-h-0 opacity-0 scale-y-95 pointer-events-none'}`}
                >
                  <div className="py-2 divide-y divide-border/50">
                    {supportedLocales.map((loc) => {
                      const isActive = loc.code === locale;
                      return (
                        <Link
                          key={loc.code}
                          href={switchLocale(loc.code)}
                          className={`flex items-center justify-between px-4 py-2.5 text-sm transition-all
                                   ${isActive 
                                     ? 'bg-accent/10 text-accent font-medium' 
                                     : 'text-foreground hover:bg-accent hover:text-white'}`}
                          onClick={() => {
                            setIsLangDropdownOpen(false);
                            setIsMobileMenuOpen(false);
                          }}
                        >
                          <div className="flex items-center">
                            <span className="font-medium">{loc.name}</span>
                          </div>
                          {isActive && (
                            <span className="flex h-2 w-2 rounded-full bg-accent" />
                          )}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default HeaderComponent;