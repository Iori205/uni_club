import { Controller, Get, Param, Query } from '@nestjs/common';
import { NewsService } from './news.service';
import { QueryNewsDto } from './dto/query-news.dto';

/** Public — зөвхөн PUBLISHED мэдээ, auth шаардахгүй. */
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  findAll(@Query() query: QueryNewsDto) {
    return this.newsService.findPublished(query);
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.newsService.findPublishedBySlug(slug);
  }
}
