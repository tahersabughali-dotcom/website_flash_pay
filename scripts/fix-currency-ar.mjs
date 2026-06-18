import fs from "node:fs";

const path = new URL("../src/data/globalCurrenciesData.ts", import.meta.url);
let content = fs.readFileSync(path, "utf8");
const codes = ["UAH", "PLN", "CZK", "HUF", "RON", "BRL", "MXN", "ZAR", "NGN", "KES", "ETB", "GHS"];
const ar = new Intl.DisplayNames("ar", { type: "currency" });

for (const code of codes) {
  const arName = ar.of(code);
  content = content.replace(
    new RegExp(`fiat\\("${code}", \\{ ar: "[^"]*"`, "g"),
    `fiat("${code}", { ar: "${arName}"`,
  );
}

fs.writeFileSync(path, content);
console.log("Patched Arabic currency names.");
