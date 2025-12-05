-- Add index on major_slug for programs_view
CREATE INDEX IF NOT EXISTS programs_view_major_slug_idx ON public.programs_view (major_slug);

-- Grant select on programs_view to anon role
GRANT SELECT ON TABLE public.programs_view TO anon;
