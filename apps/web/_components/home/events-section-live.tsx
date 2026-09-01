"use client";
import { useCallback, useState } from "react";
import { getAllEvents, type EventItem } from "../../lib/events-data";
import { EventCard } from "../events/event-card";
import { useRealtimeRefresh } from "../../lib/use-realtime-refresh";

export function EventsSectionLive({
  initialEvents,
}: {
  initialEvents: EventItem[];
}) {
  const [events, setEvents] = useState(initialEvents);

  const refresh = useCallback(() => {
    getAllEvents()
      .then(setEvents)
      .catch(() => {});
  }, []);

  useRealtimeRefresh("Event", refresh);

  const preview = events.slice(0, 2);

  return (
    <>
      {preview.length > 0 && (
        <div className="mt-9 flex flex-col gap-5">
          {preview.map((item) => (
            <EventCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </>
  );
}
