'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Home, Building, MapPin, Info, Mail, FileText, AlertCircle, Send, Phone, CreditCard, Gift, ShieldCheck, HelpCircle } from 'lucide-react';
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
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
    newsletter?: {
      title?: string;
      placeholder?: string;
      button?: string;
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
    form?: {
      title?: string;
      name?: string;
      email?: string;
      phone?: string;
      message?: string;
      sending?: string;
      send?: string;
    };
    securePayment?: string;
    sslEncryption?: string;
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
  const promotionsText = dictionary.footer?.links?.promotions || 'Promotions';
  const aboutUsText = dictionary.footer?.links?.aboutUs || 'About Us';
  const contactUsText = dictionary.footer?.links?.contactUs || 'Contact Us';
  
  // Yasal metinler
  const privacyPolicyText = dictionary.footer?.links?.privacyPolicy || 'Privacy Terms';
  const paymentMethodsText = dictionary.footer?.links?.paymentMethods || 'Payment Methods';
  const faqText = dictionary.footer?.links?.faq || 'Frequently Asked Questions';
  const hostAgreementText = dictionary.footer?.links?.hostAgreement || 'Host Agreement';
  const cancellationPolicyText = dictionary.footer?.links?.cancellationPolicy || 'Cancellation Terms';
  const rentalAgreementText = dictionary.footer?.links?.rentalAgreement || 'Villa Rental Agreement';
  const gdprComplianceText = dictionary.footer?.links?.gdprCompliance || 'GDPR Compliance';
  
  // Bülten ve form metinleri
  const newsletterTitle = dictionary.footer?.newsletter?.title || 'Subscribe to Our Newsletter';
  const formTitle = dictionary.footer?.form?.title || newsletterTitle || 'Contact Us';
  const nameText = dictionary.footer?.form?.name || 'Your Name';
  const emailText = dictionary.footer?.form?.email || dictionary.common?.emailAddress || 'Your Email';
  const phoneText = dictionary.footer?.form?.phone || dictionary.common?.phoneNumber || 'Your Phone';
  const messageText = dictionary.footer?.form?.message || 'Your Message';
  const sendText = dictionary.footer?.form?.send || dictionary.footer?.newsletter?.button || 'Send';
  
  // Başlıklar
  const quickLinksTitle = dictionary.footer?.quickLinks || 'Quick Links';
  const legalTitle = dictionary.footer?.legal || 'Legal';
  const brandSlogan = dictionary.footer?.brandSlogan || 'The Luxury Face of Holiday';
  const securePayment = dictionary.footer?.securePayment || 'Secure Payment';
  const sslEncryption = dictionary.footer?.sslEncryption || 'All payments are encrypted with 128-bit SSL.';
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

  // Form gönderme işlemi (şimdilik dummy)
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Form gönderimi işlemi
    console.log('Form submitted');
  };

  // Mobil görünüm için bölüm açılır/kapanır durumu
  const [openSections, setOpenSections] = useState<{[key: string]: boolean}>({
    quickLinks: false,
    legal: false,
    contactForm: false
  });

  // Mobil görünümde bölüm açma/kapama işlevi
  const toggleSection = (section: string) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <footer className={`bg-secondary text-white pt-12 pb-8 px-4 md:px-8 
                       ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
      <div className="container mx-auto px-2 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 mb-10">
          {/* Şirket Bilgileri */}
          <div className={`${isVisible ? 'animate-slide-up animate-delay-100' : ''}`}>
            <div className="mb-4">
              <div className="h-12 w-auto relative mb-2">
                <Image
                  src="/logo-beyaz.svg"
                  alt="Inn Elegance"
                  width={180}
                  height={48}
                  className="transition-all duration-300 hover:scale-105"
                  style={{ width: 'auto', height: 'auto', maxWidth: '180px' }}
                  priority
                />
              </div>
              <p className="text-sm font-light mt-2 text-accent-foreground">{brandSlogan}</p>
            </div>
            <p className="text-white/80 text-sm mb-6 leading-relaxed">{companyInfo}</p>
            <div className="space-y-3">
              <div className="flex items-center text-sm group">
                <Phone size={16} className="mr-2 text-white group-hover:text-accent transition-colors" />
                <span className="group-hover:text-accent transition-colors">+90 555 123 4567</span>
              </div>
              <div className="flex items-center text-sm group">
                <Mail size={16} className="mr-2 text-white group-hover:text-accent transition-colors" />
                <span className="group-hover:text-accent transition-colors">info@innelegance.com</span>
              </div>
              <div className="flex items-start text-sm group">
                <MapPin size={16} className="mr-2 mt-1 text-white group-hover:text-accent transition-colors" />
                <span className="group-hover:text-accent transition-colors">123 Villa Street, Luxury District, 34000 Istanbul, Turkey</span>
              </div>
            </div>
            
            {/* Ödeme Yöntemleri */}
            <div className="mt-6">
              <div className="flex items-center space-x-2 mb-3">
                <CreditCard size={16} className="text-accent" />
                <span className="text-sm font-medium text-white">{securePayment}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {['visa', 'mastercard', 'amex', 'paypal', 'google-pay', 'apple-pay', 'stripe'].map((method) => (
                  <div key={method} className="transform transition-transform hover:scale-110 hover:-translate-y-1 duration-300">
                    <Image
                      src={`/payment-methods/${method}.svg`}
                      alt={method.charAt(0).toUpperCase() + method.slice(1).replace('-', ' ')}
                      width={40}
                      height={24}
                      className="h-8 bg-white rounded-md px-2 py-1 shadow-sm"
                      style={{ width: 'auto', height: '32px' }}
                    />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Sosyal Medya */}
            <div className="flex space-x-3 mt-6">
              {socialLinks.map((link, index) => (
                <a 
                  key={link.id}
                  href={link.url} 
                  className={`w-8 h-8 flex items-center justify-center rounded-full 
                             bg-white/10 hover:bg-accent transition-all duration-300 
                             hover:scale-110 shadow-sm 
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
          
          {/* Hızlı Linkler - Mobil görünümde açılır/kapanır başlık */}
          <div className={`${isVisible ? 'animate-slide-up animate-delay-200' : ''}`}>
            <button 
              className="flex justify-between items-center w-full text-left mb-4 md:mb-4 cursor-pointer md:cursor-default bg-transparent border-none"
              onClick={() => toggleSection('quickLinks')}
              aria-expanded={openSections.quickLinks}
              type="button"
            >
              <h3 className="text-xl font-heading font-bold text-white">{quickLinksTitle}</h3>
              <span className="md:hidden text-white">
                {openSections.quickLinks ? '−' : '+'}
              </span>
            </button>
            <ul className={`space-y-2 text-white/80 transition-all duration-300 overflow-hidden 
                          ${!openSections.quickLinks ? 'max-h-0 md:max-h-[500px]' : 'max-h-[500px]'}`}>
              {[
                { icon: Home, text: home, href: `/${locale}`, id: 'home' },
                { icon: Building, text: villasText, href: `/${locale}/villa-kiralama`, id: 'villas' },
                { icon: MapPin, text: locationsText, href: `/${locale}/villa-kiralama-bolgeleri`, id: 'locations' },
                { icon: Gift, text: promotionsText, href: `/${locale}/villa-kiralama-kampanyalar`, id: 'promotions' },
                { icon: Info, text: aboutUsText, href: `/${locale}/villa-kiralama-hakkimizda`, id: 'about' },
                { icon: Mail, text: contactUsText, href: `/${locale}/villa-kiralama-iletisim`, id: 'contact' }
              ].map((item) => (
                <li key={item.id} className="group hover:translate-x-1 transition-all duration-200 ease-in-out">
                  <Link href={item.href} className="flex items-center group">
                    <item.icon size={16} className="mr-2 text-accent group-hover:text-accent-foreground transition-colors" />
                    <span className="group-hover:text-accent-foreground transition-colors">{item.text}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Yasal - Mobil görünümde açılır/kapanır başlık */}
          <div className={`${isVisible ? 'animate-slide-up animate-delay-300' : ''}`}>
            <button 
              className="flex justify-between items-center w-full text-left mb-4 md:mb-4 cursor-pointer md:cursor-default bg-transparent border-none"
              onClick={() => toggleSection('legal')}
              aria-expanded={openSections.legal}
              type="button"
            >
              <h3 className="text-xl font-heading font-bold text-white">{legalTitle}</h3>
              <span className="md:hidden text-white">
                {openSections.legal ? '−' : '+'}
              </span>
            </button>
            <ul className={`space-y-2 text-white/80 transition-all duration-300 overflow-hidden 
                          ${!openSections.legal ? 'max-h-0 md:max-h-[500px]' : 'max-h-[500px]'}`}>
              {[
                { icon: ShieldCheck, text: privacyPolicyText, href: `/${locale}/villa-kiralama-gizlilik-sartlari`, id: 'privacy' },
                { icon: CreditCard, text: paymentMethodsText, href: `/${locale}/villa-kiralama-odeme-yontemleri`, id: 'payment' },
                { icon: HelpCircle, text: faqText, href: `/${locale}/villa-kiralama-sikca-sorulan-sorular`, id: 'faq' },
                { icon: FileText, text: hostAgreementText, href: `/${locale}/villa-kiralama-ev-sahibi-sozlesmesi`, id: 'host' },
                { icon: AlertCircle, text: cancellationPolicyText, href: `/${locale}/villa-kiralama-iptal-kosullari`, id: 'cancel' },
                { icon: FileText, text: rentalAgreementText, href: `/${locale}/villa-kiralama-sozlesmesi`, id: 'rental' },
                { icon: FileText, text: gdprComplianceText, href: `/${locale}/kisisel-verilerin-korunmasi-hakkinda-aydinlatma-metni`, id: 'gdpr' }
              ].map((item) => (
                <li key={item.id} className="group hover:translate-x-1 transition-all duration-200 ease-in-out">
                  <Link href={item.href} className="flex items-center group">
                    <item.icon size={16} className="mr-2 text-accent group-hover:text-accent-foreground transition-colors" />
                    <span className="group-hover:text-accent-foreground transition-colors">{item.text}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* İletişim Formu - Mobil görünümde açılır/kapanır başlık */}
          <div className={`${isVisible ? 'animate-slide-up animate-delay-400' : ''}`}>
            <button 
              className="flex justify-between items-center w-full text-left mb-4 md:mb-4 cursor-pointer md:cursor-default bg-transparent border-none"
              onClick={() => toggleSection('contactForm')}
              aria-expanded={openSections.contactForm}
              type="button"
            >
              <h3 className="text-xl font-heading font-bold text-white">{formTitle}</h3>
              <span className="md:hidden text-white">
                {openSections.contactForm ? '−' : '+'}
              </span>
            </button>
            <form 
              onSubmit={handleSubmit} 
              className={`space-y-3 transition-all duration-300 overflow-hidden 
                        ${!openSections.contactForm ? 'max-h-0 md:max-h-[500px]' : 'max-h-[500px]'}`}
            >
              <Input 
                type="text" 
                placeholder={nameText}
                className="bg-white/10 border-white/20 placeholder:text-white/50 text-white 
                         focus:border-accent focus:ring-1 focus:ring-accent transition-all duration-300"
              />
              <Input 
                type="email" 
                placeholder={emailText}
                className="bg-white/10 border-white/20 placeholder:text-white/50 text-white 
                         focus:border-accent focus:ring-1 focus:ring-accent transition-all duration-300"
              />
              <Input 
                type="tel" 
                placeholder={phoneText}
                className="bg-white/10 border-white/20 placeholder:text-white/50 text-white 
                         focus:border-accent focus:ring-1 focus:ring-accent transition-all duration-300"
              />
              <Textarea 
                placeholder={messageText}
                className="bg-white/10 border-white/20 placeholder:text-white/50 text-white min-h-[100px] 
                         focus:border-accent focus:ring-1 focus:ring-accent transition-all duration-300 resize-none"
              />
              <Button 
                type="submit" 
                className="w-full bg-accent hover:bg-accent/90 shadow-md transition-all duration-300 
                         hover:shadow-lg hover:translate-y-[-2px] active:translate-y-0 active:shadow-md"
              >
                <Send size={16} className="mr-2 text-white" />
                {sendText}
              </Button>
            </form>
          </div>
        </div>
        
        <Separator className="bg-white/20 my-6" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col md:flex-row items-center md:items-baseline">
            <p className="text-white/60 text-sm">
              &copy; {currentYear} Inn Elegance - {copyrightText}
            </p>
            <div className="text-white/60 text-xs mt-1 md:mt-0 md:ml-2">
              {sslEncryption}
            </div>
          </div>
          <div className="text-white/60 text-sm mt-2 md:mt-0">
            <span>
              {webDesign}: <Link href="/" className="hover:text-accent transition-colors">Inn Elegance</Link>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent;