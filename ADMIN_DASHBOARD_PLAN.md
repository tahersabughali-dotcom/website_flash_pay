# Flash Pay — Admin Dashboard Plan

This document outlines the local admin control panel (Step 26) and future production requirements.

---

## Current local preview routes

| Route | Purpose | Feature flag |
|-------|---------|--------------|
| `/admin` | Main control panel overview | `showAdminDashboardPreview` |
| `/admin/requests` | Request management (localStorage) | `showRequestAdminPreview` |
| `/admin/chat` | Chat admin inbox | `showChatAdminPreview` |
| `/admin/content` | Content source overview | `showContentAdminPreview` + dashboard flag |
| `/admin/coverage` | Global coverage review | `showAdminDashboardPreview` |
| `/admin/settings` | Read-only settings preview | `showAdminDashboardPreview` |
| `/admin/login` | Auth foundation (when enabled) | `enableAdminAuth` |

**All routes:**

- `robots: noindex, nofollow`
- Not in public navigation, footer, or sitemap
- Blocked in production without Supabase Auth + `ADMIN_ALLOWED_EMAILS`

---

## Security warning

**Hidden URL is not security.**

Direct URL access (`/admin`) is for local development preview only. Production must use:

- Supabase Auth (or equivalent)
- Admin roles and permissions
- RLS on all admin data tables
- Rate limiting and audit logging
- Feature flags set to `false` until auth is verified

---

## Future production requirements

### Authentication

- Supabase Auth magic link / OAuth
- `ADMIN_ALLOWED_EMAILS` server-side only
- Session middleware on all `/admin/*` routes
- Login at `/admin/login`

### Admin roles (planned)

| Role | Access |
|------|--------|
| `super_admin` | Full platform control |
| `admin` | Requests, chat, content, settings |
| `editor` | Content management |
| `support` | Chat + requests |
| `analyst` | Read-only dashboards |

(Current codebase uses: `super_admin`, `admin`, `support_agent`, `viewer`)

### Database tables (future)

- `service_requests` — request management (see `REQUEST_MANAGEMENT_PLAN.md`)
- `content_revisions` — CMS history
- `admin_audit_log` — who changed what
- `media_assets` — uploaded files
- `admin_activity` — login and action history

### RLS policies

- Public: no read/write on admin tables
- Authenticated admin: role-scoped CRUD
- Service role: server-only migrations and batch jobs

### Features to build later

- Real content editor (not browser file writes)
- Media upload with virus scan
- Request database sync (replace localStorage)
- Activity history and exports
- Notifications for new requests/chats
- Production feature flags all `false` by default

---

## Production flag defaults

| Flag | Production default |
|------|-------------------|
| `showAdminDashboardPreview` | `false` |
| `showContentAdminPreview` | `false` |
| `showRequestAdminPreview` | `false` |
| `showChatAdminPreview` | `false` |
| `enableAdminAuth` | `true` only when Supabase Auth ready |

---

## Step 31 — Production lockdown rules

Resolved flags live in **`src/lib/config/featureFlags.ts`**. Raw values in `featureFlagsData.ts` are for **local development only**.

| Rule | Requirement |
|------|-------------|
| Admin preview flags | **Resolved OFF in production** unless explicit `NEXT_PUBLIC_ENABLE_*` env vars |
| `ENABLE_ADMIN_AUTH` | `false` until Supabase Auth + `ADMIN_ALLOWED_EMAILS` + RLS |
| Supabase RLS | Required before any production database writes |
| Form protection | Client-side only — **server validation required** before backend |
| `enableChatAi` / `NEXT_PUBLIC_ENABLE_CHAT_AI` | **false** until guardrails tested |
| `enableLiveChatRealtime` | **false** until Supabase secured |
| Hidden URL | **Not protection** — use auth + permissions |
| Service role key | **Never** in client bundle |

Env template: `.env.example` (all preview overrides default `false`).

---

## Step 27 — Admin login & security foundation (local)

### Auth feature flags

| Flag | Local default | Production |
|------|---------------|------------|
| `enableAdminAuth` | `false` | `true` only when Supabase Auth + `ADMIN_ALLOWED_EMAILS` ready |
| `showAdminDashboardPreview` | `true` (local) | **`false`** |
| `showChatAdminPreview` | `true` (local) | **`false`** |
| `showRequestAdminPreview` | `true` (local) | **`false`** |
| `showContentAdminPreview` | `true` (local) | **`false`** |
| `NEXT_PUBLIC_ENABLE_ADMIN_PREVIEW` | `false` | **`false`** |

**Preview flags are local-only.** Hidden URL is not real security.

### Guards

- `src/lib/auth/resolveAdminRouteAccess.ts` — shared `resolveAdminRouteGate()` for all protected routes
- `src/lib/auth/resolveAdminDashboardAccess.ts` — dashboard, content, coverage, settings
- `src/lib/auth/adminAuth.ts` — chat and requests (requests uses shared gate)
- `middleware.ts` — blocks `/admin/*` when preview off; redirects to login in production without auth
- `/admin/login` — always reachable as safe placeholder (no secrets, no fake login)

### Production safety

- `src/lib/auth/adminProductionSafety.ts` — detects unsafe production config (preview on + auth off)
- Status shown as yes/no only in `/admin/settings` and dashboard system panel
- **`SUPABASE_SERVICE_ROLE_KEY` must never be exposed to the browser**

---

## References

- Access guards: `src/lib/auth/resolveAdminRouteAccess.ts`, `resolveAdminDashboardAccess.ts`
- Production safety: `src/lib/auth/adminProductionSafety.ts`
- Dashboard stats: `src/lib/admin/adminDashboardStats.ts`
- Request plan: `REQUEST_MANAGEMENT_PLAN.md`
- Pre-launch: `PRE_LAUNCH_CHECKLIST.md`
