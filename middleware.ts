import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { locales, defaultLocale } from './app/i18n';

// Kullanıcının tarayıcı dilinden tercih edilen dili belirle
function getLocale(request: NextRequest): string {
  const headers = new Headers(request.headers);
  const acceptLanguage = headers.get('accept-language');
  
  if (acceptLanguage) {
    headers.set('accept-language', acceptLanguage);
    // Headers tipini negotiator'a uygun şekilde dönüştür
    const negotiatorHeaders = { 'accept-language': acceptLanguage };
    const negotiator = new Negotiator({ headers: negotiatorHeaders });
    const languages = negotiator.languages();
    return matchLocale(languages, locales, defaultLocale);
  }

  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Statik dosyaları ve API rotalarını kontrol etme
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    /\.(jpg|jpeg|png|gif|svg|ico|css|js)$/.test(pathname)
  ) {
    return NextResponse.next();
  }

  // URL'de zaten dil kodu var mı diye kontrol et
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return NextResponse.next();

  // Dil kodu ekle
  const locale = getLocale(request);
  const newUrl = new URL(`/${locale}${pathname}`, request.url);
  
  return NextResponse.redirect(newUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next|api|static|.*\\.).*)',
  ],
}; 