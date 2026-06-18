import { articlesData } from "@/data/articlesData";
import { countriesData } from "@/data/countriesData";
import { faqData } from "@/data/faqData";
import { GLOBAL_COUNTRY_COUNT } from "@/data/globalCountriesData";
import { GLOBAL_CURRENCY_COUNT } from "@/data/globalCurrenciesData";
import { GLOBAL_PAYMENT_METHOD_COUNT } from "@/data/globalPaymentMethodsData";
import { GLOBAL_RECEIVING_METHOD_COUNT } from "@/data/globalReceivingMethodsData";
import { mockChatSessionsData } from "@/data/mockChatSessionsData";
import { mockRequestsData } from "@/data/mockRequestsData";
import { servicesData } from "@/data/servicesData";
import { trustData } from "@/data/trustData";

export interface AdminDashboardStats {
  servicesCount: number;
  operationalCountriesCount: number;
  globalDirectoryCountriesCount: number;
  currenciesCount: number;
  paymentMethodsCount: number;
  receivingMethodsCount: number;
  paymentReceivingTotal: number;
  localRequestsCount: number;
  localChatSessionsCount: number;
  articlesCount: number;
  trustDocumentsCount: number;
}

export function getAdminDashboardStats(): AdminDashboardStats {
  const paymentMethodsCount = GLOBAL_PAYMENT_METHOD_COUNT;
  const receivingMethodsCount = GLOBAL_RECEIVING_METHOD_COUNT;

  return {
    servicesCount: servicesData.filter((item) => item.status === "active").length,
    operationalCountriesCount: countriesData.filter((item) => item.status === "active").length,
    globalDirectoryCountriesCount: GLOBAL_COUNTRY_COUNT,
    currenciesCount: GLOBAL_CURRENCY_COUNT,
    paymentMethodsCount,
    receivingMethodsCount,
    paymentReceivingTotal: paymentMethodsCount + receivingMethodsCount,
    localRequestsCount: mockRequestsData.length,
    localChatSessionsCount: mockChatSessionsData.length,
    articlesCount: articlesData.filter((item) => item.status === "published").length,
    trustDocumentsCount: trustData.filter((item) => item.status === "published").length,
  };
}

export function getFaqCount(): number {
  return faqData.length;
}
