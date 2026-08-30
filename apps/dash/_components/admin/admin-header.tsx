"use client";
import { useEffect, useRef, useState } from "react";
import { Bell, Menu } from "lucide-react";
import { UserButton, useAuth } from "@clerk/nextjs";
import { useAuthedFetch } from "../../lib/use-authed-fetch";
import type { ContactSubmission } from "../../lib/admin/types";

type ListResponse<T> = { items: T[] };

const MESSAGE_TOOLTIP_THRESHOLD = 45;

function formatSubmittedAt(iso: string): string {
  return new Date(iso).toLocaleString("mn-MN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function AdminHeader({
  title,
  onMenu,
}: {
  title: string;
  onMenu: () => void;
}) {
  const { isLoaded } = useAuth();
  const authedFetch = useAuthedFetch();
  const [open, setOpen] = useState(false);
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isLoaded) return;
    let cancelled = false;
    Promise.all([
      authedFetch<{ count: number }>("/admin/contact/unread-count"),
      authedFetch<ListResponse<ContactSubmission>>(
        "/admin/contact?pageSize=20",
      ),
    ])
      .then(([unread, list]) => {
        if (cancelled) return;
        setUnreadCount(unread.count);
        setSubmissions(list.items);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [isLoaded, authedFetch]);

  useEffect(() => {
    if (!open) return;
    function handleClickOutside(event: MouseEvent) {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const markRead = async (submission: ContactSubmission) => {
    if (submission.read) return;
    setSubmissions((items) =>
      items.map((i) => (i.id === submission.id ? { ...i, read: true } : i)),
    );
    setUnreadCount((count) => Math.max(0, count - 1));
    try {
      await authedFetch(`/admin/contact/${submission.id}/read`, {
        method: "PATCH",
      });
    } catch {
      // Мэдэгдэл унших нь туслах functionality тул алдаа гарвал чимээгүй орхино.
    }
  };

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
        <div className="relative" ref={panelRef}>
          <button
            className="relative rounded-lg p-2 text-muted-foreground hover:bg-secondary"
            aria-label="Мэдэгдэл"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <Bell size={19} />
            {unreadCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-semibold leading-none text-destructive-foreground">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </button>
          {open && (
            <div className="absolute right-0 top-full z-30 mt-2 max-h-[70vh] w-80 overflow-y-auto rounded-2xl border border-border bg-popover p-2 shadow-xl sm:w-96">
              <p className="px-3 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                Холбогдох хүсэлтүүд
              </p>
              {submissions.length === 0 ? (
                <p className="px-3 py-6 text-center text-sm text-muted-foreground">
                  Одоогоор хүсэлт ирээгүй байна.
                </p>
              ) : (
                <ul className="flex flex-col gap-1">
                  {submissions.map((s) => (
                    <li key={s.id}>
                      <button
                        onClick={() => markRead(s)}
                        className={`group w-full rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-secondary ${
                          s.read ? "" : "bg-accent"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="flex items-center gap-2 text-sm font-semibold text-foreground">
                            {!s.read && (
                              <span
                                className="size-1.5 shrink-0 rounded-full bg-primary"
                                aria-hidden="true"
                              />
                            )}
                            {s.name}
                          </span>
                          <span className="shrink-0 text-xs text-muted-foreground">
                            {formatSubmittedAt(s.createdAt)}
                          </span>
                        </div>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {s.email}
                          {s.phone ? ` · ${s.phone}` : ""}
                        </p>
                        <div className="relative">
                          <p className="mt-1 line-clamp-1 text-xs text-foreground/80">
                            {s.message || " "}
                          </p>
                          {s.message &&
                            s.message.length > MESSAGE_TOOLTIP_THRESHOLD && (
                              <div
                                aria-hidden="true"
                                className="pointer-events-none absolute inset-x-0 top-full z-40 mt-1 hidden max-h-48 overflow-y-auto whitespace-pre-wrap break-words rounded-lg border border-border bg-popover p-3 text-xs leading-relaxed text-popover-foreground shadow-xl group-hover:block group-focus:block group-active:block"
                              >
                                {s.message}
                              </div>
                            )}
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
        <UserButton />
      </div>
    </header>
  );
}
