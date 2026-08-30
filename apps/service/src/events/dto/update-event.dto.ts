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

export class UpdateEventDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title?: string;

  @IsOptional()
  @IsString()
  excerpt?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  body?: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsString()
  alt?: string;

  @IsOptional()
  @IsISO8601()
  date?: string;

  @IsOptional()
  @Matches(TIME_PATTERN, {
    message: 'startTime нь "HH:MM" хэлбэртэй байх ёстой',
  })
  startTime?: string;

  @IsOptional()
  @Matches(TIME_PATTERN, { message: 'endTime нь "HH:MM" хэлбэртэй байх ёстой' })
  endTime?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  location?: string;

  /** Dash-ийн EventItem type-д харагдах computed талбар — сервер startTime/endTime-ээс өөрөө дахин тооцдог тул энд зөвхөн whitelist-д нэвтрүүлээд орхино. */
  @IsOptional()
  @IsString()
  time?: string;

  /** Монгол ("Ноорог"/"Нийтлэгдсэн") болон англи (DRAFT/PUBLISHED) утга хоёуланг зөвшөөрнө. */
  @IsOptional()
  @Transform(({ value }) => normalizeStatus(value))
  @IsEnum(Status)
  status?: Status;
}
