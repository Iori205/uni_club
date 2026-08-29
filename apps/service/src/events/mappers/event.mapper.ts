import type { Event } from '../../../generated/prisma/client.js';
import {
  formatEventTime,
  formatIsoDate,
  formatMongolianDate,
} from '../../common/format-date.util';

/** apps/web-ийн `EventItem` type-тэй яг ижил field нэртэй. */
export type PublicEventItem = {
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

/** apps/dash-ийн `EventItem` type-тэй нийцтэй (id нь string). */
export type AdminEventItem = {
  id: string;
  image: string;
  alt: string;
  date: string;
  time: string;
  startTime: string;
  endTime: string;
  location: string;
  title: string;
  excerpt: string;
  body: string;
  status: Event['status'];
  createdAt: string;
  updatedAt: string;
};

export function toPublicEventItem(event: Event): PublicEventItem {
  return {
    id: event.slug,
    image: event.image ?? '',
    alt: event.alt ?? '',
    date: formatMongolianDate(event.date),
    time: formatEventTime(event.startTime, event.endTime),
    location: event.location,
    title: event.title,
    excerpt: event.excerpt,
    body: event.body,
  };
}

export function toAdminEventItem(event: Event): AdminEventItem {
  return {
    id: event.id,
    image: event.image ?? '',
    alt: event.alt ?? '',
    date: formatIsoDate(event.date),
    time: formatEventTime(event.startTime, event.endTime),
    startTime: event.startTime,
    endTime: event.endTime,
    location: event.location,
    title: event.title,
    excerpt: event.excerpt,
    body: event.body,
    status: event.status,
    createdAt: event.createdAt.toISOString(),
    updatedAt: event.updatedAt.toISOString(),
  };
}
