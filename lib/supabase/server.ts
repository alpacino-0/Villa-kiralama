import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import type { Database } from '@/lib/supabase/client';

/**
 * Sunucu bileşenlerinde kullanılacak Supabase istemcisi
 * 
 * Next.js App Router ile kullanılmak üzere tasarlanmıştır.
 * Kimlik doğrulama işlemleri için çerezleri kullanır.
 */
export const createServerSupabaseClient = () => {
  return createServerComponentClient<Database>({
    cookies: cookies
  });
};

/**
 * Admin işlemleri için kullanılacak istemci
 * 
 * DİKKAT: Bu istemci, admin yetkilerine sahiptir ve sadece
 * sunucu tarafında kullanılmalıdır. Asla istemci tarafında kullanmayın.
 */
export const supabaseAdmin = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  
  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Supabase URL veya Service Role anahtarı tanımlanmamış');
  }
  
  return createClient<Database>(supabaseUrl, supabaseServiceKey);
}; 