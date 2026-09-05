import React from 'react';
import { Sparkles, Activity, Library, GraduationCap, Heart, ShieldCheck } from 'lucide-react';

interface IconDividerProps {
  icon?: 'sparkles' | 'activity' | 'library' | 'graduation' | 'heart' | 'shield';
  className?: string;
}

const IconDivider: React.FC<IconDividerProps> = ({ icon = 'sparkles', className = '' }) => {
  const renderIcon = () => {
    switch (icon) {
      case 'activity': return <Activity className="w-5 h-5" />;
      case 'library': return <Library className="w-5 h-5" />;
      case 'graduation': return <GraduationCap className="w-5 h-5" />;
      case 'heart': return <Heart className="w-5 h-5" />;
      case 'shield': return <ShieldCheck className="w-5 h-5" />;
      default: return <Sparkles className="w-5 h-5" />;
    }
  };

  return (
    <div className={`relative py-12 flex items-center justify-center ${className}`}>
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t border-border shadow-[0_1px_2px_rgba(0,0,0,0.05)]" />
      </div>
      <div className="relative flex justify-center">
        <div className="bg-bg-primary px-4 text-primary">
          <div className="p-3 rounded-full border border-border bg-bg-secondary shadow-sm text-primary">
            {renderIcon()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IconDivider;
