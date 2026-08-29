"use client";

import { useAuth } from "@clerk/nextjs";
import { useCallback } from "react";
import { apiFetch } from "./api-client";

/**
 * `apiFetch`-тэй адил, гэхдээ Clerk-ийн одоогийн session token-ыг
 * `Authorization: Bearer <token>` header-ээр `/admin/*` дуудлага бүрт автоматаар хавсаргана.
 */
export function useAuthedFetch() {
  const { getToken } = useAuth();

  return useCallback(
    async <T,>(path: string, init?: RequestInit): Promise<T> => {
      const token = await getToken();
      return apiFetch<T>(path, {
        ...init,
        headers: {
          ...init?.headers,
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
    },
    [getToken],
  );
}
