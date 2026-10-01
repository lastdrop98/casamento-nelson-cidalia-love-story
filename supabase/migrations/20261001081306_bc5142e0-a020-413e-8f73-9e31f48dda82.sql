ALTER TABLE public.rsvps ADD COLUMN IF NOT EXISTS gift text, ADD COLUMN IF NOT EXISTS event text NOT NULL DEFAULT 'xiguiane';
ALTER TABLE public.rsvps ALTER COLUMN attending DROP NOT NULL;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_publication_tables WHERE pubname='supabase_realtime' AND tablename='rsvps') THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.rsvps;
  END IF;
END $$;