import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsISO8601,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';
import { Status } from '../../../generated/prisma/client.js';
import { normalizeStatus } from '../../common/status.util';

const TIME_PATTERN = /^([01]\d|2[0-3]):[0-5]\d$/;

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  /** Сонголттой — өгөгдөөгүй бол service-ээс `body`-ийн эхний хэсгээс автоматаар гаргана. */
  @IsOptional()
  @IsString()
  excerpt?: string;

  @IsString()
  @IsNotEmpty()
  body!: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsString()
  alt?: string;

  @IsISO8601()
  date!: string;

  @Matches(TIME_PATTERN, {
    message: 'startTime нь "HH:MM" хэлбэртэй байх ёстой',
  })
  startTime!: string;

  @Matches(TIME_PATTERN, { message: 'endTime нь "HH:MM" хэлбэртэй байх ёстой' })
  endTime!: string;

  @IsString()
  @IsNotEmpty()
  location!: string;

  /** Монгол ("Ноорог"/"Нийтлэгдсэн") болон англи (DRAFT/PUBLISHED) утга хоёуланг зөвшөөрнө. */
  @IsOptional()
  @Transform(({ value }) => normalizeStatus(value))
  @IsEnum(Status)
  status?: Status;
}
