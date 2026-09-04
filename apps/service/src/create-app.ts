import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'node:path';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/all-exceptions.filter';

/**
 * Production дээр дутуу байвал сервер чимээгүй, хагас эвдэрхэн (жишээ нь: бүх CORS
 * хүсэлтийг мэдэгдэлгүй татгалзах, эсвэл auth-ийг хэзээ ч баталгаажуулж чадахгүй) ажиллах
 * шаардлагатай орчны хувьсагчийг эхэнд нь шалгаад, дутуу бол шууд, тодорхой алдаагаар
 * зогсооно — deploy "амжилттай" гараад дараа нь чимээгүй эвдэрхийг таслах зорилготой.
 */
function assertRequiredProductionEnv(): void {
  if (process.env.NODE_ENV !== 'production') return;

  const missing: string[] = [];
  if (!process.env.DATABASE_URL) missing.push('DATABASE_URL');
  if (!process.env.CLERK_SECRET_KEY) missing.push('CLERK_SECRET_KEY');
  if (!process.env.WEB_ORIGIN && !process.env.DASH_ORIGIN) {
    missing.push('WEB_ORIGIN/DASH_ORIGIN (наад зах нь нэгийг тохируул)');
  }

  if (missing.length > 0) {
    throw new Error(
      `Production дээр дараах орчны хувьсагч заавал тохируулагдсан байх ёстой: ${missing.join(', ')}`,
    );
  }
}

/**
 * `WEB_ORIGIN`/`DASH_ORIGIN`-ийг таслалаар тусгаарласан хэд хэдэн origin-той байхыг
 * зөвшөөрнө (жишээ нь custom domain + Vercel-ийн өгсөн `*.vercel.app` URL зэрэг олон
 * үнэхээр хүчинтэй frontend origin зэрэг ажиллаж байх тохиолдол). Нэг утгатай хэвээр байсан
 * ч (таслалгүй) хуучин конфигурацитай бүрэн нийцтэй хэвээр.
 */
function parseOrigins(value: string | undefined): string[] {
  if (!value) return [];
  return value
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);
}

/** `main.ts` (local/persistent server) болон `api/index.ts` (Vercel serverless handler) хоёулаа энэ нэг bootstrap-ыг ашиглана. */
export async function createApp(): Promise<NestExpressApplication> {
  assertRequiredProductionEnv();

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({
    origin: [
      ...parseOrigins(process.env.WEB_ORIGIN),
      ...parseOrigins(process.env.DASH_ORIGIN),
    ],
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

  return app;
}
