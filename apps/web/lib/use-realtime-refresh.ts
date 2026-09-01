"use client";
import { useEffect, useRef } from "react";
import { getSupabaseBrowserClient } from "./supabase-client";

/**
 * `table`-д INSERT/UPDATE/DELETE гарах бүрт `onChange`-ийг дуудна. DB талд
 * "Broadcast from Database" trigger (migration: broadcast_from_database)
 * `realtime.send()`-ээр КОНТЕНТГҮЙ signal ({op: "INSERT"|"UPDATE"|"DELETE"})-ийг
 * topic = table нэрээр илгээдэг тул энд зөвхөн тэр channel-д захиална.
 *
 * postgres_changes-ээс ЗОРИУДЛАН ялгаатай: postgres_changes нь RLS-ийг
 * ШИНЭ мөрийн төлөвт эсрэг шалгадаг тул Published -> Draft шилжилтэд шинэ
 * төлөв (Draft) нь anon role-д харагдахгүй тул тэр event-ийг огт дамжуулдаггүй
 * асуудалтай байсан. Broadcast нь ямар ч мөрийн бодит дата дамжуулдаггүй тул
 * RLS-ээс үл хамааран Draft/Published аль ч чиглэлд адилхан найдвартай хүрнэ.
 *
 * Signal ирэхэд бодит item-уудыг existing REST endpoint-оор дахин татна
 * (backend-ийн slug/огноо форматлах логикийг client талд давхардуулахгүйн тулд,
 * мөн draft контент өөрөө хэзээ ч realtime payload-аар дамжихгүй байлгах зорилготой).
 */
export function useRealtimeRefresh(table: "News" | "Event", onChange: () => void) {
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) return;

    const channel = supabase
      .channel(table)
      .on("broadcast", { event: "*" }, () => onChangeRef.current())
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [table]);
}
