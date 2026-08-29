import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { QueryNewsDto } from './dto/query-news.dto';
import { ClerkAuthGuard } from '../common/clerk-auth.guard';

/** Admin — бүх status-той мэдээ, CRUD. Clerk session шаардана (`ClerkAuthGuard`). */
@UseGuards(ClerkAuthGuard)
@Controller('admin/news')
export class NewsAdminController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  findAll(@Query() query: QueryNewsDto) {
    return this.newsService.findAllAdmin(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.newsService.findOneAdmin(id);
  }

  @Post()
  create(@Body() dto: CreateNewsDto) {
    return this.newsService.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateNewsDto) {
    return this.newsService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    await this.newsService.remove(id);
  }
}
