-- 1. Geblokkeerde inzendingen loggen
CREATE TABLE public.blocked_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  form_name text,
  type text,
  reason text NOT NULL,
  score integer NOT NULL DEFAULT 0,
  signals jsonb,
  name text,
  email text,
  message_excerpt text,
  ip_hash text,
  user_agent text,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.blocked_submissions TO authenticated;
GRANT ALL ON public.blocked_submissions TO service_role;

ALTER TABLE public.blocked_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins kunnen geblokkeerde inzendingen bekijken"
ON public.blocked_submissions FOR SELECT TO authenticated
USING (private.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins kunnen geblokkeerde inzendingen verwijderen"
ON public.blocked_submissions FOR DELETE TO authenticated
USING (private.has_role(auth.uid(), 'admin'::app_role));

CREATE INDEX blocked_submissions_created_at_idx ON public.blocked_submissions (created_at DESC);

-- 2. Snelheidslimieten
CREATE TABLE public.submission_rate_limits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ip_hash text,
  email text,
  message_hash text,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT ALL ON public.submission_rate_limits TO service_role;

ALTER TABLE public.submission_rate_limits ENABLE ROW LEVEL SECURITY;

CREATE INDEX submission_rate_limits_ip_idx ON public.submission_rate_limits (ip_hash, created_at DESC);
CREATE INDEX submission_rate_limits_email_idx ON public.submission_rate_limits (email, created_at DESC);
CREATE INDEX submission_rate_limits_message_idx ON public.submission_rate_limits (message_hash, created_at DESC);

-- 3. Inzenden loopt alleen nog via de beveiligde server-route
DROP POLICY IF EXISTS "Iedereen mag een inzending insturen" ON public.submissions;
REVOKE INSERT ON public.submissions FROM anon;
REVOKE INSERT ON public.submissions FROM authenticated;
GRANT ALL ON public.submissions TO service_role;