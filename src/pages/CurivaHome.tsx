import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  BookMarked,
  BookOpen,
  Calendar,
  CheckCircle2,
  ChevronRight,
  CircleHelp,
  Clock,
  Compass,
  FileText,
  GraduationCap,
  Heart,
  HeartPulse,
  Layers,
  Library,
  LockKeyhole,
  Map,
  Microscope,
  Search,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Users,
  UserRound,
  type LucideIcon,
} from 'lucide-react';
import { useRole, type UserRole } from '../context/RoleContext';

type Workspace = 'patient' | 'student' | 'practitioner';

type Feature = {
  title: string;
  description: string;
  href?: string;
  icon: LucideIcon;
  eyebrow?: string;
  tone?: 'mint' | 'blue' | 'violet' | 'amber' | 'rose' | 'slate';
  planned?: boolean;
};

const roles: { title: string; subtitle: string; value: UserRole; workspace: Workspace; icon: LucideIcon }[] = [
  { title: 'Patient', subtitle: 'Health information & support', value: 'Public', workspace: 'patient', icon: HeartPulse },
  { title: 'BHMS Student', subtitle: 'Syllabus, subjects & exams', value: 'BHMS Student', workspace: 'student', icon: GraduationCap },
  { title: 'Doctor', subtitle: 'Clinical reference workspace', value: 'Practitioner', workspace: 'practitioner', icon: Stethoscope },
];

const toneClasses: Record<NonNullable<Feature['tone']>, string> = {
  mint: 'bg-[#e8f5ef] text-[#21664e] border-[#d5eade]',
  blue: 'bg-[#eaf1fb] text-[#315b91] border-[#dbe7f7]',
  violet: 'bg-[#f0edfb] text-[#6250a1] border-[#e5def8]',
  amber: 'bg-[#fbf2df] text-[#8c6421] border-[#f3e4bf]',
  rose: 'bg-[#fbecef] text-[#9a465b] border-[#f5dce2]',
  slate: 'bg-[#edf1f3] text-[#53636d] border-[#dde4e7]',
};

const patientFeatures: Feature[] = [
  {
    title: 'Health education library',
    description: 'Plain-language guides to help you understand health topics and prepare better questions for a clinician.',
    href: '/public-education',
    icon: BookOpen,
    tone: 'mint',
    eyebrow: 'Learn',
  },
  {
    title: 'Ask a Homoeopath',
    description: 'Explore the existing question portal and understand how to submit a question for review.',
    href: '/ask-Homoeopath',
    icon: CircleHelp,
    tone: 'blue',
    eyebrow: 'Questions',
  },
  {
    title: 'Condition guides',
    description: 'Browse organized educational information and learn when professional assessment is important.',
    href: '/disease-hub',
    icon: Heart,
    tone: 'rose',
    eyebrow: 'Health topics',
  },
  {
    title: 'Support & contact',
    description: 'Find help with the Curiva platform and its currently available resources.',
    href: '/support',
    icon: Users,
    tone: 'violet',
    eyebrow: 'Get help',
  },
];

const studentFeatures: Feature[] = [
  {
    title: 'BHMS syllabus roadmap',
    description: 'Explore curriculum structure, competencies, and subject progression in one place.',
    href: '/cbdc-syllabus',
    icon: Map,
    tone: 'mint',
    eyebrow: 'Start here',
  },
  {
    title: 'All subjects',
    description: 'Move between homoeopathic subjects and allied medical sciences without losing your place.',
    href: '/all-subjects',
    icon: Layers,
    tone: 'blue',
    eyebrow: 'Subject hub',
  },
  {
    title: 'MCQ practice',
    description: 'Use subject-focused questions to strengthen recall and identify topics for revision.',
    href: '/mcq-practice',
    icon: CheckCircle2,
    tone: 'violet',
    eyebrow: 'Practice',
  },
  {
    title: 'Books & resources',
    description: 'Open the existing library and discover available study resources.',
    href: '/free-books',
    icon: Library,
    tone: 'amber',
    eyebrow: 'Study library',
  },
];

