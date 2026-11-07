import React from 'react';

type LoadingProps = { label?: string };

/** Route fallback: announces loading without implying a fake percentage or completion time. */
export default function RouteLoadingScreen({ label = 'Loading page content' }: LoadingProps) {
  return (
    <section className="mx-auto flex min-h-[52vh] w-full max-w-7xl flex-col justify-center px-4 py-10 sm:px-6 lg:px-8" role="status" aria-live="polite" aria-busy="true">
      <span className="sr-only">{label}</span>
      <div className="mb-6 flex items-center justify-center gap-3">
        <img
          src="/app_icon.png.png"
          alt=""
          onError={(event) => { event.currentTarget.src = '/curiva_logo.svg'; }}
          className="h-10 w-10 rounded-xl object-cover"
          aria-hidden="true"
        />
        <span className="text-sm font-display font-semibold uppercase tracking-[0.18em] text-primary">Curiva</span>
      </div>
      <div aria-hidden="true" className="w-full animate-pulse space-y-6">
        <div className="h-3 w-28 rounded-full bg-primary/15" />
        <div className="h-9 w-3/4 max-w-xl rounded-xl bg-bg-secondary" />
        <div className="h-4 w-full max-w-2xl rounded-full bg-bg-secondary" />
        <div className="h-4 w-2/3 max-w-xl rounded-full bg-bg-secondary" />
        <div className="grid grid-cols-1 gap-4 pt-4 sm:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2].map(item => (
            <div key={item} className="rounded-2xl border border-border bg-bg-secondary/60 p-5">
              <div className="h-8 w-8 rounded-lg bg-primary/10" />
              <div className="mt-5 h-4 w-2/3 rounded-full bg-bg-primary" />
              <div className="mt-3 h-3 w-full rounded-full bg-bg-primary" />
              <div className="mt-2 h-3 w-4/5 rounded-full bg-bg-primary" />
            </div>
          ))}
        </div>
      </div>
      <p className="mt-6 text-center text-xs font-medium text-text-tertiary">{label}</p>
    </section>
  );
}

export function ArticleLoadingSkeleton() {
  return (
    <section className="mx-auto w-full max-w-4xl animate-pulse px-4 py-8 sm:px-6" aria-label="Loading article" aria-busy="true">
      <div className="h-3 w-32 rounded bg-bg-secondary" />
      <div className="mt-5 h-9 w-4/5 rounded-lg bg-bg-secondary" />
      <div className="mt-3 h-4 w-2/3 rounded bg-bg-secondary" />
      <div className="mt-8 space-y-3">
        {Array.from({ length: 8 }, (_, index) => <div key={index} className={'h-3 rounded bg-bg-secondary ' + (index % 3 === 2 ? 'w-3/4' : 'w-full')} />)}
      </div>
    </section>
  );
}

export function CardGridLoadingSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3" aria-label="Loading cards" aria-busy="true">
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className="animate-pulse rounded-2xl border border-border p-5">
          <div className="h-8 w-8 rounded-lg bg-bg-secondary" />
          <div className="mt-5 h-4 w-2/3 rounded bg-bg-secondary" />
          <div className="mt-3 h-3 w-full rounded bg-bg-secondary" />
          <div className="mt-2 h-3 w-4/5 rounded bg-bg-secondary" />
        </div>
      ))}
    </div>
  );
}