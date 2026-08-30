import type { StorageAdapter } from '../uploads/storage/storage.interface';

/**
 * News/Event-ийн DB мөр аль хэдийн амжилттай устгагдсан/шинэчлэгдсэн байх үед дуудагдана.
 * Storage cleanup амжилтгүй болсон ч endpoint-ийн response-д саад болгохгүй — зөвхөн log хийнэ.
 */
export async function safeDeleteImage(
  storage: StorageAdapter,
  url: string | null | undefined,
): Promise<void> {
  if (!url) return;
  try {
    await storage.delete(url);
  } catch (err) {
    console.error(`Storage image cleanup амжилтгүй (${url}):`, err);
  }
}
