import type { Locale } from '@/app/i18n';
import { getDictionary } from '@/app/dictionaries';

// Bölüm tipi tanımı
export interface KVKKSectionType {
  id: string;
  title: string;
  content: string;
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

// KVKK verileri tipi tanımı
interface KVKKData {
  title: string;
  lastUpdated: string;
  sections: KVKKSectionType[];
  companyInfo: CompanyInfo;
}

// Çoklu dil desteği ile KVKK verilerini getiren fonksiyon
export async function getKVKKData(locale: string): Promise<KVKKData> {
  // Dil sözlüğünü al
  const dict = await getDictionary(locale as Locale);
  const gdprData = dict.gdprNotice;
  
  // Dile göre KVKK verilerini döndür
  return {
    title: gdprData.pageTitle,
    lastUpdated: locale === 'tr' ? gdprData.lastUpdated.replace('Son Güncelleme: ', '') : 
                locale === 'de' ? gdprData.lastUpdated.replace('Letzte Aktualisierung: ', '') : 
                locale === 'ru' ? gdprData.lastUpdated.replace('Последнее обновление: ', '') : 
                gdprData.lastUpdated.replace('Last Updated: ', ''),
    sections: gdprData.sections,
    companyInfo: {
      name: gdprData.companyInfo.name,
      address: gdprData.companyInfo.address,
      website: gdprData.companyInfo.website,
      owner: gdprData.companyInfo.owner,
      email: gdprData.companyInfo.email,
      phone: gdprData.companyInfo.phone
    }
  };
} 