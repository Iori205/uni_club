"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import { getAllNews, type NewsItem } from "../../lib/news-data";
import { parseMongolianDate } from "../../lib/events-data";
import { NewsCard } from "./news-card";
import { EmptyState } from "../ui/empty-state";
import { NewsCardSkeleton } from "../ui/skeleton";
import { Pagination } from "../ui/pagination";
import { useRealtimeRefresh } from "../../lib/use-realtime-refresh";

const PAGE_SIZE = 9;
type RecencyFilter = "Шинэ мэдээ" | "Хуучин мэдээ";

export function NewsListView() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [query, setQuery] = useState("");
  const [recency, setRecency] = useState<RecencyFilter>("Шинэ мэдээ");
  const [page, setPage] = useState(1);

  const loadNews = useCallback((options?: { silent?: boolean }) => {
    if (!options?.silent) {
      setLoading(true);
      setError(false);
    }
    return getAllNews()
      .then((items) => setNews(items))
      .catch(() => {
        if (!options?.silent) setError(true);
      })
      .finally(() => {
        if (!options?.silent) setLoading(false);
      });
  }, []);

  useEffect(() => {
    loadNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refreshSilently = useCallback(() => loadNews({ silent: true }), [loadNews]);
  useRealtimeRefresh("News", refreshSilently);

  // Backend нь /news-ийг үргэлж date-ээр desc (шинэ нь эхэнд) эрэмбэлж буцаадаг тул
  // pagination/sort дараалал өөрчлөгдөхгүй — зөвхөн "Хуучин мэдээ" сонгоход 30 хоногоос
  // өмнөх item-үүд рүү нэмэлт filter тавина ("Шинэ мэдээ" бол бүх item-ийг харуулна).
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const cutoff = new Date();
    cutoff.setHours(0, 0, 0, 0);
    cutoff.setDate(cutoff.getDate() - 30);

    return news.filter((item) => {
      const matchesQuery = q === "" || item.title.toLowerCase().includes(q);
      if (!matchesQuery) return false;
      if (recency === "Шинэ мэдээ") return true;

      const newsDate = parseMongolianDate(item.date);
      if (!newsDate) return true; // огноог задлан унших боломжгүй бол шүүлтээс хассангүй
      return newsDate < cutoff;
    });
  }, [news, query, recency]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <>
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:py-14 lg:px-8 lg:py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-primary">
            Мэдээ
          </p>
          <h1 className="mt-3 font-serif text-3xl font-normal tracking-tight text-foreground lg:text-4xl">
            Бүх мэдээ
          </h1>
          <p className="mt-3 max-w-xl text-pretty text-muted-foreground">
            БСОН-ы сүүлийн үеийн зарлал, хөтөлбөр, эрдэм шинжилгээний мэдээлэл.
          </p>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
          <div className="flex flex-wrap items-center gap-3">
            <input
              type="search"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setPage(1);
              }}
              placeholder="Мэдээ хайх..."
              aria-label="Мэдээ хайх"
              className="h-11 w-full rounded-full border border-border bg-card px-5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none sm:w-[420px] lg:w-[480px]"
            />
            <div className="relative max-w-full min-w-0 shrink-0">
              <select
                value={recency}
                onChange={(event) => {
                  setRecency(event.target.value as RecencyFilter);
                  setPage(1);
                }}
                aria-label="Шинэ эсвэл хуучин мэдээгээр шүүх"
                className="h-11 max-w-full appearance-none truncate rounded-full border border-border bg-card py-2 pl-5 pr-10 text-sm text-foreground focus:border-primary focus:outline-none"
              >
                <option value="Шинэ мэдээ">Шинэ мэдээ</option>
                <option value="Хуучин мэдээ">Хуучин мэдээ</option>
              </select>
              <ChevronDown
                className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
            </div>
            <p className="shrink-0 text-sm text-muted-foreground sm:ml-auto">
              {loading ? "Уншиж байна..." : `${filtered.length} мэдээ олдлоо`}
            </p>
          </div>

          {loading ? (
            <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <NewsCardSkeleton key={i} />
              ))}
            </div>
          ) : error ? (
            <div className="mt-8">
              <EmptyState message="Мэдээ ачаалж чадсангүй. Дараа дахин оролдоно уу." />
            </div>
          ) : visible.length === 0 ? (
            <div className="mt-8">
              <EmptyState message="Хайлтад тохирох мэдээ олдсонгүй." />
            </div>
          ) : (
            <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {visible.map((item) => (
                <NewsCard key={item.id} item={item} />
              ))}
            </div>
          )}

          <Pagination page={page} pageCount={pageCount} onPageChange={setPage} />
        </div>
      </section>
    </>
  );
}
