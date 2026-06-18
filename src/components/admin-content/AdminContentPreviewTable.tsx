interface AdminContentPreviewRow {
  name: string;
  status: string;
  source: string;
}

interface AdminContentPreviewTableProps {
  title: string;
  rows: AdminContentPreviewRow[];
}

export function AdminContentPreviewTable({ title, rows }: AdminContentPreviewTableProps) {
  return (
    <div className="flash-card overflow-hidden">
      <div className="border-b border-slate-100 px-4 py-3">
        <h3 className="text-sm font-bold text-flash-text">{title}</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 text-xs text-flash-muted">
            <tr>
              <th className="px-4 py-2 text-start">العنصر</th>
              <th className="px-4 py-2 text-start">الحالة</th>
              <th className="px-4 py-2 text-start">المصدر</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.name} className="border-t border-slate-100">
                <td className="px-4 py-2 font-medium text-flash-text">{row.name}</td>
                <td className="px-4 py-2 text-flash-muted">{row.status}</td>
                <td className="px-4 py-2 font-mono text-[11px] text-flash-muted">{row.source}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
