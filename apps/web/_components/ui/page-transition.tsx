"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * Route солигдох бүрт (App Router `usePathname()` өөрчлөгдөх бүрт) `key`-ээр
 * дахин mount хийлгэж, CSS keyframe animation-ыг шинээр триггердэнэ.
 * Hash-only navigation (жишээ нь `/#news`)-д pathname өөрчлөгдөхгүй тул
 * дахин triggerдэхгүй — энэ нь зорилготой (зөвхөн бодит route шилжилтэд animate хийнэ).
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <div key={pathname} className="page-transition">
      {children}
    </div>
  );
}
