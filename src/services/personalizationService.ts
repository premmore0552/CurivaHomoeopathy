export interface BrowserTab {
  tabId: string | number;
  pageTitle: string;
  pageUrl: string;
  isCurrent: boolean;
}

export interface PersonalizationResult {
  role: 'student' | 'intern' | 'practitioner' | 'public';
  tone: 'academic' | 'clinical' | 'simple';
  nav: Array<{ name: string; to: string; icon: string; desc?: string }>;
  modules: Array<{ id: string; title: string; cta: string; link: string; desc: string }>;
  searchDefaults: string[];
  recommendations: Array<{ title: string; link: string; snippet: string }>;
  sourceTabs: Array<{
    tabId: string;
    title: string;
    url: string;
    isCurrent: boolean;
    relevanceScore: number;
    relevanceExplanation: string;
  }>;
  profileSavePayload?: {
    profession: string;
    interests: string[];
  };
  analyticsHints?: {
    eventsToTrack: Array<{ name: string; params?: any }>;
  };
}

// Preset simulation lists of browser tabs to allow the user to see the personalization engine adapt in real-time!
export const PRESET_SIMULATED_TABS: Record<string, BrowserTab[]> = {
  student: [
    { tabId: '1', pageTitle: 'BHMS First Year Anatomy Lecture Notes - Heart & Bones', pageUrl: 'https://university.edu/bhms/anatomy-cardiovascular', isCurrent: true },
    { tabId: '2', pageTitle: 'Samuel Hahnemann Organon Aphorism 1-10 Study Guide', pageUrl: 'https://Homoeopathy-academy.org/organon-aphorisms', isCurrent: false },
    { tabId: '3', pageTitle: 'Homoeopathic Pharmacy Potentisation Methods', pageUrl: 'https://syllabus.org/pharmacy-potentisation', isCurrent: false }
  ],
  intern: [
    { tabId: '10', pageTitle: 'Symptomatic Repertorization - Kent Repertory Clinical Sheet', pageUrl: 'https://clinic.org/repertory/sheet-342', isCurrent: true },
    { tabId: '11', pageTitle: 'Common Blood Count (CBC) Laboratory Hemogram Values', pageUrl: 'https://medlabs.org/hemogram-interpretation-Homoeopathy', isCurrent: false },
    { tabId: '12', pageTitle: 'Acute prescribing and simillimum selection protocols', pageUrl: 'https://Homoeoclinic.net/posology-acute-cases', isCurrent: false }
  ],
  practitioner: [
    { tabId: '20', pageTitle: 'Miasms Encyclopedia: Psora, Sycosis & Syphilis', pageUrl: 'https://hahnemannian-institute.org/miasms/encyclopedia', isCurrent: true },
    { tabId: '21', pageTitle: 'Comparative remedy analysis for respiratory modal generalities', pageUrl: 'https://expert-Homoeopathy.com/comparative-matrix', isCurrent: false },
    { tabId: '22', pageTitle: 'The Chronic Miasms: Prescribing Psora, Sycosis & Syphilis', pageUrl: 'https://stalwarts.org/miasms/encyclopedia', isCurrent: false }
  ],
  public: [
    { tabId: '30', pageTitle: 'Is Homoeopathy safe? An introductory guide for families', pageUrl: 'https://wellnessblog.com/Homoeopathy-safety-myths', isCurrent: true },
    { tabId: '31', pageTitle: 'Natural home remedies for common cold and sleep support', pageUrl: 'https://generalhealth.org/safe-natural-remedies', isCurrent: false }
  ]
};

/**
 * Fetches the personalization configuration from the backend.
 * Uses a local state cache to keep things blazing fast.
 */
export async function getPersonalizedView(params: {
  role?: string;
  tabs?: BrowserTab[];
  userProfile?: any;
  userQuery?: string;
}): Promise<PersonalizationResult> {
  try {
    const response = await fetch('/api/personalize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        role: params.role,
        edge_all_open_tabs: params.tabs || [],
        userProfile: params.userProfile,
        userQuery: params.userQuery
      }),
    });

    if (!response.ok) {
      throw new Error('Personalization endpoint returned non-ok status');
    }

    return await response.ok ? response.json() : getFallbackPersonalization(params.role || 'student');
  } catch (error) {
    console.error('Failed to fetch from personalization API, falling back to client-side rule engine:', error);
    return getFallbackPersonalization(params.role || 'student', params.tabs);
  }
}

/**
 * Local client fallback if backend is offline.
 */
