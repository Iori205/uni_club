import { Calendar, Clock, MapPin } from "lucide-react";
import { LinkButton } from "../ui/button";
import type { EventItem } from "../../lib/events-data";
import { SafeImage } from "../ui/safe-image";

export function EventCard({ item }: { item: EventItem }) {
  return (
    <article className="grid overflow-hidden rounded-2xl border border-border bg-card shadow-sm md:grid-cols-[minmax(0,280px)_1fr]">
      <SafeImage
        src={item.image}
        alt={item.alt}
        className="h-48 w-full object-cover md:h-full"
      />
      <div className="p-6 lg:p-7">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-foreground/80">
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
        <h3 className="mt-3 font-serif text-xl font-bold text-foreground">
          {item.title}
        </h3>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          {item.excerpt}
        </p>
        <LinkButton
          href={`/events/${item.id}`}
          variant="secondary"
          className="mt-5 rounded-full border-border bg-card px-6 font-semibold text-foreground hover:bg-secondary"
        >
          Дэлгэрэнгүй
        </LinkButton>
      </div>
    </article>
  );
}
