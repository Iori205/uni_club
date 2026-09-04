import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { createClerkClient, verifyToken } from '@clerk/backend';
import type { Request } from 'express';

function getAllowedAdminEmails(): string[] | null {
  const raw = process.env.ADMIN_ALLOWED_EMAILS;
  if (!raw || !raw.trim()) return null;
  return raw
    .split(',')
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

/**
 * `/admin/*` route-уудыг хамгаална. `Authorization: Bearer <Clerk session token>`
 * header-ийг Clerk-ийн backend SDK-аар шалгана.
 *
 * Role/permission model DB-д байхгүй — үндсэн шалгалт бол зөвхөн "хүчинтэй Clerk session
 * эсэх" (RBAC биш). Энэ нь ЗӨВХӨН Clerk-ийн sign-up хязгаарлагдмал (invite-only/allowlist)
 * үед аюулгүй — эс бөгөөс дурын хэн ч бүртгүүлээд admin CRUD эрх авах боломжтой.
 *
 * `ADMIN_ALLOWED_EMAILS` орчны хувьсагч (таслалаар тусгаарласан имэйл жагсаалт)
 * тохируулбал, түүн дээр нэмэлт хамгаалалт болж, зөвхөн тэр жагсаалтад байгаа имэйлтэй
 * Clerk хэрэглэгчид л admin route-д хандах боломжтой болно. Тохируулаагүй бол (default)
 * өмнөх адил — ямар ч хүчинтэй session нэвтэрнэ, ингэснээр энэ өөрчлөлт одоо байгаа
 * тохиргоог эвдэхгүй, зөвхөн опционал нэмэлт хамгаалалт өгнө.
 */
@Injectable()
export class ClerkAuthGuard implements CanActivate {
  private clerkClient: ReturnType<typeof createClerkClient> | null = null;

  private getClerkClient() {
    if (!this.clerkClient) {
      this.clerkClient = createClerkClient({
        secretKey: process.env.CLERK_SECRET_KEY,
      });
    }
    return this.clerkClient;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers.authorization;
    const token = authHeader?.startsWith('Bearer ')
      ? authHeader.slice('Bearer '.length)
      : undefined;

    if (!token) {
      throw new UnauthorizedException('Authentication token байхгүй байна.');
    }

    let userId: string;
    try {
      const payload = await verifyToken(token, {
        secretKey: process.env.CLERK_SECRET_KEY,
      });
      userId = payload.sub;
    } catch {
      throw new UnauthorizedException('Authentication token хүчингүй байна.');
    }

    const allowedEmails = getAllowedAdminEmails();
    if (!allowedEmails) return true;

    const user = await this.getClerkClient()
      .users.getUser(userId)
      .catch(() => null);
    const email = user?.primaryEmailAddress?.emailAddress?.toLowerCase();

    if (!email || !allowedEmails.includes(email)) {
      throw new ForbiddenException('Энэ хэрэглэгч admin эрхгүй байна.');
    }

    return true;
  }
}
