import React, { useState } from 'react';
import { Sparkles, ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useRole, UserRole } from '../context/RoleContext';

export default function ProfileSwitch() {
  const { currentRole, setCurrentRole, authorizedRoles } = useRole();
  const [isOpen, setIsOpen] = useState(false);

  // Group roles for visual elegance
  const roleGroups = [
    {
      title: "Public & Guest",
      roles: ["Guest", "Public"] as UserRole[]
    },
    {
      title: "Academic & Training",
      roles: ["BHMS Student", "Intern", "Faculty"] as UserRole[]
    },
    {
      title: "Clinical & Advanced",
      roles: ["Practitioner", "Researcher", "Administrator"] as UserRole[]
    }
  ];

  return (
    <div className="relative font-sans text-xs">
      <button
        id="profile-switch-btn"
        onClick={() => setIsOpen(!isOpen)}
        className="h-10 px-4.5 bg-bg-secondary dark:bg-zinc-800 hover:bg-white dark:hover:bg-zinc-750 text-text-primary border border-border dark:border-zinc-700 hover:border-primary/50 rounded-full font-bold flex items-center gap-2 transition-all shadow-sm cursor-pointer whitespace-nowrap active:scale-[0.98]"
      >
        <Sparkles className="w-3.5 h-3.5 text-accent shrink-0 animate-pulse" />
        <span>{currentRole}</span>
        <ChevronDown className={`w-3 h-3 opacity-60 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-[80]" onClick={() => setIsOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute right-0 mt-2.5 w-64 bg-white dark:bg-zinc-900 border border-border dark:border-zinc-800 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] p-2 z-[90] text-left overflow-hidden"
            >
              <div className="px-3 py-1.5 border-b border-border/50 dark:border-zinc-800/50 text-[9px] font-black uppercase text-text-tertiary tracking-wider mb-1.5">
                Switch Active Profile
              </div>
              
              <div className="space-y-3 max-h-[280px] overflow-y-auto no-scrollbar py-1">
                {roleGroups.map((group, gIdx) => {
                  // Filter group roles to only show authorized ones
                  const availableGroupRoles = group.roles.filter(r => authorizedRoles.includes(r));
                  if (availableGroupRoles.length === 0) return null;

                  return (
                    <div key={gIdx} className="space-y-1">
                      <div className="px-3 text-[8px] font-bold uppercase tracking-widest text-text-tertiary opacity-70">
                        {group.title}
                      </div>
                      <div className="space-y-0.5">
                        {availableGroupRoles.map((role) => (
                          <button
                            key={role}
                            onClick={() => {
                              setCurrentRole(role);
                              setIsOpen(false);
                            }}
                            className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                              currentRole === role 
                                ? 'bg-primary/5 text-primary dark:bg-primary/10 border border-primary/10 dark:border-primary/20' 
                                : 'text-text-secondary hover:text-primary hover:bg-bg-secondary dark:hover:bg-zinc-800 border border-transparent'
                            }`}
                          >
                            <span>{role}</span>
                            {currentRole === role && <Check className="w-3.5 h-3.5 text-primary" />}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
