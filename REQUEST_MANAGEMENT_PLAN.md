# Flash Pay — Request Management Plan (Future Production)

This document outlines the planned database-backed request management system. **Step 21 implements local preview only** — no Supabase tables are created yet.

---

## Current state (Step 21 — local only)

- Public visitors submit requests via **WhatsApp** (primary path).
- Optional **local draft** stored in browser `localStorage` when `showRequestAdminPreview` is enabled.
- Admin preview at `/admin/requests` reads/writes local data only.
- **Do not enable in production** without authentication, RLS, and secure backend.

---

## Planned Supabase tables

### `service_requests`

Primary request record aligned with `AdminServiceRequest` in `src/types/adminRequest.ts`:

| Column | Type | Notes |
|--------|------|-------|
| `id` | uuid | PK |
| `request_number` | text | Unique, e.g. `FP-2026-0001` |
| `customer_name` | text | Minimal PII |
| `customer_whatsapp` | text | E.164 or normalized |
| `request_type` | text | Human-readable type |
| `service_slug` | text | Optional |
| `from_country` | text | Optional slug |
| `to_country` | text | Optional slug |
| `amount` | text | Optional — no execution claims |
| `currency` | text | Optional |
| `payment_method` | text | Optional |
| `receiving_method` | text | Optional |
| `notes` | text | Customer notes |
| `source` | enum | website_form, route_finder, chat, etc. |
| `status` | enum | new → archived |
| `priority` | enum | normal, high, urgent |
| `assigned_to` | uuid | FK → auth.users or chat_agents |
| `whatsapp_message_preview` | text | Snapshot at submission |
| `tags` | text[] | Optional |
| `last_contact_at` | timestamptz | Optional |
| `created_at` | timestamptz | |
| `updated_at` | timestamptz | |

### `request_notes`

Internal team notes (not visible to customers):

- `id`, `request_id`, `author_id`, `author_name`, `content`, `created_at`

### `request_events`

Audit / activity timeline:

- `id`, `request_id`, `event_type`, `label_ar`, `label_en`, `meta`, `actor_id`, `created_at`

### `request_assignments`

Assignment history:

- `id`, `request_id`, `agent_id`, `agent_name`, `assigned_at`, `unassigned_at`

### `request_tags`

Normalized tags for filtering:

- `request_id`, `tag`

---

## Production requirements (before go-live)

### Authentication & authorization

- Supabase Auth for admin users
- `ADMIN_ALLOWED_EMAILS` or roles table mapping emails → roles
- Middleware protection for `/admin/*` routes
- Session refresh and secure cookies

### Row Level Security (RLS)

- **Public anon**: insert-only on `service_requests` via Edge Function or validated API (rate-limited)
- **Admin roles**: read/update assigned or all requests based on role
- **Service role**: server-only for migrations and batch jobs — never in client bundle

### Security & abuse prevention

- Rate limiting per IP / WhatsApp number on create
- Spam detection (duplicate submissions, honeypot fields)
- Input validation and sanitization **server-side** (required before production)
- No secrets in client code

### Step 29 — Client-side form hardening (local only)

Current public forms (`/request`, `/contact`, `/business`, `/partners`) use:

- `src/lib/forms/validation.ts` — field, phone, amount, message checks
- `src/lib/forms/spamProtection.ts` — honeypot, 30s cooldown, 5 submits / 10 min (localStorage)
- `src/lib/forms/submitWhatsAppForm.ts` — shared WhatsApp submit pipeline

**Important:** This is **basic client-side protection only**. Before production backend:

- [ ] Server-side validation on all API routes
- [ ] Rate limiting per IP / session at edge or API
- [ ] Optional CAPTCHA or Cloudflare Turnstile (no paid service required for MVP planning)
- [ ] Never rely on client validation or honeypot alone
- [ ] Map forms via `createRequestFromGenericFormPayload()` only after server verification

Success copy uses **"تم تجهيز طلبك"** (prepared) — not **"تم استلام طلبك"** unless real backend receipt is active.

### Data lifecycle

- Retention policy (archive/delete after N months)
- Export for compliance (CSV/JSON, admin-only)
- PII minimization — store only what operations need

### Audit trail

- All status/priority/assignment changes in `request_events`
- Actor ID on every mutation
- Immutable event log (append-only)

### WhatsApp integration

- Track when staff opens WhatsApp link (optional event)
- Do **not** auto-claim money moved or execution completed
- Safe status language only (see Step 21 safety rules)

### Notifications (future)

- Email/Telegram/push when new urgent request
- Daily digest for unassigned requests
- Optional Supabase Realtime for admin inbox refresh

### Reporting

- Counts by status, source, country, currency
- Agent workload
- No fake transaction or settlement metrics

---

## Migration path from Step 21

1. Create Supabase schema + RLS policies (production-safe, not local-dev anon policies).
2. Replace `requestRepository.ts` localStorage with server actions or API routes.
3. Keep `createRequestFromFormPayload()` as the shared mapper from public forms.
4. Wire `/business`, `/partners`, `/contact`, `/markets`, chat handoff via `FUTURE_REQUEST_SOURCE_MAP`.
5. Set `showRequestAdminPreview: false` in production until auth is verified.
6. Enable authenticated access to `/admin/requests` only.
7. Update public success copy when backend is live (only then claim internal receipt).

---

## Feature flags

| Flag | Local dev | Production |
|------|-----------|------------|
| `showRequestAdminPreview` | `true` for preview | **`false`** until auth + DB |
| `enableAdminAuth` | optional | **`true`** required |

---

## References

- Types: `src/types/adminRequest.ts`
- Repository: `src/lib/requests/requestRepository.ts`
- Form mapper: `src/lib/requests/requestUtils.ts` → `createRequestFromFormPayload()`
- Admin access: `src/lib/auth/adminAuth.ts` → `resolveAdminRequestsAccess()`
