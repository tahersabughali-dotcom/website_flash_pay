# Flash Pay Global Platform — Deployment Guide

Simple steps for deploying the website. No programming experience required for most steps.

---

## 1. Run the website locally (on your computer)

1. Open a terminal in the project folder.
2. Install dependencies (first time only):

```bash
npm install
```

3. Start the local preview:

```bash
npm run dev
```

4. Open your browser at: **http://localhost:3000**

---

## 2. Build for production (test before deploy)

```bash
npm run build
```

If this finishes without errors, the site is ready to build on the hosting server.

---

## 3. Lint (code quality check)

```bash
npm run lint
```

Fix any reported errors before deployment.

---

## 4. Settings to check before deployment

Edit **one main file**: `src/data/settingsData.ts`

| Setting | What to do |
|--------|------------|
| **whatsappNumber** | Set in `settingsData.ts` (single source of truth — do not duplicate elsewhere) |
| **websiteUrl** | Should be `https://www.flashpay.uk` when DNS is ready |
| **email** | Set your real support email (confirm the mailbox works) |
| **facebookUrl / instagramUrl / telegramUrl** | Add real links, or leave empty to hide |
| **logo** | Add file at `public/images/logo.png` (header shows text fallback if missing) |
| **seoDefaults.ogImage** | Add image at `public/images/og-default.png` (1200×630 px recommended) |
| **seoDefaults title/description** | Review wording for your market |

Also review:

- `src/data/featureFlagsData.ts` — turn off sections not ready for launch
- `src/data/socialLinksData.ts` — updates automatically from settings

**On Vercel (hosting):** add environment variable:

```
NEXT_PUBLIC_SITE_URL=https://www.flashpay.uk
```

Copy from `.env.example` — do **not** put passwords or API keys in the repo.

---

## 5. Deploy to Vercel

1. Create a free account at [vercel.com](https://vercel.com)
2. Connect your GitHub/GitLab/Bitbucket repository (or upload the project)
3. Vercel detects Next.js automatically
4. Add environment variable: `NEXT_PUBLIC_SITE_URL` = `https://www.flashpay.uk`
5. Click **Deploy**
6. Wait until the build completes successfully

Your site will get a temporary URL like `your-project.vercel.app` for testing.

---

## 6. Connect domain www.flashpay.uk

1. In Vercel: **Project → Settings → Domains**
2. Add: `www.flashpay.uk` and optionally `flashpay.uk`
3. Vercel shows the DNS records you need

---

## 7. DNS records (typical setup)

At your domain registrar (where you bought flashpay.uk), add what Vercel asks for. Usually:

| Type | Name | Value |
|------|------|--------|
| **CNAME** | `www` | `cname.vercel-dns.com` (or the value Vercel gives you) |
| **A** | `@` (root) | Vercel IP address (if you want flashpay.uk without www) |

DNS can take **15 minutes to 48 hours** to propagate.

**Do not assume DNS is connected until the domain shows as valid in Vercel.**

---

## 8. What to test after deployment

Use the checklist in **PRE_LAUNCH_CHECKLIST.md**. Minimum tests:

- Home page loads
- WhatsApp opens with correct number (after you set it)
- Forms open WhatsApp with structured messages
- `/sitemap.xml` loads in browser
- `/robots.txt` loads in browser
- Mobile layout looks correct
- `/wallet` and `/trade` show **Coming Soon** only
- Unknown URL shows 404 page
- HTTPS padlock is active (SSL)

---

## 9. Rollback if something goes wrong

**On Vercel:**

1. Go to **Deployments**
2. Find the last working deployment
3. Click **⋯ → Promote to Production**

**Locally:**

- Revert Git changes to the last good commit
- Redeploy

Keep a backup of `settingsData.ts` before major edits.

---

## 10. What NOT to change before deployment

- Do not add fake WhatsApp numbers or fake prices
- Do not claim licenses or direct agency for global brands
- Do not enable wallet balances or trading features
- Do not commit `.env.local` or secrets to Git
- Do not delete `src/data/` content files unless you know what you are doing
- Do not hardcode contact info in components — use `settingsData.ts` only

---

## Need help?

- Local run issues → check Node.js is installed (`node -v`)
- Build errors → run `npm run build` locally and read the error message
- Domain issues → wait for DNS, then check Vercel domain settings

This project does **not** include admin dashboard, database, or live market API yet — those are future steps.
