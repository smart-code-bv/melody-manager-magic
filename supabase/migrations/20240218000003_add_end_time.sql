-- Add end_time column to lessons table if it doesn't exist
alter table public.lessons
    add column if not exists end_time timestamp with time zone;

-- Update existing lessons to have an end_time based on start_time and duration
update public.lessons
set end_time = start_time + (duration || ' minutes')::interval
where end_time is null and duration is not null;

-- Make end_time required
alter table public.lessons
    alter column end_time set not null;
