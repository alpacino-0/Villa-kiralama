import { getDictionary } from "../dictionaries";

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({
  params,
}: HomePageProps) {
  // Next.js 15.3.0'da params bir Promise olarak geliyor
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const dict = await getDictionary(locale);
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center flex-1 px-4 sm:px-20 text-center">
        <h1 className="text-4xl font-bold mb-6">{dict.greeting}</h1>
        <div className="mt-6">
        </div>
      </main>
    </div>
  );
} 