function getFallbackPersonalization(role: string, tabs?: BrowserTab[]): PersonalizationResult {
  const normalizedRole = (role.toLowerCase().includes('student') ? 'student' :
                          role.toLowerCase().includes('intern') ? 'intern' :
                          role.toLowerCase().includes('practitioner') || role.toLowerCase().includes('doctor') ? 'practitioner' : 'public') as any;

  const tones: Record<string, 'academic' | 'clinical' | 'simple'> = {
    student: 'academic',
    intern: 'clinical',
    practitioner: 'clinical',
    public: 'simple'
  };

  const navs = {
    student: [
      { name: "BHMS Course Syllabus", to: "/cbdc-syllabus", icon: "GraduationCap", desc: "NCH Competencies" },
      { name: "Anatomy Core", to: "/anatomy", icon: "Activity", desc: "Anatomy library & notes" },
      { name: "First Year Crash Course", to: "/first-bhms-crash-course", icon: "Sparkles", desc: "Flagship exam prep" }
    ],
    intern: [
      { name: "Symptom Checker", to: "/symptom-checker", icon: "Cpu", desc: "Kent repertorization & rubrics" },
      { name: "CBC Hemogram Tool", to: "/cbc-handbook", icon: "Activity", desc: "Diagnostic lab analysis" }
    ],
    practitioner: [
      { name: "Remedy Comparative Analyzer", to: "/analysis", icon: "Cpu", desc: "Side-by-side criteria grid" },
      { name: "Miasms Encyclopedia", to: "/miasms", icon: "GraduationCap", desc: "Psora, Sycosis & Syphilis" }
    ],
    public: [
      { name: "Public Health Education", to: "/public-education", icon: "Globe", desc: "Debunking Homoeopathy myths" },
      { name: "Patient Health eBooks", to: "/ebooks", icon: "BookMarked", desc: "Free informative wellness books" }
    ]
  };

  const modules = {
    student: [
      { id: "syllabus-explorer", title: "NCH CBDC Syllabus", cta: "Explore Curriculum", link: "/cbdc-syllabus", desc: "Explore official year-wise competency maps." },
      { id: "study-booster", title: "1st BHMS Crash Course", cta: "Launch Crash Course", link: "/first-bhms-crash-course", desc: "Quick prep across core Anatomy, Physiology, and Pharmacy guides." }
    ],
    intern: [
      { id: "symptom-checker", title: "Kent Repertory & Symptom Checker", cta: "Repertorize Case", link: "/symptom-checker", desc: "Convert patient observations and rubric weights into accurate polychrest remedies." },
      { id: "cbc-analyzer", title: "CBC Hemogram Diagnostic", cta: "Analyze Lab Report", link: "/cbc-handbook", desc: "Differentiate systemic pathologies and align hemograms to primary miasmatic states." }
    ],
    practitioner: [
      { id: "comparative-analyzer", title: "Comparative Remedy Matrix", cta: "Open Comparative Grid", link: "/analysis", desc: "Surgically evaluate sister remedy profiles side-by-side across modal generalities." },
      { id: "miasms-encyclopedia", title: "Miasms Encyclopedia", cta: "Explore Miasms", link: "/miasms", desc: "Deep-dive into chronic Psora, Sycosis, and Syphilis constitutional profiles." },
    ],
    public: [
      { id: "public-education", title: "Public Resource Center", cta: "Start Basic Guide", link: "/public-education", desc: "Understand classical Homoeopathy, demystify popular misconceptions, and read clear home remedies." },
      { id: "ebooks-library", title: "Patient Health eBooks Library", cta: "Read eBooks", link: "/ebooks", desc: "Browse and read beautiful free eBooks covering hair care, stress relief, and sleep hygiene." }
    ]
  };

  const searchDefaults = {
    student: ["Anatomy regional study guides", "Samuel Hahnemann Aphorisms", "Sulphur Allen Keynotes"],
    intern: ["Kent repertorization rules", "CBC report miasmatic mapping", "Acute gastrointestinal therapeutics"],
    practitioner: ["Miasm diagnosis of chronic cases", "Lycopodium and Sulphur concordances", "Sister remedy differentiation matrix"],
    public: ["Is Homoeopathy safe?", "What to expect in a Homoeopathic consult", "Safe natural sleep aids"]
  };

  const recommendations = {
    student: [
      { title: "1st BHMS Crash Course", link: "/first-bhms-crash-course", snippet: "Boost your first year BHMS grades with curated revision guides, interactive maps, and oral viva simulators." }
    ],
    intern: [
      { title: "Symptom Checker", link: "/symptom-checker", snippet: "Log complex cases, weigh rubrics mathematically, and view real-time Kent totality calculations." }
    ],
    practitioner: [
      { title: "Remedy Comparative Analyzer", link: "/analysis", snippet: "Surgically isolate differences between highly similar remedy candidates using our modern side-by-side grid." }
    ],
    public: [
      { title: "Public Education Center", link: "/public-education", snippet: "Learn the fundamentals of dilutions, the law of similars, and separating scientific fact from internet myth." }
    ]
  };

  return {
    role: normalizedRole,
    tone: tones[normalizedRole],
    nav: navs[normalizedRole],
    modules: modules[normalizedRole],
    searchDefaults: searchDefaults[normalizedRole],
    recommendations: recommendations[normalizedRole],
    sourceTabs: (tabs || []).map((t, idx) => ({
      tabId: String(t.tabId || idx),
      title: t.pageTitle,
      url: t.pageUrl,
      isCurrent: t.isCurrent,
      relevanceScore: t.isCurrent ? 0.95 : 0.5,
      relevanceExplanation: t.isCurrent ? "Active browser tab matches primary focus area." : "Secondary browser tab."
    }))
  };
}
