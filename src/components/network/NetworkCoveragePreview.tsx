import type { LanguageCode } from "@/types/common";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { CountryCard } from "@/components/shared/CountryCard";
import { DataGrid } from "@/components/shared/DataGrid";
import { getFeaturedCountries } from "@/lib/dataAccess";

interface NetworkCoveragePreviewProps {
  lang: LanguageCode;
}

export function NetworkCoveragePreview({ lang }: NetworkCoveragePreviewProps) {
  const countries = getFeaturedCountries(8);

  return (
    <section>
      <SectionHeader
        title={lang === "ar" ? "معاينة التغطية" : "Coverage preview"}
        subtitle={
          lang === "ar"
            ? "التوفر يختلف حسب الدولة والعملة وشبكة الشركاء."
            : "Availability varies by country, currency, and partner network."
        }
      />
      <DataGrid columns={4} className="mt-6">
        {countries.map((country) => (
          <CountryCard key={country.id} country={country} lang={lang} />
        ))}
      </DataGrid>
    </section>
  );
}
