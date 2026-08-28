export type Section =
  | "dashboard"
  | "news"
  | "activities"
  | "events"
  | "homepage"
  | "settings";
export type ContentType = "Мэдээ" | "Үйл ажиллагаа" | "Арга хэмжээ";
export type Status = "Нийтлэгдсэн" | "Ноорог";
export type ContentItem = {
  id: number;
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
  id: number;
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
export type NavItem = { id: Section; label: string; icon: React.ElementType };
export type HomepageContent = { title: string; intro: string };
