import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Layers, Lightbulb, CheckCircle2 } from 'lucide-react';

export type ContentBlock = 
  | { type: 'paragraph'; text: string }
  | { type: 'bulletList'; items: string[]; title?: string }
  | { type: 'flowchart'; steps: string[]; title: string }
  | { type: 'table'; title: string; headers: string[]; rows: string[][] }
  | { type: 'mnemonic'; title: string; phrase: string; explanation?: string }
  | { type: 'examTip'; text: string; priority: 'Low' | 'Medium' | 'High' }
  | { type: 'heading'; text: string; level: 2 | 3 | 4 };

interface ContentBlocksProps {
  blocks: ContentBlock[];
}

export const ContentBlocks: React.FC<ContentBlocksProps> = ({ blocks }) => {
  return (
    <div className="space-y-8">
      {blocks.map((block, idx) => {
        switch (block.type) {
          case 'paragraph':
            return (
              <div key={idx} className="markdown-body text-sm leading-relaxed text-text-secondary">
                <ReactMarkdown>{block.text}</ReactMarkdown>
              </div>
            );
          
          case 'bulletList':
            return (
              <div key={idx} className="space-y-3">
                {block.title && <h4 className="text-sm font-bold text-text-primary">{block.title}</h4>}
                <ul className="space-y-2">
                  {block.items.map((item, iIdx) => (
                    <li key={iIdx} className="flex gap-3 text-sm text-text-secondary leading-relaxed">
                      <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                      <ReactMarkdown>{item}</ReactMarkdown>
                    </li>
                  ))}
                </ul>
              </div>
            );

          case 'heading':
            const HeadingTag = `h${block.level}` as 'h2' | 'h3' | 'h4';
            return (
              <HeadingTag key={idx} className={`font-display font-bold text-text-primary ${
                block.level === 2 ? 'text-2xl mt-8 mb-4' : 
                block.level === 3 ? 'text-xl mt-6 mb-3' : 'text-lg mt-4 mb-2'
              }`}>
                {block.text}
              </HeadingTag>
            );

          case 'flowchart':
            return (
              <div key={idx} className="space-y-4">
                <h4 className="text-sm font-bold text-text-primary flex items-center gap-2">
                  <Layers className="w-4 h-4 text-primary" />
                  {block.title}
                </h4>
                <div className="p-6 bg-primary/5 border border-primary/10 rounded-3xl space-y-4 relative overflow-hidden">
                  {block.steps.map((step, sIdx) => (
                    <div key={sIdx} className="flex flex-col items-center gap-3 relative z-10">
                      <div className="px-5 py-3 bg-white dark:bg-zinc-900 border border-border/60 rounded-xl text-xs font-bold text-text-primary shadow-soft text-center w-full max-w-md">
                        {step}
                      </div>
                      {sIdx < block.steps.length - 1 && (
                        <div className="w-0.5 h-6 bg-gradient-to-b from-primary/40 to-transparent" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );

          case 'table':
            return (
              <div key={idx} className="space-y-4">
                <h4 className="text-sm font-bold text-text-primary">{block.title}</h4>
                <div className="overflow-x-auto rounded-2xl border border-border/60">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="bg-bg-secondary border-b border-border/60">
                        {block.headers.map((header, hIdx) => (
                          <th key={hIdx} className="px-4 py-3 text-left font-black text-text-tertiary uppercase tracking-widest">
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/40">
                      {block.rows.map((row, rIdx) => (
                        <tr key={rIdx} className="hover:bg-primary/5 transition-colors">
                          {row.map((cell, cIdx) => (
                            <td key={cIdx} className="px-4 py-3 text-text-secondary font-medium">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            );

          case 'mnemonic':
            return (
              <div key={idx} className="p-6 bg-gradient-to-br from-indigo-50 to-indigo-100/50 dark:from-indigo-950/40 dark:to-indigo-900/20 border border-indigo-200/60 dark:border-indigo-800/50 rounded-3xl space-y-4 shadow-soft-xs">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-indigo-500 rounded-lg">
                    <Lightbulb className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-widest text-indigo-900 dark:text-indigo-300">Mnemonic Aid</h4>
                    <p className="text-sm font-bold text-indigo-700 dark:text-indigo-400">{block.title}</p>
                  </div>
                </div>
                <div className="p-4 bg-white/80 dark:bg-zinc-900/60 rounded-2xl border border-indigo-100 dark:border-indigo-800/40">
                  <p className="text-xl font-display font-black text-indigo-600 dark:text-indigo-400 tracking-tight text-center italic">
                    "{block.phrase}"
                  </p>
                  {block.explanation && (
                    <p className="mt-3 text-xs text-indigo-900/70 dark:text-indigo-300/60 text-center leading-relaxed">
                      {block.explanation}
                    </p>
                  )}
                </div>
              </div>
            );

          case 'examTip':
            return (
              <div key={idx} className={`p-5 rounded-2xl flex items-start gap-4 border ${
                block.priority === 'High' ? 'bg-rose-50 border-rose-200 dark:bg-rose-950/20 dark:border-rose-800/40' :
                block.priority === 'Medium' ? 'bg-amber-50 border-amber-200 dark:bg-amber-950/20 dark:border-amber-800/40' :
                'bg-blue-50 border-blue-200 dark:bg-blue-950/20 dark:border-blue-800/40'
              }`}>
                <div className={`shrink-0 p-2 rounded-lg ${
                  block.priority === 'High' ? 'bg-rose-500' :
                  block.priority === 'Medium' ? 'bg-amber-500' : 'bg-blue-500'
                }`}>
                  <CheckCircle2 className="w-4 h-4 text-white" />
                </div>
                <div className="space-y-1">
                  <span className={`text-[10px] font-black uppercase tracking-widest ${
                    block.priority === 'High' ? 'text-rose-600 dark:text-rose-400' :
                    block.priority === 'Medium' ? 'text-amber-600 dark:text-amber-400' : 'text-blue-600 dark:text-blue-400'
                  }`}>
                    {block.priority} Priority Exam Tip
                  </span>
                  <p className={`text-sm font-bold ${
                    block.priority === 'High' ? 'text-rose-950 dark:text-rose-100' :
                    block.priority === 'Medium' ? 'text-amber-950 dark:text-amber-100' : 'text-blue-950 dark:text-blue-100'
                  }`}>
                    {block.text}
                  </p>
                </div>
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
};
