import type { Metadata } from 'next';
import AboutPageContent from '@/components/about/AboutPageContent';

export function generateMetadata(): Metadata {
  return {
    title: 'Hakkımızda - Villa Kiralama',
    description: 'Villa kiralama hizmetlerimiz ve firmamız hakkında detaylı bilgi.',
  };
}

export default function AboutPage() {
  // Supabase'de depolanan hakkımızda görseli
  const hakkimizdaImageUrl = "https://vqulnugmkknyymjioerc.supabase.co/storage/v1/object/public/villa-kiralama/hakkimizda/hakkimizda.jpg";
  
  return (
    <main>
      <AboutPageContent 
        content={null} 
        heroImageUrl={hakkimizdaImageUrl} 
      />
    </main>
  );
} 