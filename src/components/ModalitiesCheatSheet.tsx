import React from 'react';
import { motion } from 'motion/react';
import { 
  CloudRain, 
  Sun, 
  Wind, 
  Moon, 
  Clock, 
  Activity, 
  Utensils, 
  Thermometer, 
  User, 
  Brain, 
  Zap,
  Download,
  CheckCircle,
  Stethoscope,
  BookOpen
} from 'lucide-react';

const ModalityGroup = ({ title, items, icon: Icon, color }: { title: string; items: { label: string; remedies: string[] }[]; icon: any; color: string }) => (
  <div className={`p-6 rounded-[2.5rem] border border-border bg-white dark:bg-bg-secondary shadow-sm hover:shadow-xl transition-all h-full`}>
    <div className="flex items-center gap-3 mb-6">
      <div className={`p-3 rounded-2xl ${color} bg-opacity-10 text-opacity-100`}>
        <Icon className="w-5 h-5" />
      </div>
      <h3 className="text-sm font-black uppercase tracking-widest text-text-primary">{title}</h3>
    </div>
    <div className="space-y-6">
      {items.map((group, idx) => (
        <div key={idx}>
          <h4 className="text-[10px] font-black uppercase tracking-widest text-primary mb-3 italic flex items-center gap-2">
            <span className="w-1 h-1 bg-primary rounded-full" />
            {group.label}
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {group.remedies.map((remedy, rIdx) => (
              <span key={rIdx} className="px-2.5 py-1 bg-bg-primary border border-border rounded-lg text-[9px] font-bold text-text-secondary hover:border-primary/40 hover:text-primary transition-colors cursor-default">
                {remedy}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default function ModalitiesCheatSheet() {
  const data = [
    {
      title: "Thermal Relations",
      icon: Thermometer,
      color: "text-orange-500",
      items: [
        { label: "Hot (Agg. by heat)", remedies: ["Sulphur", "Lachesis", "Pulsatilla", "Medorrhinum", "Iodum"] },
        { label: "Chilly (Agg. by cold)", remedies: ["Arsenicum", "Hepar Sulph", "Nux Vomica", "Silicea", "Calcarea Carb"] }
      ]
    },
    {
      title: "Motion & Rest",
      icon: Activity,
      color: "text-blue-500",
      items: [
        { label: "Worse by Motion", remedies: ["Bryonia", "Colocynth", "Belladonna", "Rhus Tox (initial)"] },
        { label: "Better by Motion", remedies: ["Rhus Tox", "Kali Phos", "Ferrum Met", "Graphites"] }
      ]
    },
    {
      title: "Time Modalities",
      icon: Clock,
      color: "text-purple-500",
      items: [
        { label: "Worse 3 AM", remedies: ["Arsenicum", "Kali Carb", "Nux Vomica"] },
        { label: "Worse Morning", remedies: ["Natrum Mur", "Nux Vomica", "Kali Phos", "Sepia"] },
        { label: "Worse Evening", remedies: ["Lycopodium", "Pulsatilla", "Natrum Sulph"] }
      ]
    },
    {
      title: "Weather & Environment",
      icon: CloudRain,
      color: "text-sky-500",
      items: [
        { label: "Worse Damp Weather", remedies: ["Rhus Tox", "Dulcamara", "Calcarea Phos", "Pulsatilla"] },
        { label: "Better Dry Weather", remedies: ["Calcarea Phos", "Arsenicum", "Kali Bich"] },
        { label: "Worse Cold Air", remedies: ["Hepar Sulph", "Aconite", "Silicea"] }
      ]
    },
    {
      title: "Food & Drinks",
      icon: Utensils,
      color: "text-rose-500",
      items: [
        { label: "Craves Salt", remedies: ["Natrum Mur", "Sepia", "Kali Mur"] },
        { label: "Craves Sweets", remedies: ["Argentum Nit", "Lycopodium", "Phosphorus"] },
        { label: "Aversion to Fat", remedies: ["Pulsatilla", "Antim Crud", "Nux Vomica"] },
        { label: "Worse after eating", remedies: ["Nux Vomica", "Antim Crud", "Lycopodium"] }
      ]
    },
    {
      title: "Position & Sleep",
      icon: Moon,
      color: "text-indigo-500",
      items: [
        { label: "Sleeps on Abdomen", remedies: ["Medorrhinum", "Cina", "Kali Carb"] },
        { label: "Hands above head", remedies: ["Phosphorus", "Sulphur", "Lachesis"] },
        { label: "No sleep before midnight", remedies: ["Sulphur", "Coffea", "Lycopodium"] }
      ]
    },
    {
      title: "Mental Modalities",
      icon: Brain,
      color: "text-fuchsia-500",
      items: [
        { label: "Worse Consolation", remedies: ["Natrum Mur", "Sepia", "Lachesis"] },
        { label: "Better Consolation", remedies: ["Pulsatilla", "Staphysagria", "Phosphorus"] },
        { label: "Worse Company", remedies: ["Sepia", "Lycopodium", "Kali Phos"] },
        { label: "Fear of being alone", remedies: ["Arsenicum", "Calcarea Carb", "Phosphorus"] }
      ]
    },
    {
      title: "Pain Modalities",
      icon: Zap,
      color: "text-amber-500",
      items: [
        { label: "Better Pressure", remedies: ["Colocynth", "Mag Phos", "Arnica", "Rhus Tox"] },
        { label: "Better Warmth", remedies: ["Mag Phos", "Arsenicum", "Rhus Tox", "Graphites"] },
        { label: "Better Cold Apps", remedies: ["Belladonna", "Apis", "Bryonia", "Ruta"] }
      ]
    }
  ];

  return (
    <div className="space-y-12">
      <div className="bg-[#1a2b23] dark:bg-[#11010a] p-12 md:p-20 rounded-[4rem] relative overflow-hidden group shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-60" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-2xl text-center md:text-left">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-8 border border-white/10 text-primary-light">
              <BookOpen className="w-4 h-4" /> Comprehensive Clinical Guide
            </div>
            <h2 className="text-4xl md:text-6xl font-display font-black text-white mb-6 tracking-tighter italic leading-none">
              Homeopathy <br/> <span className="text-primary not-italic uppercase tracking-widest text-2xl md:text-3xl">Modalities Cheat Sheet.</span>
            </h2>
            <p className="text-xl text-white/60 font-medium mb-10 leading-relaxed italic">
              Critical aggravations and ameliorations at a glance. Master the "fingerprints" of major remedies for quick clinical recall.
            </p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
               {[
                 { icon: CheckCircle, text: "High-Yield Data" },
                 { icon: Stethoscope, text: "Clinical Focus" },
                 { icon: Download, text: "Print Ready" }
               ].map((badge, i) => (
                 <div key={i} className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-2xl border border-white/10 text-[10px] font-black uppercase tracking-widest text-white/80">
                   <badge.icon className="w-3 h-3 text-primary" />
                   {badge.text}
                 </div>
               ))}
            </div>
          </div>
          
          <div className="shrink-0">
             <button className="w-40 h-40 rounded-full bg-primary text-white flex flex-col items-center justify-center gap-2 font-black uppercase tracking-widest text-[10px] shadow-2xl shadow-primary/40 hover:scale-110 active:scale-95 transition-all group">
                <Download className="w-8 h-8 group-hover:bounce" />
                <span>PDF Download</span>
             </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {data.map((group, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.05 }}
          >
            <ModalityGroup {...group} />
          </motion.div>
        ))}
        
        {/* Special Child/General Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 p-8 bg-zinc-900 rounded-[3rem] text-white overflow-hidden relative shadow-2xl"
        >
          <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
             <User className="w-48 h-48" />
          </div>
          <div className="relative z-10 grid md:grid-cols-2 gap-10">
            <div>
              <h3 className="text-lg font-black uppercase tracking-widest text-primary mb-6 italic">Pediatric Modalities</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-primary-light mb-3 italic">Wants to be carried</h4>
                  <div className="flex flex-wrap gap-2">
                    {["Chamomilla", "Pulsatilla", "Silicea"].map(r => (
                      <span key={r} className="px-3 py-1 bg-white/5 border border-white/10 rounded-xl text-[10px] font-bold">{r}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-primary-light mb-3 italic">Dentition Irritability</h4>
                  <div className="flex flex-wrap gap-2">
                    {["Chamomilla", "Calcarea Phos", "Merc Sol"].map(r => (
                      <span key={r} className="px-3 py-1 bg-white/5 border border-white/10 rounded-xl text-[10px] font-bold">{r}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-black uppercase tracking-widest text-emerald-500 mb-6 italic">Generals</h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-2xl border border-white/10 group hover:border-emerald-500/50 transition-all">
                  <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Before Storm</span>
                  <span className="text-[10px] font-black text-emerald-400">Nat M, Rhus T</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-2xl border border-white/10 group hover:border-emerald-500/50 transition-all">
                  <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Open Air Better</span>
                  <span className="text-[10px] font-black text-emerald-400">Tub, Ars</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-2xl border border-white/10 group hover:border-emerald-500/50 transition-all">
                  <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Closed Room Agg.</span>
                  <span className="text-[10px] font-black text-emerald-400">Carb V, Phos</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-2xl border border-white/10 group hover:border-emerald-500/50 transition-all">
                  <span className="text-[10px] font-black uppercase tracking-widest opacity-60">From Exertion</span>
                  <span className="text-[10px] font-black text-emerald-400">Kali C, Phos</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
