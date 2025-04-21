import { Metadata } from 'next';
import AboutPageContent from '@/components/about/AboutPageContent';
import { getDictionary } from '@/app/dictionaries';
import { Locale, locales } from '@/app/i18n';

// Sayfa prop tipi - Next.js 15.3.0 için params Promise olarak geliyor
type PageProps = {
  params: Promise<{ locale: string }>;
};

// Dinamik metadata oluşturma
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  // Params bir Promise olduğu için çözümlenmesi gerekiyor
  const resolvedParams = await params;
  // Dil sözlüğünü al
  const locale = resolvedParams.locale;
  const dict = await getDictionary(locale);

  return {
    title: dict.about?.metadata?.title,
    description: dict.about?.metadata?.description,
  };
}

export default async function AboutPage({
  params,
}: PageProps) {
  // Params bir Promise olduğu için çözümlenmesi gerekiyor
  const resolvedParams = await params;
  // Dil kontrolü ve sözlük yükleme
  const locale = locales.includes(resolvedParams.locale as Locale) ? resolvedParams.locale as Locale : 'en';
  const dict = await getDictionary(locale);
  
  // Supabase'de depolanan hakkımızda görseli
  const hakkimizdaImageUrl = "https://vqulnugmkknyymjioerc.supabase.co/storage/v1/object/public/villa-kiralama/hakkimizda/hakkimizda.jpg";
  
  // Çevirileri içeren özel bir içerik nesnesi oluştur
  const localizedContent = {
    heroSection: {
      title: dict.about?.heroSection?.title,
      description: dict.about?.heroSection?.description,
      imageUrl: hakkimizdaImageUrl
    },
    introduction: dict.about?.introduction,
    missionVision: {
      mission: dict.about?.mission,
      vision: dict.about?.vision,
      values: dict.about?.values
    },
    whyChooseUs: dict.about?.whyChooseUs?.items?.map(item => ({
      title: item.title,
      description: item.description,
      icon: '/icons/quality.svg' // Varsayılan icon
    })) || [],
    statistics: [
      { value: "500+", label: dict.about?.statistics?.luxuryVillas || "Lüks Villa" },
      { value: "25+", label: dict.about?.statistics?.holidayRegions || "Tatil Bölgesi" },
      { value: "10.000+", label: dict.about?.statistics?.happyCustomers || "Mutlu Müşteri" },
      { value: "8", label: dict.about?.statistics?.yearsExperience || "Yıllık Tecrübe" }
    ],
    faq: dict.about?.faq?.items || []
  };
  
  return (
    <main className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
      <AboutPageContent 
        content={localizedContent} 
        heroImageUrl={hakkimizdaImageUrl}
        dictionary={dict}
        locale={locale}
      />
    </main>
  );
} 