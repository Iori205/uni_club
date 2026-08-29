import {
  BadRequestException,
  Controller,
  Inject,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import type { StorageAdapter } from './storage/storage.interface';
import { STORAGE_ADAPTER } from './storage/storage.interface';

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

/** Admin — News/Event modal-ийн `ImageUploadField`-ээс дуудагдана. Одоогоор authentication ХЭРЭГЖЭЭГҮЙ. */
@Controller('admin/uploads')
export class UploadsController {
  constructor(
    @Inject(STORAGE_ADAPTER) private readonly storage: StorageAdapter,
  ) {}

  @Post('image')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: MAX_FILE_SIZE_BYTES }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      throw new BadRequestException(
        'Зөвхөн JPG, PNG, WebP зураг оруулах боломжтой.',
      );
    }
    return this.storage.save({
      buffer: file.buffer,
      originalname: file.originalname,
      mimetype: file.mimetype,
    });
  }
}
