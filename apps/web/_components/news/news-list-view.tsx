"use client";

import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import { NEWS, getNewsTags } from "../../lib/news-data";
import { NewsCard } from "./news-card";
import { EmptyState } from "../ui/empty-state";
import { Pagination } from "../ui/pagination";

const PAGE_SIZE = 9;

export function NewsListView() {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("Бүгд");
  const [page, setPage] = useState(1);
  const tags = useMemo(() => ["Бүгд", ...getNewsTags()], []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return NEWS.filter((item) => {
      const matchesQuery = q === "" || item.title.toLowerCase().includes(q);
      const matchesTag = tag === "Бүгд" || item.tag === tag;
      return matchesQuery && matchesTag;
    });
  }, [query, tag]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <>
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8 lg:py-16">
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
            <div className="relative shrink-0">
              <select
                value={tag}
                onChange={(event) => {
                  setTag(event.target.value);
                  setPage(1);
                }}
                aria-label="Ангилалаар шүүх"
                className="h-11 appearance-none rounded-full border border-border bg-card py-2 pl-5 pr-10 text-sm text-foreground focus:border-primary focus:outline-none"
              >
                {tags.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
            </div>
            <p className="shrink-0 text-sm text-muted-foreground sm:ml-auto">
              {filtered.length} мэдээ олдлоо
            </p>
          </div>

          {visible.length === 0 ? (
            <div className="mt-8">
              <EmptyState message="Хайлтад тохирох мэдээ олдсонгүй." />
            </div>
          ) : (
            <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {visible.map((item) => (
                <NewsCard key={item.id} item={item} />
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
