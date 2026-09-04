import { Controller, Get, Query } from '@nestjs/common';
import { MembersService } from './members.service';
import { QueryMemberDto } from './dto/query-member.dto';

/** Public — Удирдах зөвлөлийн гишүүдийн жагсаалт, auth шаардахгүй. */
@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Get()
  findAll(@Query() query: QueryMemberDto) {
    return this.membersService.findAllPublic(query);
  }
}
