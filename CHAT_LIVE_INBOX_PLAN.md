# Flash Pay — Live Chat Admin Inbox Plan

This document describes the future production implementation for live visitor ↔ agent chat.
**Current status:** local preview at `/admin/chat` with mock fallback or Supabase live test (Step 17A). Production auth and strict RLS are **not** enabled yet.

---

## Step 17A — Test live chat locally (no deploy)

Use this checklist to validate visitor ↔ admin chat with Supabase on `http://localhost:3000` only.

### 1. Environment (`.env.local` — never commit)

Copy from `.env.example` and set:

- `NEXT_PUBLIC_SITE_URL=http://localhost:3000`
- `NEXT_PUBLIC_SUPABASE_URL` (project URL)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` (anon key only in browser)
- `SUPABASE_SERVICE_ROLE_KEY` (server only — never import in client components)

Do **not** log secret values. The admin status panel shows yes/no only.

### 2. Apply schema in Supabase SQL Editor

Run `supabase/schema.sql`. Confirm tables exist:

- `chat_sessions`
- `chat_messages`
- `chat_agents`

RLS is enabled by default. For **local testing only**, uncomment the `LOCAL DEVELOPMENT ONLY` policies at the bottom of `schema.sql`. Do **not** use these in production.

### 3. Enable Realtime (manual — Supabase dashboard)

In **Database → Publications → supabase_realtime**, add:

- `public.chat_sessions`
- `public.chat_messages`

Or run the commented SQL at the bottom of `schema.sql`. Without this, chat still works via 5-second polling fallback (admin + visitor).

### 4. Run locally

```bash
npm run dev
```

Open two windows:

| Window | URL | Action |
|--------|-----|--------|
| A | `http://localhost:3000/` | Open chat widget, send messages |
| B | `http://localhost:3000/admin/chat` | View inbox, reply as agent |

### 5. Verify

- `/admin/chat` status panel: Supabase configured, schema probe, Realtime probe
- Visitor message → appears in admin inbox
- Agent reply → appears in visitor chat (Realtime or polling)
- Handoff (`التحدث مع موظف`) → `waiting_for_human` in both UIs
- Mock toggle in admin panel for fallback testing only

### 6. Before production

- Remove/disable local-dev anon RLS policies
- Apply production RLS examples from `schema.sql`
- Enable `enableAdminAuth` + `ADMIN_ALLOWED_EMAILS`
- Set `showChatAdminPreview: false`
- Re-run `npx tsx scripts/run-chat-tests.ts`

---

## 1. Supabase project

- Create a dedicated Supabase project for Flash Pay chat (separate from future core app DB if needed).
- Enable Row Level Security (RLS) on all chat tables.
- Use Supabase Realtime for session and message subscriptions.

---

## 2. Database tables

### `chat_sessions`

| Column | Type | Notes |
|--------|------|--------|
| id | uuid | Primary key |
| visitor_session_id | text | Anonymous browser session id (cookie/localStorage) |
| visitor_name | text | Optional display label |
| visitor_contact | text | Optional email/phone — never required at start |
| country | text | Optional |
| status | enum | `bot`, `waiting_for_human`, `human`, `closed` |
| priority | enum | `normal`, `high` |
| assigned_agent_id | uuid | Nullable FK → `chat_agents` |
| last_message | text | Denormalized for inbox list |
| created_at | timestamptz | |
| updated_at | timestamptz | |

### `chat_messages`

| Column | Type | Notes |
|--------|------|--------|
| id | uuid | Primary key |
| session_id | uuid | FK → `chat_sessions` |
| sender | enum | `visitor`, `bot`, `human`, `system` |
| content | text | Message body |
| metadata | jsonb | Optional (AI source, handoff flags) |
| created_at | timestamptz | |

### `chat_agents`

| Column | Type | Notes |
|--------|------|--------|
| id | uuid | Primary key |
| user_id | uuid | Supabase Auth user |
| display_name | text | |
| role | enum | `agent`, `supervisor` |
| is_online | boolean | Presence |
| last_seen_at | timestamptz | |

### Optional: `chat_internal_notes`

Separate table if notes should not appear in visitor-visible message stream.

---

## 3. Realtime subscription

- **Visitor widget:** subscribe to `chat_messages` for their `session_id`.
- **Admin inbox:** subscribe to `chat_sessions` (inbox list updates) and selected session messages.
- Use Supabase channels with RLS so agents only see authorized sessions.

---

## 4. Agent login

- Supabase Auth (email + magic link or SSO).
- Middleware protecting `/admin/*` routes.
- Role check: only `chat_agents` rows can access inbox.
- **Do not ship `/admin/chat` publicly without this.**

---

## 5. Visitor anonymous session id

- Generate `visitor_session_id` on first chat open (UUID in localStorage).
- Create or resume `chat_sessions` row on widget open.
- No login required for visitors in v1.

---

## 6. Session status changes

