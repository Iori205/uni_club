import { Transform } from 'class-transformer';
import { IsEnum, IsIn, IsOptional, IsString } from 'class-validator';
import { Status } from '../../../generated/prisma/client.js';
import { PaginationQueryDto } from '../../common/pagination.dto';
import { normalizeStatus } from '../../common/status.util';

export class QueryEventDto extends PaginationQueryDto {
  @IsOptional()
  @IsString()
  q?: string;

  /** Зөвхөн public route дээр ашиглагдана (одоо байгаа `events-list-view.tsx`-ийн цагийн шүүлттэй нийцнэ). */
  @IsOptional()
  @IsIn(['upcoming', 'past'])
  when?: 'upcoming' | 'past';

  /** Зөвхөн admin route дээр ашиглагдана. Монгол/англи утга хоёуланг зөвшөөрнө. */
  @IsOptional()
  @Transform(({ value }) => normalizeStatus(value))
  @IsEnum(Status)
  status?: Status;
}
