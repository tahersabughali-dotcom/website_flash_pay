import type { LanguageCode } from "@/types/common";
import type { GlobalPaymentMethod, GlobalReceivingMethod } from "@/types/payment";
import { DataGrid } from "@/components/shared/DataGrid";
import { EmptyState } from "@/components/shared/EmptyState";
import { PaymentMethodCard } from "@/components/shared/PaymentMethodCard";

type MethodItem = GlobalPaymentMethod | GlobalReceivingMethod;

interface PaymentMethodGridProps {
  methods: MethodItem[];
  lang: LanguageCode;
  compact?: boolean;
  emptyTitle?: string;
}

export function PaymentMethodGrid({
  methods,
  lang,
  compact = true,
  emptyTitle,
}: PaymentMethodGridProps) {
  if (methods.length === 0) {
    if (!emptyTitle) return null;
    return (
      <EmptyState
        title={emptyTitle}
        description={
          lang === "ar" ? "جرّب فلترًا أو بحثًا مختلفًا." : "Try a different filter or search."
        }
      />
    );
  }

  return (
    <DataGrid columns={3}>
      {methods.map((method) => (
        <PaymentMethodCard
          key={method.id}
          title={method.title}
          description={method.description}
          iconImage={method.iconImage}
          status={method.status}
          lang={lang}
          requiresConfirmation={method.requiresConfirmation}
          compact={compact}
        />
      ))}
    </DataGrid>
  );
}
