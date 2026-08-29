import { Module } from '@nestjs/common';
import { ContactController } from './contact.controller';
import { ContactAdminController } from './contact.admin.controller';
import { ContactService } from './contact.service';

@Module({
  controllers: [ContactController, ContactAdminController],
  providers: [ContactService],
})
export class ContactModule {}
