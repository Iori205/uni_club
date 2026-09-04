import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { NewsItem } from "../../lib/news-data";
import { SafeImage } from "../ui/safe-image";

export function NewsCard({ item }: { item: NewsItem }) {
  return (
    <article className="group flex min-w-0 max-w-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-[box-shadow,transform] duration-500 ease-out hover:-translate-y-1 hover:shadow-md motion-reduce:transition-none motion-reduce:hover:translate-y-0">
      <div className="overflow-hidden">
        <SafeImage
          src={item.image}
          alt={item.alt}
          className="aspect-3/2 w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
      </div>
      <div className="flex min-w-0 flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="shrink-0 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
            {item.tag}
          </span>
          <span className="text-sm text-muted-foreground">{item.date}</span>
        </div>
        <h3 className="mt-3 line-clamp-2 text-balance font-serif text-lg font-normal leading-snug text-foreground">
          {item.title}
        </h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground">
          {item.excerpt}
        </p>
        <Link
          href={`/news/${item.id}`}
          className="group/link mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors"
        >
          Дэлгэрэнгүй
          <ArrowRight className="size-4 transition-transform duration-300 ease-out group-hover/link:translate-x-1 motion-reduce:transition-none" />
        </Link>
      </div>
    </article>
  );
}

/** Жижигрүүлсэн хувилбар — "Бусад мэдээ" зэрэг secondary/related жагсаалтад зориулсан, үндсэн card-аас хөнгөн visual weight-тэй. */
export function NewsCardCompact({ item }: { item: NewsItem }) {
  return (
    <Link
      href={`/news/${item.id}`}
      className="group flex min-w-0 max-w-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-shadow duration-500 ease-out hover:shadow-sm"
    >
      <div className="overflow-hidden">
        <SafeImage
          src={item.image}
          alt={item.alt}
          className="aspect-16/9 w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
      </div>
      <div className="flex flex-col gap-1.5 p-4">
        <span className="text-xs text-muted-foreground">{item.date}</span>
        <h3 className="line-clamp-2 font-serif text-base font-normal leading-snug text-foreground transition-colors group-hover:text-primary">
          {item.title}
        </h3>
        <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
          {item.excerpt}
        </p>
      </div>
    </Link>
  );
}
