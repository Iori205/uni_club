"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LinkButton } from "../ui/button";
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

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 lg:px-6 py-4">
        <Link href="/" aria-label="БСОН нүүр хуудас">
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

        <div className="hidden lg:block">
          <LinkButton
            href="/join"
            className="rounded-full bg-primary px-2 py-1 text-xs font-semibold text-primary-foreground hover:bg-primary/90"
          >
            БСОН-д нэгдэх
          </LinkButton>
        </div>

        <button
          type="button"
          className="inline-flex size-10 items-center justify-center rounded-md text-foreground lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Цэс хаах" : "Цэс нээх"}
          aria-expanded={open}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <nav
            className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-4"
            aria-label="Гар утасны цэс"
          >
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={navHref(item.hash, isHome)}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-2.5 text-[15px] font-medium text-foreground/80 transition-colors hover:bg-secondary hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
            <LinkButton
              href="/join"
              onClick={() => setOpen(false)}
              className="mt-2 w-full rounded-full bg-primary py-5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
            >
              БСОН-д нэгдэх
            </LinkButton>
          </nav>
        </div>
      )}
    </header>
  );
}
