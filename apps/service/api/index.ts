import type { NestExpressApplication } from '@nestjs/platform-express';
import { createApp } from '../src/create-app';

/** Vercel serverless function — cold start бүрт дахин bootstrap хийхээс сэргийлж app instance-ийг cache-лэнэ. */
let appPromise: Promise<NestExpressApplication> | null = null;

async function getApp(): Promise<NestExpressApplication> {
  if (!appPromise) {
    appPromise = createApp().then(async (app) => {
      await app.init();
      return app;
    });
  }
  return appPromise;
}

export default async function handler(
  req: import('express').Request,
  res: import('express').Response,
): Promise<void> {
  const app = await getApp();
  const instance = app.getHttpAdapter().getInstance();
  instance(req, res);
}
