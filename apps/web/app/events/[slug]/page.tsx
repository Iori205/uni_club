import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock, MapPin } from "lucide-react";
import { EVENTS, getEventById } from "../../../lib/events-data";
import { SafeImage } from "../../../_components/ui/safe-image";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return EVENTS.map((item) => ({ slug: item.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = getEventById(slug);
  if (!item) return { title: "Арга хэмжээ олдсонгүй | БСОН" };
  return { title: `${item.title} | БСОН`, description: item.excerpt };
}

export default async function EventDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = getEventById(slug);
  if (!item) notFound();

  return (
    <article className="bg-background">
      <div className="mx-auto max-w-3xl px-5 pt-8 pb-14 lg:px-8 lg:pt-10 lg:pb-16">
        <Link
          href="/events"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="size-4" />
          Бүх арга хэмжээ рүү буцах
        </Link>

        <h1 className="mt-6 font-serif text-3xl font-bold text-foreground lg:text-4xl">
          {item.title}
        </h1>

        <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-foreground/80">
          <span className="inline-flex items-center gap-2">
            <Calendar className="size-4 text-primary" />
            {item.date}
          </span>
          <span className="inline-flex items-center gap-2">
            <Clock className="size-4 text-primary" />
            {item.time}
          </span>
          <span className="inline-flex items-center gap-2">
            <MapPin className="size-4 text-primary" />
            {item.location}
          </span>
        </div>

        <SafeImage
          src={item.image}
          alt={item.alt}
          className="mt-8 h-64 w-full rounded-2xl object-cover lg:h-80"
        />

        <p className="mt-8 text-pretty text-base leading-relaxed text-foreground/90">
          {item.body}
        </p>

        <p className="mt-8 rounded-xl bg-secondary/50 px-5 py-4 text-sm text-muted-foreground">
          Энэ арга хэмжээ нь бүртгэлгүй, чөлөөт оролцоотой. Дэлгэрэнгүй мэдээлэл
          авахыг хүсвэл{" "}
          <Link
            href="/join"
            className="font-medium text-primary hover:underline"
          >
            бидэнтэй холбогдоно уу
          </Link>
          .
        </p>
      </div>
    </article>
  );
}
