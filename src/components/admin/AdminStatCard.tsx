interface AdminStatCardProps {
  label: string;
  value: string | number;
  hint?: string;
}

export function AdminStatCard({ label, value, hint }: AdminStatCardProps) {
  return (
    <div className="flash-card flex flex-col justify-center p-4 text-center sm:p-5">
      <p className="text-2xl font-extrabold tracking-tight text-flash-primary sm:text-3xl">{value}</p>
      <p className="mt-2 text-sm font-semibold text-flash-text">{label}</p>
      {hint && <p className="mt-1 text-xs text-flash-muted">{hint}</p>}
    </div>
  );
}
