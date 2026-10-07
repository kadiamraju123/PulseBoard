import Link from "next/link";

export function EmptyState({
  title,
  description,
  actionLabel,
  href = "/dashboard",
}: {
  title: string;
  description: string;
  actionLabel: string;
  href?: string;
}) {
  return (
    <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center dark:border-slate-700 dark:bg-slate-900">
      <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">{title}</h3>
      <p className="mt-3 text-base text-slate-600 dark:text-slate-300">{description}</p>
      <Link href={href} className="mt-6 inline-flex rounded-xl bg-violet-500 px-5 py-3 text-sm font-medium text-white">
        {actionLabel}
      </Link>
    </div>
  );
}
