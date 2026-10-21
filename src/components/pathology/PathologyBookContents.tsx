import React from 'react';
import { ArrowRight, BookOpen, Bookmark, Layers3 } from 'lucide-react';
import { Link } from 'react-router-dom';

const sections = [
  {
    title: 'General Pathology',
    range: 'Section I · Chapters 1–9',
    chapters: [
      ['Introduction to Pathology', 1],
      ['Cell Injury, Cellular Adaptations and Cellular Ageing', 9],
      ['Immunopathology Including Amyloidosis', 44],
      ['Derangements of Homeostasis and Haemodynamics', 78],
      ['Inflammation and Healing', 116],
      ['Infectious and Parasitic Diseases', 165],
      ['Neoplasia', 184],
      ['Environmental and Nutritional Diseases', 231],
      ['Genetic and Paediatric Diseases', 251],
    ] as const,
  },
  {
    title: 'Haematology and Lymphoreticular Tissues',
    range: 'Section II · Chapters 10–12',
    chapters: [
      ['Introduction to Haematopoietic System and Disorders of Erythroid Series', 261],
      ['Disorders of Platelets, Bleeding Disorders and Basic Transfusion Medicine', 305],
      ['Disorders of Leucocytes and Lymphoreticular Tissues', 321],
    ] as const,
  },
  {
    title: 'Systemic Pathology',
    range: 'Section III · Chapters 13–28',
    chapters: [
      ['The Blood Vessels and Lymphatics', 370],
      ['The Heart', 397],
      ['The Respiratory System', 442],
      ['The Eye, ENT and Neck', 488],
      ['The Oral Cavity and Salivary Glands', 504],
      ['The Gastrointestinal Tract', 521],
      ['The Liver, Biliary Tract and Exocrine Pancreas', 577],
      ['The Kidney and Lower Urinary Tract', 636],
      ['The Male Reproductive System and Prostate', 691],
      ['The Female Genital Tract', 710],
      ['The Breast', 745],
      ['The Skin', 759],
      ['The Endocrine System', 782],
      ['The Musculoskeletal System', 821],
      ['Soft Tissue Tumours', 851],
      ['The Nervous System', 863],
    ] as const,
  },
];

const appendices = [
  ['Appendix I: Basic Diagnostic Cytology', 888],
  ['Appendix II: Answers to Clinical Cases', 906],
  ['Appendix III: Normal Values', 915],
  ['Further Reading', 923],
  ['Index', 931],
  ['List of Clinical Cases', 954],
] as const;

export const PathologyBookContents: React.FC = () => (
  <section id="pathology-book-contents-heading" className="scroll-mt-6 space-y-6" aria-labelledby="pathology-book-contents-title">
    <div className="rounded-3xl bg-gradient-to-br from-red-950 via-rose-900 to-slate-900 p-6 sm:p-8 text-white shadow-xl">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl space-y-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-rose-100">
            <BookOpen className="h-4 w-4" /> Textbook Contents
          </span>
          <h2 id="pathology-book-contents-title" className="text-2xl sm:text-3xl font-serif font-bold">Harsh Mohan’s Textbook of Pathology</h2>
          <p className="text-sm leading-relaxed text-rose-100/90">Seventh edition · 28 chapters across General Pathology, Haematology and Lymphoreticular Tissues, and Systemic Pathology. Page references follow the supplied contents list.</p>
        </div>
        <div className="flex items-center gap-2 text-sm font-semibold text-rose-100">
          <Layers3 className="h-5 w-5" /> 3 sections · 28 chapters
        </div>
      </div>
    </div>

    <div className="grid gap-5 lg:grid-cols-3">
      {sections.map((section, sectionIndex) => {
        let chapterNumber = sectionIndex === 0 ? 1 : sectionIndex === 1 ? 10 : 13;
        return (
          <section key={section.title} className="rounded-3xl border border-border bg-bg-secondary p-5 sm:p-6" aria-label={section.title}>
            <div className="mb-4 border-b border-border pb-4">
              <p className="text-[10px] font-bold uppercase tracking-widest text-red-700 dark:text-red-300">{section.range}</p>
              <h3 className="mt-1 text-lg font-serif font-bold text-text-primary">{section.title}</h3>
            </div>
            <ol className="space-y-2">
              {section.chapters.map(([title, page]) => {
                const number = chapterNumber++;
                const isCellInjury = number === 2;
                return (
                  <li key={number} className="rounded-2xl border border-border/70 bg-bg-primary p-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-[10px] font-bold uppercase tracking-wide text-text-tertiary">Chapter {number}</p>
                        <h4 className="mt-0.5 text-sm font-semibold leading-snug text-text-primary">{title}</h4>
                      </div>
                      <span className="shrink-0 rounded-full bg-red-50 px-2 py-1 text-[10px] font-bold text-red-800 dark:bg-red-950/50 dark:text-red-200">p. {page}</span>
                    </div>
                    {isCellInjury && (
                      <Link to="/subject/pathology/cell-injury" className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-red-700 hover:underline dark:text-red-300">
                        Open the available detailed guide <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    )}
                  </li>
                );
              })}
            </ol>
          </section>
        );
      })}
    </div>

    <details className="group rounded-3xl border border-border bg-bg-secondary p-5 sm:p-6">
      <summary className="flex cursor-pointer list-none items-center gap-3 text-base font-bold text-text-primary">
        <Bookmark className="h-5 w-5 text-red-700 dark:text-red-300" /> Appendices and reference sections
        <span className="ml-auto text-xs font-semibold text-text-tertiary group-open:hidden">Show</span>
        <span className="ml-auto hidden text-xs font-semibold text-text-tertiary group-open:inline">Hide</span>
      </summary>
      <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {appendices.map(([title, page]) => (
          <li key={title} className="flex items-center justify-between gap-2 rounded-xl border border-border/70 bg-bg-primary px-4 py-3 text-sm text-text-primary">
            <span>{title}</span><span className="shrink-0 text-xs font-bold text-text-tertiary">p. {page}</span>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-xs text-text-tertiary">This page provides a chapter index and page references. Detailed digital teaching content is currently available for Chapter 2.</p>
    </details>
  </section>
);
