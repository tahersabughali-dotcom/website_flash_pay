/**
 * Generates globalCountriesData.ts from ISO 3166 list.
 * Run: node scripts/generate-global-data.mjs
 */
import fs from "node:fs";
import path from "node:path";

const OPERATIONAL_ISO2 = new Set([
  "EG", "TR", "CN", "AE", "SA", "QA", "OM", "JO", "KW", "PS", "US", "GB",
  "DZ", "MA", "SY", "LB", "YE",
]);

const OPERATIONAL_SLUG_BY_ISO2 = {
  EG: "egypt",
  TR: "turkey",
  CN: "china",
  AE: "uae",
  SA: "saudi-arabia",
  QA: "qatar",
  OM: "oman",
  JO: "jordan",
  KW: "kuwait",
  PS: "gaza",
  US: "united-states",
  GB: "united-kingdom",
  DZ: "algeria",
  MA: "morocco",
  SY: "syria",
  LB: "lebanon",
  YE: "yemen",
};

const FEATURED_ISO2 = new Set([...OPERATIONAL_ISO2]);

const REGION_AR = {
  Africa: "أفريقيا",
  Americas: "الأمريكتان",
  Asia: "آسيا",
  Europe: "أوروبا",
  Oceania: "أوقيانوسيا",
  Antarctic: "القارة القطبية الجنوبية",
};

const SUBREGION_AR = {
  "Northern Africa": "شمال أفريقيا",
  "Eastern Africa": "شرق أفريقيا",
  "Middle Africa": "وسط أفريقيا",
  "Southern Africa": "جنوب أفريقيا",
  "Western Africa": "غرب أفريقيا",
  "Caribbean": "الكاريبي",
  "Central America": "أمريكا الوسطى",
  "South America": "أمريكا الجنوبية",
  "Northern America": "أمريكا الشمالية",
  "Central Asia": "آسيا الوسطى",
  "Eastern Asia": "شرق آسيا",
  "South-Eastern Asia": "جنوب شرق آسيا",
  "Southern Asia": "جنوب آسيا",
  "Western Asia": "غرب آسيا",
  "Eastern Europe": "أوروبا الشرقية",
  "Northern Europe": "أوروبا الشمالية",
  "Southern Europe": "جنوب أوروبا",
  "Western Europe": "أوروبا الغربية",
  "Australia and New Zealand": "أستراليا ونيوزيلندا",
  Melanesia: "ميلانيزيا",
  Micronesia: "ميكرونيزيا",
  Polynesia: "بولينيزيا",
};

const coverageDefault = {
  ar: "التوفر يتم تأكيده حسب الدولة، العملة، المبلغ، وطريقة الاستلام.",
  en: "Availability is confirmed based on country, currency, amount, and receiving method.",
};

function slugify(name) {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function flagEmoji(iso2) {
  return iso2
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt(0)));
}

async function main() {
  const response = await fetch(
    "https://raw.githubusercontent.com/lukes/ISO-3166-Countries-with-Regional-Codes/master/all/all.json",
  );
  const isoList = await response.json();
  const arDisplay = new Intl.DisplayNames(["ar"], { type: "region" });

  const records = isoList
    .map((item, index) => {
      const iso2 = item["alpha-2"];
      const iso3 = item["alpha-3"];
      const nameEn = item.name;
      const nameAr = arDisplay.of(iso2) ?? nameEn;
      const regionEn = item.region || "Other";
      const subregionEn = item["sub-region"] || regionEn;
      const slug = OPERATIONAL_SLUG_BY_ISO2[iso2] ?? slugify(nameEn);
      const isOperational = OPERATIONAL_ISO2.has(iso2);

      return {
        id: `global-${slug}`,
        slug,
        iso2,
        iso3,
        name: { ar: nameAr, en: nameEn },
        officialName: { ar: nameAr, en: nameEn },
        region: {
          ar: REGION_AR[regionEn] ?? regionEn,
          en: regionEn,
        },
        subregion: {
          ar: SUBREGION_AR[subregionEn] ?? subregionEn,
          en: subregionEn,
        },
        flagEmoji: flagEmoji(iso2),
        flagImageUrl: `https://flagcdn.com/w80/${iso2.toLowerCase()}.png`,
        currencies: [],
        phoneCode: "",
        status: isOperational ? "active" : "available_by_request",
        coverageNote: coverageDefault,
        isFeatured: FEATURED_ISO2.has(iso2),
        showOnCountriesPage: true,
        operationalSlug: isOperational ? slug : undefined,
        order: isOperational ? index + 1 : 100 + index,
      };
    })
    .sort((a, b) => a.order - b.order);

  const output = `import type { GlobalCountry } from "@/types/globalCountry";

/** ISO global directory — reference only; operational details live in countriesData.ts */
export const globalCountriesData: GlobalCountry[] = ${JSON.stringify(records, null, 2)} as GlobalCountry[];

export const GLOBAL_COUNTRY_COUNT = ${records.length};
`;

  const outPath = path.join(process.cwd(), "src/data/globalCountriesData.ts");
  fs.writeFileSync(outPath, output, "utf8");
  console.log(`Wrote ${records.length} countries to ${outPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
