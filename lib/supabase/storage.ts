import { supabase } from './client';

/**
 * Dosya yükleme
 * 
 * @param file - Yüklenecek dosya
 * @param bucket - Bucket adı
 * @param path - Dosya yolu (klasör, opsiyonel)
 * @returns Dosya URL'si
 */
export async function uploadFile(
  file: File,
  bucket = 'villa-images',
  path?: string
): Promise<string> {
  // Benzersiz dosya adı oluştur
  const fileName = `${Date.now()}_${file.name.replace(/\s+/g, '_')}`;
  const filePath = path ? `${path}/${fileName}` : fileName;

  const { error } = await supabase.storage.from(bucket).upload(filePath, file, {
    cacheControl: '3600',
    upsert: false,
  });

  if (error) {
    console.error('Dosya yüklenirken hata oluştu:', error);
    throw error;
  }

  // Yüklenen dosyanın URL'sini al
  const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
  return data.publicUrl;
}

/**
 * Birden fazla dosya yükleme
 * 
 * @param files - Yüklenecek dosyalar
 * @param bucket - Bucket adı
 * @param path - Dosya yolu (klasör, opsiyonel)
 * @returns Dosya URL'leri
 */
export async function uploadMultipleFiles(
  files: File[],
  bucket = 'villa-images',
  path?: string
): Promise<string[]> {
  const uploadPromises = files.map(file => uploadFile(file, bucket, path));
  return Promise.all(uploadPromises);
}

/**
 * Dosya silme
 * 
 * @param filePath - Silinecek dosya yolu
 * @param bucket - Bucket adı
 */
export async function deleteFile(
  filePath: string,
  bucket = 'villa-images'
): Promise<void> {
  const { error } = await supabase.storage.from(bucket).remove([filePath]);

  if (error) {
    console.error('Dosya silinirken hata oluştu:', error);
    throw error;
  }
}

/**
 * Bucket içindeki dosyaları listeleme
 * 
 * @param bucket - Bucket adı
 * @param path - Klasör yolu (opsiyonel)
 * @returns Dosya listesi
 */
export async function listFiles(bucket = 'villa-images', path?: string) {
  const { data, error } = await supabase.storage.from(bucket).list(path || '');

  if (error) {
    console.error('Dosyalar listelenirken hata oluştu:', error);
    throw error;
  }

  return data;
}

/**
 * Bucket oluşturma
 * 
 * @param bucketName - Bucket adı
 * @param isPublic - Public mi?
 */
export async function createBucket(bucketName: string, isPublic = false) {
  const { error } = await supabase.storage.createBucket(bucketName, {
    public: isPublic,
  });

  if (error) {
    console.error('Bucket oluşturulurken hata oluştu:', error);
    throw error;
  }
}

/**
 * Dosya URL'si oluşturma
 * 
 * @param filePath - Dosya yolu
 * @param bucket - Bucket adı
 * @returns Dosya URL'si
 */
export function getFileUrl(filePath: string, bucket = 'villa-images'): string {
  const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
  return data.publicUrl;
} 