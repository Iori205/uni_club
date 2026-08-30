import { randomUUID } from 'node:crypto';
import { extname } from 'node:path';
import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';
import type {
  StorageAdapter,
  StoredFile,
  UploadedFileInput,
} from './storage.interface';

/**
 * Prod storage — Supabase Storage (Supabase PostgreSQL-тэй ижил project).
 * Шаардлагатай env: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, SUPABASE_STORAGE_BUCKET.
 * Bucket нь Public байх ёстой (getPublicUrl нь зөвхөн public bucket дээр permanent URL буцаана).
 */
@Injectable()
export class SupabaseStorageAdapter implements StorageAdapter {
  private readonly baseUrl = (process.env.SUPABASE_URL ?? '').replace(
    /\/$/,
    '',
  );
  private readonly client = createClient(
    this.baseUrl,
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? '',
  );

  private readonly bucket = process.env.SUPABASE_STORAGE_BUCKET ?? 'uploads';
  private readonly publicPrefix = `${this.baseUrl}/storage/v1/object/public/${this.bucket}/`;

  async save(file: UploadedFileInput): Promise<StoredFile> {
    const key = `${randomUUID()}${extname(file.originalname).toLowerCase()}`;
    const { error } = await this.client.storage
      .from(this.bucket)
      .upload(key, file.buffer, {
        contentType: file.mimetype,
        upsert: false,
      });
    if (error) {
      throw new Error(`Supabase Storage upload амжилтгүй: ${error.message}`);
    }
    const {
      data: { publicUrl },
    } = this.client.storage.from(this.bucket).getPublicUrl(key);
    return { url: publicUrl };
  }

  async delete(url: string): Promise<void> {
    // Зөвхөн МАНАЙ bucket-ийн public URL-тай тохирвол устгана — өөр bucket/project эсвэл
    // external зурган URL-д ямар ч delete хүсэлт илгээхгүй.
    if (!url.startsWith(this.publicPrefix)) return;
    const key = decodeURIComponent(url.slice(this.publicPrefix.length));
    if (!key) return;
    const { error } = await this.client.storage.from(this.bucket).remove([key]);
    if (error) {
      throw new Error(`Supabase Storage delete амжилтгүй: ${error.message}`);
    }
  }
}
