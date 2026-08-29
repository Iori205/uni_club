import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Status } from '../../generated/prisma/client.js';
import type { Prisma } from '../../generated/prisma/client.js';
import { deriveExcerpt } from '../common/excerpt.util';
import { generateUniqueSlug } from '../common/slug.util';
import {
  paginate,
  toPaginatedResult,
  type PaginatedResult,
} from '../common/pagination.dto';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { QueryEventDto } from './dto/query-event.dto';
import {
  toAdminEventItem,
  toPublicEventItem,
  type AdminEventItem,
  type PublicEventItem,
} from './mappers/event.mapper';

function assertTimeOrder(startTime?: string, endTime?: string) {
  if (startTime && endTime && endTime < startTime) {
    throw new BadRequestException('Дуусах цаг эхлэх цагаас хойш байх ёстой.');
  }
}

@Injectable()
export class EventsService {
  constructor(private readonly prisma: PrismaService) {}

  async findPublished(
    query: QueryEventDto,
  ): Promise<PaginatedResult<PublicEventItem>> {
    const now = new Date();
    const where: Prisma.EventWhereInput = {
      status: Status.PUBLISHED,
      ...(query.when === 'upcoming' ? { date: { gte: now } } : {}),
      ...(query.when === 'past' ? { date: { lt: now } } : {}),
      ...(query.q
        ? {
            OR: [
              { title: { contains: query.q, mode: 'insensitive' } },
              { location: { contains: query.q, mode: 'insensitive' } },
            ],
          }
        : {}),
    };
    const { skip, take } = paginate(query.page, query.pageSize);
    const [rows, total] = await this.prisma.$transaction([
      this.prisma.event.findMany({
        where,
        skip,
        take,
        orderBy: { date: 'asc' },
      }),
      this.prisma.event.count({ where }),
    ]);
    return toPaginatedResult(
      rows.map(toPublicEventItem),
      total,
      query.page ?? 1,
      query.pageSize ?? 10,
    );
  }

  async findPublishedBySlug(slug: string): Promise<PublicEventItem> {
    const event = await this.prisma.event.findFirst({
      where: { slug, status: Status.PUBLISHED },
    });
    if (!event) throw new NotFoundException('Арга хэмжээ олдсонгүй');
    return toPublicEventItem(event);
  }

  async findAllAdmin(
    query: QueryEventDto,
  ): Promise<PaginatedResult<AdminEventItem>> {
    const where: Prisma.EventWhereInput = {
      ...(query.status ? { status: query.status } : {}),
      ...(query.q
        ? {
            OR: [
              { title: { contains: query.q, mode: 'insensitive' } },
              { location: { contains: query.q, mode: 'insensitive' } },
            ],
          }
        : {}),
    };
    const { skip, take } = paginate(query.page, query.pageSize);
    const [rows, total] = await this.prisma.$transaction([
      this.prisma.event.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.event.count({ where }),
    ]);
    return toPaginatedResult(
      rows.map(toAdminEventItem),
      total,
      query.page ?? 1,
      query.pageSize ?? 10,
    );
  }

  async findOneAdmin(id: string): Promise<AdminEventItem> {
    const event = await this.prisma.event.findUnique({ where: { id } });
    if (!event) throw new NotFoundException('Арга хэмжээ олдсонгүй');
    return toAdminEventItem(event);
  }

  async create(dto: CreateEventDto): Promise<AdminEventItem> {
    assertTimeOrder(dto.startTime, dto.endTime);
    const slug = await generateUniqueSlug(dto.title, (candidate) =>
      this.prisma.event
        .count({ where: { slug: candidate } })
        .then((c) => c > 0),
    );
    const event = await this.prisma.event.create({
      data: {
        title: dto.title,
        excerpt: dto.excerpt?.trim() || deriveExcerpt(dto.body),
        body: dto.body,
        image: dto.image,
        alt: dto.alt,
        date: new Date(dto.date),
        startTime: dto.startTime,
        endTime: dto.endTime,
        location: dto.location,
        status: dto.status ?? Status.DRAFT,
        slug,
      },
    });
    return toAdminEventItem(event);
  }

  async update(id: string, dto: UpdateEventDto): Promise<AdminEventItem> {
    const existing = await this.findOneAdmin(id);
    assertTimeOrder(
      dto.startTime ?? existing.startTime,
      dto.endTime ?? existing.endTime,
    );
    const event = await this.prisma.event.update({
      where: { id },
      data: {
        ...(dto.title !== undefined ? { title: dto.title } : {}),
        ...(dto.excerpt !== undefined ? { excerpt: dto.excerpt } : {}),
        ...(dto.body !== undefined ? { body: dto.body } : {}),
        ...(dto.image !== undefined ? { image: dto.image } : {}),
        ...(dto.alt !== undefined ? { alt: dto.alt } : {}),
        ...(dto.date !== undefined ? { date: new Date(dto.date) } : {}),
        ...(dto.startTime !== undefined ? { startTime: dto.startTime } : {}),
        ...(dto.endTime !== undefined ? { endTime: dto.endTime } : {}),
        ...(dto.location !== undefined ? { location: dto.location } : {}),
        ...(dto.status !== undefined ? { status: dto.status } : {}),
      },
    });
    return toAdminEventItem(event);
  }

  async remove(id: string): Promise<void> {
    await this.findOneAdmin(id);
    await this.prisma.event.delete({ where: { id } });
  }
}
