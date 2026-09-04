"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BsonLogo } from "./brand-mark";

const NAV_ITEMS = [
  { label: "Нүүр", hash: null },
  { label: "Бидний тухай", hash: "about" },
  { label: "Мэдээ", hash: "news" },
  { label: "Үйл ажиллагаа", hash: "events" },
  { label: "Холбоо барих", hash: "contact" },
] as const;

/** Homepage-ийн section рүү (тэр хуудсан дээр байхад) шууд anchor, өөр route-оос бол /-рүү нэвтэрч anchor руу үсэрнэ. */
function navHref(hash: string | null, isHome: boolean): string {
  if (isHome) return hash ? `#${hash}` : "#";
  return hash ? `/#${hash}` : "/";
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:px-6">
        <Link href="/" aria-label="БСОН нүүр хуудас" className="min-w-0 shrink">
          <BsonLogo />
        </Link>

        <nav
          className="hidden items-center gap-8 lg:flex"
          aria-label="Үндсэн цэс"
        >
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={navHref(item.hash, isHome)}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="inline-flex size-10 shrink-0 items-center justify-center rounded-md text-foreground lg:invisible"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Цэс хаах" : "Цэс нээх"}
          aria-expanded={open}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none lg:hidden ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div
          inert={!open}
          aria-hidden={!open}
          className="overflow-hidden border-t border-border bg-background"
        >
          <nav
            className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-4"
            aria-label="Гар утасны цэс"
          >
            {NAV_ITEMS.map((item, index) => (
              <Link
                key={item.label}
                href={navHref(item.hash, isHome)}
                onClick={() => setOpen(false)}
                style={{ transitionDelay: open ? `${index * 40}ms` : "0ms" }}
                className={`rounded-md px-2 py-2.5 text-[15px] font-medium text-foreground/80 transition-[opacity,transform,background-color,color] duration-200 ease-out hover:bg-secondary hover:text-primary motion-reduce:transition-none ${open ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0"}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
