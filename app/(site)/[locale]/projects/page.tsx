import { notFound } from "next/navigation";

import { ProjectsClient } from "./projects-client";

import { getHighlightsContent, getProjectsPageCopy } from "@/lib/content";
import { normalizeLocale } from "@/lib/locale";

type PageProps = {
  params: { locale: string } | Promise<{ locale: string }>;
};

export default async function ProjectsPage({ params }: PageProps) {
  const resolvedParams = await params;
  const locale = normalizeLocale(resolvedParams.locale);

  if (!locale) {
    notFound();
  }

  const highlights = getHighlightsContent()[locale].entries;
  const copy = getProjectsPageCopy()[locale];

  return (
    <ProjectsClient
      locale={locale}
      highlights={highlights}
      copy={copy}
    />
  );
}
