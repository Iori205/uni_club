import type { Status } from "./types";

/**
 * Backend-ийн admin endpoint-ууд Prisma-ийн raw enum утга ("DRAFT"/"PUBLISHED")
 * буцаадаг бол dash-ийн UI (StatusBadge, Dashboard статистик, Event шүүлтүүр
 * гэх мэт) Монгол утга ("Ноорог"/"Нийтлэгдсэн") хүлээж авдаг байсан тул
 * тэдгээр нь хэзээ ч тохирохгүй, тоо/badge үргэлж буруу гардаг байсан.
 * Backend-ээс ирсэн дата dash-ийн state-д орох цорын ганц цэг (admin-shell.tsx)
 * дээр л энэ функцийг дуудаж, доод түвшний component бүр Монгол утга
 * хүлээн авдаг хэвээрээ байлгана — тэднийг өөрчлөх шаардлагагүй.
 */
export function normalizeStatus(raw: string): Status {
  return raw === "PUBLISHED" || raw === "Нийтлэгдсэн"
    ? "Нийтлэгдсэн"
    : "Ноорог";
}
