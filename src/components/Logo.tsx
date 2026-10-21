import React, { useState } from 'react';

interface LogoProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  showText?: boolean;
  style?: React.CSSProperties;
}

const Logo: React.FC<LogoProps> = ({ className = '', size = 'md', showText = true, style }) => {
  const [imgError, setImgError] = useState(false);

  const containerHeights = {
    xs: 'h-8',
    sm: 'h-10',
    md: 'h-14',
    lg: 'h-20'
  };

  const badgeSizes = {
    xs: 'w-7 h-7',
    sm: 'w-9 h-9',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  return (
    <div 
      className={`flex items-center gap-2.5 text-primary dark:text-white ${containerHeights[size]} ${className}`}
      style={style}
    >
      {/* Permanent Emblem Badge (SVG / Image with fallback) */}
      <div className={`relative flex items-center justify-center rounded-xl bg-gradient-to-br from-primary via-primary/95 to-primary-dark text-white p-1.5 shadow-md shadow-primary/20 shrink-0 ${badgeSizes[size]}`}>
        {!imgError ? (
          <img 
            src="/curiva_logo.svg" 
            alt="Curiva Homoeopathy logo"
            onError={() => setImgError(true)}
            className="w-full h-full object-contain rounded-lg" 
          />
        ) : (
          /* High Precision Vector Caduceus Symbol */
          <svg viewBox="0 0 100 100" className="w-full h-full text-white fill-current">
            <circle cx="50" cy="18" r="5.5" />
            <rect x="48" y="23" width="4" height="60" rx="2" />
            <path d="M 50,30 C 25,12 10,25 8,40 C 25,38 40,32 50,38 M 50,30 C 75,12 90,25 92,40 C 75,38 60,32 50,38" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M 50,75 C 22,65 22,50 50,42 C 78,34 78,25 50,20 M 50,75 C 78,65 78,50 50,42 C 22,34 22,25 50,20" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          </svg>
        )}
      </div>

      {showText && size !== 'xs' && (
        <div className="flex flex-col items-start justify-center leading-none select-none">
          <span 
            className="font-serif font-bold text-primary dark:text-emerald-400 tracking-tight"
            style={{ 
              fontSize: size === 'lg' ? '26px' : size === 'sm' ? '17px' : '21px', 
              lineHeight: '1.05'
            }}
          >
            Curiva
          </span>
          <span 
            className="font-sans text-[9px] sm:text-[10px] font-black uppercase tracking-[0.22em] text-text-secondary dark:text-text-tertiary mt-0.5"
            style={{ lineHeight: '1.1' }}
          >
            Homoeopathy
          </span>
          {size === 'lg' && (
            <span 
              className="font-sans text-[8px] font-bold uppercase tracking-[0.18em] text-accent dark:text-amber-400 mt-1"
              style={{ lineHeight: '1' }}
            >
              TINY DOSES. TRUE SHIFTS.
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default Logo;
