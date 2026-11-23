-- YEEZY PODS · Supabase schema + RLS + seed
-- Ejecutar en Supabase → SQL Editor. Es idempotente (se puede correr más de una vez).
-- IMPORTANTE: reemplazá 'admin@yeezypods.com' por tu ADMIN_EMAIL (ver función is_admin()).

create table if not exists public.products (
  id          uuid primary key default gen_random_uuid(),
  brand       text not null,
  model       text not null,
  puffs       integer not null,
  price_ars   integer not null,
  flavors     text[] not null default '{}',
  image_url   text,
  render_mode text not null default 'color' check (render_mode in ('texture','color')),
  active      boolean not null default true,
  created_at  timestamptz not null default now()
);

-- Imágenes descargadas por la automatización (se sirven desde /api/images/<id>)
create table if not exists public.product_images (
  id           uuid primary key default gen_random_uuid(),
  content_type text not null,
  data         bytea not null,
  source_url   text,
  created_at   timestamptz not null default now()
);

create table if not exists public.image_search_cache (
  query      text primary key,
  image_url  text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.automation_logs (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  product_id    uuid,
  product_label text not null,
  status        text not null,
  detail        text
);

create table if not exists public.app_meta (
  key   text primary key,
  value text not null
);

-- ───────────── RLS ─────────────
create or replace function public.is_admin() returns boolean
language sql stable as $$
  select coalesce(auth.jwt() ->> 'email', '') = 'santiagojeda873@gmail.com'  -- <- tu ADMIN_EMAIL
$$;

alter table public.products           enable row level security;
alter table public.product_images     enable row level security;
alter table public.image_search_cache enable row level security;
alter table public.automation_logs    enable row level security;
alter table public.app_meta           enable row level security;

drop policy if exists "public read active products" on public.products;
create policy "public read active products" on public.products
  for select using (active = true);

drop policy if exists "admin full access products" on public.products;
create policy "admin full access products" on public.products
  for all using (public.is_admin()) with check (public.is_admin());

-- Imágenes: lectura pública (son fotos de catálogo); escritura solo admin.
drop policy if exists "public read images" on public.product_images;
create policy "public read images" on public.product_images for select using (true);
drop policy if exists "admin write images" on public.product_images;
create policy "admin write images" on public.product_images
  for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "admin cache" on public.image_search_cache;
create policy "admin cache" on public.image_search_cache
  for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "admin logs" on public.automation_logs;
create policy "admin logs" on public.automation_logs
  for all using (public.is_admin()) with check (public.is_admin());

-- app_meta: sin policies = solo accesible con la conexión directa del servidor (rol postgres).

-- ───────────── Seed del catálogo base (solo si la tabla está vacía) ─────────────
insert into public.products (brand, model, puffs, price_ars, flavors, render_mode, active)
select * from (values
  ('ELFBAR',      'BC 15K',   15000, 16000, array['Strawberry Kiwi','Strawberry Water'], 'color', true),
  ('LOST MARY',   'DURA 35K', 35000, 21000, array['Grapefruit Pass','Pome Cherry Pineapple'], 'color', true),
  ('ELFBAR',      'DISP 30K', 30000, 23000, array['Bubbaloo Tutti','Pineapple Ice'], 'color', true),
  ('IGNITE',      'VMIX 40K', 40000, 25000, array['New Pineapple + Passion Fruit','New Kiwi Passion Guava Ice + Strawberry Ice'], 'color', true),
  ('BLACK SHEEP', '55K',      55000, 27000, array['Mixed Berry'], 'color', true)
) as seed(brand, model, puffs, price_ars, flavors, render_mode, active)
where not exists (select 1 from public.products);

insert into public.app_meta (key, value) values ('seeded', 'true') on conflict do nothing;
