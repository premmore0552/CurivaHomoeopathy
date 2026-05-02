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
    <div className={`flex items-center gap-3 text-primary dark:text-white ${sizes[size]} ${className}`}>
      {/* Company Logo */}
      <img 
        src="/regenerated_image_1777318789296.png" 
        alt="Curiva Homoeopathy Logo" 
        className="h-full w-auto object-contain"
        onError={(e) => {
          // Fallback to placeholder if image is not found
          (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=Curiva&background=ba1173&color=fff&rounded=true`;
        }}
      />
    </div>
  );
};

export default Logo;
