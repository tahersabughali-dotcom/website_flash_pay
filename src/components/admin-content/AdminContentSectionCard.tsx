interface AdminContentSectionCardProps {
  title: string;
  count: number;
  description: string;
  sourceFile: string;
  status: string;
  futureAction: string;
}

export function AdminContentSectionCard({
  title,
  count,
  description,
  sourceFile,
  status,
  futureAction,
}: AdminContentSectionCardProps) {
  return (
    <article className="flash-card flex h-full flex-col p-5">
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-base font-bold text-flash-text">{title}</h3>
        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-flash-muted">
          {count}
        </span>
      </div>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-flash-muted">{description}</p>
      <dl className="mt-4 space-y-2 text-xs">
        <div>
          <dt className="text-flash-muted">المصدر</dt>
          <dd className="mt-0.5 font-mono text-[11px] text-flash-text">{sourceFile}</dd>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="rounded-lg bg-emerald-50 px-2 py-1 font-medium text-emerald-800">{status}</span>
          <span className="rounded-lg bg-flash-primary-light px-2 py-1 font-medium text-flash-primary">
            {futureAction}
          </span>
        </div>
      </dl>
    </article>
  );
}
