import { settingsData } from "@/data/settingsData";
import { PageHero } from "@/components/shared/PageHero";
import { RequestCTA } from "@/components/shared/RequestCTA";
import { ExecutionModelSection } from "./ExecutionModelSection";
import { NetworkCoveragePreview } from "./NetworkCoveragePreview";
import { NetworkDisclaimer } from "./NetworkDisclaimer";
import { PartnerNetworkGrid } from "./PartnerNetworkGrid";

export function NetworkPage() {
  const lang = settingsData.defaultLanguage;

  return (
    <div className="flash-page-wrap">
      <PageHero
        eyebrow={lang === "ar" ? "Flash Pay Network" : "Flash Pay Network"}
        title={lang === "ar" ? "شبكة تشغيل Flash Pay" : "Flash Pay operating network"}
        subtitle={
          lang === "ar"
            ? "خدمات مباشرة، مكاتب شركاء، شركاء معتمدون حيثما توفروا، إحالة، تنسيق، سيولة، ونقاط خدمة محلية."
            : "Direct services, partner offices, authorized partners where available, referral, coordination, liquidity, and local service points."
        }
      />

      <div className="mt-8">
        <NetworkDisclaimer lang={lang} />
      </div>

      <div className="mt-10 space-y-12">
        <ExecutionModelSection lang={lang} />
        <PartnerNetworkGrid lang={lang} />
        <NetworkCoveragePreview lang={lang} />
      </div>

      <RequestCTA
        className="mt-12"
        lang={lang}
        title={lang === "ar" ? "ابدأ أو انضم للشبكة" : "Start or join the network"}
        description={
          lang === "ar"
            ? "اطلب خدمة أو قدّم طلب شراكة عبر القنوات الرسمية."
            : "Request a service or submit a partner application through official channels."
        }
      />
    </div>
  );
}
