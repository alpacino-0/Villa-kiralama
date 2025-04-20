'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle, Users, CreditCard, Info } from 'lucide-react';
import { 
  CompanyValue, 
  Statistic, 
  Testimonial, 
  FaqItem,
  SafeHtml
} from '@/components/about/AboutPageComponents';

// Veri tipi tanımlamaları
interface WhyChooseUsItem {
  title: string;
  description: string;
  icon?: string;
}

interface StatisticItem {
  value: string;
  label: string;
}

interface TestimonialItem {
  name: string;
  date: string;
  comment: string;
  rating: number;
  villaTitle?: string;
}

interface AboutFaqItem {
  question: string;
  answer: string;
}

export interface AboutPageContent {
  heroSection?: {
    title: string;
    description: string;
    imageUrl: string;
  };
  introduction: string;
  missionVision?: {
    mission: string;
    vision: string;
    values: string;
  };
  whyChooseUs?: WhyChooseUsItem[];
  statistics?: StatisticItem[];
  testimonials?: TestimonialItem[];
  faq?: AboutFaqItem[];
  [key: string]: unknown;
}

export interface PageContentData {
  id: string;
  title: string;
  slug: string;
  content: AboutPageContent | string;
  metaTitle?: string;
  metaDescription?: string;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Dictionary tipini düzenliyorum - veri yapısını genişletiyorum
interface Dictionary {
  about?: {
    metadata?: {
      title?: string;
      description?: string;
    };
    heroSection?: {
      title?: string;
      description?: string;
    };
    introduction?: string;
    mission?: string;
    vision?: string;
    values?: string;
    missionTitle?: string;
    visionTitle?: string;
    valuesTitle?: string;
    whyChooseUs?: {
      title?: string;
      items?: Array<{
        title: string;
        description: string;
        icon?: string;
      }>;
    };
    statistics?: {
      luxuryVillas?: string;
      holidayRegions?: string;
      happyCustomers?: string;
      yearsExperience?: string;
    };
    faq?: {
      title?: string;
      items?: Array<{
        question: string;
        answer: string;
      }>;
    };
  };
  common?: {
    emailAddress?: string;
    phoneNumber?: string;
    loading?: string;
    error?: string;
    success?: string;
    submit?: string;
    cancel?: string;
    back?: string;
    next?: string;
    show?: string;
    hide?: string;
    contact?: string;
  };
  footer?: {
    companyInfo?: string;
    contact?: string;
    links?: {
      contactUs?: string;
      [key: string]: string | undefined;
    };
    [key: string]: unknown;
  };
  [key: string]: unknown; // Diğer özelliklere izin ver
}

// Varsayılan içerik
const defaultContent: AboutPageContent = {
  heroSection: {
    title: "Hakkımızda",
    description: "Lüks villa kiralama konusunda Türkiye'nin önde gelen markasıyla tanışın",
    imageUrl: "/images/about-hero.jpg"
  },
  introduction: `
    <h2 class="text-2xl font-bold mb-4">Lüks Villa Tatillerinin Adresi</h2>
    <p class="mb-4">2015 yılında kurulan şirketimiz, Türkiye'nin en güzel tatil bölgelerinde lüks villa kiralama hizmeti sunmaktadır. Müşteri memnuniyetini ön planda tutan yaklaşımımızla, her detayı düşünülmüş özel havuzlu villalarımızda misafirlerimize unutulmaz tatil deneyimleri yaşatıyoruz.</p>
    <p class="mb-4">Kuruluşumuzdan bu yana, binlerce misafirimize hizmet vererek, villa tatili kavramını Türkiye'de yeni bir boyuta taşıdık. İlk günden beri hedefimiz, misafirlerimize otel konforu ve ev sıcaklığını bir arada sunan, özel ve lüks bir tatil deneyimi yaşatmak oldu.</p>
    <p>Deneyimli ekibimiz, portföyümüzdeki her villayı özenle seçmekte ve düzenli olarak denetlemektedir. Villalarımızın tümü yüksek kalite standartlarına uygun olarak donatılmış ve sizlere en konforlu tatil deneyimini sunmak için hazırlanmıştır.</p>
  `,
  missionVision: {
    mission: "Misafirlerimize unutulmaz tatil deneyimleri sunarak, lüks villa kiralama sektöründe güven ve memnuniyet standardını yükseltmek.",
    vision: "Türkiye'nin en güvenilir ve kaliteli villa kiralama markası olarak, sektörde öncü ve yenilikçi hizmetler sunmak.",
    values: "Dürüstlük, şeffaflık, müşteri memnuniyeti ve sürekli gelişim prensiplerimizle çalışarak kaliteden ödün vermemek."
  },
  whyChooseUs: [
    {
      title: "Özenle Seçilmiş Villalar",
      description: "Tüm villalarımız konfor, temizlik ve güvenlik açısından düzenli olarak denetlenmektedir.",
      icon: "/icons/quality.svg"
    },
    {
      title: "7/24 Müşteri Desteği",
      description: "Tatil sürecinde her an yanınızda olan profesyonel destek ekibimiz.",
      icon: "/icons/support.svg"
    },
    {
      title: "Güvenli Ödeme Seçenekleri",
      description: "128-bit SSL güvenlik sertifikası ile korunan ödeme altyapısı ve çoklu ödeme imkanları.",
      icon: "/icons/payment.svg"
    },
    {
      title: "Şeffaf Fiyatlandırma",
      description: "Gizli masraf olmadan, gördüğünüz fiyat ödeyeceğiniz fiyattır.",
      icon: "/icons/transparency.svg"
    }
  ],
  statistics: [
    { value: "500+", label: "Lüks Villa" },
    { value: "25+", label: "Tatil Bölgesi" },
    { value: "10.000+", label: "Mutlu Müşteri" },
    { value: "8", label: "Yıllık Tecrübe" }
  ],
  testimonials: [],
  faq: [
    {
      question: "Villa kiralarken dikkat etmemiz gereken noktalar nelerdir?",
      answer: "Villa kiralarken öncelikle konum, kapasite, fiyat ve özellikler gibi temel unsurlara dikkat etmelisiniz. Ayrıca villanın geçmiş misafir yorumlarını, iptal koşullarını ve ek hizmetlerini de incelemenizi öneririz."
    },
    {
      question: "Rezervasyon süreci nasıl işliyor?",
      answer: "Rezervasyon yapmak için sitemizden tarih ve kişi sayısı seçerek uygun villaları listeleyebilirsiniz. Beğendiğiniz villayı seçip, ödeme işlemlerini tamamladıktan sonra rezervasyon onayınız e-posta ile tarafınıza iletilir."
    },
    {
      question: "İptal politikanız nedir?",
      answer: "İptal politikamız, rezervasyon tarihinize kalan süreye göre değişiklik göstermektedir. Genel olarak, giriş tarihine 30 gün kalana kadar yapılan iptallerde tam iade yapılmaktadır. Daha detaylı bilgi için rezervasyon şartlarını inceleyebilirsiniz."
    },
    {
      question: "Ekstra hizmetler sunuyor musunuz?",
      answer: "Evet, villa kiralamalarında araç kiralama, özel şef, havaalanı transferi, tekne turu gibi ekstra hizmetler sunuyoruz. Bu hizmetleri rezervasyon sırasında veya sonrasında talep edebilirsiniz."
    }
  ]
};

// Bileşen propları için tip tanımı
interface AboutPageContentProps {
  content: PageContentData | null | AboutPageContent;
  heroImageUrl?: string;
  dictionary?: Dictionary; // Dictionary tipi ile değiştirdim
  locale?: string;  // Dil kodu
}

export default function AboutPageContent({ content, heroImageUrl, dictionary, locale }: AboutPageContentProps) {
  // İçerik yoksa veya string ise varsayılan içeriği kullan
  let pageContent: AboutPageContent;
  
  if (!content) {
    pageContent = defaultContent;
  } else if ('content' in content && typeof content.content === 'string') {
    try {
      pageContent = JSON.parse(content.content) as AboutPageContent;
    } catch {
      // Parsing başarısız olursa, içeriği introduction alanına koyarak varsayılan yapıda kullan
      pageContent = { ...defaultContent, introduction: content.content as string };
    }
  } else if ('content' in content && typeof content.content === 'object') {
    pageContent = content.content as AboutPageContent;
  } else {
    pageContent = content as AboutPageContent;
  }

  // Dışarıdan gelen hero görseli veya içerikten gelen görsel yoksa varsayılan hero görseli kullan
  const heroImage = heroImageUrl || pageContent.heroSection?.imageUrl || '/images/about-hero.jpg';
  
  // Dil sözlüğü içeriğinden değerler kullanma
  const missionTitle = dictionary?.about?.missionTitle || 'Misyonumuz';
  const visionTitle = dictionary?.about?.visionTitle || 'Vizyonumuz';
  const valuesTitle = dictionary?.about?.valuesTitle || 'Değerlerimiz';
  const whyChooseUsTitle = dictionary?.about?.whyChooseUs?.title || 'Neden Bizi Tercih Etmelisiniz?';
  const faqTitle = dictionary?.about?.faq?.title || 'Sıkça Sorulan Sorular';
  
  // İçerik sağlanmazsa veya boşsa
  const whyChooseUsItems = pageContent.whyChooseUs || dictionary?.about?.whyChooseUs?.items || [];
  const faqItems = pageContent.faq || dictionary?.about?.faq?.items || [];
  
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Bölümü */}
      <div className="relative rounded-lg overflow-hidden mb-12">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/40 z-10" />
        <Image 
          src={heroImage} 
          alt="Hakkımızda - Villa Kiralama"
          width={1200}
          height={400}
          className="object-cover w-full h-64 md:h-80"
          priority
        />
        <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-12 z-20">
          <h1 className="text-2xl md:text-4xl font-bold text-white mb-2 md:mb-4">
            {pageContent.heroSection?.title || (dictionary?.about?.heroSection?.title || "Hakkımızda")}
          </h1>
          <p className="text-white/90 max-w-2xl text-sm md:text-base">
            {pageContent.heroSection?.description || (dictionary?.about?.heroSection?.description || "Lüks villa kiralama konusunda Türkiye'nin önde gelen markasıyla tanışın")}
          </p>
        </div>
      </div>
      
