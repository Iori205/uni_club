export type UploadedFileInput = {
  buffer: Buffer;
  originalname: string;
  mimetype: string;
};

export type StoredFile = { url: string };

export interface StorageAdapter {
  save(file: UploadedFileInput): Promise<StoredFile>;
  /** `url` энэ adapter-ийн удирддаг object биш бол (өөр bucket/external URL) юу ч хийхгүй, чимээгүй буцна. */
  delete(url: string): Promise<void>;
}

export const STORAGE_ADAPTER = Symbol('STORAGE_ADAPTER');
