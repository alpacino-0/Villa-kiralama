import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import evSahibiData from './ev-sahibi-sozlesmesi.json';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Breadcrumb, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbList,
  BreadcrumbSeparator 
} from '@/components/ui/breadcrumb';
import { ChevronRight, HomeIcon, FileText } from 'lucide-react';
import { getDictionary } from '@/app/dictionaries';
import { Locale, locales } from '@/app/i18n';

// Sayfa props tipi - Next.js 15.3.0 için params Promise olarak geliyor
type PageProps = {
  params: Promise<{ locale: string }>;
};

// Sözleşme bölümleri için tip tanımı
type SectionKey = 
  | "introduction" 
  | "definitions" 
  | "commission_terms" 
  | "payment_terms" 
  | "property_requirements" 
  | "owner_responsibilities" 
  | "liability" 
  | "cancellation_policy" 
  | "payment_campaigns" 
  | "legal_terms";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  // Params bir Promise olduğu için çözümlenmesi gerekiyor
  const resolvedParams = await params;
  const locale = locales.includes(resolvedParams.locale as Locale) ? resolvedParams.locale : 'en';
  const dict = await getDictionary(locale);

  return {
    title: dict.ownerAgreement.metadata.title,
    description: dict.ownerAgreement.metadata.description,
  };
}

export default async function VillaKiralamaEvSahibiSozlesmesi({ params }: PageProps) {
  // Params bir Promise olduğu için çözümlenmesi gerekiyor
  const resolvedParams = await params;
  const locale = locales.includes(resolvedParams.locale as Locale) ? resolvedParams.locale : 'en';
  const dict = await getDictionary(locale);

  // Sözleşme bölümlerini ID'lere göre eşleştirelim
  const sectionMap: Record<string, SectionKey> = {
    "introduction": "introduction",
    "definitions": "definitions",
    "commission-terms": "commission_terms",
    "payment-terms": "payment_terms",
    "property-requirements": "property_requirements",
    "owner-responsibilities": "owner_responsibilities",
    "liability": "liability",
    "cancellation-policy": "cancellation_policy",
    "payment-campaigns": "payment_campaigns",
    "legal-terms": "legal_terms"
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={`/${locale}`} className="flex items-center text-muted-foreground hover:text-primary">
                  <HomeIcon className="h-4 w-4 mr-1" />
                  {dict.ownerAgreement.breadcrumb.home}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <span className="text-primary font-medium">{dict.ownerAgreement.breadcrumb.ownerAgreement}</span>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        
        {/* Hero Section */}
        <div className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <FileText className="h-16 w-16 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
            {dict.ownerAgreement.heroSection.title}
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-3xl mx-auto">
            {dict.ownerAgreement.heroSection.description}
          </p>
        </div>
        
        {/* Sözleşme Bölümleri */}
        <div className="space-y-8">
          {evSahibiData.sections.map((section) => {
            // section.id için type güvenliği sağlayalım
            const sectionId = section.id as string;
            const sectionKey = sectionMap[sectionId];
            
            return (
              <Card key={section.id} className="shadow-sm hover:shadow-md transition-shadow border-l-4 border-l-primary">
                <CardHeader>
                  <CardTitle className="text-xl md:text-2xl text-primary">
                    {sectionKey && dict.ownerAgreement.sections[sectionKey]?.title || section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground text-base whitespace-pre-line">
                    {sectionKey && dict.ownerAgreement.sections[sectionKey]?.content || section.content}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        {/* Şirket Bilgileri */}
        <div className="mt-12 bg-muted p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-primary">{dict.ownerAgreement.companyInfo.title}</h2>
          <div className="space-y-3 text-foreground">
            <p className="flex flex-col sm:flex-row sm:gap-2">
              <strong className="min-w-24 inline-block">{dict.ownerAgreement.companyInfo.company}:</strong> 
              <span>{evSahibiData.companyInfo.name}</span>
            </p>
            <p className="flex flex-col sm:flex-row sm:gap-2">
              <strong className="min-w-24 inline-block">{dict.ownerAgreement.companyInfo.address}:</strong> 
              <span>{evSahibiData.companyInfo.address}</span>
            </p>
            <p className="flex flex-col sm:flex-row sm:gap-2">
              <strong className="min-w-24 inline-block">{dict.ownerAgreement.companyInfo.website}:</strong> 
              <a href={`https://${evSahibiData.companyInfo.website}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                {evSahibiData.companyInfo.website}
              </a>
            </p>
            <p className="flex flex-col sm:flex-row sm:gap-2">
              <strong className="min-w-24 inline-block">{dict.ownerAgreement.companyInfo.owner}:</strong> 
              <span>{evSahibiData.companyInfo.owner}</span>
            </p>
            <p className="flex flex-col sm:flex-row sm:gap-2">
              <strong className="min-w-24 inline-block">{dict.ownerAgreement.companyInfo.email}:</strong> 
              <a href={`mailto:${evSahibiData.companyInfo.email}`} className="text-primary hover:underline">
                {evSahibiData.companyInfo.email}
              </a>
            </p>
            <p className="flex flex-col sm:flex-row sm:gap-2">
              <strong className="min-w-24 inline-block">{dict.ownerAgreement.companyInfo.phone}:</strong> 
              <a href={`tel:${evSahibiData.companyInfo.phone.replace(/\s+/g, '')}`} className="text-primary hover:underline">
                {evSahibiData.companyInfo.phone}
              </a>
            </p>
          </div>
        </div>
        
        {/* Onay ve İletişim CTA */}
        <div className="mt-12 text-center">
          <Card className="p-6 mb-8 bg-accent/10 border-accent">
            <p className="text-accent-foreground font-medium mb-4">
              {dict.ownerAgreement.legalTerms.acceptanceNote}
            </p>
            <p className="text-muted-foreground">
              {dict.ownerAgreement.legalTerms.lastUpdated}: Ocak 2024
            </p>
          </Card>
          
          <p className="text-muted-foreground mb-6">
            {dict.ownerAgreement.legalTerms.contactInfo}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href={`/${locale}/villa-kiralama-iletisim`} 
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              {dict.ownerAgreement.buttons.contact}
            </Link>
            <Link 
              href={`/${locale}/villa-ekle`} 
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-md hover:bg-accent/90 transition-colors"
            >
              {dict.ownerAgreement.buttons.addVilla}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}