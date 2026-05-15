-- AdverX Store Supabase schema
create extension if not exists "uuid-ossp";

create type public.order_status as enum ('pending', 'paid', 'failed', 'refunded');
create type public.download_status as enum ('active', 'expired', 'revoked');

create table public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  full_name text,
  avatar_url text,
  role text not null default 'customer' check (role in ('customer', 'seller', 'admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.categories (
  id uuid primary key default uuid_generate_v4(),
  name text not null unique,
  slug text not null unique,
  description text,
  created_at timestamptz not null default now()
);

create table public.products (
  id uuid primary key default uuid_generate_v4(),
  seller_id uuid references public.users(id) on delete set null,
  category_id uuid references public.categories(id) on delete set null,
  title text not null,
  slug text not null unique,
  description text not null,
  thumbnail_path text,
  gallery_paths text[] not null default '{}',
  file_path text not null,
  price numeric(10,2) not null check (price >= 0),
  tags text[] not null default '{}',
  is_published boolean not null default false,
  is_trending boolean not null default false,
  sales_count integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.coupons (
  id uuid primary key default uuid_generate_v4(),
  code text not null unique,
  discount_percent integer check (discount_percent between 1 and 100),
  discount_amount numeric(10,2),
  max_redemptions integer,
  redeemed_count integer not null default 0,
  expires_at timestamptz,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.orders (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.users(id) on delete set null,
  product_id uuid not null references public.products(id) on delete restrict,
  coupon_id uuid references public.coupons(id) on delete set null,
  provider text not null default 'lemonsqueezy',
  provider_order_id text unique,
  amount numeric(10,2) not null,
  status public.order_status not null default 'pending',
  metadata jsonb not null default '{}',
  created_at timestamptz not null default now()
);

create table public.downloads (
  id uuid primary key default uuid_generate_v4(),
  order_id uuid not null references public.orders(id) on delete cascade,
  user_id uuid references public.users(id) on delete cascade,
  product_id uuid not null references public.products(id) on delete cascade,
  token uuid not null default uuid_generate_v4(),
  status public.download_status not null default 'active',
  expires_at timestamptz not null default (now() + interval '7 days'),
  download_count integer not null default 0,
  created_at timestamptz not null default now()
);

create table public.reviews (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.users(id) on delete cascade,
  product_id uuid not null references public.products(id) on delete cascade,
  rating integer not null check (rating between 1 and 5),
  comment text,
  created_at timestamptz not null default now(),
  unique(user_id, product_id)
);

create table public.wishlist (
  user_id uuid references public.users(id) on delete cascade,
  product_id uuid references public.products(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, product_id)
);

alter table public.users enable row level security;
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.coupons enable row level security;
alter table public.orders enable row level security;
alter table public.downloads enable row level security;
alter table public.reviews enable row level security;
alter table public.wishlist enable row level security;

create policy "Public can read published products" on public.products for select using (is_published = true);
create policy "Public can read categories" on public.categories for select using (true);
create policy "Users can read own profile" on public.users for select using (auth.uid() = id);
create policy "Users can update own profile" on public.users for update using (auth.uid() = id);
create policy "Users can read own orders" on public.orders for select using (auth.uid() = user_id);
create policy "Users can read own downloads" on public.downloads for select using (auth.uid() = user_id);
create policy "Users can manage own wishlist" on public.wishlist for all using (auth.uid() = user_id);
create policy "Users can create reviews" on public.reviews for insert with check (auth.uid() = user_id);
create policy "Public can read reviews" on public.reviews for select using (true);

create index products_search_idx on public.products using gin (to_tsvector('english', title || ' ' || description));
create index orders_user_idx on public.orders(user_id, created_at desc);
create index downloads_token_idx on public.downloads(token);

insert into public.categories (name, slug, description) values
('Design','design','UI kits and design assets'),('Templates','templates','Website and creator templates'),('Code','code','Reusable code products'),('Marketing','marketing','Growth assets'),('AI','ai','AI prompt packs'),('E-books','ebooks','Digital guides')
on conflict do nothing;
