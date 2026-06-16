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
        { label: "Extremely Hot (Agg. by warmth / covering)", remedies: ["Sulphur", "Lachesis Mutus", "Pulsatilla", "Apis Mellifica", "Secale Cornutum", "Iodum", "Medorrhinum", "Fluoric Acid", "Lilium Tigrinum", "Ledum (locally)"] },
        { label: "Extremely Chilly (Agg. by cold / drafts)", remedies: ["Arsenicum Album", "Hepar Sulphur", "Nux Vomica", "Silicea", "Calcarea Carbonica", "Psorinum", "Graphites", "Alumina", "China Officinalis", "Rhus Tox"] },
        { label: "Ambi-thermal (Thermostat sensitive)", remedies: ["Mercurius Solubilis", "Antimonium Crudum", "Cinnabaris"] }
      ]
    },
    {
      title: "Motion & Rest",
      icon: Activity,
      color: "text-blue-500",
      items: [
        { label: "Worse from Least Motion (Great soreness/dryness)", remedies: ["Bryonia Alba", "Belladonna", "Colocynth", "Ranunculus Bulbosus", "Chelidonium Majus", "Cactus Grandiflorus", "Apis Mellifica", "Nux Vomica"] },
        { label: "Better from Continued Motion / Restless", remedies: ["Rhus Toxicodendron", "Ferrum Metallicum", "Pulsatilla (slow walking)", "Rhododendron", "Dulcamara", "Kali Phosphoricum", "Radium Bromide"] }
      ]
    },
    {
      title: "Time Modalities",
      icon: Clock,
      color: "text-purple-500",
      items: [
        { label: "Worse 1 AM - 2 AM (Anxiety peak)", remedies: ["Arsenicum Album", "Psorinum"] },
        { label: "Worse 2 AM - 3 AM (Acid/Stitching pains)", remedies: ["Kali Carbonicum", "Ammonium Carbonicum"] },
        { label: "Worse 4 PM - 8 PM (Liver/Gaseous peaks)", remedies: ["Lycopodium Clavatum", "Helleborus Niger"] },
        { label: "Worse Morning on Waking (Transition load)", remedies: ["Lachesis Mutus", "Nux Vomica", "Natrum Muriaticum", "Sepia Officinalis", "Sulphur"] },
        { label: "Worse Evening/Twilight (Somatic dusk decline)", remedies: ["Pulsatilla", "Phosphorus", "Lycopodium", "Aconitum Napellus"] }
      ]
    },
    {
      title: "Weather & Environment",
      icon: CloudRain,
      color: "text-sky-500",
      items: [
        { label: "Worse Damp, Wet Weather (Hydrogenoid)", remedies: ["Rhus Toxicodendron", "Dulcamara", "Natrum Sulphuricum", "Aranea Diadema", "Calcarea Carbonica", "Phytolacca Decandra"] },
        { label: "Worse Dry, Cold Air (Tense/Inflammatory)", remedies: ["Aconitum Napellus", "Hepar Sulphur", "Nux Vomica", "Spongia Tosta", "Causticum"] },
        { label: "Worse Before a Storm / Electric Changes", remedies: ["Rhododendron", "Psorinum", "Phosphorus", "Natrum Carbonicum", "Silicea"] }
      ]
    },
    {
      title: "Food & Drinks",
      icon: Utensils,
      color: "text-rose-500",
      items: [
        { label: "Craves Salt (Mineral deficit indicator)", remedies: ["Natrum Muriaticum", "Phosphorus", "Carbo Vegetabilis", "Causticum"] },
        { label: "Craves Sweets (Rapid glucose utilization)", remedies: ["Argentum Nitricum", "Lycopodium Clavatum", "Sulphur", "Calcarea Carbonica", "China"] },
        { label: "Worse from Fatty Foods & Pork", remedies: ["Pulsatilla Pratensis", "Carbo Vegetabilis", "Antimonium Crudum", "Ipecacuanha"] },
        { label: "Worse after eating / Fulness", remedies: ["Nux Vomica", "Lycopodium (few bites)", "Anacardium (eating relieves!)", "Abies Nigra"] }
      ]
    },
    {
      title: "Position & Sleep",
      icon: Moon,
      color: "text-indigo-500",
      items: [
        { label: "Sleeps on Abdomen (Chest/Abdomen relief)", remedies: ["Medorrhinum", "Cina", "Podophyllum Peltatum", "Aceticum Acidum"] },
        { label: "Worse Lying on Left Side (Cardiac load)", remedies: ["Phosphorus", "Lachesis Mutus", "Spigelia Anthelmia", "Phytolacca Decandra", "Cactus Grandiflorus"] },
        { label: "Better Lying on Painful Side (Pressure relief)", remedies: ["Bryonia Alba", "Colocynth", "Chamomilla", "Pulsatilla"] },
        { label: "Worse Lying on Painful Side", remedies: ["Hepar Sulphur", "Nux Vomica", "Silicea", "Arnica Montana"] }
      ]
    },
    {
      title: "Mental Modalities",
      icon: Brain,
      color: "text-fuchsia-500",
      items: [
        { label: "Worse from Consolation / Sympathy", remedies: ["Natrum Muriaticum", "Ignatia Amara", "Sepia Officinalis", "Silicea", "Phosphoricum Acidum"] },
        { label: "Better from Consolation & Weeping", remedies: ["Pulsatilla Pratensis", "Phosphorus", "Cyclamen Europeum"] },
        { label: "Better Alone / Worse Company", remedies: ["Sepia", "Nux Vomica", "Ignatia", "Gelsemium", "Carbo Vegetabilis"] },
        { label: "Fear of Solitude / Better Company", remedies: ["Arsenicum Album", "Lycopodium (wants in next room)", "Phosphorus", "Stramonium", "Hyoscyamus Niger"] }
      ]
    },
    {
      title: "Pain Modalities",
      icon: Zap,
      color: "text-amber-500",
      items: [
        { label: "Better from Hard Pressure & Friction", remedies: ["Colocynth", "Magnesia Phosphorica", "Bryonia Alba", "Platina", "Plumbum Metallicum"] },
        { label: "Better from Heat & Warm Wraps", remedies: ["Magnesia Phosphorica", "Arsenicum Album", "Nux Vomica", "Rhus Toxicodendron"] },
        { label: "Better from Cold / Ice Applications", remedies: ["Apis Mellifica (stinging)", "Pulsatilla", "Secale Cornutum", "Ledum Palustre"] }
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
             <a 
               href="https://drive.google.com/file/d/1o_hf7hoxzvbVb7sR4MOLCfodkZfglice/view?usp=drivesdk" 
               target="_blank" 
               rel="noopener noreferrer"
               className="w-40 h-40 rounded-full bg-primary text-white flex flex-col items-center justify-center gap-2 font-black uppercase tracking-widest text-[10px] shadow-2xl shadow-primary/40 hover:scale-110 active:scale-95 transition-all group select-none cursor-pointer text-center"
             >
                <Download className="w-8 h-8 group-hover:animate-bounce" />
                <span>PDF Download</span>
             </a>
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
