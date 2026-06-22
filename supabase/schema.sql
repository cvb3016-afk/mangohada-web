-- 망고하다 웹 - Phase 1 schema (회원가입/로그인 + 문의사항)
-- Supabase 대시보드 SQL Editor에서 전체 내용을 붙여넣고 Run 하세요.

-- 1. 회원 프로필 (auth.users 1:1)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  name text,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "profiles_select_own" on public.profiles
  for select using (auth.uid() = id);

create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = id);

-- 회원가입 시 자동으로 프로필 생성
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, name)
  values (new.id, new.email, new.raw_user_meta_data->>'name');
  return new;
end;
$$ language plpgsql security definer set search_path = public;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 2. 문의사항 (회원/비회원 모두 작성 가능)
create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  name text not null,
  phone text,
  title text not null,
  content text not null,
  status text not null default 'pending', -- pending | answered
  answer text,
  created_at timestamptz not null default now()
);

alter table public.inquiries enable row level security;

-- 누구나 문의 작성 가능 (비회원 포함)
create policy "inquiries_insert_anyone" on public.inquiries
  for insert with check (true);

-- 본인 문의만 조회 (로그인 회원)
create policy "inquiries_select_own" on public.inquiries
  for select using (auth.uid() = user_id);
