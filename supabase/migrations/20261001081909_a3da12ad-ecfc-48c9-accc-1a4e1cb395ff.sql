CREATE TABLE public.confirmacoes_xiguiane (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  wedding_id uuid NOT NULL REFERENCES public.weddings(id) ON DELETE CASCADE,
  nome text NOT NULL,
  telefone text,
  tipo_convite text NOT NULL DEFAULT 'individual' CHECK (tipo_convite IN ('individual','casal')),
  acompanhantes integer NOT NULL DEFAULT 0 CHECK (acompanhantes BETWEEN 0 AND 10),
  presenca boolean,
  mensagem text,
  presente text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.confirmacoes_xiguiane TO anon, authenticated;
GRANT ALL ON public.confirmacoes_xiguiane TO service_role;
ALTER TABLE public.confirmacoes_xiguiane ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public manage xiguiane" ON public.confirmacoes_xiguiane FOR ALL TO anon, authenticated USING (true) WITH CHECK (length(trim(nome)) > 0);
ALTER PUBLICATION supabase_realtime ADD TABLE public.confirmacoes_xiguiane;