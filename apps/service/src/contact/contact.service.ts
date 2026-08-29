import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type { Contact, Prisma } from '../../generated/prisma/client.js';
import {
  paginate,
  toPaginatedResult,
  type PaginatedResult,
} from '../common/pagination.dto';
import { CreateContactDto } from './dto/create-contact.dto';
import { QueryContactDto } from './dto/query-contact.dto';

@Injectable()
export class ContactService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateContactDto): Promise<Contact> {
    return this.prisma.contact.create({ data: dto });
  }

  async findAll(query: QueryContactDto): Promise<PaginatedResult<Contact>> {
    const where: Prisma.ContactWhereInput = query.q
      ? {
          OR: [
            { name: { contains: query.q, mode: 'insensitive' } },
            { email: { contains: query.q, mode: 'insensitive' } },
          ],
        }
      : {};
    const { skip, take } = paginate(query.page, query.pageSize);
    const [rows, total] = await this.prisma.$transaction([
      this.prisma.contact.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.contact.count({ where }),
    ]);
    return toPaginatedResult(
      rows,
      total,
      query.page ?? 1,
      query.pageSize ?? 10,
    );
  }

  async findOne(id: string): Promise<Contact> {
    const contact = await this.prisma.contact.findUnique({ where: { id } });
    if (!contact) throw new NotFoundException('Хүсэлт олдсонгүй');
    return contact;
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.prisma.contact.delete({ where: { id } });
  }
}
