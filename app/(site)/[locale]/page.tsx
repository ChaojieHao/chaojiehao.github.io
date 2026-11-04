import { notFound } from "next/navigation";

import { HomeClient } from "./home-client";

import {
  getAwardsContent,
  getHomePageCopy,
  getHighlightsContent,
  getProfileContent,
  getProjectsContent,
  getPublicationsContent,
  getUpdatesContent
} from "@/lib/content";
import { normalizeLocale } from "@/lib/locale";

type PageProps = {
  params: { locale: string } | Promise<{ locale: string }>;
};

export default async function HomePage({ params }: PageProps) {
  const resolvedParams = await params;
  const locale = normalizeLocale(resolvedParams.locale);
  if (!locale) {
    notFound();
  }

  const profile = getProfileContent()[locale];
  const highlights = getHighlightsContent()[locale].entries;
  const publications = [...getPublicationsContent()[locale].entries]
    .sort((a, b) => Number(b.year) - Number(a.year))
    .slice(0, 2);
  const updates = getUpdatesContent()[locale].updates.slice(0, 7);
  const awards = getAwardsContent()[locale].awards.slice(0, 6);
  const copy = getHomePageCopy()[locale];

  return (
    <HomeClient
      locale={locale}
      profile={profile}
      highlights={highlights}
      publications={publications}
      updates={updates}
      awards={awards}
      copy={copy}
    />
  );
}
