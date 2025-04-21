import { notFound } from "next/navigation";
import VillaHeader from "@/components/villa-kiralama/slug/VillaHeader";
import VillaGallery from "@/components/villa-kiralama/slug/VillaGallery";
import ContentContainer from "@/components/villa-kiralama/slug/ContentContainer";
import { supabase } from "@/lib/supabase/client";
import type { Villa, VillaAmenity } from "@/types/villa";

// Villa detay sayfası - Supabase'den veri çeken server component
export default async function VillaDetailPage({ 
  params 
}: { 
  params: Promise<{ slug: string; locale: string }> 
}) {
  // Next.js 15'te params parametresi bir Promise, await kullanarak değerlerini almalıyız
  const { slug, locale } = await params;
  
  console.log(`DEBUG - Villa detay sayfası yükleniyor: Slug=${slug}, Locale=${locale}`);
  
  if (!slug) {
    console.log(`DEBUG - Slug değeri bulunamadı`);
    notFound();
  }
  
  // Supabase'den villa verisini getir
  console.log(`DEBUG - Supabase'den veri çekiliyor: slug=${slug}`);
  
  // Villa-images ilişkisi sorunu için query'yi düzelttik
  const { data: villa, error } = await supabase
    .from('Villa')
    .select('*')
    .eq('slug', slug)
    .single();
  
  console.log(`DEBUG - Sorgu sonucu: error=${error?.message || 'yok'}, villa=${villa ? 'bulundu' : 'bulunamadı'}`);
  
  // Hata durumunda veya villa bulunamadıysa 404 sayfasına yönlendir
  if (error || !villa) {
    console.log(`DEBUG - Villa bulunamadı veya hata oluştu: ${error?.message || 'bilinmeyen hata'}`);
    notFound();
  }
  
  console.log(`DEBUG - Villa bulundu: ${villa.title}, ID=${villa.id}`);
  
  // Görsel verilerini ayrı bir sorgu ile al
  let villaImages = [];
  try {
    const { data: images } = await supabase
      .from('VillaImage')
      .select('*')
      .eq('villaId', villa.id);
    
    if (images && images.length > 0) {
      villaImages = images;
      console.log(`DEBUG - Villa görselleri bulundu: ${images.length} adet`);
    }
  } catch (imageError) {
    console.log(`DEBUG - Villa görselleri alınırken hata: ${imageError}`);
  }
  
  // Olanakları (amenities) ayrı bir sorgu ile al
  let villaAmenities: VillaAmenity[] = [];
  try {
    const { data: amenities, error: amenitiesError } = await supabase
      .from('VillaAmenity')
      .select('*')
      .eq('villaId', villa.id);
    
    if (amenitiesError) {
      console.log(`DEBUG - Villa olanakları alınırken hata: ${amenitiesError.message}`);
    } else if (amenities && amenities.length > 0) {
      villaAmenities = amenities;
      console.log(`DEBUG - Villa olanakları bulundu: ${amenities.length} adet`);
    }
  } catch (amenitiesError) {
    console.log(`DEBUG - Villa olanakları alınırken hata:`, amenitiesError);
  }
  
  // Villa nesnesine görüntüleri ve olanakları ekle
  const villaWithData = {
    ...villa,
    images: villaImages,
    amenities: villaAmenities
  };
  
  // Debug: Doğrulanmış villa ID'sini loglama
  console.log(`DEBUG - Doğrulanmış villa bilgisi: ID=${villaWithData.id}, Title=${villaWithData.title}`);
  
  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-3 sm:py-4 md:py-6 space-y-3 sm:space-y-4 md:space-y-6">
      
      {/* Villa Başlık Bileşeni */}
      <VillaHeader title={villa.title} villa={villaWithData as Villa} />
         
      {/* Villa Galeri Bileşeni */}
      <VillaGallery images={villaImages} />
          
      {/* Villa İçerik Konteyneri */}
      <ContentContainer villa={villaWithData} />
    </div>
  );
}