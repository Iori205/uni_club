import { LinkButton } from "../ui/button";
import { SafeImage } from "../ui/safe-image";

export function HeroSection() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-10 sm:py-16 lg:px-8 lg:py-20">
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-12">
        <div className="min-w-0 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-primary">
            Монгол Улсын Их Сургууль
          </p>
          <h1 className="mt-5 text-balance font-serif text-4xl font-normal leading-[1.15] tracking-tight text-foreground sm:text-5xl sm:leading-[1.08] lg:text-6xl">
            МУИС-ийн Бизнесийн сургуулийн оюутны нэгдэл
          </h1>
          <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            БСОН нь хичээлийн танхимаас гадуур суралцахыг эрмэлздэг оюутнуудыг
            нэгтгэдэг — судалгаа, манлайлал, мэргэжлийн туршлага, төгсөөд ч
            үргэлжлэх хамт олон дундаа.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <LinkButton
              href="/events"
              className="h-11 w-full rounded-full bg-primary px-8 text-base font-medium text-primary-foreground hover:bg-primary/90 sm:h-10 sm:w-auto"
            >
              Арга хэмжээ
            </LinkButton>
            <LinkButton
              href="/news"
              variant="secondary"
              className="h-11 w-full rounded-full border-border bg-card px-8 text-base font-medium text-foreground hover:bg-secondary sm:h-10 sm:w-auto"
            >
              Сүүлийн үеийн мэдээ
            </LinkButton>
          </div>
        </div>

        <div className="relative min-w-0">
          <SafeImage
            src="/images/hero.jpg"
            alt="Бизнесийн сургуулийн оюутнууд лекцийн танхимд хамтран суралцаж байгаа нь"
            className="aspect-4/3 w-full rounded-3xl object-cover shadow-xl shadow-primary/10"
          />
        </div>
      </div>
    </section>
  );
}
