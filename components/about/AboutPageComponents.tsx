'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { 
  ChevronDown, 
  Star, 
  CheckCircle, 
  Briefcase, 
  Eye,
  Heart,
  CreditCard,
  Info,
  Users
} from 'lucide-react';

// Şirket Değeri bileşeni
export function CompanyValue({ 
  title, 
  description, 
  icon 
}: { 
  title: string; 
  description: string; 
  icon: string;
}) {
  const getIconByPath = (path: string) => {
    switch(path) {
      case '/icons/mission.svg':
        return <Briefcase className="h-12 w-12 text-primary" />;
      case '/icons/vision.svg':
        return <Eye className="h-12 w-12 text-primary" />;
      case '/icons/values.svg':
        return <Heart className="h-12 w-12 text-primary" />;
      case '/icons/quality.svg':
        return <CheckCircle className="h-12 w-12 text-primary" />;
      case '/icons/payment.svg':
        return <CreditCard className="h-12 w-12 text-primary" />;
      case '/icons/transparency.svg':
        return <Info className="h-12 w-12 text-primary" />;
      case '/icons/support.svg':
        return <Users className="h-12 w-12 text-primary" />;
      default:
        return (
          <Image 
            src={icon} 
            alt={title}
            width={48}
            height={48}
            className="text-primary" 
          />
        );
    }
  };

  return (
    <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card">
      {getIconByPath(icon)}
      <h3 className="text-lg font-semibold mb-2 mt-4">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

// İstatistik bileşeni
export function Statistic({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="text-3xl font-bold text-primary mb-1">{value}</div>
      <div className="text-muted-foreground">{label}</div>
    </div>
  );
}

// Ekip Üyesi bileşeni
export function TeamMember({ 
  name, 
  title, 
  image 
}: { 
  name: string; 
  title: string; 
  image: string;
}) {
  const imageId = useMemo(() => name.replace(/\s+/g, '-').toLowerCase(), [name]);
  
  return (
    <Card className="overflow-hidden">
      <div className="aspect-square relative">
        <Image 
          src={image} 
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          id={`team-member-${imageId}`}
        />
      </div>
      <CardContent className="p-4">
        <h4 className="font-medium">{name}</h4>
        <p className="text-sm text-muted-foreground">{title}</p>
      </CardContent>
    </Card>
  );
}

// Yorum bileşeni
export function Testimonial({ 
  name, 
  date, 
  comment, 
  rating,
  villaTitle 
}: { 
  name: string; 
  date: string; 
  comment: string; 
  rating: number;
  villaTitle?: string; // Villa başlığı opsiyonel
}) {
  const testimonialId = useMemo(() => `${name}-${date}`.replace(/\s+/g, '-').toLowerCase(), [name, date]);
  
  // Yıldızları oluştur - indeks kullanmadan
  const stars = useMemo(() => {
    return Array.from({ length: 5 }).map((_, i) => ({
      id: `star-${i+1}-${testimonialId}`,
      filled: i < rating
    }));
  }, [rating, testimonialId]);
  
  return (
    <Card className="h-full">
      <CardContent className="p-6 flex flex-col h-full">
        <div className="flex mb-3">
          {stars.map((star) => (
            <Star
              key={star.id}
              className={`h-4 w-4 ${star.filled ? 'text-primary fill-primary' : 'text-muted-foreground'}`}
            />
          ))}
        </div>
        <p className="text-muted-foreground mb-4 flex-grow">{comment}</p>
        <div>
          <p className="font-medium">{name}</p>
          <div className="flex flex-col space-y-1">
            {villaTitle && (
              <p className="text-xs text-primary">
                {villaTitle} için yorum
              </p>
            )}
            <p className="text-xs text-muted-foreground">{date}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// FaqItem bileşeni (Sıkça Sorulan Sorular)
export function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const id = useMemo(() => question.substring(0, 20).replace(/\s+/g, '-'), [question]);
  
  return (
    <div className="border rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full p-4 text-left font-medium focus:outline-none"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${id}`}
        type="button"
      >
        {question}
        <ChevronDown 
          className={`ml-2 h-5 w-5 flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>
      <div 
        id={`faq-answer-${id}`}
        className={`px-4 overflow-hidden transition-all ${isOpen ? 'max-h-96 pb-4' : 'max-h-0'}`}
      >
        {answer}
      </div>
    </div>
  );
}

// Güvenli HTML içeriği bileşeni
// Not: Bu bileşen güvenilir içerik için kullanılmalıdır, kullanıcı tarafından sağlanan
// içerik için dikkatli bir şekilde sanitize edilmelidir.
export function SafeHtml({ html }: { html: string }) {
  // eslint-disable-next-line react/no-danger
  return (
    <div className="prose prose-sm md:prose-base lg:prose-lg max-w-none">
      {/* Bu, kontrollü ve sanitize edilmiş HTML içeriğini render etmek için kullanılır */}
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}

// Hakkımızda sayfası ana bileşeni
export function AboutPage({ 
  companyValues,
  statistics,
  teamMembers,
  testimonials,
  faqs,
  aboutContent,
  locale
}: { 
  companyValues: Array<{title: string; description: string; icon: string; id?: string;}>;
  statistics: Array<{value: string; label: string; id?: string;}>;
  teamMembers: Array<{name: string; title: string; image: string; id?: string;}>;
  testimonials: Array<{name: string; date: string; comment: string; rating: number; villaTitle?: string; id?: string;}>;
  faqs: Array<{question: string; answer: string; id?: string;}>;
  aboutContent: string;
  locale: string;
}) {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Firma Hakkında Genel Bilgi */}
      <section className="mb-20">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
          {locale === 'tr' ? 'Hakkımızda' : 'About Us'}
        </h1>
        <div className="max-w-3xl mx-auto">
          <SafeHtml html={aboutContent} />
        </div>
      </section>

      {/* Firma Değerleri */}
      <section className="mb-20">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
          {locale === 'tr' ? 'Değerlerimiz' : 'Our Values'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {companyValues.map((value) => (
            <CompanyValue 
              key={value.id || `value-${value.title}`}
              title={value.title}
              description={value.description}
              icon={value.icon}
            />
          ))}
        </div>
      </section>

      {/* İstatistikler */}
      <section className="mb-20 py-12 bg-muted rounded-lg">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">
            {locale === 'tr' ? 'Rakamlarla Biz' : 'Our Numbers'}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {statistics.map((stat) => (
              <Statistic 
                key={stat.id || `stat-${stat.label}`}
                value={stat.value}
                label={stat.label}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Ekibimiz */}
      <section className="mb-20">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
          {locale === 'tr' ? 'Ekibimiz' : 'Our Team'}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {teamMembers.map((member) => (
            <TeamMember 
              key={member.id || `member-${member.name.toLowerCase().replace(/\s+/g, '-')}`}
              name={member.name}
              title={member.title}
              image={member.image}
            />
          ))}
        </div>
      </section>

      {/* Müşteri Yorumları */}
      <section className="mb-20">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
          {locale === 'tr' ? 'Misafirlerimiz Ne Diyor?' : 'What Our Guests Say'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <Testimonial 
              key={testimonial.id || `testimonial-${testimonial.name}-${testimonial.date}`.replace(/\s+/g, '-').toLowerCase()}
              name={testimonial.name}
              date={testimonial.date}
              comment={testimonial.comment}
              rating={testimonial.rating}
              villaTitle={testimonial.villaTitle}
            />
          ))}
        </div>
      </section>

      {/* SSS */}
      <section className="mb-20">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
          {locale === 'tr' ? 'Sıkça Sorulan Sorular' : 'Frequently Asked Questions'}
        </h2>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq) => (
            <FaqItem 
              key={faq.id || `faq-${faq.question.substring(0, 20).replace(/\s+/g, '-')}`}
              question={faq.question}
              answer={faq.answer}
            />
          ))}
        </div>
      </section>
    </div>
  );
} 