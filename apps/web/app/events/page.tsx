import type { Metadata } from "next";
import { EventsListView } from "../../_components/events/events-list-view";

export const metadata: Metadata = {
  title: "Арга хэмжээ | БСОН",
  description: "БСОН-ы бүх арга хэмжээ.",
  alternates: { canonical: "/events" },
  openGraph: {
    title: "Арга хэмжээ | БСОН",
    description: "БСОН-ы бүх арга хэмжээ.",
    url: "/events",
  },
};

export default function EventsListPage() {
  return <EventsListView />;
}
