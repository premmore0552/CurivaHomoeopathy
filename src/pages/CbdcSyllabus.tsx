import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, GraduationCap, Clock, Award, FileText, CheckCircle2, 
  Search, Info, ChevronRight, BookOpenCheck, Calendar, ArrowRight,
  Sparkles, ListCollapse, AlertCircle, Copy, Check, Filter, Bookmark,
  HelpCircle, ChevronDown, CheckSquare, ListTodo, Map, Tag, Star, 
  Layers, ArrowLeftRight, Heart, Share2, Printer, Compass, FileSpreadsheet,
  Activity, ArrowUpRight, CheckSquare2, Bell, X, SlidersHorizontal, Scale,
  BookMarked, Microscope, FlaskConical, Pill
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import { CBDC_TOPIC_STUDY_DATABASE, TopicStudyDetail } from '../data/cbdc_topics_study_data';
import { COMPLETE_SUBJECT_CURRICULUM_DATA, SUBJECT_ROUTE_MAPPINGS } from '../data/cbdc_subject_curriculum_data';
import { materiaMedicaData } from '../data/materiaMedica';

// ----------------------------------------------------
// Interfaces & Helper Components
// ----------------------------------------------------
function HighlightText({ text, query, className = '' }: { text: string; query: string; className?: string }) {
  if (!query || !query.trim()) return <span className={className}>{text}</span>;
  const escaped = query.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escaped})`, 'gi');
  const parts = text.split(regex);
  return (
    <span className={className}>
      {parts.map((part, i) =>
        part.toLowerCase() === query.trim().toLowerCase() ? (
          <mark key={i} className="bg-amber-300 dark:bg-amber-500/40 text-amber-950 dark:text-amber-100 font-bold px-1 py-0.5 rounded shadow-xs">
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </span>
  );
}

export interface Medicine {
  name: string;
  term: 'Term I' | 'Term II' | 'Term III';
  type: 'Homoeopathic Medicine' | 'Biochemic Tissue Salt' | 'Homoeopathic & Biochemic' | 'Nosode';
}

export interface YearMateriaMedica {
  yearId: '1st' | '2nd' | '3rd' | '4th';
  yearTitle: string;
  badge: string;
  preamble: string;
  outcomes: string[];
  hours: {
    theory: number;
    practical: number;
    nonLecture?: number;
    total: number;
    breakdown?: { label: string; hours: number }[];
  };
  assessment: {
    theoryMarks: number;
    practicalMarks: number;
    vivaMarks?: number;
    internalAssessment?: number;
    totalMarks: number;
    papersCount: number;
    details: string;
    paperDetails?: { name: string; description: string; marks: number; format: string }[];
  };
  referenceBooks: string[];
  medicines: Medicine[];
  units: Unit[];
}

export interface Topic {
  id: string;
  name: string;
  status: 'Available' | 'Coming Soon' | 'Under Revision' | 'Updated' | string;
  link?: string;
  resources?: {
    notes?: boolean;
    diagrams?: boolean;
    flowcharts?: boolean;
    clinical?: boolean;
    mcqs?: boolean;
    pyqs?: boolean;
    viva?: boolean;
    practicals?: boolean;
    cheatsheets?: boolean;
    revision?: boolean;
    blueprints?: boolean;
    [key: string]: boolean | undefined;
  };
  subtopics: string[];
}

export interface Chapter {
  id: string;
  number: number;
  name: string;
  examPriority?: 'Very High' | 'High' | 'Medium' | 'Low' | string;
  priority?: 'Very High' | 'High' | 'Medium' | 'Low' | string;
  studyTime?: string;
  topics: Topic[];
}

export interface Unit {
  id: string;
  number: number;
  name: string;
  chapters: Chapter[];
}

export interface GlossaryTerm {
  term: string;
  definition: string;
  type: string;
}

export interface CrossLink {
  title: string;
  path: string;
  type: string;
}

export interface RoadmapStep {
  step: number;
  title: string;
  priority: 'High' | 'Medium' | 'Low';
  duration: string;
  objective: string;
}

export interface ExamPattern {
  theoryPapers: number;
  theoryMarks: number;
  practicalMarks: number;
  internalAssessment: number;
  totalMarks: number;
}

export interface Subject {
  id: string;
  name: string;
  description: string;
  theoryHours: number;
  practicalHours: number;
  nonLectureHours: number;
  examPattern: ExamPattern;
  books: string[];
  pearls: string;
}

export interface YearSyllabus {
  year: string;
  title: string;
  duration: string;
  description: string;
  subjects: Subject[];
}

// ----------------------------------------------------
// Materia Medica Syllabus Data (1st to 4th BHMS)
// ----------------------------------------------------

const MEDICINES_1ST_BHMS: Medicine[] = [
  { name: "Aconitum Napellus", term: "Term II", type: "Homoeopathic Medicine" },
  { name: "Aethusa Cynapium", term: "Term III", type: "Homoeopathic Medicine" },
  { name: "Allium Cepa", term: "Term III", type: "Homoeopathic Medicine" },
  { name: "Aloe Socotrina", term: "Term II", type: "Homoeopathic Medicine" },
  { name: "Ammonium Carbonicum", term: "Term III", type: "Homoeopathic Medicine" },
  { name: "Ammonium Muriaticum", term: "Term III", type: "Homoeopathic Medicine" },
  { name: "Antimonium Crudum", term: "Term III", type: "Homoeopathic Medicine" },
  { name: "Antimonium Tartaricum", term: "Term III", type: "Homoeopathic Medicine" },
  { name: "Apis Mellifica", term: "Term II", type: "Homoeopathic Medicine" },
  { name: "Arnica Montana", term: "Term I", type: "Homoeopathic Medicine" },
  { name: "Arsenicum Album", term: "Term II", type: "Homoeopathic Medicine" },
  { name: "Arum Triphyllum", term: "Term III", type: "Homoeopathic Medicine" },
  { name: "Baryta Carbonica", term: "Term I", type: "Homoeopathic Medicine" },
  { name: "Belladonna", term: "Term II", type: "Homoeopathic Medicine" },
  { name: "Borax", term: "Term III", type: "Homoeopathic Medicine" },
  { name: "Bryonia Alba", term: "Term I", type: "Homoeopathic Medicine" },
  { name: "Calcarea Carbonica", term: "Term I", type: "Homoeopathic Medicine" },
  { name: "Calcarea Phosphorica", term: "Term II", type: "Homoeopathic & Biochemic" },
  { name: "Calendula Officinalis", term: "Term I", type: "Homoeopathic Medicine" },
  { name: "Carbo Vegetabilis", term: "Term II", type: "Homoeopathic Medicine" },
  { name: "Chamomilla", term: "Term II", type: "Homoeopathic Medicine" },
  { name: "Cina", term: "Term II", type: "Homoeopathic Medicine" },
  { name: "Cinchona Officinalis (China)", term: "Term II", type: "Homoeopathic Medicine" },
  { name: "Cocculus Indicus", term: "Term II", type: "Homoeopathic Medicine" },
  { name: "Coffea Cruda", term: "Term III", type: "Homoeopathic Medicine" },
  { name: "Colchicum Autumnale", term: "Term II", type: "Homoeopathic Medicine" },
  { name: "Colocynthis", term: "Term II", type: "Homoeopathic Medicine" },
  { name: "Croton Tiglium", term: "Term III", type: "Homoeopathic Medicine" },
  { name: "Dioscorea Villosa", term: "Term II", type: "Homoeopathic Medicine" },
  { name: "Drosera Rotundifolia", term: "Term III", type: "Homoeopathic Medicine" },
  { name: "Dulcamara", term: "Term II", type: "Homoeopathic Medicine" },
  { name: "Euphrasia Officinalis", term: "Term III", type: "Homoeopathic Medicine" },
  { name: "Gelsemium Sempervirens", term: "Term II", type: "Homoeopathic Medicine" },
  { name: "Hepar Sulphuris", term: "Term III", type: "Homoeopathic Medicine" },
  { name: "Hypericum Perforatum", term: "Term I", type: "Homoeopathic Medicine" },
  { name: "Ignatia Amara", term: "Term II", type: "Homoeopathic Medicine" },
  { name: "Ipecacuanha", term: "Term III", type: "Homoeopathic Medicine" },
  { name: "Ledum Palustre", term: "Term I", type: "Homoeopathic Medicine" },
  { name: "Lycopodium Clavatum", term: "Term II", type: "Homoeopathic Medicine" },
  { name: "Natrum Carbonicum", term: "Term III", type: "Homoeopathic Medicine" },
  { name: "Natrum Muriaticum", term: "Term I", type: "Homoeopathic & Biochemic" },
  { name: "Nux Vomica", term: "Term II", type: "Homoeopathic Medicine" },
  { name: "Podophyllum Peltatum", term: "Term II", type: "Homoeopathic Medicine" },
  { name: "Pulsatilla Nigricans", term: "Term II", type: "Homoeopathic Medicine" },
  { name: "Rhus Toxicodendron", term: "Term I", type: "Homoeopathic Medicine" },
  { name: "Ruta Graveolens", term: "Term I", type: "Homoeopathic Medicine" },
  { name: "Silicea", term: "Term I", type: "Homoeopathic & Biochemic" },
  { name: "Spongia Tosta", term: "Term III", type: "Homoeopathic Medicine" },
  { name: "Sulphur", term: "Term I", type: "Homoeopathic Medicine" },
  { name: "Symphytum Officinale", term: "Term I", type: "Homoeopathic Medicine" },
  { name: "Calcarea Fluorica", term: "Term II", type: "Biochemic Tissue Salt" },
  { name: "Calcarea Sulphurica", term: "Term II", type: "Biochemic Tissue Salt" },
  { name: "Ferrum Phosphoricum", term: "Term III", type: "Biochemic Tissue Salt" },
  { name: "Kali Muriaticum", term: "Term III", type: "Biochemic Tissue Salt" },
  { name: "Kali Phosphoricum", term: "Term III", type: "Biochemic Tissue Salt" },
  { name: "Kali Sulphuricum", term: "Term III", type: "Biochemic Tissue Salt" },
  { name: "Magnesium Phosphoricum", term: "Term III", type: "Biochemic Tissue Salt" },
  { name: "Natrum Phosphoricum", term: "Term II", type: "Biochemic Tissue Salt" },
  { name: "Natrum Sulphuricum", term: "Term II", type: "Biochemic Tissue Salt" }
];

const MEDICINES_2ND_BHMS: Medicine[] = [
  { name: "Acetic Acid", term: "Term I", type: "Homoeopathic Medicine" },
  { name: "Actaea Racemosa (Cimicifuga)", term: "Term II", type: "Homoeopathic Medicine" },
  { name: "Aesculus Hippocastanum", term: "Term I", type: "Homoeopathic Medicine" },
  { name: "Agaricus Muscarius", term: "Term I", type: "Homoeopathic Medicine" },
  { name: "Agnus Castus", term: "Term II", type: "Homoeopathic Medicine" },
  { name: "Alumina", term: "Term I", type: "Homoeopathic Medicine" },
  { name: "Ambra Grisea", term: "Term II", type: "Homoeopathic Medicine" },
  { name: "Anacardium Orientale", term: "Term I", type: "Homoeopathic Medicine" },
  { name: "Antimonium Arsenicosum", term: "Term II", type: "Homoeopathic Medicine" },
  { name: "Apocynum Cannabinum", term: "Term I", type: "Homoeopathic Medicine" },
  { name: "Arsenicum Iodatum", term: "Term II", type: "Homoeopathic Medicine" },
  { name: "Argentum Nitricum", term: "Term II", type: "Homoeopathic Medicine" },
  { name: "Baptisia Tinctoria", term: "Term I", type: "Homoeopathic Medicine" },
  { name: "Berberis Vulgaris", term: "Term II", type: "Homoeopathic Medicine" },
  { name: "Bellis Perennis", term: "Term I", type: "Homoeopathic Medicine" },
  { name: "Bromium", term: "Term II", type: "Homoeopathic Medicine" },
  { name: "Cactus Grandiflorus", term: "Term II", type: "Homoeopathic Medicine" },
  { name: "Calcarea Arsenicosa", term: "Term II", type: "Homoeopathic Medicine" },
  { name: "Calcarea Iodata", term: "Term II", type: "Homoeopathic Medicine" },
  { name: "Camphora", term: "Term II", type: "Homoeopathic Medicine" },
  { name: "Cannabis Indica", term: "Term II", type: "Homoeopathic Medicine" },
  { name: "Cannabis Sativa", term: "Term II", type: "Homoeopathic Medicine" },
  { name: "Cantharis", term: "Term II", type: "Homoeopathic Medicine" },
  { name: "Cardus Marianus", term: "Term I", type: "Homoeopathic Medicine" },
  { name: "Causticum", term: "Term I", type: "Homoeopathic Medicine" },
  { name: "Ceanothus Americanus", term: "Term I", type: "Homoeopathic Medicine" },
  { name: "Chelidonium Majus", term: "Term I", type: "Homoeopathic Medicine" },
  { name: "Chininum Arsenicosum", term: "Term I", type: "Homoeopathic Medicine" },
  { name: "Digitalis Purpurea", term: "Term II", type: "Homoeopathic Medicine" },
  { name: "Echinacea Angustifolia", term: "Term I", type: "Homoeopathic Medicine" },
  { name: "Equisetum Hyemale", term: "Term II", type: "Homoeopathic Medicine" },
  { name: "Ferrum Metallicum", term: "Term II", type: "Homoeopathic Medicine" },
  { name: "Helleborus Niger", term: "Term I", type: "Homoeopathic Medicine" },
  { name: "Hyoscyamus Niger", term: "Term II", type: "Homoeopathic Medicine" },
  { name: "Kali Bichromicum", term: "Term I", type: "Homoeopathic Medicine" },
  { name: "Kali Bromatum", term: "Term I", type: "Homoeopathic Medicine" },
  { name: "Kali Carbonicum", term: "Term I", type: "Homoeopathic Medicine" },
  { name: "Natrum Carbonicum", term: "Term I", type: "Homoeopathic Medicine" },
  { name: "Nux Moschata", term: "Term II", type: "Homoeopathic Medicine" },
  { name: "Opium", term: "Term I", type: "Homoeopathic Medicine" },
  { name: "Petroleum", term: "Term II", type: "Homoeopathic Medicine" },
  { name: "Phosphorus", term: "Term II", type: "Homoeopathic Medicine" },
  { name: "Secale Cornutum", term: "Term II", type: "Homoeopathic Medicine" },
  { name: "Sepia", term: "Term II", type: "Homoeopathic Medicine" },
  { name: "Stramonium", term: "Term II", type: "Homoeopathic Medicine" },
  { name: "Thuja Occidentalis", term: "Term I", type: "Homoeopathic Medicine" },
  { name: "Urtica Urens", term: "Term I", type: "Homoeopathic Medicine" },
  { name: "Veratrum Album", term: "Term II", type: "Homoeopathic Medicine" }
];

const MEDICINES_3RD_BHMS: Medicine[] = [
  { name: "Argentum Metallicum", term: "Term I", type: "Homoeopathic Medicine" },
  { name: "Aurum Metallicum", term: "Term I", type: "Homoeopathic Medicine" },
  { name: "Asafoetida", term: "Term I", type: "Homoeopathic Medicine" },
  { name: "Asterias Rubens", term: "Term I", type: "Homoeopathic Medicine" },
  { name: "Bismuth", term: "Term I", type: "Homoeopathic Medicine" },
  { name: "Bovista", term: "Term I", type: "Homoeopathic Medicine" },
  { name: "Capsicum", term: "Term I", type: "Homoeopathic Medicine" },
  { name: "Carbolic Acid", term: "Term I", type: "Homoeopathic Medicine" },
  { name: "Caulophyllum", term: "Term I", type: "Homoeopathic Medicine" },
  { name: "Collinsonia", term: "Term I", type: "Homoeopathic Medicine" },
  { name: "Conium", term: "Term I", type: "Homoeopathic Medicine" },
  { name: "Crocus Sativus", term: "Term I", type: "Homoeopathic Medicine" },
  { name: "Cyclamen", term: "Term I", type: "Homoeopathic Medicine" },
  { name: "Graphites", term: "Term I", type: "Homoeopathic Medicine" },
  { name: "Helonias", term: "Term I", type: "Homoeopathic Medicine" },
  { name: "Hydrastis", term: "Term I", type: "Homoeopathic Medicine" },
  { name: "Iodum", term: "Term I", type: "Homoeopathic Medicine" },
  { name: "Lilium Tigrinum", term: "Term I", type: "Homoeopathic Medicine" },
  { name: "Murex", term: "Term I", type: "Homoeopathic Medicine" },
  { name: "Muriatic Acid", term: "Term I", type: "Homoeopathic Medicine" },
  { name: "Nitric Acid", term: "Term I", type: "Homoeopathic Medicine" },
  { name: "Phosphoric Acid", term: "Term I", type: "Homoeopathic Medicine" },
  { name: "Picric Acid", term: "Term I", type: "Homoeopathic Medicine" },
  { name: "Platina", term: "Term I", type: "Homoeopathic Medicine" },
  { name: "Raphanus Sativus", term: "Term I", type: "Homoeopathic Medicine" },
  { name: "Ratanhia", term: "Term I", type: "Homoeopathic Medicine" },
  { name: "Sulphuric Acid", term: "Term I", type: "Homoeopathic Medicine" },
  { name: "Actaea Spicata", term: "Term II", type: "Homoeopathic Medicine" },
  { name: "Adrenaline", term: "Term II", type: "Homoeopathic Medicine" },
  { name: "Aranea Diadema", term: "Term II", type: "Homoeopathic Medicine" },
  { name: "Benzoic Acid", term: "Term II", type: "Homoeopathic Medicine" },
  { name: "Bufo", term: "Term II", type: "Homoeopathic Medicine" },
  { name: "Caladium", term: "Term II", type: "Homoeopathic Medicine" },
  { name: "Clematis Erecta", term: "Term II", type: "Homoeopathic Medicine" },
  { name: "Cholesterinum", term: "Term II", type: "Homoeopathic Medicine" },
  { name: "Coca", term: "Term II", type: "Homoeopathic Medicine" },
  { name: "Crotalus Horridus", term: "Term II", type: "Homoeopathic Medicine" },
  { name: "Erigeron", term: "Term II", type: "Homoeopathic Medicine" },
  { name: "Fluoric Acid", term: "Term II", type: "Homoeopathic Medicine" },
  { name: "Kreosotum", term: "Term II", type: "Homoeopathic Medicine" },
  { name: "Lachesis", term: "Term II", type: "Homoeopathic Medicine" },
  { name: "Lithium Carbonicum", term: "Term II", type: "Homoeopathic Medicine" },
  { name: "Millifolium", term: "Term II", type: "Homoeopathic Medicine" },
  { name: "Naja Tripudans", term: "Term II", type: "Homoeopathic Medicine" },
  { name: "Onosmodium", term: "Term II", type: "Homoeopathic Medicine" },
  { name: "Oxalic Acid", term: "Term II", type: "Homoeopathic Medicine" },
  { name: "Physostigma", term: "Term II", type: "Homoeopathic Medicine" },
  { name: "Radium Bromatum", term: "Term II", type: "Homoeopathic Medicine" },
  { name: "Sabal Serrulata", term: "Term II", type: "Homoeopathic Medicine" },
  { name: "Sabina", term: "Term II", type: "Homoeopathic Medicine" },
  { name: "Sarsaparilla", term: "Term II", type: "Homoeopathic Medicine" },
  { name: "Selenium", term: "Term II", type: "Homoeopathic Medicine" },
  { name: "Staphysagria", term: "Term II", type: "Homoeopathic Medicine" },
  { name: "Tabacum", term: "Term II", type: "Homoeopathic Medicine" },
  { name: "Taraxacum", term: "Term II", type: "Homoeopathic Medicine" },
  { name: "Tarentula Cubensis", term: "Term II", type: "Homoeopathic Medicine" },
  { name: "Tarentula Hispanica", term: "Term II", type: "Homoeopathic Medicine" },
  { name: "Terebinthina", term: "Term II", type: "Homoeopathic Medicine" },
  { name: "Thalapsi Bursa Pastoris", term: "Term II", type: "Homoeopathic Medicine" },
  { name: "Theridion", term: "Term II", type: "Homoeopathic Medicine" },
  { name: "Thyroidinum", term: "Term II", type: "Homoeopathic Medicine" },
  { name: "Trillium Pendulum", term: "Term II", type: "Homoeopathic Medicine" },
  { name: "Ustilago", term: "Term II", type: "Homoeopathic Medicine" },
  { name: "Viburnum Opulus", term: "Term II", type: "Homoeopathic Medicine" },
  { name: "X-Ray", term: "Term II", type: "Homoeopathic Medicine" }
];

const MEDICINES_4TH_BHMS: Medicine[] = [
  // Term I (39)
  { name: "Abies Canadensis", term: "Term I", type: "Homoeopathic Medicine" },
  { name: "Abies Nigra", term: "Term I", type: "Homoeopathic Medicine" },
  { name: "Abroma Augusta", term: "Term I", type: "Homoeopathic Medicine" },
  { name: "Abrotanum", term: "Term I", type: "Homoeopathic Medicine" },
  { name: "Acalypha Indica", term: "Term I", type: "Homoeopathic Medicine" },
  { name: "Artemisia Vulgaris", term: "Term I", type: "Homoeopathic Medicine" },
  { name: "Avena Sativa", term: "Term I", type: "Homoeopathic Medicine" },
  { name: "Blatta Orientalis", term: "Term I", type: "Homoeopathic Medicine" },
  { name: "Cedron", term: "Term I", type: "Homoeopathic Medicine" },
  { name: "Cicuta Virosa", term: "Term I", type: "Homoeopathic Medicine" },
  { name: "Condurango", term: "Term I", type: "Homoeopathic Medicine" },
  { name: "Corallium Rubrum", term: "Term I", type: "Homoeopathic Medicine" },
  { name: "Cuprum Metallicum", term: "Term I", type: "Homoeopathic Medicine" },
  { name: "Eupatorium Perfoliatum", term: "Term I", type: "Homoeopathic Medicine" },
  { name: "Justicia Adhatoda", term: "Term I", type: "Homoeopathic Medicine" },
  { name: "Lac Caninum", term: "Term I", type: "Homoeopathic Medicine" },
  { name: "Lac Defloratum", term: "Term I", type: "Homoeopathic Medicine" },
  { name: "Lobelia Inflata", term: "Term I", type: "Homoeopathic Medicine" },
  { name: "Magnesium Carbonicum", term: "Term I", type: "Homoeopathic Medicine" },
  { name: "Magnesium Muriaticum", term: "Term I", type: "Homoeopathic Medicine" },
  { name: "Mephitis", term: "Term I", type: "Homoeopathic Medicine" },
  { name: "Mercurius Corrosivus", term: "Term I", type: "Homoeopathic Medicine" },
  { name: "Mercurius Cyanatus", term: "Term I", type: "Homoeopathic Medicine" },
  { name: "Mercurius Dulcis", term: "Term I", type: "Homoeopathic Medicine" },
  { name: "Mercurius Solubilis", term: "Term I", type: "Homoeopathic Medicine" },
  { name: "Mercurius Sulphuricus", term: "Term I", type: "Homoeopathic Medicine" },
  { name: "Ocimum Sanctum", term: "Term I", type: "Homoeopathic Medicine" },
  { name: "Passiflora Incarnata", term: "Term I", type: "Homoeopathic Medicine" },
  { name: "Plumbum Metallicum", term: "Term I", type: "Homoeopathic Medicine" },
  { name: "Rheum", term: "Term I", type: "Homoeopathic Medicine" },
  { name: "Rumex Crispus", term: "Term I", type: "Homoeopathic Medicine" },
  { name: "Sabadilla", term: "Term I", type: "Homoeopathic Medicine" },
  { name: "Sambucus Nigra", term: "Term I", type: "Homoeopathic Medicine" },
  { name: "Sanicula Aqua", term: "Term I", type: "Homoeopathic Medicine" },
  { name: "Squilla Maritima", term: "Term I", type: "Homoeopathic Medicine" },
  { name: "Stannum Metallicum", term: "Term I", type: "Homoeopathic Medicine" },
  { name: "Sticta Pulmonaria", term: "Term I", type: "Homoeopathic Medicine" },
  { name: "Valeriana Officinalis", term: "Term I", type: "Homoeopathic Medicine" },
  { name: "Zincum Metallicum", term: "Term I", type: "Homoeopathic Medicine" },
  // Term II (37)
  { name: "Adonis Vernalis", term: "Term II", type: "Homoeopathic Medicine" },
  { name: "Amyl Nitrosum", term: "Term II", type: "Homoeopathic Medicine" },
  { name: "Anthracinum", term: "Term II", type: "Nosode" },
  { name: "Bacillinum", term: "Term II", type: "Nosode" },
  { name: "Baryta Muriaticum", term: "Term II", type: "Homoeopathic Medicine" },
  { name: "Calotropis", term: "Term II", type: "Homoeopathic Medicine" },
  { name: "Carbo Animalis", term: "Term II", type: "Homoeopathic Medicine" },
  { name: "Carcinocin", term: "Term II", type: "Nosode" },
  { name: "Carica Papaya", term: "Term II", type: "Homoeopathic Medicine" },
  { name: "Cassia Sophera", term: "Term II", type: "Homoeopathic Medicine" },
  { name: "Crataegus Oxyacantha", term: "Term II", type: "Homoeopathic Medicine" },
  { name: "Diphtherinum", term: "Term II", type: "Nosode" },
  { name: "Ficus Religiosa", term: "Term II", type: "Homoeopathic Medicine" },
  { name: "Glonoine", term: "Term II", type: "Homoeopathic Medicine" },
  { name: "Hydrocotyle Asiatica", term: "Term II", type: "Homoeopathic Medicine" },
  { name: "Jonosia Asoka", term: "Term II", type: "Homoeopathic Medicine" },
  { name: "Kalmia Latifolia", term: "Term II", type: "Homoeopathic Medicine" },
  { name: "Lyssinum (Hydrophobinum)", term: "Term II", type: "Nosode" },
  { name: "Malandrinum", term: "Term II", type: "Nosode" },
  { name: "Medorrhinum", term: "Term II", type: "Nosode" },
  { name: "Melilotus Alba", term: "Term II", type: "Homoeopathic Medicine" },
  { name: "Menyanthes Trifoliata", term: "Term II", type: "Homoeopathic Medicine" },
  { name: "Mezereum", term: "Term II", type: "Homoeopathic Medicine" },
  { name: "Psorinum", term: "Term II", type: "Nosode" },
  { name: "Pyrogenium", term: "Term II", type: "Nosode" },
  { name: "Ranunculus Bulbosus", term: "Term II", type: "Homoeopathic Medicine" },
  { name: "Rauwolfia Serpentina", term: "Term II", type: "Homoeopathic Medicine" },
  { name: "Rhododendron", term: "Term II", type: "Homoeopathic Medicine" },
  { name: "Sanguinaria Canadensis", term: "Term II", type: "Homoeopathic Medicine" },
  { name: "Spigelia", term: "Term II", type: "Homoeopathic Medicine" },
  { name: "Syphilinum", term: "Term II", type: "Nosode" },
  { name: "Syzygium Jambolanum", term: "Term II", type: "Homoeopathic Medicine" },
  { name: "Tuberculinum", term: "Term II", type: "Nosode" },
  { name: "Vaccininum", term: "Term II", type: "Nosode" },
  { name: "Variolinum", term: "Term II", type: "Nosode" },
  { name: "Veratrum Viride", term: "Term II", type: "Homoeopathic Medicine" },
  { name: "Vinca Minor", term: "Term II", type: "Homoeopathic Medicine" }
];

const MATERIA_MEDICA_YEARS_DATA: YearMateriaMedica[] = [
  {
    yearId: "1st",
    yearTitle: "First Professional BHMS",
    badge: "50 Remedies + 12 Biochemic Salts",
    preamble: "Foundation year introducing the principles, sources, drug proving methodology, construction of Materia Medica, 50 homoeopathic remedies across Terms I-III, and 12 biochemic tissue salts.",
    outcomes: [
      "Understand the historical evolution and sources of Homoeopathic Materia Medica.",
      "Master the science of drug provings, potencies, and symptom evaluation.",
      "Develop foundational knowledge of 50 core homoeopathic remedies.",
      "Understand Schussler's 12 Biochemic Tissue Salts and their clinical applications."
    ],
    hours: {
      theory: 120,
      practical: 75,
      total: 195,
      breakdown: [
        { label: "Theory Lectures & Drug Portraits", hours: 120 },
        { label: "Non-Lecture Practical / Case Discussions / Tutorials", hours: 75 }
      ]
    },
    assessment: {
      theoryMarks: 100,
      practicalMarks: 100,
      totalMarks: 200,
      papersCount: 1,
      details: "Single Theory Paper of 100 Marks (10 MCQs @ 1M, 8 SAQs @ 5M, 5 LAQs @ 10M) + Practical/Clinical/Viva Voce Examination (100 Marks)."
    },
    referenceBooks: [
      "Hahnemann S. - Materia Medica Pura (Vol I & II)",
      "Boericke W. - Pocket Manual of Homoeopathic Materia Medica",
      "Allen H.C. - Keynotes and Characteristics with Comparative HMM",
      "Schussler W.H. - The Twelve Tissue Remedies"
    ],
    medicines: MEDICINES_1ST_BHMS,
    units: [
      {
        id: "mm1_u1",
        number: 1,
        name: "Foundations & Construction of Materia Medica",
        chapters: [
          {
            id: "mm1_c1",
            number: 1,
            name: "Scope, Sources & Drug Proving Fundamentals",
            examPriority: "High",
            studyTime: "25 Hours",
            topics: [
              {
                id: "mm1_t1",
                name: "Definition, Scope & Nature of Homoeopathic Materia Medica",
                status: "Available",
                link: "/homoeopathy/materia-medica",
                resources: { notes: true, mcqs: true, viva: true },
                subtopics: ["Hahnemannian concepts", "Comparison with allopathic pharmacology", "Primary and secondary actions"]
              },
              {
                id: "mm1_t2",
                name: "Sources of Homoeopathic Medicines & Kingdoms",
                status: "Available",
                link: "/homoeopathy/materia-medica",
                resources: { notes: true, diagrams: true, clinical: true },
                subtopics: ["Plant kingdom", "Animal kingdom", "Mineral kingdom", "Sarcodes & Nosodes", "Imponderabilia"]
              }
            ]
          }
        ]
      },
      {
        id: "mm1_u2",
        number: 2,
        name: "50 Core Homoeopathic Remedies & 12 Tissue Salts",
        chapters: [
          {
            id: "mm1_c2",
            number: 2,
            name: "Term I, II & III Pharmacodynamics",
            examPriority: "High",
            studyTime: "95 Hours",
            topics: [
              {
                id: "mm1_t3",
                name: "Polychrest & Acute Remedy Portraits",
                status: "Available",
                link: "/homoeopathy/materia-medica",
                resources: { notes: true, mcqs: true, viva: true, clinical: true },
                subtopics: ["Aconite, Arnica, Belladonna, Bryonia, Calc Carb, Nux Vomica, Rhus Tox, Sulphur"]
              },
              {
                id: "mm1_t4",
                name: "The 12 Biochemic Tissue Salts of Schussler",
                status: "Available",
                link: "/homoeopathy/materia-medica",
                resources: { notes: true, mcqs: true, cheatsheets: true },
                subtopics: ["Calc Fluor, Calc Phos, Calc Sulph, Ferrum Phos, Kali Mur, Kali Phos, Kali Sulph, Mag Phos, Nat Mur, Nat Phos, Nat Sulph, Silicea"]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    yearId: "2nd",
    yearTitle: "Second Professional BHMS",
    badge: "48 Targeted Remedies",
    preamble: "Clinical integration phase correlating Homoeopathic Materia Medica with Pathology, Toxicology, Minor Surgery, and Obstetrics & Gynecology, studying 48 targeted remedies.",
    outcomes: [
      "Correlate pathological organ-system changes with homoeopathic drug pictures.",
      "Understand toxicological provings and accidental poisonings as sources of Materia Medica.",
      "Apply 48 specialized remedies in acute clinical settings.",
      "Differentiate similar remedies using comparative drug study techniques."
    ],
    hours: {
      theory: 150,
      practical: 100,
      total: 250,
      breakdown: [
        { label: "Theory Lectures & Comparative Studies", hours: 150 },
        { label: "Clinical Bedside / Case Discussions / Practical", hours: 100 }
      ]
    },
    assessment: {
      theoryMarks: 100,
      practicalMarks: 100,
      totalMarks: 200,
      papersCount: 1,
      details: "Theory Paper of 100 Marks (30% weightage from 1st BHMS, 70% from 2nd BHMS) + Practical/Clinical/Viva Voce Examination (100 Marks)."
    },
    referenceBooks: [
      "Boericke W. - New Manual of Homoeopathic Materia Medica",
      "Phatak S.R. - Materia Medica of Homoeopathic Medicines",
      "Nash E.B. - Leaders in Homoeopathic Therapeutics",
      "Clarke J.H. - Dictionary of Practical Materia Medica"
    ],
    medicines: MEDICINES_2ND_BHMS,
    units: [
      {
        id: "mm2_u1",
        number: 1,
        name: "Pathological Integration & Comparative Study",
        chapters: [
          {
            id: "mm2_c1",
            number: 1,
            name: "Pathology, Toxicology & Drug Relationships",
            examPriority: "High",
            studyTime: "50 Hours",
            topics: [
              {
                id: "mm2_t1",
                name: "Correlation of HMM with Pathological States",
                status: "Available",
                link: "/homoeopathy/materia-medica",
                resources: { notes: true, clinical: true },
                subtopics: ["Inflammatory cascades", "Tissue destruction", "Miasmatic expression in pathology"]
              }
            ]
          }
        ]
      },
      {
        id: "mm2_u2",
        number: 2,
        name: "48 Targeted Clinical Remedies",
        chapters: [
          {
            id: "mm2_c2",
            number: 2,
            name: "Term I & II Remedy Catalog",
            examPriority: "High",
            studyTime: "100 Hours",
            topics: [
              {
                id: "mm2_t2",
                name: "Detailed Drug Portraits (Argentum Nit, Causticum, Sepia, Thuja, etc.)",
                status: "Available",
                link: "/homoeopathy/materia-medica",
                resources: { notes: true, mcqs: true, pyqs: true },
                subtopics: ["Constitutional pictures", "Keynotes", "Modalities", "Relationships"]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    yearId: "3rd",
    yearTitle: "Third Professional BHMS",
    badge: "65 Group & Intermediate Remedies",
    preamble: "Advanced systematic study focusing on Group Studies (Acids, Metals, Natrums, Kalis, Calcareas, Sarcodes, Ophidia, Spiders), remedy relationships, concordances, diathesis, and miasmatic correlations across 65 remedies.",
    outcomes: [
      "Master chemical and family group characteristics (Acids, Metals, Ophidia, Spiders, Sarcodes).",
      "Analyze remedy relationships: complementary, antidote, inimical, and concordant.",
      "Integrate miasmatic diagnosis (Psora, Sycosis, Syphilis, Tubercular) with HMM.",
      "Apply 65 intermediate and polychrest remedies in clinical practice."
    ],
    hours: {
      theory: 150,
      practical: 50,
      total: 200,
      breakdown: [
        { label: "Theory Lectures & Group Analysis", hours: 150 },
        { label: "Non-Lecture Clinical / Case Studies", hours: 50 }
      ]
    },
    assessment: {
      theoryMarks: 100,
      practicalMarks: 100,
      totalMarks: 200,
      papersCount: 1,
      details: "Theory Paper of 100 Marks (30% weightage from I & II BHMS, 70% from III BHMS) + Practical/Clinical/Viva Voce Examination (100 Marks)."
    },
    referenceBooks: [
      "Farrington E.A. - Clinical Materia Medica",
      "Kent J.T. - Lectures on Homoeopathic Materia Medica",
      "Boger C.M. - Synoptic Key of Materia Medica",
      "Tyler M.L. - Homoeopathic Drug Pictures"
    ],
    medicines: MEDICINES_3RD_BHMS,
    units: [
      {
        id: "mm3_u1",
        number: 1,
        name: "Group Studies & Miasmatic Correlations",
        chapters: [
          {
            id: "mm3_c1",
            number: 1,
            name: "Chemical, Mineral & Animal Group Studies",
            examPriority: "High",
            studyTime: "60 Hours",
            topics: [
              {
                id: "mm3_t1",
                name: "Acid Group, Metal Group, Kalis, Calcareas, Natrums",
                status: "Available",
                link: "/homoeopathy/materia-medica",
                resources: { notes: true, mcqs: true, viva: true },
                subtopics: ["Common group characteristics", "Comparative individual differentiation", "Miasmatic affinity"]
              },
              {
                id: "mm3_t2",
                name: "Ophidia (Snakes), Spider Group & Sarcodes",
                status: "Available",
                link: "/homoeopathy/materia-medica",
                resources: { notes: true, clinical: true },
                subtopics: ["Lachesis, Crotalus, Naja", "Tarentula, Aranea", "Thyroidinum, Adrenaline"]
              }
            ]
          }
        ]
      },
      {
        id: "mm3_u2",
        number: 2,
        name: "65 Intermediate & Polychrest Remedy Portraits",
        chapters: [
          {
            id: "mm3_c2",
            number: 2,
            name: "Term I & II Comprehensive Drug Studies",
            examPriority: "High",
            studyTime: "90 Hours",
            topics: [
              {
                id: "mm3_t3",
                name: "Detailed Drug Studies (Conium, Lachesis, Nitric Acid, Phosphoric Acid, Staphysagria, etc.)",
                status: "Available",
                link: "/homoeopathy/materia-medica",
                resources: { notes: true, mcqs: true, pyqs: true },
                subtopics: ["Mind generals", "Physical generals", "Particulars", "Clinical indications"]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    yearId: "4th",
    yearTitle: "Fourth Professional BHMS",
    badge: "76+ Advanced Clinical Remedies & Dual Papers",
    preamble: "Peak clinical year integrating Practice of Medicine, Community Health, Surgery, ObGyn with HMM. Mastery includes Nosodes as intercurrent remedies, Mother Tinctures in clinical practice, Magnesiums, Metals, and major botanical families (Compositae, Loganaceae, Solanaceae, Ranunculaceae, Cucurbitaceae, Liliaceae, Papaveraceae). Assessed via Dual Theory Papers.",
    outcomes: [
      "Master group characteristics of Nosodes, Metals, Magnesiums, and major Plant Families.",
      "Apply Mother Tinctures safely and effectively in clinical practice.",
      "Correlate repertorial rubrics and case repertorization with HMM.",
      "Formulate advanced drug portraits and comparative differentiation across all 4 BHMS years."
    ],
    hours: {
      theory: 200,
      practical: 83,
      total: 283,
      breakdown: [
        { label: "Entry Behavior Review (I, II, III BHMS)", hours: 2 },
        { label: "Concept of Nosodes & Intercurrent Remedies", hours: 3 },
        { label: "Scope of Mother Tinctures in Practice", hours: 2 },
        { label: "Metals, Magnesiums & Plant Family Studies", hours: 18 },
        { label: "Clinical Integration with PM & Surgery", hours: 5 },
        { label: "Study of Drugs Term I (39 Drugs)", hours: 85 },
        { label: "Study of Drugs Term II (37 Drugs)", hours: 85 },
        { label: "Non-Lecture Clinical Bedside", hours: 58 },
        { label: "Seminars, Tutorials & Case-Based Learning", hours: 25 }
      ]
    },
    assessment: {
      theoryMarks: 200,
      practicalMarks: 100,
      vivaMarks: 80,
      internalAssessment: 20,
      totalMarks: 400,
      papersCount: 2,
      details: "Grand Total 400 Marks: Theory Paper I (100M) + Theory Paper II (100M) = 200 Marks. Practical/Clinical (100M) + Viva Voce (80M) + Internal Assessment (20M).",
      paperDetails: [
        {
          name: "Theory Paper I (100 Marks)",
          description: "Covers entry behavior & foundations of I, II, III BHMS + group indications & Paper I drugs.",
          marks: 100,
          format: "10 MCQs @ 1M = 10M, 8 SAQs @ 5M = 40M, 5 LAQs @ 10M = 50M (Total 100M)"
        },
        {
          name: "Theory Paper II (100 Marks)",
          description: "Covers Nosodes, Metals, Plant Family studies, Mother Tinctures, and 76 IV BHMS drugs.",
          marks: 100,
          format: "10 MCQs @ 1M = 10M, 8 SAQs @ 5M = 40M, 5 LAQs @ 10M = 50M (Total 100M)"
        }
      ]
    },
    referenceBooks: [
      "Julian O.A. (2005) - Julian's Materia Medica of Nosodes with Repertory",
      "Boericke W. (2007) - Boericke's New Manual of Homoeopathic Materia Medica with Repertory",
      "Phatak S.R. (2001) - Materia Medica of Homoeopathic Medicines",
      "Lesser Otto (2019) - Text Book of Homoeopathic Materia Medica",
      "Allen H.C. - Keynotes and Characteristics with Comparative Materia Medica",
      "Kent J.T. - Lectures on Homoeopathic Materia Medica"
    ],
    medicines: MEDICINES_4TH_BHMS,
    units: [
      {
        id: "mm4_u1",
        number: 1,
        name: "Preamble & Advanced Clinical Integration",
        chapters: [
          {
            id: "mm4_c1",
            number: 1,
            name: "Entry Behavior & Cross-Discipline Mappings",
            examPriority: "High",
            studyTime: "12 Hours",
            topics: [
              {
                id: "mm4_t1",
                name: "Integration of HMM with Practice of Medicine, Surgery & ObGyn",
                status: "Available",
                link: "/homoeopathy/materia-medica",
                resources: { notes: true, clinical: true, pyqs: true },
                subtopics: ["Therapeutic prescribings", "Acute emergency remedies", "Pathological prescribing limitations"]
              }
            ]
          }
        ]
      },
      {
        id: "mm4_u2",
        number: 2,
        name: "Nosodes, Intercurrent Remedies & Mother Tinctures",
        chapters: [
          {
            id: "mm4_c2",
            number: 2,
            name: "The Miasmatic Nosodes & Clinical Mother Tinctures",
            examPriority: "High",
            studyTime: "25 Hours",
            topics: [
              {
                id: "mm4_t2",
                name: "Study of Major Nosodes (Psorinum, Medorrhinum, Syphilinum, Tuberculinum, Carcinocin, Pyrogenium, Lyssinum, Bacillinum, Anthracinum, Diphtherinum)",
                status: "Available",
                link: "/homoeopathy/materia-medica",
                resources: { notes: true, mcqs: true, viva: true, clinical: true },
                subtopics: ["Indications as intercurrent remedies", "Miasmatic blocking states", "Nosode posology"]
              },
              {
                id: "mm4_t3",
                name: "Scope & Clinical Application of Mother Tinctures",
                status: "Available",
                link: "/homoeopathy/materia-medica",
                resources: { notes: true, clinical: true, cheatsheets: true },
                subtopics: ["Passiflora, Avena Sativa, Rauwolfia, Crataegus, Syzygium, Calotropis, Hydrocotyle"]
              }
            ]
          }
        ]
      },
      {
        id: "mm4_u3",
        number: 3,
        name: "Botanical Family Studies & Metal/Magnesium Groups",
        chapters: [
          {
            id: "mm4_c3",
            number: 3,
            name: "Compositae, Solanaceae, Ranunculaceae, Liliaceae, Metals & Magnesiums",
            examPriority: "High",
            studyTime: "30 Hours",
            topics: [
              {
                id: "mm4_t4",
                name: "Major Botanical Plant Families & Group Characteristics",
                status: "Available",
                link: "/homoeopathy/materia-medica",
                resources: { notes: true, diagrams: true, mcqs: true },
                subtopics: ["Compositae family", "Solanaceae family", "Ranunculaceae family", "Liliaceae family", "Papaveraceae family"]
              },
              {
                id: "mm4_t5",
                name: "Metals & Magnesium Group Comparison",
                status: "Available",
                link: "/homoeopathy/materia-medica",
                resources: { notes: true, mcqs: true, viva: true },
                subtopics: ["Cuprum, Plumbum, Stannum, Zincum", "Mag Carb, Mag Mur, Mag Phos"]
              }
            ]
          }
        ]
      },
      {
        id: "mm4_u4",
        number: 4,
        name: "76+ Advanced Clinical Remedies (Term I & II)",
        chapters: [
          {
            id: "mm4_c4",
            number: 4,
            name: "Term I (39 Drugs) & Term II (37 Drugs) Full Catalog",
            examPriority: "High",
            studyTime: "170 Hours",
            topics: [
              {
                id: "mm4_t6",
                name: "Term I Clinical Remedies (Abies Can, Abrotanum, Cicuta, Eupatorium, Mercurius salts, Plumbum, Rumex, Sabadilla, Zincum, etc.)",
                status: "Available",
                link: "/homoeopathy/materia-medica",
                resources: { notes: true, mcqs: true, pyqs: true, clinical: true },
                subtopics: ["Drug portraits", "Clinical indications", "Comparative differentiation"]
              },
              {
                id: "mm4_t7",
                name: "Term II Clinical Remedies & Nosodes (Anthracinum, Carcinocin, Diphtherinum, Lyssinum, Psorinum, Pyrogenium, Syphilinum, Tuberculinum, Sanguinaria, Spigelia, Veratrum Vir, Vinca Minor)",
                status: "Available",
                link: "/homoeopathy/materia-medica",
                resources: { notes: true, mcqs: true, pyqs: true, clinical: true },
                subtopics: ["Advanced clinical drug pictures", "Dual paper exam preparation", "Viva voce high-yields"]
              }
            ]
          }
        ]
      }
    ]
  }
];

// ----------------------------------------------------
// All BHMS Course Syllabus (General Subjects Database)
// ----------------------------------------------------
const CBDC_SYLLABUS_DATA: YearSyllabus[] = [
  {
    year: "1st BHMS",
    title: "First Professional BHMS",
    duration: "1 Year",
    description: "Foundational year focusing on Human Anatomy, Physiology, Homoeopathic Pharmacy, and introductory Organon & Materia Medica.",
    subjects: [
      {
        id: "materia1",
        name: "Homoeopathic Materia Medica - I",
        description: "Introduction to basic Materia Medica, drug provings, sources, 50 homoeopathic remedies, and 12 biochemic tissue salts.",
        theoryHours: 120,
        practicalHours: 75,
        nonLectureHours: 0,
        examPattern: { theoryPapers: 1, theoryMarks: 100, practicalMarks: 100, internalAssessment: 50, totalMarks: 250 },
        books: ["Hahnemann's Materia Medica Pura", "Boericke's Pocket Manual of HMM", "Allen's Keynotes with Comparative HMM"],
        pearls: "Focus on 50 remedies + 12 biochemic tissue salts. Master keynotes and primary drug sources."
      },
      {
        id: "anatomy",
        name: "Anatomy (Paper I & II)",
        description: "Detailed study of gross anatomy, osteology, histology, embryology, neuroanatomy, and regional dissection.",
        theoryHours: 200,
        practicalHours: 150,
        nonLectureHours: 50,
        examPattern: { theoryPapers: 2, theoryMarks: 200, practicalMarks: 100, internalAssessment: 50, totalMarks: 350 },
        books: ["BD Chaurasia's Human Anatomy (Vol 1-4)", "Gray's Anatomy for Students", "Vishram Singh Clinical Anatomy"],
        pearls: "Correlate anatomical structures with surface marking and clinical presentations like nerve palsies and referred pain."
      },
      {
        id: "physiology",
        name: "Physiology & Biochemistry",
        description: "Systemic human physiology covering cardiovascular, nervous, endocrine, renal, respiratory, and metabolic biochemical pathways.",
        theoryHours: 200,
        practicalHours: 150,
        nonLectureHours: 50,
        examPattern: { theoryPapers: 2, theoryMarks: 200, practicalMarks: 100, internalAssessment: 50, totalMarks: 350 },
        books: ["Guyton & Hall Textbook of Medical Physiology", "AK Jain Physiology", "Harper's Illustrated Biochemistry"],
        pearls: "Focus on feedback loops, cardiac cycle phases, action potential graphs, and endocrine axis regulation."
      },
      {
        id: "pharmacy",
        name: "Homoeopathic Pharmacy",
        description: "Principles of pharmacognosy, drug preparation, potentisation, vehicles, drug proving, and pharmacopoeia standards.",
        theoryHours: 100,
        practicalHours: 100,
        nonLectureHours: 30,
        examPattern: { theoryPapers: 1, theoryMarks: 100, practicalMarks: 100, internalAssessment: 50, totalMarks: 250 },
        books: ["M. Bhattacharyya's Homoeopathic Pharmacy", "Dr. D.D. Banerjee Textbook of Homoeopathic Pharmacy", "HPIS (Homoeopathic Pharmacopoeia of India)"],
        pearls: "Master decimal and centesimal scales of potentisation, trituration steps, and prescription writing legal norms."
      },
      {
        id: "organon1",
        name: "Organon of Medicine - I",
        description: "Aphorisms 1 to 145, cardinal principles of Homoeopathy, history of medicine, health, disease, and cure concepts.",
        theoryHours: 100,
        practicalHours: 50,
        nonLectureHours: 30,
        examPattern: { theoryPapers: 1, theoryMarks: 100, practicalMarks: 100, internalAssessment: 50, totalMarks: 250 },
        books: ["Organon of Medicine by Samuel Hahnemann (6th Edition)", "BK Sarkar Commentary on Organon", "Stuart Close Genius of Homoeopathy"],
        pearls: "Focus on Aphorisms 1-7 (Highest Ideal of Cure, Mission of Physician, Vital Force) and Similia Similibus Curentur."
      }
    ]
  },
  {
    year: "2nd BHMS",
    title: "Second Professional BHMS",
    duration: "1 Year",
    description: "Clinical transition year emphasizing Pathology, Microbiology, Forensic Medicine, Toxicology, Materia Medica - II, Organon - II, Repertory - II, Practice of Medicine - I, Surgery - I, and Gynaecology & Obstetrics - I.",
    subjects: [
      {
        id: "pathology",
        name: "Pathology & Microbiology (HomUG-Path-M)",
        description: "General Pathology, Systemic Tissue Changes, Hematology, Bacteriology, Virology, Parasitology, Mycology & Laboratory Diagnostics.",
        theoryHours: 200,
        practicalHours: 60,
        nonLectureHours: 20,
        examPattern: { theoryPapers: 2, theoryMarks: 200, practicalMarks: 80, internalAssessment: 20, totalMarks: 400 },
        books: ["Robbins & Cotran Pathologic Basis of Disease", "Harsh Mohan Pathology", "Ananthanarayan & Paniker Microbiology"],
        pearls: "Master vascular/cellular events in inflammation, neoplasia staging, Gram staining, CBC hemogram analysis, and miasmatic cleavage (Psora/Sycosis/Syphilis)."
      },
      {
        id: "fmt",
        name: "Forensic Medicine & Toxicology (HomUG-FMT)",
        description: "Medical Jurisprudence, Thanatology, Injuries, Autopsy, Forensic Psychiatry, Toxicology, Legal Acts (Bhartiya Nyaya Sanhita) & Antidotes.",
        theoryHours: 120,
        practicalHours: 35,
        nonLectureHours: 15,
        examPattern: { theoryPapers: 1, theoryMarks: 100, practicalMarks: 50, internalAssessment: 10, totalMarks: 200 },
        books: ["KS Narayan Reddy The Essentials of Forensic Medicine", "Modi Medical Jurisprudence and Toxicology"],
        pearls: "Memorize legal inquest procedures, post-mortem rigor mortis timelines, firearm ballistics, toxicological antidotes, and medical ethics."
      },
      {
        id: "materia2",
        name: "Homoeopathic Materia Medica - II (HomUG-HMM-II)",
        description: "Comprehensive drug pictures of 48 polychrest & clinical remedies integrated with Pathology, Toxicology, Surgery, ObGyn, and comparative drug study.",
        theoryHours: 150,
        practicalHours: 75,
        nonLectureHours: 25,
        examPattern: { theoryPapers: 1, theoryMarks: 100, practicalMarks: 50, internalAssessment: 10, totalMarks: 200 },
        books: ["Boericke New Manual of HMM", "Phatak Materia Medica of Homoeopathic Medicines", "Nash Leaders in Homoeopathic Therapeutics"],
        pearls: "Study 48 remedies (Acetic Acid to Veratrum Album) with special focus on keynotes, organ affinities, modalities, and comparative drug relationships."
      },
      {
        id: "organon2",
        name: "Organon of Medicine - II (HomUG-OM-II)",
        description: "Hahnemannian philosophy (§28–§104), Therapeutic Law of Nature, Classification of Diseases, Miasms, Case Taking, Systems of Medicine & Suppression.",
        theoryHours: 150,
        practicalHours: 75,
        nonLectureHours: 25,
        examPattern: { theoryPapers: 1, theoryMarks: 100, practicalMarks: 50, internalAssessment: 10, totalMarks: 200 },
        books: ["Hahnemann Organon of Medicine (5th & 6th Ed)", "Hahnemann Chronic Diseases", "JH Allen Chronic Miasms"],
        pearls: "Understand Psora as fundamental cause of functional disease, Sycosis as overgrowth/infiltration, and Syphilis as destruction/ulceration."
      },
      {
        id: "repertory2",
        name: "Homoeopathic Repertory & Case Taking - II (HomUG-R-II)",
        description: "Structure & plan of Boericke's Repertory, acute & chronic case taking instructions (§83–103), pathology in repertory, and miasmatic rubrics.",
        theoryHours: 50,
        practicalHours: 20,
        nonLectureHours: 10,
        examPattern: { theoryPapers: 0, theoryMarks: 0, practicalMarks: 0, internalAssessment: 50, totalMarks: 50 },
        books: ["Boericke Pocket Manual of Homoeopathic Materia Medica & Repertory", "Kent Repertory of Homoeopathic Materia Medica"],
        pearls: "Practice rubric hunting in Boericke's Repertory and construct symptom totalities for acute and chronic bedside cases."
      },
      {
        id: "practice1",
        name: "Practice of Medicine - I (HomUG PM-I)",
        description: "Clinico-pathological evaluation of common signs & symptoms, Immunity & Susceptibility, Medical Genetics, and 35 Infectious/Tropical diseases with Therapeutics.",
        theoryHours: 80,
        practicalHours: 18,
        nonLectureHours: 6,
        examPattern: { theoryPapers: 0, theoryMarks: 0, practicalMarks: 0, internalAssessment: 50, totalMarks: 50 },
        books: ["Davidson Principles & Practice of Medicine", "Harrison Principles of Internal Medicine"],
        pearls: "Master bedside clinical examination, differential diagnosis of tropical fevers, and homoeopathic therapeutics for acute infections."
      },
      {
        id: "surgery1",
        name: "Surgery - I (HomUG-Sur-I)",
        description: "General Surgery principles, Trauma, Head/Chest/Abdominal Injuries, Wound Healing, Shock, Fluids, Burns, Infections, Tumours, Hernias & Ulcers.",
        theoryHours: 92,
        practicalHours: 18,
        nonLectureHours: 6,
        examPattern: { theoryPapers: 0, theoryMarks: 0, practicalMarks: 0, internalAssessment: 50, totalMarks: 50 },
        books: ["SRB Manual of Surgery", "Bailey & Love Short Practice of Surgery"],
        pearls: "Understand wound healing phases, Glasgow Coma Scale in head injuries, Rule of Nines in burns, surgical infections, and pre/post-operative care."
      },
      {
        id: "obgyn1",
        name: "Gynaecology & Obstetrics - I (HomUG-ObGy-I)",
        description: "Applied Anatomy & Physiology, Menstrual Disorders, AUB, Menopause, Displacements, Intersexuality, Pregnancy Diagnosis, Antenatal Care & Normal Labour.",
        theoryHours: 100,
        practicalHours: 18,
        nonLectureHours: 6,
        examPattern: { theoryPapers: 0, theoryMarks: 0, practicalMarks: 0, internalAssessment: 50, totalMarks: 50 },
        books: ["DC Dutta Textbook of Obstetrics", "DC Dutta Textbook of Gynecology"],
        pearls: "Master the HPO axis, normal labour mechanisms (Stages I–IV), antenatal care protocols, and homoeopathic management of pregnancy ailments."
      }
    ]
  },
  {
    year: "3rd BHMS",
    title: "Third Professional BHMS",
    duration: "1 Year",
    description: "Clinical mastery covering Surgery, Obstetrics & Gynecology, Homoeopathic Therapeutics, Organon - III, and Materia Medica - III.",
    subjects: [
      {
        id: "materia3",
        name: "Homoeopathic Materia Medica - III",
        description: "Group studies (Sarcodes, Acids, Metals, Natrums, Kalis, Calcareas, Ophidia, Spiders), remedy relationships, and 65 remedies.",
        theoryHours: 150,
        practicalHours: 50,
        nonLectureHours: 20,
        examPattern: { theoryPapers: 1, theoryMarks: 100, practicalMarks: 100, internalAssessment: 50, totalMarks: 250 },
        books: ["Farrington Clinical Materia Medica", "Kent's Lectures on HMM", "Boger's Synoptic Key"],
        pearls: "Master 65 remedies along with group characteristics of Acids, Metals, Kalis, Natrums, and Snake venoms."
      },
      {
        id: "surgery",
        name: "Surgery & Homoeopathic Therapeutics",
        description: "General surgery, operative techniques, orthopedics, dentistry, ENT, ophthalmology, and non-operative homoeopathic management.",
        theoryHours: 200,
        practicalHours: 150,
        nonLectureHours: 50,
        examPattern: { theoryPapers: 2, theoryMarks: 200, practicalMarks: 100, internalAssessment: 50, totalMarks: 350 },
        books: ["Bailey & Love Short Practice of Surgery", "S. Das Manual on Clinical Surgery", "JG Gilchrist Homoeopathic Surgery"],
        pearls: "Differentiate surgical emergencies requiring operative intervention vs homoeopathically manageable sub-acute conditions."
      },
      {
        id: "obgyn",
        name: "Obstetrics & Gynaecology",
        description: "Normal pregnancy, labor, high-risk obstetrics, gynecological disorders, neonatal care, and homoeopathic therapeutics.",
        theoryHours: 200,
        practicalHours: 150,
        nonLectureHours: 50,
        examPattern: { theoryPapers: 2, theoryMarks: 200, practicalMarks: 100, internalAssessment: 50, totalMarks: 350 },
        books: ["DC Dutta Textbook of Obstetrics", "Shaw's Textbook of Gynaecology", "Yingling Accoucheur's Emergency Manual"],
        pearls: "Master partograph stages, antenatal checkup protocols, PPH management, dysmenorrhea remedies, and prolapse therapeutics."
      }
    ]
  },
  {
    year: "4th BHMS",
    title: "Fourth Professional BHMS",
    duration: "1 Year",
    description: "Peak clinical year detailing Practice of Medicine, Repertorisation techniques, Community Health, and advanced medicine.",
    subjects: [
      {
        id: "materia4",
        name: "Homoeopathic Materia Medica - IV",
        description: "Advanced clinical drug studies, 76+ remedies across Term I & II, Nosodes, Mother Tinctures, Plant Families, and Dual Papers.",
        theoryHours: 200,
        practicalHours: 83,
        nonLectureHours: 25,
        examPattern: { theoryPapers: 2, theoryMarks: 200, practicalMarks: 100, internalAssessment: 100, totalMarks: 400 },
        books: ["Julian's Materia Medica of Nosodes", "Boericke's New Manual of HMM", "Phatak's Materia Medica"],
        pearls: "Prepare for Dual Theory Papers (200M total) covering 76+ remedies, Nosodes, Mother Tinctures, and plant families."
      },
      {
        id: "practice",
        name: "Practice of Medicine",
        description: "General systemic medicine, cardiology, pulmonology, endocrine, gastroenterology, dermatology, psychiatry, and medical therapeutics.",
        theoryHours: 300,
        practicalHours: 250,
        nonLectureHours: 100,
        examPattern: { theoryPapers: 2, theoryMarks: 200, practicalMarks: 100, internalAssessment: 100, totalMarks: 400 },
        books: ["Davidson's Principles of Medicine", "Harrison's Internal Medicine", "Alok Sen's Practice of Medicine"],
        pearls: "Integrate clinical system diagnostics with constitutional homoeopathic remedies. Focus on asthma, stroke, and diabetes."
      },
      {
        id: "repertory",
        name: "Repertory & Case Taking",
        description: "Mathematical structures of rubrics, case-taking analysis, evaluations, and computer-aided software repertorisation.",
        theoryHours: 150,
        practicalHours: 120,
        nonLectureHours: 50,
        examPattern: { theoryPapers: 1, theoryMarks: 100, practicalMarks: 100, internalAssessment: 50, totalMarks: 250 },
        books: ["Kent's Repertory of HMM", "Boger's Boenninghausen's Characteristics", "Kishore's Card Repertory"],
        pearls: "Master Kent's philosophical structure of symptoms (mental general -> physical general -> particular) and Boenninghausen's complete symptom concepts."
      }
    ]
  }
];

// Fallback curriculum tree for general subjects
const SUBJECT_CURRICULUM_DATA: Record<string, Unit[]> = {
  anatomy: [
    {
      id: "an_u1",
      number: 1,
      name: "General Anatomy, Osteology & Arthrology",
      chapters: [
        {
          id: "an_c1",
          number: 1,
          name: "Anatomical Terminology, Epithelia & Connective Tissues",
          examPriority: "High",
          studyTime: "10 Hours",
          topics: [
            {
              id: "an_t1",
              name: "Anatomical positions, planes, and directional terms",
              status: "Available",
              link: "/bhms-course/first-bhms/anatomy",
              resources: { notes: true, diagrams: true, viva: true },
              subtopics: ["Coronal, sagittal, and transverse planes", "Medial vs lateral, proximal vs distal", "Supine and prone positioning definitions"]
            }
          ]
        }
      ]
    }
  ]
};

const SUBJECT_GLOSSARY_DATA: Record<string, GlossaryTerm[]> = {
  anatomy: [
    { term: "Osteon", definition: "The fundamental functional unit of compact bone, consisting of concentric lamellae surrounding a central canal.", type: "Osteology" },
    { term: "Mediastinum", definition: "The central compartment of the thoracic cavity located between the two pleural cavities, containing the heart, esophagus, and major vessels.", type: "Thorax" }
  ]
};

const SUBJECT_ROADMAP_DATA: Record<string, RoadmapStep[]> = {
  anatomy: [
    { step: 1, title: "General Anatomy & Planes", priority: "Medium", duration: "4 Hours", objective: "Understand foundational planes, skeletal groupings, and joint classifications." },
    { step: 2, title: "Upper Limb & Axillary Anatomy", priority: "High", duration: "14 Hours", objective: "Master pectoral muscles, mammary glands, and the brachial plexus layout." }
  ]
};

const SUBJECT_CROSSLINKS: Record<string, CrossLink[]> = {
  anatomy: [
    { title: "Physiology: Cardiovascular Mechanics", path: "/bhms-course/first-bhms/physiology", type: "Functional link" }
  ]
};

// ----------------------------------------------------
// Main Component: CbdcSyllabus
// ----------------------------------------------------
export default function CbdcSyllabus() {
  // Top View Mode State: 'materia-medica' (featured) vs 'all-subjects'
  const [primaryViewMode, setPrimaryViewMode] = useState<'materia-medica' | 'all-subjects'>('materia-medica');

  // Materia Medica View Mode: 'single' (focused active year) vs 'all' (continuous expanded 1st-4th BHMS)
  const [mmDisplayMode, setMmDisplayMode] = useState<'single' | 'all'>('single');

  // Materia Medica Sticky Year Tab State ('1st' | '2nd' | '3rd' | '4th')
  const [activeMmYearId, setActiveMmYearId] = useState<'1st' | '2nd' | '3rd' | '4th'>('1st');

  // Materia Medica Year Sub-Tab State
  const [activeMmSubTab, setActiveMmSubTab] = useState<'content' | 'overview' | 'hours' | 'assessment' | 'books' | 'modules'>('content');

  // Remedy Term Filter ('All' | 'Term I' | 'Term II' | 'Term III')
  const [remedyTermFilter, setRemedyTermFilter] = useState<string>('All');

  // Real-time Global Search Query for Remedies & Topics across all 4 BHMS years
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Expandable States for BHMS Years, Remedy Units, and Syllabus Chapters
  const [expandedYears, setExpandedYears] = useState<Record<string, boolean>>({
    '1st': true, '2nd': true, '3rd': true, '4th': true
  });
  const [expandedUnits, setExpandedUnits] = useState<Record<string, boolean>>({
    mm1_u1: true, mm1_u2: true, mm2_u1: true, mm3_u1: true, mm4_u1: true, mm4_u2: true,
    '1st_remedies': true, '2nd_remedies': true, '3rd_remedies': true, '4th_remedies': true
  });
  const [expandedChapters, setExpandedChapters] = useState<Record<string, boolean>>({
    mm1_c1: true, mm1_c2: true, mm2_c1: true, mm3_c1: true, mm4_c1: true, mm4_c2: true
  });

  // General Subjects View State
  const [selectedYearIndex, setSelectedYearIndex] = useState<number>(0);
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(CBDC_SYLLABUS_DATA[0].subjects[0].id);
  const [activeSidebarSection, setActiveSidebarSection] = useState<string>('overview');

  // Interactive Topic & Remedy Study Modals
  const [activeStudyTopic, setActiveStudyTopic] = useState<TopicStudyDetail | null>(null);
  const [activeStudyRemedy, setActiveStudyRemedy] = useState<any | null>(null);

  const toggleUnit = (unitKey: string) => {
    setExpandedUnits(prev => ({
      ...prev,
      [unitKey]: prev[unitKey] === false ? true : false
    }));
  };

  const toggleChapter = (chapKey: string) => {
    setExpandedChapters(prev => ({
      ...prev,
      [chapKey]: prev[chapKey] === false ? true : false
    }));
  };

  const toggleYear = (yearId: string) => {
    setExpandedYears(prev => ({
      ...prev,
      [yearId]: !prev[yearId]
    }));
  };

  const handleOpenTopic = (top: Topic, chapName?: string, unitName?: string, subjectName?: string, yearName?: string) => {
    // 1. Direct key match
    if (CBDC_TOPIC_STUDY_DATABASE[top.id]) {
      setActiveStudyTopic(CBDC_TOPIC_STUDY_DATABASE[top.id]);
      return;
    }

    // 2. Fuzzy match in database
    const foundKey = Object.keys(CBDC_TOPIC_STUDY_DATABASE).find(k => {
      const item = CBDC_TOPIC_STUDY_DATABASE[k];
      const title = (item.topicTitle || item.name || '').toLowerCase();
      const search = top.name.toLowerCase();
      return title.includes(search) || search.includes(title);
    });
    if (foundKey && CBDC_TOPIC_STUDY_DATABASE[foundKey]) {
      setActiveStudyTopic(CBDC_TOPIC_STUDY_DATABASE[foundKey]);
      return;
    }

    // 3. Fallback route lookup
    const subKey = Object.keys(SUBJECT_ROUTE_MAPPINGS).find(k => 
      subjectName?.toLowerCase().includes(k) || (subjectName && SUBJECT_ROUTE_MAPPINGS[k].name.toLowerCase().includes(subjectName.toLowerCase()))
    ) || 'pathology';
    const subConfig = SUBJECT_ROUTE_MAPPINGS[subKey] || {
      code: 'NCH-CBDC',
      name: subjectName || 'BHMS Subject',
      year: yearName || 'BHMS',
      mainRoute: '/subjects',
      portalRoute: '/portal/1st-bhms',
      blueprintRoute: '/university-blueprints',
      mcqRoute: '/aiapget-mcq-simulator'
    };

    // 4. Dynamic comprehensive study profile
    const dynamicDetail: TopicStudyDetail = {
      topicId: top.id,
      topicTitle: top.name,
      subjectCode: subConfig.code,
      subjectName: subConfig.name,
      year: subConfig.year,
      competencyDomain: 'Cognitive & Clinical Application',
      competencyLevel: 'Must Know (K/KH/SH)',
      teachingHours: '4–6 Hours',
      studyHubLink: subConfig.mainRoute,
      overview: `Official NCH Competency-Based Dynamic Curriculum (CBDC) study module for "${top.name}". This module covers essential theoretical definitions, diagnostic evaluation, physiological/pathological mechanisms, and clinical homoeopathic management.`,
      whyItMatters: `A clear understanding of ${top.name} is vital for developing accurate clinical diagnosis, understanding disease progression, passing university written and viva voce examinations, and prescribing indicated homoeopathic remedies based on totality.`,
      coreConcepts: top.subtopics && top.subtopics.length > 0 
        ? top.subtopics.map(st => `Detailed clinical examination, structural correlation, and practical management of: ${st}.`)
        : [
            `Fundamental definitions, etiology, classification and staging parameters of ${top.name}.`,
            `Pathophysiological mechanisms, structural tissue changes and symptom manifestation.`,
            `Diagnostic criteria, laboratory investigations, clinical signs and differential diagnosis.`
          ],
      clinicalPearls: [
        `Assess the complete symptom totality, modalities, and individual constitution rather than treating the named pathology in isolation.`,
        `Differentiate acute functional presentations (Psora) from destructive/suppressive organic lesions (Syphilis / Sycosis).`,
        `Recognize red-flag danger signs requiring urgent hospital stabilization or operative surgical intervention.`
      ],
      examBlueprint: {
        longAnswerQuestions: [
          `Discuss the etiopathogenesis, clinical features, diagnostic evaluation and homoeopathic management of ${top.name}. (10 Marks)`,
          `Describe the differential diagnosis, systemic investigations, and prognostic staging of ${top.name}. (10 Marks)`
        ],
        shortAnswerQuestions: [
          `Write short notes on the clinical classification and diagnostic criteria of ${top.name}. (5 Marks)`,
          `Highlight the indications for 3 key homoeopathic remedies in ${top.name}. (5 Marks)`
        ],
        vivaVoceQuestions: [
          `What is the definition and primary clinical sign of ${top.name}?`,
          `How do you differentiate this condition from its closest clinical mimic in bedside examination?`
        ]
      },
      referenceTextbooks: [
        'NCH Prescribed Standard Subject Textbooks',
        'Curiva Homoeopathy High-Yield Clinical Handbooks & Blueprints'
      ]
    };

    setActiveStudyTopic(dynamicDetail);
  };

  const handleOpenRemedy = (remedyName: string, term?: string, yearTitle?: string) => {
    const cleanName = remedyName.toLowerCase().replace(/[^a-z0-9]/g, '');
    const match = (materiaMedicaData as any[]).find((r: any) => 
      r.id?.toLowerCase().replace(/[^a-z0-9]/g, '') === cleanName ||
      r.name?.toLowerCase().includes(remedyName.toLowerCase()) ||
      remedyName.toLowerCase().includes(r.name?.toLowerCase())
    );

    if (match) {
      setActiveStudyRemedy(match);
    } else {
      setActiveStudyRemedy({
        id: cleanName,
        name: remedyName,
        commonName: 'Homoeopathic Remedy',
        family: 'Prescribed in NCH CBDC Syllabus',
        source: 'Materia Medica',
        thermalState: 'Thermal & Modality Specific',
        miasm: 'Psora / Sycosis / Syphilis',
        keynotes: [
          `Official NCH CBDC prescribed remedy for ${yearTitle || 'BHMS Curriculum'}.`,
          'Constitutional, keynote, and modal therapeutic profile.',
          'Requires complete symptom totality, modalities, and miasmatic evaluation.'
        ],
        mind: [
          'Characteristic mental generals, anxieties, fears, and irritability or apathy.',
          'Emotional triggers and cognitive state under disease stress.'
        ],
        physicalGeneral: [
          'Organ affinities, thirst, hunger, sleep, thermal reaction, and side affinity.',
          'Characteristic discharges, sensations (burning, stitching, throbbing), and periodicities.'
        ],
        modalities: {
          aggravation: 'Weather changes, time modalities, motion or rest',
          amelioration: 'Rest, open air, warm applications, discharges'
        },
        clinical: [
          'Acute emergencies, constitutional ailments, sub-acute pathologies and first-line prescribing.'
        ]
      });
    }
  };

  // Copy Feedback State
  const [copiedText, setCopiedText] = useState<boolean>(false);

  // Completed Remedies State (stored in LocalStorage)
  const [completedRemedies, setCompletedRemedies] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('curiva_completed_remedies');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Completed Topics State
  const [completedTopics, setCompletedTopics] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('cbdc_completed_topics');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Bookmarked Topics State
  const [bookmarkedTopics, setBookmarkedTopics] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('cbdc_bookmarked_topics');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Save to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('curiva_completed_remedies', JSON.stringify(completedRemedies));
    } catch (e) {
      console.error(e);
    }
  }, [completedRemedies]);

  useEffect(() => {
    try {
      localStorage.setItem('cbdc_completed_topics', JSON.stringify(completedTopics));
    } catch (e) {
      console.error(e);
    }
  }, [completedTopics]);

  useEffect(() => {
    try {
      localStorage.setItem('cbdc_bookmarked_topics', JSON.stringify(bookmarkedTopics));
    } catch (e) {
      console.error(e);
    }
  }, [bookmarkedTopics]);

  // Global Real-time Search Engine across all 4 BHMS years (remedies, units, chapters, topics)
  const globalSearchResults = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) {
      return {
        isSearching: false,
        grandTotalMatches: 0,
        matchesByYear: {
          '1st': { count: 0, medicines: [], matchedUnits: [] },
          '2nd': { count: 0, medicines: [], matchedUnits: [] },
          '3rd': { count: 0, medicines: [], matchedUnits: [] },
          '4th': { count: 0, medicines: [], matchedUnits: [] },
        }
      };
    }

    let grandTotalMatches = 0;
    const matchesByYear: Record<'1st' | '2nd' | '3rd' | '4th', { count: number; medicines: Medicine[]; matchedUnits: Unit[] }> = {
      '1st': { count: 0, medicines: [], matchedUnits: [] },
      '2nd': { count: 0, medicines: [], matchedUnits: [] },
      '3rd': { count: 0, medicines: [], matchedUnits: [] },
      '4th': { count: 0, medicines: [], matchedUnits: [] },
    };

    MATERIA_MEDICA_YEARS_DATA.forEach(year => {
      // Filter Remedies
      const matchedMeds = year.medicines.filter(m =>
        m.name.toLowerCase().includes(query) ||
        m.type.toLowerCase().includes(query) ||
        m.term.toLowerCase().includes(query)
      );

      // Filter Units & Chapters/Topics
      const matchedUnits: Unit[] = [];
      let topicMatchCount = 0;

      year.units.forEach(unit => {
        const uMatches = unit.name.toLowerCase().includes(query);
        const matchedChaps: Chapter[] = [];

        unit.chapters.forEach(chap => {
          const cMatches = chap.name.toLowerCase().includes(query);
          const matchedTops = chap.topics.filter(top =>
            top.name.toLowerCase().includes(query) ||
            top.subtopics.some(st => st.toLowerCase().includes(query)) ||
            top.status.toLowerCase().includes(query)
          );

          if (cMatches || matchedTops.length > 0) {
            matchedChaps.push({
              ...chap,
              topics: cMatches ? chap.topics : matchedTops
            });
            topicMatchCount += cMatches ? chap.topics.length : matchedTops.length;
          }
        });

        if (uMatches || matchedChaps.length > 0) {
          matchedUnits.push({
            ...unit,
            chapters: uMatches ? unit.chapters : matchedChaps
          });
        }
      });

      const totalYearCount = matchedMeds.length + matchedUnits.length + topicMatchCount;
      grandTotalMatches += totalYearCount;

      matchesByYear[year.yearId] = {
        count: totalYearCount,
        medicines: matchedMeds,
        matchedUnits
      };
    });

    return {
      isSearching: true,
      grandTotalMatches,
      matchesByYear
    };
  }, [searchQuery]);

  // Auto-expand matching sections during search
  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const newExpandedUnits: Record<string, boolean> = { ...expandedUnits };
      const newExpandedChapters: Record<string, boolean> = { ...expandedChapters };

      MATERIA_MEDICA_YEARS_DATA.forEach(year => {
        newExpandedUnits[`${year.yearId}_remedies`] = true;
        year.units.forEach(u => {
          newExpandedUnits[u.id] = true;
          u.chapters.forEach(c => {
            newExpandedChapters[c.id] = true;
          });
        });
      });

      setExpandedUnits(newExpandedUnits);
      setExpandedChapters(newExpandedChapters);
    }
  }, [searchQuery]);

  // Expand / Collapse All Helper
  const toggleAllUnits = (expand: boolean) => {
    const newUnits: Record<string, boolean> = {};
    const newChaps: Record<string, boolean> = {};
    const newYears: Record<string, boolean> = {};

    MATERIA_MEDICA_YEARS_DATA.forEach(year => {
      newYears[year.yearId] = expand;
      newUnits[`${year.yearId}_remedies`] = expand;
      newUnits[`${year.yearId}_overview`] = expand;
      newUnits[`${year.yearId}_assessment`] = expand;
      year.units.forEach(u => {
        newUnits[u.id] = expand;
        u.chapters.forEach(c => {
          newChaps[c.id] = expand;
        });
      });
    });

    setExpandedYears(newYears);
    setExpandedUnits(newUnits);
    setExpandedChapters(newChaps);
  };

  // Active Year Data for Materia Medica
  const activeMmData = useMemo(() => {
    return MATERIA_MEDICA_YEARS_DATA.find(y => y.yearId === activeMmYearId) || MATERIA_MEDICA_YEARS_DATA[0];
  }, [activeMmYearId]);

  // Filtered Remedies for active Materia Medica Year
  const filteredMedicines = useMemo(() => {
    return activeMmData.medicines.filter(med => {
      const matchesTerm = remedyTermFilter === 'All' || med.term === remedyTermFilter;
      const matchesSearch = med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            med.type.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTerm && matchesSearch;
    });
  }, [activeMmData, remedyTermFilter, searchQuery]);

  // Remedy Progress Stats for Active Year
  const yearRemedyProgress = useMemo(() => {
    const total = activeMmData.medicines.length;
    const completedCount = activeMmData.medicines.filter(m => !!completedRemedies[`${activeMmData.yearId}_${m.name}`]).length;
    const percentage = total > 0 ? Math.round((completedCount / total) * 100) : 0;
    return { total, completedCount, percentage };
  }, [activeMmData, completedRemedies]);

  // Total All BHMS Remedy Stats (251 Remedies Total)
  const totalBhmsRemedyStats = useMemo(() => {
    let total = 0;
    let completed = 0;
    MATERIA_MEDICA_YEARS_DATA.forEach(year => {
      year.medicines.forEach(m => {
        total++;
        if (completedRemedies[`${year.yearId}_${m.name}`]) completed++;
      });
    });
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { total, completed, percentage };
  }, [completedRemedies]);

  // General Subject Resolution
  const activeYearData = CBDC_SYLLABUS_DATA[selectedYearIndex];
  const activeSubject = useMemo(() => {
    const found = activeYearData.subjects.find(s => s.id === selectedSubjectId);
    if (found) return found;
    const fallback = activeYearData.subjects[0];
    setSelectedSubjectId(fallback.id);
    return fallback;
  }, [selectedYearIndex, selectedSubjectId, activeYearData]);

  const activeCurriculum = useMemo(() => {
    return SUBJECT_CURRICULUM_DATA[activeSubject.id] || [];
  }, [activeSubject]);

  const activeGlossary = useMemo(() => {
    return SUBJECT_GLOSSARY_DATA[activeSubject.id] || SUBJECT_GLOSSARY_DATA.anatomy;
  }, [activeSubject]);

  const activeRoadmap = useMemo(() => {
    return SUBJECT_ROADMAP_DATA[activeSubject.id] || SUBJECT_ROADMAP_DATA.anatomy;
  }, [activeSubject]);

  const activeCrosslinks = useMemo(() => {
    return SUBJECT_CROSSLINKS[activeSubject.id] || SUBJECT_CROSSLINKS.anatomy;
  }, [activeSubject]);

  // Toggles
  const toggleRemedyCompletion = (remedyKey: string) => {
    setCompletedRemedies(prev => ({ ...prev, [remedyKey]: !prev[remedyKey] }));
  };

  const toggleTopicCompletion = (topicId: string) => {
    setCompletedTopics(prev => ({ ...prev, [topicId]: !prev[topicId] }));
  };

  const toggleTopicBookmark = (topicId: string) => {
    setBookmarkedTopics(prev => ({ ...prev, [topicId]: !prev[topicId] }));
  };

  const toggleUnitExpansion = (unitId: string) => {
    setExpandedUnits(prev => ({ ...prev, [unitId]: !prev[unitId] }));
  };

  const toggleChapterExpansion = (chapId: string) => {
    setExpandedChapters(prev => ({ ...prev, [chapId]: !prev[chapId] }));
  };

  const handleCopySyllabus = () => {
    const summary = `Curiva Homoeopathy - Materia Medica ${activeMmData.yearTitle}\nTotal Remedies: ${activeMmData.medicines.length}\nTheory Hours: ${activeMmData.hours.theory} | Practical: ${activeMmData.hours.practical}\nExam Total: ${activeMmData.assessment.totalMarks} Marks`;
    navigator.clipboard.writeText(summary);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2500);
  };

  const scrollToSection = (id: string) => {
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary pb-20 selection:bg-primary/20">
      
      {/* ----------------------------------------------------
          SEO METADATA & BREADCRUMBS
         ---------------------------------------------------- */}
      <SEO 
        title="NCH BHMS Materia Medica & CBDC Syllabus | 1st to 4th Year Curriculum"
        description="Official NCH Competency-Based Dynamic Curriculum for BHMS 1st, 2nd, 3rd, and 4th Year Homoeopathic Materia Medica. Complete 251 remedies, teaching hours, dual paper structure, and exam blueprints."
        keywords="BHMS Syllabus, NCH Curriculum, Homoeopathic Materia Medica Syllabus, 1st BHMS remedies, 4th BHMS dual papers, NCH AYUSH guidelines, Materia Medica curriculum"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-2">
        <Breadcrumbs />
      </div>

      {/* ----------------------------------------------------
          1. HERO HEADER SECTION
         ---------------------------------------------------- */}
      <header className="relative bg-gradient-to-b from-primary/10 via-primary/5 to-transparent border-b border-border/40 pt-8 pb-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-6">
          
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-bold uppercase tracking-widest shadow-sm">
              <GraduationCap className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>NCH &amp; AYUSH Official Competency Curriculum</span>
            </div>

            <div className="text-right">
              <span className="text-[10px] font-mono uppercase text-text-tertiary block font-bold">Brand Motto</span>
              <span className="text-xs font-serif font-semibold italic text-primary">"Tiny Doses. True Shifts."</span>
            </div>
          </div>

          <div className="space-y-3 max-w-4xl">
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-text-primary tracking-tight leading-tight">
              BHMS Homoeopathic Materia Medica &amp; CBDC Curriculum Hub
            </h1>
            <p className="text-sm sm:text-base text-text-secondary leading-relaxed font-medium">
              National Commission for Homoeopathy (NCH) &amp; Ministry of AYUSH aligned syllabus hub. Delineating complete 1st–4th BHMS remedy catalogs, theory/practical teaching hours, exam paper blueprints, and interactive progress tracking.
            </p>
          </div>

          {/* Quick Header Metric Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 max-w-3xl">
            <div className="p-3.5 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-border/50 rounded-2xl shadow-sm">
              <span className="text-[9px] uppercase font-black tracking-wider text-text-tertiary block">Total Remedies</span>
              <span className="text-base font-black text-primary block mt-0.5">251 Medicines</span>
              <span className="text-[10px] text-emerald-600 font-bold">1st–4th BHMS</span>
            </div>
            <div className="p-3.5 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-border/50 rounded-2xl shadow-sm">
              <span className="text-[9px] uppercase font-black tracking-wider text-text-tertiary block">Overall Progress</span>
              <span className="text-base font-black text-emerald-600 block mt-0.5">{totalBhmsRemedyStats.percentage}%</span>
              <span className="text-[10px] text-text-tertiary font-medium">{totalBhmsRemedyStats.completed} / {totalBhmsRemedyStats.total} Mastered</span>
            </div>
            <div className="p-3.5 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-border/50 rounded-2xl shadow-sm">
              <span className="text-[9px] uppercase font-black tracking-wider text-text-tertiary block">Materia Theory Hours</span>
              <span className="text-base font-black text-text-primary block mt-0.5">620 Hours</span>
              <span className="text-[10px] text-text-tertiary font-medium">+308 Clinical Hrs</span>
            </div>
            <div className="p-3.5 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-border/50 rounded-2xl shadow-sm">
              <span className="text-[9px] uppercase font-black tracking-wider text-text-tertiary block">4th BHMS Exams</span>
              <span className="text-base font-black text-rose-600 dark:text-rose-400 block mt-0.5">400 Marks</span>
              <span className="text-[10px] text-text-tertiary font-medium">Dual Theory Papers</span>
            </div>
          </div>

          {/* MAIN PRIMARY VIEW SWITCHER */}
          <div className="pt-4 flex flex-wrap gap-2 border-t border-border/40">
            <button
              onClick={() => setPrimaryViewMode('materia-medica')}
              className={`px-5 py-2.5 rounded-2xl text-xs font-extrabold transition-all flex items-center gap-2 cursor-pointer ${
                primaryViewMode === 'materia-medica'
                  ? "bg-primary text-white shadow-soft shadow-primary/20 scale-[1.02]"
                  : "bg-white/90 dark:bg-zinc-900 text-text-secondary hover:bg-bg-tertiary border border-border/50"
              }`}
            >
              <Pill className="w-4 h-4" />
              <span>Homoeopathic Materia Medica (1st to 4th BHMS)</span>
              <span className="px-2 py-0.5 rounded-full bg-white/20 text-[9px] uppercase font-mono">Featured</span>
            </button>

            <button
              onClick={() => setPrimaryViewMode('all-subjects')}
              className={`px-5 py-2.5 rounded-2xl text-xs font-extrabold transition-all flex items-center gap-2 cursor-pointer ${
                primaryViewMode === 'all-subjects'
                  ? "bg-primary text-white shadow-soft shadow-primary/20 scale-[1.02]"
                  : "bg-white/90 dark:bg-zinc-900 text-text-secondary hover:bg-bg-tertiary border border-border/50"
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>All BHMS Subjects Curriculum (Anatomy, Physiology, etc.)</span>
            </button>
          </div>

        </div>
      </header>

      {/* ====================================================
          VIEW MODE 1: MATERIA MEDICA SYLLABUS HUB
         ==================================================== */}
      {primaryViewMode === 'materia-medica' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-8 space-y-8">
          
          {/* ====================================================
              1. STICKY REAL-TIME SEARCH & BHMS YEAR NAVIGATION
             ==================================================== */}
          <div className="sticky top-16 sm:top-20 z-40 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md p-3 sm:p-4 rounded-3xl border border-border/70 shadow-lg space-y-3 transition-all">
            
            {/* REAL-TIME GLOBAL SEARCH BAR */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
              <input
                type="text"
                placeholder="Search all 251 remedies, units, & topics across 1st, 2nd, 3rd, & 4th BHMS (e.g. Aconite, Nosode, Biochemic, Polycrest, Dual Paper)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-24 py-3 bg-bg-secondary/60 focus:bg-white dark:focus:bg-zinc-900 border border-border/60 rounded-2xl text-xs text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/40 shadow-xs transition-all font-medium"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="px-2 py-1 rounded-lg text-xs bg-bg-tertiary hover:bg-border text-text-secondary cursor-pointer font-bold transition-all flex items-center gap-1"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Clear</span>
                  </button>
                )}
              </div>
            </div>

            {/* STICKY BHMS YEAR NAVIGATION TABS & PROGRESS */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {MATERIA_MEDICA_YEARS_DATA.map(year => {
                const isActive = activeMmYearId === year.yearId;
                const completedInYear = year.medicines.filter(m => !!completedRemedies[`${year.yearId}_${m.name}`]).length;
                const progressPct = Math.round((completedInYear / year.medicines.length) * 100);
                const yearMatchCount = globalSearchResults.isSearching 
                  ? globalSearchResults.matchesByYear[year.yearId].count 
                  : 0;

                return (
                  <button
                    key={year.yearId}
                    onClick={() => {
                      setActiveMmYearId(year.yearId);
                      const targetElem = document.getElementById(`bhms-year-${year.yearId}`);
                      if (targetElem) {
                        targetElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }}
                    className={`p-3 rounded-2xl text-left transition-all cursor-pointer flex flex-col justify-between border ${
                      isActive
                        ? "bg-primary text-white shadow-md border-primary/40 ring-2 ring-primary/20"
                        : "bg-bg-secondary/50 hover:bg-bg-secondary text-text-primary border-border/40"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span className={`text-xs font-black uppercase tracking-wider ${isActive ? "text-white" : "text-text-primary"}`}>
                        {year.yearId} BHMS
                      </span>
                      
                      {/* Search match badge or year badge */}
                      {globalSearchResults.isSearching && yearMatchCount > 0 ? (
                        <span className="px-2 py-0.5 rounded-full bg-amber-400 text-amber-950 font-black text-[9px] animate-pulse shrink-0">
                          {yearMatchCount} match{yearMatchCount > 1 ? 'es' : ''}
                        </span>
                      ) : (
                        <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full font-bold shrink-0 ${
                          isActive ? "bg-white/20 text-white" : "bg-primary/10 text-primary"
                        }`}>
                          {year.badge}
                        </span>
                      )}
                    </div>

                    <div className="mt-2 space-y-1">
                      <div className="flex items-center justify-between text-[10px]">
                        <span className={isActive ? "text-white/80" : "text-text-tertiary"}>Mastery</span>
                        <span className={`font-mono font-bold ${isActive ? "text-white" : "text-emerald-600 dark:text-emerald-400"}`}>
                          {progressPct}% ({completedInYear}/{year.medicines.length})
                        </span>
                      </div>
                      <div className={`w-full h-1.5 rounded-full overflow-hidden ${isActive ? "bg-white/20" : "bg-border/40"}`}>
                        <div 
                          className={`h-full transition-all duration-300 ${isActive ? "bg-white" : "bg-emerald-500"}`} 
                          style={{ width: `${progressPct}%` }} 
                        />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* CONTROLS BAR: VIEW MODE TOGGLE & EXPAND / COLLAPSE ALL */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border/30 pt-2 text-xs">
              
              {/* Search results banner if searching */}
              {globalSearchResults.isSearching ? (
                <div className="flex items-center gap-2 text-primary font-bold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>
                    Found {globalSearchResults.grandTotalMatches} result{globalSearchResults.grandTotalMatches === 1 ? '' : 's'} for "{searchQuery}"
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-text-tertiary font-medium text-[11px]">
                  <Compass className="w-3.5 h-3.5 text-primary" />
                  <span>Interactive 1st to 4th BHMS Syllabus &amp; Expandable Modules</span>
                </div>
              )}

              <div className="flex items-center gap-2 shrink-0">
                {/* View Mode Switcher */}
                <div className="flex items-center bg-bg-secondary p-1 rounded-xl border border-border/50">
                  <button
                    onClick={() => setMmDisplayMode('single')}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold cursor-pointer transition-all ${
                      mmDisplayMode === 'single'
                        ? "bg-white dark:bg-zinc-800 text-primary shadow-xs"
                        : "text-text-tertiary hover:text-text-primary"
                    }`}
                  >
                    Active Year Focus
                  </button>
                  <button
                    onClick={() => setMmDisplayMode('all')}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold cursor-pointer transition-all ${
                      mmDisplayMode === 'all'
                        ? "bg-white dark:bg-zinc-800 text-primary shadow-xs"
                        : "text-text-tertiary hover:text-text-primary"
                    }`}
                  >
                    All 4 Years View
                  </button>
                </div>

                {/* Expand / Collapse All Units */}
                <button
                  onClick={() => toggleAllUnits(true)}
                  className="px-2.5 py-1 bg-bg-secondary hover:bg-bg-tertiary text-text-secondary border border-border/50 rounded-xl text-[10px] font-bold cursor-pointer transition-all"
                  title="Expand all remedy units and syllabus modules"
                >
                  Expand All
                </button>
                <button
                  onClick={() => toggleAllUnits(false)}
                  className="px-2.5 py-1 bg-bg-secondary hover:bg-bg-tertiary text-text-secondary border border-border/50 rounded-xl text-[10px] font-bold cursor-pointer transition-all"
                  title="Collapse all remedy units and syllabus modules"
                >
                  Collapse All
                </button>
              </div>

            </div>

          </div>

          {/* ====================================================
              2. MATERIA MEDICA SYLLABUS SECTIONS (1st - 4th BHMS)
             ==================================================== */}
          <div className="space-y-8">
            {MATERIA_MEDICA_YEARS_DATA
              .filter(year => mmDisplayMode === 'all' || year.yearId === activeMmYearId)
              .map(year => {
                const isYearExpanded = expandedYears[year.yearId] !== false;
                const completedInYear = year.medicines.filter(m => !!completedRemedies[`${year.yearId}_${m.name}`]).length;
                const progressPct = Math.round((completedInYear / year.medicines.length) * 100);

                // Filtered medicines for this year
                const yearMeds = globalSearchResults.isSearching
                  ? globalSearchResults.matchesByYear[year.yearId].medicines
                  : year.medicines.filter(m => remedyTermFilter === 'All' || m.term === remedyTermFilter);

                const yearUnits = globalSearchResults.isSearching
                  ? globalSearchResults.matchesByYear[year.yearId].matchedUnits
                  : year.units;

                return (
                  <div 
                    key={year.yearId}
                    id={`bhms-year-${year.yearId}`}
                    className="bg-white dark:bg-zinc-950 border border-border/50 rounded-[2.5rem] p-6 sm:p-8 shadow-sm space-y-6 scroll-mt-36"
                  >
                    {/* SECTION HEADER BAR */}
                    <div className="sticky top-[152px] sm:top-[160px] z-30 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md pt-3 pb-4 -mx-2 px-2 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/40">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-extrabold uppercase tracking-wider">
                            Official NCH Curriculum
                          </span>
                          <span className="text-xs text-text-tertiary font-mono">
                            Subject Code: HMM-{year.yearId.toUpperCase()}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold font-mono">
                            {year.medicines.length} Remedies
                          </span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-black text-text-primary">
                          {year.yearTitle} Homoeopathic Materia Medica
                        </h2>
                        <p className="text-xs sm:text-sm text-text-secondary leading-relaxed max-w-3xl">
                          {year.preamble}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => {
                            setExpandedYears(prev => ({ ...prev, [year.yearId]: !isYearExpanded }));
                          }}
                          className="px-4 py-2 bg-bg-secondary hover:bg-bg-tertiary text-text-primary border border-border/60 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
                        >
                          <ChevronDown className={`w-4 h-4 text-text-tertiary transition-transform ${isYearExpanded ? 'rotate-180' : ''}`} />
                          <span>{isYearExpanded ? 'Collapse Year' : 'Expand Year'}</span>
                        </button>
                      </div>
                    </div>

                    <AnimatePresence initial={false}>
                      {isYearExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="space-y-6 pt-2"
                        >

                          {/* ----------------------------------------------------
                              COLLAPSIBLE UNIT 1: REMEDY CATALOG & MEDICINES GRID
                             ---------------------------------------------------- */}
                          {(() => {
                            const remediesUnitKey = `${year.yearId}_remedies`;
                            const isRemediesOpen = expandedUnits[remediesUnitKey] !== false;

                            return (
                              <div className="border border-border/50 rounded-2xl overflow-hidden shadow-xs bg-bg-secondary/20">
                                
                                {/* Unit Header */}
                                <button
                                  onClick={() => setExpandedUnits(prev => ({ ...prev, [remediesUnitKey]: !isRemediesOpen }))}
                                  className="w-full p-4 bg-bg-secondary/60 hover:bg-bg-secondary flex flex-wrap items-center justify-between gap-3 cursor-pointer text-left border-b border-border/40 transition-colors"
                                >
                                  <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                      <Pill className="w-4 h-4" />
                                    </div>
                                    <div>
                                      <h3 className="text-sm font-bold text-text-primary">
                                        Remedy Catalog &amp; Drug Portraits ({yearMeds.length} / {year.medicines.length})
                                      </h3>
                                      <p className="text-[10px] text-text-tertiary">
                                        NCH prescribed medicines, term allocation, &amp; preparation progress
                                      </p>
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-3">
                                    <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                                      {completedInYear}/{year.medicines.length} Mastered ({progressPct}%)
                                    </span>
                                    <ChevronDown className={`w-4 h-4 text-text-tertiary transition-transform ${isRemediesOpen ? 'rotate-180' : ''}`} />
                                  </div>
                                </button>

                                <AnimatePresence initial={false}>
                                  {isRemediesOpen && (
                                    <motion.div
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: 'auto', opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      className="p-4 sm:p-5 space-y-5"
                                    >
                                      {/* Term Filter Bar inside Remedy Unit */}
                                      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/30 pb-3">
                                        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                                          <span className="text-[10px] font-black uppercase text-text-tertiary shrink-0 mr-1">Term Filter:</span>
                                          {['All', 'Term I', 'Term II', 'Term III'].map(term => (
                                            <button
                                              key={term}
                                              onClick={() => setRemedyTermFilter(term)}
                                              className={`px-3 py-1 rounded-xl text-xs font-extrabold shrink-0 transition-all cursor-pointer ${
                                                remedyTermFilter === term
                                                  ? "bg-primary/15 text-primary border border-primary/30"
                                                  : "bg-bg-secondary text-text-tertiary hover:text-text-primary"
                                              }`}
                                            >
                                              {term}
                                            </button>
                                          ))}
                                        </div>

                                        <div className="text-[10px] text-text-tertiary font-mono">
                                          Showing {yearMeds.length} remedy cards
                                        </div>
                                      </div>

                                      {/* Remedy Grid */}
                                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                                        {yearMeds.map((med, idx) => {
                                          const remedyKey = `${year.yearId}_${med.name}`;
                                          const isDone = !!completedRemedies[remedyKey];

                                          return (
                                            <div 
                                              key={idx}
                                              className={`p-4 rounded-2xl border transition-all flex flex-col justify-between gap-3 ${
                                                isDone
                                                  ? "bg-emerald-500/5 border-emerald-500/30 text-text-primary"
                                                  : "bg-white dark:bg-zinc-900 hover:border-primary/30 border-border/50 shadow-xs"
                                              }`}
                                            >
                                              <div className="space-y-2">
                                                <div className="flex items-start justify-between gap-2">
                                                  {/* Checkbox */}
                                                  <button
                                                    onClick={() => toggleRemedyCompletion(remedyKey)}
                                                    className="focus:outline-none cursor-pointer mt-0.5 shrink-0"
                                                    title={isDone ? "Mark as unlearned" : "Mark as mastered"}
                                                  >
                                                    {isDone ? (
                                                      <CheckSquare2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                                                    ) : (
                                                      <div className="w-5 h-5 rounded-md border border-border flex items-center justify-center bg-bg-secondary hover:border-primary" />
                                                    )}
                                                  </button>

                                                  <div className="min-w-0 flex-grow pl-1">
                                                    <h3 className={`text-xs font-extrabold leading-snug truncate ${isDone ? "line-through text-text-tertiary" : "text-text-primary"}`}>
                                                      <HighlightText text={med.name} query={searchQuery} />
                                                    </h3>
                                                    <span className="text-[9px] uppercase font-bold text-text-tertiary block mt-0.5">
                                                      <HighlightText text={med.type} query={searchQuery} />
                                                    </span>
                                                  </div>

                                                  <span className="px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider bg-primary/10 text-primary border border-primary/20 shrink-0">
                                                    {med.term}
                                                  </span>
                                                </div>
                                              </div>

                                              <div className="flex items-center justify-between border-t border-border/30 pt-2.5 text-[10px]">
                                                <span className="text-text-tertiary font-mono">
                                                  BHMS {year.yearId} Year
                                                </span>
                                                <div className="flex items-center gap-2">
                                                  <button 
                                                    type="button"
                                                    onClick={() => handleOpenRemedy(med.name, med.term, year.yearTitle)}
                                                    className="font-bold text-primary hover:underline flex items-center gap-1 cursor-pointer"
                                                  >
                                                    <span>Quick Study</span>
                                                    <Sparkles className="w-3 h-3 text-amber-500" />
                                                  </button>
                                                  <Link 
                                                    to="/homoeopathy/materia-medica"
                                                    className="font-bold text-text-secondary hover:text-primary flex items-center gap-0.5 cursor-pointer"
                                                  >
                                                    <span>Hub</span>
                                                    <ChevronRight className="w-3 h-3" />
                                                  </Link>
                                                </div>
                                              </div>
                                            </div>
                                          );
                                        })}
                                      </div>

                                      {yearMeds.length === 0 && (
                                        <div className="text-center py-8 bg-bg-secondary/40 border border-dashed border-border/60 rounded-2xl space-y-2">
                                          <Info className="w-6 h-6 text-text-tertiary mx-auto" />
                                          <p className="text-xs font-bold text-text-primary">No remedies matched in {year.yearId} BHMS.</p>
                                        </div>
                                      )}

                                    </motion.div>
                                  )}
                                </AnimatePresence>

                              </div>
                            );
                          })()}


                          {/* ----------------------------------------------------
                              COLLAPSIBLE UNIT 2: NCH SYLLABUS UNITS & MODULES
                             ---------------------------------------------------- */}
                          <div className="space-y-3">
                            <h3 className="text-xs font-bold uppercase tracking-wider text-text-tertiary">
                              {year.yearId} BHMS Curriculum Units &amp; Topic Modules
                            </h3>

                            {yearUnits.map(unit => {
                              const isUnitOpen = expandedUnits[unit.id] !== false;

                              return (
                                <div key={unit.id} className="border border-border/50 rounded-2xl overflow-hidden shadow-xs bg-bg-secondary/20">
                                  
                                  {/* Unit Header */}
                                  <button
                                    onClick={() => toggleUnitExpansion(unit.id)}
                                    className="w-full text-left p-4 bg-bg-secondary/40 hover:bg-bg-secondary flex items-center justify-between cursor-pointer border-b border-border/40 transition-colors"
                                  >
                                    <div className="flex items-center gap-3">
                                      <span className="w-7 h-7 rounded-lg bg-primary/10 text-primary text-[10px] font-black flex items-center justify-center shrink-0">
                                        U{unit.number}
                                      </span>
                                      <h4 className="text-xs font-bold text-text-primary">
                                        <HighlightText text={unit.name} query={searchQuery} />
                                      </h4>
                                    </div>
                                    <ChevronDown className={`w-4 h-4 text-text-tertiary transition-transform ${isUnitOpen ? 'rotate-180' : ''}`} />
                                  </button>

                                  <AnimatePresence initial={false}>
                                    {isUnitOpen && (
                                      <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="p-4 space-y-4"
                                      >
                                        {unit.chapters.map(chap => {
                                          const isChapOpen = expandedChapters[chap.id] !== false;

                                          return (
                                            <div key={chap.id} className="p-3.5 bg-white dark:bg-zinc-900 rounded-2xl border border-border/50 space-y-3">
                                              
                                              {/* Chapter Header */}
                                              <button
                                                onClick={() => toggleChapterExpansion(chap.id)}
                                                className="w-full text-left flex items-center justify-between cursor-pointer"
                                              >
                                                <div>
                                                  <span className="text-[9px] uppercase font-mono font-bold text-text-tertiary block">
                                                    Chapter {chap.number} • Priority: {chap.examPriority} ({chap.studyTime})
                                                  </span>
                                                  <h5 className="text-xs font-bold text-text-primary mt-0.5">
                                                    <HighlightText text={chap.name} query={searchQuery} />
                                                  </h5>
                                                </div>
                                                <ChevronDown className={`w-3.5 h-3.5 text-text-tertiary transition-transform ${isChapOpen ? 'rotate-180' : ''}`} />
                                              </button>

                                              {/* Nested Topics List */}
                                              <AnimatePresence initial={false}>
                                                {isChapOpen && (
                                                  <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    className="space-y-2.5 pl-3 border-l-2 border-primary/20 pt-1"
                                                  >
                                                    {chap.topics.map(top => (
                                                      <div 
                                                        key={top.id} 
                                                        onClick={() => handleOpenTopic(top, chap.name, unit.name, 'Homoeopathic Materia Medica', year.yearTitle)}
                                                        className="p-3 bg-bg-secondary/30 hover:bg-primary/5 hover:border-primary/40 rounded-xl border border-border/30 text-xs space-y-1.5 cursor-pointer transition-all group"
                                                      >
                                                        <div className="flex items-center justify-between gap-2">
                                                          <span className="font-bold text-text-primary group-hover:text-primary transition-colors flex items-center gap-1.5">
                                                            <HighlightText text={top.name} query={searchQuery} />
                                                            <Sparkles className="w-3 h-3 text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                          </span>
                                                          <div className="flex items-center gap-1.5 shrink-0">
                                                            <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[9px] font-bold">
                                                              {top.status}
                                                            </span>
                                                            <span className="text-[10px] text-primary font-bold hidden sm:inline-block">
                                                              Study Notes &rarr;
                                                            </span>
                                                          </div>
                                                        </div>

                                                        {top.subtopics && top.subtopics.length > 0 && (
                                                          <div className="flex flex-wrap gap-1 pt-1">
                                                            {top.subtopics.map((st, sidx) => (
                                                              <span key={sidx} className="px-2 py-0.5 rounded-md bg-bg-secondary text-[9px] text-text-secondary border border-border/40 font-medium">
                                                                <HighlightText text={st} query={searchQuery} />
                                                              </span>
                                                            ))}
                                                          </div>
                                                        )}
                                                      </div>
                                                    ))}
                                                  </motion.div>
                                                )}
                                              </AnimatePresence>

                                            </div>
                                          );
                                        })}
                                      </motion.div>
                                    )}
                                  </AnimatePresence>

                                </div>
                              );
                            })}
                          </div>


                          {/* ----------------------------------------------------
                              COLLAPSIBLE UNIT 3: EXAMINATION BLUEPRINT & HOURS
                             ---------------------------------------------------- */}
                          {(() => {
                            const evalUnitKey = `${year.yearId}_assessment`;
                            const isEvalOpen = expandedUnits[evalUnitKey] === true;

                            return (
                              <div className="border border-border/50 rounded-2xl overflow-hidden shadow-xs bg-bg-secondary/20">
                                <button
                                  onClick={() => setExpandedUnits(prev => ({ ...prev, [evalUnitKey]: !isEvalOpen }))}
                                  className="w-full p-4 bg-bg-secondary/60 hover:bg-bg-secondary flex items-center justify-between cursor-pointer text-left border-b border-border/40 transition-colors"
                                >
                                  <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
                                      <Award className="w-4 h-4" />
                                    </div>
                                    <div>
                                      <h3 className="text-sm font-bold text-text-primary">
                                        Exam Blueprint &amp; Teaching Hours ({year.assessment.totalMarks} Marks | {year.hours.total} Hours)
                                      </h3>
                                      <p className="text-[10px] text-text-tertiary">
                                        NCH theory papers, practical clinical marks, viva, and academic hours breakdown
                                      </p>
                                    </div>
                                  </div>
                                  <ChevronDown className={`w-4 h-4 text-text-tertiary transition-transform ${isEvalOpen ? 'rotate-180' : ''}`} />
                                </button>

                                <AnimatePresence initial={false}>
                                  {isEvalOpen && (
                                    <motion.div
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: 'auto', opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      className="p-4 sm:p-5 space-y-4"
                                    >
                                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                        <div className="p-3 bg-white dark:bg-zinc-900 rounded-xl border border-border/40">
                                          <span className="text-[8px] uppercase font-bold text-text-tertiary block">Theory Papers</span>
                                          <span className="text-sm font-black text-text-primary block mt-0.5">{year.assessment.papersCount} Paper(s)</span>
                                          <span className="text-[10px] text-primary font-bold">{year.assessment.theoryMarks} Marks</span>
                                        </div>
                                        <div className="p-3 bg-white dark:bg-zinc-900 rounded-xl border border-border/40">
                                          <span className="text-[8px] uppercase font-bold text-text-tertiary block">Practical / Bedside</span>
                                          <span className="text-sm font-black text-text-primary block mt-0.5">{year.assessment.practicalMarks} Marks</span>
                                          <span className="text-[10px] text-emerald-600 font-bold">Clinical Evaluation</span>
                                        </div>
                                        <div className="p-3 bg-white dark:bg-zinc-900 rounded-xl border border-border/40">
                                          <span className="text-[8px] uppercase font-bold text-text-tertiary block">Teaching Hours</span>
                                          <span className="text-sm font-black text-text-primary block mt-0.5">{year.hours.theory} Th + {year.hours.practical} Pr</span>
                                          <span className="text-[10px] text-text-tertiary font-bold">{year.hours.total} Total Hours</span>
                                        </div>
                                        <div className="p-3 bg-white dark:bg-zinc-900 rounded-xl border border-border/40">
                                          <span className="text-[8px] uppercase font-bold text-text-tertiary block">Grand Total</span>
                                          <span className="text-sm font-black text-rose-600 dark:text-rose-400 block mt-0.5">{year.assessment.totalMarks} Marks</span>
                                          <span className="text-[10px] text-text-tertiary font-bold">NCH Evaluation</span>
                                        </div>
                                      </div>

                                      <p className="text-xs text-text-secondary leading-relaxed bg-white dark:bg-zinc-900 p-3.5 rounded-xl border border-border/40">
                                        {year.assessment.details}
                                      </p>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            );
                          })()}


                          {/* ----------------------------------------------------
                              COLLAPSIBLE UNIT 4: REFERENCE BOOKS & OUTCOMES
                             ---------------------------------------------------- */}
                          {(() => {
                            const overviewUnitKey = `${year.yearId}_overview`;
                            const isOverviewOpen = expandedUnits[overviewUnitKey] === true;

                            return (
                              <div className="border border-border/50 rounded-2xl overflow-hidden shadow-xs bg-bg-secondary/20">
                                <button
                                  onClick={() => setExpandedUnits(prev => ({ ...prev, [overviewUnitKey]: !isOverviewOpen }))}
                                  className="w-full p-4 bg-bg-secondary/60 hover:bg-bg-secondary flex items-center justify-between cursor-pointer text-left border-b border-border/40 transition-colors"
                                >
                                  <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                                      <BookOpenCheck className="w-4 h-4" />
                                    </div>
                                    <div>
                                      <h3 className="text-sm font-bold text-text-primary">
                                        Reference Textbooks &amp; Learning Outcomes
                                      </h3>
                                      <p className="text-[10px] text-text-tertiary">
                                        Recommended authors, textbooks, and NCH competency outcomes
                                      </p>
                                    </div>
                                  </div>
                                  <ChevronDown className={`w-4 h-4 text-text-tertiary transition-transform ${isOverviewOpen ? 'rotate-180' : ''}`} />
                                </button>

                                <AnimatePresence initial={false}>
                                  {isOverviewOpen && (
                                    <motion.div
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: 'auto', opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      className="p-4 sm:p-5 space-y-4"
                                    >
                                      <div className="space-y-2">
                                        <h4 className="text-xs font-bold text-text-primary uppercase tracking-wider">Recommended Reference Books</h4>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                          {year.referenceBooks.map((book, bidx) => (
                                            <div key={bidx} className="p-3 bg-white dark:bg-zinc-900 border border-border/40 rounded-xl flex items-start gap-2.5">
                                              <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                                              <span className="text-xs text-text-primary font-bold leading-relaxed">{book}</span>
                                            </div>
                                          ))}
                                        </div>
                                      </div>

                                      <div className="space-y-2 pt-2">
                                        <h4 className="text-xs font-bold text-text-primary uppercase tracking-wider">NCH Course Outcomes</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                                          {year.outcomes.map((outcome, oidx) => (
                                            <div key={oidx} className="p-3 bg-white dark:bg-zinc-900 border border-border/40 rounded-xl text-xs text-text-secondary leading-relaxed font-medium">
                                              • {outcome}
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            );
                          })()}

                        </motion.div>
                      )}
                    </AnimatePresence>

                  </div>
                );
              })}
          </div>

        </div>
      )}

      {/* ====================================================
          VIEW MODE 2: ALL BHMS SUBJECTS CURRICULUM
         ==================================================== */}
      {primaryViewMode === 'all-subjects' && (() => {
        const activeSubjectUnits = COMPLETE_SUBJECT_CURRICULUM_DATA[activeSubject.id] || SUBJECT_CURRICULUM_DATA[activeSubject.id] || [];
        const subjectConfig = SUBJECT_ROUTE_MAPPINGS[activeSubject.id] || {
          code: 'NCH-CBDC',
          name: activeSubject.name,
          year: activeYearData.year,
          mainRoute: '/subjects',
          portalRoute: `/portal/${activeYearData.year.toLowerCase().replace(/[^a-z0-9]/g, '')}-bhms`,
          blueprintRoute: '/university-blueprints',
          mcqRoute: '/aiapget-mcq-simulator'
        };

        const totalTopicsCount = activeSubjectUnits.reduce(
          (acc, u) => acc + u.chapters.reduce((cAcc, c) => cAcc + c.topics.length, 0),
          0
        );

        return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT SIDEBAR NAVIGATION */}
            <div className="lg:col-span-3 lg:sticky lg:top-24 space-y-4">
              
              {/* Year Selector Buttons */}
              <div className="bg-white dark:bg-zinc-950 border border-border/50 rounded-3xl p-4 shadow-sm space-y-2">
                <span className="text-[9px] font-black uppercase text-text-tertiary block px-2">Select BHMS Year</span>
                <div className="grid grid-cols-2 gap-1.5">
                  {CBDC_SYLLABUS_DATA.map((y, idx) => (
                    <button
                      key={y.year}
                      onClick={() => {
                        setSelectedYearIndex(idx);
                        setSelectedSubjectId(CBDC_SYLLABUS_DATA[idx].subjects[0].id);
                      }}
                      className={`px-3 py-2 rounded-xl text-xs font-bold transition-all text-center cursor-pointer ${
                        selectedYearIndex === idx
                          ? "bg-primary text-white shadow-sm"
                          : "bg-bg-secondary text-text-secondary hover:text-text-primary"
                      }`}
                    >
                      {y.year}
                    </button>
                  ))}
                </div>
              </div>

              {/* Subjects List */}
              <div className="bg-white dark:bg-zinc-950 border border-border/50 rounded-3xl p-4 shadow-sm space-y-2">
                <span className="text-[9px] font-black uppercase text-text-tertiary block px-2">
                  {activeYearData.year} Subjects
                </span>
                <div className="space-y-1">
                  {activeYearData.subjects.map(sub => (
                    <button
                      key={sub.id}
                      onClick={() => setSelectedSubjectId(sub.id)}
                      className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                        selectedSubjectId === sub.id
                          ? "bg-primary/10 text-primary border border-primary/25"
                          : "text-text-secondary hover:bg-bg-secondary"
                      }`}
                    >
                      <span className="truncate pr-2">{sub.name}</span>
                      <ChevronRight className="w-3.5 h-3.5 shrink-0" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Links Card */}
              <div className="p-4 bg-primary/5 border border-primary/20 rounded-3xl space-y-2.5">
                <span className="text-[10px] font-black uppercase text-primary tracking-wider block">
                  Study Resources
                </span>
                <div className="space-y-1.5 text-xs">
                  <Link
                    to={subjectConfig.mainRoute}
                    className="w-full flex items-center justify-between p-2 rounded-xl bg-white dark:bg-zinc-900 border border-border/40 hover:border-primary/40 font-bold text-text-primary hover:text-primary transition-all"
                  >
                    <span>Full Study Center</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-primary" />
                  </Link>
                  <Link
                    to={subjectConfig.portalRoute}
                    className="w-full flex items-center justify-between p-2 rounded-xl bg-white dark:bg-zinc-900 border border-border/40 hover:border-primary/40 font-bold text-text-primary hover:text-primary transition-all"
                  >
                    <span>{activeYearData.year} Academic Portal</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-primary" />
                  </Link>
                  <Link
                    to="/university-blueprints"
                    className="w-full flex items-center justify-between p-2 rounded-xl bg-white dark:bg-zinc-900 border border-border/40 hover:border-primary/40 font-bold text-text-primary hover:text-primary transition-all"
                  >
                    <span>University Blueprints</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-primary" />
                  </Link>
                  <Link
                    to="/aiapget-mcq-simulator"
                    className="w-full flex items-center justify-between p-2 rounded-xl bg-white dark:bg-zinc-900 border border-border/40 hover:border-primary/40 font-bold text-text-primary hover:text-primary transition-all"
                  >
                    <span>MCQ Simulator</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-primary" />
                  </Link>
                </div>
              </div>

            </div>

            {/* RIGHT CONTENT PANEL */}
            <div className="lg:col-span-9 space-y-6">
              
              {/* Subject Hero Header & Action Hub */}
              <div className="bg-white dark:bg-zinc-950 border border-border/50 rounded-[2.5rem] p-6 sm:p-8 shadow-sm space-y-6">
                
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/30 pb-6">
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase font-mono bg-primary/10 text-primary border border-primary/20">
                        {subjectConfig.code}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-bg-secondary text-text-secondary">
                        {activeYearData.year}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                        {activeSubjectUnits.length} Units • {totalTopicsCount} Prescribed Topics
                      </span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-black text-text-primary">{activeSubject.name}</h2>
                    <p className="text-xs sm:text-sm text-text-secondary leading-relaxed max-w-3xl">
                      {activeSubject.description}
                    </p>
                  </div>

                  {/* Primary Action Buttons */}
                  <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 shrink-0">
                    <Link
                      to={subjectConfig.mainRoute}
                      className="px-4 py-2.5 rounded-xl bg-primary text-white text-xs font-extrabold flex items-center gap-1.5 shadow-sm hover:opacity-90 transition-all cursor-pointer"
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>Open Full Study Center</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                    <Link
                      to={subjectConfig.portalRoute}
                      className="px-3.5 py-2.5 rounded-xl bg-bg-secondary hover:bg-bg-tertiary text-text-primary text-xs font-bold flex items-center gap-1.5 border border-border/40 transition-all cursor-pointer"
                    >
                      <GraduationCap className="w-4 h-4 text-primary" />
                      <span>Year Portal</span>
                    </Link>
                  </div>
                </div>

                {/* Subject High-Yield Note */}
                <div className="p-4 bg-amber-500/5 border border-amber-500/15 rounded-2xl space-y-1">
                  <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
                    <Sparkles className="w-4 h-4" />
                    <h4 className="text-[10px] font-black uppercase">Clinical &amp; University High-Yield Pearl</h4>
                  </div>
                  <p className="text-xs text-text-secondary italic leading-relaxed pl-6">
                    "{activeSubject.pearls}"
                  </p>
                </div>

                {/* Hours & Exam Summary */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3.5 bg-bg-secondary/30 rounded-2xl border border-border/40">
                    <span className="text-[9px] uppercase text-text-tertiary block font-bold">Theory Hours</span>
                    <span className="text-sm font-extrabold text-text-primary mt-1 block">{activeSubject.theoryHours} Hours</span>
                  </div>
                  <div className="p-3.5 bg-bg-secondary/30 rounded-2xl border border-border/40">
                    <span className="text-[9px] uppercase text-text-tertiary block font-bold">Practical / Clinical</span>
                    <span className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400 mt-1 block">{activeSubject.practicalHours} Hours</span>
                  </div>
                  <div className="p-3.5 bg-bg-secondary/30 rounded-2xl border border-border/40">
                    <span className="text-[9px] uppercase text-text-tertiary block font-bold">Exam Papers</span>
                    <span className="text-sm font-extrabold text-text-primary mt-1 block">{activeSubject.examPattern.theoryPapers} Paper(s)</span>
                  </div>
                  <div className="p-3.5 bg-bg-secondary/30 rounded-2xl border border-border/40">
                    <span className="text-[9px] uppercase text-text-tertiary block font-bold">Total Exam Marks</span>
                    <span className="text-sm font-extrabold text-rose-600 dark:text-rose-400 mt-1 block">{activeSubject.examPattern.totalMarks} Marks</span>
                  </div>
                </div>

              </div>

              {/* Interactive Syllabus Units & Topics List */}
              <div className="space-y-4">
                <div className="flex items-center justify-between px-2">
                  <div>
                    <h3 className="text-base font-black text-text-primary">Official CBDC Syllabus Units &amp; Topics</h3>
                    <p className="text-xs text-text-tertiary">Click any topic card to view comprehensive study notes, competencies, and university exam blueprints.</p>
                  </div>
                  <span className="text-xs font-mono font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-lg">
                    {activeSubjectUnits.length} Units
                  </span>
                </div>

                {activeSubjectUnits.length === 0 ? (
                  <div className="p-8 text-center bg-white dark:bg-zinc-950 border border-border/50 rounded-3xl space-y-3">
                    <Info className="w-8 h-8 text-text-tertiary mx-auto" />
                    <p className="text-sm font-bold text-text-primary">Curriculum data loaded into Subject Study Center.</p>
                    <Link
                      to={subjectConfig.mainRoute}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
                    >
                      <span>Open {activeSubject.name} Study Hub</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                ) : (
                  activeSubjectUnits.map((unit, uIdx) => {
                    const unitKey = `sub_unit_${uIdx}_${unit.id}`;
                    const isUnitExpanded = expandedUnits[unitKey] !== false; // default expanded

                    return (
                      <div 
                        key={unit.id || uIdx}
                        className="bg-white dark:bg-zinc-950 border border-border/50 rounded-3xl overflow-hidden shadow-xs"
                      >
                        {/* Unit Accordion Header */}
                        <button
                          type="button"
                          onClick={() => toggleUnit(unitKey)}
                          className="w-full p-4 sm:p-5 flex items-center justify-between gap-3 text-left hover:bg-bg-secondary/40 transition-colors cursor-pointer border-b border-border/30"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-black text-xs shrink-0">
                              U{uIdx + 1}
                            </div>
                            <div>
                              <h4 className="text-sm sm:text-base font-extrabold text-text-primary">
                                {unit.name}
                              </h4>
                              <p className="text-[11px] text-text-tertiary">
                                {unit.chapters.length} Chapters • {unit.chapters.reduce((a, c) => a + c.topics.length, 0)} Topics
                              </p>
                            </div>
                          </div>

                          <ChevronDown className={`w-4 h-4 text-text-tertiary transition-transform ${isUnitExpanded ? 'rotate-180' : ''}`} />
                        </button>

                        {/* Unit Chapters & Topics */}
                        <AnimatePresence initial={false}>
                          {isUnitExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="p-4 sm:p-5 space-y-5"
                            >
                              {unit.chapters.map((chap, cIdx) => {
                                const chapKey = `sub_chap_${chap.id}`;
                                const isChapOpen = expandedChapters[chapKey] !== false;

                                return (
                                  <div 
                                    key={chap.id || cIdx}
                                    className="p-4 rounded-2xl bg-bg-secondary/30 border border-border/40 space-y-3.5"
                                  >
                                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/30 pb-2.5">
                                      <div className="flex items-center gap-2">
                                        <BookOpen className="w-4 h-4 text-primary shrink-0" />
                                        <h5 className="text-xs sm:text-sm font-bold text-text-primary">
                                          {chap.name}
                                        </h5>
                                      </div>
                                      
                                      <div className="flex items-center gap-2">
                                        {chap.priority && (
                                          <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${
                                            chap.priority === 'High' 
                                              ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400'
                                              : 'bg-primary/10 text-primary'
                                          }`}>
                                            {chap.priority} Priority
                                          </span>
                                        )}
                                        {chap.studyTime && (
                                          <span className="text-[10px] text-text-tertiary font-mono">
                                            {chap.studyTime}
                                          </span>
                                        )}
                                      </div>
                                    </div>

                                    {/* Topics Cards Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                      {chap.topics.map(top => {
                                        const isDone = !!completedTopics[top.id];
                                        const isBookmarked = !!bookmarkedTopics[top.id];

                                        return (
                                          <div
                                            key={top.id}
                                            className={`p-3.5 rounded-2xl border transition-all flex flex-col justify-between gap-3 ${
                                              isDone
                                                ? "bg-emerald-500/5 border-emerald-500/30 text-text-primary"
                                                : "bg-white dark:bg-zinc-900 border-border/50 hover:border-primary/40 shadow-xs"
                                            }`}
                                          >
                                            <div className="space-y-2">
                                              <div className="flex items-start justify-between gap-2">
                                                <div className="flex items-start gap-2 min-w-0">
                                                  {/* Mark Done Checkbox */}
                                                  <button
                                                    type="button"
                                                    onClick={() => toggleTopicCompletion(top.id)}
                                                    className="mt-0.5 shrink-0 cursor-pointer"
                                                    title={isDone ? "Mark as uncompleted" : "Mark as completed"}
                                                  >
                                                    {isDone ? (
                                                      <CheckSquare2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                                                    ) : (
                                                      <div className="w-4 h-4 rounded border border-border flex items-center justify-center bg-bg-secondary hover:border-primary" />
                                                    )}
                                                  </button>
                                                  
                                                  <div className="min-w-0">
                                                    <h6 className={`text-xs font-bold leading-snug ${isDone ? 'line-through text-text-tertiary' : 'text-text-primary'}`}>
                                                      {top.name}
                                                    </h6>
                                                  </div>
                                                </div>

                                                <button
                                                  type="button"
                                                  onClick={() => toggleTopicBookmark(top.id)}
                                                  className="text-text-tertiary hover:text-amber-500 transition-colors shrink-0"
                                                  title="Bookmark topic"
                                                >
                                                  <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-amber-500 text-amber-500' : ''}`} />
                                                </button>
                                              </div>

                                              {/* Subtopic Pills */}
                                              {top.subtopics && top.subtopics.length > 0 && (
                                                <div className="flex flex-wrap gap-1 pl-6">
                                                  {top.subtopics.slice(0, 3).map((st, sidx) => (
                                                    <span 
                                                      key={sidx}
                                                      className="px-2 py-0.5 rounded-md bg-bg-secondary text-[9px] text-text-secondary font-medium truncate max-w-[200px]"
                                                    >
                                                      {st}
                                                    </span>
                                                  ))}
                                                  {top.subtopics.length > 3 && (
                                                    <span className="px-1.5 py-0.5 rounded-md bg-bg-secondary text-[8px] text-text-tertiary">
                                                      +{top.subtopics.length - 3} more
                                                    </span>
                                                  )}
                                                </div>
                                              )}
                                            </div>

                                            {/* Action bar for topic */}
                                            <div className="flex items-center justify-between border-t border-border/30 pt-2.5 text-[11px] pl-6">
                                              <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                                                {top.status || 'Must Know'}
                                              </span>

                                              <button
                                                type="button"
                                                onClick={() => handleOpenTopic(top, chap.name, unit.name, activeSubject.name, activeYearData.year)}
                                                className="font-bold text-primary hover:underline flex items-center gap-1 cursor-pointer"
                                              >
                                                <span>Study Blueprint</span>
                                                <Sparkles className="w-3 h-3 text-amber-500" />
                                              </button>
                                            </div>
                                          </div>
                                        );
                                      })}
                                    </div>

                                  </div>
                                );
                              })}
                            </motion.div>
                          )}
                        </AnimatePresence>

                      </div>
                    );
                  })
                )}
              </div>

              {/* Textbooks & References Section */}
              <div className="bg-white dark:bg-zinc-950 border border-border/50 rounded-3xl p-6 shadow-sm space-y-3">
                <h3 className="text-xs font-black text-text-primary uppercase tracking-wider flex items-center gap-2">
                  <BookMarked className="w-4 h-4 text-primary" />
                  <span>NCH Recommended Standard Textbooks</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeSubject.books.map((b, i) => (
                    <div key={i} className="text-xs text-text-secondary flex items-start gap-2 p-2.5 rounded-xl bg-bg-secondary/40 border border-border/30">
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        );
      })()}

      {/* ====================================================
          TOPIC STUDY GUIDE & EXAM BLUEPRINT MODAL
         ==================================================== */}
      <AnimatePresence>
        {activeStudyTopic && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveStudyTopic(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl max-h-[90vh] bg-white dark:bg-zinc-950 rounded-3xl border border-border/60 shadow-2xl overflow-y-auto flex flex-col z-10"
            >
              {/* Header */}
              <div className="sticky top-0 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md p-5 sm:p-6 border-b border-border/30 flex items-start justify-between gap-4 z-20">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase font-mono bg-primary/10 text-primary border border-primary/20">
                      {activeStudyTopic.subjectCode || activeStudyTopic.subjectId || 'CBDC'}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-bg-secondary text-text-secondary">
                      {activeStudyTopic.subjectName || 'BHMS Subject'}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                      {activeStudyTopic.competencyLevel || 'Must Know'}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-text-primary pt-1">
                    {activeStudyTopic.topicTitle || activeStudyTopic.name}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveStudyTopic(null)}
                  className="p-2 rounded-xl bg-bg-secondary hover:bg-bg-tertiary text-text-tertiary hover:text-text-primary transition-colors cursor-pointer shrink-0"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body Content */}
              <div className="p-5 sm:p-7 space-y-6 text-text-primary overflow-y-auto flex-1">
                
                {/* Overview Box */}
                {activeStudyTopic.overview && (
                  <div className="space-y-2">
                    <h4 className="text-xs font-black uppercase text-text-tertiary tracking-wider flex items-center gap-1.5">
                      <Info className="w-3.5 h-3.5 text-primary" />
                      <span>Topic Overview &amp; Learning Scope</span>
                    </h4>
                    <p className="text-xs sm:text-sm text-text-secondary leading-relaxed bg-bg-secondary/40 p-4 rounded-2xl border border-border/30">
                      {activeStudyTopic.overview}
                    </p>
                  </div>
                )}

                {/* Why It Matters */}
                {(activeStudyTopic.whyItMatters || activeStudyTopic.whyImportant) && (
                  <div className="space-y-2">
                    <h4 className="text-xs font-black uppercase text-text-tertiary tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      <span>Why It Matters for BHMS &amp; Clinical Practice</span>
                    </h4>
                    <p className="text-xs sm:text-sm text-text-secondary leading-relaxed p-4 rounded-2xl bg-amber-500/5 border border-amber-500/15">
                      {activeStudyTopic.whyItMatters || activeStudyTopic.whyImportant}
                    </p>
                  </div>
                )}

                {/* Core Concepts */}
                {activeStudyTopic.coreConcepts && activeStudyTopic.coreConcepts.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-xs font-black uppercase text-text-tertiary tracking-wider flex items-center gap-1.5">
                      <BookOpenCheck className="w-3.5 h-3.5 text-primary" />
                      <span>Core Concepts &amp; Key Syllabus Points</span>
                    </h4>
                    <div className="space-y-2">
                      {activeStudyTopic.coreConcepts.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-bg-secondary/30 border border-border/30 text-xs text-text-secondary">
                          <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Clinical Pearls */}
                {activeStudyTopic.clinicalPearls && activeStudyTopic.clinicalPearls.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-xs font-black uppercase text-emerald-600 dark:text-emerald-400 tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Clinical Pearls &amp; Homoeopathic Indications</span>
                    </h4>
                    <div className="space-y-2">
                      {activeStudyTopic.clinicalPearls.map((pearl, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/20 text-xs text-text-secondary">
                          <Award className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                          <span className="leading-relaxed font-medium">{pearl}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Exam Blueprint Section */}
                {(() => {
                  const laqs = activeStudyTopic.examBlueprint?.longAnswerQuestions || activeStudyTopic.examLAQs || [];
                  const saqs = activeStudyTopic.examBlueprint?.shortAnswerQuestions || activeStudyTopic.examSAQs || [];
                  const viva = activeStudyTopic.examBlueprint?.vivaVoceQuestions || activeStudyTopic.vivaQuestions || [];

                  if (laqs.length === 0 && saqs.length === 0 && viva.length === 0) return null;

                  return (
                    <div className="space-y-3 p-5 rounded-2xl bg-primary/5 border border-primary/20">
                      <h4 className="text-xs font-black uppercase text-primary tracking-wider flex items-center gap-1.5">
                        <GraduationCap className="w-4 h-4" />
                        <span>University Exam Blueprint (10M / 5M / Viva Questions)</span>
                      </h4>
                      
                      {laqs.length > 0 && (
                        <div className="space-y-1.5 pt-1">
                          <span className="text-[10px] font-black uppercase text-text-tertiary">Probable Long Answer Questions (LAQs - 10 Marks):</span>
                          {laqs.map((q, i) => (
                            <p key={i} className="text-xs text-text-primary font-semibold pl-3 border-l-2 border-primary/40">
                              {q}
                            </p>
                          ))}
                        </div>
                      )}

                      {saqs.length > 0 && (
                        <div className="space-y-1.5 pt-2">
                          <span className="text-[10px] font-black uppercase text-text-tertiary">Short Answer Questions (SAQs - 5 Marks):</span>
                          {saqs.map((q, i) => (
                            <p key={i} className="text-xs text-text-secondary pl-3 border-l-2 border-amber-500/40">
                              {q}
                            </p>
                          ))}
                        </div>
                      )}

                      {viva.length > 0 && (
                        <div className="space-y-1.5 pt-2">
                          <span className="text-[10px] font-black uppercase text-text-tertiary">Viva Voce Questions:</span>
                          {viva.map((q, i) => (
                            <p key={i} className="text-xs text-text-secondary pl-3 border-l-2 border-emerald-500/40 italic">
                              "{q}"
                            </p>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })()}

                {/* Recommended Textbooks */}
                {(() => {
                  const books = activeStudyTopic.referenceTextbooks || activeStudyTopic.recommendedBooks || [];
                  if (books.length === 0) return null;
                  return (
                    <div className="space-y-2">
                      <h4 className="text-xs font-black uppercase text-text-tertiary tracking-wider">
                        Authoritative Reference Textbooks
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {books.map((book, i) => (
                          <span key={i} className="px-3 py-1 rounded-xl bg-bg-secondary text-xs text-text-secondary border border-border/40 font-medium">
                            {book}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })()}

              </div>

              {/* Modal Footer / Action Bar */}
              <div className="sticky bottom-0 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md p-4 sm:p-5 border-t border-border/30 flex flex-wrap items-center justify-between gap-3 z-20">
                {(() => {
                  const currentTopicId = activeStudyTopic.topicId || activeStudyTopic.id || 'topic';
                  const hubLink = activeStudyTopic.studyHubLink || '/subjects';

                  return (
                    <>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            toggleTopicCompletion(currentTopicId);
                          }}
                          className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all ${
                            completedTopics[currentTopicId]
                              ? "bg-emerald-600 text-white shadow-sm"
                              : "bg-bg-secondary hover:bg-bg-tertiary text-text-primary border border-border/40"
                          }`}
                        >
                          <CheckSquare className="w-4 h-4" />
                          <span>{completedTopics[currentTopicId] ? "Mastered" : "Mark Studied"}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            toggleTopicBookmark(currentTopicId);
                          }}
                          className="p-2 rounded-xl bg-bg-secondary hover:bg-bg-tertiary text-text-tertiary hover:text-amber-500 transition-colors cursor-pointer"
                          title="Bookmark"
                        >
                          <Bookmark className={`w-4 h-4 ${bookmarkedTopics[currentTopicId] ? 'fill-amber-500 text-amber-500' : ''}`} />
                        </button>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        <Link
                          to="/aiapget-mcq-simulator"
                          onClick={() => setActiveStudyTopic(null)}
                          className="px-3 py-2 rounded-xl bg-bg-secondary hover:bg-bg-tertiary text-text-primary text-xs font-bold transition-all"
                        >
                          MCQ Practice
                        </Link>
                        <Link
                          to={hubLink}
                          onClick={() => setActiveStudyTopic(null)}
                          className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-extrabold flex items-center gap-1.5 shadow-sm hover:opacity-90 transition-all cursor-pointer"
                        >
                          <BookOpen className="w-4 h-4" />
                          <span>Open Subject Hub</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </>
                  );
                })()}
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ====================================================
          REMEDY STUDY MODAL (Materia Medica)
         ==================================================== */}
      <AnimatePresence>
        {activeStudyRemedy && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveStudyRemedy(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl max-h-[90vh] bg-white dark:bg-zinc-950 rounded-3xl border border-border/60 shadow-2xl overflow-y-auto flex flex-col z-10"
            >
              {/* Header */}
              <div className="sticky top-0 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md p-5 sm:p-6 border-b border-border/30 flex items-start justify-between gap-4 z-20">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase font-mono bg-primary/10 text-primary border border-primary/20">
                      Materia Medica
                    </span>
                    {activeStudyRemedy.family && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-bg-secondary text-text-secondary">
                        {activeStudyRemedy.family}
                      </span>
                    )}
                    {activeStudyRemedy.thermalState && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400">
                        {activeStudyRemedy.thermalState}
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-text-primary pt-1">
                    {activeStudyRemedy.name}
                  </h3>
                  {activeStudyRemedy.commonName && (
                    <p className="text-xs text-text-tertiary italic">
                      Common Name: {activeStudyRemedy.commonName}
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => setActiveStudyRemedy(null)}
                  className="p-2 rounded-xl bg-bg-secondary hover:bg-bg-tertiary text-text-tertiary hover:text-text-primary transition-colors cursor-pointer shrink-0"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body Content */}
              <div className="p-5 sm:p-7 space-y-5 text-text-primary overflow-y-auto flex-1">
                
                {/* Keynotes */}
                {activeStudyRemedy.keynotes && activeStudyRemedy.keynotes.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-xs font-black uppercase text-primary tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Guiding Symptoms &amp; Keynotes</span>
                    </h4>
                    <div className="space-y-1.5">
                      {activeStudyRemedy.keynotes.map((kn: string, i: number) => (
                        <div key={i} className="flex items-start gap-2 p-2.5 rounded-xl bg-primary/5 border border-primary/15 text-xs text-text-secondary">
                          <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{kn}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Mind Symptoms */}
                {activeStudyRemedy.mind && activeStudyRemedy.mind.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-xs font-black uppercase text-text-tertiary tracking-wider flex items-center gap-1.5">
                      <Heart className="w-3.5 h-3.5 text-rose-500" />
                      <span>Mind &amp; Disposition</span>
                    </h4>
                    <div className="space-y-1.5">
                      {activeStudyRemedy.mind.map((m: string, i: number) => (
                        <p key={i} className="text-xs text-text-secondary p-2.5 rounded-xl bg-bg-secondary/40 border border-border/30 leading-relaxed">
                          {m}
                        </p>
                      ))}
                    </div>
                  </div>
                )}

                {/* Modalities */}
                {activeStudyRemedy.modalities && (
                  <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/15 space-y-2 text-xs">
                    <h4 className="font-black uppercase text-[10px] text-amber-600 tracking-wider">
                      Modalities
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-text-secondary">
                      {activeStudyRemedy.modalities.aggravation && (
                        <div>
                          <strong className="text-rose-600 dark:text-rose-400 block font-bold text-[10px] uppercase">&lt; Aggravation:</strong>
                          <span>{activeStudyRemedy.modalities.aggravation}</span>
                        </div>
                      )}
                      {activeStudyRemedy.modalities.amelioration && (
                        <div>
                          <strong className="text-emerald-600 dark:text-emerald-400 block font-bold text-[10px] uppercase">&gt; Amelioration:</strong>
                          <span>{activeStudyRemedy.modalities.amelioration}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

              </div>

              {/* Modal Footer */}
              <div className="sticky bottom-0 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md p-4 sm:p-5 border-t border-border/30 flex items-center justify-between gap-3 z-20">
                <Link
                  to="/homoeopathy/materia-medica"
                  onClick={() => setActiveStudyRemedy(null)}
                  className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-extrabold flex items-center gap-1.5 shadow-sm hover:opacity-90 transition-all cursor-pointer"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Open Full Drug Portrait</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>

                <button
                  type="button"
                  onClick={() => setActiveStudyRemedy(null)}
                  className="px-4 py-2 rounded-xl bg-bg-secondary hover:bg-bg-tertiary text-text-primary text-xs font-bold transition-all"
                >
                  Close
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
