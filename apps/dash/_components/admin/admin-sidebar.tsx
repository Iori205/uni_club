"use client";
import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  CalendarDays,
  ChevronRight,
  FilePenLine,
  LayoutDashboard,
  Users,
  X,
} from "lucide-react";
import type { Section } from "../../lib/admin/types";
const nav = [
  { id: "dashboard", label: "Хянах самбар", icon: LayoutDashboard },
  { id: "news", label: "Мэдээ", icon: FilePenLine },
  { id: "events", label: "Арга хэмжээ", icon: CalendarDays },
  { id: "members", label: "Удирдах зөвлөл", icon: Users },
] as const;

const DESKTOP_QUERY = "(min-width: 1024px)";

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
  const asideRef = useRef<HTMLElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  // Desktop дээр (lg+) sidebar үргэлж харагдаж, interactive байх ёстой тул
  // mobile drawer-ийн inert/aria-hidden/focus-trap логик зөвхөн mobile viewport дээр л ажиллана.
  useLayoutEffect(() => {
    const mql = window.matchMedia(DESKTOP_QUERY);
    setIsDesktop(mql.matches);
    const onChange = (event: MediaQueryListEvent) => setIsDesktop(event.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  const mobileHidden = !isDesktop && !mobileOpen;

  useLayoutEffect(() => {
    if (isDesktop || !mobileOpen) return;
    previouslyFocused.current = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const raf = requestAnimationFrame(() => {
      asideRef.current
        ?.querySelector<HTMLElement>('button[data-autofocus="true"]')
        ?.focus();
    });

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab") return;
      const aside = asideRef.current;
      if (!aside) return;
      const focusable = aside.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0]!;
      const last = focusable[focusable.length - 1]!;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      previouslyFocused.current?.focus();
    };
  }, [isDesktop, mobileOpen, onClose]);

  return (
    <>
      <div
        aria-hidden="true"
        onClick={onClose}
        className={`fixed inset-0 z-30 bg-foreground/30 transition-opacity duration-300 ease-out motion-reduce:transition-none lg:hidden ${mobileOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
      />
      <aside
        ref={asideRef}
        role="dialog"
        aria-modal={!isDesktop && mobileOpen ? true : undefined}
        aria-label="Үндсэн цэс"
        aria-hidden={mobileHidden || undefined}
        inert={mobileHidden || undefined}
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-border bg-card px-5 py-6 transition-transform duration-300 ease-out motion-reduce:transition-none lg:translate-x-0 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-start justify-between gap-3 px-2">
          <button
            className="flex min-w-0 items-center gap-3 text-left"
            onClick={() => onNavigate("dashboard")}
          >
            <Image
              src="/images/logo.png"
              alt="БСОН лого"
              width={32}
              height={32}
              className="h-9 w-8 shrink-0 rounded-sm"
            />
            <div className="flex min-w-0 flex-col leading-none">
              <span className="truncate font-serif text-lg font-bold tracking-tight text-primary">
                БСОН
              </span>
              <span className="truncate text-[11px] font-medium tracking-[0.16em] text-muted-foreground">
                Админ удирдлага
              </span>
            </div>
          </button>
          <button
            data-autofocus="true"
            className="flex size-11 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-secondary active:scale-[0.98] lg:hidden"
            onClick={onClose}
            aria-label="Цэс хаах"
          >
            <X size={18} />
          </button>
        </div>
        <div className="my-6 bg-border" />
        <nav className="flex flex-1 flex-col gap-1" aria-label="Үндсэн цэс">
          {nav.map(({ id, label, icon: Icon }, index) => (
            <button
              key={id}
              onClick={() => {
                onNavigate(id);
                onClose();
              }}
              style={
                !isDesktop && mobileOpen
                  ? { transitionDelay: `${index * 35}ms` }
                  : undefined
              }
              className={`flex min-h-11 items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-[opacity,transform,background-color,color] duration-200 ease-out motion-reduce:transition-none lg:translate-x-0 lg:opacity-100 ${active === id ? "bg-accent text-primary" : "text-muted-foreground hover:bg-secondary hover:text-foreground"} ${isDesktop || mobileOpen ? "translate-x-0 opacity-100" : "-translate-x-1 opacity-0"}`}
            >
              <Icon size={18} />
              <span className="truncate">{label}</span>
              {active === id && (
                <ChevronRight className="ml-auto shrink-0" size={15} />
              )}
            </button>
          ))}
        </nav>
      </aside>
    </>
  );
}
