
-- Tighten RSVP insert policy
DROP POLICY "Anyone submits RSVP" ON public.rsvps;
CREATE POLICY "Anyone submits valid RSVP" ON public.rsvps
  FOR INSERT
  WITH CHECK (length(trim(guest_name)) > 0 AND guest_count BETWEEN 1 AND 10);

-- Restrict has_role execution
REVOKE EXECUTE ON FUNCTION public.has_role(UUID, public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(UUID, public.app_role) TO authenticated, service_role;
