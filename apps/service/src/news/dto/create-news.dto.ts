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

export class CreateNewsDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  /** Сонголттой — өгөгдөөгүй бол service-ээс `body`-ийн эхний хэсгээс автоматаар гаргана (dash-ийн одоогийн modal-д энэ талбар алга). */
  @IsOptional()
  @IsString()
  excerpt?: string;

  @IsString()
  @IsNotEmpty()
  body!: string;

  @IsString()
  @IsNotEmpty()
  category!: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsString()
  alt?: string;

  @IsISO8601()
  date!: string;

  /** Монгол ("Ноорог"/"Нийтлэгдсэн") болон англи (DRAFT/PUBLISHED) утга хоёуланг зөвшөөрнө. */
  @IsOptional()
  @Transform(({ value }) => normalizeStatus(value))
  @IsEnum(Status)
  status?: Status;
}
