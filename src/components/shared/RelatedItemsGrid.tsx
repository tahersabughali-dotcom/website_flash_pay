import type { ReactNode } from "react";
import { DataGrid } from "./DataGrid";

interface RelatedItemsGridProps {
  children: ReactNode;
  columns?: 1 | 2 | 3 | 4;
  className?: string;
}

export function RelatedItemsGrid({
  children,
  columns = 3,
  className,
}: RelatedItemsGridProps) {
  return (
    <DataGrid columns={columns} className={className}>
      {children}
    </DataGrid>
  );
}
