import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import type { Response } from 'express';

/** Бүх алдааг `{ statusCode, message, error }` гэсэн тогтмол JSON хэлбэрт оруулна. */
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const statusCode =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const body =
      exception instanceof HttpException ? exception.getResponse() : null;

    const message =
      typeof body === 'string'
        ? body
        : ((body as { message?: string | string[] })?.message ??
          (exception instanceof Error
            ? exception.message
            : 'Internal server error'));

    const error =
      typeof body === 'object' && body !== null && 'error' in body
        ? (body as { error?: string }).error
        : HttpStatus[statusCode];

    response.status(statusCode).json({ statusCode, message, error });
  }
}
