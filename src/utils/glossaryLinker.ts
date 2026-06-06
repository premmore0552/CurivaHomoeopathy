import { glossaryData } from '../data/glossaryData';

/**
 * Sweeps a blog post's content and injects markdown links for matching
 * glossary terms. To maintain professional layouts and avoid spamming,
 * only the FIRST occurrence of any given term is converted into a link.
 */
export function injectGlossaryLinks(content: string): string {
  if (!content) return content;
  
  let linkedContent = content;
  
  // Sort terms by length (descending) so longer phrases are matched before shorter substrings
  const sortedGlossary = [...glossaryData].sort((a, b) => b.term.length - a.term.length);
  
  sortedGlossary.forEach(item => {
    // Avoid double-linking or messing up existing markdown links like [Arnica](/remedy/arnica-montana)
    // We use a regular expression with word boundaries.
    const termPattern = new RegExp(`\\b(${item.term})\\b`, 'i');
    
    // Match first occurrence only
    const match = linkedContent.match(termPattern);
    if (match && match.index !== undefined) {
      const foundTerm = match[0];
      const index = match.index;
      
      // Basic sanity check to ensure the match isn't within a markdown link format $[name](href)$
      // We check if it is preceded by "[" or followed by "]" or "(" or ")" in close proximity
      const head = linkedContent.substring(0, index);
      const tail = linkedContent.substring(index + foundTerm.length);
      
      const inLink = /\[[^\]]*$/.test(head) || /^\s*\]/.test(tail) || /^\s*\([^)]*\)/.test(tail);
      
      if (!inLink) {
        linkedContent = head + `[${foundTerm}](/glossary?tab=glossary#${item.id})` + tail;
      }
    }
  });
  
  return linkedContent;
}
