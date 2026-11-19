-- cargosight schema. Run in the Supabase SQL editor.
create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text, full_name text, company text,
  plan text not null default 'free' check (plan in ('free','starter','pro')),
  ai_credits int not null default 5,
  created_at timestamptz not null default now()
);

create table if not exists public.carriers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null, scac text, mode text default 'road',
  connection text default 'api' check (connection in ('app','telematics','api','edi')),
  status text default 'invited' check (status in ('invited','connecting','live','paused')),
  on_time_pct numeric default 0, created_at timestamptz default now()
);

create table if not exists public.shipments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  reference text not null, carrier_id uuid references public.carriers(id) on delete set null,
  mode text not null default 'ocean' check (mode in ('ocean','road','air','rail')),
  origin text not null, destination text not null,
  status text not null default 'in_transit' check (status in ('booked','in_transit','delayed','at_risk','delivered')),
  planned_eta timestamptz, predicted_eta timestamptz,
  cargo_value numeric default 0, weight_kg numeric default 0, created_at timestamptz default now()
);

create table if not exists public.exceptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  shipment_id uuid references public.shipments(id) on delete cascade,
  type text not null, severity text not null default 'medium' check (severity in ('low','medium','high','critical')),
  description text, status text not null default 'open' check (status in ('open','resolved')),
  ai_analysis jsonb, created_at timestamptz default now()
);

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null, body text, read boolean default false, created_at timestamptz default now()
);

create table if not exists public.documents (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  shipment_id uuid references public.shipments(id) on delete set null,
  name text not null, path text not null, size bigint, created_at timestamptz default now()
);

create table if not exists public.usage_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  kind text not null, credits int default 1, created_at timestamptz default now()
);

create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  plan text not null check (plan in ('starter','pro')),
  status text not null default 'active', reference text, activated_at timestamptz default now()
);

create table if not exists public.demo_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null, email text not null, company text, message text,
  created_at timestamptz default now()
);

-- RLS
alter table public.profiles enable row level security;
alter table public.carriers enable row level security;
alter table public.shipments enable row level security;
alter table public.exceptions enable row level security;
alter table public.notifications enable row level security;
alter table public.documents enable row level security;
alter table public.usage_events enable row level security;
alter table public.subscriptions enable row level security;
alter table public.demo_requests enable row level security;

create policy "own profile read" on public.profiles for select using (auth.uid() = id);
create policy "own profile update" on public.profiles for update using (auth.uid() = id)
  with check (auth.uid() = id and plan = (select plan from public.profiles where id = auth.uid()) and ai_credits = (select ai_credits from public.profiles where id = auth.uid()));

do $$ declare t text; begin
  foreach t in array array['carriers','shipments','exceptions','notifications','documents'] loop
    execute format('create policy "own select" on public.%I for select using (auth.uid() = user_id)', t);
    execute format('create policy "own insert" on public.%I for insert with check (auth.uid() = user_id)', t);
    execute format('create policy "own update" on public.%I for update using (auth.uid() = user_id)', t);
    execute format('create policy "own delete" on public.%I for delete using (auth.uid() = user_id)', t);
  end loop;
end $$;
create policy "own usage read" on public.usage_events for select using (auth.uid() = user_id);
create policy "own subs read" on public.subscriptions for select using (auth.uid() = user_id);
create policy "anyone can request demo" on public.demo_requests for insert with check (true);
-- plans, credits, subscriptions and usage are written only by the server (service role).

create or replace function public.handle_new_user() returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, full_name, company)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'company');
  return new;
end $$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_user();

-- Storage bucket for documents (private, per-user folder)
insert into storage.buckets (id, name, public) values ('documents','documents', false) on conflict do nothing;
create policy "docs own read" on storage.objects for select using (bucket_id='documents' and auth.uid()::text = (storage.foldername(name))[1]);
create policy "docs own write" on storage.objects for insert with check (bucket_id='documents' and auth.uid()::text = (storage.foldername(name))[1]);
create policy "docs own delete" on storage.objects for delete using (bucket_id='documents' and auth.uid()::text = (storage.foldername(name))[1]);

-- Plan limits enforced in the database (cannot be bypassed from the client)
create or replace function public.enforce_plan_limit() returns trigger language plpgsql security definer set search_path = public as $$
declare p text; n int; lim int;
begin
  select plan into p from public.profiles where id = new.user_id;
  execute format('select count(*) from public.%I where user_id = $1', tg_table_name) into n using new.user_id;
  lim := case when tg_table_name = 'shipments' then (case p when 'free' then 25 when 'starter' then 500 else 1000000 end)
              else (case p when 'free' then 3 when 'starter' then 25 else 1000000 end) end;
  if n >= lim then raise exception 'Plan limit reached (%). Upgrade your plan to add more.', lim; end if;
  return new;
end $$;
drop trigger if exists shipments_limit on public.shipments;
create trigger shipments_limit before insert on public.shipments for each row execute function public.enforce_plan_limit();
drop trigger if exists carriers_limit on public.carriers;
create trigger carriers_limit before insert on public.carriers for each row execute function public.enforce_plan_limit();
