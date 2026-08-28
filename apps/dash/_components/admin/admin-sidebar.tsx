"use client";
import Image from "next/image";
import {
  BookOpen,
  CalendarDays,
  ChevronRight,
  FilePenLine,
  LayoutDashboard,
  Settings,
  X,
} from "lucide-react";
import type { Section } from "../../lib/admin/types";
const nav = [
  { id: "dashboard", label: "Хянах самбар", icon: LayoutDashboard },
  { id: "news", label: "Мэдээ", icon: FilePenLine },
  { id: "events", label: "Арга хэмжээ", icon: CalendarDays },
  { id: "settings", label: "Тохиргоо", icon: Settings },
] as const;
export function AdminSidebar({
  active,
  onNavigate,
  mobileOpen,
  onClose,
}: {
  active: Section;
  onNavigate: (s: Section) => void;
  mobileOpen: boolean;
  onClose: () => void;
}) {
  return (
    <>
      <button
        aria-label="Цэс хаах"
        className={`fixed inset-0 z-30 bg-foreground/20 lg:hidden ${mobileOpen ? "block" : "hidden"}`}
        onClick={onClose}
      />
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-border bg-card px-5 py-6 transition-transform lg:translate-x-0 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-start justify-between px-2">
          <button
            className="flex items-center gap-3 text-left"
            onClick={() => onNavigate("dashboard")}
          >
            <Image
              src="/images/logo.png"
              alt="БСОН лого"
              width={32}
              height={32}
              className="h-9 w-8 rounded-sm"
            />
            <div className="flex flex-col leading-none">
              <span className="font-serif text-lg font-bold tracking-tight text-primary">
                БСОН
              </span>
              <span className=" text-[11px] font-medium tracking-[0.16em] text-muted-foreground">
                Админ удирдлага
              </span>
            </div>
          </button>
          <button
            className="rounded-md p-1 text-muted-foreground lg:hidden"
            onClick={onClose}
            aria-label="Цэс хаах"
          >
            <X size={18} />
          </button>
        </div>
        <div className="my-6 bg-border" />
        <nav className="flex flex-1 flex-col gap-1" aria-label="Үндсэн цэс">
          {nav.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => {
                onNavigate(id);
                onClose();
              }}
              className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-colors ${active === id ? "bg-accent text-primary" : "text-muted-foreground hover:bg-secondary hover:text-foreground"}`}
            >
              <Icon size={18} />
              <span>{label}</span>
              {active === id && <ChevronRight className="ml-auto" size={15} />}
            </button>
          ))}
        </nav>
        <div className="border-t border-border pt-5">
          <p className="px-3 text-xs text-muted-foreground">
            Тусламж хэрэгтэй юу?
          </p>
          <button className="mt-2 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-primary hover:bg-secondary">
            <BookOpen size={16} />
            Тусламжийн төв
          </button>
        </div>
      </aside>
    </>
  );
}
