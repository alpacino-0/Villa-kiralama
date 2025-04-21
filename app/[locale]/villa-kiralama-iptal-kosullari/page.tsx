import React from 'react';
import Link from 'next/link';
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
import { getDictionary } from '@/app/dictionaries';
import { type Locale, locales } from '@/app/i18n';
import { Metadata } from 'next';
import { getCancellationData } from './i18n';

// Sayfa prop tipi - Next.js 15.3.0 için params Promise olarak geliyor
type PageProps = {
  params: Promise<{ locale: string }>;
};

// Dinamik metadata oluşturma
export async function generateMetadata({
  params
}: PageProps): Promise<Metadata> {
  // Dinamik parametreleri await etmeliyiz
  const resolvedParams = await params;
  const { locale } = resolvedParams;
  
  // Dil kontrolü ve sözlük yükleme
  const currentLocale = locales.includes(locale as Locale) ? locale : 'tr';
  const dict = await getDictionary(currentLocale);
  
  return {
    title: dict.cancellationTerms?.metadata?.title || "Villa Kiralama İptal Koşulları",
    description: dict.cancellationTerms?.metadata?.description || "Villa kiralama hizmetimizde uygulanan iptal politikası ve iade koşulları hakkında detaylı bilgiler."
  };
}

export default async function VillaKiralamaIptalKosullari({ params }: PageProps) {
  // Dinamik parametreleri önce await etmeliyiz
  const resolvedParams = await params;
  const { locale } = resolvedParams;
  
  // Dil kontrolü ve sözlük yükleme
  const currentLocale = locales.includes(locale as Locale) ? locale : 'tr';
  const dict = await getDictionary(currentLocale);
  
  // İptal koşulları içeriğini alıyoruz
  const cancellationDict = dict.cancellationTerms || {};
  
  // Çok dilli iptal koşulları verilerini al
  const cancellationData = await getCancellationData(currentLocale);
  
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
                  {cancellationDict.breadcrumb?.home || dict.header?.nav?.home || 'Ana Sayfa'}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <span className="text-primary font-medium">
                {cancellationDict.breadcrumb?.cancellationTerms || 'İptal Koşulları'}
              </span>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        
        {/* Hero Section */}
        <div className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <AlertCircle className="h-16 w-16 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
            {cancellationDict.hero?.title || cancellationData.title}
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-3xl mx-auto">
            {cancellationDict.hero?.description || "Bu sayfada Inn Elegance villa kiralama hizmetlerine ilişkin iptal koşulları ve iade politikalarını bulabilirsiniz. Rezervasyon yapmadan önce bu koşulları dikkatlice okuyunuz."}
          </p>
          <p className="text-accent text-sm mt-2">
            {cancellationData.lastUpdated}
          </p>
        </div>
        
        {/* İlk iki bölümü ayrı kartlar olarak göster */}
        <div className="space-y-6 mb-8">
          <Card className="shadow-sm hover:shadow-md transition-shadow border-l-4 border-l-primary">
            <CardHeader>
              <CardTitle className="text-xl md:text-2xl text-primary">
                {cancellationData.sections[0].title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground text-base whitespace-pre-line">
                {cancellationData.sections[0].content}
              </p>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm hover:shadow-md transition-shadow border-l-4 border-l-primary">
            <CardHeader>
              <CardTitle className="text-xl md:text-2xl text-primary">
                {cancellationData.sections[1].title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground text-base whitespace-pre-line">
                {cancellationData.sections[1].content}
              </p>
            </CardContent>
          </Card>
        </div>
        
        {/* İptal Koşulları Bölümleri */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-primary">
            {cancellationDict.sectionTitle || "İptal ve İade Koşulları"}
          </h2>
          <Accordion type="single" collapsible className="border rounded-lg">
            {cancellationData.sections.slice(2).map((section) => (
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
          <h2 className="text-2xl font-semibold mb-4 text-primary">
            {cancellationDict.faqTitle || "Sık Sorulan Sorular"}
          </h2>
          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <Accordion type="single" collapsible>
                {cancellationData.faq.map((faq) => (
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
          <h2 className="text-2xl font-semibold mb-4 text-primary">
            {cancellationDict.companyInfoTitle || "Şirket Bilgileri"}
          </h2>
          <div className="space-y-3 text-foreground">
            <p className="flex flex-col sm:flex-row sm:gap-2">
              <strong className="min-w-24 inline-block">
                {cancellationDict.companyInfoLabels?.company || "Şirket:"}
              </strong> 
              <span>{cancellationData.companyInfo.name}</span>
            </p>
            <p className="flex flex-col sm:flex-row sm:gap-2">
              <strong className="min-w-24 inline-block">
                {cancellationDict.companyInfoLabels?.address || "Adres:"}
              </strong> 
              <span>{cancellationData.companyInfo.address}</span>
            </p>
            <p className="flex flex-col sm:flex-row sm:gap-2">
              <strong className="min-w-24 inline-block">
                {cancellationDict.companyInfoLabels?.website || "Web Sitesi:"}
              </strong> 
              <a href={`https://${cancellationData.companyInfo.website}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                {cancellationData.companyInfo.website}
              </a>
            </p>
            <p className="flex flex-col sm:flex-row sm:gap-2">
              <strong className="min-w-24 inline-block">
                {cancellationDict.companyInfoLabels?.owner || "Sahibi:"}
              </strong> 
              <span>{cancellationData.companyInfo.owner}</span>
            </p>
            <p className="flex flex-col sm:flex-row sm:gap-2">
              <strong className="min-w-24 inline-block">
                {cancellationDict.companyInfoLabels?.email || "E-posta:"}
              </strong> 
              <a href={`mailto:${cancellationData.companyInfo.email}`} className="text-primary hover:underline">
                {cancellationData.companyInfo.email}
              </a>
            </p>
            <p className="flex flex-col sm:flex-row sm:gap-2">
              <strong className="min-w-24 inline-block">
                {cancellationDict.companyInfoLabels?.phone || "Telefon:"}
              </strong> 
              <a href={`tel:${cancellationData.companyInfo.phone.replace(/\s+/g, '')}`} className="text-primary hover:underline">
                {cancellationData.companyInfo.phone}
              </a>
            </p>
          </div>
        </div>
        
        {/* Bilgilendirme ve İletişim CTA */}
        <div className="mt-12 text-center">
          <Card className="p-6 mb-8 bg-accent/10 border-accent">
            <p className="text-accent-foreground font-medium mb-4">
              {cancellationDict.disclaimerText || "Bu iptal koşulları ve iade politikaları, Inn Elegance LLC ile yapılan tüm rezervasyonlar için geçerlidir. Rezervasyon yaparak bu koşulları kabul etmiş sayılırsınız."}
            </p>
            <p className="text-muted-foreground">
              {cancellationDict.disclaimerSubtext || "Lütfen rezervasyon yapmadan önce koşulları dikkatlice okuyunuz."}
            </p>
          </Card>
          
          <p className="text-muted-foreground mb-6">
            {cancellationDict.moreInfoText || "İptal koşulları ve iadeler hakkında daha fazla bilgi için bizimle iletişime geçin."}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href={`/${locale}/villa-kiralama-iletisim`} 
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              {cancellationDict.buttons?.contact || "İletişime Geçin"}
            </Link>
            <Link 
              href={`/${locale}/villalar`} 
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-md hover:bg-accent/90 transition-colors"
            >
              {cancellationDict.buttons?.viewVillas || "Villaları İncele"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
