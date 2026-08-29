import { apiFetch, ApiError } from "./api-client";

export type EventItem = {
  id: string;
  image: string;
  alt: string;
  date: string;
  time: string;
  location: string;
  title: string;
  excerpt: string;
  body: string;
};

type EventListResponse = {
  items: EventItem[];
  total: number;
  page: number;
  pageSize: number;
};

/** Нийтлэгдсэн (published) бүх арга хэмжээг авчирна — жагсаалт/хайлт/шүүлтийг клиент талд хийхийн тулд нэг дор татна. */
export async function getAllEvents(): Promise<EventItem[]> {
  const data = await apiFetch<EventListResponse>("/events?pageSize=100");
  return data.items;
}

export async function getEventById(id: string): Promise<EventItem | null> {
  try {
    return await apiFetch<EventItem>(`/events/${encodeURIComponent(id)}`);
  } catch (error) {
    if (error instanceof ApiError) return null;
    throw error;
  }
}

const MONGOLIAN_DATE_RE = /(\d{4})\s*оны\s*(\d{1,2})\s*(?:дугаар|дүгээр)\s*сарын\s*(\d{1,2})/;

export function parseMongolianDate(date: string): Date | null {
  const match = MONGOLIAN_DATE_RE.exec(date);
  if (!match) return null;
  const [, year, month, day] = match;
  return new Date(Number(year), Number(month) - 1, Number(day));
}
