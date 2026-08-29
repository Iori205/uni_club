"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import type {
  ContentItem,
  ContentType,
  EventItem,
  Section,
} from "../../lib/admin/types";
import { useAuthedFetch } from "../../lib/use-authed-fetch";
import { AdminSidebar } from "./admin-sidebar";
import { AdminHeader } from "./admin-header";
import { DashboardHome } from "./dashboard-home";
import { NewsView } from "./news/news-view";
import EventView from "./events/event-view";
import EventFormModal from "./events/event-modal";
import { SettingsView } from "./settings/settings-view";
import { NewsFormModal } from "./news/news-modal";
import { ConfirmDialog } from "./shared/confirm-dialog";

const CONTENT_TYPE_LABELS: Record<ContentType, string> = {
  Мэдээ: "мэдээг",
  "Үйл ажиллагаа": "үйл ажиллагааг",
  "Арга хэмжээ": "арга хэмжээг",
};

type ListResponse<T> = { items: T[] };

export function AdminShell() {
  const { isLoaded } = useAuth();
  const authedFetch = useAuthedFetch();
  const [active, setActive] = useState<Section>("dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [news, setNews] = useState<ContentItem[]>([]);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);
  const [modal, setModal] = useState<{
    type: ContentType;
    item: ContentItem | EventItem | null;
  } | null>(null);
  const [pendingDelete, setPendingDelete] = useState<{
    type: ContentType;
    id: string;
    label: string;
  } | null>(null);

  useEffect(() => {
    if (!isLoaded) return;
    let cancelled = false;
    setLoading(true);
    setLoadError(false);
    Promise.all([
      authedFetch<ListResponse<ContentItem>>("/admin/news?pageSize=100"),
      authedFetch<ListResponse<EventItem>>("/admin/events?pageSize=100"),
    ])
      .then(([newsRes, eventsRes]) => {
        if (cancelled) return;
        setNews(newsRes.items);
        setEvents(eventsRes.items);
      })
      .catch(() => {
        if (!cancelled) setLoadError(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [isLoaded, authedFetch]);

  const open = (
    type: ContentType,
    item: ContentItem | EventItem | null = null,
  ) => setModal({ type, item });

  const save = async (data: Partial<ContentItem>) => {
    if (!modal) return;
    try {
      setActionError(null);
      if (modal.item) {
        const updated = await authedFetch<ContentItem>(
          `/admin/news/${modal.item.id}`,
          { method: "PATCH", body: JSON.stringify(data) },
        );
        setNews((items) => items.map((i) => (i.id === updated.id ? updated : i)));
      } else {
        const created = await authedFetch<ContentItem>("/admin/news", {
          method: "POST",
          body: JSON.stringify(data),
        });
        setNews((items) => [created, ...items]);
      }
      setModal(null);
    } catch {
      setActionError("Хадгалахад алдаа гарлаа. Дараа дахин оролдоно уу.");
    }
  };

  const saveEvent = async (data: Omit<EventItem, "id">) => {
    try {
      setActionError(null);
      if (modal?.item) {
        const updated = await authedFetch<EventItem>(
          `/admin/events/${modal.item.id}`,
          { method: "PATCH", body: JSON.stringify(data) },
        );
        setEvents((items) => items.map((i) => (i.id === updated.id ? updated : i)));
      } else {
        const created = await authedFetch<EventItem>("/admin/events", {
          method: "POST",
          body: JSON.stringify(data),
        });
        setEvents((items) => [created, ...items]);
      }
      setModal(null);
    } catch {
      setActionError("Хадгалахад алдаа гарлаа. Дараа дахин оролдоно уу.");
    }
  };

  const requestDelete = (type: ContentType, id: string, label: string) =>
    setPendingDelete({ type, id, label });

  const confirmDelete = async () => {
    if (!pendingDelete) return;
    const { type, id } = pendingDelete;
    try {
      setActionError(null);
      if (type === "Арга хэмжээ") {
        await authedFetch(`/admin/events/${id}`, { method: "DELETE" });
        setEvents((items) => items.filter((i) => i.id !== id));
      } else {
        await authedFetch(`/admin/news/${id}`, { method: "DELETE" });
        setNews((items) => items.filter((i) => i.id !== id));
      }
    } catch {
      setActionError("Устгахад алдаа гарлаа. Дараа дахин оролдоно уу.");
    } finally {
      setPendingDelete(null);
    }
  };

  const labels: Record<Section, string> = {
    dashboard: "Хянах самбар",
    news: "Мэдээ",
    activities: "Үйл ажиллагаа",
    events: "Арга хэмжээ",
    homepage: "Нүүр хуудас",
    settings: "Тохиргоо",
  };
  return (
    <div className="min-h-screen bg-background text-foreground">
      <AdminSidebar
        active={active}
        onNavigate={setActive}
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />
      <div className="lg:pl-64">
        <AdminHeader
          title={labels[active]}
          onMenu={() => setMobileOpen(true)}
        />
        <main className="mx-auto max-w-7xl px-5 py-8 md:px-8 md:py-10">
          {actionError && (
            <div className="mb-6 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {actionError}
            </div>
          )}
          {loading ? (
            <p className="text-sm text-muted-foreground">Ачаалж байна...</p>
          ) : loadError ? (
            <p className="text-sm text-muted-foreground">
              Дата ачаалж чадсангүй. Backend ажиллаж байгаа эсэхийг шалгаад
              хуудсаа дахин ачаална уу.
            </p>
          ) : (
            <>
              {active === "dashboard" && (
                <DashboardHome
                  news={news}
                  events={events}
                  onCreate={() => open("Мэдээ")}
                  onNavigate={setActive}
                />
              )}
              {active === "news" && (
                <NewsView
                  items={news}
                  onCreate={() => open("Мэдээ")}
                  onEdit={(i) => open("Мэдээ", i)}
                  onDelete={(id, label) => requestDelete("Мэдээ", id, label)}
                />
              )}
              {active === "events" && (
                <EventView
                  items={events}
                  onCreate={() => open("Арга хэмжээ")}
                  onEdit={(i) => open("Арга хэмжээ", i)}
                  onDelete={(id, label) =>
                    requestDelete("Арга хэмжээ", id, label)
                  }
                />
              )}
              {active === "settings" && <SettingsView />}
            </>
          )}
        </main>
      </div>
      {modal?.type === "Мэдээ" && (
        <NewsFormModal
          item={modal.item as ContentItem | null}
          onClose={() => setModal(null)}
          onSave={save}
        />
      )}
      {modal?.type === "Арга хэмжээ" && (
        <EventFormModal
          item={modal.item as EventItem | null}
          onClose={() => setModal(null)}
          onSave={saveEvent}
        />
      )}
      {pendingDelete && (
        <ConfirmDialog
          title="Устгах уу?"
          message={`Та "${pendingDelete.label}" ${CONTENT_TYPE_LABELS[pendingDelete.type]} устгахдаа итгэлтэй байна уу? Энэ үйлдлийг буцаах боломжгүй.`}
          onCancel={() => setPendingDelete(null)}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
}
export default AdminShell;
