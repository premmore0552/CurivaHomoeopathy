import React, { useState } from 'react';
import { 
  BookMarked, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  Bookmark,
  ExternalLink,
  BookOpen
} from 'lucide-react';
import { recommendedTextbooks } from '../../data/nchGynecologyCurriculum';

const obgStudentFaqs = [
  {
    q: "How should a 2nd BHMS student approach studying DC Dutta's Obstetrics for NCH exams?",
    a: "Focus on the high-yield core chapters: Maternal physiological changes, Antenatal care & Leopold's maneuvers, Mechanism of normal labor in LOA position with neat step-by-step diagrams, Active Management of the Third Stage of Labor (AMTSL), Hypertensive disorders (Preeclampsia/Eclampsia Pritchard regimen), Antepartum & Postpartum Hemorrhages, and APGAR scoring in neonates. Always practice drawing the Modified WHO Partograph."
  },
  {
    q: "What is the relative mark distribution between Modern OBG and Homoeopathic Therapeutics?",
    a: "Both Paper I (Gynaecology) and Paper II (Obstetrics & Neonatology) are divided equally: Section A (50 Marks) covers Modern Pathology, Clinical Diagnosis, and Management, while Section B (50 Marks) tests Homoeopathic Therapeutics, Keynotes, Materia Medica, and Repertorisation. To score high, students must excel in both sections."
  },
  {
    q: "How do I distinguish Caulophyllum from Cimicifuga in labor dystocia?",
    a: "Caulophyllum is characterized by extreme rigidity of the os uteri with false, erratic, needle-like spasmodic pains flying across the abdomen to extremities with shivering and physical exhaustion. Cimicifuga (Actaea Racemosa) features intense, unbearable labor pains darting from hip to hip with marked mental gloom, weeping, and fear of insanity or death."
  },
  {
    q: "What is the cardinal rule regarding digital vaginal examination in Antepartum Hemorrhage (APH)?",
    a: "Digital vaginal examination is STRICTLY FORBIDDEN in any patient presenting with 3rd-trimester vaginal bleeding until Placenta Previa has been conclusively excluded by ultrasonography. Digital examination can provoke torrential, catastrophic hemorrhage."
  },
  {
    q: "Which repertories are best suited for solving Gynaecological case questions?",
    a: "Dr. J.T. Kent's Repertory has exhaustive rubrics in the 'Genitalia Female', 'Pregnancy', and 'Parturition' sections. Additionally, Boericke's Repertory and Murphy's Clinical Repertory provide quick, direct clinical chapters for common OBG complaints."
  }
];

export function GynaeTextbooksAndFaqs() {
  const [expandedFaqIdx, setExpandedFaqIdx] = useState<number | null>(0);

  return (
    <div className="space-y-10">
      {/* 1. Recommended Textbooks Grid */}
      <div className="bg-bg-secondary border border-border/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="space-y-1 border-b border-border pb-4">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
            <BookMarked className="w-4 h-4" />
            NCH Official Reference List
          </div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-text-primary">
            Recommended Textbooks & Authoritative Literature
          </h2>
          <p className="text-xs text-text-secondary">
            Standard Modern Medical texts and classical Homoeopathic OBG treatises prescribed in the NCH syllabus.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Modern Medical Texts */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-rose-700 dark:text-rose-300 uppercase tracking-wider flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Modern Gynaecology & Obstetrics Textbooks
            </h3>
            <div className="space-y-3">
              {recommendedTextbooks.modernMedical.map((book, idx) => (
                <div 
                  key={idx}
                  className="p-4 bg-bg-primary rounded-2xl border border-border/80 space-y-1.5 shadow-sm text-xs"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-bold text-text-primary text-sm font-serif">
                      {book.title}
                    </h4>
                    {book.edition && (
                      <span className="px-2 py-0.5 bg-rose-500/10 text-rose-700 dark:text-rose-300 text-[10px] font-bold rounded">
                        {book.edition}
                      </span>
                    )}
                  </div>
                  <div className="text-text-tertiary text-[11px] font-medium">
                    By {book.author}
                  </div>
                  <p className="text-text-secondary leading-relaxed pt-1">
                    {book.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Homoeopathic Therapeutics Treatises */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-purple-700 dark:text-purple-300 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Classical Homoeopathic Therapeutics Treatises
            </h3>
            <div className="space-y-3">
              {recommendedTextbooks.homoeopathicTherapeutics.map((book, idx) => (
                <div 
                  key={idx}
                  className="p-4 bg-bg-primary rounded-2xl border border-border/80 space-y-1.5 shadow-sm text-xs"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-bold text-text-primary text-sm font-serif">
                      {book.title}
                    </h4>
                    <span className="px-2 py-0.5 bg-purple-500/10 text-purple-700 dark:text-purple-300 text-[10px] font-bold rounded">
                      Classical
                    </span>
                  </div>
                  <div className="text-text-tertiary text-[11px] font-medium">
                    By {book.author}
                  </div>
                  <p className="text-text-secondary leading-relaxed pt-1">
                    {book.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Frequently Asked Questions (FAQs) */}
      <div className="bg-bg-secondary border border-border/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="space-y-1 border-b border-border pb-4">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
            <HelpCircle className="w-4 h-4" />
            Exam & Clinical Study Tips
          </div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-text-primary">
            Frequently Asked Questions for 2nd BHMS Students
          </h2>
        </div>

        <div className="space-y-3">
          {obgStudentFaqs.map((faq, idx) => {
            const isOpen = expandedFaqIdx === idx;
            return (
              <div 
                key={idx}
                className="bg-bg-primary border border-border/80 rounded-2xl overflow-hidden shadow-sm transition-all"
              >
                <button
                  onClick={() => setExpandedFaqIdx(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 hover:bg-primary/5 transition-colors"
                >
                  <span className="font-bold text-xs sm:text-sm text-text-primary font-serif">
                    {faq.q}
                  </span>
                  <div className="p-1 rounded-lg bg-bg-secondary text-text-tertiary shrink-0">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="p-4 sm:p-5 pt-0 border-t border-border/40 text-xs sm:text-sm text-text-secondary leading-relaxed animate-fadeIn">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
