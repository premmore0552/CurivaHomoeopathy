import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Cpu, 
  GraduationCap, 
  Globe, 
  Activity, 
  BookOpen, 
  Terminal, 
  Sliders, 
  RefreshCw, 
  FileText, 
  CheckCircle2, 
  ArrowRight, 
  Search, 
  Bookmark, 
  TrendingUp, 
  Compass,
  AlertCircle
} from 'lucide-react';
import { 
  getPersonalizedView, 
  PersonalizationResult, 
  BrowserTab, 
  PRESET_SIMULATED_TABS 
} from '../services/personalizationService';

export default function PersonalizationControlCenter() {
  const [selectedRole, setSelectedRole] = useState<'Guest' | 'Public' | 'BHMS Student' | 'Intern' | 'Practitioner' | 'Faculty' | 'Researcher' | 'Administrator'>('BHMS Student');
  const [simulatedTabs, setSimulatedTabs] = useState<BrowserTab[]>(PRESET_SIMULATED_TABS.student);
  const [isAiMode, setIsAiMode] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<PersonalizationResult | null>(null);
  const [userQuery, setUserQuery] = useState<string>('');
  const [showConfig, setShowConfig] = useState<boolean>(false);

  // Sync simulated tabs when role changes
  useEffect(() => {
    const key = selectedRole.toLowerCase().includes('intern') ? 'intern' :
                selectedRole.toLowerCase().includes('practitioner') ? 'practitioner' :
                selectedRole.toLowerCase().includes('public') || selectedRole.toLowerCase().includes('guest') ? 'public' : 'student';
    setSimulatedTabs(PRESET_SIMULATED_TABS[key] || PRESET_SIMULATED_TABS.student);
  }, [selectedRole]);

  // Fetch personalized configuration
  const fetchPersonalization = async () => {
    setIsLoading(true);
    try {
      const data = await getPersonalizedView({
        role: selectedRole,
        tabs: simulatedTabs,
        userQuery: userQuery.trim() || undefined
      });
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPersonalization();
  }, [selectedRole]);

  // Handle active tab change
  const handleToggleCurrentTab = (index: number) => {
    const updated = simulatedTabs.map((tab, idx) => ({
      ...tab,
      isCurrent: idx === index
    }));
    setSimulatedTabs(updated);
  };

  // Handle title edit
  const handleEditTitle = (index: number, newTitle: string) => {
    const updated = [...simulatedTabs];
    updated[index].pageTitle = newTitle;
    setSimulatedTabs(updated);
  };

  // Get visual styling based on role/tone
  const getToneBadgeStyle = (tone: string) => {
    switch (tone) {
      case 'academic':
        return 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-900/50';
      case 'clinical':
        return 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-900/50';
      case 'simple':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-900/50';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'student':
        return <GraduationCap className="w-5 h-5 text-blue-600" />;
      case 'intern':
        return <Activity className="w-5 h-5 text-purple-600" />;
      case 'practitioner':
        return <Cpu className="w-5 h-5 text-indigo-600" />;
      case 'public':
        return <Globe className="w-5 h-5 text-emerald-600" />;
      default:
        return <Compass className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-950 border border-border/80 rounded-2xl shadow-soft p-6 md:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Top Header Controls */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-border/60 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-accent/10 rounded-lg text-accent">
              <Sliders className="w-4 h-4" />
            </span>
            <span className="text-[10px] font-black uppercase tracking-widest text-accent">Curiva Personalization Engine</span>
          </div>
          <h2 className="text-2xl font-display font-semibold text-primary mt-1">Contextual Dashboard Optimizer</h2>
          <p className="text-xs text-text-tertiary mt-0.5">Adapt modules, search weights, and study lists based on user role and browser tabs.</p>
        </div>

        {/* Action controls */}
        <div className="flex flex-wrap items-center gap-3">
          <button 
            onClick={() => setShowConfig(!showConfig)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-bg-secondary text-xs font-semibold text-text-primary hover:bg-border/30 transition-all"
          >
            <Terminal className="w-3.5 h-3.5 text-text-tertiary" /> 
            {showConfig ? 'Hide API Data' : 'Inspect API Data'}
          </button>
          
          <button 
            onClick={fetchPersonalization}
            disabled={isLoading}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-primary text-white text-xs font-bold hover:opacity-90 disabled:opacity-50 transition-all"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            Run Optimization
          </button>
        </div>
      </div>

      {/* Grid: Simulator Controls Left, Personalized Output Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Context Simulator Controls */}
        <div className="lg:col-span-5 space-y-6 bg-bg-secondary/40 border border-border/40 p-5 rounded-xl">
          <h3 className="text-sm font-bold uppercase tracking-wider text-primary border-b border-border/50 pb-2">
            1. Simulation Inputs
          </h3>

          {/* Active Role Selector */}
          <div className="space-y-3">
            <label className="block text-xs font-bold text-text-secondary uppercase tracking-widest">Select User Role</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'Guest', label: 'Guest Sandbox' },
                { id: 'Public', label: 'Public Reader' },
                { id: 'BHMS Student', label: 'BHMS Student' },
                { id: 'Intern', label: 'Clinical Intern' },
                { id: 'Practitioner', label: 'Practitioner' },
                { id: 'Faculty', label: 'Academic Faculty' },
                { id: 'Researcher', label: 'Researcher' },
                { id: 'Administrator', label: 'Administrator' }
              ].map(role => (
                <button
                  key={role.id}
                  onClick={() => setSelectedRole(role.id as any)}
                  className={`px-3 py-2.5 rounded-lg border text-xs font-semibold text-left transition-all ${
                    selectedRole === role.id 
                      ? 'bg-white dark:bg-gray-900 border-primary shadow-sm text-primary font-bold' 
                      : 'border-border bg-white/40 text-text-secondary hover:bg-white/80'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {getRoleIcon(role.id)}
                    <span>{role.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Simulated Browser Tabs Context */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-text-secondary uppercase tracking-widest">
                Browser Session Tabs Context
              </label>
              <span className="text-[10px] bg-accent/10 text-accent font-bold px-2 py-0.5 rounded-full">
                {simulatedTabs.length} Tabs Open
              </span>
            </div>
            <p className="text-[11px] text-text-tertiary">
              Below represents the active tabs in the user's browser (e.g. <code>edge_all_open_tabs</code>). Edit titles or toggle the active tab to simulate real browsing changes!
            </p>

            <div className="space-y-3">
              {simulatedTabs.map((tab, idx) => (
                <div 
                  key={tab.tabId} 
                  className={`p-3 rounded-lg border transition-all ${
                    tab.isCurrent 
                      ? 'bg-white dark:bg-gray-900 border-accent/40 shadow-sm' 
                      : 'bg-white/30 border-border'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] text-text-tertiary font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-border" />
                      Tab ID: {tab.tabId}
                    </span>
                    <button 
                      onClick={() => handleToggleCurrentTab(idx)}
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md border transition-all ${
                        tab.isCurrent 
                          ? 'bg-accent text-white border-accent' 
                          : 'bg-white hover:bg-gray-50 border-border text-text-secondary'
                      }`}
                    >
                      {tab.isCurrent ? 'Active Tab' : 'Set Active'}
                    </button>
                  </div>

                  <input 
                    type="text" 
                    value={tab.pageTitle}
                    onChange={(e) => handleEditTitle(idx, e.target.value)}
                    className="w-full text-xs font-medium text-text-primary bg-bg-secondary px-2 py-1 rounded border border-border/50 focus:outline-none focus:border-accent"
                  />
                  
                  <span className="text-[10px] text-text-tertiary block mt-1 truncate max-w-xs">
                    {tab.pageUrl}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Explicit User Request / Search query override */}
          <div className="space-y-2 pt-2">
            <label className="block text-xs font-bold text-text-secondary uppercase tracking-widest">
              Explicit Search / Intent Override
            </label>
            <div className="relative">
              <input 
                type="text"
                placeholder="Type a query to override context (e.g. 'anatomy exam prep')"
                value={userQuery}
                onChange={(e) => setUserQuery(e.target.value)}
                className="w-full text-xs px-3 py-2 pr-10 rounded-lg border border-border bg-white focus:outline-none focus:border-primary"
              />
              <Search className="absolute right-3 top-2.5 w-4 h-4 text-text-tertiary" />
            </div>
            <p className="text-[10px] text-text-tertiary italic">
              "Always prefer explicit queries over background tab context" — Security Constraint
            </p>
          </div>
        </div>

        {/* Right Column: Optimizer Output Dashboard */}
        <div className="lg:col-span-7 space-y-6">
          {isLoading ? (
            <div className="h-64 flex flex-col items-center justify-center space-y-3 bg-bg-secondary/20 rounded-xl border border-border/40">
              <RefreshCw className="w-8 h-8 text-primary animate-spin" />
              <p className="text-xs text-text-secondary">Consulting Curiva Personalization Engine...</p>
            </div>
          ) : result ? (
            <div className="space-y-6">
              
              {/* Active Persona Welcome Panel */}
              <div className="p-5 rounded-xl border border-border/80 bg-gradient-to-br from-bg-secondary/40 to-white dark:to-gray-900 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl" />
                
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/40 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 bg-primary/10 rounded-lg">
                      {getRoleIcon(result.role)}
                    </span>
                    <div>
                      <span className="text-[10px] uppercase font-black tracking-wider text-text-tertiary">Active Persona</span>
                      <h4 className="text-sm font-bold text-primary capitalize">{result.role} Mode</h4>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] text-text-tertiary">Tone Mapping:</span>
                    <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 border rounded-full ${getToneBadgeStyle(result.tone)}`}>
                      {result.tone}
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-xs font-semibold text-accent flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> Welcome back, {result.role === 'student' ? 'Learner' : result.role === 'public' ? 'Visitor' : 'Doctor'}!
                  </p>
                  <p className="text-xs text-text-secondary">
                    Your portal has been optimized with <strong>{result.tone}</strong> phrasing. 
                    {result.role === 'student' && ' Headings and vocabulary emphasize academic curriculum guidelines and BHMS exam requirements.'}
                    {result.role === 'intern' && ' Content focuses heavily on differential clinical values, laboratory analysis, and simulation case records.'}
                    {result.role === 'practitioner' && ' Tools emphasize expert comparative matrices, drug concordance networks, and chronic miasmatic analysis.'}
                    {result.role === 'public' && ' Demystifying explanations are rendered in everyday plain language, strictly free from professional jargon.'}
                  </p>
                </div>
              </div>

              {/* Dynamic Optimized Homepage Modules */}
              <div className="space-y-3">
                <h4 className="text-xs font-black uppercase tracking-widest text-text-tertiary flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5" /> Dynamic Workspace Modules
                </h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {result.modules.map(mod => (
                    <div 
                      key={mod.id} 
                      className="p-4 rounded-xl border border-border bg-white dark:bg-gray-900 hover:border-primary/40 hover:shadow-soft transition-all duration-300 flex flex-col justify-between space-y-3"
                    >
                      <div className="space-y-1">
                        <span className="text-[9px] uppercase font-bold text-accent tracking-widest">Optimized Component</span>
                        <h5 className="text-xs font-bold text-primary">{mod.title}</h5>
                        <p className="text-[11px] text-text-secondary leading-normal">{mod.desc}</p>
                      </div>
                      <Link 
                        to={mod.link}
                        className="w-fit flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-primary hover:text-accent transition-all"
                      >
                        {mod.cta} <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contextual Smart Recommendations */}
              <div className="space-y-3">
                <h4 className="text-xs font-black uppercase tracking-widest text-text-tertiary flex items-center gap-1.5">
                  <Bookmark className="w-3.5 h-3.5" /> Context-Aware Study Recommendations
                </h4>

                <div className="space-y-3">
                  {result.recommendations.map((rec, idx) => (
                    <div 
                      key={idx}
                      className="p-4 rounded-xl border border-border bg-white dark:bg-gray-900 hover:shadow-soft transition-all flex flex-col sm:flex-row items-start gap-4"
                    >
                      <div className="p-2 bg-accent/5 rounded-lg text-accent mt-0.5">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div className="space-y-1.5 flex-1">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h5 className="text-xs font-bold text-primary">{rec.title}</h5>
                          <Link 
                            to={rec.link}
                            className="text-[10px] font-black uppercase tracking-widest text-accent hover:underline flex items-center gap-0.5"
                          >
                            Launch <ArrowRight className="w-2.5 h-2.5" />
                          </Link>
                        </div>
                        <p className="text-[11px] text-text-secondary leading-normal">
                          {rec.snippet}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Personalized Autocomplete & Search Defaults */}
              <div className="space-y-3">
                <h4 className="text-xs font-black uppercase tracking-widest text-text-tertiary flex items-center gap-1.5">
                  <Search className="w-3.5 h-3.5" /> Contextual Search Suggestions
                </h4>
                <div className="flex flex-wrap gap-2">
                  {result.searchDefaults.map((query, idx) => (
                    <button 
                      key={idx}
                      onClick={() => {
                        // Pre-populate global search or query if available
                        const searchInput = document.getElementById('global-search-input') as HTMLInputElement;
                        if (searchInput) {
                          searchInput.value = query;
                          searchInput.focus();
                          // Trigger event if we have standard custom events
                          const event = new Event('input', { bubbles: true });
                          searchInput.dispatchEvent(event);
                        }
                      }}
                      className="px-3 py-1.5 rounded-full bg-bg-secondary border border-border/80 hover:border-primary/40 hover:bg-primary/5 text-[10px] font-medium text-text-primary flex items-center gap-1.5 transition-all"
                    >
                      <Search className="w-3 h-3 text-text-tertiary" />
                      {query}
                    </button>
                  ))}
                </div>
              </div>

              {/* Source Tabs Relevance Matrix Debugger */}
              <div className="space-y-3">
                <h4 className="text-xs font-black uppercase tracking-widest text-text-tertiary flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5" /> Active Session Tab Diagnostics
                </h4>
                <div className="border border-border/60 rounded-xl overflow-hidden text-xs bg-bg-secondary/30">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-bg-secondary border-b border-border/60 text-left text-text-tertiary">
                        <th className="p-3 text-[10px] font-bold uppercase tracking-widest">Open Tab Title</th>
                        <th className="p-3 text-[10px] font-bold uppercase tracking-widest text-center">Status</th>
                        <th className="p-3 text-[10px] font-bold uppercase tracking-widest text-right">Relevance</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/40">
                      {result.sourceTabs.map((tab, idx) => (
                        <tr key={idx} className="hover:bg-white/40 dark:hover:bg-gray-900/40">
                          <td className="p-3 font-medium">
                            <div className="font-semibold text-primary">{tab.title}</div>
                            <div className="text-[10px] text-text-tertiary truncate max-w-xs sm:max-w-md">{tab.relevanceExplanation}</div>
                          </td>
                          <td className="p-3 text-center">
                            {tab.isCurrent ? (
                              <span className="inline-block px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 text-[9px] font-bold">
                                ACTIVE
                              </span>
                            ) : (
                              <span className="inline-block px-2 py-0.5 rounded bg-gray-50 text-gray-500 border border-border text-[9px]">
                                BACKGND
                              </span>
                            )}
                          </td>
                          <td className="p-3 text-right font-mono font-bold text-accent">
                            {Math.round(tab.relevanceScore * 100)}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          ) : (
            <div className="h-64 flex flex-col items-center justify-center space-y-2 bg-bg-secondary/20 rounded-xl border border-border/40 text-text-tertiary">
              <AlertCircle className="w-8 h-8" />
              <p className="text-xs">Select settings or click run optimization to view personalize dashboard.</p>
            </div>
          )}

          {/* JSON Schema Configuration Inspector */}
          {showConfig && result && (
            <AnimatePresence>
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="space-y-2 border border-border bg-gray-900 p-4 rounded-xl text-xs text-green-400 font-mono overflow-x-auto"
              >
                <div className="flex items-center justify-between text-[10px] text-gray-400 border-b border-gray-800 pb-2 mb-2">
                  <span>API payload return: <code>POST /api/personalize</code></span>
                  <span className="bg-green-950 text-green-400 px-2 py-0.5 rounded font-black">200 OK</span>
                </div>
                <pre>{JSON.stringify(result, null, 2)}</pre>
              </motion.div>
            </AnimatePresence>
          )}

        </div>
      </div>
    </div>
  );
}
