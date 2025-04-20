'use client';

import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Mail, Phone } from 'lucide-react';
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useEffect, useState } from 'react';

// Dictionary tipi tanımı
interface Dictionary {
  footer?: {
    companyInfo?: string;
    contact?: string;
    copyright?: string;
    links?: {
      homes?: string;
      villas?: string;
      locations?: string;
      promotions?: string;
      aboutUs?: string;
      contactUs?: string;
      privacyPolicy?: string;
      termsOfService?: string;
      paymentMethods?: string;
      faq?: string;
      hostAgreement?: string;
      cancellationPolicy?: string;
      rentalAgreement?: string;
      gdprCompliance?: string;
    };
    social?: {
      facebook?: string;
      twitter?: string;
      instagram?: string;
      linkedin?: string;
      youtube?: string;
    };
    quickLinks?: string;
    legal?: string;
    brandSlogan?: string;
    webDesign?: string;
  };
  common?: {
    emailAddress?: string;
    phoneNumber?: string;
  };
  nav?: {
    home?: string;
  };
  [key: string]: unknown; // Diğer özellikler için esnek yapı
}

// Props tipini tanımlıyoruz
type FooterComponentProps = {
  locale: string;
  dictionary: Dictionary;
};

// Footer bileşeni tipi tanımlanıyor
const FooterComponent = ({ locale, dictionary }: FooterComponentProps) => {
  const currentYear = new Date().getFullYear();
  const [isVisible, setIsVisible] = useState(false);
  const [isClient, setIsClient] = useState(false);
  
  // Client-side-only kodu çalıştırmak için
  useEffect(() => {
    setIsClient(true);
  }, []);

  // IntersectionObserver için ayrı bir useEffect
  useEffect(() => {
    if (!isClient) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.1 }
    );
    
    const footerElement = document.querySelector('footer');
    if (footerElement) {
      observer.observe(footerElement);
    }
    
    return () => {
      if (footerElement) {
        observer.unobserve(footerElement);
      }
    };
  }, [isClient]);
  
  // Güvenli bir şekilde footer özelliklerine erişim
  const companyInfo = dictionary.footer?.companyInfo || 'Your trusted source for luxury villas and vacation homes.';
  const copyrightText = dictionary.footer?.copyright || `© ${currentYear} Inn Elegance. All rights reserved.`;
  
  // Link metinleri için güvenli erişim
  const home = dictionary.nav?.home || 'Home';
  const villasText = dictionary.footer?.links?.villas || 'Villas';
  const locationsText = dictionary.footer?.links?.locations || 'Regions';
  const aboutUsText = dictionary.footer?.links?.aboutUs || 'About Us';
  const contactUsText = dictionary.footer?.links?.contactUs || 'Contact Us';
  
  // Yasal metinler
  const privacyPolicyText = dictionary.footer?.links?.privacyPolicy || 'Privacy Terms';
  const faqText = dictionary.footer?.links?.faq || 'Frequently Asked Questions';
  const hostAgreementText = dictionary.footer?.links?.hostAgreement || 'Host Agreement';
  const cancellationPolicyText = dictionary.footer?.links?.cancellationPolicy || 'Cancellation Terms';
  const rentalAgreementText = dictionary.footer?.links?.rentalAgreement || 'Villa Rental Agreement';
  const gdprComplianceText = dictionary.footer?.links?.gdprCompliance || 'GDPR Compliance';
  
  // Başlıklar
  const quickLinksTitle = dictionary.footer?.quickLinks || 'Quick Links';
  const legalTitle = dictionary.footer?.legal || 'Legal';
  const brandSlogan = dictionary.footer?.brandSlogan || 'The Luxury Face of Holiday';
  const webDesign = dictionary.footer?.webDesign || 'Web Design';

  // Sosyal medya metinleri
  const facebookText = dictionary.footer?.social?.facebook || 'Facebook';
  const twitterText = dictionary.footer?.social?.twitter || 'Twitter';
  const instagramText = dictionary.footer?.social?.instagram || 'Instagram';
  const linkedinText = dictionary.footer?.social?.linkedin || 'LinkedIn';
  const youtubeText = dictionary.footer?.social?.youtube || 'Youtube';

  // Sosyal medya URL'leri
  const facebookUrl = 'https://facebook.com/innelegance';
  const twitterUrl = 'https://twitter.com/innelegance';
  const instagramUrl = 'https://instagram.com/innelegance';
  const linkedinUrl = 'https://linkedin.com/company/innelegance';
  const youtubeUrl = 'https://youtube.com/innelegance';

  // Sosyal medya linkleri
  const socialLinks = [
    { icon: Facebook, url: facebookUrl, label: facebookText, id: "facebook" },
    { icon: Instagram, url: instagramUrl, label: instagramText, id: "instagram" },
    { icon: Twitter, url: twitterUrl, label: twitterText, id: "twitter" },
    { icon: Linkedin, url: linkedinUrl, label: linkedinText, id: "linkedin" },
    { icon: Youtube, url: youtubeUrl, label: youtubeText, id: "youtube" }
  ];

  // Mobil görünüm için bölüm açılır/kapanır durumu
  const [openSections, setOpenSections] = useState<{[key: string]: boolean}>({
    quickLinks: false,
    legal: false
  });

  // Mobil görünümde bölüm açma/kapama işlevi
  const toggleSection = (section: string) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <footer className={`bg-secondary pt-10 pb-6 px-4 md:px-6 
                       ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Şirket Bilgileri */}
          <div className={`${isVisible ? 'animate-slide-up animate-delay-100' : ''}`}>
            <div className="mb-4">
              <div className="h-10 w-auto relative mb-2">
                <Image
                  src="/logo-beyaz.svg"
                  alt="Inn Elegance"
                  width={160}
                  height={40}
                  className="transition-all duration-300 hover:scale-105"
                  style={{ width: 'auto', height: 'auto', maxWidth: '160px' }}
                  priority
                />
              </div>
              <p className="text-sm font-light mt-2 text-white">{brandSlogan}</p>
            </div>
            <p className="text-white text-sm mb-5 leading-relaxed">{companyInfo}</p>
            <div className="space-y-2">
              <div className="flex items-center text-sm group">
                <Phone size={16} className="mr-2 text-white group-hover:text-white transition-colors" />
                <span className="text-white">+90 531 621 6100</span>
              </div>
              <div className="flex items-center text-sm group">
                <Mail size={16} className="mr-2 text-white group-hover:text-white transition-colors" />
                <span className="text-white">info@innelegance.com</span>
              </div>
              <div className="flex items-start text-sm group">
                <MapPin size={16} className="mr-2 mt-1 text-white group-hover:text-white transition-colors" />
                <span className="text-white">123 Villa Street, Luxury District, 34000 Istanbul, Turkey</span>
              </div>
            </div>
            
            {/* Sosyal Medya */}
            <div className="flex space-x-3 mt-5">
              {socialLinks.map((link, index) => (
                <a 
                  key={link.id}
                  href={link.url} 
                  className={`w-8 h-8 flex items-center justify-center rounded-full 
                             bg-white/10 hover:bg-white/20 transition-all duration-300 
                             hover:scale-110 
                             ${isVisible ? `animate-slide-right animate-delay-${(index + 1) * 100}` : ''}`}
                  aria-label={link.label}
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <link.icon size={16} className="text-white" />
                </a>
              ))}
            </div>
          </div>
          
          {/* Hızlı Linkler */}
          <div className={`${isVisible ? 'animate-slide-up animate-delay-200' : ''}`}>
            <button 
              className="flex justify-between items-center w-full text-left mb-4 cursor-pointer md:cursor-default bg-transparent border-none"
              onClick={() => toggleSection('quickLinks')}
              aria-expanded={openSections.quickLinks}
              type="button"
            >
              <div className="text-lg font-medium text-white leading-tight">{quickLinksTitle}</div>
              <span className="md:hidden text-white">
                {openSections.quickLinks ? '−' : '+'}
              </span>
            </button>
            <ul className={`space-y-2 transition-all duration-300 overflow-hidden 
                          ${!openSections.quickLinks ? 'max-h-0 md:max-h-[500px]' : 'max-h-[500px]'}`}>
              {[
                { text: home, href: `/${locale}`, id: 'home' },
                { text: villasText, href: `/${locale}/villa-kiralama`, id: 'villas' },
                { text: locationsText, href: `/${locale}/villa-kiralama-bolgeleri`, id: 'locations' },
                { text: aboutUsText, href: `/${locale}/villa-kiralama-hakkimizda`, id: 'about' },
                { text: contactUsText, href: `/${locale}/villa-kiralama-iletisim`, id: 'contact' }
              ].map((item) => (
                <li key={item.id} className="group hover:translate-x-1 transition-all duration-200 ease-in-out">
                  <Link href={item.href} className="flex items-center group">
                    <span className="text-white">{item.text}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Yasal */}
          <div className={`${isVisible ? 'animate-slide-up animate-delay-300' : ''}`}>
            <button 
              className="flex justify-between items-center w-full text-left mb-4 cursor-pointer md:cursor-default bg-transparent border-none"
              onClick={() => toggleSection('legal')}
              aria-expanded={openSections.legal}
              type="button"
            >
              <div className="text-lg font-medium text-white leading-tight">{legalTitle}</div>
              <span className="md:hidden text-white">
                {openSections.legal ? '−' : '+'}
              </span>
            </button>
            <ul className={`space-y-2 transition-all duration-300 overflow-hidden 
                          ${!openSections.legal ? 'max-h-0 md:max-h-[500px]' : 'max-h-[500px]'}`}>
              {[
                { text: privacyPolicyText, href: `/${locale}/villa-kiralama-gizlilik-sartlari`, id: 'privacy' },
                { text: faqText, href: `/${locale}/villa-kiralama-sikca-sorulan-sorular`, id: 'faq' },
                { text: hostAgreementText, href: `/${locale}/villa-kiralama-ev-sahibi-sozlesmesi`, id: 'host' },
                { text: cancellationPolicyText, href: `/${locale}/villa-kiralama-iptal-kosullari`, id: 'cancel' },
                { text: rentalAgreementText, href: `/${locale}/villa-kiralama-sozlesmesi`, id: 'rental' },
                { text: gdprComplianceText, href: `/${locale}/kisisel-verilerin-korunmasi-hakkinda-aydinlatma-metni`, id: 'gdpr' }
              ].map((item) => (
                <li key={item.id} className="group hover:translate-x-1 transition-all duration-200 ease-in-out">
                  <Link href={item.href} className="flex items-center group">
                    <span className="text-white">{item.text}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <Separator className="bg-white/20 my-4" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-white text-sm">
            &copy; {currentYear} Inn Elegance - {copyrightText}
          </p>
          <div className="text-white text-sm mt-2 md:mt-0">
            <span>
              {webDesign}: <Link href="https://www.linkedin.com/in/orhan-yavuz-18719034a" target="_blank" rel="noopener noreferrer " className="hover:underline transition-colors">Orhan Yavuz</Link>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent;