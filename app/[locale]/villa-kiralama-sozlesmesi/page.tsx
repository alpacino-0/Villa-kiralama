import React from 'react';
import Link from 'next/link';
import sozlesmeData from './sozlesme.json';
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

type VillaKiralamaSozlesmesiProps = {
  params: Promise<{ locale: string }>;
};

export default async function VillaKiralamaSozlesmesi({ params }: VillaKiralamaSozlesmesiProps) {
  // Next.js 15.3.0'da params bir Promise olarak geliyor
  const resolvedParams = await params;
  const { locale } = resolvedParams;

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
                  Ana Sayfa
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <span className="text-primary font-medium">Villa Kiralama Sözleşmesi</span>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center text-primary">
          {sozlesmeData.title}
        </h1>
        
        <p className="text-muted-foreground text-center mb-8 max-w-3xl mx-auto">
          Bu sayfada Inn Elegance villa kiralama hizmetleri için geçerli olan sözleşme şartlarını bulabilirsiniz.
        </p>
        
        {/* Giriş Bilgileri */}
        <Card className="mb-8 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-xl md:text-2xl text-primary">
              {sozlesmeData.sections[0].title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground text-base">
              {sozlesmeData.sections[0].content}
            </p>
          </CardContent>
        </Card>
        
        {/* Sözleşme Bölümleri */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-primary">Sözleşme Maddeleri</h2>
          <Accordion type="single" collapsible className="border rounded-lg">
            {sozlesmeData.sections.slice(1).map((section) => (
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
        
        {/* Sık Sorulan Sorular */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-primary">Sık Sorulan Sorular</h2>
          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <Accordion type="single" collapsible>
                {sozlesmeData.faq.map((faq) => (
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
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
        
        {/* Şirket Bilgileri */}
        <div className="bg-muted p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-primary">Şirket Bilgileri</h2>
          <div className="space-y-3 text-foreground">
            <p className="flex flex-col sm:flex-row sm:gap-2">
              <strong className="min-w-24 inline-block">Şirket:</strong> 
              <span>{sozlesmeData.companyInfo.name}</span>
            </p>
            <p className="flex flex-col sm:flex-row sm:gap-2">
              <strong className="min-w-24 inline-block">Adres:</strong> 
              <span>{sozlesmeData.companyInfo.address}</span>
            </p>
            <p className="flex flex-col sm:flex-row sm:gap-2">
              <strong className="min-w-24 inline-block">Web Sitesi:</strong> 
              <a href={`https://${sozlesmeData.companyInfo.website}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                {sozlesmeData.companyInfo.website}
              </a>
            </p>
            <p className="flex flex-col sm:flex-row sm:gap-2">
              <strong className="min-w-24 inline-block">Sahibi:</strong> 
              <span>{sozlesmeData.companyInfo.owner}</span>
            </p>
            <p className="flex flex-col sm:flex-row sm:gap-2">
              <strong className="min-w-24 inline-block">E-posta:</strong> 
              <a href={`mailto:${sozlesmeData.companyInfo.email}`} className="text-primary hover:underline">
                {sozlesmeData.companyInfo.email}
              </a>
            </p>
            <p className="flex flex-col sm:flex-row sm:gap-2">
              <strong className="min-w-24 inline-block">Telefon:</strong> 
              <a href={`tel:${sozlesmeData.companyInfo.phone.replace(/\s+/g, '')}`} className="text-primary hover:underline">
                {sozlesmeData.companyInfo.phone}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}