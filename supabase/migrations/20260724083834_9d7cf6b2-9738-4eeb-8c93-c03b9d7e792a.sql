
-- SCHEDULE
CREATE TABLE public.schedule (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  wedding_id uuid NOT NULL REFERENCES public.weddings(id) ON DELETE CASCADE,
  time_label text NOT NULL,
  icon text,
  title text NOT NULL,
  description text,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.schedule TO anon, authenticated;
GRANT ALL ON public.schedule TO service_role, authenticated;
ALTER TABLE public.schedule ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone views schedule" ON public.schedule FOR SELECT USING (true);
CREATE POLICY "Admins manage schedule" ON public.schedule FOR ALL TO authenticated USING (has_role(auth.uid(),'admin')) WITH CHECK (has_role(auth.uid(),'admin'));

-- GIFTS
CREATE TABLE public.gifts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  wedding_id uuid NOT NULL REFERENCES public.weddings(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  price_label text,
  image_url text,
  status text NOT NULL DEFAULT 'available',
  reserved_by_name text,
  reserved_by_phone text,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, UPDATE ON public.gifts TO anon, authenticated;
GRANT ALL ON public.gifts TO service_role;
ALTER TABLE public.gifts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone views gifts" ON public.gifts FOR SELECT USING (true);
CREATE POLICY "Anyone reserves available gift" ON public.gifts FOR UPDATE USING (status = 'available') WITH CHECK (status IN ('reserved','available'));
CREATE POLICY "Admins manage gifts" ON public.gifts FOR ALL TO authenticated USING (has_role(auth.uid(),'admin')) WITH CHECK (has_role(auth.uid(),'admin'));
CREATE TRIGGER trg_gifts_updated BEFORE UPDATE ON public.gifts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- MESSAGES
CREATE TABLE public.messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  wedding_id uuid NOT NULL REFERENCES public.weddings(id) ON DELETE CASCADE,
  guest_name text,
  message text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.messages TO anon, authenticated;
GRANT ALL ON public.messages TO service_role;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone views messages" ON public.messages FOR SELECT USING (true);
CREATE POLICY "Anyone leaves message" ON public.messages FOR INSERT WITH CHECK (length(trim(message)) > 0 AND length(message) <= 500);
CREATE POLICY "Admins manage messages" ON public.messages FOR ALL TO authenticated USING (has_role(auth.uid(),'admin')) WITH CHECK (has_role(auth.uid(),'admin'));

-- SEED
DO $$
DECLARE wid uuid;
BEGIN
  SELECT id INTO wid FROM public.weddings WHERE slug='nelson-cidalia';
  IF wid IS NOT NULL THEN
    INSERT INTO public.schedule (wedding_id,time_label,icon,title,description,sort_order) VALUES
      (wid,'11H00','⛪','CERIMÓNIA RELIGIOSA','Igreja Nossa Senhora de Fátima — Bairro Ferroviário',1),
      (wid,'13H00','🌸','RECEPÇÃO DOS CONVIDADOS','Cajada Eventos e Serviços 2 — Av. Dom Alexandre',2),
      (wid,'14H00','🥂','COCKTAIL','Momentos de convívio e celebração',3),
      (wid,'15H00','🍽️','JANTAR','Uma refeição preparada com muito amor',4),
      (wid,'17H00','🎵','FESTA E DANÇA','Que a música nos una até de madrugada',5);

    INSERT INTO public.gifts (wedding_id,name,description,price_label,sort_order) VALUES
      (wid,'Smart TV 65"','Televisão para as noites em família','MT 55.000',1),
      (wid,'Frigorífico Side by Side','Para conservar todos os sabores','MT 65.000',2),
      (wid,'Jogo de Panelas Premium','Cozinha equipada com estilo','MT 8.500',3),
      (wid,'Máquina de Lavar','O essencial para o novo lar','MT 28.000',4),
      (wid,'Jogo de Cama King Size','Conforto para os melhores sonhos','MT 4.500',5),
      (wid,'Micro-ondas Philips','Praticidade no dia a dia','MT 6.800',6),
      (wid,'Jogo de Pratos Porcelana 12 pcs','Para receber os amigos','MT 5.500',7),
      (wid,'Liquidificador Philips','Sumos e vitaminas','MT 3.200',8);
  END IF;
END$$;
