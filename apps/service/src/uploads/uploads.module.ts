import { Module } from '@nestjs/common';
import { UploadsController } from './uploads.controller';
import { storageProvider } from './storage.provider';

@Module({
  controllers: [UploadsController],
  providers: [storageProvider],
})
export class UploadsModule {}
