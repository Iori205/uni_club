import type { Provider } from '@nestjs/common';
import { LocalStorageAdapter } from './storage/local-storage.adapter';
import { S3StorageAdapter } from './storage/s3-storage.adapter';
import { STORAGE_ADAPTER } from './storage/storage.interface';

/** `STORAGE_DRIVER` env-ээр (local | s3) идэвхтэй storage adapter-ыг сонгоно. */
export const storageProvider: Provider = {
  provide: STORAGE_ADAPTER,
  useFactory: () => {
    return process.env.STORAGE_DRIVER === 's3'
      ? new S3StorageAdapter()
      : new LocalStorageAdapter();
  },
};
