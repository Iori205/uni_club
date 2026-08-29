import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { verifyToken } from '@clerk/backend';
import type { Request } from 'express';

/**
 * `/admin/*` route-уудыг хамгаална. `Authorization: Bearer <Clerk session token>`
 * header-ийг Clerk-ийн backend SDK-аар шалгана. Admin/role model DB-д байхгүй —
 * зөвхөн "valid Clerk session эсэх"-ийг л шалгана (RBAC биш).
 */
@Injectable()
export class ClerkAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers.authorization;
    const token = authHeader?.startsWith('Bearer ')
      ? authHeader.slice('Bearer '.length)
      : undefined;

    if (!token) {
      throw new UnauthorizedException('Authentication token байхгүй байна.');
    }

    try {
      await verifyToken(token, { secretKey: process.env.CLERK_SECRET_KEY });
      return true;
    } catch {
      throw new UnauthorizedException('Authentication token хүчингүй байна.');
    }
  }
}
