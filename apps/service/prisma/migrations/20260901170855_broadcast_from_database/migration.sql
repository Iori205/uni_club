-- "Broadcast from Database": News/Event дээрх INSERT/UPDATE/DELETE бүрийг
-- realtime.send()-ээр минимал, КОНТЕНТГҮЙ signal ({"op": "INSERT"|"UPDATE"|"DELETE"})
-- байдлаар, topic = table нэрээр ("News" эсвэл "Event") нийтэд broadcast хийнэ.
--
-- Энэ нь өмнөх postgres_changes+RLS хосолсон хандлагын нэг цоорхойг засна:
-- postgres_changes нь UPDATE event-ийг ШИНЭ мөрийн төлөвт эсрэг RLS шалгадаг
-- тул Published -> Draft болоход шинэ төлөв (Draft) нь anon role-д харагдахгүй
-- байх тул тэр өөрчлөлтийг Realtime огт дамжуулдаггүй байсан (Web дээр аль
-- хэдийн нээлттэй card refresh-гүйгээр алгуулахгүй байх дутагдал).
--
-- Broadcast нь ЯМАР Ч мөрийн бодит дата (гарчиг, төлөв, slug г.м.) дамжуулдаггүй
-- тул RLS-ээс шалтгаалахгүй, Draft/Published аль ч чиглэлийн шилжилтэд адилхан
-- найдвартай хүрнэ -- Draft мэдээллийг ил гаргах эрсдэлгүй.
create or replace function public.broadcast_content_change()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  perform realtime.send(
    jsonb_build_object('op', TG_OP),
    TG_OP,
    TG_TABLE_NAME,
    false
  );
  return null;
end;
$$;

create trigger news_broadcast_change
  after insert or update or delete on "News"
  for each row execute function public.broadcast_content_change();

create trigger event_broadcast_change
  after insert or update or delete on "Event"
  for each row execute function public.broadcast_content_change();

-- postgres_changes replication-ийг цаашид ашиглахгүй тул publication-аас хасна.
-- RLS SELECT policy ("Public can read published news/events") News/Event дээр
-- ХЭВЭЭР үлдэнэ -- энд зөвхөн realtime ДАМЖУУЛАХ механизмыг сольж байгаа
-- болохоос published-only мөрийн хандалтын хамгаалалт огт өөрчлөгдөхгүй.
alter publication supabase_realtime drop table "News";
alter publication supabase_realtime drop table "Event";
