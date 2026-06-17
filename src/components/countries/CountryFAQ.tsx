import type { LanguageCode } from "@/types/common";
import type { Country } from "@/types/country";
import { DetailSection } from "@/components/shared/DetailSection";
import { FAQAccordion } from "@/components/shared/FAQAccordion";

interface CountryFAQProps {
  country: Country;
  lang: LanguageCode;
}

export function CountryFAQ({ country, lang }: CountryFAQProps) {
  if (!country.faq || country.faq.length === 0) return null;

  return (
    <DetailSection title={lang === "ar" ? "الأسئلة الشائعة" : "FAQ"}>
      <FAQAccordion items={country.faq} lang={lang} />
    </DetailSection>
  );
}
