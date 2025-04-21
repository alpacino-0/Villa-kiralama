import { getDictionary } from "../dictionaries";
import type { Metadata } from "next";
import { defaultMetadata } from "../metadata";
import { DotPattern } from "@/components/dot-pattern-1";

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

// Sayfa için metadata oluşturma
export const metadata: Metadata = {
  ...defaultMetadata,
};

export default async function HomePage({
  params,
}: HomePageProps) {
  // Next.js 15.3.0'da params bir Promise olarak geliyor
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const dict = await getDictionary(locale);
  
  // Dinamik olarak metadata oluşturamıyoruz, bu nedenle temel içerikleri sayfa içeriklerinde gösteriyoruz
  
  return (
    <>
      {/* Added mt-* classes here to create space above this div */}
      <div className="mx-auto mb-10 mt-10 max-w-7xl px-6 md:mb-20 md:mt-16 xl:px-0 lg:mt-20">
        <div className="relative flex flex-col items-center border border-secondary">
          <DotPattern width={5} height={5} />

          <div className="absolute -left-1.5 -top-1.5 h-3 w-3 bg-primary text-white" />
          <div className="absolute -bottom-1.5 -left-1.5 h-3 w-3 bg-primary text-white" />
          <div className="absolute -right-1.5 -top-1.5 h-3 w-3 bg-primary text-white" />
          <div className="absolute -bottom-1.5 -right-1.5 h-3 w-3 bg-primary text-white" />

          <div className="relative z-20 mx-auto max-w-7xl rounded-[40px] py-6 md:p-10 xl:py-20">
            <p className="md:text-md text-xs text-primary lg:text-lg xl:text-2xl">
              {dict.greeting}
            </p>
            <div className="text-2xl tracking-tighter md:text-5xl lg:text-7xl xl:text-8xl">
              <div className="flex gap-1 md:gap-2 lg:gap-3 xl:gap-4">
                <h1 className="font-semibold">&quot;{dict.coming_soon}&quot;</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </> 
  );
}     