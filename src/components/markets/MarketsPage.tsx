import Link from "next/link";
import { settingsData } from "@/data/settingsData";
import { marketCategoriesData } from "@/data/marketCategoriesData";
import { PageHero } from "@/components/shared/PageHero";
import { CTASection } from "@/components/shared/CTASection";
import {
  getAllMarketItems,
  getMarketInsights,
  getMarketItemsByCategory,
} from "@/lib/dataAccess";
import { formatMarketPriceInquiryMessage } from "@/lib/whatsapp";
import { MarketCategorySection } from "./MarketCategorySection";
import { MarketDisclaimer } from "./MarketDisclaimer";
import { MarketInsights } from "./MarketInsights";

export function MarketsPage() {
  const lang = settingsData.defaultLanguage;
  const insights = getMarketInsights(6);

  return (
    <div className="flash-page-wrap">
      <PageHero
        eyebrow={lang === "ar" ? "Flash Markets" : "Flash Markets"}
        title={lang === "ar" ? "لوحة معلومات الأسواق" : "Market information dashboard"}
        subtitle={
          lang === "ar"
            ? "معلومات إرشادية فقط — ليست أسعاراً تنفيذية أو لحظية."
            : "Indicative information only — not execution or real-time prices."
        }
      >
        <Link
          href="/academy"
          className="inline-flex rounded-xl bg-white px-5 py-3 text-sm font-semibold text-flash-primary"
        >
          {lang === "ar" ? "Flash Academy" : "Flash Academy"}
        </Link>
      </PageHero>

      <div className="mt-8">
        <MarketDisclaimer lang={lang} />
      </div>

      {marketCategoriesData.map((category) => (
        <MarketCategorySection
          key={category.id}
          category={category.id}
          assets={getMarketItemsByCategory(category.id)}
          lang={lang}
        />
      ))}

      {getAllMarketItems().length === 0 && (
        <p className="mt-10 text-center text-sm text-flash-muted">
          {lang === "ar" ? "لا توجد أصول معروضة حالياً." : "No market assets are listed yet."}
        </p>
      )}

      <MarketInsights items={insights} lang={lang} />

      <CTASection
        className="mt-12"
        lang={lang}
        title={
          lang === "ar" ? "اطلب سعر تنفيذ عبر WhatsApp" : "Request execution price via WhatsApp"
        }
        description={
          lang === "ar"
            ? "الأسعار التنفيذية تُؤكد مباشرة — لا نعرض أسعاراً مضمونة على الموقع."
            : "Execution rates are confirmed directly — we do not display guaranteed rates on the website."
        }
        whatsappMessage={formatMarketPriceInquiryMessage("General inquiry")}
      />
    </div>
  );
}
