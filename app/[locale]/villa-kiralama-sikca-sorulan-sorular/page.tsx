"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import faqData from './faq.json';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Breadcrumb, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbList,
  BreadcrumbSeparator 
} from '@/components/ui/breadcrumb';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { ChevronRight, HomeIcon, Search } from 'lucide-react';

type VillaKiralamaSikcaSorulanSorularProps = {
  params: Promise<{ locale: string }>;
};

type FAQ = {
  question: string;
  answer: string;
};

export default function VillaKiralamaSikcaSorulanSorular({ params }: VillaKiralamaSikcaSorulanSorularProps) {
  // React.use() ile params Promise'ini çözüyoruz
  const resolvedParams = React.use(params);
  const { locale } = resolvedParams;
  
  const [searchTerm, setSearchTerm] = useState('');

  // Soru metninden ID oluşturma fonksiyonu
  const createQuestionId = (question: string) => {
    return question
      .toLowerCase()
      .replace(/[^a-z0-9 ]/g, '')
      .replace(/\s+/g, '-')
      .slice(0, 20);
  };

  // Arama fonksiyonu
  const filterFAQs = (faqs: FAQ[]) => {
    if (!searchTerm.trim()) return faqs;
    
    const term = searchTerm.toLowerCase().trim();
    return faqs.filter(
      faq => faq.question.toLowerCase().includes(term) || 
             faq.answer.toLowerCase().includes(term)
    );
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
                  Ana Sayfa
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <span className="text-primary font-medium">Sıkça Sorulan Sorular</span>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
            {faqData.heroTitle}
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-3xl mx-auto mb-8">
            {faqData.heroDescription}
          </p>
          
          {/* Search Box */}
          <div className="relative max-w-lg mx-auto mb-4">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-5 w-5 text-muted-foreground" />
            </div>
            <Input
              type="text"
              placeholder="Sorunuzu arayın..."
              className="pl-10 py-2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        {/* FAQ Tabs Section */}
        <Tabs defaultValue="all" className="mb-12">
          <TabsList className="mb-8 flex flex-wrap justify-center gap-2">
            <TabsTrigger value="all">Tüm Sorular</TabsTrigger>
            {faqData.sections.map((section) => (
              <TabsTrigger key={section.id} value={section.id}>{section.title}</TabsTrigger>
            ))}
          </TabsList>
          
          {/* Tüm Sorular Tabı */}
          <TabsContent value="all">
            <div className="space-y-8">
              {/* Tüm Kategoriler */}
              {faqData.sections.map((section) => {
                const filteredFaqs = filterFAQs(section.faqs);
                if (filteredFaqs.length === 0 && searchTerm) return null;
                
                return (
                  <div key={section.id} className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-primary">{section.title}</h2>
                    <Card className="shadow-sm hover:shadow-md transition-shadow">
                      <CardContent className="pt-6">
                        <Accordion type="single" collapsible>
                          {filteredFaqs.map((faq) => (
                            <AccordionItem 
                              key={`${section.id}-faq-${createQuestionId(faq.question)}`} 
                              value={`${section.id}-faq-${createQuestionId(faq.question)}`}
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
                          <p className="py-4 text-center text-muted-foreground">Bu kategoride aradığınız soru bulunamadı.</p>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                );
              })}
              
              {/* Genel Sorular */}
              {faqData.generalFaqs.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold mb-4 text-primary">Genel Sorular</h2>
                  <Card className="shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="pt-6">
                      <Accordion type="single" collapsible>
                        {filterFAQs(faqData.generalFaqs).map((faq) => (
                          <AccordionItem 
                            key={`general-faq-${createQuestionId(faq.question)}`} 
                            value={`general-faq-${createQuestionId(faq.question)}`}
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
                      {filterFAQs(faqData.generalFaqs).length === 0 && searchTerm && (
                        <p className="py-4 text-center text-muted-foreground">Bu kategoride aradığınız soru bulunamadı.</p>
                      )}
                    </CardContent>
                  </Card>
                </div>
              )}
              
              {/* Arama sonucu mesajı */}
              {searchTerm && 
               !faqData.sections.some(section => filterFAQs(section.faqs).length > 0) && 
               filterFAQs(faqData.generalFaqs).length === 0 && (
                <div className="text-center py-10">
                  <p className="text-muted-foreground text-lg">
                    &ldquo;{searchTerm}&rdquo; ile ilgili hiçbir sonuç bulunamadı. Lütfen başka bir arama terimi deneyin.
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
          
          {/* Kategori Tabları */}
          {faqData.sections.map((section) => {
            const filteredFaqs = filterFAQs(section.faqs);
            
            return (
              <TabsContent key={section.id} value={section.id}>
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold mb-4 text-primary">{section.title}</h2>
                  <Card className="shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="pt-6">
                      <Accordion type="single" collapsible>
                        {filteredFaqs.map((faq) => (
                          <AccordionItem 
                            key={`${section.id}-tab-${createQuestionId(faq.question)}`} 
                            value={`${section.id}-tab-${createQuestionId(faq.question)}`}
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
                            ? `&ldquo;${searchTerm}&rdquo; ile ilgili bu kategoride sonuç bulunamadı.`
                            : "Bu kategoride henüz soru bulunmamaktadır."
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
        
        {/* Search Hint */}
        <div className="bg-muted p-6 rounded-lg text-center">
          <h3 className="text-xl font-semibold mb-2 text-primary">Aradığınızı Bulamadınız mı?</h3>
          <p className="text-muted-foreground mb-4">
            Sorunuza cevap bulamadıysanız, lütfen bizimle iletişime geçin. Size yardımcı olmaktan memnuniyet duyarız.
          </p>
          <Link 
            href={`/${locale}/villa-kiralama-iletisim`} 
            className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            İletişime Geçin
          </Link>
        </div>
      </div>
    </div>
  );
}



