import { IsOptional, IsString } from 'class-validator';
import { PaginationQueryDto } from '../../common/pagination.dto';

export class QueryMemberDto extends PaginationQueryDto {
  @IsOptional()
  @IsString()
  q?: string;
}
