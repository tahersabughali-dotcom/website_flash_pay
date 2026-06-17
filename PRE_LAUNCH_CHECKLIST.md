# Flash Pay — Pre-Launch Checklist

Use this list before making the site public at **https://www.flashpay.uk**

Check each item when complete.

---

## Contact & settings (`src/data/settingsData.ts`)

- [ ] Real **WhatsApp number** set (not `0000000000`)
- [ ] **websiteUrl** set to `https://www.flashpay.uk`
- [ ] **NEXT_PUBLIC_SITE_URL** set on Vercel to `https://www.flashpay.uk`
- [ ] **Email** checked and mailbox works
- [ ] **Social links** checked (Facebook, Instagram, Telegram) or left empty
- [ ] **Logo** file added at `public/images/logo.png` (text fallback works until added)
- [ ] **Open Graph image** added at `public/images/og-default.png`
- [ ] **SEO titles and descriptions** reviewed
- [ ] **Support hours** updated if known

---

## Technical checks

- [ ] `npm run build` passes
- [ ] `npm run lint` passes
- [ ] **Sitemap** works: visit `/sitemap.xml` after deploy
- [ ] **Robots** works: visit `/robots.txt` after deploy
- [ ] **Feature flags** reviewed in `src/data/featureFlagsData.ts`
- [ ] No hardcoded WhatsApp number in components (only `settingsData.ts`)

---

## Functional tests

- [ ] **Mobile** tested (menu, forms, cards, no horizontal scroll)
- [ ] **WhatsApp** button opens correct number
- [ ] **Smart Request** form → WhatsApp message
- [ ] **Business / Partner / Contact** forms → WhatsApp message
- [ ] **Route Finder** WhatsApp CTA works
- [ ] **Markets** show indicative labels only (no fake live prices)
- [ ] **Trust Center** reviewed
- [ ] **Unknown page** shows clean 404

---

## Legal & safety

- [ ] No unsupported **legal claims** (licensed, authorized, guaranteed rates)
- [ ] **Wallet** page = Coming Soon only (no balances, no deposit/withdraw)
- [ ] **Trade** page = Coming Soon only (no buy/sell, no fake dashboard)
- [ ] Market content marked **informational only**
- [ ] Partner network wording is careful (no false agency claims)

---

## Domain & hosting

- [ ] **Domain connected** in Vercel (`www.flashpay.uk`)
- [ ] **DNS** propagated (domain shows valid in Vercel)
- [ ] **SSL/HTTPS** active (padlock in browser)
- [ ] Production URL matches settings and sitemap

---

## After launch (first 24 hours)

- [ ] Test site from phone on mobile data (not just Wi‑Fi)
- [ ] Share link and confirm Open Graph preview (after OG image added)
- [ ] Monitor for broken links or form issues
- [ ] Keep Vercel deployment history for rollback if needed

---

**Sign-off:** Site is ready for public launch when all critical items above are checked.

Critical = WhatsApp, settings, build, legal safety, SSL, and core form tests.
