import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { EventsAdminController } from './events.admin.controller';
import { EventsService } from './events.service';
import { UploadsModule } from '../uploads/uploads.module';

@Module({
  imports: [UploadsModule],
  controllers: [EventsController, EventsAdminController],
  providers: [EventsService],
})
export class EventsModule {}
