import type { LanguageCode } from "@/types/common";
import type { CurrencyType } from "@/types/currency";
import type { GlobalCoverageStatus } from "@/types/globalCountry";

interface CurrenciesFilterProps {
  type: CurrencyType | "all";
  onTypeChange: (value: CurrencyType | "all") => void;
  status: GlobalCoverageStatus | "all";
  onStatusChange: (value: GlobalCoverageStatus | "all") => void;
  search: string;
  onSearchChange: (value: string) => void;
  lang: LanguageCode;
}

export function CurrenciesFilter({
  type,
  onTypeChange,
  status,
  onStatusChange,
  search,
  onSearchChange,
  lang,
}: CurrenciesFilterProps) {
  return (
    <div className="flash-filter-panel">
      <input
        type="search"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder={lang === "ar" ? "ابحث بالرمز أو الاسم..." : "Search code or name..."}
        className="flash-filter-input"
      />
      <select
        value={type}
        onChange={(e) => onTypeChange(e.target.value as CurrencyType | "all")}
        className="flash-filter-select"
      >
        <option value="all">{lang === "ar" ? "كل الأنواع" : "All types"}</option>
        <option value="fiat">{lang === "ar" ? "عملات ورقية" : "Fiat"}</option>
        <option value="stablecoin">{lang === "ar" ? "Stablecoin" : "Stablecoin"}</option>
        <option value="crypto">{lang === "ar" ? "Crypto" : "Crypto"}</option>
      </select>
      <select
        value={status}
        onChange={(e) => onStatusChange(e.target.value as GlobalCoverageStatus | "all")}
        className="flash-filter-select"
      >
        <option value="all">{lang === "ar" ? "كل الحالات" : "All statuses"}</option>
        <option value="active">{lang === "ar" ? "متاح" : "Active"}</option>
        <option value="supported">{lang === "ar" ? "مدعوم" : "Supported"}</option>
        <option value="available_by_request">{lang === "ar" ? "حسب الطلب" : "By request"}</option>
      </select>
    </div>
  );
}
