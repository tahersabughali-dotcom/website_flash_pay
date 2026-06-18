"use client";

import { useMemo, useState } from "react";
import { settingsData } from "@/data/settingsData";
import type { PaymentMethodCategory } from "@/types/payment";
import type { GlobalCoverageStatus } from "@/types/globalCountry";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { AlertBox } from "@/components/shared/AlertBox";
import { PaymentMethodGrid } from "@/components/payment-methods/PaymentMethodGrid";
import { PaymentMethodFilter } from "@/components/payment-methods/PaymentMethodFilter";
import {
  filterGlobalPaymentMethods,
  filterGlobalReceivingMethods,
  GLOBAL_PAYMENT_METHOD_COUNT,
  GLOBAL_RECEIVING_METHOD_COUNT,
} from "@/lib/paymentMethods";

export function PaymentMethodsPage() {
  const lang = settingsData.defaultLanguage;
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<PaymentMethodCategory | "all">("all");
  const [status, setStatus] = useState<GlobalCoverageStatus | "all">("all");

  const paymentMethods = useMemo(
    () => filterGlobalPaymentMethods({ category, status, search, lang }),
    [category, status, search, lang],
  );

  const receivingMethods = useMemo(
    () => filterGlobalReceivingMethods({ category, status, search, lang }),
    [category, status, search, lang],
  );

  const usdtMethods = useMemo(
    () => paymentMethods.filter((m) => m.category === "usdt"),
    [paymentMethods],
  );

  const businessMethods = useMemo(
    () => paymentMethods.filter((m) => m.category === "business"),
    [paymentMethods],
  );

  const partnerMethods = useMemo(
    () =>
      paymentMethods.filter(
        (m) => m.category === "partner" || m.category === "coordination" || m.status === "partner_network",
      ),
    [paymentMethods],
  );

  return (
    <div className="flash-page-wrap">
      <PageHero
        eyebrow={lang === "ar" ? "Flash Pay Global" : "Flash Pay Global"}
        title={lang === "ar" ? "طرق الدفع والاستلام" : "Payment & Receiving Methods"}
        subtitle={
          lang === "ar"
            ? "دليل طرق الدفع والاستلام — التوفر يختلف حسب الدولة والشريك."
            : "Payment and receiving methods directory — availability varies by country and partner."
        }
      />

      <AlertBox
        className="mt-8"
        variant="warning"
        content={
          lang === "ar"
            ? "تختلف طرق الدفع والاستلام حسب الدولة، العملة، المبلغ، وشبكة الشركاء. لا ندّعي وكالة رسمية لعلامات عالمية — التنسيق يتم حسب التوفر."
            : "Payment and receiving methods vary by country, currency, amount, and partner network. We do not claim official agency for global brands — coordination is subject to availability."
        }
      />

      <section className="mt-8">
        <PaymentMethodFilter
          search={search}
          onSearchChange={setSearch}
          category={category}
          onCategoryChange={setCategory}
          status={status}
          onStatusChange={setStatus}
          lang={lang}
        />
      </section>

      <section className="mt-10">
        <SectionHeader
          title={lang === "ar" ? "طرق الدفع" : "Payment methods"}
          subtitle={
            lang === "ar"
              ? `${GLOBAL_PAYMENT_METHOD_COUNT} طريقة — حسب التوفر والتأكيد`
              : `${GLOBAL_PAYMENT_METHOD_COUNT} methods — subject to availability and confirmation`
          }
        />
        <PaymentMethodGrid
          methods={paymentMethods}
          lang={lang}
          emptyTitle={lang === "ar" ? "لا توجد طرق دفع مطابقة" : "No matching payment methods"}
        />
      </section>

      <section className="mt-12">
        <SectionHeader
          title={lang === "ar" ? "طرق الاستلام" : "Receiving methods"}
          subtitle={
            lang === "ar"
              ? `${GLOBAL_RECEIVING_METHOD_COUNT} طريقة استلام`
              : `${GLOBAL_RECEIVING_METHOD_COUNT} receiving methods`
          }
        />
        <PaymentMethodGrid
          methods={receivingMethods}
          lang={lang}
          emptyTitle={lang === "ar" ? "لا توجد طرق استلام مطابقة" : "No matching receiving methods"}
        />
      </section>

      <section className="mt-12">
        <SectionHeader
          title={lang === "ar" ? "طرق USDT" : "USDT methods"}
          subtitle={lang === "ar" ? "شبكات USDT — حسب التوفر" : "USDT networks — subject to availability"}
        />
        <PaymentMethodGrid
          methods={usdtMethods}
          lang={lang}
          emptyTitle={lang === "ar" ? "لا توجد طرق USDT مطابقة" : "No matching USDT methods"}
        />
      </section>

      <section className="mt-12">
        <SectionHeader
          title={lang === "ar" ? "طرق الأعمال والتجار" : "Business methods"}
          subtitle={lang === "ar" ? "تسويات وتجارة — حسب الطلب" : "Settlements & trade — by request"}
        />
        <PaymentMethodGrid
          methods={businessMethods}
          lang={lang}
          emptyTitle={lang === "ar" ? "لا توجد طرق أعمال مطابقة" : "No matching business methods"}
        />
      </section>

      <section className="mt-12">
        <SectionHeader
          title={lang === "ar" ? "طرق عبر شبكة الشركاء" : "Partner network methods"}
          subtitle={
            lang === "ar"
              ? "تنسيق عبر شبكة الشركاء — وليس وكالة رسمية"
              : "Coordination via partner network — not official agency"
          }
        />
        <PaymentMethodGrid
          methods={partnerMethods}
          lang={lang}
          emptyTitle={lang === "ar" ? "لا توجد طرق شركاء مطابقة" : "No matching partner methods"}
        />
      </section>
    </div>
  );
}
