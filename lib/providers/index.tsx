'use client';

import type { ReactNode } from 'react';
import { ReactQueryProvider } from './react-query-provider';

type ProvidersProps = {
  children: ReactNode;
};

/**
 * Providers
 * 
 * Tüm uygulama sağlayıcılarını bir araya getiren bileşen.
 * Yeni sağlayıcılar eklemek için bu bileşeni güncelleyin.
 */
export function Providers({ children }: ProvidersProps) {
  return (
    <ReactQueryProvider>
      {children}
    </ReactQueryProvider>
  );
} 