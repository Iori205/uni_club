import type { Provider } from '@nestjs/common';
import { LocalStorageAdapter } from './storage/local-storage.adapter';
import { S3StorageAdapter } from './storage/s3-storage.adapter';
import { SupabaseStorageAdapter } from './storage/supabase-storage.adapter';
import { STORAGE_ADAPTER } from './storage/storage.interface';

/** `STORAGE_DRIVER` env-ээр (local | s3 | supabase) идэвхтэй storage adapter-ыг сонгоно. */
export const storageProvider: Provider = {
  provide: STORAGE_ADAPTER,
  useFactory: () => {
    if (process.env.STORAGE_DRIVER === 'supabase')
      return new SupabaseStorageAdapter();
    if (process.env.STORAGE_DRIVER === 's3') return new S3StorageAdapter();
    return new LocalStorageAdapter();
  },
};
