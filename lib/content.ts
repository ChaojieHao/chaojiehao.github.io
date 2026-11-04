import profileJson from "@/content/profile.json";
import researchJson from "@/content/research.json";
import publicationsJson from "@/content/publications.json";
import projectsJson from "@/content/projects.json";
import timelineJson from "@/content/timeline.json";
import fundingsJson from "@/content/fundings.json";
import awardsJson from "@/content/awards.json";
import updatesJson from "@/content/updates.json";
import blogPageJson from "@/content/pages/blog.json";
import homePageJson from "@/content/pages/home.json";
import researchPageJson from "@/content/pages/research.json";
import projectsPageJson from "@/content/pages/projects.json";
import publicationsPageJson from "@/content/pages/publications.json";
import cvPageJson from "@/content/pages/cv.json";
import contactPageJson from "@/content/pages/contact.json";
import fundingsPageJson from "@/content/pages/fundings-page.json";
import highlightsJson from "@/content/highlights.json";

import type {
  ProfileContent,
  LocaleProfile,
  ResearchContent,
  PublicationsContent,
  ProjectsContent,
  TimelineContent,
  AwardsContent,
  UpdatesContent,
  BlogPageCopy,
  HomePageCopy,
  ResearchPageCopy,
  ProjectsPageCopy,
  PublicationsPageCopy,
  CVPageCopy,
  ContactPageCopy,
  FundingsPageCopy,
  FundingsContent,
  HighlightsContent
} from "./content-types";
import { DEFAULT_LOCALE, type Locale } from "./locale";

type PartialLocalized<T> = Partial<Record<Locale, T>>;

function resolveLocalized<T>(value: unknown, label: string) {
  const data = value as PartialLocalized<T>;
  const primary = data[DEFAULT_LOCALE] ?? data.en ?? data.zh;

  if (!primary) {
    throw new Error(`Missing localized content for ${label}. Define at least one locale block.`);
  }

  return {
    en: data.en ?? primary,
    zh: data.zh ?? primary
  };
}

/**
 * Placeholder accessors. In production, replace the inline casts with
 * file parsing logic (e.g., load and validate YAML/JSON). For now we rely on
 * the JSON placeholder files under /content.
 */
export function getProfileContent(): ProfileContent {
  return resolveLocalized<LocaleProfile>(profileJson, "content/profile.json");
}

export function getResearchContent(): ResearchContent {
  return resolveLocalized<ResearchContent["en"]>(researchJson, "content/research.json");
}

export function getPublicationsContent(): PublicationsContent {
  return resolveLocalized<PublicationsContent["en"]>(publicationsJson, "content/publications.json");
}

export function getProjectsContent(): ProjectsContent {
  return resolveLocalized<ProjectsContent["en"]>(projectsJson, "content/projects.json");
}

export function getHighlightsContent(): HighlightsContent {
  return resolveLocalized<HighlightsContent["en"]>(highlightsJson,"content/highlights.json");
}

export function getTimelineContent(): TimelineContent {
  return resolveLocalized<TimelineContent["en"]>(timelineJson, "content/timeline.json");
}

export function getFundingsContent(): FundingsContent {
  return resolveLocalized<FundingsContent["en"]>(fundingsJson, "content/fundings.json");
}

export function getAwardsContent(): AwardsContent {
  return resolveLocalized<AwardsContent["en"]>(awardsJson, "content/awards.json");
}

export function getUpdatesContent(): UpdatesContent {
  return resolveLocalized<UpdatesContent["en"]>(updatesJson, "content/updates.json");
}

export function getBlogPageCopy(): BlogPageCopy {
  return resolveLocalized<BlogPageCopy["en"]>(blogPageJson, "content/pages/blog.json");
}

export function getHomePageCopy(): HomePageCopy {
  return resolveLocalized<HomePageCopy["en"]>(homePageJson, "content/pages/home.json");
}

export function getResearchPageCopy(): ResearchPageCopy {
  return resolveLocalized<ResearchPageCopy["en"]>(researchPageJson, "content/pages/research.json");
}

export function getProjectsPageCopy(): ProjectsPageCopy {
  return resolveLocalized<ProjectsPageCopy["en"]>(projectsPageJson, "content/pages/projects.json");
}

export function getPublicationsPageCopy(): PublicationsPageCopy {
  return resolveLocalized<PublicationsPageCopy["en"]>(publicationsPageJson, "content/pages/publications.json");
}

export function getCVPageCopy(): CVPageCopy {
  return resolveLocalized<CVPageCopy["en"]>(cvPageJson, "content/pages/cv.json");
}

export function getContactPageCopy(): ContactPageCopy {
  return resolveLocalized<ContactPageCopy["en"]>(contactPageJson, "content/pages/contact.json");
}

export function getFundingsPageCopy(): FundingsPageCopy {
  return resolveLocalized<FundingsPageCopy["en"]>(fundingsPageJson,"content/pages/fundings-page.json");
}
