import { randomUUID } from 'node:crypto';
import { extname } from 'node:path';
import { Injectable } from '@nestjs/common';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import type {
  StorageAdapter,
  StoredFile,
  UploadedFileInput,
} from './storage.interface';

/**
 * Prod-д зориулсан S3-compatible storage (Cloudflare R2, Supabase Storage гэх мэт).
 * Шаардлагатай env: S3_BUCKET, S3_REGION, S3_ENDPOINT (custom endpoint ашиглавал), S3_ACCESS_KEY_ID,
 * S3_SECRET_ACCESS_KEY, S3_PUBLIC_URL (буцаах URL-ийн эх — bucket public endpoint эсвэл CDN).
 */
@Injectable()
export class S3StorageAdapter implements StorageAdapter {
  private readonly client = new S3Client({
    region: process.env.S3_REGION ?? 'auto',
    endpoint: process.env.S3_ENDPOINT,
    forcePathStyle: Boolean(process.env.S3_ENDPOINT),
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY_ID ?? '',
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY ?? '',
    },
  });

  private readonly bucket = process.env.S3_BUCKET ?? '';
  private readonly publicUrl = process.env.S3_PUBLIC_URL ?? '';

  async save(file: UploadedFileInput): Promise<StoredFile> {
    const key = `${randomUUID()}${extname(file.originalname).toLowerCase()}`;
    await this.client.send(
      new PutObjectCommand({
        Bucket: this.bucket,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      }),
    );
    return { url: `${this.publicUrl.replace(/\/$/, '')}/${key}` };
  }
}
