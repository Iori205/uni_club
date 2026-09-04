import { apiFetch } from "./api-client";

export type BoardMember = {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
};

type MemberListResponse = {
  items: BoardMember[];
  total: number;
  page: number;
  pageSize: number;
};

export async function getBoardMembers(): Promise<BoardMember[]> {
  const data = await apiFetch<MemberListResponse>("/members?pageSize=100");
  return data.items;
}
