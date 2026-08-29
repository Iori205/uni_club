import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ContactService } from './contact.service';
import { QueryContactDto } from './dto/query-contact.dto';
import { ClerkAuthGuard } from '../common/clerk-auth.guard';

/** Admin — ирсэн хүсэлтийн жагсаалт/устгах. Clerk session шаардана (`ClerkAuthGuard`). */
@UseGuards(ClerkAuthGuard)
@Controller('admin/contact')
export class ContactAdminController {
  constructor(private readonly contactService: ContactService) {}

  @Get()
  findAll(@Query() query: QueryContactDto) {
    return this.contactService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contactService.findOne(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    await this.contactService.remove(id);
  }
}
