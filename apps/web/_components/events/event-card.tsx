import { Calendar, Clock, MapPin } from "lucide-react";
import { LinkButton } from "../ui/button";
import type { EventItem } from "../../lib/events-data";
import { SafeImage } from "../ui/safe-image";

export function EventCard({ item }: { item: EventItem }) {
  return (
    <article className="group grid min-w-0 max-w-full grid-cols-1 overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-[box-shadow,transform] duration-500 ease-out hover:-translate-y-1 hover:shadow-md motion-reduce:transition-none motion-reduce:hover:translate-y-0 md:grid-cols-[minmax(0,340px)_1fr]">
      <div className="min-w-0 overflow-hidden">
        <SafeImage
          src={item.image}
          alt={item.alt}
          className="h-48 w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100 md:h-56"
        />
      </div>
      <div className="min-w-0 p-5 sm:p-6 lg:p-8">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-foreground/80 sm:gap-x-10">
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
        <h3 className="mt-3 line-clamp-2 font-serif text-xl font-bold text-foreground">
          {item.title}
        </h3>
        <p className="mt-2 line-clamp-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
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
