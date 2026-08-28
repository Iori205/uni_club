import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { NewsItem } from "../../lib/news-data";
import { SafeImage } from "../ui/safe-image";

export function NewsCard({ item }: { item: NewsItem }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md">
      <SafeImage
        src={item.image}
        alt={item.alt}
        className="aspect-3/2 w-full object-cover"
      />
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
            {item.tag}
          </span>
          <span className="text-sm text-muted-foreground">{item.date}</span>
        </div>
        <h3 className="mt-3 text-balance font-serif text-lg font-normal leading-snug text-foreground">
          {item.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
          {item.excerpt}
        </p>
        <Link
          href={`/news/${item.id}`}
          className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:gap-3"
        >
          Дэлгэрэнгүй
          <ArrowRight className="size-4" />
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
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-sm"
    >
      <SafeImage
        src={item.image}
        alt={item.alt}
        className="aspect-16/9 w-full object-cover"
      />
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
