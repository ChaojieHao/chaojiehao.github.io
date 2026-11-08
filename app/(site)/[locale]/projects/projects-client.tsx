
"use client";

import { useMemo, useState } from "react";
import Image from "next/image";

import { Section } from "@/components/section";
import { Tag } from "@/components/tag";
import { FilterToolbar } from "@/components/filter-toolbar";
import type { HighlightEntry, ProjectsPageCopy } from "@/lib/content-types";
import type { Locale } from "@/lib/locale";

type ProjectsClientProps = {
  locale: Locale;
  highlights: HighlightEntry[];
  copy: ProjectsPageCopy[Locale];
};

export function ProjectsClient({
  highlights,
  copy
}: ProjectsClientProps) {
  const [selectedYear, setSelectedYear] = useState("all");
  const [selectedKeyword, setSelectedKeyword] = useState("all");

  const years = useMemo(
    () =>
      [...new Set(highlights.map((item) => String(item.year)))].sort(
        (a, b) => Number(b) - Number(a)
      ),
    [highlights]
  );

  const keywords = useMemo(
    () =>
      [...new Set(highlights.flatMap((item) => item.keywords))].sort(
        (a, b) => a.localeCompare(b)
      ),
    [highlights]
  );

  const filteredHighlights = useMemo(
    () =>
      highlights.filter((item) => {
        const matchesYear =
          selectedYear === "all" || String(item.year) === selectedYear;

        const matchesKeyword =
          selectedKeyword === "all" ||
          item.keywords.includes(selectedKeyword);

        return matchesYear && matchesKeyword;
      }),
    [highlights, selectedYear, selectedKeyword]
  );

  const filterGroups = [
    {
      id: "year",
      label: "Year",
      value: selectedYear,
      options: [
        { label: "All", value: "all" },
        ...years.map((year) => ({ label: year, value: year }))
      ],
      onChange: setSelectedYear
    },
    {
      id: "keyword",
      label: "Topic",
      value: selectedKeyword,
      options: [
        { label: "All", value: "all" },
        ...keywords.map((keyword) => ({
          label: keyword,
          value: keyword
        }))
      ],
      onChange: setSelectedKeyword
    }
  ];

  return (
    <div className="space-y-7">
      <section className="space-y-3 rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-white p-8 shadow-[0_24px_60px_-45px_rgba(30,64,175,0.45)] dark:border-slate-800 dark:bg-gradient-to-br dark:from-slate-900/80 dark:via-slate-900/60 dark:to-slate-900/40">
        <h1 className="text-3xl font-semibold text-blue-900 dark:text-white">
          {copy.heroTitle}
        </h1>
        <p className="text-base leading-relaxed text-blue-900/70 dark:text-slate-300">
          {copy.heroDescription}
        </p>
      </section>

      <Section
        title={copy.highlightsTitle}
        eyebrow={copy.highlightsEyebrow}
      >
        {highlights.length > 0 ? (
          <div className="space-y-6">
            <FilterToolbar groups={filterGroups} />

            {filteredHighlights.length > 0 ? (
              <div className="space-y-7">
                {filteredHighlights.map((item) => (
                  <article
                    key={`${item.year}-${item.title}`}
                    className="grid gap-5 overflow-hidden rounded-2xl border border-slate-200 bg-white/70 p-4 dark:border-slate-700 dark:bg-slate-900/40 md:grid-cols-[320px_minmax(0,1fr)] md:gap-7"
                  >
                    {/* Left: image */}
                    <div className="relative aspect-[5/4] w-full overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 320px"
                      />
                    </div>

                    {/* Right: information */}
                    <div className="flex min-w-0 flex-col justify-center py-1">
                      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand">
                        {item.year}
                      </p>

                      <h3 className="text-lg font-semibold leading-snug text-slate-900 dark:text-slate-50">
                        {item.title}
                      </h3>

                      <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                        {item.description}
                      </p>

                      {item.keywords.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {item.keywords.map((keyword) => (
                            <Tag key={keyword} label={keyword} />
                          ))}
                        </div>
                      )}

                      {item.links && item.links.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                          {item.links.map((link) => (
                            <a
                              key={`${link.label}-${link.href}`}
                              href={link.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm font-medium text-brand transition-colors hover:text-brand-foreground"
                            >
                              {link.label} ↗
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {copy.empty}
              </p>
            )}
          </div>
        ) : (
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {copy.empty}
          </p>
        )}
      </Section>
    </div>
  );
}
