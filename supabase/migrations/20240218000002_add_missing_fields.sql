-- Add missing fields to lessons table
alter table public.lessons
    add column if not exists title text,
    add column if not exists description text,
    add column if not exists end_time timestamp with time zone,
    add column if not exists lesson_type text check (lesson_type in ('individual', 'duo', 'trio', 'group')),
    add column if not exists max_students integer not null default 1,
    add column if not exists price_per_student numeric(10,2),
    add column if not exists parent_lesson_id uuid references public.lessons(id);

-- Add missing fields to locations table
alter table public.locations
    add column if not exists room_details text,
    add column if not exists updated_at timestamp with time zone default timezone('utc'::text, now());

-- Update lessons status type
alter table public.lessons
    drop constraint if exists lessons_status_check;

alter table public.lessons
    add constraint lessons_status_check
    check (status in ('scheduled', 'completed', 'cancelled'));

-- Create extension for btree_gist if not exists
create extension if not exists btree_gist;

-- Add overlapping lessons constraint if not exists
alter table public.lessons
    drop constraint if exists no_overlapping_lessons;

alter table public.lessons
    add constraint no_overlapping_lessons
    exclude using gist (
        teacher_id with =,
        tstzrange(start_time, end_time, '[)') with &&
    );

-- Update existing lessons to have an end_time based on duration
update public.lessons
set end_time = start_time + (duration || ' minutes')::interval
where end_time is null and duration is not null;
