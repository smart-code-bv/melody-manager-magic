-- Create locations table if not exists
create table if not exists public.locations (
    id uuid default gen_random_uuid() primary key,
    teacher_id uuid references auth.users(id) on delete cascade not null,
    name text not null,
    address text,
    room_details text,
    is_online boolean default false,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
    -- Ensure unique names per teacher
    unique(teacher_id, name)
);

-- Create lessons table if not exists
create table if not exists public.lessons (
    id uuid default gen_random_uuid() primary key,
    teacher_id uuid references auth.users(id) on delete cascade not null,
    location_id uuid references public.locations(id) on delete restrict,
    title text not null,
    description text,
    start_time timestamp with time zone not null,
    end_time timestamp with time zone not null,
    lesson_type text not null check (lesson_type in ('individual', 'duo', 'trio', 'group')),
    max_students integer not null default 1,
    price_per_student numeric(10,2),
    is_recurring boolean default false,
    recurrence_pattern jsonb, -- Store recurring lesson pattern
    parent_lesson_id uuid references public.lessons(id), -- For recurring lesson instances
    status text not null default 'scheduled' check (status in ('scheduled', 'completed', 'cancelled')),
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create lesson_students junction table if not exists
create table if not exists public.lesson_students (
    lesson_id uuid references public.lessons(id) on delete cascade,
    student_id uuid references public.users(id) on delete cascade,
    status text not null default 'enrolled' check (status in ('enrolled', 'cancelled', 'completed')),
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
    primary key (lesson_id, student_id)
);

-- Add GiST extension for time range exclusion if not exists
create extension if not exists btree_gist;

-- Add exclusion constraint for overlapping lessons
alter table public.lessons
    drop constraint if exists no_overlapping_lessons;

alter table public.lessons
    add constraint no_overlapping_lessons
    exclude using gist (
        teacher_id with =,
        tstzrange(start_time, end_time) with &&
    );

-- Set up row level security
alter table public.locations enable row level security;
alter table public.lessons enable row level security;
alter table public.lesson_students enable row level security;

-- Drop existing policies if they exist
drop policy if exists "Teachers can view their own locations" on public.locations;
drop policy if exists "Teachers can insert their own locations" on public.locations;
drop policy if exists "Teachers can update their own locations" on public.locations;
drop policy if exists "Teachers can delete their own locations" on public.locations;

drop policy if exists "Teachers can view their own lessons" on public.lessons;
drop policy if exists "Teachers can insert their own lessons" on public.lessons;
drop policy if exists "Teachers can update their own lessons" on public.lessons;
drop policy if exists "Teachers can delete their own lessons" on public.lessons;

drop policy if exists "Teachers can view their lessons' students" on public.lesson_students;
drop policy if exists "Teachers can manage their lessons' students" on public.lesson_students;

-- Locations policies
create policy "Teachers can view their own locations"
    on public.locations for select
    using (auth.uid() = teacher_id);

create policy "Teachers can insert their own locations"
    on public.locations for insert
    with check (auth.uid() = teacher_id);

create policy "Teachers can update their own locations"
    on public.locations for update
    using (auth.uid() = teacher_id);

create policy "Teachers can delete their own locations"
    on public.locations for delete
    using (auth.uid() = teacher_id);

-- Lessons policies
create policy "Teachers can view their own lessons"
    on public.lessons for select
    using (auth.uid() = teacher_id);

create policy "Teachers can insert their own lessons"
    on public.lessons for insert
    with check (auth.uid() = teacher_id);

create policy "Teachers can update their own lessons"
    on public.lessons for update
    using (auth.uid() = teacher_id);

create policy "Teachers can delete their own lessons"
    on public.lessons for delete
    using (auth.uid() = teacher_id);

-- Lesson students policies
create policy "Teachers can view their lessons' students"
    on public.lesson_students for select
    using (
        exists (
            select 1 from public.lessons
            where lessons.id = lesson_students.lesson_id
            and lessons.teacher_id = auth.uid()
        )
    );

create policy "Teachers can manage their lessons' students"
    on public.lesson_students for insert
    with check (
        exists (
            select 1 from public.lessons
            where lessons.id = lesson_students.lesson_id
            and lessons.teacher_id = auth.uid()
        )
    );

-- Create updated_at triggers if they don't exist
create or replace function public.handle_updated_at()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

drop trigger if exists locations_updated_at on public.locations;
create trigger locations_updated_at
    before update on public.locations
    for each row
    execute function public.handle_updated_at();

drop trigger if exists lessons_updated_at on public.lessons;
create trigger lessons_updated_at
    before update on public.lessons
    for each row
    execute function public.handle_updated_at();

drop trigger if exists lesson_students_updated_at on public.lesson_students;
create trigger lesson_students_updated_at
    before update on public.lesson_students
    for each row
    execute function public.handle_updated_at();

-- Create indexes for better query performance
create index if not exists lessons_teacher_id_idx on public.lessons(teacher_id);
create index if not exists lessons_location_id_idx on public.lessons(location_id);
create index if not exists lessons_start_time_idx on public.lessons(start_time);
create index if not exists lesson_students_lesson_id_idx on public.lesson_students(lesson_id);
create index if not exists lesson_students_student_id_idx on public.lesson_students(student_id);
