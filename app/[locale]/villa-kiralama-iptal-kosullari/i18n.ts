import type { Locale } from '@/app/i18n';

// Bölüm tipi tanımı
interface CancellationSection {
  id: string;
  title: string;
  content: string;
}

// Sık sorulan sorular tipi tanımı
interface FAQ {
  question: string;
  answer: string;
}

// Şirket bilgileri tipi tanımı
interface CompanyInfo {
  name: string;
  address: string;
  website: string;
  owner: string;
  email: string;
  phone: string;
}

// İptal koşulları verileri tipi tanımı
interface CancellationData {
  title: string;
  heroTitle: string;
  heroDescription: string;
  breadcrumb: {
    home: string;
    cancellationTerms: string;
  };
  sectionTitle: string;
  companyInfoTitle: string;
  companyInfoLabels: {
    company: string;
    address: string;
    website: string;
    owner: string;
    email: string;
    phone: string;
  };
  faqTitle: string;
  disclaimerText: string;
  disclaimerSubtext: string;
  moreInfoText: string;
  buttons: {
    contact: string;
    viewVillas: string;
  };
  sections: CancellationSection[];
  faq: FAQ[];
  companyInfo: CompanyInfo;
  lastUpdated: string;
}

// Dictionary yapısı için type tanımı
interface CancellationDictionary {
  metadata?: {
    title: string;
    description: string;
  };
  hero?: {
    title: string;
    description: string;
  };
  breadcrumb?: {
    home: string;
    cancellationTerms: string;
  };
  sectionTitle?: string;
  companyInfoTitle?: string;
  companyInfoLabels?: {
    company: string;
    address: string;
    website: string;
    owner: string;
    email: string;
    phone: string;
  };
  faqTitle?: string;
  disclaimerText?: string;
  disclaimerSubtext?: string;
  moreInfoText?: string;
  buttons?: {
    contact: string;
    viewVillas: string;
  };
  sections?: CancellationSection[];
  faq?: FAQ[];
  companyInfo?: CompanyInfo;
  lastUpdated?: string;
}

// Çoklu dil desteği ile iptal koşulları verilerini getiren fonksiyon
export async function getCancellationData(locale: string): Promise<CancellationData> {
  // Dil sözlüğünü al
  const { getDictionary } = await import('@/app/dictionaries');
  const dict = await getDictionary(locale as Locale);
  const cancellationDict = dict.cancellationTerms as CancellationDictionary || {};
  
  // Artık JSON dosyasından değil, sözlük dosyalarından içeriği alıyoruz
  return {
    title: cancellationDict.metadata?.title || 'Villa Kiralama İptal Koşulları',
    heroTitle: cancellationDict.hero?.title || 'Villa Kiralama İptal Koşulları',
    heroDescription: cancellationDict.hero?.description || '',
    breadcrumb: {
      home: cancellationDict.breadcrumb?.home || 'Ana Sayfa',
      cancellationTerms: cancellationDict.breadcrumb?.cancellationTerms || 'İptal Koşulları'
    },
    sectionTitle: cancellationDict.sectionTitle || 'İptal ve İade Koşulları',
    companyInfoTitle: cancellationDict.companyInfoTitle || 'Şirket Bilgileri',
    companyInfoLabels: {
      company: cancellationDict.companyInfoLabels?.company || 'Şirket',
      address: cancellationDict.companyInfoLabels?.address || 'Adres',
      website: cancellationDict.companyInfoLabels?.website || 'Web Sitesi',
      owner: cancellationDict.companyInfoLabels?.owner || 'Sahibi',
      email: cancellationDict.companyInfoLabels?.email || 'E-posta',
      phone: cancellationDict.companyInfoLabels?.phone || 'Telefon'
    },
    faqTitle: cancellationDict.faqTitle || 'Sık Sorulan Sorular',
    disclaimerText: cancellationDict.disclaimerText || '',
    disclaimerSubtext: cancellationDict.disclaimerSubtext || '',
    moreInfoText: cancellationDict.moreInfoText || '',
    buttons: {
      contact: cancellationDict.buttons?.contact || 'Bize Ulaşın',
      viewVillas: cancellationDict.buttons?.viewVillas || 'Villaları Görüntüle'
    },
    sections: cancellationDict.sections || [],
    faq: cancellationDict.faq || [],
    companyInfo: cancellationDict.companyInfo || {
      name: "Inn Elegance LLC",
      address: "7901 4th St N Ste 300, St. Petersburg, FL 33702, USA",
      website: "www.innelegance.com",
      owner: "Orhan Yavuz",
      email: "info@innelegance.com",
      phone: "+90 531 621 61 00"
    },
    lastUpdated: cancellationDict.lastUpdated || (
      locale === 'tr' ? 'Son Güncelleme: 10.05.2024' : 
      locale === 'de' ? 'Letzte Aktualisierung: 10.05.2024' : 
      locale === 'ru' ? 'Последнее обновление: 10.05.2024' : 
      'Last Updated: 05/10/2024'
    )
  };
} 