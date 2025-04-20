import React from 'react';
import { 
  BreadcrumbWithTranslation 
} from '@/components/ui/breadcrumb';
import { HomeIcon } from 'lucide-react';
import { getDictionary } from "@/app/dictionaries";
import { Locale, locales } from "@/app/i18n";
import FAQSearchClient from '@/components/faq/FAQSearchClient';

// Sayfa props tipi - Next.js 15.3.0 için params Promise olarak geliyor
type PageProps = {
  params: Promise<{ locale: string }>;
};

// Dinamik metadata oluşturma
export async function generateMetadata({ params }: PageProps) {
  // Params bir Promise olduğu için çözümlenmesi gerekiyor
  const resolvedParams = await params;
  // Dil sözlüğünü al
  const locale = resolvedParams.locale;
  const dict = await getDictionary(locale);

  return {
    title: dict.faq.metadata.title,
    description: dict.faq.metadata.description,
  };
}

export default async function VillaKiralamaSikcaSorulanSorular({ params }: PageProps) {
  // Params bir Promise olduğu için çözümlenmesi gerekiyor
  const resolvedParams = await params;
  // Dil kontrolü ve sözlük yükleme
  const locale = locales.includes(resolvedParams.locale as Locale) ? resolvedParams.locale : 'tr';
  const dict = await getDictionary(locale);

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="max-w-4xl mx-auto">
        {/* Çoklu dil desteği ile geliştirilmiş Breadcrumb */}
        <BreadcrumbWithTranslation 
          className="mb-6"
          locale={locale}
          homeLabel={dict.header.nav.home}
          homeIcon={<HomeIcon className="h-4 w-4" />}
          items={[
            {
              label: dict.faq.pageTitle,
              href: `/${locale}/villa-kiralama-sikca-sorulan-sorular`,
              isCurrent: true
            }
          ]}
        />
        
        {/* Hero Section - Çoklu dil desteği ile */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
            {dict.faq.heroTitle}
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-3xl mx-auto mb-8">
            {dict.faq.heroDescription}
          </p>
          
          {/* Search Box - Client Component - Çoklu dil desteği ile */}
          <FAQSearchClient 
            searchPlaceholder={dict.faq.searchPlaceholder}
            dictionary={dict}
            locale={locale}
          />
        </div>
      </div>
    </div>
  );
}



