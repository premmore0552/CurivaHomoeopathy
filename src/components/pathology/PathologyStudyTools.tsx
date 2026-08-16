import React from 'react';
import { 
  BookMarked, 
  Layers, 
  ListTree, 
  GitBranch, 
  Stethoscope, 
  Sparkles, 
  Zap, 
  ArrowRight 
} from 'lucide-react';
import { PathologyStudyTool } from '../../types/pathology';

interface PathologyStudyToolsProps {
  tools: PathologyStudyTool[];
  onSelectTool: (tool: PathologyStudyTool) => void;
}

const iconMap: Record<string, any> = {
  BookMarked,
  Layers,
  ListTree,
  GitBranch,
  Stethoscope,
  Sparkles,
  Zap,
};

export const PathologyStudyTools: React.FC<PathologyStudyToolsProps> = ({
  tools,
  onSelectTool,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-serif font-bold text-text-primary">Pathology Study Tools</h2>
          <p className="text-xs text-text-secondary">Reusable high-yield revision matrices, classification trees, and mechanisms</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {tools.map((tool) => {
          const Icon = iconMap[tool.iconName] || BookMarked;
          return (
            <div
              key={tool.id}
              onClick={() => onSelectTool(tool)}
              className="bg-bg-secondary border border-border rounded-3xl p-5 hover:border-red-500/40 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="p-3 bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 rounded-2xl">
                    <Icon className="w-5 h-5" />
                  </div>
                  {tool.badge && (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20">
                      {tool.badge}
                    </span>
                  )}
                </div>
                <h3 className="text-base font-serif font-bold text-text-primary group-hover:text-red-700 dark:group-hover:text-red-400 transition-colors">
                  {tool.title}
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed line-clamp-3">
                  {tool.description}
                </p>
              </div>

              <div className="pt-3 border-t border-border/60 flex items-center justify-between text-xs font-bold text-primary group-hover:text-red-700 dark:group-hover:text-red-400">
                <span>Open Tool</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
