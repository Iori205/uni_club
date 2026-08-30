import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Status } from '../../generated/prisma/client.js';
import type { Prisma } from '../../generated/prisma/client.js';
import { deriveExcerpt } from '../common/excerpt.util';
import { generateUniqueSlug } from '../common/slug.util';
import { safeDeleteImage } from '../common/safe-delete-image.util';
import {
  paginate,
  toPaginatedResult,
  type PaginatedResult,
} from '../common/pagination.dto';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { QueryNewsDto } from './dto/query-news.dto';
import {
  toAdminNewsItem,
  toPublicNewsItem,
  type AdminNewsItem,
  type PublicNewsItem,
} from './mappers/news.mapper';
import { STORAGE_ADAPTER } from '../uploads/storage/storage.interface';
import type { StorageAdapter } from '../uploads/storage/storage.interface';

@Injectable()
export class NewsService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(STORAGE_ADAPTER) private readonly storage: StorageAdapter,
  ) {}

  async findPublished(
    query: QueryNewsDto,
  ): Promise<PaginatedResult<PublicNewsItem>> {
    const where: Prisma.NewsWhereInput = {
      status: Status.PUBLISHED,
      ...(query.category ? { category: query.category } : {}),
      ...(query.q
        ? {
            OR: [
              { title: { contains: query.q, mode: 'insensitive' } },
              { excerpt: { contains: query.q, mode: 'insensitive' } },
            ],
          }
        : {}),
    };
    const { skip, take } = paginate(query.page, query.pageSize);
    const [rows, total] = await this.prisma.$transaction([
      this.prisma.news.findMany({
        where,
        skip,
        take,
        orderBy: { date: 'desc' },
      }),
      this.prisma.news.count({ where }),
    ]);
    return toPaginatedResult(
      rows.map(toPublicNewsItem),
      total,
      query.page ?? 1,
      query.pageSize ?? 10,
    );
  }

  async findPublishedBySlug(slug: string): Promise<PublicNewsItem> {
    const news = await this.prisma.news.findFirst({
      where: { slug, status: Status.PUBLISHED },
    });
    if (!news) throw new NotFoundException('Мэдээ олдсонгүй');
    return toPublicNewsItem(news);
  }

  async findAllAdmin(
    query: QueryNewsDto,
  ): Promise<PaginatedResult<AdminNewsItem>> {
    const where: Prisma.NewsWhereInput = {
      ...(query.status ? { status: query.status } : {}),
      ...(query.q
        ? {
            OR: [
              { title: { contains: query.q, mode: 'insensitive' } },
              { excerpt: { contains: query.q, mode: 'insensitive' } },
            ],
          }
        : {}),
    };
    const { skip, take } = paginate(query.page, query.pageSize);
    const [rows, total] = await this.prisma.$transaction([
      this.prisma.news.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.news.count({ where }),
    ]);
    return toPaginatedResult(
      rows.map(toAdminNewsItem),
      total,
      query.page ?? 1,
      query.pageSize ?? 10,
    );
  }

  async findOneAdmin(id: string): Promise<AdminNewsItem> {
    const news = await this.prisma.news.findUnique({ where: { id } });
    if (!news) throw new NotFoundException('Мэдээ олдсонгүй');
    return toAdminNewsItem(news);
  }

  async create(dto: CreateNewsDto): Promise<AdminNewsItem> {
    const slug = await generateUniqueSlug(dto.title, (candidate) =>
      this.prisma.news.count({ where: { slug: candidate } }).then((c) => c > 0),
    );
    const news = await this.prisma.news.create({
      data: {
        title: dto.title,
        excerpt: dto.excerpt?.trim() || deriveExcerpt(dto.body),
        body: dto.body,
        category: dto.category,
        image: dto.image,
        alt: dto.alt,
        date: new Date(dto.date),
        status: dto.status ?? Status.DRAFT,
        slug,
      },
    });
    return toAdminNewsItem(news);
  }

  async update(id: string, dto: UpdateNewsDto): Promise<AdminNewsItem> {
    const existing = await this.findOneAdmin(id);
    const news = await this.prisma.news.update({
      where: { id },
      data: {
        ...(dto.title !== undefined ? { title: dto.title } : {}),
        ...(dto.excerpt !== undefined ? { excerpt: dto.excerpt } : {}),
        ...(dto.body !== undefined ? { body: dto.body } : {}),
        ...(dto.category !== undefined ? { category: dto.category } : {}),
        ...(dto.image !== undefined ? { image: dto.image } : {}),
        ...(dto.alt !== undefined ? { alt: dto.alt } : {}),
        ...(dto.date !== undefined ? { date: new Date(dto.date) } : {}),
        ...(dto.status !== undefined ? { status: dto.status } : {}),
      },
    });
    // Image солигдсон бол хуучин Storage object-ийг устгана; өөрчлөгдөөгүй бол хэвээр үлдээнэ.
    if (dto.image !== undefined && dto.image !== existing.image) {
      await safeDeleteImage(this.storage, existing.image);
    }
    return toAdminNewsItem(news);
  }

  async remove(id: string): Promise<void> {
    const existing = await this.findOneAdmin(id);
    await this.prisma.news.delete({ where: { id } });
    await safeDeleteImage(this.storage, existing.image);
  }
}
