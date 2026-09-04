export type Section =
  | "dashboard"
  | "news"
  | "activities"
  | "events"
  | "members"
  | "homepage";
export type ContentType =
  | "Мэдээ"
  | "Үйл ажиллагаа"
  | "Арга хэмжээ"
  | "Гишүүн";
export type Status = "Нийтлэгдсэн" | "Ноорог";
export type ContentItem = {
  id: string;
  title: string;
  category: string;
  date: string;
  status: Status;
  image: string;
  location?: string;
  alt?: string;
  body?: string;
};
export type EventItem = {
  id: string;
  image: string;
  alt: string;
  date: string;
  time: string;
  startTime: string;
  endTime: string;
  location: string;
  title: string;
  body: string;
  status: Status;
};
export type MemberItem = {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
  sortOrder: number;
};
export type NavItem = { id: Section; label: string; icon: React.ElementType };
export type HomepageContent = { title: string; intro: string };
