
import Link from "next/link";

type Locale = "en" | "zh";

type SiteFooterProps = {
  locale?: Locale;
};

/**
 * Global footer with copyright, today's date, and quick links.
 */
export function SiteFooter({ locale = "en" }: SiteFooterProps) {
  const today = new Date().toISOString().slice(0, 10);
  const year = new Date().getFullYear();
  const repositoryUrl = process.env.NEXT_PUBLIC_REPOSITORY_URL;

  const copy = {
    en: {
      copyright: `© ${year} Dr. Chaojie Hao`,
      viewSource: "View source on GitHub",
      today: "Today:"
    },
    zh: {
      copyright: `© ${year} Dr. Chaojie Hao`,
      viewSource: "GitHub 源码仓库",
      today: "今日："
    }
  } satisfies Record<Locale, {
    copyright: string;
    viewSource: string;
    today: string;
  }>;

  const t = copy[locale];

  return (
    <footer className="mt-16 border-t border-slate-200 py-8 text-sm text-slate-600 dark:border-slate-800 dark:text-slate-300 print:hidden">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <span>{t.copyright}</span>
          {repositoryUrl ? (
            <Link
              href={repositoryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-brand dark:text-slate-300 dark:hover:text-brand"
            >
              {t.viewSource}
            </Link>
          ) : null}
        </div>

        <div>
          <span>{t.today} {today}</span>
        </div>
      </div>
    </footer>
  );
}
