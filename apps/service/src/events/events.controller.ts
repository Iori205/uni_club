import { Controller, Get, Param, Query } from '@nestjs/common';
import { EventsService } from './events.service';
import { QueryEventDto } from './dto/query-event.dto';

/** Public — зөвхөн PUBLISHED арга хэмжээ, auth шаардахгүй. */
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  findAll(@Query() query: QueryEventDto) {
    return this.eventsService.findPublished(query);
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.eventsService.findPublishedBySlug(slug);
  }
}
