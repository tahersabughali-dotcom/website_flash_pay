import type { Metadata } from "next";
import { PaymentMethodsPage } from "@/components/payment-methods/PaymentMethodsPage";
import { settingsData } from "@/data/settingsData";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata(settingsData, {
  title: { ar: "طرق الدفع والاستلام | Flash Pay", en: "Payment Methods | Flash Pay" },
  description: {
    ar: "دليل طرق الدفع والاستلام — التوفر حسب الدولة وشبكة الشركاء.",
    en: "Payment and receiving methods directory — availability by country and partner network.",
  },
  path: "/payment-methods",
});

export default function PaymentMethodsRoutePage() {
  return <PaymentMethodsPage />;
}
