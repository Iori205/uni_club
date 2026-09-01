-- Enable Row Level Security on News/Event so Supabase Realtime (which the
-- public web browser subscribes to using the public anon key) can only ever
-- see PUBLISHED rows -- matching the existing public REST API's own
-- PUBLISHED-only filtering (see NewsService.findPublished / EventsService.findPublished).
-- Prisma's own connection uses the "postgres" role via the pooler, which
-- bypasses RLS by default, so existing CRUD/API behavior is unaffected.
ALTER TABLE "News" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Event" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read published news" ON "News"
  FOR SELECT
  TO anon, authenticated
  USING (status = 'PUBLISHED');

CREATE POLICY "Public can read published events" ON "Event"
  FOR SELECT
  TO anon, authenticated
  USING (status = 'PUBLISHED');

-- Add News/Event to the Supabase Realtime publication so INSERT/UPDATE/DELETE
-- changes are broadcast to subscribed clients (apps/web).
ALTER PUBLICATION supabase_realtime ADD TABLE "News";
ALTER PUBLICATION supabase_realtime ADD TABLE "Event";
