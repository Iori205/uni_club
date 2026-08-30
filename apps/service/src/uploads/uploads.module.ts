import { Module } from '@nestjs/common';
import { UploadsController } from './uploads.controller';
import { storageProvider } from './storage.provider';

@Module({
  controllers: [UploadsController],
  providers: [storageProvider],
  exports: [storageProvider],
})
export class UploadsModule {}
