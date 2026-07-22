
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE POLICY "Users see own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

CREATE TABLE public.weddings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  groom_name TEXT NOT NULL,
  bride_name TEXT NOT NULL,
  display_names TEXT NOT NULL,
  wedding_date TIMESTAMPTZ NOT NULL,
  hashtag TEXT,
  ceremony_venue TEXT,
  ceremony_address TEXT,
  ceremony_time TEXT,
  reception_venue TEXT,
  reception_address TEXT,
  reception_time TEXT,
  dress_code TEXT,
  welcome_message TEXT,
  story TEXT,
  cover_image_path TEXT,
  music_path TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.weddings TO anon, authenticated;
GRANT UPDATE ON public.weddings TO authenticated;
GRANT ALL ON public.weddings TO service_role;
ALTER TABLE public.weddings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone views weddings" ON public.weddings FOR SELECT USING (true);
CREATE POLICY "Admins update wedding" ON public.weddings FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER weddings_updated_at BEFORE UPDATE ON public.weddings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.gallery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wedding_id UUID NOT NULL REFERENCES public.weddings(id) ON DELETE CASCADE,
  image_path TEXT NOT NULL,
  caption TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.gallery TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.gallery TO authenticated;
GRANT ALL ON public.gallery TO service_role;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone views gallery" ON public.gallery FOR SELECT USING (true);
CREATE POLICY "Admins manage gallery" ON public.gallery FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.rsvps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wedding_id UUID NOT NULL REFERENCES public.weddings(id) ON DELETE CASCADE,
  guest_name TEXT NOT NULL,
  attending BOOLEAN NOT NULL,
  guest_count INT NOT NULL DEFAULT 1,
  message TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT INSERT ON public.rsvps TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.rsvps TO authenticated;
GRANT ALL ON public.rsvps TO service_role;
ALTER TABLE public.rsvps ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone submits RSVP" ON public.rsvps FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins view RSVPs" ON public.rsvps FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage RSVPs" ON public.rsvps FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

INSERT INTO public.weddings (slug, groom_name, bride_name, display_names, wedding_date, hashtag, ceremony_venue, ceremony_time, reception_venue, reception_time, welcome_message)
VALUES (
  'nelson-cidalia',
  'Nelson Issufo Mussa',
  'Cidália João Gulube',
  'Nelson & Cidália',
  '2026-11-27 15:00:00+02',
  '#NelsonCidalia2026',
  'A confirmar',
  '15:00',
  'A confirmar',
  '18:00',
  'Com imensa alegria, convidamos você a celebrar connosco este dia inesquecível.'
);

CREATE POLICY "Public reads wedding files" ON storage.objects FOR SELECT USING (bucket_id IN ('wedding-cover','wedding-gallery','wedding-audio'));
CREATE POLICY "Admins upload wedding files" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id IN ('wedding-cover','wedding-gallery','wedding-audio') AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update wedding files" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id IN ('wedding-cover','wedding-gallery','wedding-audio') AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete wedding files" ON storage.objects FOR DELETE TO authenticated USING (bucket_id IN ('wedding-cover','wedding-gallery','wedding-audio') AND public.has_role(auth.uid(), 'admin'));
