const configuredApiUrl = process.env.NEXT_PUBLIC_API_URL;

// Production дээр `NEXT_PUBLIC_API_URL` тохируулаагүй бол чимээгүй localhost руу унахын
// оронд шууд, тодорхой алдаа шидье — эс бөгөөс production build нь admin-ий бүх API
// дуудлагыг (auth-той хамт) хэзээ ч хүрэхгүй `localhost:3000` руу илгээсэн хэвээр
// "амжилттай" deploy болчих эрсдэлтэй. Development дээр localhost fallback хэвээр байна.
if (!configuredApiUrl && process.env.NODE_ENV === "production") {
  throw new Error(
    "NEXT_PUBLIC_API_URL орчны хувьсагч тохируулаагүй байна. Энэ нь production build/runtime-д заавал шаардлагатай.",
  );
}

const API_URL = configuredApiUrl ?? "http://localhost:3000";

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const isFormData = init?.body instanceof FormData;
  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: isFormData
      ? init?.headers
      : { "Content-Type": "application/json", ...init?.headers },
  });

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new ApiError(body?.message ?? response.statusText, response.status);
  }

  if (response.status === 204) return undefined as T;
  return response.json() as Promise<T>;
}
