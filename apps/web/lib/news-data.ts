import { apiFetch, ApiError } from "./api-client";

export type NewsItem = {
  id: string;
  image: string;
  alt: string;
  tag: string;
  date: string;
  title: string;
  excerpt: string;
  body: string;
};

type NewsListResponse = {
  items: NewsItem[];
  total: number;
  page: number;
  pageSize: number;
};

/** Нийтлэгдсэн (published) бүх мэдээг авчирна — жагсаалт/хайлт/шүүлтийг клиент талд хийхийн тулд нэг дор татна. */
export async function getAllNews(): Promise<NewsItem[]> {
  const data = await apiFetch<NewsListResponse>("/news?pageSize=100");
  return data.items;
}

export async function getNewsById(id: string): Promise<NewsItem | null> {
  try {
    return await apiFetch<NewsItem>(`/news/${encodeURIComponent(id)}`);
  } catch (error) {
    if (error instanceof ApiError) return null;
    throw error;
  }
}
