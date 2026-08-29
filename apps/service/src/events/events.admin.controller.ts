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
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { QueryEventDto } from './dto/query-event.dto';
import { ClerkAuthGuard } from '../common/clerk-auth.guard';

/** Admin — бүх status-той арга хэмжээ, CRUD. Clerk session шаардана (`ClerkAuthGuard`). */
@UseGuards(ClerkAuthGuard)
@Controller('admin/events')
export class EventsAdminController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  findAll(@Query() query: QueryEventDto) {
    return this.eventsService.findAllAdmin(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventsService.findOneAdmin(id);
  }

  @Post()
  create(@Body() dto: CreateEventDto) {
    return this.eventsService.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateEventDto) {
    return this.eventsService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    await this.eventsService.remove(id);
  }
}
