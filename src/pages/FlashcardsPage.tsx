import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  Search, 
  RotateCw, 
  CheckCircle2, 
  XCircle, 
  ChevronLeft, 
  ChevronRight, 
  BookOpen, 
  Award,
  Layers,
  HelpCircle,
  Play,
  Pause,
  Shuffle,
  Grid,
  Maximize2,
  Volume2,
  Bookmark,
  Filter
} from 'lucide-react';
import SEO from '../components/SEO';
import { HomoeopathicFlashcards, Flashcard } from '../data/flashcards_data';

export default function FlashcardsPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [viewMode, setViewMode] = useState<'card' | 'grid'>('card');
  const [shuffledCards, setShuffledCards] = useState<Flashcard[]>(HomoeopathicFlashcards);
  const [bookmarkedTerms, setBookmarkedTerms] = useState<Set<string>>(new Set());

  // Filtered Cards
  const filteredCards = useMemo(() => {
    return shuffledCards.filter(card => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        card.term.toLowerCase().includes(q) ||
        card.definition.toLowerCase().includes(q) ||
        card.clinicalSignificance.toLowerCase().includes(q);

      const matchesCategory = filterCategory === 'All' || card.subType === filterCategory;
      return matchesSearch && matchesCategory;
    });
  }, [shuffledCards, filterCategory, searchQuery]);

  // Reset index when filter or search changes
  useEffect(() => {
    setCurrentIndex(0);
    setIsFlipped(false);
  }, [filterCategory, searchQuery]);

  // Autoplay effect
  useEffect(() => {
    let timer: any = null;
    if (isPlaying && filteredCards.length > 0) {
      timer = setInterval(() => {
        setIsFlipped(prev => {
          if (!prev) {
            return true;
          } else {
            setCurrentIndex(idx => (idx + 1) % filteredCards.length);
            return false;
          }
        });
      }, 4000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isPlaying, filteredCards.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.code === 'Space') {
        e.preventDefault();
        setIsFlipped(f => !f);
      } else if (e.code === 'ArrowRight') {
        handleNext();
      } else if (e.code === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [filteredCards.length]);

  const handleNext = () => {
    if (filteredCards.length === 0) return;
    setIsFlipped(false);
    setCurrentIndex(prev => (prev + 1) % filteredCards.length);
  };

  const handlePrev = () => {
    if (filteredCards.length === 0) return;
    setIsFlipped(false);
    setCurrentIndex(prev => (prev - 1 + filteredCards.length) % filteredCards.length);
  };

  const handleShuffle = () => {
    setIsFlipped(false);
    const shuffled = [...shuffledCards].sort(() => Math.random() - 0.5);
    setShuffledCards(shuffled);
    setCurrentIndex(0);
  };

  const toggleBookmark = (term: string) => {
    setBookmarkedTerms(prev => {
      const next = new Set(prev);
      if (next.has(term)) next.delete(term);
      else next.add(term);
      return next;
    });
  };

  const currentCard = filteredCards[currentIndex % (filteredCards.length || 1)];

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      <SEO 
        title="100+ Homoeopathic Flashcards & Active Recall Deck | Curiva Homoeopathy"
        description="Interactive 3D flip flashcards for Materia Medica keynotes, Organon aphorisms, Pharmacy rules, and Repertory fundamentals for BHMS & AIAPGET active recall."
      />

      {/* Breadcrumb & Hero */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs text-text-tertiary">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <Link to="/student-resources" className="hover:text-primary transition-colors">Study Resources</Link>
          <span>/</span>
          <span className="text-primary font-bold">100+ Active Recall Flashcards</span>
        </div>

        <div className="bg-gradient-to-r from-amber-950 via-yellow-900 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-200 text-xs font-bold uppercase tracking-wider border border-white/10">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Active Recall &amp; Spaced Repetition
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight">
              100+ Homoeopathic Flashcards
            </h1>
            <p className="text-amber-100 text-xs sm:text-sm md:text-base leading-relaxed">
              Master high-yield Materia Medica polychrests, Organon aphorisms (§1–294), Pharmacy potentization rules, and Repertorial rubrics through high-speed active recall.
            </p>
          </div>
        </div>
      </div>

      {/* Controls Bar: Search, Category Filter, Mode Switches */}
      <div className="bg-bg-secondary border border-border rounded-3xl p-4 sm:p-6 space-y-4 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Search */}
          <div className="relative flex-grow max-w-md">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search terms, remedies, aphorisms..."
              className="w-full pl-10 pr-4 py-2.5 bg-bg-primary rounded-xl border border-border text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 text-text-primary"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                isPlaying 
                  ? 'bg-amber-600 text-white animate-pulse' 
                  : 'bg-bg-primary text-text-secondary hover:text-primary border border-border'
              }`}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isPlaying ? 'Pause Auto' : 'Auto Play'}</span>
            </button>

            <button
              onClick={handleShuffle}
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-bg-primary text-text-secondary hover:text-primary border border-border transition-all flex items-center gap-1.5"
              title="Shuffle Deck"
            >
              <Shuffle className="w-3.5 h-3.5" />
              <span>Shuffle</span>
            </button>

            <div className="flex items-center bg-bg-primary border border-border rounded-xl p-0.5">
              <button
                onClick={() => setViewMode('card')}
                className={`p-2 rounded-lg text-xs font-bold transition-all ${
                  viewMode === 'card' ? 'bg-primary text-white' : 'text-text-tertiary hover:text-text-primary'
                }`}
                title="Single Focus Card View"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg text-xs font-bold transition-all ${
                  viewMode === 'grid' ? 'bg-primary text-white' : 'text-text-tertiary hover:text-text-primary'
                }`}
                title="Grid Overview Mode"
              >
                <Grid className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-border/60">
          <span className="text-xs font-bold text-text-tertiary uppercase tracking-wider mr-1">Deck:</span>
          {(['All', 'Materia Medica', 'Philosophy & Organon', 'Repertory', 'Pharmacy'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                filterCategory === cat
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-bg-primary text-text-secondary hover:text-primary border border-border'
              }`}
            >
              {cat}
            </button>
          ))}
          <span className="ml-auto text-xs text-text-tertiary font-mono">
            {filteredCards.length} Cards in Deck
          </span>
        </div>
      </div>

      {/* --- SINGLE CARD VIEW MODE --- */}
      {viewMode === 'card' && filteredCards.length > 0 && (
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Card Counter & Bookmark */}
          <div className="flex items-center justify-between text-xs text-text-tertiary">
            <span className="font-mono font-bold bg-bg-secondary px-3 py-1 rounded-full border border-border">
              Card {currentIndex + 1} of {filteredCards.length}
            </span>
            <div className="flex items-center gap-3">
              <span className="text-[11px] text-text-tertiary hidden sm:inline">
                Press <kbd className="px-1.5 py-0.5 rounded bg-bg-secondary border border-border font-mono">Space</kbd> to flip • <kbd className="px-1.5 py-0.5 rounded bg-bg-secondary border border-border font-mono">← / →</kbd> to navigate
              </span>
              <button
                onClick={() => toggleBookmark(currentCard.term)}
                className={`p-1.5 rounded-lg border transition-all ${
                  bookmarkedTerms.has(currentCard.term)
                    ? 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950 dark:text-amber-300'
                    : 'bg-bg-secondary text-text-tertiary border-border hover:text-text-primary'
                }`}
                title="Bookmark for Revision"
              >
                <Bookmark className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Interactive 3D Flip Flashcard */}
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="w-full min-h-[340px] sm:min-h-[380px] bg-bg-secondary border-2 border-border hover:border-primary/50 rounded-3xl p-6 sm:p-10 shadow-lg cursor-pointer flex flex-col justify-between transition-all duration-300 transform active:scale-[0.99] select-none relative overflow-hidden group"
          >
            {/* Top Badge */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                {currentCard.subType}
              </span>
              <span className="text-xs font-bold text-text-tertiary flex items-center gap-1">
                <RotateCw className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-500" />
                <span>{isFlipped ? 'Definition' : 'Click to Flip'}</span>
              </span>
            </div>

            {/* Front vs Back Content */}
            <div className="my-auto py-6 text-center space-y-4">
              {!isFlipped ? (
                <div className="space-y-3 animate-fadeIn">
                  <span className="text-xs font-bold uppercase tracking-widest text-text-tertiary">
                    Homoeopathic Concept / Term
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-serif font-bold text-text-primary leading-tight">
                    {currentCard.term}
                  </h2>
                </div>
              ) : (
                <div className="space-y-4 animate-fadeIn text-left">
                  <div className="space-y-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-text-tertiary block">
                      Core Definition:
                    </span>
                    <p className="text-sm sm:text-base text-text-primary leading-relaxed">
                      {currentCard.definition}
                    </p>
                  </div>
                  {currentCard.clinicalSignificance && (
                    <div className="bg-bg-primary p-4 rounded-2xl border border-border/80 space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-primary block">
                        Clinical Significance &amp; Application:
                      </span>
                      <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                        {currentCard.clinicalSignificance}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Bottom Footer hint */}
            <div className="text-center text-[11px] text-text-tertiary border-t border-border/60 pt-3">
              {isFlipped ? 'Click again to return to term' : 'Click anywhere on card or press Spacebar to reveal answer'}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={handlePrev}
              className="flex-1 py-3.5 bg-bg-secondary hover:bg-bg-primary border border-border text-text-primary font-bold text-xs sm:text-sm rounded-2xl shadow-sm transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <button
              onClick={() => setIsFlipped(!isFlipped)}
              className="px-6 py-3.5 bg-primary/10 hover:bg-primary text-primary hover:text-white font-bold text-xs sm:text-sm rounded-2xl transition-all flex items-center justify-center gap-2"
            >
              <RotateCw className="w-4 h-4" />
              <span>Flip</span>
            </button>

            <button
              onClick={handleNext}
              className="flex-1 py-3.5 bg-primary text-white hover:bg-primary/90 font-bold text-xs sm:text-sm rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <span>Next Card</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* --- GRID OVERVIEW MODE --- */}
      {viewMode === 'grid' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {filteredCards.map((card, idx) => (
              <div
                key={idx}
                className="bg-bg-secondary border border-border rounded-2xl p-5 space-y-3 hover:border-primary/40 transition-all flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-primary/10 text-primary">
                      {card.subType}
                    </span>
                    <span className="text-xs font-mono text-text-tertiary">#{idx + 1}</span>
                  </div>
                  <h3 className="text-base font-serif font-bold text-text-primary">
                    {card.term}
                  </h3>
                  <p className="text-xs text-text-secondary leading-relaxed line-clamp-3">
                    {card.definition}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setCurrentIndex(idx);
                    setViewMode('card');
                    setIsFlipped(true);
                  }}
                  className="text-xs text-primary font-bold hover:underline flex items-center gap-1 pt-2"
                >
                  <span>Practice this card</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {filteredCards.length === 0 && (
        <div className="p-12 text-center bg-bg-secondary rounded-3xl border border-border space-y-3">
          <Layers className="w-8 h-8 text-text-tertiary mx-auto opacity-50" />
          <h3 className="text-base font-bold text-text-primary">No flashcards found</h3>
          <p className="text-xs text-text-secondary">Try clearing your search query or selecting a different category.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setFilterCategory('All');
            }}
            className="px-4 py-2 bg-primary text-white rounded-xl text-xs font-bold"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