const practitionerFeatures: Feature[] = [
  {
    title: 'Clinical guides',
    description: 'Browse structured reference material for clinical learning and review.',
    href: '/clinical-guides',
    icon: BookMarked,
    tone: 'mint',
    eyebrow: 'Reference',
  },
  {
    title: 'Repertory workspace',
    description: 'Open repertory learning and reference tools available in Curiva.',
    href: '/repertory',
    icon: Search,
    tone: 'blue',
    eyebrow: 'Explore',
  },
  {
    title: 'Comparative analysis',
    description: 'Review the existing comparative and analytical learning tools.',
    href: '/analysis',
    icon: Activity,
    tone: 'violet',
    eyebrow: 'Tools',
  },
  {
    title: 'Research library',
    description: 'Discover research-oriented reading and educational references.',
    href: '/research',
    icon: Microscope,
    tone: 'amber',
    eyebrow: 'Research',
  },
];

const bhmsYears: { title: string; subtitle: string; href: string; icon: LucideIcon; topics: string }[] = [
  { title: '1st BHMS', subtitle: 'Build the foundations', href: '/portal/1st-bhms', icon: BookOpen, topics: 'Anatomy · Physiology · Pharmacy' },
  { title: '2nd BHMS', subtitle: 'Develop core concepts', href: '/portal/2nd-bhms', icon: Layers, topics: 'Pathology · FMT · Clinical subjects' },
  { title: '3rd BHMS', subtitle: 'Connect theory and practice', href: '/portal/3rd-bhms', icon: Activity, topics: 'Medicine · Surgery · Specialties' },
  { title: '4th BHMS', subtitle: 'Prepare for clinical transition', href: '/portal/4th-bhms', icon: GraduationCap, topics: 'Integrated revision · Clinical learning' },
];

const subjects: { title: string; href: string; icon: LucideIcon; tone: NonNullable<Feature['tone']> }[] = [
  { title: 'Organon of Medicine', href: '/subject/organon', icon: BookOpen, tone: 'mint' },
  { title: 'Materia Medica', href: '/subject/materia-medica', icon: Library, tone: 'blue' },
  { title: 'Repertory', href: '/subject/repertory', icon: Search, tone: 'violet' },
  { title: 'Homoeopathic Pharmacy', href: '/subject/pharmacy', icon: BookMarked, tone: 'amber' },
  { title: 'Anatomy', href: '/subject/anatomy', icon: Activity, tone: 'rose' },
  { title: 'Physiology', href: '/subject/physiology', icon: HeartPulse, tone: 'mint' },
  { title: 'Pathology', href: '/subject/pathology', icon: Microscope, tone: 'blue' },
  { title: 'Surgery', href: '/subject/surgery', icon: ShieldCheck, tone: 'violet' },
  { title: 'Practice of Medicine', href: '/subject/practice-of-medicine', icon: Stethoscope, tone: 'amber' },
  { title: 'Obstetrics & Gynaecology', href: '/subject/gynecology-obstetrics', icon: Users, tone: 'rose' },
];

function getWorkspace(role: UserRole): Workspace {
  const value = String(role).toLowerCase();
  if (value.includes('student') || value.includes('bhms') || value === 'intern' || value === 'faculty') {
    return 'student';
  }
  if (value.includes('practitioner') || value.includes('researcher') || value.includes('administrator')) {
    return 'practitioner';
  }
  return 'patient';
}

function FeatureCard({ feature, index }: { feature: Feature; index: number }) {
  const Icon = feature.icon;
  const content = (
    <div className="flex h-full flex-col gap-4">
      <div className="flex items-start justify-between gap-3">
        <span className={'inline-flex h-12 w-12 items-center justify-center rounded-2xl border ' + toneClasses[feature.tone || 'mint']}>
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        {feature.eyebrow && (
          <span className="rounded-full bg-white/80 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#63716d]">
            {feature.eyebrow}
          </span>
        )}
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-bold tracking-tight text-[#193b35]">{feature.title}</h3>
        <p className="mt-2 text-sm leading-6 text-[#63736e]">{feature.description}</p>
      </div>
      {feature.planned ? (
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-dashed border-[#bdc9c4] px-3 py-2 text-xs font-semibold text-[#6e7b76]">
          <Clock className="h-3.5 w-3.5" /> Planned feature
        </span>
      ) : (
        <span className="inline-flex items-center gap-2 text-sm font-bold text-[#21664e]">
          Open resource <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      )}
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.045, duration: 0.3 }}
      className="h-full"
    >
      {feature.href && !feature.planned ? (
        <Link
          to={feature.href}
          className="group block h-full rounded-[1.5rem] border border-[#e2eae5] bg-white p-5 shadow-[0_8px_30px_rgba(25,59,53,0.035)] transition-all duration-200 hover:-translate-y-1 hover:border-[#b5d9c4] hover:shadow-[0_16px_38px_rgba(25,59,53,0.09)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2d7960]"
        >
          {content}
        </Link>
      ) : (
        <div className="h-full rounded-[1.5rem] border border-[#e2eae5] bg-white p-5 shadow-[0_8px_30px_rgba(25,59,53,0.035)]">
          {content}
        </div>
      )}
    </motion.div>
  );
}

