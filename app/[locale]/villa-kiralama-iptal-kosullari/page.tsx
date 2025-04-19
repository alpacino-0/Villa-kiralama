"use client"

import React from 'react';
import Link from 'next/link';
import iptalKosullariData from './iptal-kosullari.json';
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
import { ChevronRight, HomeIcon, AlertCircle } from 'lucide-react';

type IptalKosullariProps = {
  params: Promise<{ locale: string }>;
};

export default function VillaKiralamaIptalKosullari({ params }: IptalKosullariProps) {
  // React.use() ile params Promise'ini çözüyoruz
  const resolvedParams = React.use(params);
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
              <span className="text-primary font-medium">Villa Kiralama İptal Koşulları</span>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        
        {/* Hero Section */}
        <div className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <AlertCircle className="h-16 w-16 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
            {iptalKosullariData.title}
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-3xl mx-auto">
            Bu sayfada Inn Elegance villa kiralama hizmetlerine ilişkin iptal koşulları ve iade politikalarını bulabilirsiniz. Rezervasyon yapmadan önce bu koşulları dikkatlice okuyunuz.
          </p>
        </div>
        
        {/* İlk iki bölümü ayrı kartlar olarak göster */}
        <div className="space-y-6 mb-8">
          <Card className="shadow-sm hover:shadow-md transition-shadow border-l-4 border-l-primary">
            <CardHeader>
              <CardTitle className="text-xl md:text-2xl text-primary">
                {iptalKosullariData.sections[0].title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground text-base whitespace-pre-line">
                {iptalKosullariData.sections[0].content}
              </p>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm hover:shadow-md transition-shadow border-l-4 border-l-primary">
            <CardHeader>
              <CardTitle className="text-xl md:text-2xl text-primary">
                {iptalKosullariData.sections[1].title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground text-base whitespace-pre-line">
                {iptalKosullariData.sections[1].content}
              </p>
            </CardContent>
          </Card>
        </div>
        
        {/* İptal Koşulları Bölümleri */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-primary">İptal ve İade Koşulları</h2>
          <Accordion type="single" collapsible className="border rounded-lg">
            {iptalKosullariData.sections.slice(2).map((section) => (
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
                {iptalKosullariData.faq.map((faq) => (
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
        <div className="bg-muted p-6 rounded-lg mt-8">
          <h2 className="text-2xl font-semibold mb-4 text-primary">Şirket Bilgileri</h2>
          <div className="space-y-3 text-foreground">
            <p className="flex flex-col sm:flex-row sm:gap-2">
              <strong className="min-w-24 inline-block">Şirket:</strong> 
              <span>{iptalKosullariData.companyInfo.name}</span>
            </p>
            <p className="flex flex-col sm:flex-row sm:gap-2">
              <strong className="min-w-24 inline-block">Adres:</strong> 
              <span>{iptalKosullariData.companyInfo.address}</span>
            </p>
            <p className="flex flex-col sm:flex-row sm:gap-2">
              <strong className="min-w-24 inline-block">Web Sitesi:</strong> 
              <a href={`https://${iptalKosullariData.companyInfo.website}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                {iptalKosullariData.companyInfo.website}
              </a>
            </p>
            <p className="flex flex-col sm:flex-row sm:gap-2">
              <strong className="min-w-24 inline-block">Sahibi:</strong> 
              <span>{iptalKosullariData.companyInfo.owner}</span>
            </p>
            <p className="flex flex-col sm:flex-row sm:gap-2">
              <strong className="min-w-24 inline-block">E-posta:</strong> 
              <a href={`mailto:${iptalKosullariData.companyInfo.email}`} className="text-primary hover:underline">
                {iptalKosullariData.companyInfo.email}
              </a>
            </p>
            <p className="flex flex-col sm:flex-row sm:gap-2">
              <strong className="min-w-24 inline-block">Telefon:</strong> 
              <a href={`tel:${iptalKosullariData.companyInfo.phone.replace(/\s+/g, '')}`} className="text-primary hover:underline">
                {iptalKosullariData.companyInfo.phone}
              </a>
            </p>
          </div>
        </div>
        
        {/* Bilgilendirme ve İletişim CTA */}
        <div className="mt-12 text-center">
          <Card className="p-6 mb-8 bg-accent/10 border-accent">
            <p className="text-accent-foreground font-medium mb-4">
              Bu iptal koşulları ve iade politikaları, Inn Elegance LLC ile yapılan tüm rezervasyonlar için geçerlidir. Rezervasyon yaparak bu koşulları kabul etmiş sayılırsınız.
            </p>
            <p className="text-muted-foreground">
              Lütfen rezervasyon yapmadan önce koşulları dikkatlice okuyunuz.
            </p>
          </Card>
          
          <p className="text-muted-foreground mb-6">
            İptal koşulları ve iadeler hakkında daha fazla bilgi için bizimle iletişime geçin.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href={`/${locale}/villa-kiralama-iletisim`} 
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              İletişime Geçin
            </Link>
            <Link 
              href={`/${locale}/villalar`} 
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-md hover:bg-accent/90 transition-colors"
            >
              Villaları İncele
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
