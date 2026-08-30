import { Module } from '@nestjs/common';
import { NewsController } from './news.controller';
import { NewsAdminController } from './news.admin.controller';
import { NewsService } from './news.service';
import { UploadsModule } from '../uploads/uploads.module';

@Module({
  imports: [UploadsModule],
  controllers: [NewsController, NewsAdminController],
  providers: [NewsService],
})
export class NewsModule {}
