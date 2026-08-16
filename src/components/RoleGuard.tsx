import React from 'react';
import { ShieldAlert, Sparkles } from 'lucide-react';
import { useRole, UserRole } from '../context/RoleContext';
import ProfileSwitch from './ProfileSwitch';

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
  fallback?: React.ReactNode;
}

export default function RoleGuard({ children, allowedRoles, fallback }: RoleGuardProps) {
  const { currentRole, hasAccess } = useRole();

  if (hasAccess(allowedRoles)) {
    return <>{children}</>;
  }

  if (fallback) {
    return <>{fallback}</>;
  }

  return (
    <div className="p-8 sm:p-12 bg-white dark:bg-zinc-900 border border-red-100 dark:border-red-950/30 rounded-[2.5rem] shadow-soft max-w-2xl mx-auto my-8 text-center space-y-6">
      <div className="w-16 h-16 bg-red-50 dark:bg-red-950/20 rounded-full flex items-center justify-center mx-auto text-red-500 border border-red-100 dark:border-red-900/30">
        <ShieldAlert className="w-8 h-8" />
      </div>
      
      <div className="space-y-2">
        <span className="mednix-section-subtitle mx-auto text-red-600 dark:text-red-400">
          <Sparkles className="w-3.5 h-3.5" /> Access Restricted
        </span>
        <h3 className="text-2xl font-display font-semibold text-text-primary">
          Role-Restricted Module
        </h3>
        <p className="text-xs sm:text-sm text-text-secondary max-w-md mx-auto leading-relaxed">
          The module you are trying to access is optimized for <strong className="text-primary">{allowedRoles.join(', ')}</strong> profiles. Your current active profile is <strong className="text-accent">{currentRole}</strong>.
        </p>
      </div>

      <div className="p-4.5 bg-bg-secondary dark:bg-zinc-800/40 rounded-2xl border border-border dark:border-zinc-850 text-[11px] leading-relaxed text-text-tertiary font-sans max-w-md mx-auto italic">
        Clinical Totality and Exam Preparation features require authentic roles to ensure medical curriculum alignment.
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
        <span className="text-xs text-text-secondary font-bold">Personalize your profile instantly:</span>
        <ProfileSwitch />
      </div>
    </div>
  );
}
