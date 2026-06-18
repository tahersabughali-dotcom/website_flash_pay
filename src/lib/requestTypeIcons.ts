/** Maps request type icon keys from requestTypesData to display glyphs. */
const REQUEST_TYPE_ICON_GLYPHS: Record<string, string> = {
  send: "↗",
  receive: "↓",
  crypto: "₮",
  exchange: "⇄",
  paypal: "P",
  wise: "W",
  payoneer: "P",
  business: "◆",
  rates: "%",
  partner: "🤝",
  market: "📊",
  route: "🌍",
};

export function getRequestTypeIconGlyph(icon?: string): string {
  if (!icon) return "•";
  return REQUEST_TYPE_ICON_GLYPHS[icon] ?? icon.slice(0, 1).toUpperCase();
}