| Event | Status transition |
|-------|-------------------|
| Widget opened | `bot` |
| User clicks "Talk to agent" | `waiting_for_human` |
| Agent sends first reply | `human` |
| Agent closes chat | `closed` |
| Agent reopens | `human` |

Broadcast status changes via Realtime to update both widget and inbox.

---

## 7. Bot-to-human handoff

1. Visitor triggers handoff → insert system message + set `waiting_for_human`.
2. Notify agents (inbox badge, optional email/push later).
3. Agent claims session → set `assigned_agent_id`, status `human`.
4. Agent replies → insert `human` message → Realtime to visitor widget.

---

## 8. AI fallback

- Keep `/api/chat` for bot responses when status is `bot`.
- When status is `waiting_for_human` or `human`, disable AI auto-replies.
- Server-only `OPENAI_API_KEY` with strict system prompt (already drafted in `localChatEngine.ts`).
- Log AI vs human messages in `metadata`.

---

## 9. Privacy and data retention

- Define retention period for closed sessions (e.g. 90 days).
- Allow export/delete requests where applicable.
- Do not store payment credentials or full KYC in chat.
- Minimize PII collected in widget forms.
- Document in Trust Center when live chat launches.

---

## 10. Production security checklist

- [ ] Authentication on all `/admin/*` routes
- [ ] RLS policies tested (visitor cannot read other sessions)
- [ ] `showChatAdminPreview: false` in production until auth is live
- [ ] `/admin/` disallowed in `robots.txt` (already configured)
- [ ] `/admin/chat` excluded from sitemap (not in `staticPageSeo`)
- [ ] Rate limiting on `/api/chat` and session creation
- [ ] Audit log for agent actions
- [ ] HTTPS only
- [ ] No secrets in client bundles
- [ ] Pen-test handoff and session isolation before go-live

---

## Current foundation (Steps 12–13)

| Piece | Status |
|-------|--------|
| Public chat widget | `useVisitorChat` + `chatRepository` (Supabase or local fallback) |
| Admin inbox UI | `useAdminChatStore` — Supabase when configured, mock otherwise |
| `/admin/chat` | Feature flag gated, **no auth yet** |
| Supabase client | `src/lib/supabase/*` + `supabase/schema.sql` |
| Realtime | Subscriptions in `chatRepository` when env + RLS + Realtime enabled |
| API routes | Not required for local anon foundation — see `CHAT_API_ROUTES_NOTE` in repository |

---

## Step 14 — Admin authentication + security (current)

| Piece | Status |
|-------|--------|
| Admin login UI | `/admin/login` — magic link ready when Supabase configured |
| Admin route guard | Server `resolveAdminChatAccess()` + middleware scaffold |
| Role permissions | `super_admin`, `admin`, `support_agent`, `viewer` |
| Email allowlist | Server-only `ADMIN_ALLOWED_EMAILS` |
| Production block | `/admin/chat` blocked in production without auth |
| Local preview | Development + `showChatAdminPreview` only |

### Production requirements (must all be true)

- [ ] `/admin/chat` protected — **never public without authentication**
- [ ] Supabase Auth enabled with magic link or password
- [ ] `ADMIN_ALLOWED_EMAILS` configured on server (never in client)
- [ ] `enableAdminAuth: true` in feature flags
- [ ] `showChatAdminPreview: false` and `NEXT_PUBLIC_ENABLE_ADMIN_PREVIEW=false`
- [ ] Production RLS policies applied — **do not enable broad anon select in production**
- [ ] `SUPABASE_SERVICE_ROLE_KEY` never exposed to browser
- [ ] Admin routes not linked publicly, not in sitemap, robots noindex
- [ ] Middleware validates Supabase session (TODO: harden email allowlist check in middleware)

See `src/lib/auth/adminAuthNotes.ts` and `src/lib/auth/adminAuth.ts`.

---

## Step 16 — Chat QA before public launch

Before enabling the public chat widget or Supabase live inbox for real users:

| Requirement | Detail |
|-------------|--------|
| QA test cases | Run `scripts/run-chat-tests.ts` or `window.flashPayRunChatTests()` — see `src/data/chatTestCasesData.ts` |
| AI disabled | `enableChatAi: false` unless separately tested |
| Supabase secured | Production RLS, no service role in client, Realtime scoped |
| Admin protected | `/admin/chat` requires auth — never public |
| Legal-safe answers | No guaranteed rates, fees, timing, or agency claims in bot replies |
| Human handoff | WhatsApp is the fastest contact path until live agents are active |

Re-run QA after any change to `chatKnowledgeData.ts`, `chatIntentsData.ts`, `chatAnswerTemplates.ts`, `chatGuardrails.ts`, or `localChatEngine.ts`.

---

## Next steps after Step 13

1. Run `supabase/schema.sql` and enable Realtime publications.
2. Add production RLS (visitor scoped to own `visitor_id`, agents scoped to auth).
3. Protect `/admin/*` with middleware + Supabase Auth.
4. Optional: server API routes with service role for privileged admin writes.
5. Disable mock fallback in production (`showChatAdminPreview` + strict env checks).
