export type UploadedFileInput = {
  buffer: Buffer;
  originalname: string;
  mimetype: string;
};

export type StoredFile = { url: string };

export interface StorageAdapter {
  save(file: UploadedFileInput): Promise<StoredFile>;
}

export const STORAGE_ADAPTER = Symbol('STORAGE_ADAPTER');
