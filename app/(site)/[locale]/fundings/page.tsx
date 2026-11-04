
import { notFound } from "next/navigation";

import { Section } from "@/components/section";
import { getFundingsPageCopy, getFundingsContent } from "@/lib/content";
import { normalizeLocale } from "@/lib/locale";

type PageProps = {
  params: { locale: string } | Promise<{ locale: string }>;
};

export default async function ExperiencePage({ params }: PageProps) {
  const resolvedParams = await params;
  const locale = normalizeLocale(resolvedParams.locale);

  if (!locale) {
    notFound();
  }

  const entries = getFundingsContent()[locale].entries;
  const copy = getFundingsPageCopy()[locale];

  const labels =
    locale === "zh"
      ? {
          role: "角色",
          category: "项目类别",
          source: "资助机构",
          year: "获批年份",
          projectId: "项目编号"
        }
      : {
          role: "Role",
          category: "Funding Category",
          source: "Funding Source",
          year: "Award Year",
          projectId: "Grant No."
        };

  return (
    <Section
      title={copy.fundings.title}
      description={copy.fundings.description}
      eyebrow={copy.fundings.eyebrow}
    >
      <div className="space-y-6">
        {entries.map((entry) => (
          <article
            key={entry.projectId}
            className="rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-[0_24px_60px_-45px_rgba(15,23,42,0.45)] dark:border-slate-800 dark:bg-slate-900/70"
          >
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50">
              {entry.category}
            </h3>
            <p className="mt-2 text-sm font-medium text-slate-700 dark:text-slate-300">
              {entry.title}
            </p>
            <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
              {[
                [labels.role, entry.role],
                [labels.category, entry.category],
                [labels.source, entry.source],
                ...(entry.year ? [[labels.year, entry.year]] : []),
                [labels.projectId, entry.projectId]
              ].map(([label, value]) => (
                <div key={label}>
                  <dt className="text-slate-500 dark:text-slate-400">
                    {label}
                  </dt>
                  <dd className="mt-1 font-medium text-slate-800 dark:text-slate-200">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </article>
        ))}
      </div>
    </Section>
  );
}


