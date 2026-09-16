
-- WEDDINGS
DROP POLICY IF EXISTS "Admins update wedding" ON public.weddings;
CREATE POLICY "Public update wedding" ON public.weddings FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
GRANT SELECT, UPDATE ON public.weddings TO anon, authenticated;

-- GALLERY
DROP POLICY IF EXISTS "Admins manage gallery" ON public.gallery;
CREATE POLICY "Public manage gallery" ON public.gallery FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.gallery TO anon, authenticated;

-- SCHEDULE
DROP POLICY IF EXISTS "Admins manage schedule" ON public.schedule;
CREATE POLICY "Public manage schedule" ON public.schedule FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.schedule TO anon, authenticated;

-- GIFTS
DROP POLICY IF EXISTS "Admins manage gifts" ON public.gifts;
CREATE POLICY "Public manage gifts" ON public.gifts FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.gifts TO anon, authenticated;

-- MESSAGES
DROP POLICY IF EXISTS "Admins manage messages" ON public.messages;
CREATE POLICY "Public manage messages" ON public.messages FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.messages TO anon, authenticated;

-- RSVPS
DROP POLICY IF EXISTS "Admins manage RSVPs" ON public.rsvps;
DROP POLICY IF EXISTS "Admins view RSVPs" ON public.rsvps;
CREATE POLICY "Public manage rsvps" ON public.rsvps FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.rsvps TO anon, authenticated;

-- STORAGE
DROP POLICY IF EXISTS "Public wedding storage read" ON storage.objects;
DROP POLICY IF EXISTS "Public wedding storage write" ON storage.objects;
DROP POLICY IF EXISTS "Public wedding storage update" ON storage.objects;
DROP POLICY IF EXISTS "Public wedding storage delete" ON storage.objects;
CREATE POLICY "Public wedding storage read" ON storage.objects FOR SELECT TO anon, authenticated
  USING (bucket_id IN ('wedding-cover','wedding-gallery','wedding-audio'));
CREATE POLICY "Public wedding storage write" ON storage.objects FOR INSERT TO anon, authenticated
  WITH CHECK (bucket_id IN ('wedding-cover','wedding-gallery','wedding-audio'));
CREATE POLICY "Public wedding storage update" ON storage.objects FOR UPDATE TO anon, authenticated
  USING (bucket_id IN ('wedding-cover','wedding-gallery','wedding-audio'))
  WITH CHECK (bucket_id IN ('wedding-cover','wedding-gallery','wedding-audio'));
CREATE POLICY "Public wedding storage delete" ON storage.objects FOR DELETE TO anon, authenticated
  USING (bucket_id IN ('wedding-cover','wedding-gallery','wedding-audio'));
