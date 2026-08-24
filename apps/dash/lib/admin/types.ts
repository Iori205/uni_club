export type Section =
  "dashboard" | "news" | "activities" | "homepage" | "settings";
export type ContentType = "Мэдээ" | "Үйл ажиллагаа";
export type Status = "Нийтлэгдсэн" | "Ноорог";
export type ContentItem = {
  id: number;
  title: string;
  category: string;
  date: string;
  status: Status;
  image: string;
  location?: string;
};
export type NavItem = { id: Section; label: string; icon: React.ElementType };
