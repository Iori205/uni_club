import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'node:path';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({
    origin: [process.env.WEB_ORIGIN, process.env.DASH_ORIGIN].filter(
      Boolean,
    ) as string[],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useGlobalFilters(new AllExceptionsFilter());

  // STORAGE_DRIVER=local үед хадгалагдсан зургуудыг /uploads/* дор нээлттэй болгоно.
  app.useStaticAssets(
    join(process.cwd(), process.env.UPLOAD_DIR ?? './uploads'),
    {
      prefix: '/uploads/',
    },
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap().catch((error: unknown) => {
  console.error('Failed to start service:', error);
  process.exit(1);
});
