'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Home, Building, MapPin, Info, Mail, FileText, AlertCircle, Send, Phone, CreditCard, Gift, ShieldCheck, HelpCircle } from 'lucide-react';
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';

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

const FooterComponent = ({ locale, dictionary }: FooterComponentProps) => {
  const currentYear = new Date().getFullYear();
  
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

  return (
    <footer className="bg-secondary text-white pt-16 pb-10 px-4 md:px-8">
      <div className="container mx-auto px-2 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Şirket Bilgileri */}
          <div>
            <div className="mb-4">
              <div className="h-12 w-auto relative mb-2">
                <Image
                  src="/logo-beyaz.svg"
                  alt="Inn Elegance"
                  width={180}
                  height={48}
                  className="transition-all duration-300"
                  style={{ width: 'auto', height: 'auto', maxWidth: '180px' }}
                  priority
                />
              </div>
              <p className="text-sm font-light mt-2">{brandSlogan}</p>
            </div>
            <p className="text-white/80 text-sm mb-6">{companyInfo}</p>
            <div className="space-y-2">
              <div className="flex items-center text-sm">
                <Phone size={16} className="mr-2 text-white" />
                <span>+90 555 123 4567</span>
              </div>
              <div className="flex items-center text-sm">
                <Mail size={16} className="mr-2 text-white" />
                <span>info@innelegance.com</span>
              </div>
              <div className="flex items-start text-sm">
                <MapPin size={16} className="mr-2 mt-1 text-white" />
                <span>123 Villa Street, Luxury District, 34000 Istanbul, Turkey</span>
              </div>
            </div>
            
            {/* Ödeme Yöntemleri */}
            <div className="mt-6">
              <div className="flex items-center space-x-2 mb-2">
                <CreditCard size={16} className="text-white" />
                <span className="text-sm font-medium text-white">{securePayment}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <Image
                  src="/payment-methods/visa.svg"
                  alt="Visa"
                  width={40}
                  height={24}
                  className="h-8 w-auto bg-white rounded-md px-2 py-1"
                />
                <Image
                  src="/payment-methods/mastercard.svg"
                  alt="MasterCard"
                  width={40}
                  height={24}
                  className="h-8 w-auto bg-white rounded-md px-2 py-1"
                />
                <Image
                  src="/payment-methods/amex.svg"
                  alt="American Express"
                  width={40}
                  height={24}
                  className="h-8 w-auto bg-white rounded-md px-2 py-1"
                />
                <Image
                  src="/payment-methods/paypal.svg"
                  alt="PayPal"
                  width={40}
                  height={24}
                  className="h-8 w-auto bg-white rounded-md px-2 py-1"
                />
                <Image
                  src="/payment-methods/google-pay.svg"
                  alt="Google Pay"
                  width={40}
                  height={24}
                  className="h-8 w-auto bg-white rounded-md px-2 py-1"
                />
                <Image
                  src="/payment-methods/apple-pay.svg"
                  alt="Apple Pay"
                  width={40}
                  height={24}
                  className="h-8 w-auto bg-white rounded-md px-2 py-1"
                />
                <Image
                  src="/payment-methods/stripe.svg"
                  alt="Stripe"
                  width={40}
                  height={24}
                  className="h-8 w-auto bg-white rounded-md px-2 py-1"
                />
              </div>
            </div>
            
            {/* Sosyal Medya */}
            <div className="flex space-x-3 mt-6">
              {socialLinks.map((link) => (
                <a 
                  key={link.id}
                  href={link.url} 
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-accent transition-colors" 
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
          <div>
            <h3 className="text-xl font-heading font-bold mb-4 text-white">{quickLinksTitle}</h3>
            <ul className="space-y-2 text-white/80">
              <li className="hover:text-accent transition-colors">
                <Link href={`/${locale}`} className="flex items-center">
                  <Home size={16} className="mr-2 text-white" />
                  {home}
                </Link>
              </li>
              <li className="hover:text-accent transition-colors">
                <Link href={`/${locale}/villa-kiralama`} className="flex items-center">
                  <Building size={16} className="mr-2 text-white" />
                  {villasText}
                </Link>
              </li>
              <li className="hover:text-accent transition-colors">
                <Link href={`/${locale}/villa-kiralama-bolgeleri`} className="flex items-center">
                  <MapPin size={16} className="mr-2 text-white" />
                  {locationsText}
                </Link>
              </li>
              <li className="hover:text-accent transition-colors">
                <Link href={`/${locale}/villa-kiralama-kampanyalar`} className="flex items-center">
                  <Gift size={16} className="mr-2 text-white" />
                  {promotionsText}
                </Link>
              </li>
              <li className="hover:text-accent transition-colors">
                <Link href={`/${locale}/villa-kiralama-hakkimizda`} className="flex items-center">
                  <Info size={16} className="mr-2 text-white" />
                  {aboutUsText}
                </Link>
              </li>
              <li className="hover:text-accent transition-colors">
                <Link href={`/${locale}/villa-kiralama-iletisim`} className="flex items-center">
                  <Mail size={16} className="mr-2 text-white" />
                  {contactUsText}
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Yasal */}
          <div>
            <h3 className="text-xl font-heading font-bold mb-4 text-white">{legalTitle}</h3>
            <ul className="space-y-2 text-white/80">
              <li className="hover:text-accent transition-colors">
                <Link href={`/${locale}/villa-kiralama-gizlilik-sartlari`} className="flex items-center">
                  <ShieldCheck size={16} className="mr-2 text-white" />
                  {privacyPolicyText}
                </Link>
              </li>
              <li className="hover:text-accent transition-colors">
                <Link href={`/${locale}/villa-kiralama-odeme-yontemleri`} className="flex items-center">
                  <CreditCard size={16} className="mr-2 text-white" />
                  {paymentMethodsText}
                </Link>
              </li>
              <li className="hover:text-accent transition-colors">
                <Link href={`/${locale}/villa-kiralama-sikca-sorulan-sorular`} className="flex items-center">
                  <HelpCircle size={16} className="mr-2 text-white" />
                  {faqText}
                </Link>
              </li>
              <li className="hover:text-accent transition-colors">
                <Link href={`/${locale}/villa-kiralama-ev-sahibi-sozlesmesi`} className="flex items-center">
                  <FileText size={16} className="mr-2 text-white" />
                  {hostAgreementText}
                </Link>
              </li>
              <li className="hover:text-accent transition-colors">
                <Link href={`/${locale}/villa-kiralama-iptal-kosullari`} className="flex items-center">
                  <AlertCircle size={16} className="mr-2 text-white" />
                  {cancellationPolicyText}
                </Link>
              </li>
              <li className="hover:text-accent transition-colors">
                <Link href={`/${locale}/villa-kiralama-sozlesmesi`} className="flex items-center">
                  <FileText size={16} className="mr-2 text-white" />
                  {rentalAgreementText}
                </Link>
              </li>
              <li className="hover:text-accent transition-colors">
                <Link href={`/${locale}/kisisel-verilerin-korunmasi-hakkinda-aydinlatma-metni`} className="flex items-center">
                  <FileText size={16} className="mr-2 text-white" />
                  {gdprComplianceText}
                </Link>
              </li>
            </ul>
          </div>
          
          {/* İletişim Formu */}
          <div>
            <h3 className="text-xl font-heading font-bold mb-4 text-white">{formTitle}</h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <Input 
                type="text" 
                placeholder={nameText}
                className="bg-white/10 border-white/20 placeholder:text-white/50 text-white"
              />
              <Input 
                type="email" 
                placeholder={emailText}
                className="bg-white/10 border-white/20 placeholder:text-white/50 text-white"
              />
              <Input 
                type="tel" 
                placeholder={phoneText}
                className="bg-white/10 border-white/20 placeholder:text-white/50 text-white"
              />
              <Textarea 
                placeholder={messageText}
                className="bg-white/10 border-white/20 placeholder:text-white/50 text-white min-h-[100px]"
              />
              <Button 
                type="submit" 
                className="w-full bg-accent hover:bg-accent/90"
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
              {webDesign}: <Link href="/" className="hover:text-accent">Inn Elegance</Link>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent;