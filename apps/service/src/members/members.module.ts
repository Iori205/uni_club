import { Module } from '@nestjs/common';
import { MembersController } from './members.controller';
import { MembersAdminController } from './members.admin.controller';
import { MembersService } from './members.service';
import { UploadsModule } from '../uploads/uploads.module';

@Module({
  imports: [UploadsModule],
  controllers: [MembersController, MembersAdminController],
  providers: [MembersService],
})
export class MembersModule {}
