-- 망고하다 웹 - 관리자(admin) 권한 스키마
-- schema.sql을 먼저 실행한 뒤, 이 파일을 SQL Editor에서 실행하세요.

create table if not exists public.admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.admins enable row level security;

create policy "admins_select_self" on public.admins
  for select using (auth.uid() = user_id);

-- 현재 로그인한 사용자가 관리자인지 확인하는 함수
create or replace function public.is_admin()
returns boolean as $$
  select exists (
    select 1 from public.admins where user_id = auth.uid()
  );
$$ language sql security definer stable;

-- 관리자는 모든 회원 프로필을 볼 수 있음
create policy "profiles_select_admin" on public.profiles
  for select using (public.is_admin());

-- 관리자는 모든 문의를 보고, 답변(수정)할 수 있음
create policy "inquiries_select_admin" on public.inquiries
  for select using (public.is_admin());

create policy "inquiries_update_admin" on public.inquiries
  for update using (public.is_admin());

-- 아래 줄의 'YOUR-USER-UUID'를 실제 관리자로 만들 계정의 UUID로 바꿔서 실행하세요.
-- UUID는 Supabase 대시보드 Authentication > Users 목록에서 확인할 수 있어요.
-- insert into public.admins (user_id) values ('YOUR-USER-UUID');