      {/* Giriş & Şirket Hikayesi */}
      <div className="my-12">
        <SafeHtml html={pageContent.introduction || dictionary?.about?.introduction || ''} />
      </div>
      
      {/* Misyon, Vizyon ve Değerler */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-16">
        <CompanyValue 
          title={missionTitle} 
          description={pageContent.missionVision?.mission || dictionary?.about?.mission || "Misafirlerimize unutulmaz tatil deneyimleri sunarak, lüks villa kiralama sektöründe güven ve memnuniyet standardını yükseltmek."}
          icon="/icons/mission.svg"
        />
        <CompanyValue 
          title={visionTitle} 
          description={pageContent.missionVision?.vision || dictionary?.about?.vision || "Türkiye'nin en güvenilir ve kaliteli villa kiralama markası olarak, sektörde öncü ve yenilikçi hizmetler sunmak."}
          icon="/icons/vision.svg"
        />
        <CompanyValue 
          title={valuesTitle} 
          description={pageContent.missionVision?.values || dictionary?.about?.values || "Dürüstlük, şeffaflık, müşteri memnuniyeti ve sürekli gelişim prensiplerimizle çalışarak kaliteden ödün vermemek."}
          icon="/icons/values.svg"
        />
      </div>
      
      {/* Neden Bizi Tercih Etmelisiniz? */}
      <div className="my-16">
        <h3 className="text-xl font-bold mb-8">{whyChooseUsTitle}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {whyChooseUsItems.map((item: WhyChooseUsItem, index: number) => (
            <div key={`choose-us-${item.title || index}`} className="flex gap-4">
              <div className="flex-shrink-0 text-primary">
                {(() => {
                  switch(item.icon) {
                    case '/icons/quality.svg':
                      return <CheckCircle size={48} className="text-primary" />;
                    case '/icons/support.svg':
                      return <Users size={48} className="text-primary" />;
                    case '/icons/payment.svg':
                      return <CreditCard size={48} className="text-primary" />;
                    case '/icons/transparency.svg':
                      return <Info size={48} className="text-primary" />;
                    default:
                      return <CheckCircle size={48} className="text-primary" />;
                  }
                })()}
              </div>
              <div>
                <h4 className="font-medium mb-1">{item.title}</h4>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Şirket İstatistikleri */}
      {(pageContent.statistics || dictionary?.about?.statistics) && (
        <div className="bg-muted py-12 px-6 rounded-xl my-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {pageContent.statistics ? (
              pageContent.statistics.map((stat: StatisticItem, index: number) => (
                <Statistic key={`stat-${stat.label || index}`} value={stat.value} label={stat.label} />
              ))
            ) : (
              <>
                <Statistic value="500+" label={dictionary?.about?.statistics?.luxuryVillas || "Lüks Villa"} />
                <Statistic value="25+" label={dictionary?.about?.statistics?.holidayRegions || "Tatil Bölgesi"} />
                <Statistic value="10.000+" label={dictionary?.about?.statistics?.happyCustomers || "Mutlu Müşteri"} />
                <Statistic value="8" label={dictionary?.about?.statistics?.yearsExperience || "Yıllık Tecrübe"} />
              </>
            )}
          </div>
        </div>
      )}
      
      {/* Müşteri Yorumları */}
      {pageContent.testimonials && pageContent.testimonials.length > 0 && (
        <div className="my-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Misafir Yorumları</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pageContent.testimonials.map((testimonial) => {
              // Testimonal için benzersiz ID oluştur
              const testimonialId = `${testimonial.name}-${testimonial.date}`.replace(/\s+/g, '-').toLowerCase();
              return (
                <Testimonial 
                  key={`testimonial-${testimonialId}`}
                  name={testimonial.name}
                  date={testimonial.date}
                  comment={testimonial.comment}
                  rating={testimonial.rating}
                  villaTitle={testimonial.villaTitle}
                />
              );
            })}
          </div>
        </div>
      )}
      
      {/* SSS Bölümü */}
      {(pageContent.faq || dictionary?.about?.faq?.items) && (
        <div className="my-16">
          <h3 className="text-xl font-bold mb-8">{faqTitle}</h3>
          <div className="space-y-4">
            {faqItems.map((item: AboutFaqItem, index: number) => (
              <FaqItem 
                key={`faq-${index}`} 
                question={item.question} 
                answer={item.answer}
              />
            ))}
          </div>
        </div>
      )}
      
      {/* İletişim CTA */}
      <div className="bg-primary/10 p-8 rounded-xl text-center my-16">
        <h3 className="text-xl font-bold mb-4">{dictionary?.common?.contact || "İletişim"}</h3>
        <p className="mb-6">{dictionary?.footer?.companyInfo || "Lüks villalar ve tatil evleri konusunda güvenilir kaynağınız."}</p>
        <Button asChild>
          <Link href={`/${locale || 'tr'}/iletisim`}>
            {dictionary?.footer?.links?.contactUs || "Bize Ulaşın"}
          </Link>
        </Button>
      </div>
    </div>
  );
} 