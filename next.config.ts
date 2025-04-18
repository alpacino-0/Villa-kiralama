import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // swcMinify: true, // Next.js 15'de gerekli değil, varsayılan olarak etkinleştirilmiş
  i18n: undefined, // App Router'da i18n artık buradan yapılandırılmıyor
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'vqulnugmkknyymjioerc.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

export default nextConfig;
