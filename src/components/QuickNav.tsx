import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Compass, X, ChevronRight, Hash, ArrowUp } from 'lucide-react';

interface HeadingItem {
  id: string;
  text: string;
  level: 'h2' | 'h3';
  element: HTMLElement;
}

export default function QuickNav() {
  const [headings, setHeadings] = useState<HeadingItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>('');
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Generate/collect headings after components mount
    const timer = setTimeout(() => {
      // Query content-related h2 and h3 elements
      const selector = 'main h2, main h3, article h2, article h3, .long-form h2, .long-form h3, .container h2, .container h3';
      const elements = Array.from(document.querySelectorAll(selector)) as HTMLElement[];
      
      const gathered: HeadingItem[] = elements.map((el, index) => {
        // Ensure element has an ID for reference/intersection tracking
        if (!el.id) {
          const cleanText = (el.textContent || '')
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
          el.id = cleanText || `heading-${index}`;
        }
        return {
          id: el.id,
          text: el.textContent || '',
          level: el.tagName.toLowerCase() as 'h2' | 'h3',
          element: el,
        };
      });

      setHeadings(gathered);

      // Set up IntersectionObserver to detect currently active section
      if (observerRef.current) observerRef.current.disconnect();

      const observerOptions = {
        root: null,
        rootMargin: '-10% 0px -75% 0px', // Trigger when section is in the upper part of viewport
        threshold: 0,
      };

      observerRef.current = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      }, observerOptions);

      gathered.forEach((item) => {
        if (item.element && observerRef.current) {
          observerRef.current.observe(item.element);
        }
      });
    }, 600); // Wait slightly for client renders to complete fully

    return () => {
      clearTimeout(timer);
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, []);

  const scrollToHeading = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsOpen(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsOpen(false);
  };

  // Only render QuickNav if there are enough headings on the page to warrant custom navigation
  if (headings.length < 3) return null;

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-2">
        {/* Scroll To Top Sub-button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToTop}
          className="p-3 bg-white hover:bg-bg-secondary text-text-secondary border border-border rounded-full shadow-lg cursor-pointer transition-all flex items-center justify-center"
          title="Scroll to Top"
        >
          <ArrowUp className="w-4 h-4" />
        </motion.button>

        {/* Quick Nav Trigger */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="p-4 bg-primary hover:bg-primary-dark text-white rounded-full shadow-xl shadow-primary/20 cursor-pointer transition-all flex items-center justify-center gap-2 group border border-primary/10"
          title="Quick Navigation"
        >
          <Compass className="w-5 h-5 animate-pulse group-hover:rotate-45 transition-transform duration-500" />
          <span className="text-xs font-bold uppercase tracking-wider pr-1 hidden md:inline">Quick Nav</span>
        </motion.button>
      </div>

      {/* Slide-in Overlay Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black z-50 cursor-pointer"
            />

            {/* Slide-in Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-80 sm:w-96 bg-white border-l border-border shadow-2xl z-50 flex flex-col"
            >
              {/* Header */}
              <div className="p-6 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-primary/10 text-primary">
                    <Compass className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-black text-sm text-text-primary uppercase tracking-wider">
                      Page Directory
                    </h3>
                    <p className="text-[10px] text-text-secondary">
                      {headings.length} core segments found
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-bg-secondary text-text-secondary rounded-xl transition-all border border-transparent hover:border-border cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Headings List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-1 scrollbar-thin">
                {headings.map((item, idx) => {
                  const isActive = activeId === item.id;
                  return (
                    <button
                      key={idx}
                      onClick={() => scrollToHeading(item.id)}
                      className={`w-full text-left p-3 rounded-xl transition-all flex items-start gap-2.5 group relative cursor-pointer ${
                        isActive
                          ? 'bg-primary/5 text-primary border-l-4 border-primary pl-2 font-bold'
                          : 'hover:bg-bg-secondary text-text-secondary border-l-4 border-transparent hover:text-text-primary'
                      } ${item.level === 'h3' ? 'pl-6 text-xs' : 'text-sm'}`}
                    >
                      {item.level === 'h2' ? (
                        <Hash className={`w-4 h-4 mt-0.5 shrink-0 ${isActive ? 'text-primary' : 'text-text-tertiary/60'}`} />
                      ) : (
                        <ChevronRight className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${isActive ? 'text-primary' : 'text-text-tertiary/60'}`} />
                      )}
                      <span className="leading-tight break-words">{item.text}</span>
                    </button>
                  );
                })}
              </div>

              {/* Footer / Quick Actions */}
              <div className="p-6 border-t border-border bg-bg-secondary/40 flex justify-between items-center">
                <button
                  onClick={scrollToTop}
                  className="text-xs font-bold text-primary hover:text-primary-dark transition-colors uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowUp className="w-3.5 h-3.5" /> Back to Top
                </button>
                <span className="text-[10px] font-mono text-text-tertiary">
                  Homeopathic Clinician Guide
                </span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
