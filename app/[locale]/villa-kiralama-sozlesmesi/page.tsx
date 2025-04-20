import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Breadcrumb, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbList,
  BreadcrumbSeparator 
} from '@/components/ui/breadcrumb';
import { ChevronRight, HomeIcon } from 'lucide-react';
import { getDictionary } from '@/app/dictionaries';
import { Locale, locales } from '@/app/i18n';

type VillaKiralamaSozlesmesiProps = {
  params: Promise<{ locale: string }>;
};

// Dinamik metadata oluşturma
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  // Next.js 15.3.0'da params bir Promise olarak geliyor
  const resolvedParams = await params;
  
  // Dil sözlüğünü al
  const locale = resolvedParams.locale;
  const dict = await getDictionary(locale);

  return {
    title: dict.agreement.metadata.title,
    description: dict.agreement.metadata.description,
  };
}

export default async function VillaKiralamaSozlesmesi({ params }: VillaKiralamaSozlesmesiProps) {
  // Next.js 15.3.0'da params bir Promise olarak geliyor
  const resolvedParams = await params;
  
  // Dil kontrolü ve sözlük yükleme
  const locale = locales.includes(resolvedParams.locale as Locale) ? resolvedParams.locale : 'en';
  const dict = await getDictionary(locale);
  
  // Sözleşme verilerini sözlük nesnesinden al
  const sozlesmeData = dict.agreement.sozlesme;

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
                  {dict.agreement.breadcrumb.home}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <span className="text-primary font-medium">{dict.agreement.breadcrumb.agreement}</span>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center text-primary">
          {dict.agreement.pageTitle}
        </h1>
        
        <p className="text-muted-foreground text-center mb-8 max-w-3xl mx-auto">
          {dict.agreement.pageDescription}
        </p>
        
        {/* Giriş Bilgileri */}
        <Card className="mb-8 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-xl md:text-2xl text-primary">
              {dict.agreement.introduction.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground text-base">
              {sozlesmeData?.sections && sozlesmeData.sections.length > 0 
                ? sozlesmeData.sections[0]?.content 
                : dict.agreement.introduction.content}
            </p>
          </CardContent>
        </Card>
        
        {/* Sözleşme Bölümleri */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-primary">{dict.agreement.sections.title}</h2>
          <Accordion type="single" collapsible className="border rounded-lg">
            {sozlesmeData?.sections && sozlesmeData.sections.length > 1
              ? sozlesmeData.sections.slice(1).map((section) => (
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
              ))
              : <p className="p-4">{dict.agreement.sections.fallbackMessage}</p>
            }
          </Accordion>
        </div>
        
        {/* Sık Sorulan Sorular */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-primary">{dict.agreement.faq.title}</h2>
          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <Accordion type="single" collapsible>
                {sozlesmeData?.faq && sozlesmeData.faq.length > 0
                  ? sozlesmeData.faq.map((faq) => (
                  <AccordionItem 
                    key={`faq-${faq.question.replace(/\s+/g, '-').toLowerCase().slice(0, 20)}`} 
                    value={`faq-${faq.question.replace(/\s+/g, '-').toLowerCase().slice(0, 20)}`}
                  >
                    <AccordionTrigger className="text-base font-medium">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-foreground text-base">
                        {faq.answer}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                ))
                : <p className="p-4">{dict.agreement.faq.fallbackMessage}</p>
                }
              </Accordion>
            </CardContent>
          </Card>
        </div>
        
        {/* Şirket Bilgileri */}
        <div className="bg-muted p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-primary">{dict.agreement.companyInfo.title}</h2>
          <div className="space-y-3 text-foreground">
            <p className="flex flex-col sm:flex-row sm:gap-2">
              <strong className="min-w-24 inline-block">{dict.agreement.companyInfo.company}:</strong> 
              <span>{sozlesmeData?.companyInfo?.name || ""}</span>
            </p>
            <p className="flex flex-col sm:flex-row sm:gap-2">
              <strong className="min-w-24 inline-block">{dict.agreement.companyInfo.address}:</strong> 
              <span>{sozlesmeData?.companyInfo?.address || ""}</span>
            </p>
            {sozlesmeData?.companyInfo?.website && (
              <p className="flex flex-col sm:flex-row sm:gap-2">
                <strong className="min-w-24 inline-block">{dict.agreement.companyInfo.website}:</strong> 
                <a href={`https://${sozlesmeData.companyInfo.website}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  {sozlesmeData.companyInfo.website}
                </a>
              </p>
            )}
            <p className="flex flex-col sm:flex-row sm:gap-2">
              <strong className="min-w-24 inline-block">{dict.agreement.companyInfo.owner}:</strong> 
              <span>{sozlesmeData?.companyInfo?.owner || ""}</span>
            </p>
            {sozlesmeData?.companyInfo?.email && (
              <p className="flex flex-col sm:flex-row sm:gap-2">
                <strong className="min-w-24 inline-block">{dict.agreement.companyInfo.email}:</strong> 
                <a href={`mailto:${sozlesmeData.companyInfo.email}`} className="text-primary hover:underline">
                  {sozlesmeData.companyInfo.email}
                </a>
              </p>
            )}
            {sozlesmeData?.companyInfo?.phone && (
              <p className="flex flex-col sm:flex-row sm:gap-2">
                <strong className="min-w-24 inline-block">{dict.agreement.companyInfo.phone}:</strong> 
                <a href={`tel:${sozlesmeData.companyInfo.phone.replace(/\s+/g, '')}`} className="text-primary hover:underline">
                  {sozlesmeData.companyInfo.phone}
                </a>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}