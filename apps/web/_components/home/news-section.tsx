import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { getAllNews } from "../../lib/news-data";
import { NewsCard } from "../news/news-card";

export async function NewsSection() {
  const news = await getAllNews().catch(() => []);
  const preview = news.slice(0, 3);

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
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-primary"
          >
            Бүх мэдээ
            <ArrowRight className="size-4" />
          </Link>
        </div>

        {preview.length > 0 && (
          <div className="mt-9 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {preview.map((item) => (
              <NewsCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
