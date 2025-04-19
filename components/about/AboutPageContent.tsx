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
  content: PageContentData | null;
  heroImageUrl?: string;
}

export default function AboutPageContent({ content, heroImageUrl }: AboutPageContentProps) {
  // İçerik yoksa veya string ise varsayılan içeriği kullan
  let pageContent: AboutPageContent;
  
  if (!content) {
    pageContent = defaultContent;
  } else if (typeof content.content === 'string') {
    try {
      pageContent = JSON.parse(content.content) as AboutPageContent;
    } catch {
      // Parsing başarısız olursa, içeriği introduction alanına koyarak varsayılan yapıda kullan
      pageContent = { ...defaultContent, introduction: content.content };
    }
  } else {
    pageContent = content.content as AboutPageContent;
  }

  // Dışarıdan gelen hero görseli veya içerikten gelen görsel yoksa varsayılan hero görseli kullan
  const heroImage = heroImageUrl || pageContent.heroSection?.imageUrl || '/images/about-hero.jpg';
  
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
            {pageContent.heroSection?.title || "Hakkımızda"}
          </h1>
          <p className="text-white/90 max-w-2xl text-sm md:text-base">
            {pageContent.heroSection?.description || "Lüks villa kiralama konusunda Türkiye'nin önde gelen markasıyla tanışın"}
          </p>
        </div>
      </div>
      
      {/* Giriş & Şirket Hikayesi */}
      <div className="my-12">
        <SafeHtml html={pageContent.introduction} />
      </div>
      
      {/* Misyon, Vizyon ve Değerler */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-16">
        <CompanyValue 
          title="Misyonumuz" 
          description={pageContent.missionVision?.mission || "Misafirlerimize unutulmaz tatil deneyimleri sunarak, lüks villa kiralama sektöründe güven ve memnuniyet standardını yükseltmek."}
          icon="/icons/mission.svg"
        />
        <CompanyValue 
          title="Vizyonumuz" 
          description={pageContent.missionVision?.vision || "Türkiye'nin en güvenilir ve kaliteli villa kiralama markası olarak, sektörde öncü ve yenilikçi hizmetler sunmak."}
          icon="/icons/vision.svg"
        />
        <CompanyValue 
          title="Değerlerimiz" 
          description={pageContent.missionVision?.values || "Dürüstlük, şeffaflık, müşteri memnuniyeti ve sürekli gelişim prensiplerimizle çalışarak kaliteden ödün vermemek."}
          icon="/icons/values.svg"
        />
      </div>
      
      {/* Neden Bizi Tercih Etmelisiniz? */}
      <div className="my-16">
        <h3 className="text-xl font-bold mb-8">Neden Bizi Tercih Etmelisiniz?</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {(pageContent.whyChooseUs || []).map((item) => (
            <div key={`choose-us-${item.title}`} className="flex gap-4">
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
      {pageContent.statistics && pageContent.statistics.length > 0 && (
        <div className="bg-muted py-12 px-6 rounded-xl my-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {pageContent.statistics.map((stat) => (
              <Statistic key={`stat-${stat.label}`} value={stat.value} label={stat.label} />
            ))}
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
      
      {/* Sıkça Sorulan Sorular */}
      {pageContent.faq && pageContent.faq.length > 0 && (
        <div className="my-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Sıkça Sorulan Sorular</h2>
          <div className="space-y-4">
            {pageContent.faq.map((item) => (
              <FaqItem 
                key={`faq-${item.question.substring(0, 20).replace(/\s+/g, '-')}`}
                question={item.question} 
                answer={item.answer}
              />
            ))}
          </div>
        </div>
      )}
      
      {/* İletişim Çağrısı */}
      <div className="bg-primary/10 rounded-xl p-8 text-center my-16">
        <h2 className="text-2xl font-bold mb-3">Hayalinizdeki Tatile Başlayın</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Sizin için en uygun villayı bulmak, özel isteklerinizi değerlendirmek veya daha fazla bilgi almak için bizimle iletişime geçin.
        </p>
        <Button 
          size="lg" 
          className="bg-primary hover:bg-primary/90 text-white"
          asChild
        >
          <Link href="/villa-kiralama-iletisim">Bize Ulaşın</Link>
        </Button>
      </div>
    </div>
  );
} 