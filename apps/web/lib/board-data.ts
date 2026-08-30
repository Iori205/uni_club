export type BoardMember = {
  name: string;
  role: string;
  image: string;
  bio: string;
};

/**
 * Одоогоор static/mock жагсаалт (бодит гишүүдийн мэдээлэл project/database-д одоохондоо алга).
 * `getBoardMembers()`-ийн бие даасан async бүтэц нь ирээдүйд backend endpoint-оос татахад
 * зөвхөн энэ функцийн доторх кодыг л сольж хийхэд хангалттай байхаар зохион байгуулагдсан.
 */
const BOARD_MEMBERS: BoardMember[] = [
  {
    name: "Батболд Дорж",
    role: "Удирдах зөвлөлийн тэргүүн",
    image: "",
    bio: "Товч танилцуулга удахгүй нэмэгдэнэ.",
  },
  {
    name: "Сарантуяа Ганбат",
    role: "Дэд тэргүүн",
    image: "",
    bio: "Товч танилцуулга удахгүй нэмэгдэнэ.",
  },
  {
    name: "Энхжаргал Мөнх",
    role: "Нарийн бичгийн дарга",
    image: "",
    bio: "Товч танилцуулга удахгүй нэмэгдэнэ.",
  },
  {
    name: "Төмөрбаатар Лхагва",
    role: "Гишүүн",
    image: "",
    bio: "Товч танилцуулга удахгүй нэмэгдэнэ.",
  },
  {
    name: "Ундрах Баяр",
    role: "Гишүүн",
    image: "",
    bio: "Товч танилцуулга удахгүй нэмэгдэнэ.",
  },
];

export async function getBoardMembers(): Promise<BoardMember[]> {
  return BOARD_MEMBERS;
}
