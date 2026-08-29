import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getAllNews, getNewsById } from "../../../lib/news-data";
import { NewsCardCompact } from "../../../_components/news/news-card";
import { SafeImage } from "../../../_components/ui/safe-image";

type Props = { params: Promise<{ slug: string }> };

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = await getNewsById(slug);
  if (!item) return { title: "Мэдээ олдсонгүй | БСОН" };
  return { title: `${item.title} | БСОН`, description: item.excerpt };
}

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = await getNewsById(slug);
  if (!item) notFound();

  const allNews = await getAllNews().catch(() => []);
  const related = allNews.filter((n) => n.id !== item.id).slice(0, 3);

  return (
    <>
      <article className="border-b border-border bg-background">
        <div className="mx-auto max-w-3xl px-5 pt-8 pb-14 lg:px-8 lg:pt-10 lg:pb-16">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="size-4" />
            Бүх мэдээ рүү буцах
          </Link>

          <div className="mt-6 flex items-center gap-3">
            <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
              {item.tag}
            </span>
            <span className="text-sm text-muted-foreground">{item.date}</span>
          </div>

          <h1 className="mt-4 text-balance font-serif text-3xl font-normal leading-tight text-foreground lg:text-4xl">
            {item.title}
          </h1>

          <SafeImage
            src={item.image}
            alt={item.alt}
            className="mt-8 aspect-3/2 w-full rounded-2xl object-cover"
          />

          <p className="mt-8 text-pretty text-base leading-relaxed text-foreground/90">
            {item.body}
          </p>
        </div>
      </article>

      {related.length > 0 && (
        <section className="border-t border-border bg-secondary/30">
          <div className="mx-auto max-w-4xl px-5 py-12 lg:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
              Бусад мэдээ
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((n) => (
                <NewsCardCompact key={n.id} item={n} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
