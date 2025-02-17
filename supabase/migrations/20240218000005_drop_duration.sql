-- Drop duration column since we're using end_time now
alter table public.lessons
    drop column if exists duration;
