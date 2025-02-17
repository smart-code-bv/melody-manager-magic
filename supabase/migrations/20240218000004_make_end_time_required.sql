-- Make end_time required
alter table public.lessons
    alter column end_time set not null;
