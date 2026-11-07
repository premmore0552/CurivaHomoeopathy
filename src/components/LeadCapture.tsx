import React from 'react';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const LeadCapture: React.FC = () => (
  <section className="rounded-3xl border border-white/10 bg-[#0F3D75] p-8 text-white shadow-xl dark:bg-[#0B0F19] md:p-12">
    <div className="max-w-2xl">
      <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest">
        <ShieldCheck className="h-4 w-4" /> Privacy-first updates
      </div>
      <h3 className="font-display text-3xl font-black tracking-tight md:text-4xl">
        Curiva Insights
      </h3>
      <p className="mt-4 max-w-xl text-sm leading-7 text-white/75">
        Educational articles and learning resources are available in the public library. Newsletter subscriptions are not currently enabled, so this page does not collect or submit your email address.
      </p>
      <Link to="/public-education" className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-xl bg-white px-5 py-3 text-xs font-black uppercase tracking-wider text-[#0F3D75] transition hover:bg-white/90">
        Explore public education <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  </section>
);

export default LeadCapture;
