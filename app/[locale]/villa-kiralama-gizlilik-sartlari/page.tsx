"use client"

import React from 'react';
import Link from 'next/link';
import gizlilikData from './gizlilik-sartlari.json';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Breadcrumb, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbList,
  BreadcrumbSeparator 
} from '@/components/ui/breadcrumb';
import { ChevronRight, HomeIcon, ShieldCheck } from 'lucide-react';

type VillaKiralamaGizlilikSartlariProps = {
  params: Promise<{ locale: string }>;
};

export default function VillaKiralamaGizlilikSartlari({ params }: VillaKiralamaGizlilikSartlariProps) {
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
              <span className="text-primary font-medium">Gizlilik Şartları</span>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        
        {/* Hero Section */}
        <div className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <ShieldCheck className="h-16 w-16 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
            {gizlilikData.title}
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-3xl mx-auto">
            Kişisel verilerinizin güvenliği ve gizliliği bizim için önemlidir. Bu sayfada, sizinle ilgili bilgileri nasıl topladığımızı ve kullandığımızı öğrenebilirsiniz.
          </p>
        </div>
        
        {/* Gizlilik Bölümleri */}
        <div className="space-y-8">
          {gizlilikData.sections.map((section) => (
            <Card key={section.id} className="shadow-sm hover:shadow-md transition-shadow">
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
              <span>{gizlilikData.companyInfo.name}</span>
            </p>
            <p className="flex flex-col sm:flex-row sm:gap-2">
              <strong className="min-w-24 inline-block">Adres:</strong> 
              <span>{gizlilikData.companyInfo.address}</span>
            </p>
            <p className="flex flex-col sm:flex-row sm:gap-2">
              <strong className="min-w-24 inline-block">Web Sitesi:</strong> 
              <a href={`https://${gizlilikData.companyInfo.website}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                {gizlilikData.companyInfo.website}
              </a>
            </p>
            <p className="flex flex-col sm:flex-row sm:gap-2">
              <strong className="min-w-24 inline-block">Sahibi:</strong> 
              <span>{gizlilikData.companyInfo.owner}</span>
            </p>
            <p className="flex flex-col sm:flex-row sm:gap-2">
              <strong className="min-w-24 inline-block">E-posta:</strong> 
              <a href={`mailto:${gizlilikData.companyInfo.email}`} className="text-primary hover:underline">
                {gizlilikData.companyInfo.email}
              </a>
            </p>
            <p className="flex flex-col sm:flex-row sm:gap-2">
              <strong className="min-w-24 inline-block">Telefon:</strong> 
              <a href={`tel:${gizlilikData.companyInfo.phone.replace(/\s+/g, '')}`} className="text-primary hover:underline">
                {gizlilikData.companyInfo.phone}
              </a>
            </p>
          </div>
        </div>
        
        {/* Son Güncelleme ve İletişim CTA */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            Bu gizlilik politikası son olarak Haziran 2023 tarihinde güncellenmiştir.
          </p>
          <p className="text-muted-foreground mb-6">
            Gizlilik politikamız hakkında sorularınız varsa, lütfen bizimle iletişime geçin.
          </p>
          <Link 
            href={`/${locale}/villa-kiralama-iletisim`} 
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            İletişime Geçin
          </Link>
        </div>
      </div>
    </div>
  );
}