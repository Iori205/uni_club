import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import type { Response } from 'express';

/**
 * Бүх алдааг `{ statusCode, message, error }` гэсэн тогтмол JSON хэлбэрт оруулна.
 *
 * `HttpException`-ий (NotFoundException, BadRequestException гэх мэт) message нь
 * developer-ийн зориудаар бичсэн, client-д харуулахад аюулгүй текст тул хэвээр дамжина.
 * Харин `HttpException` БИШ (гэнэтийн, урьдчилан таамаглаагүй) алдааны жинхэнэ
 * `exception.message`/stack нь Prisma/Postgres/Node-ийн дотоод мэдээлэл агуулж болзошгүй
 * тул production-д client рүү хэзээ ч дамжуулахгүй, зөвхөн server log-д бичнэ.
 */
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const statusCode =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const body =
      exception instanceof HttpException ? exception.getResponse() : null;

    if (!(exception instanceof HttpException)) {
      this.logger.error(
        exception instanceof Error
          ? (exception.stack ?? exception.message)
          : exception,
      );
    }

    const isProduction = process.env.NODE_ENV === 'production';
    const fallbackMessage =
      exception instanceof Error && !isProduction
        ? exception.message
        : 'Internal server error';

    const message =
      typeof body === 'string'
        ? body
        : ((body as { message?: string | string[] })?.message ??
          fallbackMessage);

    const error =
      typeof body === 'object' && body !== null && 'error' in body
        ? (body as { error?: string }).error
        : HttpStatus[statusCode];

    response.status(statusCode).json({ statusCode, message, error });
  }
}
