import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
}

const Logo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  const sizes = {
    xs: 'h-8',
    sm: 'h-10',
    md: 'h-16',
    lg: 'h-24'
  };

  return (
    <div className={`flex items-center gap-4 text-primary dark:text-white ${sizes[size]} ${className}`}>
      {/* Company Logo */}
      <img 
        src="/regenerated_image_1777318789296.png" 
        alt="Curiva" 
        className="h-full w-auto object-contain transition-transform group-hover:scale-110"
        onError={(e) => {
          // Fallback to placeholder if image is not found
          (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=Curiva&background=16A34A&color=fff&rounded=true`;
        }}
      />
      {size !== 'xs' && (
        <div className="flex flex-col leading-none">
          <span className="text-xl md:text-2xl font-display font-medium text-text-primary tracking-tight uppercase italic">
            Curiva<span className="text-accent not-italic">.</span>
          </span>
          <span className="text-[7px] font-bold uppercase tracking-[0.4em] opacity-60 text-text-secondary whitespace-nowrap">Clinical Excellence</span>
        </div>
      )}
    </div>
  );
};

export default Logo;
