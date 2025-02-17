-- Add INSERT policy for users table
create policy "Users can insert their own profile"
  on public.users for insert
  with check (auth.uid() = id);
