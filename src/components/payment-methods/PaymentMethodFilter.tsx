import type { LanguageCode } from "@/types/common";
import type { GlobalCoverageStatus } from "@/types/globalCountry";
import type { PaymentMethodCategory } from "@/types/payment";

interface PaymentMethodFilterProps {
  search: string;
  onSearchChange: (value: string) => void;
  category: PaymentMethodCategory | "all";
  onCategoryChange: (value: PaymentMethodCategory | "all") => void;
  status: GlobalCoverageStatus | "all";
  onStatusChange: (value: GlobalCoverageStatus | "all") => void;
  lang: LanguageCode;
}

export function PaymentMethodFilter({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  status,
  onStatusChange,
  lang,
}: PaymentMethodFilterProps) {
  return (
    <div className="flash-filter-panel">
      <input
        type="search"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder={lang === "ar" ? "ابحث عن طريقة..." : "Search method..."}
        className="flash-filter-input"
      />
      <select
        value={category}
        onChange={(e) => onCategoryChange(e.target.value as PaymentMethodCategory | "all")}
        className="flash-filter-select"
      >
        <option value="all">{lang === "ar" ? "كل الفئات" : "All categories"}</option>
        <option value="cash">{lang === "ar" ? "نقد" : "Cash"}</option>
        <option value="bank">{lang === "ar" ? "بنك" : "Bank"}</option>
        <option value="usdt">USDT</option>
        <option value="digital_platform">{lang === "ar" ? "منصات" : "Platforms"}</option>
        <option value="business">{lang === "ar" ? "أعمال" : "Business"}</option>
        <option value="partner">{lang === "ar" ? "شركاء" : "Partners"}</option>
      </select>
      <select
        value={status}
        onChange={(e) => onStatusChange(e.target.value as GlobalCoverageStatus | "all")}
        className="flash-filter-select"
      >
        <option value="all">{lang === "ar" ? "كل الحالات" : "All statuses"}</option>
        <option value="active">{lang === "ar" ? "متاح" : "Active"}</option>
        <option value="partner_network">{lang === "ar" ? "شبكة شركاء" : "Partner network"}</option>
        <option value="available_by_request">{lang === "ar" ? "حسب الطلب" : "By request"}</option>
      </select>
    </div>
  );
}
