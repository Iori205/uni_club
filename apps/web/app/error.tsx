"use client";

import { useEffect } from "react";
import { TriangleAlert } from "lucide-react";
import { Button } from "../_components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="bg-background">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 px-5 py-24 text-center lg:px-8">
        <TriangleAlert className="size-12 text-muted-foreground" aria-hidden="true" />
        <h1 className="font-serif text-3xl font-normal text-foreground">
          Алдаа гарлаа
        </h1>
        <p className="max-w-sm text-sm text-muted-foreground">
          Хуудсыг ачаалахад алдаа гарлаа. Дараа дахин оролдоно уу.
        </p>
        <Button
          onClick={reset}
          className="mt-2 h-10 rounded-full bg-primary px-8 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Дахин оролдох
        </Button>
      </div>
    </section>
  );
}
