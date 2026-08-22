import { Calendar, Clock, MapPin, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";

const EVENTS = [
  {
    image: "/images/event-forum.png",
    alt: "Хурлын том танхим цэнхэр суудлуудтай",
    date: "2026 оны 9 дүгээр сарын 18",
    time: "14:00 – 17:30",
    location: "МУИС, 2 дугаар байрны Их танхим",
    title: "БСОН-ы Бизнесийн жилийн форум",
    body: "Багш нар, төгсөгчид болон салбарын удирдлагууд Монголын хувийн хэвшлийн ирээдүйн талаар хэлэлцэх хагас өдрийн форум. Төгсгөлд нь нээлттэй хэлэлцүүлэг зохион байгуулагдана.",
  },
  {
    image: "/images/event-data.png",
    alt: "Оюутнууд дэлгэц дээрх өгөгдлийн график хараад сургалтад суралцаж байгаа нь",
    date: "2026 оны 9 дүгээр сарын 27",
    time: "10:00 – 13:00",
    location: "Бизнесийн сургууль, 402 тоот",
    title: "Өгөгдөл ба шинжилгээний сургалт",
    body: "Хүснэгтэн загварчлал, хяналтын самбар боловсруулах болон тоон судалгааны үр дүнг ойлгомжтой танилцуулах практик сургалт.",
  },
];

export function EventsSection() {
  return (
    <section id="events" className="border-t border-border bg-secondary/40">
      <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8 lg:py-20">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-primary">
              Удахгүй болох үйл ажиллагаа
            </p>
            <h2 className="mt-3 font-serif text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
              Кампус дээр юу болох вэ
            </h2>
          </div>
          <a
            href="#events"
            className="inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-primary"
          >
            Бүх арга хэмжээ
            <ArrowRight className="size-4" />
          </a>
        </div>

        <div className="mt-9 flex flex-col gap-5">
          {EVENTS.map((event) => (
            <article
              key={event.title}
              className="grid overflow-hidden rounded-2xl border border-border bg-card shadow-sm md:grid-cols-[minmax(0,320px)_1fr]"
            >
              <img
                src={event.image || "/placeholder.svg"}
                alt={event.alt}
                className="h-48 w-full object-cover md:h-full"
              />
              <div className="p-6 lg:p-7">
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-foreground/80">
                  <span className="inline-flex items-center gap-2">
                    <Calendar className="size-4 text-primary" />
                    {event.date}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <Clock className="size-4 text-primary" />
                    {event.time}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <MapPin className="size-4 text-primary" />
                    {event.location}
                  </span>
                </div>
                <h3 className="mt-3 font-serif text-xl font-bold text-foreground">
                  {event.title}
                </h3>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                  {event.body}
                </p>
                <Button
                  variant="secondary"
                  className="mt-5 rounded-full border-border bg-card px-6 font-semibold text-foreground hover:bg-secondary"
                >
                  Дэлгэрэнгүй
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
