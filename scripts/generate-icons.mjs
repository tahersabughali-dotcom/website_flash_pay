/**
 * Generates simple line-style SVG icons for Flash Pay coverage UI.
 * Run: node scripts/generate-icons.mjs
 */
import fs from "node:fs";
import path from "node:path";

const base = path.join(process.cwd(), "public/icons");

const svg = (content) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#1e5a8a" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">${content}</svg>`;

const icons = {
  "fallback/default.svg": svg('<circle cx="12" cy="12" r="9"/><path d="M8 12h8M12 8v8"/>'),
  "currencies/default.svg": svg('<circle cx="12" cy="12" r="9"/><path d="M8 12h8M12 8v8"/>'),
  "currencies/usd.svg": svg('<circle cx="12" cy="12" r="9"/><path d="M12 7v10M9 9.5c0-1 1.5-1.5 3-1.5s3 .5 3 1.5-1.5 1.5-3 1.5-3 .5-3 1.5 1.5 1.5 3 1.5 3 .5 3 1.5"/>'),
  "currencies/eur.svg": svg('<circle cx="12" cy="12" r="9"/><path d="M9 9.5h5M9 14.5h5M15 8.5a4 4 0 1 0 0 7"/>'),
  "currencies/gbp.svg": svg('<circle cx="12" cy="12" r="9"/><path d="M10 7v10M14 7v10M8 12h8"/>'),
  "currencies/egp.svg": svg('<circle cx="12" cy="12" r="9"/><path d="M9 8h6M9 16h6M12 8v8"/>'),
  "currencies/try.svg": svg('<circle cx="12" cy="12" r="9"/><path d="M9 8l6 8M15 8l-6 8"/>'),
  "currencies/cny.svg": svg('<circle cx="12" cy="12" r="9"/><path d="M8 12h8M12 8v8M9 9l6 6M15 9l-6 6"/>'),
  "currencies/ils.svg": svg('<circle cx="12" cy="12" r="9"/><path d="M8 9h8M8 15h8M10 7v10"/>'),
  "currencies/usdt.svg": svg('<circle cx="12" cy="12" r="9"/><path d="M8 10h8M10 8v8M14 8v8"/>'),
  "currencies/btc.svg": svg('<circle cx="12" cy="12" r="9"/><path d="M9 8h4a2 2 0 0 1 0 4h-2M11 8v8M9 16h4a2 2 0 0 0 0-4h-2"/>'),
  "currencies/eth.svg": svg('<circle cx="12" cy="12" r="9"/><path d="M12 7l-3 5 3 2 3-2-3-5zM9 14l3 3 3-3-3-2-3 2z"/>'),
  "payments/default.svg": svg('<rect x="5" y="5" width="14" height="14" rx="3"/><path d="M9 12h6"/>'),
  "payments/cash.svg": svg('<rect x="4" y="7" width="16" height="10" rx="2"/><circle cx="12" cy="12" r="2"/>'),
  "payments/bank.svg": svg('<path d="M4 10h16M6 10V18M10 10V18M14 10V18M18 10V18M3 18h18M12 4l9 6H3z"/>'),
  "payments/mobile-wallet.svg": svg('<rect x="7" y="4" width="10" height="16" rx="2"/><circle cx="12" cy="16" r="1"/>'),
  "payments/ewallet.svg": svg('<rect x="4" y="7" width="16" height="11" rx="2"/><path d="M8 11h8"/>'),
  "payments/usdt.svg": svg('<circle cx="12" cy="12" r="9"/><path d="M8 10h8M10 8v8M14 8v8"/>'),
  "payments/card.svg": svg('<rect x="3" y="6" width="18" height="12" rx="2"/><path d="M3 10h18M7 15h4"/>'),
  "payments/partner-office.svg": svg('<path d="M4 20V9l8-5 8 5v11"/><path d="M9 20v-6h6v6"/>'),
  "payments/supplier.svg": svg('<path d="M3 7h11v10H3zM14 10h7v7h-7zM6 10h5"/>'),
  "payments/business.svg": svg('<rect x="3" y="8" width="18" height="11" rx="2"/><path d="M8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>'),
  "payments/platform.svg": svg('<rect x="4" y="5" width="16" height="14" rx="2"/><path d="M8 9h8M8 13h5"/>'),
  "receiving/default.svg": svg('<path d="M12 3v12M8 11l4 4 4-4M5 21h14"/>'),
  "receiving/cash-pickup.svg": svg('<path d="M12 3v8M8 7l4-4 4 4M6 14h12v5H6z"/>'),
  "receiving/cash-delivery.svg": svg('<path d="M3 12h18M12 3l4 4H8l4-4M6 16h12v5H6z"/>'),
  "receiving/bank-transfer.svg": svg('<path d="M4 10h16M6 10V18M10 10V18M14 10V18M18 10V18M3 18h18M12 4l9 6H3z"/>'),
  "receiving/wallet.svg": svg('<rect x="4" y="7" width="16" height="11" rx="2"/><path d="M16 12h2"/>'),
  "receiving/usdt-wallet.svg": svg('<circle cx="12" cy="12" r="9"/><path d="M8 10h8M10 8v8M14 8v8"/>'),
  "receiving/partner-pickup.svg": svg('<path d="M4 20V9l8-5 8 5v11"/><path d="M9 20v-6h6v6"/>'),
  "categories/country.svg": svg('<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/>'),
  "categories/currency.svg": svg('<circle cx="12" cy="12" r="9"/><path d="M12 7v10M9 9.5c0-1 1.5-1.5 3-1.5s3 .5 3 1.5"/>'),
  "categories/payment.svg": svg('<rect x="4" y="6" width="16" height="12" rx="2"/><path d="M4 10h16"/>'),
  "categories/receiving.svg": svg('<path d="M12 3v12M8 11l4 4 4-4"/>'),
  "categories/route.svg": svg('<path d="M4 17l6-6 4 4 6-8"/><circle cx="4" cy="17" r="1.5"/><circle cx="20" cy="7" r="1.5"/>'),
  "categories/security.svg": svg('<path d="M12 3l8 4v6c0 5-3.5 8-8 8s-8-3-8-8V7z"/><path d="M9 12l2 2 4-4"/>'),
};

for (const [rel, content] of Object.entries(icons)) {
  const filePath = path.join(base, rel);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, "utf8");
}

console.log(`Wrote ${Object.keys(icons).length} icons to ${base}`);
