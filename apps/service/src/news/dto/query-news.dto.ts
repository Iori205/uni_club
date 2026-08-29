import { Transform } from 'class-transformer';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Status } from '../../../generated/prisma/client.js';
import { PaginationQueryDto } from '../../common/pagination.dto';
import { normalizeStatus } from '../../common/status.util';

export class QueryNewsDto extends PaginationQueryDto {
  @IsOptional()
  @IsString()
  q?: string;

  @IsOptional()
  @IsString()
  category?: string;

  /** Зөвхөн admin route дээр ашиглагдана — public controller үүнийг үл тоож PUBLISHED-ийг force хийнэ. Монгол/англи утга хоёуланг зөвшөөрнө. */
  @IsOptional()
  @Transform(({ value }) => normalizeStatus(value))
  @IsEnum(Status)
  status?: Status;
}
