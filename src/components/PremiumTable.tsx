import React from 'react';

interface PremiumTableProps {
  headers: string[];
  data: (string | React.ReactNode)[][];
  className?: string;
  headerAligns?: ('left' | 'center' | 'right')[];
}

export default function PremiumTable({ headers, data, className = '', headerAligns }: PremiumTableProps) {
  return (
    <div className={`overflow-x-auto w-full my-6 rounded-2xl border border-border bg-white shadow-soft ${className}`}>
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-bg-secondary border-b border-border">
            {headers.map((header, idx) => {
              const align = headerAligns?.[idx] || 'left';
              const alignClass = align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : 'text-left';
              return (
                <th
                  key={idx}
                  className={`p-4 font-display font-semibold text-text-primary text-xs uppercase tracking-wider ${alignClass}`}
                >
                  {header}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIdx) => (
            <tr
              key={rowIdx}
              className={`border-b border-border transition-colors hover:bg-primary/5 ${
                rowIdx % 2 === 0 ? 'bg-white' : 'bg-bg-secondary/30'
              }`}
            >
              {row.map((cell, cellIdx) => {
                const align = headerAligns?.[cellIdx] || 'left';
                const alignClass = align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : 'text-left';
                return (
                  <td
                    key={cellIdx}
                    className={`p-4 text-text-secondary ${alignClass}`}
                  >
                    {cell}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
