import { ArrowRight } from "lucide-react";

const NEWS = [
  {
    image: "/images/news-case.png",
    alt: "Оюутнууд лекцийн танхимд илтгэл сонсож байгаа нь",
    tag: "Зарлал",
    date: "2026 оны 8 дугаар сарын 4",
    title: "Үндэсний хэмжээний кейс шийдвэрлэх тэмцээний бүртгэл нээлттэй",
    body: "Гурав-дөрвөн оюутны бүрэлдэхүүнтэй баг 8 дугаар сарын 20-ныг хүртэл бүртгүүлэх боломжтой. Шалгарсан багууд багш нар болон салбарын мэргэжилтнүүдээс бүрдсэн шүүгчдийн өмнө илтгэл тавина.",
  },
  {
    image: "/images/news-mentorship.png",
    alt: "Оюутнууд болон төгсөгчид сүлжээ үүсгэн ярилцаж байгаа нь",
    tag: "Хөтөлбөр",
    date: "2026 оны 7 дугаар сарын 22",
    title: "Төгсөгчдийн менторшип хөтөлбөрт 60 оюутан хамрагдлаа",
    body: "Хөтөлбөрийн гурав дахь ээлжид банк санхүү, зөвлөх үйлчилгээ, төрийн бодлогын салбарт ажиллаж буй төгсөгчид оюутнуудтай хосолж, туршлагаа хуваалцана.",
  },
  {
    image: "/images/news-research.png",
    alt: "Оюутнууд самбарын өмнө судалгааны сургалтад суралцаж байгаа нь",
    tag: "Эрдэм шинжилгээ",
    date: "2026 оны 7 дугаар сарын 9",
    title: "Манлайллын академид судалгааны аргазүйн чиглэл нэмэгдлээ",
    body: "Найман долоо хоногийн шинэ хөтөлбөрөөр гишүүд эрдэм шинжилгээний бичлэг, өгөгдлийн шинжилгээ, оюутны хурал дээр илтгэл тавих ур чадварт суралцана.",
  },
];

export function NewsSection() {
  return (
    <section id="news" className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8 lg:py-20">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-primary">
              Сүүлийн үеийн мэдээ
            </p>
            <h2 className="mt-3 font-serif text-2xl font-normal tracking-tight text-foreground sm:text-3xl lg:text-4xl">
              Албан ёсны зарлалууд
            </h2>
          </div>
          <a
            href="#news"
            className="inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-primary"
          >
            Бүх мэдээ
            <ArrowRight className="size-4" />
          </a>
        </div>

        <div className="mt-9 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {NEWS.map((item) => (
            <article
              key={item.title}
              className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md"
            >
              <img
                src={item.image || "/placeholder.svg"}
                alt={item.alt}
                className="aspect-[3/2] w-full object-cover"
              />
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
                    {item.tag}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {item.date}
                  </span>
                </div>
                <h3 className="mt-3 text-balance font-serif text-lg font-normal leading-snug text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {item.body}
                </p>
                <a
                  href="#news"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:gap-3"
                >
                  Дэлгэрэнгүй
                  <ArrowRight className="size-4" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
