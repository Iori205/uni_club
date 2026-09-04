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
import { MembersService } from './members.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { QueryMemberDto } from './dto/query-member.dto';
import { ClerkAuthGuard } from '../common/clerk-auth.guard';

/** Admin — Удирдах зөвлөлийн гишүүдийн CRUD. Clerk session шаардана (`ClerkAuthGuard`). */
@UseGuards(ClerkAuthGuard)
@Controller('admin/members')
export class MembersAdminController {
  constructor(private readonly membersService: MembersService) {}

  @Get()
  findAll(@Query() query: QueryMemberDto) {
    return this.membersService.findAllAdmin(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.membersService.findOneAdmin(id);
  }

  @Post()
  create(@Body() dto: CreateMemberDto) {
    return this.membersService.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateMemberDto) {
    return this.membersService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    await this.membersService.remove(id);
  }
}
