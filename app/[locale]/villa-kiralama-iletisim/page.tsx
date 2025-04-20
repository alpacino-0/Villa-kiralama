import React from 'react';
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";
import FAQSection from "@/components/contact/FAQSection";
import { BreadcrumbWithTranslation } from '@/components/ui/breadcrumb';
import { HomeIcon } from 'lucide-react';
import { getDictionary } from "@/app/dictionaries";
import { Locale, locales } from "@/app/i18n";

// Sayfa prop tipi - Next.js 15.3.0 için params Promise olarak geliyor
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
    title: dict.contact.metadata.title,
    description: dict.contact.metadata.description,
  };
}

export default async function VillaKiralamaIletisim({ params }: PageProps) {
  // Params bir Promise olduğu için çözümlenmesi gerekiyor
  const resolvedParams = await params;
  // Dil kontrolü ve sözlük yükleme
  const locale = locales.includes(resolvedParams.locale as Locale) ? resolvedParams.locale : 'tr';
  const dict = await getDictionary(locale);
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        {/* Çoklu dil desteği ile breadcrumb ekliyoruz */}
        <BreadcrumbWithTranslation 
          className="mb-6"
          locale={locale}
          homeLabel={dict.header.nav.home}
          homeIcon={<HomeIcon className="h-4 w-4" />}
          items={[
            {
              label: dict.contact.pageTitle,
              href: `/${locale}/villa-kiralama-iletisim`,
              isCurrent: true
            }
          ]}
        />

        <h1 className="text-4xl font-bold mb-6 text-primary">{dict.contact.pageTitle}</h1>
        <p className="text-muted-foreground mb-10 text-lg">
          {dict.contact.pageDescription}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <ContactForm 
              title={dict.contact.contactForm.title}
              description={dict.contact.contactForm.description}
              buttonText={dict.contact.contactForm.submitButton}
              nameLabel={dict.contact.contactForm.nameLabel}
              namePlaceholder={dict.contact.contactForm.namePlaceholder}
              emailLabel={dict.contact.contactForm.emailLabel}
              emailPlaceholder={dict.contact.contactForm.emailPlaceholder}
              phoneLabel={dict.contact.contactForm.phoneLabel}
              phonePlaceholder={dict.contact.contactForm.phonePlaceholder}
              subjectLabel={dict.contact.contactForm.subjectLabel}
              subjectPlaceholder={dict.contact.contactForm.subjectPlaceholder}
              messageLabel={dict.contact.contactForm.messageLabel}
              messagePlaceholder={dict.contact.contactForm.messagePlaceholder}
            />
          </div>
          <div>
            <ContactInfo 
              title={dict.contact.contactInfo.title}
              description={dict.contact.contactInfo.description}
              address={dict.contact.contactInfo.address}
              phone={dict.contact.contactInfo.phone}
              email={dict.contact.contactInfo.email}
              workingHours={{
                weekdays: dict.contact.contactInfo.workingHours,
                saturday: dict.contact.contactInfo.workingHours,
                sunday: dict.contact.contactInfo.workingHours
              }}
              addressTitle={dict.contact.contactInfo.addressTitle}
              phoneTitle={dict.contact.contactInfo.phoneTitle}
              emailTitle={dict.contact.contactInfo.emailTitle}
              workingHoursTitle={dict.contact.contactInfo.workingHoursTitle}
            />
          </div>
        </div>

        <div className="mt-12 rounded-lg overflow-hidden h-[400px] border border-border">
          <iframe 
            title={dict.contact.mapTitle}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3010.278134989809!2d29.031862!3d41.015908!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDAwJzU3LjMiTiAyOcKwMDEnNTQuNyJF!5e0!3m2!1str!2str!4v1654241542016!5m2!1str!2str" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={true} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <FAQSection 
          title={dict.contact.faq.title}
          faqs={dict.contact.faq.items}
        />
      </div>
    </div>
  );
}

