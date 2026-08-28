import { LinkButton } from "../ui/button";

export function CtaSection() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-7xl px-5 pb-14 lg:px-8 lg:pb-20">
        <div className="rounded-3xl bg-primary px-6 py-12 text-center lg:px-8 lg:py-16">
          <h2 className="mx-auto max-w-2xl text-balance font-serif text-2xl font-bold tracking-tight text-primary-foreground sm:text-3xl lg:text-4xl">
            БСОН-ы нэг хэсэг болоорой
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-primary-foreground/80">
            Гишүүнчлэл нь МУИС-ийн Бизнесийн сургуулийн бүх оюутанд нээлттэй.
            Намрын улирлын хүсэлтийг тухай бүр хүлээн авч хянана.
          </p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <LinkButton
              href="/join"
              variant="secondary"
              className="rounded-full bg-card px-8 py-5 text-base font-semibold text-primary hover:bg-card/90"
            >
              Гишүүнээр элсэх
            </LinkButton>
            <LinkButton
              href="#contact"
              variant="outline"
              className="rounded-full border-primary-foreground/40 bg-transparent px-8 py-5 text-base font-semibold text-primary-foreground hover:bg-primary-foreground/10"
            >
              Холбоо барих
            </LinkButton>
          </div>
        </div>
      </div>
    </section>
  );
}
