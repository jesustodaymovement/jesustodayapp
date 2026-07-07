CREATE SCHEMA IF NOT EXISTS private;
GRANT USAGE ON SCHEMA private TO authenticated, service_role;
ALTER FUNCTION public.has_role(uuid, app_role) SET SCHEMA private;

DROP POLICY "Iedereen mag een inzending insturen" ON public.submissions;
CREATE POLICY "Iedereen mag een inzending insturen"
ON public.submissions
FOR INSERT
TO anon, authenticated
WITH CHECK (
  status = 'nieuw'::submission_status
  AND char_length(btrim(name)) > 0
  AND char_length(btrim(email)) > 0
  AND char_length(btrim(message)) > 0
);