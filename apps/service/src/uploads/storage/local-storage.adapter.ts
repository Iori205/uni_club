import { randomUUID } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import { extname, join } from 'node:path';
import { Injectable } from '@nestjs/common';
import type {
  StorageAdapter,
  StoredFile,
  UploadedFileInput,
} from './storage.interface';

/** Dev үеийн storage — файлыг `UPLOAD_DIR`-д бичиж, `main.ts`-ийн static serve-ээр /uploads/* дор нээлттэй болгоно. */
@Injectable()
export class LocalStorageAdapter implements StorageAdapter {
  private readonly uploadDir = process.env.UPLOAD_DIR ?? './uploads';
  private readonly publicUrl =
    process.env.PUBLIC_URL ?? `http://localhost:${process.env.PORT ?? 3000}`;

  async save(file: UploadedFileInput): Promise<StoredFile> {
    await mkdir(this.uploadDir, { recursive: true });
    const filename = `${randomUUID()}${extname(file.originalname).toLowerCase()}`;
    await writeFile(join(this.uploadDir, filename), file.buffer);
    return { url: `${this.publicUrl}/uploads/${filename}` };
  }
}
