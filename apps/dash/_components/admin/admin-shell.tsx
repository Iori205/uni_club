"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import type {
  ContentItem,
  ContentType,
  EventItem,
  MemberItem,
  Section,
} from "../../lib/admin/types";
import { useAuthedFetch } from "../../lib/use-authed-fetch";
import { normalizeStatus } from "../../lib/admin/normalize-status";
import { useToast } from "../ui/toast";
import { AdminSidebar } from "./admin-sidebar";
import { AdminHeader } from "./admin-header";
import { DashboardHome } from "./dashboard-home";
import { NewsView } from "./news/news-view";
import EventView from "./events/event-view";
import EventFormModal from "./events/event-modal";
import { MemberView } from "./members/member-view";
import MemberFormModal from "./members/member-modal";
import { NewsFormModal } from "./news/news-modal";
import { ConfirmDialog } from "./shared/confirm-dialog";

const CONTENT_TYPE_LABELS: Record<ContentType, string> = {
  Мэдээ: "мэдээг",
  "Үйл ажиллагаа": "үйл ажиллагааг",
  "Арга хэмжээ": "арга хэмжээг",
  Гишүүн: "гишүүнийг",
};

type ListResponse<T> = { items: T[] };

export function AdminShell() {
  const { isLoaded } = useAuth();
  const authedFetch = useAuthedFetch();
  const { showToast } = useToast();
  const [active, setActive] = useState<Section>("dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [news, setNews] = useState<ContentItem[]>([]);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [members, setMembers] = useState<MemberItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);
  const [modal, setModal] = useState<{
    type: ContentType;
    item: ContentItem | EventItem | MemberItem | null;
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
      authedFetch<ListResponse<MemberItem>>("/admin/members?pageSize=100"),
    ])
      .then(([newsRes, eventsRes, membersRes]) => {
        if (cancelled) return;
        setNews(
          newsRes.items.map((i) => ({ ...i, status: normalizeStatus(i.status) })),
        );
        setEvents(
          eventsRes.items.map((i) => ({ ...i, status: normalizeStatus(i.status) })),
        );
        setMembers(membersRes.items);
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
    item: ContentItem | EventItem | MemberItem | null = null,
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
        updated.status = normalizeStatus(updated.status);
        setNews((items) => items.map((i) => (i.id === updated.id ? updated : i)));
      } else {
        const created = await authedFetch<ContentItem>("/admin/news", {
          method: "POST",
          body: JSON.stringify(data),
        });
        created.status = normalizeStatus(created.status);
        setNews((items) => [created, ...items]);
      }
      setModal(null);
      showToast("Өөрчлөлт амжилттай хадгалагдлаа");
    } catch {
      setActionError("Хадгалахад алдаа гарлаа. Дараа дахин оролдоно уу.");
      showToast("Алдаа гарлаа. Дахин оролдоно уу.", "error");
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
        updated.status = normalizeStatus(updated.status);
        setEvents((items) => items.map((i) => (i.id === updated.id ? updated : i)));
      } else {
        const created = await authedFetch<EventItem>("/admin/events", {
          method: "POST",
          body: JSON.stringify(data),
        });
        created.status = normalizeStatus(created.status);
        setEvents((items) => [created, ...items]);
      }
      setModal(null);
      showToast("Өөрчлөлт амжилттай хадгалагдлаа");
    } catch {
      setActionError("Хадгалахад алдаа гарлаа. Дараа дахин оролдоно уу.");
      showToast("Алдаа гарлаа. Дахин оролдоно уу.", "error");
    }
  };

  const saveMember = async (data: Partial<MemberItem>) => {
    if (!modal) return;
    try {
      setActionError(null);
      if (modal.item) {
        const updated = await authedFetch<MemberItem>(
          `/admin/members/${modal.item.id}`,
          { method: "PATCH", body: JSON.stringify(data) },
        );
        setMembers((items) =>
          items
            .map((i) => (i.id === updated.id ? updated : i))
            .sort((a, b) => a.sortOrder - b.sortOrder),
        );
      } else {
        const created = await authedFetch<MemberItem>("/admin/members", {
          method: "POST",
          body: JSON.stringify(data),
        });
        setMembers((items) =>
          [created, ...items].sort((a, b) => a.sortOrder - b.sortOrder),
        );
      }
      setModal(null);
      showToast("Өөрчлөлт амжилттай хадгалагдлаа");
    } catch {
      setActionError("Хадгалахад алдаа гарлаа. Дараа дахин оролдоно уу.");
      showToast("Алдаа гарлаа. Дахин оролдоно уу.", "error");
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
      } else if (type === "Гишүүн") {
        await authedFetch(`/admin/members/${id}`, { method: "DELETE" });
        setMembers((items) => items.filter((i) => i.id !== id));
      } else {
        await authedFetch(`/admin/news/${id}`, { method: "DELETE" });
        setNews((items) => items.filter((i) => i.id !== id));
      }
      showToast("Амжилттай устгалаа");
    } catch {
      setActionError("Устгахад алдаа гарлаа. Дараа дахин оролдоно уу.");
      showToast("Алдаа гарлаа. Дахин оролдоно уу.", "error");
    } finally {
      setPendingDelete(null);
    }
  };

  const labels: Record<Section, string> = {
    dashboard: "Хянах самбар",
    news: "Мэдээ",
    activities: "Үйл ажиллагаа",
    events: "Арга хэмжээ",
    members: "Удирдах зөвлөл",
    homepage: "Нүүр хуудас",
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
          mobileOpen={mobileOpen}
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
            <div key={active} className="page-transition">
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
              {active === "members" && (
                <MemberView
                  items={members}
                  onCreate={() => open("Гишүүн")}
                  onEdit={(i) => open("Гишүүн", i)}
                  onDelete={(id, label) => requestDelete("Гишүүн", id, label)}
                />
              )}
            </div>
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
      {modal?.type === "Гишүүн" && (
        <MemberFormModal
          item={modal.item as MemberItem | null}
          onClose={() => setModal(null)}
          onSave={saveMember}
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
