"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, Building2, Info, Mail, ChevronDown, Globe, Home } from 'lucide-react';
import { usePathname } from 'next/navigation';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { MapIcon } from 'lucide-react';
import { locales, addLocaleToPath, type Locale } from '@/app/i18n-client';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
  SheetFooter
} from "@/components/ui/sheet";

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
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const langDropdownRef = useRef<HTMLDivElement>(null);
  const langDropdownButtonRef = useRef<HTMLButtonElement>(null);
  const sheetTriggerRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  // Güvenli bir şekilde header özelliklerine erişim
  const homeText = dictionary.header?.nav?.home || 'Home';
  const villasText = dictionary.header?.nav?.villas || 'Villas';
  const regionsText = dictionary.header?.nav?.regions || 'Regions';
  const aboutText = dictionary.header?.nav?.about || 'About Us';
  const contactText = dictionary.header?.nav?.contact || 'Contact';
  const languageSelectionText = dictionary.header?.languageSelection || 'Language Selection';
  const openMenuText = dictionary.header?.mobileMenu?.openMenu || 'Open Menu';

  // Menü öğeleri - React memo içinde değil, bileşen içinde kalsın
  const menuItems = [
    { id: 'home', text: homeText, href: '', icon: Home, active: pathname === `/${locale}` || pathname === `/${locale}/` },
    { id: 'villas', text: villasText, href: '/villa-kiralama', icon: Building2, active: pathname?.includes('/villa-kiralama') },
    { id: 'regions', text: regionsText, href: '/bolgeler', icon: MapIcon, active: pathname?.includes('/bolgeler') },
    { id: 'about', text: aboutText, href: '/villa-kiralama-hakkimizda', icon: Info, active: pathname?.includes('/villa-kiralama-hakkimizda') },
    { id: 'contact', text: contactText, href: '/villa-kiralama-iletisim', icon: Mail, active: pathname?.includes('/villa-kiralama-iletisim') },
  ];

  // Scroll durumunu kontrol et - useCallback ile optimize
  const handleScroll = useCallback(() => {
    if (typeof window !== 'undefined') {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    }
  }, []);

  // Scroll event listener - passive: true ile performans artışı
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll(); // Başlangıçta kontrol et
      
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll]);

  // ESC tuşu kontrolü ve doküman tıklama olayları - useCallback ile optimize
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsLangDropdownOpen(false);
    }
  }, []);

  const handleClickOutside = useCallback((e: MouseEvent) => {      
    // Dil dropdown menüsünün dışına tıklandığında kapat
    if (langDropdownRef.current && 
        !langDropdownRef.current.contains(e.target as Node) && 
        !langDropdownButtonRef.current?.contains(e.target as Node)) {
      setIsLangDropdownOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleKeyDown, handleClickOutside]);

  // Sheet durumu değiştiğinde vücut scroll kilidi
  useEffect(() => {
    // body scroll locking için daha iyi bir yaklaşım
    if (isSheetOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      // Sayfanın kaymasını önle
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = `-${window.scrollY}px`;
    } else {
      // Önceki scroll pozisyonunu geri yükle
      const scrollY = document.body.style.top;
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
      }
    }
    
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
    };
  }, [isSheetOpen]);

  // Sheet açıldığında ilk menü öğesine odak
  useEffect(() => {
    if (isSheetOpen) {
      // İlk menü öğesini bul
      const firstMenuItem = document.querySelector('[data-first-menu-item="true"]') as HTMLElement;
      if (firstMenuItem) {
        setTimeout(() => {
          firstMenuItem.focus();
        }, 100);
      }
    } else {
      // Sheet kapandığında menu butonuna odak
      if (sheetTriggerRef.current) {
        sheetTriggerRef.current.focus();
      }
    }
  }, [isSheetOpen]);

  // Dil dropdown toggle - useCallback ile optimize
  const toggleLangDropdown = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLangDropdownOpen(prev => !prev);
  }, []);

  // Dil adını varsayılan olarak getiren yardımcı fonksiyon
  const getDefaultLanguageName = useCallback((code: string): string => {
    const languageNames: Record<string, string> = {
      tr: 'Türkçe',
      en: 'English',
      ru: 'Русский',
      de: 'Deutsch'
    };
    
    return languageNames[code] || code.toUpperCase();
  }, []);

  // Desteklenen dil kodlarını i18n-client'tan alıyoruz - useMemo kullanabilirdik ama gereksiz
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
  // i18n-client.ts'deki addLocaleToPath fonksiyonunu kullanıyoruz - useCallback ile optimize
  const switchLocale = useCallback((newLocale: string) => {
    if (!pathname) return `/${newLocale}`;
    
    // i18n-client içindeki addLocaleToPath fonksiyonunu kullanarak URL oluştur
    return addLocaleToPath(pathname.replace(new RegExp(`^/${locale}`), '') || '/', newLocale as Locale);
  }, [pathname, locale]);

  return (
    <header 
      ref={headerRef}
      className={`sticky top-0 z-50 transition-all duration-300
                 ${isScrolled 
                   ? 'shadow-md py-1 backdrop-blur-sm bg-background/95 border-b border-border/60' 
                   : 'py-2 bg-background border-b border-border'}`}
    >
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            href={`/${locale}`} 
            className="relative z-10 group transition-all duration-300 flex items-center outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-md"
            aria-label={homeText}
          >
            <div className="h-10 md:h-12 w-auto relative flex items-center justify-center">
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
          <nav className="hidden md:flex items-center space-x-6" aria-label="Ana navigasyon">
            {/* Menü Linkleri */}
            {menuItems.map((item) => (
              <Link 
                key={item.id}
                href={`/${locale}${item.href}`}
                className={`relative transition-all duration-300 group text-sm font-medium
                          hover:text-accent outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-md px-2 py-1
                          ${item.active ? 'text-accent' : 'text-foreground'}`}
                aria-current={item.active ? 'page' : undefined}
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

          {/* Mobil Menü Butonu - Sheet Trigger ile */}
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                ref={sheetTriggerRef}
                className="md:hidden p-2 rounded-md hover:bg-muted transition-colors duration-300 active:scale-95 touch-manipulation
                           outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                aria-label={openMenuText}
                aria-haspopup="dialog"
                aria-expanded={isSheetOpen}
              >
                <Menu className="w-5 h-5 text-foreground transition-transform duration-300" />
              </button>
            </SheetTrigger>
            
            <SheetContent 
              side="right" 
              className="p-0 bg-background border-l border-border w-full sm:w-80 outline-none focus:outline-none"
              onOpenAutoFocus={(e) => e.preventDefault()} // Otomatik odaklanmayı devre dışı bırak (kendi odaklanma stratejimizi kullanıyoruz)
            >
              <SheetHeader className="p-4 border-b border-border">
                <SheetTitle className="text-lg font-medium text-foreground flex justify-start">
                  <Image
                    src="/logo-siyah.svg"
                    alt="Inn Elegance"
                    width={120}
                    height={35}
                    style={{ width: 'auto', height: 'auto', maxWidth: '120px' }}
                    priority
                  />
                </SheetTitle>
              </SheetHeader>
              
              <div className="flex flex-col p-4 overflow-y-auto">
                <nav className="flex flex-col space-y-1" aria-label="Mobil navigasyon">
                  {menuItems.map((item, index) => (
                    <SheetClose asChild key={item.id}>
                      <Link
                        href={`/${locale}${item.href}`}
                        className={`flex items-center text-base font-medium px-3 py-3 rounded-lg transition-all duration-200 ease-in-out
                                  outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2
                                  touch-manipulation active:scale-[0.98] select-none
                                  ${item.active 
                                    ? 'bg-muted text-accent' 
                                    : 'hover:bg-muted/50 hover:text-accent'}`}
                        style={{ animationDelay: `${index * 50}ms` }}
                        aria-current={item.active ? 'page' : undefined}
                        data-first-menu-item={index === 0 ? "true" : undefined}
                      >
                        <item.icon className="w-5 h-5 mr-3" />
                        {item.text}
                      </Link>
                    </SheetClose>
                  ))}

                  {/* Dil Seçimi Bölümü */}
                  <div className="mt-4 pt-4 border-t border-border">
                    <div className="relative" ref={langDropdownRef}>
                      {/* Dil Seçimi Başlığı ve Dropdown Butonu */}
                      <button
                        type="button"
                        ref={langDropdownButtonRef}
                        onClick={toggleLangDropdown}
                        className={`w-full flex items-center justify-between px-3 py-3 rounded-lg transition-all duration-200 
                                  text-base font-medium outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2
                                  touch-manipulation select-none
                                  ${isLangDropdownOpen ? 'bg-muted text-accent' : 'hover:bg-muted/50'}`}
                        aria-expanded={isLangDropdownOpen}
                        aria-haspopup="listbox"
                        aria-controls="language-listbox"
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
                            aria-hidden="true"
                          />
                        </div>
                      </button>

                      {/* Dropdown İçeriği */}
                      <div
                        id="language-listbox"
                        role="listbox"
                        aria-label={languageSelectionText}
                        className={`mt-1 rounded-lg overflow-hidden transition-all duration-300 origin-top bg-background/95 backdrop-blur-sm
                                  shadow-md border border-border
                                  ${isLangDropdownOpen 
                                    ? 'max-h-[300px] opacity-100 scale-y-100' 
                                    : 'max-h-0 opacity-0 scale-y-95 pointer-events-none'}`}
                      >
                        <div className="py-2 divide-y divide-border/50">
                          {supportedLocales.map((loc) => {
                            const isActive = loc.code === locale;
                            return (
                              <SheetClose asChild key={loc.code}>
                                <Link
                                  href={switchLocale(loc.code)}
                                  className={`flex items-center justify-between px-4 py-2.5 text-sm transition-all
                                            outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2
                                            touch-manipulation select-none
                                            ${isActive 
                                              ? 'bg-accent/10 text-accent font-medium' 
                                              : 'text-foreground hover:bg-accent hover:text-white'}`}
                                  onClick={() => {
                                    setIsLangDropdownOpen(false);
                                  }}
                                  role="option"
                                  aria-selected={isActive}
                                >
                                  <div className="flex items-center">
                                    <span className="font-medium">{loc.name}</span>
                                  </div>
                                  {isActive && (
                                    <span className="flex h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
                                  )}
                                </Link>
                              </SheetClose>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </nav>
              </div>
              
              <SheetFooter className="p-4 mt-auto border-t border-border">
                <p className="text-sm text-muted-foreground text-center">
                  © {new Date().getFullYear()} Inn Elegance
                </p>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default HeaderComponent;