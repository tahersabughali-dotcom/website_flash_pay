-- Flash Pay Global Platform — Live Chat schema (Supabase / PostgreSQL)
-- Run in Supabase SQL Editor for local or staging projects.
-- No real customer data. No secrets in this file.
--
-- IMPORTANT: Review and tighten RLS policies before production.
-- The optional local-dev policies at the bottom are NOT safe for production.

-- ---------------------------------------------------------------------------
-- Extensions
-- ---------------------------------------------------------------------------
create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- chat_agents (future authenticated support staff)
-- ---------------------------------------------------------------------------
create table if not exists public.chat_agents (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null unique,
  role text not null default 'agent'
    check (role in ('agent', 'supervisor')),
  status text not null default 'active'
    check (status in ('active', 'inactive', 'offline')),
  created_at timestamptz not null default now()
);

create index if not exists chat_agents_email_idx on public.chat_agents (email);
create index if not exists chat_agents_status_idx on public.chat_agents (status);

-- ---------------------------------------------------------------------------
-- chat_sessions
-- ---------------------------------------------------------------------------
create table if not exists public.chat_sessions (
  id uuid primary key default gen_random_uuid(),
  visitor_id text not null,
  visitor_name text,
  visitor_contact text,
  country text,
  status text not null default 'bot'
    check (status in ('bot', 'waiting_for_human', 'human', 'closed')),
  priority text not null default 'normal'
    check (priority in ('normal', 'high')),
  source text not null default 'website_widget',
  assigned_agent_id uuid references public.chat_agents (id) on delete set null,
  last_message text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  closed_at timestamptz
);

create index if not exists chat_sessions_visitor_id_idx on public.chat_sessions (visitor_id);
create index if not exists chat_sessions_status_idx on public.chat_sessions (status);
create index if not exists chat_sessions_updated_at_idx on public.chat_sessions (updated_at desc);
create index if not exists chat_sessions_assigned_agent_idx on public.chat_sessions (assigned_agent_id);

-- ---------------------------------------------------------------------------
-- chat_messages
-- ---------------------------------------------------------------------------
create table if not exists public.chat_messages (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.chat_sessions (id) on delete cascade,
  sender text not null
    check (sender in ('visitor', 'bot', 'human', 'system')),
  body text not null,
  metadata jsonb,
  created_at timestamptz not null default now()
);

create index if not exists chat_messages_session_id_idx on public.chat_messages (session_id);
create index if not exists chat_messages_created_at_idx on public.chat_messages (session_id, created_at);

-- ---------------------------------------------------------------------------
-- updated_at trigger for chat_sessions
-- ---------------------------------------------------------------------------
create or replace function public.set_chat_sessions_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists chat_sessions_set_updated_at on public.chat_sessions;
create trigger chat_sessions_set_updated_at
before update on public.chat_sessions
for each row
execute function public.set_chat_sessions_updated_at();

-- ---------------------------------------------------------------------------
-- Row Level Security — enable on all chat tables
-- Production policies MUST restrict visitor/admin access appropriately.
-- ---------------------------------------------------------------------------
alter table public.chat_agents enable row level security;
alter table public.chat_sessions enable row level security;
alter table public.chat_messages enable row level security;

-- Default: deny all until policies are added (safe for empty projects).
-- Add policies in Supabase dashboard or uncomment local-dev section below.

-- ---------------------------------------------------------------------------
-- Realtime (enable manually in Supabase dashboard after tables exist)
-- Dashboard → Database → Publications → supabase_realtime → add tables:
--   - public.chat_sessions
--   - public.chat_messages
-- Or run in SQL Editor:
-- ---------------------------------------------------------------------------
-- alter publication supabase_realtime add table public.chat_sessions;
-- alter publication supabase_realtime add table public.chat_messages;

-- ---------------------------------------------------------------------------
-- OPTIONAL — LOCAL DEVELOPMENT ONLY (NOT FOR PRODUCTION)
-- Uncomment only for local testing without auth. Replace before go-live.
-- ---------------------------------------------------------------------------
-- create policy "local_dev_anon_sessions_all"
--   on public.chat_sessions for all to anon using (true) with check (true);
-- create policy "local_dev_anon_messages_all"
--   on public.chat_messages for all to anon using (true) with check (true);
-- create policy "local_dev_anon_agents_select"
--   on public.chat_agents for select to anon using (true);

-- ---------------------------------------------------------------------------
-- PRODUCTION RLS POLICY EXAMPLES (review before enabling — NOT auto-applied)
-- Do not enable broad anon select policies in production.
-- ---------------------------------------------------------------------------
-- Visitor session claim helper (example — requires auth.jwt claim or header strategy):
-- create or replace function public.current_visitor_id()
-- returns text language sql stable as $$
--   select coalesce(
--     current_setting('request.headers', true)::json->>'x-visitor-id',
--     auth.jwt()->>'visitor_id'
--   );
-- $$;

-- Visitors: read/insert only their own open session
-- create policy "visitor_select_own_session"
--   on public.chat_sessions for select to anon
--   using (visitor_id = public.current_visitor_id());
-- create policy "visitor_insert_session"
--   on public.chat_sessions for insert to anon
--   with check (visitor_id = public.current_visitor_id());

-- Visitors: read/insert messages for their session only
-- create policy "visitor_select_own_messages"
--   on public.chat_messages for select to anon
--   using (
--     session_id in (
--       select id from public.chat_sessions
--       where visitor_id = public.current_visitor_id()
--     )
--   );
-- create policy "visitor_insert_own_messages"
--   on public.chat_messages for insert to anon
--   with check (
--     sender = 'visitor'
--     and session_id in (
--       select id from public.chat_sessions
--       where visitor_id = public.current_visitor_id()
--     )
--   );

-- Authenticated agents: read sessions (all or assigned)
-- create policy "agent_select_sessions"
--   on public.chat_sessions for select to authenticated
--   using (true);
-- create policy "agent_update_sessions"
--   on public.chat_sessions for update to authenticated
--   using (true) with check (true);

-- Agents: insert human/system messages
-- create policy "agent_insert_human_messages"
--   on public.chat_messages for insert to authenticated
--   with check (sender in ('human', 'system'));

-- Admins only: manage chat_agents
-- create policy "admin_manage_agents"
--   on public.chat_agents for all to authenticated
--   using (auth.jwt()->>'email' in (select email from public.chat_agents where role = 'supervisor'))
--   with check (true);

-- WARNING: Do not enable broad anon select policies in production.
