'use client';

import { useState, useCallback, useMemo, type TouchEvent, memo, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Villa, VillaImage } from '@/types/villa';
import { 
  Users, 
  BedDouble, 
  Bath, 
  ChevronLeft, 
  ChevronRight, 
  MapPin, 
  InfoIcon 
} from 'lucide-react';
import { useMinimumSeasonalPrice } from '@/lib/hooks/use-seasonal-price';
import { useCoverImage } from '@/lib/hooks/use-villa-images';
import type { Locale } from '@/app/i18n';
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

// Constants
const MIN_SWIPE_DISTANCE = 50;
const MAX_INDICATOR_DOTS = 3;
const PLACEHOLDER_IMAGE = '/images/villa-placeholder.jpg';

// Dictionary tipi tanımı - FooterComponent'deki gibi yapılandırıldı
interface Dictionary {
  villaCard?: {
    misafir?: string;
    yatakOdasi?: string;
    banyo?: string;
    baslayan?: string;
    fiyatlarla?: string;
    yukleniyor?: string;
    fotoMevcut?: string;
    fiyatYukleniyor?: string;
    fiyatMevcut?: string;
    detaylariGor?: string;
    gece?: string;
    kisi?: string;
    kisilik?: string;
    yatak?: string;
    bolge?: string;
    oncekiGorsel?: string;
    sonrakiGorsel?: string;
    aktifGorsel?: string;
    gorsel?: string;
    fiyatDegisiklik?: string;
    swipeInfo?: string;
  };
  [key: string]: unknown;
}

interface VillaCardProps {
  villa: Villa;
  locale?: Locale;
  dictionary?: Dictionary;
  isDateRangeSelected?: boolean;
}

// İkon + metin özellik bileşeni
interface FeatureItemProps {
  icon: React.ReactNode;
  value: string | number;
  label: string;
}

const FeatureItem = memo(({ icon, value, label }: FeatureItemProps) => (
  <div className="flex items-center gap-1.5" title={label}>
    <span className="text-accent">{icon}</span>
    <span className="text-sm">{value} {label}</span>
  </div>
));
FeatureItem.displayName = 'FeatureItem';

// Villa özellikleri bileşeni
interface VillaFeaturesProps {
  villa: Villa;
  dictionary?: Dictionary;
}

const VillaFeatures = memo(({ villa, dictionary }: VillaFeaturesProps) => {
  // FooterComponent'teki gibi güvenli çeviri erişimi
  const kisilikText = dictionary?.villaCard?.kisilik || 'Kişilik';
  const yatakOdasiText = dictionary?.villaCard?.yatakOdasi || 'Yatak Odası';
  const banyoText = dictionary?.villaCard?.banyo || 'Banyo';

  return (
    <div className="flex items-center justify-between bg-muted/60 p-2 rounded-md text-card-foreground font-medium text-sm">
      <FeatureItem 
        icon={<Users className="w-4 h-4" />} 
        value={villa.maxGuests || 0} 
        label={kisilikText} 
      />
      <FeatureItem 
        icon={<BedDouble className="w-4 h-4" />} 
        value={villa.bedrooms || 0} 
        label={yatakOdasiText} 
      />
      <FeatureItem 
        icon={<Bath className="w-4 h-4" />} 
        value={villa.bathrooms || 0} 
        label={banyoText} 
      />
    </div>
  );
});
VillaFeatures.displayName = 'VillaFeatures';

// Fiyat görüntüleme bileşeni
interface PriceDisplayProps {
  minPrice: number | null;
  isLoading: boolean;
  isDateRangeSelected: boolean;
  dictionary?: Dictionary;
}

