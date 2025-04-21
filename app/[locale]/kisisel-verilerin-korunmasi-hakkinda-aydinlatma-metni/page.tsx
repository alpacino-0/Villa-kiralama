import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Breadcrumb, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbList,
  BreadcrumbSeparator 
} from '@/components/ui/breadcrumb';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import { ChevronRight, HomeIcon, Shield } from 'lucide-react';
import { getDictionary } from '@/app/dictionaries';
import type { Locale } from '@/app/i18n';
import { locales } from '@/app/i18n';
import { getKVKKData } from './i18n';
import type { KVKKSectionType } from './i18n';

// Sayfa prop tipi - Next.js 15 için params Promise olarak geliyor
type KVKKProps = {
  params: Promise<{ locale: string }>;
};

// Dinamik metadata oluşturma
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  // Dinamik parametreleri await etmeliyiz
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  
  const dict = await getDictionary(locale);

  return {
    title: dict.gdprNotice.metadata.title,
    description: dict.gdprNotice.metadata.description,
  };
}

export default async function KisiselVerilerinKorunmasiSayfasi({ params }: KVKKProps) {
  // Dinamik parametreleri await etmeliyiz
  const resolvedParams = await params;
  const { locale } = resolvedParams;
  
  // Dil kontrolü ve sözlük yükleme
  const currentLocale = locales.includes(locale as Locale) ? locale : 'en';
  const dict = await getDictionary(currentLocale);
  
  // Çok dilli KVKK verilerini al
  const kvkkData = await getKVKKData(currentLocale);
  
  // Sözlükten GDPR metinlerini al
  const gdprData = dict.gdprNotice;

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={`/${currentLocale}`} className="flex items-center text-muted-foreground hover:text-primary">
                  <HomeIcon className="h-4 w-4 mr-1" />
                  {gdprData.breadcrumb.home}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <span className="text-primary font-medium">{gdprData.breadcrumb.gdprNotice}</span>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        
        {/* Hero Section */}
        <div className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <Shield className="h-16 w-16 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
            {kvkkData.title}
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-3xl mx-auto">
            {gdprData.pageDescription}
          </p>
          <p className="text-accent text-sm mt-2">
            {currentLocale === 'tr' ? 'Son Güncelleme:' : currentLocale === 'de' ? 'Letzte Aktualisierung:' : currentLocale === 'ru' ? 'Последнее обновление:' : 'Last Updated:'} {kvkkData.lastUpdated}
          </p>
        </div>
        
        {/* İlk bölümü ayrı kart olarak göster */}
        <Card className="mb-8 shadow-sm hover:shadow-md transition-shadow border-l-4 border-l-primary">
          <CardHeader>
            <CardTitle className="text-xl md:text-2xl text-primary">
              {kvkkData.sections[0].title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground text-base whitespace-pre-line">
              {kvkkData.sections[0].content}
            </p>
          </CardContent>
        </Card>
        
        {/* Diğer bölümleri accordion olarak göster */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-primary">{gdprData.princplesSectionTitle}</h2>
          <Accordion type="single" collapsible className="border rounded-lg">
            {kvkkData.sections.slice(1).map((section: KVKKSectionType) => (
              <AccordionItem key={section.id} value={section.id}>
                <AccordionTrigger className="text-lg font-medium text-primary px-4">
                  {section.title}
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4">
                  <div className="whitespace-pre-line text-foreground text-base">
                    {section.content}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        
        {/* Şirket Bilgileri */}
        <div className="bg-muted p-6 rounded-lg mt-8">
          <h2 className="text-2xl font-semibold mb-4 text-primary">{gdprData.companyInfo.title}</h2>
          <div className="space-y-3 text-foreground">
            <p className="flex flex-col sm:flex-row sm:gap-2">
              <strong className="min-w-24 inline-block">{gdprData.companyInfo.labels.company}:</strong> 
              <span>{kvkkData.companyInfo.name}</span>
            </p>
            <p className="flex flex-col sm:flex-row sm:gap-2">
              <strong className="min-w-24 inline-block">{gdprData.companyInfo.labels.address}:</strong> 
              <span>{kvkkData.companyInfo.address}</span>
            </p>
            <p className="flex flex-col sm:flex-row sm:gap-2">
              <strong className="min-w-24 inline-block">{gdprData.companyInfo.labels.website}:</strong> 
              <a href={`https://${kvkkData.companyInfo.website}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                {kvkkData.companyInfo.website}
              </a>
            </p>
            <p className="flex flex-col sm:flex-row sm:gap-2">
              <strong className="min-w-24 inline-block">{gdprData.companyInfo.labels.owner}:</strong> 
              <span>{kvkkData.companyInfo.owner}</span>
            </p>
            <p className="flex flex-col sm:flex-row sm:gap-2">
              <strong className="min-w-24 inline-block">{gdprData.companyInfo.labels.email}:</strong> 
              <a href={`mailto:${kvkkData.companyInfo.email}`} className="text-primary hover:underline">
                {kvkkData.companyInfo.email}
              </a>
            </p>
            <p className="flex flex-col sm:flex-row sm:gap-2">
              <strong className="min-w-24 inline-block">{gdprData.companyInfo.labels.phone}:</strong> 
              <a href={`tel:${kvkkData.companyInfo.phone.replace(/\s+/g, '')}`} className="text-primary hover:underline">
                {kvkkData.companyInfo.phone}
              </a>
            </p>
          </div>
        </div>
        
        {/* Bilgilendirme ve İletişim CTA */}
        <div className="mt-12 text-center">
          <Card className="p-6 mb-8 bg-accent/10 border-accent">
            <p className="text-accent-foreground font-medium mb-4">
              {gdprData.disclaimerText}
            </p>
            <p className="text-muted-foreground">
              {currentLocale === 'tr' ? 'Son Güncelleme:' : currentLocale === 'de' ? 'Letzte Aktualisierung:' : currentLocale === 'ru' ? 'Последнее обновление:' : 'Last Updated:'} {kvkkData.lastUpdated}
            </p>
          </Card>
          
          <p className="text-muted-foreground mb-6">
            {gdprData.contactActionText}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href={`/${currentLocale}/villa-kiralama-iletisim`} 
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              {gdprData.contactButton}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}