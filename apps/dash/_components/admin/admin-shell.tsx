"use client";
import { useState } from "react";
import type {
  ContentItem,
  ContentType,
  EventItem,
  Section,
  Status,
} from "../../lib/admin/types";
import {
  initialActivities,
  initialEvents,
  initialNews,
  imagePool,
} from "../../lib/admin/mock-data";
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

export function AdminShell() {
  const [active, setActive] = useState<Section>("dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [news, setNews] = useState<ContentItem[]>(initialNews);
  const [activities, setActivities] =
    useState<ContentItem[]>(initialActivities);
  const [events, setEvents] = useState<EventItem[]>(initialEvents);
  const [modal, setModal] = useState<{
    type: ContentType;
    item: ContentItem | EventItem | null;
  } | null>(null);
  const [pendingDelete, setPendingDelete] = useState<{
    type: ContentType;
    id: number;
    label: string;
  } | null>(null);

  const open = (
    type: ContentType,
    item: ContentItem | EventItem | null = null,
  ) => setModal({ type, item });

  const save = (data: Partial<ContentItem>) => {
    if (!modal) return;
    const setter = modal.type === "Мэдээ" ? setNews : setActivities;
    setter((items) =>
      modal.item
        ? items.map((i) =>
            i.id === modal.item?.id
              ? {
                  ...i,
                  ...data,
                  image: data.image ?? i.image,
                  title: data.title ?? i.title,
                  category: data.category ?? i.category,
                  date: data.date ?? i.date,
                  status: data.status ?? i.status,
                }
              : i,
          )
        : [
            {
              id: Date.now(),
              title: data.title ?? "",
              category: data.category ?? "Мэдээ",
              date: data.date ?? "2024-06-20",
              status: (data.status ?? "Ноорог") as Status,
              image: data.image ?? imagePool[0] ?? "",
              alt: data.alt,
              body: data.body,
              location:
                modal.type === "Үйл ажиллагаа" ? "МУИС, төв байр" : undefined,
            },
            ...items,
          ],
    );
    setModal(null);
  };
  const saveEvent = (data: Omit<EventItem, "id">) => {
    setEvents((items) =>
      modal?.item
        ? items.map((i) => (i.id === modal.item?.id ? { ...i, ...data } : i))
        : [{ id: Date.now(), ...data }, ...items],
    );
    setModal(null);
  };

  const requestDelete = (
    type: ContentType,
    id: number,
    label: string,
  ) => setPendingDelete({ type, id, label });

  const confirmDelete = () => {
    if (!pendingDelete) return;
    const { type, id } = pendingDelete;
    if (type === "Арга хэмжээ")
      setEvents((items) => items.filter((i) => i.id !== id));
    else
      (type === "Мэдээ" ? setNews : setActivities)((items) =>
        items.filter((i) => i.id !== id),
      );
    setPendingDelete(null);
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
          {active === "dashboard" && (
            <DashboardHome
              news={news}
              activities={activities}
              events={events}
              onCreate={() => open("Мэдээ")}
              onNavigate={setActive}
            />
          )}{" "}
          {active === "news" && (
            <NewsView
              items={news}
              onCreate={() => open("Мэдээ")}
              onEdit={(i) => open("Мэдээ", i)}
              onDelete={(id, label) => requestDelete("Мэдээ", id, label)}
            />
          )}{" "}
          {active === "events" && (
            <EventView
              items={events}
              onCreate={() => open("Арга хэмжээ")}
              onEdit={(i) => open("Арга хэмжээ", i)}
              onDelete={(id, label) =>
                requestDelete("Арга хэмжээ", id, label)
              }
            />
          )}{" "}
          {active === "settings" && <SettingsView />}
        </main>
      </div>
      {modal?.type === "Мэдээ" && (
        <NewsFormModal
          item={modal.item as ContentItem | null}
          onClose={() => setModal(null)}
          onSave={save}
        />
      )}{" "}
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
