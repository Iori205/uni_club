"use client";
import { Menu } from "lucide-react";
import { UserButton } from "@clerk/nextjs";

export function AdminHeader({
  title,
  onMenu,
  mobileOpen,
}: {
  title: string;
  onMenu: () => void;
  mobileOpen: boolean;
}) {
  return (
    <header className="sticky top-0 z-20 flex h-[72px] min-w-0 items-center justify-between gap-2 border-b border-border bg-background/95 px-4 backdrop-blur sm:px-5 md:px-8">
      <div className="flex min-w-0 items-center gap-2 sm:gap-3">
        <button
          className="flex size-11 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary active:scale-[0.98] lg:hidden"
          onClick={onMenu}
          aria-label="Цэс нээх"
          aria-expanded={mobileOpen}
        >
          <Menu size={21} />
        </button>
        <div className="min-w-0 text-sm text-foreground sm:hidden">
          <span className="truncate">{title}</span>
        </div>
        <div className="hidden min-w-0 truncate text-sm text-muted-foreground md:block">
          БСОН / <span className="text-foreground">{title}</span>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-1 sm:gap-2">
        <UserButton />
      </div>
    </header>
  );
}
