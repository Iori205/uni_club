"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  getAllEvents,
  parseMongolianDate,
  type EventItem,
} from "../../lib/events-data";
import { EventCard } from "./event-card";
import { EmptyState } from "../ui/empty-state";
import { EventCardSkeleton } from "../ui/skeleton";
import { Pagination } from "../ui/pagination";
import { useRealtimeRefresh } from "../../lib/use-realtime-refresh";

const PAGE_SIZE = 6;
type TimeFilter = "Болох гэж буй" | "Болоод өнгөрсөн";

export function EventsListView() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [query, setQuery] = useState("");
  const [timeFilter, setTimeFilter] = useState<TimeFilter>("Болох гэж буй");
  const [page, setPage] = useState(1);

  const loadEvents = useCallback((options?: { silent?: boolean }) => {
    if (!options?.silent) {
      setLoading(true);
      setError(false);
    }
    return getAllEvents()
      .then((items) => setEvents(items))
      .catch(() => {
        if (!options?.silent) setError(true);
      })
      .finally(() => {
        if (!options?.silent) setLoading(false);
      });
  }, []);

  useEffect(() => {
    loadEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refreshSilently = useCallback(
    () => loadEvents({ silent: true }),
    [loadEvents],
  );
  useRealtimeRefresh("Event", refreshSilently);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    // Event-ийн бодит (Монгол хэлний) огноогоор өдрийн түвшинд харьцуулна — өнөөдөр
    // болох event ямар ч цагт "Болох гэж буй" ангилалд үлдэнэ (одоогийн цаг хамаарахгүй).
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    return events.filter((item) => {
      const matchesQuery =
        q === "" ||
        item.title.toLowerCase().includes(q) ||
        item.location.toLowerCase().includes(q);

      if (!matchesQuery) return false;

      const eventDate = parseMongolianDate(item.date);
      if (!eventDate) return true; // огноог задлан унших боломжгүй бол шүүлтээс хассангүй
      return timeFilter === "Болох гэж буй"
        ? eventDate >= startOfToday
        : eventDate < startOfToday;
    });
  }, [events, query, timeFilter]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <>
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:py-14 lg:px-8 lg:py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-primary">
            Арга хэмжээ
          </p>
          <h1 className="mt-3 font-serif text-3xl font-normal tracking-tight text-foreground lg:text-4xl">
            Бүх арга хэмжээ
          </h1>
          <p className="mt-3 max-w-xl text-pretty text-muted-foreground">
            Кампус дээр удахгүй болон өмнө болсон арга хэмжээнүүд.
          </p>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-5xl px-5 py-10 lg:px-8">
          <div className="flex flex-wrap items-center gap-3">
            <input
              type="search"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setPage(1);
              }}
              placeholder="Гарчиг эсвэл байршлаар хайх..."
              aria-label="Арга хэмжээ хайх"
              className="h-11 w-full rounded-full border border-border bg-card px-5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none sm:w-[420px] lg:w-[480px]"
            />
            <div className="relative max-w-full min-w-0 shrink-0">
              <select
                value={timeFilter}
                onChange={(event) => {
                  setTimeFilter(event.target.value as TimeFilter);
                  setPage(1);
                }}
                aria-label="Хугацаагаар шүүх"
                className="h-11 max-w-full appearance-none truncate rounded-full border border-border bg-card py-2 pl-5 pr-10 text-sm text-foreground focus:border-primary focus:outline-none"
              >
                <option value="Болох гэж буй">Болох гэж буй</option>
                <option value="Болоод өнгөрсөн">Болоод өнгөрсөн</option>
              </select>
              <ChevronDown
                className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
            </div>
            <p className="shrink-0 text-sm text-muted-foreground sm:ml-auto">
              {loading
                ? "Уншиж байна..."
                : `${filtered.length} арга хэмжээ олдлоо`}
            </p>
          </div>

          {loading ? (
            <div className="mt-8 flex max-w-4xl flex-col gap-5">
              {Array.from({ length: 4 }).map((_, i) => (
                <EventCardSkeleton key={i} />
              ))}
            </div>
          ) : error ? (
            <div className="mt-8">
              <EmptyState message="Арга хэмжээ ачаалж чадсангүй. Дараа дахин оролдоно уу." />
            </div>
          ) : visible.length === 0 ? (
            <div className="mt-8">
              <EmptyState message="Хайлтад тохирох арга хэмжээ олдсонгүй." />
            </div>
          ) : (
            <div className="mt-8 flex max-w-5xl flex-col gap-5">
              {visible.map((item) => (
                <EventCard key={item.id} item={item} />
              ))}
            </div>
          )}

          <Pagination
            page={page}
            pageCount={pageCount}
            onPageChange={setPage}
          />
        </div>
      </section>
    </>
  );
}
