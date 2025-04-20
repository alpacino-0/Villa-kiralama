"use client"

import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';

// FAQ türleri için tip tanımları
type FAQ = {
  question: string;
  answer: string;
};

type SectionType = {
  id: string;
  title: string;
  faqs: FAQ[];
};

// Daha fazla kullanılmayacak
interface FAQDataType {
  title: string;
  description: string;
  heroTitle: string;
  heroDescription: string;
  sections: SectionType[];
  generalFaqs: FAQ[];
}

// Dil dosyası içeriği için daha özel tip tanımları
type FooterLinks = {
  title: string;
  links: Array<{ label: string; href: string }> | Record<string, string>;
}

type FooterType = {
  description?: string;
  copyright?: string;
  links?: FooterLinks[] | Record<string, string>;
  social?: Record<string, string>;
  bottomLinks?: Array<{ label: string; href: string }>;
}

// Daha esnek ancak 'any' olmayan bir tip tanımı
type FlexibleRecord = Record<string, unknown>;

// Çoklu dil desteği için çeviri sözlüğünün tipini tanımlama
type FAQDictionary = {
  greeting?: string;
  book_now?: string;
  coming_soon?: string;
  faq: {
    metadata: {
      title: string;
      description: string;
    };
    pageTitle: string;
    heroTitle: string;
    heroDescription: string;
    searchPlaceholder: string;
    allQuestions: string;
    generalQuestions: string;
    noResultsInCategory: string;
    noResultsInCategoryWithTerm: string;
    noCategoryQuestions: string;
    noResultsFound: string;
    searchHint: {
      title: string;
      description: string;
      contactButton: string;
    };
    sections: SectionType[]; // Dil dosyasından gelen bölüm verileri
    generalFaqs: FAQ[]; // Dil dosyasından gelen genel sorular
  };
  header: {
    nav: {
      home: string;
      villas?: string;
      regions?: string;
      about?: string;
      contact?: string;
    };
    welcome?: string;
    languages?: Record<string, string>;
    languageSelection?: string;
    mobileMenu?: {
      openMenu?: string;
      closeMenu?: string;
    };
  };
  common?: {
    loading?: string;
    error?: string;
    success?: string;
    submit?: string;
    cancel?: string;
  };
  nav?: Record<string, string>;
  // Tip tanımlarını genişleterek daha esnek bir yapı oluşturma
  footer?: FooterType;
  homepage?: FlexibleRecord;
  villaDetails?: FlexibleRecord;
  villaListing?: FlexibleRecord;
  search?: FlexibleRecord;
  notFound?: FlexibleRecord;
  about?: FlexibleRecord;
  contact?: FlexibleRecord;
  privacy?: FlexibleRecord;
  [key: string]: unknown; // İndeks imzası ekleyerek herhangi bir ek alanı kabul et
};

// Bileşen prop tipini tanımlama
interface FAQSearchClientProps {
  searchPlaceholder: string;
  dictionary: FAQDictionary;
  locale: string;
  faqData?: FAQDataType; // Eski özellik, artık kullanılmıyor
}

