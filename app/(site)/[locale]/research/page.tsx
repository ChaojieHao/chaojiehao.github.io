
import { notFound } from "next/navigation";

import { Section } from "@/components/section";
import { getResearchContent, getResearchPageCopy } from "@/lib/content";
import { normalizeLocale } from "@/lib/locale";

type PageProps = {
  params: { locale: string } | Promise<{ locale: string }>;
};

const relatedLinks = [
  {
    name: "Gaia Archive",
    url: "https://gea.esac.esa.int/archive/"
  },
  {
    name: "SIMBAD Astronomical Database",
    url: "https://simbad.cds.unistra.fr/simbad/"
  },
  {
    name: "BeSSeL Survey",
    url: "https://science.nrao.edu/science/key-science-projects/ksp_bessel"
  },
  {
    name: "Sloan Digital Sky Survey",
    url: "https://skyserver.sdss.org/dr18"
  },
  {
    name: "APOGEE Survey",
    url: "https://www.sdss4.org/dr17/irspec/"
  },
  {
    name: "LAMOST",
    url: "http://www.lamost.org/public/"
  },
  {
    name: "SKA Observatory",
    url: "https://www.skao.int/en"
  },
  {
    name: "MWISP Data Release",
    url: "https://doi.org/10.57760/sciencedb.27351"
  },
  {
    name: "FAST All Sky HI Survey",
    url: "https://fast.bao.ac.cn/cms/article/271/"
  },
  {
    name: "PARSEC Stellar Isochrones",
    url: "https://stev.oapd.inaf.it/cgi-bin/cmd"
  }
];

export default async function ResearchPage({ params }: PageProps) {
  const resolvedParams = await params;
  const locale = normalizeLocale(resolvedParams.locale);
  if (!locale) {
    notFound();
  }

  const { interests } = getResearchContent()[locale];
  const t = getResearchPageCopy()[locale];

  return (
    <div className="space-y-16">
      <section className="space-y-4 rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-white p-8 shadow-[0_24px_60px_-45px_rgba(30,64,175,0.45)] dark:border-slate-800 dark:bg-gradient-to-br dark:from-slate-900/80 dark:via-slate-900/60 dark:to-slate-900/40">
        <h1 className="text-3xl font-semibold text-blue-900 dark:text-white">
          {t.heroTitle}
        </h1>
        <p className="text-base leading-relaxed text-blue-900/70 dark:text-slate-300">
          {t.heroDescription}
        </p>
      </section>

      <Section title={t.interestsTitle} eyebrow={t.interestsEyebrow}>
        <div className="space-y-8">
          {interests.map((interest, index) => {
            const imageFirst = index < 2;

            return (
              <article
                key={interest.title}
                className="grid items-center gap-6 overflow-hidden rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70 md:grid-cols-2 md:gap-8 md:p-7"
              >
                <div
                  className={`relative aspect-[16/10] overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800 ${
                    imageFirst ? "md:order-1" : "md:order-2"
                  }`}
                >
                  <img
                    src={interest.image}
                    alt={interest.title}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>

                <div
                  className={`flex flex-col justify-center ${
                    imageFirst ? "md:order-2" : "md:order-1"
                  }`}
                >
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700 dark:text-blue-400">
                    {String(index + 1).padStart(2, "0")}
                  </p>

                  <h3 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
                    {interest.title}
                  </h3>

                  <p className="mt-2 text-sm font-medium text-blue-700 dark:text-blue-400">
                    {interest.subtitle}
                  </p>

                  <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-300">
                    {interest.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </Section>

      <Section title={t.relatedLinksTitle} eyebrow={t.relatedLinksEyebrow}>
        <div className="grid gap-3 sm:grid-cols-2">
          {relatedLinks.map((link, index) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white/90 px-5 py-4 transition-colors hover:border-blue-300 hover:bg-blue-50/70 dark:border-slate-800 dark:bg-slate-900/70 dark:hover:border-blue-800 dark:hover:bg-slate-800/80"
            >
              <span className="flex min-w-0 items-center gap-3">
                <span className="text-xs font-semibold tabular-nums text-slate-400 dark:text-slate-500">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-sm font-medium text-slate-800 dark:text-slate-200">
                  {link.name}
                </span>
              </span>

              <span className="shrink-0 text-slate-400 transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400">
                ↗
              </span>
            </a>
          ))}
        </div>
      </Section>
    </div>
  );
}
