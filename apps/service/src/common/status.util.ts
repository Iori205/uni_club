import { Status } from '../../generated/prisma/client.js';

/** Dash-ийн UI Монгол статус утга (`"Ноорог"`/`"Нийтлэгдсэн"`) илгээдэг тул эдгээрийг
 * Prisma-ийн англи `Status` enum рүү (`DRAFT`/`PUBLISHED`) хөрвүүлнэ. Аль хэдийн англи
 * утга ирсэн бол өөрчлөхгүй өнгөрүүлнэ — `@IsEnum(Status)` цаашид шалгана. */
const MONGOLIAN_TO_STATUS: Record<string, Status> = {
  Ноорог: Status.DRAFT,
  Нийтлэгдсэн: Status.PUBLISHED,
};

export function normalizeStatus(value: unknown): unknown {
  if (typeof value === 'string' && value in MONGOLIAN_TO_STATUS) {
    return MONGOLIAN_TO_STATUS[value];
  }
  return value;
}
