"use client";
import { useCallback, useState } from "react";
import { getAllNews, type NewsItem } from "../../lib/news-data";
import { NewsCard } from "../news/news-card";
import { useRealtimeRefresh } from "../../lib/use-realtime-refresh";

export function NewsSectionLive({ initialNews }: { initialNews: NewsItem[] }) {
  const [news, setNews] = useState(initialNews);

  const refresh = useCallback(() => {
    getAllNews()
      .then(setNews)
      .catch(() => {});
  }, []);

  useRealtimeRefresh("News", refresh);

  const preview = news.slice(0, 3);

  return (
    <>
      {preview.length > 0 && (
        <div className="mt-9 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {preview.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </>
  );
}
