"use client"

import React from 'react';
import Link from 'next/link';
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

type VillaKiralamaEvSahibiSozlesmesiProps = {
  params: Promise<{ locale: string }>;
};

export default function VillaKiralamaEvSahibiSozlesmesi({ params }: VillaKiralamaEvSahibiSozlesmesiProps) {
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
              <span className="text-primary font-medium">Ev Sahibi Sözleşmesi</span>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        
        {/* Hero Section */}
        <div className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <FileText className="h-16 w-16 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
            {evSahibiData.title}
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-3xl mx-auto">
            Bu sözleşme, ev sahiplerinin Inn Elegance platformu üzerinden villa kiralama hizmetlerine katılımını düzenler ve taraflar arasındaki hak ve yükümlülükleri belirler.
          </p>
        </div>
        
        {/* Sözleşme Bölümleri */}
        <div className="space-y-8">
          {evSahibiData.sections.map((section) => (
            <Card key={section.id} className="shadow-sm hover:shadow-md transition-shadow border-l-4 border-l-primary">
              <CardHeader>
                <CardTitle className="text-xl md:text-2xl text-primary">
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground text-base whitespace-pre-line">
                  {section.content}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Şirket Bilgileri */}
        <div className="mt-12 bg-muted p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-primary">Şirket Bilgileri</h2>
          <div className="space-y-3 text-foreground">
            <p className="flex flex-col sm:flex-row sm:gap-2">
              <strong className="min-w-24 inline-block">Şirket:</strong> 
              <span>{evSahibiData.companyInfo.name}</span>
            </p>
            <p className="flex flex-col sm:flex-row sm:gap-2">
              <strong className="min-w-24 inline-block">Adres:</strong> 
              <span>{evSahibiData.companyInfo.address}</span>
            </p>
            <p className="flex flex-col sm:flex-row sm:gap-2">
              <strong className="min-w-24 inline-block">Web Sitesi:</strong> 
              <a href={`https://${evSahibiData.companyInfo.website}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                {evSahibiData.companyInfo.website}
              </a>
            </p>
            <p className="flex flex-col sm:flex-row sm:gap-2">
              <strong className="min-w-24 inline-block">Sahibi:</strong> 
              <span>{evSahibiData.companyInfo.owner}</span>
            </p>
            <p className="flex flex-col sm:flex-row sm:gap-2">
              <strong className="min-w-24 inline-block">E-posta:</strong> 
              <a href={`mailto:${evSahibiData.companyInfo.email}`} className="text-primary hover:underline">
                {evSahibiData.companyInfo.email}
              </a>
            </p>
            <p className="flex flex-col sm:flex-row sm:gap-2">
              <strong className="min-w-24 inline-block">Telefon:</strong> 
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
              Bu sözleşme, villa sahibi ile Inn Elegance arasındaki yasal ilişkiyi tanımlar. Platformda mülk listelemeniz, bu sözleşme şartlarını kabul ettiğiniz anlamına gelir.
            </p>
            <p className="text-muted-foreground">
              Son Güncelleme: Ocak 2024
            </p>
          </Card>
          
          <p className="text-muted-foreground mb-6">
            Platformumuza villa eklemek veya sözleşme ile ilgili sorularınız için lütfen bizimle iletişime geçin.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href={`/${locale}/iletisim`} 
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              İletişime Geçin
            </Link>
            <Link 
              href={`/${locale}/villa-ekle`} 
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-md hover:bg-accent/90 transition-colors"
            >
              Villa Ekle
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}