const PriceDisplay = memo(({ minPrice, isLoading, isDateRangeSelected, dictionary }: PriceDisplayProps) => {
  // Çeviri metinlerini güvenli bir şekilde al
  const fiyatYukleniyorText = dictionary?.villaCard?.fiyatYukleniyor || 'Fiyat yükleniyor...';
  const baslayanText = dictionary?.villaCard?.baslayan || 'den başlayan';
  const fiyatlarlaText = dictionary?.villaCard?.fiyatlarla || 'fiyatlarla';
  const geceText = dictionary?.villaCard?.gece || 'gece';
  const fiyatMevcutText = dictionary?.villaCard?.fiyatMevcut || 'Fiyat bilgisi mevcut değil';
  const fiyatDegisiklikText = dictionary?.villaCard?.fiyatDegisiklik || 'Seçilen tarihler için fiyatlar değişiklik gösterebilir.';

  return (
    <div className="font-semibold text-accent text-base">
      {isLoading ? (
        <span className="text-sm text-muted-foreground">{fiyatYukleniyorText}</span>
      ) : minPrice ? (
        <>
          {new Intl.NumberFormat('tr-TR', { 
            style: 'currency', 
            currency: 'TRY',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
          }).format(minPrice)}
          <span className="text-sm text-muted-foreground ml-1 font-medium">
            <span className="hidden sm:inline-block">{baslayanText} {fiyatlarlaText}</span>
            <span className="inline-block sm:hidden">/{geceText}</span>
          </span>
        </>
      ) : (
        <span className="text-sm text-muted-foreground">{fiyatMevcutText}</span>
      )}
      
      {isDateRangeSelected && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <InfoIcon className="w-4 h-4 ml-1 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent>
              {fiyatDegisiklikText}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
});
PriceDisplay.displayName = 'PriceDisplay';

// Resim göstergeci (indikatörler)
interface ImageIndicatorsProps {
  totalImages: number;
  activeIndex: number;
  villaId: string;
  dictionary?: Dictionary;
}

const ImageIndicators = memo(({ totalImages, activeIndex, villaId, dictionary }: ImageIndicatorsProps) => {
  if (totalImages <= 1) return null;
  
  // Çeviri metinlerini güvenli bir şekilde al
  const aktifGorselText = dictionary?.villaCard?.aktifGorsel || 'Aktif görsel grubu';
  const gorselText = dictionary?.villaCard?.gorsel || 'Görsel grubu';
  
  let totalDots = totalImages;
  if (totalDots > MAX_INDICATOR_DOTS) totalDots = MAX_INDICATOR_DOTS;
  
  // Kaçıncı grubun gösterildiğini hesapla
  const groupSize = Math.ceil(totalImages / totalDots);
  const currentGroup = Math.floor(activeIndex / groupSize);
  
  return (
    <div className="absolute bottom-2 left-0 right-0 z-10 flex justify-center gap-1.5">
      {Array.from({ length: totalDots }).map((_, index) => {
        const isActive = (index === currentGroup);
        return (
          <div 
            key={`indicator-${villaId}-${index}-${isActive ? 'active' : 'inactive'}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              isActive ? 'bg-white w-4' : 'bg-white/60 w-1.5'
            }`}
            aria-label={isActive
              ? aktifGorselText 
              : `${gorselText} ${index + 1}`}
          />
        );
      })}
    </div>
  );
});
ImageIndicators.displayName = 'ImageIndicators';

// Resim slider kontrollerini gösteren bileşen
interface ImageControlsProps {
  totalImages: number;
  onPrev: () => void;
  onNext: () => void;
  dictionary?: Dictionary;
}

const ImageControls = memo(({ totalImages, onPrev, onNext, dictionary }: ImageControlsProps) => {
  if (totalImages <= 1) return null;
  
  // Çeviri metinlerini güvenli bir şekilde al
  const oncekiGorselText = dictionary?.villaCard?.oncekiGorsel || 'Önceki görsel';
  const sonrakiGorselText = dictionary?.villaCard?.sonrakiGorsel || 'Sonraki görsel';
  
  const buttonStyles = "absolute top-1/2 -translate-y-1/2 bg-white/80 text-accent p-1 rounded-full hover:bg-accent hover:text-white transition-colors w-8 h-8 flex items-center justify-center backdrop-blur-sm border-none shadow-md z-10";
  
  return (
    <>
      <Button 
        type="button"
        variant="outline"
        size="icon"
        className={`${buttonStyles} left-2`}
        onClick={(e) => { e.preventDefault(); onPrev(); }}
        aria-label={oncekiGorselText}
      >
        <ChevronLeft size={16} />
      </Button>
      <Button 
        type="button"
        variant="outline"
        size="icon"
        className={`${buttonStyles} right-2`}
        onClick={(e) => { e.preventDefault(); onNext(); }}
        aria-label={sonrakiGorselText}
      >
        <ChevronRight size={16} />
      </Button>
    </>
  );
});
ImageControls.displayName = 'ImageControls';

// Optimize edilmiş resim bileşeni
interface OptimizedImageProps {
  src: string;
  alt: string;
  priority?: boolean;
}

const OptimizedImage = memo(({ src, alt, priority = false }: OptimizedImageProps) => {
  return (
    <div className="relative w-full h-full">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover"
        loading={priority ? "eager" : "lazy"}
        priority={priority}
        quality={80}
      />
    </div>
  );
});
OptimizedImage.displayName = 'OptimizedImage';

// Resim slider bileşeni
interface ImageSliderProps {
  images: string[];
  activeIndex: number;
  villaId: string;
  villaTitle: string;
  isLoading: boolean;
  featuredTag: string | null;
  onPrev: () => void;
  onNext: () => void;
  onTouchStart: (e: TouchEvent<HTMLDivElement>) => void;
  onTouchMove: (e: TouchEvent<HTMLDivElement>) => void;
  onTouchEnd: () => void;
  isSwiping: boolean;
  dictionary?: Dictionary;
}

const ImageSlider = memo(({ 
  images, 
  activeIndex, 
  villaId,
  villaTitle,
  isLoading, 
  featuredTag,
  onPrev,
  onNext,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
  isSwiping,
  dictionary
}: ImageSliderProps) => {
  const aspectRatioStyles = {
    aspectRatio: '4/3',
    padding: 0,
    margin: 0,
    lineHeight: 0
  };
  
  const resetTextSpacingStyles = {
    fontSize: 0
  };

  // Çeviri metinlerini güvenli bir şekilde al
  const swipeInfoText = dictionary?.villaCard?.swipeInfo || 'Villa görselleri galerisi, kaydırarak gezinebilirsiniz';
  const yukleniyorText = dictionary?.villaCard?.yukleniyor || 'Yükleniyor...';

  // Görüntüleri önceden yükle
  useEffect(() => {
    if (images.length > 1) {
      const nextIndex = (activeIndex + 1) % images.length;
      const prevIndex = (activeIndex - 1 + images.length) % images.length;
      
      const preloadImage = (src: string) => {
        const img = new globalThis.Image();
        img.src = src;
      };
      
      preloadImage(images[nextIndex]);
      preloadImage(images[prevIndex]);
    }
  }, [activeIndex, images]);
  
  return (
    <div className="relative w-full block" style={aspectRatioStyles}>
      <div 
        className={`absolute inset-0 ${isSwiping ? 'cursor-grabbing' : 'cursor-grab'} bg-muted overflow-hidden`}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        aria-label={swipeInfoText}
        aria-roledescription="slider"
        aria-valuemin={0}
        aria-valuemax={images.length - 1}
        aria-valuenow={activeIndex}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') {
            onPrev();
            e.preventDefault();
          } else if (e.key === 'ArrowRight') {
            onNext();
            e.preventDefault();
          }
        }}
        style={resetTextSpacingStyles}
      >
        <ImageIndicators 
          totalImages={images.length} 
          activeIndex={activeIndex} 
          villaId={villaId}
          dictionary={dictionary}
        />
      
        {featuredTag && (
          <div className="absolute top-3 right-3 z-10">
            <Badge className="bg-accent text-accent-foreground px-3 py-1 text-xs font-semibold">
              {featuredTag}
            </Badge>
          </div>
        )}
        
        {isLoading ? (
          <div className="absolute inset-0 bg-muted animate-pulse flex items-center justify-center">
            <span className="text-muted-foreground text-base">{yukleniyorText}</span>
          </div>
        ) : (
          <div className="absolute inset-0 transition-opacity duration-300">
            <OptimizedImage 
              src={images[activeIndex]} 
              alt={`${villaTitle} - ${activeIndex + 1}/${images.length}`}
              priority={activeIndex === 0}
            />
          </div>
        )}
        
        <ImageControls 
          totalImages={images.length} 
          onPrev={onPrev} 
          onNext={onNext}
          dictionary={dictionary}
        />
      </div>
    </div>
  );
});
ImageSlider.displayName = 'ImageSlider';

