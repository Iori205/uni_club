import { Module } from '@nestjs/common';
import { NewsController } from './news.controller';
import { NewsAdminController } from './news.admin.controller';
import { NewsService } from './news.service';

@Module({
  controllers: [NewsController, NewsAdminController],
  providers: [NewsService],
})
export class NewsModule {}
