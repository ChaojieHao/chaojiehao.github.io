"use client";

import Link from "next/link";

import { ProjectCard } from "@/components/project-card";
import { PublicationItem } from "@/components/publication-item";
import { Section } from "@/components/section";
import { Tag } from "@/components/tag";
import type { AwardEntry, HomePageCopy, LocaleProfile, ProjectEntry, PublicationEntry, UpdateEntry } from "@/lib/content-types";
import type { Locale } from "@/lib/locale";

// Lazy-load non-critical component to reduce initial bundle size.

type HomeClientProps = {
  locale: Locale;
  profile: LocaleProfile;
  highlightProjects: ProjectEntry[];
  publications: PublicationEntry[];
  updates: UpdateEntry[];
  awards: AwardEntry[];
  copy: HomePageCopy[Locale];
};

export function HomeClient({
  locale,
  profile,
  highlightProjects,
  publications,
  updates,
  awards,
  copy
}: HomeClientProps) {
  
  void updates;
  const base = `/${locale}`;
  const researchInterests = locale === "zh"
    ? [
        {
          title: "开放星团",
          description: "研究开放星团的形成、演化与动力学过程，以及其恒星族群和暗残骸。"
        },
        {
          title: "银河系结构",
          description: "研究银河系旋臂、银盘结构以及恒星族群的三维分布。"
        },
        {
          title: "恒星动力学",
          description: "研究星团的内部运动学、整体旋转、膨胀及其动力学演化。"
        },
        {
          title: "银河系考古学",
          description: "利用 Gaia 和大规模恒星巡天数据，探索银河系的形成与演化。"
        }
      ]
    : [
        {
          title: "Open Clusters",
          description: "Formation, evolution, and dynamics of open clusters, including their stellar populations and dark remnants."
        },
        {
          title: "Milky Way Structure",
          description: "Galactic spiral arms, disk structure, and the three-dimensional distribution of stellar populations."
        },
        {
          title: "Stellar Dynamics",
          description: "Internal kinematics, rotation, expansion, and dynamical evolution of star clusters."
        },
        {
          title: "Galactic Archaeology",
          description: "Using Gaia data and large-scale stellar surveys to explore the formation and evolution of the Milky Way."
        }
      ];

  const highlightItems = [
    { label: copy.highlights.focusLabel, value: copy.highlights.focusValue },
    { label: copy.highlights.contactLabel, value: copy.highlights.contactValue, href: `${base}/contact` },
    { label: copy.highlights.locationLabel, value: profile.location }
  ];

  return (
    <div className="space-y-16">
      <section className="space-y-6 rounded-3xl border border-white/70 bg-white/90 p-8 shadow-[0_32px_80px_-50px_rgba(15,23,42,0.55)] dark:border-slate-800 dark:bg-slate-900/70 print:border-none print:bg-transparent print:shadow-none">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-slate-600 dark:text-slate-300">
          <span className="font-semibold text-slate-900 dark:text-slate-50">{profile.name}</span>
          {profile.nativeName ? <span className="text-slate-500 dark:text-slate-400">{profile.nativeName}</span> : null}
        </div>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.9fr)]">
          <div className="space-y-6">
            <p className="max-w-3xl text-base leading-relaxed text-slate-600 dark:text-slate-300">
              {copy.heroIntro}
            </p>
            <div className="flex flex-wrap gap-2">
              {profile.keywords.map((keyword) => (
                <Tag key={keyword} label={keyword} />
              ))}
            </div>
            <div className="flex flex-col gap-3 text-sm font-medium sm:flex-row sm:flex-wrap">
              <Link
                href={`${base}/cv` as any}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-5 py-2 text-white hover:bg-slate-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
              >
                {copy.buttons.cv}
              </Link>
              <Link
                href={`${base}/publications` as any}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 px-5 py-2 text-slate-700 hover:border-slate-400 hover:text-brand dark:border-slate-600 dark:text-slate-200"
              >
                {copy.buttons.publications}
              </Link>
              <Link
                href={`${base}/projects` as any}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 px-5 py-2 text-slate-700 hover:border-slate-400 hover:text-brand dark:border-slate-600 dark:text-slate-200"
              >
                {copy.buttons.projects}
              </Link>
            </div>
          </div>
          <aside className="space-y-4 rounded-3xl border border-slate-200 bg-white/80 p-6 dark:border-slate-800 dark:bg-slate-900/60">
            <h2 className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-600 dark:text-slate-300">
              {copy.highlights.title}
            </h2>
            <dl className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
              {highlightItems.map((item) => (
                <div
                  key={item.label}
                  className="flex flex-col gap-1 border-b border-slate-200 pb-3 last:border-b-0 last:pb-0 dark:border-slate-700"
                >
                  <dt className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-600 dark:text-slate-300">
                    {item.label}
                  </dt>
                  <dd className="text-base font-medium text-slate-900 dark:text-slate-50">
                    {item.href ? (
                      <a href={item.href} className="hover:text-brand dark:hover:text-brand">
                        {item.value}
                      </a>
                    ) : (
                      item.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </section>

      <Section
        title={locale === "zh" ? "研究兴趣" : "Research Interests"}
        eyebrow={locale === "zh" ? "研究方向" : "RESEARCH OVERVIEW"}
        actions={
          <Link
            href={`${base}/research` as any}
            className="text-sm font-medium text-brand transition-colors hover:text-brand-foreground"
          >
            {locale === "zh" ? "了解更多 →" : "Learn more →"}
          </Link>
        }
      >
        <div className="grid gap-5 sm:grid-cols-2">
          {researchInterests.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-slate-200 bg-white/70 p-5 dark:border-slate-700 dark:bg-slate-900/40"
            >
              <h3 className="mb-2 text-base font-semibold text-slate-900 dark:text-slate-50">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        title={copy.sections.projects.title}
        eyebrow={copy.sections.projects.eyebrow}
        actions={
          <Link href={`${base}/projects` as any} className="text-sm font-medium text-brand hover:text-brand-foreground">
            {copy.sections.projects.action}
          </Link>
        }
      >
        <div className="grid gap-6 md:grid-cols-2">
          {highlightProjects.map((item) => (
            <ProjectCard key={item.name} project={item} />
          ))}
        </div>
      </Section>

      <Section
        title={copy.sections.publications.title}
        eyebrow={copy.sections.publications.eyebrow}
        actions={
          <Link href={`${base}/publications` as any} className="text-sm font-medium text-brand hover:text-brand-foreground">
            {copy.sections.publications.action}
          </Link>
        }
      >
        <div className="space-y-6">
          {publications.map((entry) => (
            <PublicationItem key={entry.id} item={entry} locale={locale} />
          ))}
        </div>
      </Section>

      <Section
        title={copy.sections.awards.title}
        eyebrow={copy.sections.awards.eyebrow}
        actions={
          <Link href={`${base}/cv` as any} className="text-sm font-medium text-brand hover:text-brand-foreground">
            {copy.sections.awards.action}
          </Link>
        }
      >
        <ul className="space-y-2 text-base text-slate-600 dark:text-slate-300">
          {awards.map((award) => (
            <li key={`${award.title}-${award.year}`} className="leading-relaxed">
              <span className="font-medium text-slate-900 dark:text-slate-50">{award.title}</span>
              {award.issuer ? <span> · {award.issuer}</span> : null}
              <span className="text-xs uppercase tracking-[0.3em] text-slate-600 dark:text-slate-300"> · {award.year}</span>
            </li>
          ))}
        </ul>
      </Section>
    </div>
  );
}

