import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  BrainCircuit, 
  Wind, 
  Droplets, 
  Activity, 
  Shield, 
  Sun, 
  Heart, 
  Baby, 
  Microscope,
  Stethoscope,
  AlertTriangle,
  Skull,
  Eye,
  Ear,
  Dna,
  Zap,
  Users,
  Syringe,
  Ghost,
  UtensilsCrossed,
  Layers
} from 'lucide-react';

interface SystemGridProps {
  onSelectSystem: (system: string) => void;
}

const systems = [
  { id: 'cardiovascular', name: 'Cardiovascular Diseases', icon: Heart, color: 'text-rose-500', bg: 'bg-rose-500/10', desc: 'Hypertension, Angina, Heart Failure' },
  { id: 'respiratory', name: 'Respiratory Diseases', icon: Wind, color: 'text-sky-500', bg: 'bg-sky-500/10', desc: 'Asthma, COPD, Bronchitis, Pneumonia' },
  { id: 'neurology', name: 'Neurological Diseases', icon: BrainCircuit, color: 'text-purple-500', bg: 'bg-purple-500/10', desc: 'Migraine, Epilepsy, Stroke, Parkinson\'s' },
  { id: 'gastrointestinal', name: 'Gastrointestinal Diseases', icon: UtensilsCrossed, color: 'text-emerald-500', bg: 'bg-emerald-500/10', desc: 'GERD, Gastritis, IBD, Peptic Ulcers' },
  { id: 'hepatobiliary', name: 'Hepatobiliary Diseases', icon: Droplets, color: 'text-amber-600', bg: 'bg-amber-600/10', desc: 'Jaundice, Hepatitis, Gallstones' },
  { id: 'renal-urinary', name: 'Renal & Urinary Diseases', icon: Layers, color: 'text-blue-600', bg: 'bg-blue-600/10', desc: 'Nephritis, UTI, Renal Calculi' },
  { id: 'hematology', name: 'Hematological Diseases', icon: Activity, color: 'text-red-600', bg: 'bg-red-600/10', desc: 'Anemia, Leukemia, Bleeding Disorders' },
  { id: 'endocrine-metabolic', name: 'Endocrine & Metabolic', icon: Sun, color: 'text-yellow-600', bg: 'bg-yellow-600/10', desc: 'Diabetes, Thyroid, PCOS' },
  { id: 'musculoskeletal-rheumatology', name: 'Musculoskeletal', icon: Activity, color: 'text-orange-500', bg: 'bg-orange-500/10', desc: 'Rheumatoid Arthritis, OA, Gout' },
  { id: 'infectious', name: 'Infectious Diseases', icon: Syringe, color: 'text-green-600', bg: 'bg-green-600/10', desc: 'Fever, Malaria, Typhoid, TB' },
  { id: 'dermatology', name: 'Dermatological Diseases', icon: Shield, color: 'text-pink-500', bg: 'bg-pink-500/10', desc: 'Eczema, Psoriasis, Acne' },
  { id: 'psychiatry', name: 'Psychiatric Conditions', icon: Ghost, color: 'text-indigo-600', bg: 'bg-indigo-600/10', desc: 'Depression, Anxiety, OCD' },
  { id: 'ophthalmology', name: 'Ophthalmological', icon: Eye, color: 'text-cyan-600', bg: 'bg-cyan-600/10', desc: 'Cataract, Glaucoma, Conjunctivitis' },
  { id: 'ent', name: 'ENT Diseases', icon: Ear, color: 'text-teal-600', bg: 'bg-teal-600/10', desc: 'Sinusitis, Otitis, Tonsillitis' },
  { id: 'obstetrics', name: 'Obstetric Conditions', icon: Users, color: 'text-fuchsia-600', bg: 'bg-fuchsia-600/10', desc: 'Pregnancy, Labor, Puerperium' },
  { id: 'gynecology', name: 'Gynecological Diseases', icon: Users, color: 'text-purple-600', bg: 'bg-purple-600/10', desc: 'Menstrual Disorders, Fibroids, Infertility' },
  { id: 'pediatrics', name: 'Pediatric Diseases', icon: Baby, color: 'text-blue-500', bg: 'bg-blue-500/10', desc: 'Common Childhood Ailments' },
  { id: 'male-reproductive', name: 'Male Reproductive', icon: Zap, color: 'text-slate-600', bg: 'bg-slate-600/10', desc: 'Prostate, Infertility, Hydrocele' },
  { id: 'oncology', name: 'Oncology', icon: Dna, color: 'text-violet-600', bg: 'bg-violet-600/10', desc: 'Carcinomas, Sarcomas, Benign Tumors' },
  { id: 'emergencies', name: 'Medical Emergencies', icon: AlertTriangle, color: 'text-red-700', bg: 'bg-red-700/10', desc: 'Poisoning, Burns, Acute Shock' },
  { id: 'toxicology', name: 'Toxicology', icon: Skull, color: 'text-zinc-700', bg: 'bg-zinc-700/10', desc: 'Poisons & Forensic Medicine' },
];

export const SystemGrid: React.FC<SystemGridProps> = ({ onSelectSystem }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {systems.map((system, idx) => (
        <motion.div
          key={system.id}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.02 }}
        >
          <Link
            to={`/disease-hub/${system.id}`}
            className="group p-5 bg-white dark:bg-zinc-900 border border-border rounded-2xl text-left hover:border-primary hover:shadow-lg transition-all duration-300 flex items-start gap-4"
          >
            <div className={`w-12 h-12 shrink-0 ${system.bg} ${system.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
              <system.icon className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-black text-text-primary group-hover:text-primary transition-colors">
                {system.name}
              </h3>
              <p className="text-[10px] font-bold text-text-secondary leading-tight line-clamp-2">
                {system.desc}
              </p>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
};
