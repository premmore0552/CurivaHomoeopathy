
import React, { useMemo, useState } from 'react';
import { BookOpen, Search, ExternalLink, Library, GraduationCap } from 'lucide-react';

type Book = {
  id: number;
  title: string;
  author: string;
  subject: string;
  year: string;
  description: string;
  url: string;
};

const books: Book[] = [
  {
    id: 1,
    title: 'Organon of Medicine',
    author: 'Samuel Hahnemann',
    subject: 'Organon & Philosophy',
    year: 'Classical text',
    description: 'A foundational text in the history of homoeopathic philosophy.',
    url: 'https://wellcomecollection.org/works/bp6qmca4',
  },
  {
    id: 2,
    title: 'Lectures on Homoeopathic Materia Medica',
    author: 'James Tyler Kent',
    subject: 'Materia Medica',
    year: 'Classical text',
    description: 'Historical lectures describing remedies in the homoeopathic tradition.',
    url: 'https://www.ncbi.nlm.nih.gov/nlmcatalog/101302474',
  },
  {
    id: 3,
    title: 'Leaders in Homoeopathic Therapeutics',
    author: 'E. B. Nash',
    subject: 'Materia Medica',
    year: 'Classical text',
    description: 'A historical reference on homoeopathic therapeutics.',
    url: 'https://wellcomecollection.org/works/sh3awcy7',
  },
  {
    id: 4,
    title: 'Repertory of the Homoeopathic Materia Medica',
    author: 'James Tyler Kent',
    subject: 'Repertory',
    year: 'Classical text',
    description: 'A historical repertory reference for academic study.',
    url: 'https://wellcomecollection.org/works/aguw48nw',
  },
  {
    id: 5,
    title: 'The Twelve Tissue Remedies',
    author: 'Boericke and Dewey',
    subject: 'Materia Medica',
    year: 'Classical text',
    description: 'A historical text on the twelve tissue remedies.',
    url: 'https://archive.org/download/twelvetissuereme00boe/twelvetissuereme00boe.pdf',
  },
];

export default function FreeBookLibrary() {
  const [search, setSearch] = useState('');
  const [subject, setSubject] = useState('All subjects');

  const subjects = useMemo(
    () => ['All subjects', ...Array.from(new Set(books.map(book => book.subject)))],
    []
  );

  const filteredBooks = books.filter(book => {
    const term = search.trim().toLowerCase();
    const matchesSearch =
      !term ||
      `${book.title} ${book.author} ${book.subject} ${book.description}`
        .toLowerCase()
        .includes(term);

    return matchesSearch &&
      (subject === 'All subjects' || book.subject === subject);
  });

  return (
    <div className="py-10 space-y-8">
      <header className="rounded-3xl border border-border bg-bg-secondary p-6 md:p-10">
        <div className="flex items-center gap-3 text-primary mb-4">
          <Library size={28} />
          <span className="text-sm font-bold uppercase tracking-[0.2em]">
            Curiva Student Library
          </span>
        </div>

        <h1 className="text-3xl md:text-5xl font-display font-bold text-text-primary">
          Free Homoeopathy Books
        </h1>

        <p className="mt-4 max-w-2xl text-text-secondary leading-relaxed">
          Explore historical homoeopathy texts and educational references.
          Availability and download options depend on each source.
        </p>

        <div className="mt-6 flex items-center gap-2 text-sm text-text-secondary">
          <GraduationCap size={18} />
          <span>For educational and historical reference</span>
        </div>
      </header>

      <section className="space-y-5">
        <div className="flex flex-col md:flex-row gap-3">
          <label className="relative flex-1">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary"
            />
            <input
              value={search}
              onChange={event => setSearch(event.target.value)}
              placeholder="Search by title, author, or subject..."
              className="w-full rounded-xl border border-border bg-bg-primary py-3 pl-11 pr-4 text-text-primary outline-none focus:border-primary"
            />
          </label>

          <select
            value={subject}
            onChange={event => setSubject(event.target.value)}
            className="rounded-xl border border-border bg-bg-primary px-4 py-3 text-text-primary"
          >
            {subjects.map(item => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </div>

        <p className="text-sm text-text-secondary">
          {filteredBooks.length} {filteredBooks.length === 1 ? 'book' : 'books'} found
        </p>

        {filteredBooks.length === 0 ? (
          <div className="rounded-2xl border border-border p-10 text-center">
            <BookOpen className="mx-auto mb-3 text-text-secondary" size={32} />
            <p className="font-semibold">No matching books found</p>
            <p className="mt-2 text-sm text-text-secondary">
              Try another title or select a different subject.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {filteredBooks.map(book => (
              <article
                key={book.id}
                className="flex flex-col rounded-2xl border border-border bg-bg-primary p-6 transition hover:border-primary/50"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <BookOpen size={24} />
                </div>

                <p className="text-xs font-bold uppercase tracking-wider text-primary">
                  {book.subject}
                </p>

                <h2 className="mt-2 text-xl font-bold text-text-primary">
                  {book.title}
                </h2>

                <p className="mt-2 text-sm text-text-secondary">
                  By {book.author}
                </p>

                <p className="mt-4 flex-1 text-sm leading-relaxed text-text-secondary">
                  {book.description}
                </p>

                <p className="mt-4 text-xs text-text-secondary">{book.year}</p>

                <a
                  href={book.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 font-semibold text-white hover:opacity-90"
                >
                  Open source <ExternalLink size={16} />
                </a>
              </article>
            ))}
          </div>
        )}
      </section>

      <p className="text-xs leading-relaxed text-text-secondary">
        Copyright notice: this catalogue links to external collections and
        repositories. Confirm the applicable licence and local copyright status
        before downloading, redistributing, or rehosting any book.
        Historical texts are not a substitute for current medical education
        or professional clinical guidance.
      </p>
    </div>
  );
}
