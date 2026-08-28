import { LinkButton } from "../ui/button";
import { SafeImage } from "../ui/safe-image";

export function HeroSection() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-12">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-primary">
            Монгол Улсын Их Сургууль
          </p>
          <h1 className="mt-5 font-serif text-[2.5rem] font-normal leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            МУИС-ийн Бизнесийн сургуулийн оюутны нэгдэл
          </h1>
          <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            БСОН нь хичээлийн танхимаас гадуур суралцахыг эрмэлздэг оюутнуудыг
            нэгтгэдэг — судалгаа, манлайлал, мэргэжлийн туршлага, төгсөөд ч
            үргэлжлэх хамт олон дундаа.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <LinkButton
              href="/join"
              className="h-10 rounded-full bg-primary px-8 text-base font-medium text-primary-foreground hover:bg-primary/90"
            >
              БСОН-д нэгдэх
            </LinkButton>
            <LinkButton
              href="/news"
              variant="secondary"
              className="h-10 rounded-full border-border bg-card px-8 text-base font-medium text-foreground hover:bg-secondary"
            >
              Сүүлийн үеийн мэдээ
            </LinkButton>
          </div>
        </div>

        <div className="relative">
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
