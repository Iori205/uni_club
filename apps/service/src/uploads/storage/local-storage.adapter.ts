import { randomUUID } from 'node:crypto';
import { mkdir, unlink, writeFile } from 'node:fs/promises';
import { basename, extname, join } from 'node:path';
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

  async delete(url: string): Promise<void> {
    const prefix = `${this.publicUrl}/uploads/`;
    if (!url.startsWith(prefix)) return;
    // basename() зэрэгцээд "../"-ийн аль ч хэлбэрийг устгаж, uploadDir-аас гадуур файл устгахаас сэргийлнэ.
    const filename = basename(decodeURIComponent(url.slice(prefix.length)));
    if (!filename) return;
    try {
      await unlink(join(this.uploadDir, filename));
    } catch (err) {
      if ((err as NodeJS.ErrnoException).code !== 'ENOENT') throw err;
    }
  }
}
