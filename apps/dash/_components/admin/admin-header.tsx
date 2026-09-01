"use client";
import { Bell, Menu } from "lucide-react";
import { UserButton } from "@clerk/nextjs";

export function AdminHeader({
  title,
  onMenu,
}: {
  title: string;
  onMenu: () => void;
}) {
  return (
    <header className="sticky top-0 z-20 flex h-[72px] items-center justify-between border-b border-border bg-background/95 px-5 backdrop-blur md:px-8">
      <div className="flex items-center gap-3">
        <button
          className="rounded-lg p-2 text-muted-foreground hover:bg-secondary lg:hidden"
          onClick={onMenu}
          aria-label="Цэс нээх"
        >
          <Menu size={21} />
        </button>
        <div className="hidden text-sm text-muted-foreground md:block">
          БСОН / <span className="text-foreground">{title}</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          className="rounded-lg p-2 text-muted-foreground hover:bg-secondary"
          aria-label="Мэдэгдэл"
        >
          <Bell size={19} />
        </button>
        <UserButton />
      </div>
    </header>
  );
}
