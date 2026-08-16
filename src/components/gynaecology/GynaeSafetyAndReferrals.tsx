import React from 'react';
import { 
  AlertOctagon, 
  ShieldAlert, 
  PhoneCall, 
  Ambulance, 
  HeartHandshake, 
  CheckCircle2, 
  AlertTriangle,
  Flame
} from 'lucide-react';
import { emergencyReferralSafetyGuidelines } from '../../data/nchGynecologyCurriculum';

export function GynaeSafetyAndReferrals() {
  return (
    <div className="bg-gradient-to-br from-rose-950 via-red-900 to-rose-900 text-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl border border-rose-600/40 space-y-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Title & Badge */}
      <div className="relative z-10 space-y-3">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/30 text-red-200 border border-red-400/40 text-xs font-bold uppercase tracking-wider">
            <ShieldAlert className="w-4 h-4 text-red-300" />
            {emergencyReferralSafetyGuidelines.importance}
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight text-white">
          {emergencyReferralSafetyGuidelines.title}
        </h2>

        <p className="text-sm sm:text-base text-rose-100/90 leading-relaxed font-sans max-w-4xl">
          Under NCH Competency-Based Medical Education standards and ethical principles of patient safety, Homoeopathic physicians must maintain rigorous clinical vigilance. High-risk pregnancies, severe neonatal asphyxia, acute obstetric hemorrhages, and suspected malignancies require prompt life-saving first aid, stabilization, and immediate referral to multidisciplinary tertiary medical centers.
        </p>
      </div>

      {/* Emergency Categories Grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        {emergencyReferralSafetyGuidelines.guidelines.map((cat, idx) => (
          <div 
            key={idx}
            className="bg-black/30 backdrop-blur-md border border-white/15 rounded-2xl p-5 space-y-4 shadow-lg flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-rose-300 font-bold text-sm font-serif border-b border-white/10 pb-2">
                <AlertOctagon className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{cat.category}</span>
              </div>

              <ul className="space-y-2.5 text-xs text-rose-100/85">
                {cat.triggers.map((trigger, tIdx) => (
                  <li key={tIdx} className="flex items-start gap-2 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0 mt-1.5" />
                    <span>{trigger}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-rose-200 font-semibold">
              <span className="flex items-center gap-1">
                <Ambulance className="w-3.5 h-3.5 text-rose-300" />
                Emergency Protocol
              </span>
              <span>Immediate Action</span>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Emergency Action Box */}
      <div className="relative z-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-rose-100">
        <div className="flex items-center gap-3">
          <PhoneCall className="w-5 h-5 text-rose-300 shrink-0" />
          <span>
            <strong>Primary Care Golden Rule:</strong> Never delay emergency tertiary transfer for unproven remedies when clinical red flags of maternal or fetal compromise are manifest.
          </span>
        </div>
        <div className="shrink-0 px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-xl font-bold text-xs shadow-md transition-all">
          NCH Standard of Care
        </div>
      </div>
    </div>
  );
}
