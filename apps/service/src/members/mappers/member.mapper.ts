import type { Member } from '../../../generated/prisma/client.js';

/** apps/web-ийн `BoardMember` type-тэй нийцтэй (id нэмэгдсэн — public/admin хоёуланд ижил). */
export type MemberItem = {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
  sortOrder: number;
};

export type AdminMemberItem = MemberItem & {
  createdAt: string;
  updatedAt: string;
};

export function toMemberItem(member: Member): MemberItem {
  return {
    id: member.id,
    name: member.name,
    role: member.role,
    image: member.image ?? '',
    bio: member.bio ?? '',
    sortOrder: member.sortOrder,
  };
}

export function toAdminMemberItem(member: Member): AdminMemberItem {
  return {
    ...toMemberItem(member),
    createdAt: member.createdAt.toISOString(),
    updatedAt: member.updatedAt.toISOString(),
  };
}