export default function CurivaHome() {
  const { currentRole, setCurrentRole } = useRole();
  const activeWorkspace = getWorkspace(currentRole);
  const isPatient = activeWorkspace === 'patient';
  const isStudent = activeWorkspace === 'student';
  const isPractitioner = activeWorkspace === 'practitioner';

  const dashboard = isPatient
    ? {
        eyebrow: 'Patient support',
        title: 'Health information, with a clearer next step.',
        description: 'Find approachable health education, prepare questions for a consultation, and discover the Curiva support resources currently available to you.',
        icon: HeartPulse,
        features: patientFeatures,
        actionLabel: 'Explore health education',
        actionHref: '/public-education',
      }
    : isStudent
      ? {
          eyebrow: 'BHMS learning workspace',
          title: 'Make your medical learning journey easier to navigate.',
          description: 'Follow a year-wise roadmap, jump into a subject, and keep syllabus, study resources, and exam practice close at hand.',
          icon: GraduationCap,
          features: studentFeatures,
          actionLabel: 'Open BHMS syllabus',
          actionHref: '/cbdc-syllabus',
        }
      : {
          eyebrow: 'Practitioner workspace',
          title: 'Your clinical reference tools, organized in one place.',
          description: 'Explore structured clinical references, repertory resources, and research-oriented learning tools. Use these materials to support professional study, not as a substitute for clinical judgement.',
          icon: Stethoscope,
          features: practitionerFeatures,
          actionLabel: 'Open clinical guides',
          actionHref: '/clinical-guides',
        };

  const DashboardIcon = dashboard.icon;

  return (
    <main className="min-h-screen bg-[#f5f8f5] pb-16 text-[#193b35]">
      <div className="mx-auto max-w-7xl px-4 pb-10 pt-5 sm:px-6 sm:pt-8 lg:px-8">
        <section className="relative overflow-hidden rounded-[2rem] bg-[#112f35] text-white shadow-[0_25px_70px_rgba(17,47,53,0.16)]">
          <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-[#8dcfb0]/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 left-[28%] h-72 w-72 rounded-full bg-[#2d7960]/35 blur-3xl" />
          <div className="relative grid gap-8 p-6 sm:p-9 lg:grid-cols-[1.35fr_0.65fr] lg:items-end lg:p-12">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.19em] text-[#c8e8d7]">
                <Sparkles className="h-3.5 w-3.5" />
                Curiva · Learn, care, connect
              </div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#9ed7b7]">{dashboard.eyebrow}</p>
              <h1 className="max-w-3xl text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                {dashboard.title}
              </h1>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-[#d5e5e0] sm:text-base">
                {dashboard.description}
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  to={dashboard.actionHref}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#d7f0df] px-5 py-3 text-sm font-bold text-[#153f35] transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  {dashboard.actionLabel}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                {isStudent && (
                  <Link
                    to="/all-subjects"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/25 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                  >
                    Browse all subjects <ChevronRight className="h-4 w-4" />
                  </Link>
                )}
                {isPatient && (
                  <Link
                    to="/support"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/25 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                  >
                    Contact support <ChevronRight className="h-4 w-4" />
                  </Link>
                )}
                {isPractitioner && (
                  <Link
                    to="/research"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/25 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                  >
                    Research resources <ChevronRight className="h-4 w-4" />
                  </Link>
                )}
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-white/12 bg-white/7 p-5 backdrop-blur-sm sm:p-6">
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#d8f0e1] text-[#1c674e]">
                  <DashboardIcon className="h-6 w-6" />
                </span>
                <div>
                  <p className="text-xs text-[#c4d8d2]">Current workspace</p>
                  <p className="mt-1 text-lg font-bold text-white">
                    {isPatient ? 'Patient support' : isStudent ? 'BHMS student' : 'Doctor / practitioner'}
                  </p>
                </div>
              </div>
              <div className="my-5 h-px bg-white/15" />
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-[#c4d8d2]">Switch experience</p>
              <div className="grid gap-2">
                {roles.map((role) => {
                  const RoleIcon = role.icon;
                  const selected = activeWorkspace === role.workspace;
                  return (
                    <button
                      key={role.value}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => setCurrentRole(role.value)}
                      className={
                        'flex w-full items-center gap-3 rounded-xl border px-3 py-3 text-left transition ' +
                        (selected
                          ? 'border-[#b4e0c5] bg-[#d8f0e1] text-[#183f34]'
                          : 'border-white/12 bg-white/5 text-white hover:bg-white/10')
                      }
                    >
                      <RoleIcon className="h-4 w-4 shrink-0" />
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-bold">{role.title}</span>
                        <span className={'mt-0.5 block text-xs ' + (selected ? 'text-[#4c6e60]' : 'text-[#c4d8d2]')}>
                          {role.subtitle}
                        </span>
                      </span>
                      {selected && <CheckCircle2 className="h-4 w-4 shrink-0" />}
                    </button>
                  );
                })}
              </div>
              <p className="mt-4 flex items-start gap-2 text-[11px] leading-5 text-[#bbd2ca]">
                <LockKeyhole className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                This changes the displayed workspace. Professional verification and server-side permissions are required for protected clinical services.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-8">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#438064]">Your shortcuts</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[#193b35] sm:text-3xl">
                {isPatient ? 'Support that starts here' : isStudent ? 'Your study desk' : 'Clinical reference desk'}
              </h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-[#718079]">
              {isPatient
                ? 'Patient-focused resources stay at the centre of this view.'
                : isStudent
                  ? 'Move from syllabus to subject to practice, one step at a time.'
                  : 'A focused set of resources for professional reference and continued learning.'}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {dashboard.features.map((feature, index) => (
              <FeatureCard key={feature.title} feature={feature} index={index} />
            ))}
          </div>
        </section>

        {isStudent && (
          <>
            <section className="mt-12">
              <div className="mb-5 flex items-end justify-between gap-3">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#438064]">Roadmap</p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">Progress through BHMS, year by year</h2>
                </div>
                <Link to="/cbdc-syllabus" className="hidden items-center gap-2 text-sm font-bold text-[#21664e] hover:underline sm:inline-flex">
                  View syllabus <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {bhmsYears.map((year, index) => {
                  const YearIcon = year.icon;
                  return (
                    <motion.div
                      key={year.title}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.04 }}
                    >
                      <Link
                        to={year.href}
                        className="group block h-full rounded-[1.5rem] border border-[#e0e9e2] bg-white p-5 transition-all hover:-translate-y-1 hover:border-[#b5d9c4] hover:shadow-[0_16px_38px_rgba(25,59,53,0.07)]"
                      >
                        <div className="flex items-center justify-between">
                          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#e8f5ef] text-[#21664e]">
                            <YearIcon className="h-5 w-5" />
                          </span>
                          <span className="text-xs font-semibold text-[#87958e]">0{index + 1}</span>
                        </div>
                        <h3 className="mt-5 text-lg font-bold text-[#193b35]">{year.title}</h3>
                        <p className="mt-1 text-sm text-[#63736e]">{year.subtitle}</p>
                        <p className="mt-4 border-t border-[#edf1ed] pt-3 text-xs leading-5 text-[#718079]">{year.topics}</p>
                        <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#21664e]">
                          Open roadmap <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </span>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </section>

            <section className="mt-12">
              <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#438064]">Subject explorer</p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">Homoeopathic & allied sciences</h2>
                </div>
                <Link to="/all-subjects" className="inline-flex items-center gap-2 text-sm font-bold text-[#21664e] hover:underline">
                  All subjects <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5">
                {subjects.map((subject) => {
                  const SubjectIcon = subject.icon;
                  return (
                    <Link
                      key={subject.title}
                      to={subject.href}
                      className="group flex min-h-28 items-center gap-3 rounded-2xl border border-[#e2eae5] bg-white p-4 transition hover:border-[#b5d9c4] hover:shadow-[0_10px_25px_rgba(25,59,53,0.06)]"
                    >
                      <span className={'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ' + toneClasses[subject.tone]}>
                        <SubjectIcon className="h-4 w-4" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-bold leading-5 text-[#25473d]">{subject.title}</span>
                        <span className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-[#7b8982]">
                          Explore <ChevronRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                        </span>
                      </span>
                    </Link>
                  );
                })}
              </div>
              <p className="mt-4 text-xs leading-5 text-[#798880]">
                Use the official syllabus and your university's current curriculum to confirm subject order, competencies, and examination requirements.
              </p>
            </section>
          </>
        )}

        {isPatient && (
          <section className="mt-8 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="rounded-[1.5rem] border border-[#dce9df] bg-[#eaf5ed] p-6 sm:p-8">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-[#21664e]">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h2 className="mt-4 text-xl font-bold text-[#1d4d3d]">Make informed care decisions</h2>
              <p className="mt-2 max-w-xl text-sm leading-6 text-[#536f61]">
                Use educational information to prepare questions for a qualified clinician. Online information cannot confirm a diagnosis or replace individualized medical assessment.
              </p>
              <p className="mt-4 text-xs leading-5 text-[#536f61]">
                If you may be experiencing a medical emergency, contact your local emergency service or go to the nearest emergency department.
              </p>
            </div>
            <div className="rounded-[1.5rem] border border-dashed border-[#c7d6cc] bg-white p-6 sm:p-8">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#edf1f3] text-[#53636d]">
                <Calendar className="h-5 w-5" />
              </div>
              <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.18em] text-[#708079]">Planned module</p>
              <h2 className="mt-2 text-xl font-bold text-[#193b35]">Doctor profiles & appointments</h2>
              <p className="mt-2 text-sm leading-6 text-[#63736e]">
                A verified doctor directory and booking workflow should be connected to real practitioner verification, live availability, consent, and secure backend records before appointments are offered.
              </p>
            </div>
          </section>
        )}

        {isPractitioner && (
          <section className="mt-8 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="rounded-[1.5rem] bg-[#eaf5ed] p-6 sm:p-8">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-[#21664e]">
                <Stethoscope className="h-5 w-5" />
              </div>
              <h2 className="mt-4 text-xl font-bold text-[#1d4d3d]">A focused professional workspace</h2>
              <p className="mt-2 text-sm leading-6 text-[#536f61]">
                Use these tools for reference and continued learning. Clinical decisions require appropriate professional judgement, current evidence, and direct assessment where needed.
              </p>
            </div>
            <div className="rounded-[1.5rem] border border-[#e2eae5] bg-white p-6 sm:p-8">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#f0edfb] text-[#6250a1]">
                <UserRound className="h-5 w-5" />
              </div>
              <h2 className="mt-4 text-xl font-bold text-[#193b35]">Doctor profile & appointment tools</h2>
              <p className="mt-2 text-sm leading-6 text-[#63736e]">
                Profile verification, appointment calendars, and patient-record tools are not enabled by this dashboard alone. They need separate authorization and backend implementation.
              </p>
            </div>
          </section>
        )}

        <footer className="mt-12 flex flex-col gap-3 border-t border-[#dfe8e1] pt-5 text-xs leading-5 text-[#7b8982] sm:flex-row sm:items-center sm:justify-between">
          <p>Curiva Homoeopathy · A learning and support platform.</p>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            <Link to="/medical-disclaimer" className="hover:text-[#21664e] hover:underline">Medical disclaimer</Link>
            <Link to="/privacy-policy" className="hover:text-[#21664e] hover:underline">Privacy</Link>
            <Link to="/support" className="hover:text-[#21664e] hover:underline">Support</Link>
          </div>
        </footer>
      </div>
    </main>
  );
}
