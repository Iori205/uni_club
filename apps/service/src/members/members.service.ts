import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type { Prisma } from '../../generated/prisma/client.js';
import { safeDeleteImage } from '../common/safe-delete-image.util';
import {
  paginate,
  toPaginatedResult,
  type PaginatedResult,
} from '../common/pagination.dto';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { QueryMemberDto } from './dto/query-member.dto';
import {
  toAdminMemberItem,
  toMemberItem,
  type AdminMemberItem,
  type MemberItem,
} from './mappers/member.mapper';
import { STORAGE_ADAPTER } from '../uploads/storage/storage.interface';
import type { StorageAdapter } from '../uploads/storage/storage.interface';

function buildWhere(query: QueryMemberDto): Prisma.MemberWhereInput {
  return query.q
    ? {
        OR: [
          { name: { contains: query.q, mode: 'insensitive' } },
          { role: { contains: query.q, mode: 'insensitive' } },
        ],
      }
    : {};
}

@Injectable()
export class MembersService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(STORAGE_ADAPTER) private readonly storage: StorageAdapter,
  ) {}

  async findAllPublic(
    query: QueryMemberDto,
  ): Promise<PaginatedResult<MemberItem>> {
    const where = buildWhere(query);
    const { skip, take } = paginate(query.page, query.pageSize);
    const [rows, total] = await this.prisma.$transaction([
      this.prisma.member.findMany({
        where,
        skip,
        take,
        orderBy: { sortOrder: 'asc' },
      }),
      this.prisma.member.count({ where }),
    ]);
    return toPaginatedResult(
      rows.map(toMemberItem),
      total,
      query.page ?? 1,
      query.pageSize ?? 10,
    );
  }

  async findAllAdmin(
    query: QueryMemberDto,
  ): Promise<PaginatedResult<AdminMemberItem>> {
    const where = buildWhere(query);
    const { skip, take } = paginate(query.page, query.pageSize);
    const [rows, total] = await this.prisma.$transaction([
      this.prisma.member.findMany({
        where,
        skip,
        take,
        orderBy: { sortOrder: 'asc' },
      }),
      this.prisma.member.count({ where }),
    ]);
    return toPaginatedResult(
      rows.map(toAdminMemberItem),
      total,
      query.page ?? 1,
      query.pageSize ?? 10,
    );
  }

  async findOneAdmin(id: string): Promise<AdminMemberItem> {
    const member = await this.prisma.member.findUnique({ where: { id } });
    if (!member) throw new NotFoundException('Гишүүн олдсонгүй');
    return toAdminMemberItem(member);
  }

  async create(dto: CreateMemberDto): Promise<AdminMemberItem> {
    const member = await this.prisma.member.create({
      data: {
        name: dto.name,
        role: dto.role,
        image: dto.image,
        bio: dto.bio,
        sortOrder: dto.sortOrder ?? 0,
      },
    });
    return toAdminMemberItem(member);
  }

  async update(id: string, dto: UpdateMemberDto): Promise<AdminMemberItem> {
    const existing = await this.findOneAdmin(id);
    const member = await this.prisma.member.update({
      where: { id },
      data: {
        ...(dto.name !== undefined ? { name: dto.name } : {}),
        ...(dto.role !== undefined ? { role: dto.role } : {}),
        ...(dto.image !== undefined ? { image: dto.image } : {}),
        ...(dto.bio !== undefined ? { bio: dto.bio } : {}),
        ...(dto.sortOrder !== undefined ? { sortOrder: dto.sortOrder } : {}),
      },
    });
    // Image солигдсон бол хуучин Storage object-ийг устгана; өөрчлөгдөөгүй бол хэвээр үлдээнэ.
    if (dto.image !== undefined && dto.image !== existing.image) {
      await safeDeleteImage(this.storage, existing.image);
    }
    return toAdminMemberItem(member);
  }

  async remove(id: string): Promise<void> {
    const existing = await this.findOneAdmin(id);
    await this.prisma.member.delete({ where: { id } });
    await safeDeleteImage(this.storage, existing.image);
  }
}
