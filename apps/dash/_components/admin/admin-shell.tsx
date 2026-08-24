"use client";
import { useState } from "react";
import {
  Bell,
  FilePenLine,
  CalendarDays,
  Home,
  Settings,
  LayoutDashboard,
  Menu,
  Plus,
  X,
} from "lucide-react";
import type {
  ContentItem,
  ContentType,
  Section,
  Status,
} from "../../lib/admin/types";
import { initialActivities, initialNews } from "../../lib/admin/mock-data";
import { AdminSidebar } from "./admin-sidebar";
import { AdminHeader } from "./admin-header";
import { DashboardHome } from "./dashboard-home";
import { NewsView } from "./news/news-view";
import { ActivityView } from "./activities/activity-view";
import HomepageEditor from "./homepage/homepage-editor";
import { SettingsView } from "./settings/settings-view";
import { NewsFormModal } from "./news/news-modal";
import { ActivityFormModal } from "./activities/activity-modal";
const imagePool = [
  "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=160&q=80",
  "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=160&q=80",
];
export function AdminShell() {
  const [active, setActive] = useState<Section>("dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [news, setNews] = useState<ContentItem[]>(initialNews);
  const [activities, setActivities] =
    useState<ContentItem[]>(initialActivities);
  const [modal, setModal] = useState<{
    type: ContentType;
    item: ContentItem | null;
  } | null>(null);
  const open = (type: ContentType, item: ContentItem | null = null) =>
    setModal({ type, item });
  const save = (data: Partial<ContentItem>) => {
    if (!modal) return;
    const setter = modal.type === "Мэдээ" ? setNews : setActivities;
    const image = imagePool[Date.now() % imagePool.length] ?? imagePool[0]!;
    setter((items) =>
      modal.item
        ? items.map((i) => (i.id === modal.item?.id ? { ...i, ...data } : i))
        : [
            {
              id: Date.now(),
              title: data.title ?? "",
              category: data.category ?? "Мэдээ",
              date: "2024.06.20",
              status: (data.status ?? "Ноорог") as Status,
              image,
              location:
                modal.type === "Үйл ажиллагаа" ? "МУИС, төв байр" : undefined,
            },
            ...items,
          ],
    );
    setModal(null);
  };
  const remove = (type: ContentType, id: number) => {
    const setter = type === "Мэдээ" ? setNews : setActivities;
    setter((items) => items.filter((i) => i.id !== id));
  };
  const labels: Record<Section, string> = {
    dashboard: "Хянах самбар",
    news: "Мэдээ",
    activities: "Үйл ажиллагаа",
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
          {active === "homepage" && <HomepageEditor />}{" "}
          {active === "settings" && <SettingsView />}
        </main>
      </div>
      {modal &&
        (modal.type === "Мэдээ" ? (
          <NewsFormModal
            item={modal.item}
            onClose={() => setModal(null)}
            onSave={save}
          />
        ) : (
          <ActivityFormModal
            item={modal.item}
            onClose={() => setModal(null)}
            onSave={save}
          />
        ))}
    </div>
  );
}
export default AdminShell;
