import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Breadcrumb, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbList,
  BreadcrumbSeparator 
} from '@/components/ui/breadcrumb';
import { ChevronRight, HomeIcon, ShieldCheck } from 'lucide-react';
import { getDictionary } from "@/app/dictionaries";
import type { Locale } from '@/app/i18n';
import { locales } from '@/app/i18n';
import type { Metadata } from 'next';

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
  // Dil parametresini güvenli bir şekilde alma
  const localeParam = resolvedParams?.locale || 'tr';
  // Dil sözlüğünü al
  const dict = await getDictionary(localeParam);

  return {
    title: dict.privacy.metadata.title,
    description: dict.privacy.metadata.description,
  };
}

export default async function VillaKiralamaGizlilikSartlari({
  params,
}: PageProps) {
  // Params bir Promise olduğu için çözümlenmesi gerekiyor
  const resolvedParams = await params;
  // Dil parametresini güvenli bir şekilde alma
  const localeParam = resolvedParams?.locale || 'tr';
  // Dil kontrolü ve sözlük yükleme
  const locale = locales.includes(localeParam as Locale) ? localeParam as Locale : 'tr';
  const dict = await getDictionary(locale);

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
                  {dict.privacy.breadcrumb.home}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <span className="text-primary font-medium">{dict.privacy.breadcrumb.privacy}</span>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        
        {/* Hero Section */}
        <div className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <ShieldCheck className="h-16 w-16 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
            {dict.privacy.pageTitle}
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-3xl mx-auto">
            {dict.privacy.pageDescription}
          </p>
        </div>
        
        {/* Gizlilik Bölümleri */}
        <div className="space-y-8">
          {dict.privacy.sections.map((section) => (
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
          <h2 className="text-2xl font-semibold mb-4 text-primary">{dict.privacy.companyInfo.title}</h2>
          <div className="space-y-3 text-foreground">
            <p className="flex flex-col sm:flex-row sm:gap-2">
              <strong className="min-w-24 inline-block">{dict.privacy.companyInfo.labels.company}:</strong> 
              <span>{dict.privacy.companyInfo.name}</span>
            </p>
            <p className="flex flex-col sm:flex-row sm:gap-2">
              <strong className="min-w-24 inline-block">{dict.privacy.companyInfo.labels.address}:</strong> 
              <span>{dict.privacy.companyInfo.address}</span>
            </p>
            <p className="flex flex-col sm:flex-row sm:gap-2">
              <strong className="min-w-24 inline-block">{dict.privacy.companyInfo.labels.website}:</strong> 
              <a href={`https://${dict.privacy.companyInfo.website}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                {dict.privacy.companyInfo.website}
              </a>
            </p>
            <p className="flex flex-col sm:flex-row sm:gap-2">
              <strong className="min-w-24 inline-block">{dict.privacy.companyInfo.labels.owner}:</strong> 
              <span>{dict.privacy.companyInfo.owner}</span>
            </p>
            <p className="flex flex-col sm:flex-row sm:gap-2">
              <strong className="min-w-24 inline-block">{dict.privacy.companyInfo.labels.email}:</strong> 
              <a href={`mailto:${dict.privacy.companyInfo.email}`} className="text-primary hover:underline">
                {dict.privacy.companyInfo.email}
              </a>
            </p>
            <p className="flex flex-col sm:flex-row sm:gap-2">
              <strong className="min-w-24 inline-block">{dict.privacy.companyInfo.labels.phone}:</strong> 
              <a href={`tel:${dict.privacy.companyInfo.phone.replace(/\s+/g, '')}`} className="text-primary hover:underline">
                {dict.privacy.companyInfo.phone}
              </a>
            </p>
          </div>
        </div>
        
        {/* Son Güncelleme ve İletişim CTA */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            {dict.privacy.lastUpdate}
          </p>
          <p className="text-muted-foreground mb-6">
            {dict.privacy.contactCTA.text}
          </p>
          <Link 
            href={`/${locale}/villa-kiralama-iletisim`} 
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            {dict.privacy.contactCTA.button}
          </Link>
        </div>
      </div>
    </div>
  );
}