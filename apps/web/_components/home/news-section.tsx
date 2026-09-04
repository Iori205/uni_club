import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { getAllNews } from "../../lib/news-data";
import { NewsSectionLive } from "./news-section-live";

export async function NewsSection() {
  const news = await getAllNews().catch(() => []);

  return (
    <section id="news" className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-5 py-10 sm:py-14 lg:px-8 lg:py-20">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-primary">
              Сүүлийн үеийн мэдээ
            </p>
            <h2 className="mt-3 font-serif text-2xl font-normal tracking-tight text-foreground sm:text-3xl lg:text-4xl">
              Албан ёсны зарлалууд
            </h2>
          </div>
          <Link
            href="/news"
            className="group inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-primary"
          >
            Бүх мэдээ
            <ArrowRight className="size-4 transition-transform duration-300 ease-out group-hover:translate-x-1 motion-reduce:transition-none" />
          </Link>
        </div>

        <NewsSectionLive initialNews={news} />
      </div>
    </section>
  );
}
