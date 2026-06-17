import { settingsData } from "@/data/settingsData";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { DataGrid } from "@/components/shared/DataGrid";
import { getPartnerNetworkPreview } from "@/lib/dataAccess";
import { PartnerApplicationForm } from "./PartnerApplicationForm";
import { PartnerCategoryCard } from "./PartnerCategoryCard";
import { PartnerNetworkNotice } from "./PartnerNetworkNotice";

export function PartnersPage() {
  const lang = settingsData.defaultLanguage;
  const categories = getPartnerNetworkPreview();

  return (
    <div className="flash-page-wrap">
      <PageHero
        eyebrow={lang === "ar" ? "Flash Partners" : "Flash Partners"}
        title={lang === "ar" ? "شبكة شركاء Flash Pay" : "Flash Pay partner network"}
        subtitle={
          lang === "ar"
            ? "مكاتب، وكلاء، شركاء سيولة، تنفيذ، إحالة، وتغطية دولية."
            : "Offices, agents, liquidity, execution, referral, and country coverage partners."
        }
      />

      <div className="mt-8">
        <PartnerNetworkNotice lang={lang} />
      </div>

      <section className="mt-10">
        <SectionHeader
          title={lang === "ar" ? "فئات الشركاء" : "Partner categories"}
          subtitle={
            lang === "ar"
              ? "لا نعرض أسماء شركاء خاصة حالياً."
              : "Private partner names are not displayed yet."
          }
        />
        <DataGrid columns={2} className="mt-6">
          {categories.map((entry) => (
            <PartnerCategoryCard key={entry.id} entry={entry} lang={lang} />
          ))}
        </DataGrid>
      </section>

      <div className="mt-10">
        <PartnerApplicationForm lang={lang} />
      </div>
    </div>
  );
}
