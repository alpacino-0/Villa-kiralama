import { redirect } from 'next/navigation';
import { defaultLocale } from './i18n';

/**
 * Root Page
 * 
 * Bu sayfa, uygulamanın kök adresi ziyaret edildiğinde çalışır
 * ve kullanıcıyı varsayılan dile yönlendirir.
 */
export default function RootPage() {
  // Kullanıcıyı varsayılan dil sayfasına yönlendir
  redirect(`/${defaultLocale}`);
} 