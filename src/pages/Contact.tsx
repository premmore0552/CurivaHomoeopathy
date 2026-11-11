import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, GraduationCap, ExternalLink, AlertTriangle, BookOpen } from 'lucide-react';
import BrandIcon from '../components/BrandIcon';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';

export default function Contact() {
  return (
    <div className="min-h-screen bg-bg-primary pb-24 pt-24 transition-colors duration-300">
      <SEO
        title="Contact & Feedback | Curiva Homoeopathy"
        description="Find Curiva's public education resources and social channels. Protect personal and patient information when communicating online."
      />
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <motion.section initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} className="space-y-7">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-primary">
            <ShieldCheck className="h-4 w-4" /> Privacy-first contact information
          </div>
          <h1 className="font-display text-4xl font-black leading-tight text-text-primary md:text-6xl">
            Contact &amp; <span className="italic text-primary">Feedback.</span>
          </h1>
          <p className="max-w-xl text-base leading-8 text-text-secondary">
            Curiva is an educational platform. The website does not currently operate a verified online feedback inbox or newsletter subscription service. We do not display a contact form that pretends to submit information.
          </p>
          <div className="rounded-3xl border border-border bg-bg-secondary p-6">
            <h2 className="flex items-center gap-2 text-lg font-bold text-text-primary"><BookOpen className="h-5 w-5 text-primary" /> Browse educational resources</h2>
            <p className="mt-2 text-sm leading-6 text-text-secondary">For questions about the educational content, review the public library and the medical disclaimer first.</p>
            <Link to="/public-education" className="mt-4 inline-flex rounded-xl bg-primary px-5 py-3 text-xs font-bold text-white">Open Public Education</Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <a href="https://www.instagram.com/curivahomoeopathy/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-2xl border border-border bg-bg-secondary p-4 font-bold text-text-primary hover:border-primary/40">
              <BrandIcon brand="instagram" className="h-5 w-5 text-primary" /> Instagram <ExternalLink className="ml-auto h-4 w-4 text-text-tertiary" />
            </a>
            <a href="https://www.facebook.com/curivahomoeopathy/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-2xl border border-border bg-bg-secondary p-4 font-bold text-text-primary hover:border-primary/40">
              <BrandIcon brand="facebook" className="h-5 w-5 text-primary" /> Facebook <ExternalLink className="ml-auto h-4 w-4 text-text-tertiary" />
            </a>
          </div>
        </motion.section>

        <motion.aside initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="space-y-5">
          <div className="rounded-3xl border border-amber-500/30 bg-amber-500/5 p-6">
            <h2 className="flex items-center gap-2 text-lg font-bold text-text-primary"><AlertTriangle className="h-5 w-5 text-amber-600" /> Protect your information</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-text-secondary">
              <li>Do not send patient names, phone numbers, addresses, medical-record numbers, photographs, diagnoses or case histories through social media.</li>
              <li>Do not use social media or this website for urgent symptoms or emergencies.</li>
              <li>Do not upload medical reports or identity documents to general learning tools.</li>
              <li>Social platforms process data under their own privacy terms; opening them takes you outside Curiva.</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-border bg-bg-secondary p-6">
            <h2 className="text-lg font-bold text-text-primary">A note about online communication</h2>
            <p className="mt-3 text-sm leading-7 text-text-secondary">
              The social links above are public channels, not secure clinical communication services. A response or review is not guaranteed. For personal health concerns, contact a qualified registered healthcare professional through an appropriate, private channel. For emergencies, contact local emergency services.
            </p>
            <Link to="/privacy-policy" className="mt-5 inline-flex text-sm font-bold text-primary underline underline-offset-4">Read the Privacy Policy</Link>
          </div>
          <div className="flex items-start gap-3 rounded-2xl border border-border p-5 text-xs leading-6 text-text-tertiary">
            <GraduationCap className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            Curiva's public learning resources are for education and do not create a doctor–patient relationship or provide individual diagnosis or treatment.
          </div>
        </motion.aside>
      </div>
    </div>
  );
}
