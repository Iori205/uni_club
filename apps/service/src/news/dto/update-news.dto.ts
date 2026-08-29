import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsISO8601,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Status } from '../../../generated/prisma/client.js';
import { normalizeStatus } from '../../common/status.util';

export class UpdateNewsDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  excerpt?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  body?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  category?: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsString()
  alt?: string;

  @IsOptional()
  @IsISO8601()
  date?: string;

  /** Монгол ("Ноорог"/"Нийтлэгдсэн") болон англи (DRAFT/PUBLISHED) утга хоёуланг зөвшөөрнө. */
  @IsOptional()
  @Transform(({ value }) => normalizeStatus(value))
  @IsEnum(Status)
  status?: Status;
}
