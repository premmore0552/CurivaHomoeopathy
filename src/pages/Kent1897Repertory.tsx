import React, { useEffect, useMemo, useState } from 'react';
import { AlertCircle, ArrowLeft, BookOpen, ExternalLink, FileSearch, Loader2, Search, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

type KentSourcePage = {
  textPage: number;
  printedPage: number | null;
  text: string;
};

type KentSourceData = {
  schemaVersion: number;
  edition: string;
  title: string;
  author: string;
  pages: KentSourcePage[];
  editorialStatus?: string;
  gradePolicy?: string;
};

const sourceUrl = 'https://archive.org/details/b20416234_001';

function makeSnippet(text: string, query: string) {
  const firstTerm = query.trim().toLowerCase().split(/\s+/).find(Boolean) ?? '';
  const lower = text.toLowerCase();
  const index = firstTerm ? lower.indexOf(firstTerm) : 0;
  const start = Math.max(0, index - 100);
  const end = Math.min(text.length, Math.max(index + 220, 320));
  return (start > 0 ? '…' : '') + text.slice(start, end).replace(/\s+/g, ' ').trim() +
    (end < text.length ? '…' : '');
}

export default function Kent1897Repertory() {
  const [pages, setPages] = useState<KentSourcePage[]>([]);
  const [query, setQuery] = useState('');
  const [selectedTextPage, setSelectedTextPage] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function loadSource() {
      try {
        setLoading(true);
        setError('');
        const url = import.meta.env.BASE_URL + 'data/kent-1897/pages.json';
        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) {
          throw new Error(
            response.status === 404
              ? 'The 1897 OCR text has not been imported into this website build yet.'
              : 'Unable to load the Kent source text (HTTP ' + response.status + ').',
          );
        }

        const data = (await response.json()) as KentSourceData;
        if (data.schemaVersion !== 1 || !Array.isArray(data.pages)) {
          throw new Error('The Kent source file has an unsupported or invalid format.');
        }
        setPages(data.pages);
      } catch (cause) {
        if (cause instanceof Error && cause.name === 'AbortError') return;
        setError(cause instanceof Error ? cause.message : 'Unable to load the source text.');
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    loadSource();
    return () => controller.abort();
  }, []);

  const results = useMemo(() => {
    const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
    if (!terms.length) return [];
    return pages
      .filter((page) => page.text && terms.every((term) => page.text.toLowerCase().includes(term)))
      .map((page) => ({
        ...page,
        snippet: makeSnippet(page.text, query),
      }));
  }, [pages, query]);

  const selectedPage = pages.find((page) => page.textPage === selectedTextPage) ?? null;

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      <SEO
        title="Kent's 1897 Repertory — Source Text Search | Curiva Homoeopathy"
        description="Search the OCR transcription of J. T. Kent's 1897 Repertory of the Homoeopathic Materia Medica, with source-page references and transcription limitations."
      />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link to="/subject/repertory" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
          <ArrowLeft className="h-4 w-4" />
          Repertory Study Center
        </Link>
        <Link to="/repertory" className="text-sm font-semibold text-primary hover:underline">
          Open curated repertory tool
        </Link>
      </div>

      <header className="rounded-3xl border border-border bg-bg-secondary p-6 sm:p-10 space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
          <BookOpen className="h-4 w-4" />
          Historical source edition · 1897
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight">
          Kent's Repertory
          <span className="block text-primary">Original source text</span>
        </h1>
        <p className="max-w-3xl text-sm sm:text-base leading-relaxed text-text-secondary">
          Search the OCR transcription of <em>Repertory of the Homoeopathic Materia Medica</em>
          by J. T. Kent. Search results take you to the extracted text page so that wording
          can be checked against the original scan.
        </p>
        <div className="flex flex-wrap gap-2 text-xs text-text-secondary">
          <span className="rounded-lg border border-border bg-bg-primary px-3 py-2">J. T. Kent, M.D.</span>
          <span className="rounded-lg border border-border bg-bg-primary px-3 py-2">Examiner Printing House · 1897</span>
          <span className="rounded-lg border border-border bg-bg-primary px-3 py-2">
            {pages.length ? pages.length.toLocaleString() + ' extracted text pages' : 'Page references retained'}
          </span>
        </div>
      </header>

      <section className="rounded-2xl border border-amber-300/60 bg-amber-50 p-4 text-sm text-amber-950 dark:bg-amber-950/20 dark:text-amber-100">
        <div className="flex items-start gap-3">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
          <div className="space-y-1">
            <strong>Transcription and clinical-use notice</strong>
            <p>
              This is OCR text, not a proofread transcription. Line breaks, spelling, remedy
              abbreviations and punctuation may be misread. Remedy grades are not inferred
              from OCR typography. Check important entries against the scanned page. This
              historical reference is not diagnostic or treatment advice.
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-border bg-white p-5 sm:p-8 shadow-sm space-y-5">
        <div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold">Search the 1897 text</h2>
          <p className="mt-1 text-sm text-text-secondary">
            Search rubric wording, symptom phrases or remedy abbreviations. Multiple words must all appear on the same extracted page.
          </p>
        </div>

        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-text-tertiary" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="e.g. vertigo, chill, amelioration, Nux-v."
            className="w-full rounded-xl border border-border bg-bg-primary py-4 pl-12 pr-12 text-sm outline-none focus:ring-2 focus:ring-primary/30"
            aria-label="Search Kent 1897 source text"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-text-secondary hover:bg-bg-secondary"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {loading && (
          <div className="flex items-center gap-3 py-8 text-sm text-text-secondary">
            <Loader2 className="h-5 w-5 animate-spin" /> Loading the source transcription…
          </div>
        )}

        {!loading && error && (
          <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-950 dark:bg-amber-950/20 dark:text-amber-100 space-y-2">
            <div className="flex items-center gap-2 font-bold"><AlertCircle className="h-4 w-4" /> Source text not available in this build</div>
            <p>{error}</p>
            <p>
              Place the OCR text at <code>scripts/kent-source/kent-1897-raw.txt</code>, then run
              <code className="mx-1 rounded bg-black/5 px-1 py-0.5">npm run import:kent:1897</code>
              and rebuild the site. See docs/KENT_1897_IMPORT.md for the complete import instructions.
            </p>
            <a href={sourceUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-semibold underline">
              View the source scan on Internet Archive <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        )}

        {!loading && !error && !query.trim() && (
          <div className="flex items-center gap-3 rounded-xl bg-bg-secondary p-5 text-sm text-text-secondary">
            <FileSearch className="h-5 w-5 shrink-0 text-primary" />
            Enter one or more words to search the complete imported text.
          </div>
        )}

        {!loading && !error && query.trim() && (
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-text-tertiary">
              {results.length.toLocaleString()} matching extracted pages
            </div>
            {results.length === 0 ? (
              <p className="rounded-xl bg-bg-secondary p-5 text-sm text-text-secondary">
                No matching page was found. Try fewer words or another spelling; OCR may have misread some characters.
              </p>
            ) : (
              <div className="space-y-2">
                {results.slice(0, 100).map((result) => (
                  <button
                    key={result.textPage}
                    type="button"
                    onClick={() => setSelectedTextPage(result.textPage)}
                    className={'block w-full rounded-xl border p-4 text-left transition-colors hover:border-primary/50 hover:bg-primary/5 ' +
                      (selectedTextPage === result.textPage ? 'border-primary bg-primary/5' : 'border-border bg-bg-primary')}
                  >
                    <span className="text-xs font-bold uppercase tracking-wide text-primary">
                      Text page {result.textPage}
                      {result.printedPage ? ' · Printed page ' + result.printedPage : ''}
                    </span>
                    <span className="mt-2 block text-sm leading-relaxed text-text-secondary">{result.snippet}</span>
                  </button>
                ))}
                {results.length > 100 && (
                  <p className="text-xs text-text-tertiary">
                    Showing the first 100 results. Add more specific words to narrow the search.
                  </p>
                )}
              </div>
            )}
          </div>
        )}
      </section>

      {selectedPage && (
        <section className="rounded-3xl border border-border bg-white p-5 sm:p-8 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wide text-primary">Source transcription</span>
              <h2 className="text-xl font-serif font-bold">
                Text page {selectedPage.textPage}
                {selectedPage.printedPage ? ' · Printed page ' + selectedPage.printedPage : ''}
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setSelectedTextPage(null)}
              className="rounded-lg border border-border px-3 py-2 text-sm text-text-secondary hover:bg-bg-secondary"
            >
              Close page
            </button>
          </div>
          <pre className="max-h-[70vh] overflow-auto whitespace-pre-wrap break-words rounded-xl border border-border bg-[#fbfaf6] p-4 text-xs leading-relaxed text-[#302e29] sm:text-sm">
            {selectedPage.text}
          </pre>
          <a href={sourceUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-primary underline">
            Compare with the original scan <ExternalLink className="h-4 w-4" />
          </a>
        </section>
      )}

      <footer className="border-t border-border pt-5 text-xs leading-relaxed text-text-tertiary">
        <p>
          Source attribution: J. T. Kent, <em>Repertory of the Homoeopathic Materia Medica</em>,
          Examiner Printing House, Lancaster, 1897. Digitized source record: Wellcome Collection /
          Internet Archive item b20416234_001. The OCR transcription is a derivative text extraction;
          transcription errors and page-number offsets are possible.
        </p>
        <a className="mt-2 inline-flex items-center gap-1 text-primary underline" href={sourceUrl} target="_blank" rel="noreferrer">
          Source record and scan <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </footer>
    </div>
  );
}
