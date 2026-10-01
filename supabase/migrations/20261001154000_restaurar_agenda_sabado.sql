-- Restaurar definitivamente a agenda do convite principal de sábado.
-- O evento de domingo/Xiguiane permanece isolado na sua própria rota e tabela de confirmações.
DO $$
DECLARE wid uuid;
BEGIN
  SELECT id INTO wid FROM public.weddings WHERE slug = 'nelson-cidalia';
  IF wid IS NOT NULL THEN
    DELETE FROM public.schedule WHERE wedding_id = wid;
    INSERT INTO public.schedule (wedding_id,time_label,icon,title,description,sort_order) VALUES
      (wid,'09H00','⛪','CERIMÓNIA RELIGIOSA','Igreja Nossa Senhora de Fátima — Bairro Ferroviário',1),
      (wid,'12H30','🏛️','CERIMÓNIA CIVIL','Palácio dos Casamentos — Av. Julius Nyerere, Maputo',2),
      (wid,'13H00','🌸','RECEPÇÃO DOS CONVIDADOS','Cajada Eventos e Serviços 2 — Av. Dom Alexandre',3),
      (wid,'14H00','🥂','COCKTAIL','Momentos de convívio e celebração',4),
      (wid,'15H00','🥂','COPO DE ÁGUA','Celebração e brinde à nossa nova vida juntos',5),
      (wid,'17H00','🎵','FESTA E DANÇA','Que a música nos una até de madrugada',6);
  END IF;
END $$;
