import type { News } from '../../../generated/prisma/client.js';
import {
  formatIsoDate,
  formatMongolianDate,
} from '../../common/format-date.util';

/** apps/web-ийн `NewsItem` type-тэй яг ижил field нэртэй (category -> tag). */
export type PublicNewsItem = {
  id: string;
  image: string;
  alt: string;
  tag: string;
  date: string;
  title: string;
  excerpt: string;
  body: string;
};

/** apps/dash-ийн `ContentItem` type-тэй нийцтэй (id нь string, category нэр хэвээрээ). */
export type AdminNewsItem = {
  id: string;
  title: string;
  category: string;
  date: string;
  status: News['status'];
  image: string;
  alt: string;
  excerpt: string;
  body: string;
  createdAt: string;
  updatedAt: string;
};

export function toPublicNewsItem(news: News): PublicNewsItem {
  return {
    id: news.slug,
    image: news.image ?? '',
    alt: news.alt ?? '',
    tag: news.category,
    date: formatMongolianDate(news.date),
    title: news.title,
    excerpt: news.excerpt,
    body: news.body,
  };
}

export function toAdminNewsItem(news: News): AdminNewsItem {
  return {
    id: news.id,
    title: news.title,
    category: news.category,
    date: formatIsoDate(news.date),
    status: news.status,
    image: news.image ?? '',
    alt: news.alt ?? '',
    excerpt: news.excerpt,
    body: news.body,
    createdAt: news.createdAt.toISOString(),
    updatedAt: news.updatedAt.toISOString(),
  };
}
