/** Icon path helpers — local SVG only, no brand logos */

export function getCurrencyIconPath(code: string): string {
  const lower = code.toLowerCase();
  const known = ["usd", "eur", "gbp", "egp", "try", "cny", "ils", "usdt", "btc", "eth"];
  return `/icons/currencies/${known.includes(lower) ? lower : "default"}.svg`;
}

export function getPaymentIconPath(slug: string): string {
  const map: Record<string, string> = {
    cash: "cash",
    "bank-transfer": "bank",
    "local-bank-deposit": "bank",
    "mobile-wallet": "mobile-wallet",
    "electronic-wallet": "ewallet",
    "usdt-trc20": "usdt",
    "usdt-erc20": "usdt",
    "usdt-bep20": "usdt",
    paypal: "platform",
    wise: "platform",
    payoneer: "platform",
    stripe: "platform",
    "card-payment": "card",
    "partner-office": "partner-office",
    "authorized-partner-office": "partner-office",
    "service-point": "partner-office",
    "business-bank-transfer": "business",
    "supplier-payment": "supplier",
    "bulk-settlement": "business",
  };

  return `/icons/payments/${map[slug] ?? "default"}.svg`;
}

export function getReceivingIconPath(slug: string): string {
  const map: Record<string, string> = {
    "cash-pickup": "cash-pickup",
    "cash-delivery": "cash-delivery",
    cash: "cash-pickup",
    "bank-transfer": "bank-transfer",
    "mobile-wallet": "wallet",
    "electronic-wallet": "wallet",
    "usdt-trc20": "usdt-wallet",
    "usdt-erc20": "usdt-wallet",
    "usdt-bep20": "usdt-wallet",
    "usdt-wallet": "usdt-wallet",
    "partner-office": "partner-pickup",
    "authorized-partner-office": "partner-pickup",
    "platform-cash-out": "wallet",
  };

  return `/icons/receiving/${map[slug] ?? "default"}.svg`;
}

export function getFlagImageUrl(iso2: string): string {
  return `https://flagcdn.com/w80/${iso2.toLowerCase()}.png`;
}

export const FALLBACK_ICON = "/icons/fallback/default.svg";
