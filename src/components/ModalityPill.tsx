import React from 'react';

type ModalityType = 'worse' | 'better' | 'ailment' | 'neutral';

interface ModalityPillProps {
  type: ModalityType;
  children: React.ReactNode;
  className?: string;
}

export default function ModalityPill({ type, children, className = '' }: ModalityPillProps) {
  let colorClasses = '';
  
  switch (type) {
    case 'worse':
      colorClasses = 'bg-[#FEE2E2] text-[#991B1B] dark:bg-[#7F1D1D] dark:text-[#FEE2E2] border border-[#991B1B]/20 dark:border-[#FEE2E2]/20 hover:bg-[#FCA5A5] dark:hover:bg-[#991B1B]';
      break;
    case 'better':
      colorClasses = 'bg-[#DCFCE7] text-[#166534] dark:bg-[#14532D] dark:text-[#DCFCE7] border border-[#166534]/20 dark:border-[#DCFCE7]/20 hover:bg-[#BBF7D0] dark:hover:bg-[#166534]';
      break;
    case 'ailment':
      colorClasses = 'bg-[#FEF9C3] text-[#854D0E] dark:bg-[#713F12] dark:text-[#FEF9C3] border border-[#854D0E]/20 dark:border-[#FEF9C3]/20 hover:bg-[#FEF08A] dark:hover:bg-[#854D0E]';
      break;
    default:
      colorClasses = 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700';
  }

  return (
    <span 
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs md:text-sm font-semibold transition-all select-none ${colorClasses} ${className}`}
    >
      {children}
    </span>
  );
}