/**
 * Villa Kartı Bileşeni
 * 
 * Her bir villa için bilgileri gösteren gelişmiş kart bileşeni.
 * - Çoklu fotoğraf desteği ve kaydırma özelliği
 * - Villa etiketleri ve konum bilgisi
 * - Duyarlı ve erişilebilir arayüz
 * - Çoklu dil desteği
 */
export const VillaCard = memo(({ 
  villa, 
  locale = 'tr',
  dictionary,
  isDateRangeSelected = false
}: VillaCardProps) => {
  // State tanımlamaları
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isSwiping, setIsSwiping] = useState(false);
  
  // Data hooks
  const { data: minPrice, isLoading } = useMinimumSeasonalPrice(villa.id);
  const { data: coverImage, isLoading: isImageLoading } = useCoverImage(villa.id);
  
  // FooterComponent'teki gibi güvenli çeviri erişimi
  const bolgeText = dictionary?.villaCard?.bolge || 'Bölge';
  const detaylariGorText = dictionary?.villaCard?.detaylariGor || 'Detayları Gör';
  
  // Görsel dizisini hazırla
  const imagesArray = useMemo(() => {
    if (villa.images && Array.isArray(villa.images) && villa.images.length > 0) {
      return villa.images;
    } 
    
    if (coverImage) {
      return [coverImage];
    }
    
    return [];
  }, [villa.images, coverImage]);
  
  // Image URL'lerini hazırla
  const imageUrls = useMemo(() => {
    return imagesArray.map((img: string | VillaImage) => {
      if (typeof img === 'string') return img;
      return img.imageUrl || PLACEHOLDER_IMAGE;
    });
  }, [imagesArray]);
  
  // Eğer hiç resim yoksa placeholder kullan
  const finalImageUrls = useMemo(() => {
    return imageUrls.length > 0 ? imageUrls : [PLACEHOLDER_IMAGE];
  }, [imageUrls]);
  
  // Resim geçişi fonksiyonları
  const nextImage = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % finalImageUrls.length);
  }, [finalImageUrls.length]);
  
  const prevImage = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + finalImageUrls.length) % finalImageUrls.length);
  }, [finalImageUrls.length]);
  
  // Dokunmatik olayları
  const handleTouchStart = useCallback((e: TouchEvent<HTMLDivElement>) => {
    if (finalImageUrls.length <= 1) return; // Tek resim varsa kaydırma işlevini devre dışı bırak
    
    setTouchStart(e.targetTouches[0].clientX);
    setIsSwiping(true);
  }, [finalImageUrls.length]);

  const handleTouchMove = useCallback((e: TouchEvent<HTMLDivElement>) => {
    if (!touchStart || finalImageUrls.length <= 1) return;
    
    setTouchEnd(e.targetTouches[0].clientX);
  }, [touchStart, finalImageUrls.length]);

  const handleTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd || finalImageUrls.length <= 1) {
      setIsSwiping(false);
      return;
    }
    
    const distance = touchStart - touchEnd;
    
    if (distance > MIN_SWIPE_DISTANCE) {
      // Sola kaydırma (sonraki resim)
      nextImage();
    } else if (distance < -MIN_SWIPE_DISTANCE) {
      // Sağa kaydırma (önceki resim)
      prevImage();
    }
    
    // Dokunmatik değerlerini sıfırla
    setTouchStart(null);
    setTouchEnd(null);
    setIsSwiping(false);
  }, [touchStart, touchEnd, finalImageUrls.length, nextImage, prevImage]);

  // Villa etiketlerini al
  const tags = useMemo(() => {
    if (!Array.isArray(villa.tags) || villa.tags.length === 0) return [];
    
    // String olarak etiketler
    if (typeof villa.tags[0] === 'string') {
      return villa.tags as string[];
    }
    
    // VillaTag.Tag formatını kontrol et (güncellenen veritabanı yapısı)
    const firstTag = villa.tags[0] as unknown;
    if (firstTag && typeof firstTag === 'object' && 'Tag' in (firstTag as Record<string, unknown>)) {
      return (villa.tags as unknown as Array<{Tag: {name: string}}>).map(tag => tag.Tag?.name || '');
    }
    
    // VillaTag formatını kontrol et
    return (villa.tags as unknown as Array<{name: string}>).map(tag => 
      typeof tag === 'string' ? tag : tag.name || ''
    );
  }, [villa.tags]);
  
  // Öne çıkan tag (varsa ilk tag)
  const featuredTag = useMemo(() => {
    return tags.length > 0 ? tags[0] : null;
  }, [tags]);
  
  const zeroPaddingStyles = { lineHeight: 0, fontSize: 0 };
  
  return (
    <Card className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 bg-card border-border shadow-sm h-full p-0">
      {/* Resim slider */}
      <div className="w-full overflow-hidden p-0 m-0" style={zeroPaddingStyles}>
        <ImageSlider 
          images={finalImageUrls}
          activeIndex={activeIndex}
          villaId={villa.id}
          villaTitle={villa.title}
          isLoading={isImageLoading}
          featuredTag={featuredTag}
          onPrev={prevImage}
          onNext={nextImage}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          isSwiping={isSwiping}
          dictionary={dictionary}
        />
      </div>
      
      <div className="flex flex-col flex-grow justify-between">
        <div>
          <CardHeader className="px-3 py-2 pt-2.5 pb-1">
            {/* Villa adı ve bölge bilgisi */}
            <CardTitle className="text-xl font-semibold text-card-foreground mb-0.5 line-clamp-1 font-montserrat">
              {villa.title}
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground font-medium font-nunito flex items-center">
              <MapPin size={14} className="text-accent mr-1.5 flex-shrink-0" />
              <span className="truncate">
                {villa.mainRegion && villa.subRegion 
                  ? `${villa.mainRegion}, ${villa.subRegion}`
                  : villa.mainRegion || villa.subRegion || bolgeText}
              </span>
            </CardDescription>
          </CardHeader>
          
          <CardContent className="px-3 pt-0 pb-2">
            {/* Özellikler - tek satırda */}
            <VillaFeatures villa={villa} dictionary={dictionary} />
          </CardContent>
        </div>
         
        <CardFooter className="px-3 py-2 flex items-center justify-between border-t border-border mt-1">
          <PriceDisplay 
            minPrice={minPrice ?? null} 
            isLoading={isLoading}
            isDateRangeSelected={isDateRangeSelected}
            dictionary={dictionary}
          />
          
          <Button 
            asChild
            variant="default"
            size="sm"
            className="bg-accent hover:bg-accent/90 text-accent-foreground py-1.5 px-3.5 rounded text-sm font-medium transition-colors h-8"
          >
            <Link href={`/${locale}/villa-kiralama/${villa.slug}`}>
              {detaylariGorText}
            </Link>
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
});
VillaCard.displayName = 'VillaCard';
