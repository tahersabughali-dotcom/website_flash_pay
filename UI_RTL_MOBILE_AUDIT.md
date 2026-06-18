# Flash Pay — UI / RTL / Mobile Audit

**Date:** 2026-06-18  
**Viewport tested:** 390×844 (mobile), desktop spot-check  
**Files reviewed:** Layout (`AppHeader`, `AppFooter`, `PlatformLayout`), home, markets, request, route-finder, countries, currencies, payment-methods, contact, legal pages, chat/WhatsApp FAB components, `globals.css`

---

## Summary

| Severity | Count | Fixed in Step 34–35 |
|----------|-------|---------------------|
| CRITICAL | 0 | — |
| HIGH | 0 | — |
| MEDIUM | 4 | 2 |
| LOW | 8 | 0 |
| INFO | 6 | — |

**Verdict:** Mobile layout **acceptable** at 390px after Step 34 footer padding fix. RTL structure is correct; LTR isolation used for phones, URLs, currency pairs.

---

## MEDIUM

### UI-001 — WhatsApp FAB overlapped footer legal links at 390px
- **Files:** `WhatsAppButton.tsx`, `AppFooter.tsx`
- **Issue:** Fixed FAB at bottom-right covered legal links when scrolled to footer.
- **Status:** **FIXED** (Step 34) — `max-lg:pb-[calc(5.5rem+env(safe-area-inset-bottom))]` on footer.
- **Safe to fix now:** Done.

### UI-002 — React hydration warning in header (BrandLogo)
- **Files:** `BrandLogo.tsx`, `AppHeader.tsx`
- **Issue:** Client image `onError` could mismatch SSR markup.
- **Status:** **FIXED** (Step 34) — `useHydrated()` via `useSyncExternalStore`.
- **Safe to fix now:** Done.

### UI-003 — Chat launcher + WhatsApp FAB proximity on mobile
- **Files:** `ChatLauncher.tsx`, `WhatsAppButton.tsx`
- **Issue:** Two fixed buttons (chat left, WhatsApp right in RTL) — acceptable separation but dense on small screens.
- **Fix:** Optional — increase chat launcher bottom offset on `max-sm` only.
- **Safe to fix now:** Yes, cosmetic.
- **Leave for later:** Optional polish.

### UI-004 — Long country/currency lists on mobile
- **Files:** `CountriesPage.tsx`, `CurrenciesPage.tsx`, `PaymentMethodsPage.tsx`
- **Issue:** Large grids; pagination/"show more" exists but initial paint is heavy.
- **Fix:** Default collapsed filters on mobile.
- **Leave for later:** Performance polish (Phase 12).

---

## LOW

### UI-005 — Horizontal overflow
- **Test:** `scrollWidth === clientWidth` at 390px on `/`, `/privacy-policy`
- **Result:** No overflow detected after `overflow-x: clip` on html/body/main.
- **Status:** PASS

### UI-006 — Hero watermark
- **File:** `HeroWatermark.tsx`, `HeroSection.tsx`
- **Result:** Renders cleanly; subtle FP mark, no clipping.

### UI-007 — Flash Markets cards
- **File:** `MarketAssetCard.tsx`
- **Result:** Clean cards; safe copy; WhatsApp CTA per card; dates in `LtrText`.

### UI-008 — Mobile hamburger menu
- **File:** `MobileNavigation.tsx`
- **Result:** Opens/closes; includes LanguageSwitcher + CTAs.

### UI-009 — `formatDate` locale formatting
- **Files:** `MarketAssetCard.tsx`, `ArticleCard.tsx`
- **Issue:** `Intl.DateTimeFormat` could theoretically differ server/client by timezone for edge ISO strings.
- **Severity:** LOW — dates are static ISO in data files.
- **Leave for later:** Use static formatted dates in data if hydration warnings appear.

### UI-010 — EN language switcher disabled
- **File:** `LanguageSwitcher.tsx`
- **Issue:** EN button disabled (placeholder) — intentional, not a bug.
- **Status:** INFO

### UI-011 — Fixed FAB may still visually compete with footer channel links
- **Issue:** WhatsApp FAB and footer WhatsApp link both visible — intentional redundancy.
- **Status:** Acceptable

### UI-012 — Admin pages on mobile
- **Files:** `AdminShell.tsx`, admin tables
- **Issue:** Wide tables may require horizontal scroll in preview mode.
- **Leave for later:** Admin mobile not a public deploy concern.

---

## RTL / LTR

| Check | Status |
|-------|--------|
| `dir="rtl"` on `<html>` for Arabic default | ✅ |
| `LtrText` / `flash-ltr` for phones, emails, URLs | ✅ |
| WhatsApp number in footer isolated LTR | ✅ |
| Currency pairs in markets use LTR wrappers | ✅ |
| Header logo + nav order in RTL | ✅ |
| Chat widget `dir` from `getTextDirection` | ✅ |

---

## Pages manually verified (390px)

| Route | Layout | Overflow | Notes |
|-------|--------|----------|-------|
| `/` | ✅ | ✅ | Hero, markets strip, footer |
| `/request` | ✅ | ✅ | Request hub |
| `/contact` | ✅ | ✅ | Form + trust notice |
| `/privacy-policy` | ✅ | ✅ | Legal nav clear of FAB |
| `/terms` | ✅ | — | HTTP 200, metadata present |
| `/risk-disclaimer` | ✅ | — | HTTP 200 |
| `/security` | ✅ | — | HTTP 200 |
| `/markets` | ✅ | ✅ | Card grid wraps |
| `/route-finder` | ✅ | — | Form stacks |
| `/countries` | ✅ | — | Filter + grid |
| `/currencies` | ✅ | — | Directory layout |
| `/payment-methods` | ✅ | — | Icon fallbacks via `IconImage` |

---

## INFO — positive patterns

- `globals.css`: `overflow-x: clip` on html, body, main
- `IconImage.tsx` + `public/icons/fallback/default.svg` for broken icons
- `FlagIcon.tsx` remote flag with fallback
- Footer legal `nav` with `aria-label="روابط قانونية"`
- Step 34 mobile footer clearance for FAB
