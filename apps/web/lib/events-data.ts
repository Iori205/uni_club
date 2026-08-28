export type EventItem = {
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

export const EVENTS: EventItem[] = [
  {
    id: "biznesiin-jiliin-forum",
    image: "/images/event-forum.png",
    alt: "Хурлын том танхим цэнхэр суудлуудтай",
    date: "2026 оны 9 дүгээр сарын 18",
    time: "14:00 – 17:30",
    location: "МУИС, 2 дугаар байрны Их танхим",
    title: "БСОН-ы Бизнесийн жилийн форум",
    excerpt:
      "Багш нар, төгсөгчид болон салбарын удирдлагууд Монголын хувийн хэвшлийн ирээдүйн талаар хэлэлцэнэ.",
    body: "Багш нар, төгсөгчид болон салбарын удирдлагууд Монголын хувийн хэвшлийн ирээдүйн талаар хэлэлцэх хагас өдрийн форум. Төгсгөлд нь нээлттэй хэлэлцүүлэг зохион байгуулагдана.",
  },
  {
    id: "ugugdul-shinjilgeenii-surgalt",
    image: "/images/hero-students.png",
    alt: "Оюутнууд дэлгэц дээрх өгөгдлийн график хараад сургалтад суралцаж байгаа нь",
    date: "2026 оны 9 дүгээр сарын 27",
    time: "10:00 – 13:00",
    location: "Бизнесийн сургууль, 402 тоот",
    title: "Өгөгдөл ба шинжилгээний сургалт",
    excerpt:
      "Хүснэгтэн загварчлал, хяналтын самбар боловсруулах болон тоон судалгааны үр дүнг танилцуулах практик сургалт.",
    body: "Хүснэгтэн загварчлал, хяналтын самбар боловсруулах болон тоон судалгааны үр дүнг ойлгомжтой танилцуулах практик сургалт.",
  },
];

export function getEventById(id: string): EventItem | undefined {
  return EVENTS.find((item) => item.id === id);
}

const MONGOLIAN_DATE_RE = /(\d{4})\s*оны\s*(\d{1,2})\s*(?:дугаар|дүгээр)\s*сарын\s*(\d{1,2})/;

export function parseMongolianDate(date: string): Date | null {
  const match = MONGOLIAN_DATE_RE.exec(date);
  if (!match) return null;
  const [, year, month, day] = match;
  return new Date(Number(year), Number(month) - 1, Number(day));
}
