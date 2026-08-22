"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "../ui/button";
import { BsonLogo } from "./brand-mark";

const NAV_ITEMS = [
  { label: "Нүүр", href: "#" },
  { label: "Бидний тухай", href: "#about" },
  { label: "Мэдээ", href: "#news" },
  { label: "Үйл ажиллагаа", href: "#events" },
  { label: "Холбоо барих", href: "#contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 lg:px-6 py-4">
        <a href="#" aria-label="БСОН нүүр хуудас">
          <BsonLogo />
        </a>

        <nav
          className="hidden items-center gap-8 lg:flex"
          aria-label="Үндсэн цэс"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button className="rounded-full bg-primary px-2 py-1 text-xs font-semibold text-primary-foreground hover:bg-primary/90">
            БСОН-д нэгдэх
          </Button>
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
              <a
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-2.5 text-[15px] font-medium text-foreground/80 transition-colors hover:bg-secondary hover:text-primary"
              >
                {item.label}
              </a>
            ))}
            <Button className="mt-2 w-full rounded-full bg-primary py-5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
              БСОН-д нэгдэх
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
