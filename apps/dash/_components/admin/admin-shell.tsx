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
import { ActivityView } from "./activities/activity-view";
import EventView from "./events/event-view";
import EventFormModal from "./events/event-modal";
import HomepageEditor from "./homepage/homepage-editor";
import { SettingsView } from "./settings/settings-view";
import { NewsFormModal } from "./news/news-modal";
import { ActivityFormModal } from "./activities/activity-modal";

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
              date: data.date ?? "2024.06.20",
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
  const remove = (type: ContentType, id: number) => {
    if (type === "Арга хэмжээ")
      setEvents((items) => items.filter((i) => i.id !== id));
    else
      (type === "Мэдээ" ? setNews : setActivities)((items) =>
        items.filter((i) => i.id !== id),
      );
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
              onCreate={() => open("Мэдээ")}
              onNavigate={setActive}
            />
          )}{" "}
          {active === "news" && (
            <NewsView
              items={news}
              onCreate={() => open("Мэдээ")}
              onEdit={(i) => open("Мэдээ", i)}
              onDelete={(id) => remove("Мэдээ", id)}
            />
          )}{" "}
          {active === "activities" && (
            <ActivityView
              items={activities}
              onCreate={() => open("Үйл ажиллагаа")}
              onEdit={(i) => open("Үйл ажиллагаа", i)}
              onDelete={(id) => remove("Үйл ажиллагаа", id)}
            />
          )}{" "}
          {active === "events" && (
            <EventView
              items={events}
              onCreate={() => open("Арга хэмжээ")}
              onEdit={(i) => open("Арга хэмжээ", i)}
              onDelete={(id) => remove("Арга хэмжээ", id)}
            />
          )}{" "}
          {active === "homepage" && <HomepageEditor />}{" "}
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
      {modal?.type === "Үйл ажиллагаа" && (
        <ActivityFormModal
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
    </div>
  );
}
export default AdminShell;
