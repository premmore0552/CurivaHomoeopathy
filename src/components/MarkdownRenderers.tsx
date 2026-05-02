import React from 'react';
import ModalityPill from './ModalityPill';

// Recursively extracts text from a React node tree
function extractText(node: React.ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') {
    return String(node);
  }
  if (Array.isArray(node)) {
    return node.map(extractText).join('');
  }
  if (React.isValidElement(node)) {
    const children = (node.props as { children?: React.ReactNode }).children;
    if (children) {
      return extractText(children);
    }
  }
  return '';
}

// Function to highlight modality keywords within text
export function highlightModalities(node: React.ReactNode): React.ReactNode {
  if (typeof node !== 'string') {
    if (Array.isArray(node)) {
      return node.map((child, i) => <React.Fragment key={i}>{highlightModalities(child)}</React.Fragment>);
    }
    if (React.isValidElement(node)) {
      const children = (node.props as any).children;
      if (children) {
        return React.cloneElement(node as React.ReactElement<{ children?: React.ReactNode }>, {
          children: highlightModalities(children)
        });
      }
    }
    return node;
  }

  const patterns = [
    { regex: /\b(worse|aggravation|agg\.|aggravating)\b/gi, type: 'worse' as const },
    { regex: /\b(better|amelioration|amel\.|ameliorating)\b/gi, type: 'better' as const },
    { regex: /\b(ailments from|ailment from)\b/gi, type: 'ailment' as const }
  ];

  let parts: (string | React.ReactNode)[] = [node];

  patterns.forEach(pattern => {
    const newParts: (string | React.ReactNode)[] = [];
    parts.forEach(part => {
      if (typeof part !== 'string') {
        newParts.push(part);
        return;
      }

      const splitParts = part.split(pattern.regex);
      const matches = part.match(pattern.regex);

      if (matches) {
        splitParts.forEach((s, i) => {
          newParts.push(s);
          if (i < matches.length) {
            newParts.push(
              <ModalityPill key={`${pattern.type}-${i}-${s}`} type={pattern.type} className="mx-1 py-0 px-2 text-[10px] transform -translate-y-[1px]">
                {matches[i]}
              </ModalityPill>
            );
          }
        });
      } else {
        newParts.push(part);
      }
    });
    parts = newParts;
  });

  return <>{parts}</>;
}

export const MarkdownComponents = {
  li: ({ node, children, ...props }: any) => {
    const textContent = extractText(children).toLowerCase().trim();

    const isWorse = textContent.startsWith('worse:') || 
                    textContent.startsWith('worse with') || 
                    textContent.startsWith('worse from') || 
                    textContent.startsWith('aggravation:') ||
                    textContent.startsWith('agg:');

    if (isWorse) {
      return (
        <li {...props} className="pl-4 border-l-4 border-[#991B1B] dark:border-[#7F1D1D] my-6 list-none bg-[#FEE2E2]/40 dark:bg-[#7F1D1D]/20 py-3 pr-4 rounded-r-xl">
          <ModalityPill type="worse" className="mb-2 block w-fit">Worse / Aggravation</ModalityPill>
          <span className="block mt-1 text-text-primary">{children}</span>
        </li>
      );
    }

    const isBetter = textContent.startsWith('better:') || 
                     textContent.startsWith('better with') || 
                     textContent.startsWith('better from') || 
                     textContent.startsWith('better by') || 
                     textContent.startsWith('amelioration:') ||
                     textContent.startsWith('amel:');

    if (isBetter) {
      return (
        <li {...props} className="pl-4 border-l-4 border-[#166534] dark:border-[#14532D] my-6 list-none bg-[#DCFCE7]/40 dark:bg-[#14532D]/20 py-3 pr-4 rounded-r-xl">
          <ModalityPill type="better" className="mb-2 block w-fit">Better / Amelioration</ModalityPill>
          <span className="block mt-1 text-text-primary">{children}</span>
        </li>
      );
    }

    const isAilment = textContent.startsWith('ailments from') || 
                      textContent.startsWith('ailment from');

    if (isAilment) {
      return (
        <li {...props} className="pl-4 border-l-4 border-[#854D0E] dark:border-[#713F12] my-6 list-none bg-[#FEF9C3]/40 dark:bg-[#713F12]/20 py-3 pr-4 rounded-r-xl">
          <ModalityPill type="ailment" className="mb-2 block w-fit">Ailments From</ModalityPill>
          <span className="block mt-1 text-text-primary">{children}</span>
        </li>
      );
    }

    return <li {...props}>{highlightModalities(children)}</li>;
  },
  p: ({ node, children, ...props }: any) => {
    const textContent = extractText(children).toLowerCase().trim();

    const isWorse = textContent.startsWith('worse:') || 
                    textContent.startsWith('worse with') || 
                    textContent.startsWith('worse from') || 
                    textContent.startsWith('aggravation:') ||
                    textContent.startsWith('agg:');

    if (isWorse && textContent.length < 200) {
      return (
        <p {...props} className="pl-4 border-l-4 border-[#991B1B] dark:border-[#7F1D1D] my-6 bg-[#FEE2E2]/40 dark:bg-[#7F1D1D]/20 py-3 pr-4 rounded-r-xl">
          <ModalityPill type="worse" className="mb-2 block w-fit">Worse / Aggravation</ModalityPill>
          <span className="block mt-1 text-text-primary">{highlightModalities(children)}</span>
        </p>
      );
    }

    const isBetter = textContent.startsWith('better:') || 
                     textContent.startsWith('better with') || 
                     textContent.startsWith('better from') || 
                     textContent.startsWith('better by') || 
                     textContent.startsWith('amelioration:') ||
                     textContent.startsWith('amel:');

    if (isBetter && textContent.length < 200) {
      return (
        <p {...props} className="pl-4 border-l-4 border-[#166534] dark:border-[#14532D] my-6 bg-[#DCFCE7]/40 dark:bg-[#14532D]/20 py-3 pr-4 rounded-r-xl">
          <ModalityPill type="better" className="mb-2 block w-fit">Better / Amelioration</ModalityPill>
          <span className="block mt-1 text-text-primary">{highlightModalities(children)}</span>
        </p>
      );
    }

    const isAilment = textContent.startsWith('ailments from') || 
                      textContent.startsWith('ailment from');

    if (isAilment && textContent.length < 200) {
      return (
        <p {...props} className="pl-4 border-l-4 border-[#854D0E] dark:border-[#713F12] my-6 bg-[#FEF9C3]/40 dark:bg-[#713F12]/20 py-3 pr-4 rounded-r-xl">
          <ModalityPill type="ailment" className="mb-2 block w-fit">Ailments From</ModalityPill>
          <span className="block mt-1 text-text-primary">{highlightModalities(children)}</span>
        </p>
      );
    }

    return <p {...props}>{highlightModalities(children)}</p>;
  },
  h1: ({ children }: any) => {
    const id = extractText(children).toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
    return <h1 id={id} className="scroll-mt-32">{children}</h1>;
  },
  h2: ({ children }: any) => {
    const id = extractText(children).toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
    return <h2 id={id} className="scroll-mt-32">{children}</h2>;
  },
  h3: ({ children }: any) => {
    const id = extractText(children).toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
    return <h3 id={id} className="scroll-mt-32">{children}</h3>;
  }
};
