import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { getAllEvents } from "../../lib/events-data";
import { EventsSectionLive } from "./events-section-live";

export async function EventsSection() {
  const events = await getAllEvents().catch(() => []);

  return (
    <section id="events" className="border-t border-border bg-secondary/40">
      <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8 lg:py-20">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-primary">
              Удахгүй болох үйл ажиллагаа
            </p>
            <h2 className="mt-3 font-serif text-2xl font-normal tracking-tight text-foreground sm:text-3xl lg:text-4xl">
              Кампус дээр юу болох вэ
            </h2>
          </div>
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-primary"
          >
            Бүх арга хэмжээ
            <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="mx-auto max-w-6xl">
          <EventsSectionLive initialEvents={events} />
        </div>
      </div>
    </section>
  );
}