export default function FAQSearchClient({ 
  searchPlaceholder, 
  dictionary: dict, 
  locale 
}: FAQSearchClientProps) {
  const [searchTerm, setSearchTerm] = useState('');

  // Soru metninden ID oluşturma fonksiyonu
  const createQuestionId = (question: string, index: number) => {
    const baseId = question
      .toLowerCase()
      .replace(/[^a-z0-9 ]/g, '')
      .replace(/\s+/g, '-')
      .slice(0, 20);
    
    // Boş bir ID oluşursa veya çok kısa bir ID oluşursa index ile birleştir
    return baseId.length < 3 ? `question-${index}` : baseId;
  };

  // Arama fonksiyonu - çoklu dil desteği eklenmiş
  const filterFAQs = (faqs: FAQ[]) => {
    if (!searchTerm.trim()) return faqs;
    
    const term = searchTerm.toLowerCase().trim();
    return faqs.filter(
      faq => faq.question.toLowerCase().includes(term) || 
             faq.answer.toLowerCase().includes(term)
    );
  };

  return (
    <>
      {/* Çoklu dil desteği ile arama kutusu */}
      <div className="relative max-w-lg mx-auto mb-4">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="h-5 w-5 text-muted-foreground" />
        </div>
        <Input
          type="text"
          placeholder={searchPlaceholder}
          className="pl-10 py-2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label={searchPlaceholder}
        />
      </div>

      {/* Çoklu dil desteği ile FAQ sekmeler bölümü */}
      <Tabs defaultValue="all" className="mb-12">
        <TabsList className="mb-8 flex flex-wrap justify-center gap-2">
          <TabsTrigger value="all">{dict.faq.allQuestions}</TabsTrigger>
          {dict.faq.sections.map((section) => (
            <TabsTrigger key={section.id} value={section.id}>
              {section.title}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {/* Tüm Sorular Tabı - Çoklu dil desteği ile */}
        <TabsContent value="all">
          <div className="space-y-8">
            {/* Tüm Kategoriler */}
            {dict.faq.sections.map((section) => {
              const filteredFaqs = filterFAQs(section.faqs);
              if (filteredFaqs.length === 0 && searchTerm) return null;
              
              return (
                <div key={section.id} className="mb-8">
                  <h2 className="text-2xl font-semibold mb-4 text-primary">
                    {section.title}
                  </h2>
                  <Card className="shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="pt-6">
                      <Accordion type="single" collapsible>
                        {filteredFaqs.map((faq, index) => (
                          <AccordionItem 
                            key={`${section.id}-faq-${createQuestionId(faq.question, index)}`} 
                            value={`${section.id}-faq-${createQuestionId(faq.question, index)}`}
                          >
                            <AccordionTrigger className="text-base font-medium text-primary">
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
                      {filteredFaqs.length === 0 && (
                        <p className="py-4 text-center text-muted-foreground">{dict.faq.noResultsInCategory}</p>
                      )}
                    </CardContent>
                  </Card>
                </div>
              );
            })}
            
            {/* Genel Sorular - Çoklu dil desteği ile */}
            {dict.faq.generalFaqs.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-primary">{dict.faq.generalQuestions}</h2>
                <Card className="shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <Accordion type="single" collapsible>
                      {filterFAQs(dict.faq.generalFaqs).map((faq, index) => (
                        <AccordionItem 
                          key={`general-faq-${createQuestionId(faq.question, index)}`} 
                          value={`general-faq-${createQuestionId(faq.question, index)}`}
                        >
                          <AccordionTrigger className="text-base font-medium text-primary">
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
                    {filterFAQs(dict.faq.generalFaqs).length === 0 && searchTerm && (
                      <p className="py-4 text-center text-muted-foreground">{dict.faq.noResultsInCategory}</p>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}
            
            {/* Arama sonucu mesajı - Çoklu dil desteği ile */}
            {searchTerm && 
             !dict.faq.sections.some(section => filterFAQs(section.faqs).length > 0) && 
             filterFAQs(dict.faq.generalFaqs).length === 0 && (
              <div className="text-center py-10">
                <p className="text-muted-foreground text-lg">
                  {dict.faq.noResultsFound.replace('{searchTerm}', searchTerm)}
                </p>
              </div>
            )}
          </div>
        </TabsContent>
        
        {/* Kategori Tabları - Çoklu dil desteği ile */}
        {dict.faq.sections.map((section) => {
          const filteredFaqs = filterFAQs(section.faqs);
          
          return (
            <TabsContent key={section.id} value={section.id}>
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-primary">
                  {section.title}
                </h2>
                <Card className="shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <Accordion type="single" collapsible>
                      {filteredFaqs.map((faq, index) => (
                        <AccordionItem 
                          key={`${section.id}-tab-${createQuestionId(faq.question, index)}`} 
                          value={`${section.id}-tab-${createQuestionId(faq.question, index)}`}
                        >
                          <AccordionTrigger className="text-base font-medium text-primary">
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
                    {filteredFaqs.length === 0 && (
                      <p className="py-4 text-center text-muted-foreground">
                        {searchTerm 
                          ? dict.faq.noResultsInCategoryWithTerm.replace('{searchTerm}', searchTerm)
                          : dict.faq.noCategoryQuestions
                        }
                      </p>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          );
        })}
      </Tabs>
      
      {/* İletişim İpucu Bölümü - Çoklu dil desteği ile */}
      <div className="bg-muted p-6 rounded-lg text-center">
        <h3 className="text-xl font-semibold mb-2 text-primary">{dict.faq.searchHint.title}</h3>
        <p className="text-muted-foreground mb-4">
          {dict.faq.searchHint.description}
        </p>
        <Link 
          href={`/${locale}/villa-kiralama-iletisim`} 
          className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          aria-label={dict.faq.searchHint.contactButton}
        >
          {dict.faq.searchHint.contactButton}
        </Link>
      </div>
    </>
  );
} 