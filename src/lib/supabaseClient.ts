import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  'https://fcipevryaxrvmxafhnes.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZjaXBldnJ5YXhydm14YWZobmVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkyODE2NTcsImV4cCI6MjA2NDg1NzY1N30.UYXxK5qLQqrCt-Ien636cKm4VexCez75HIWFFgmvASo'
);
