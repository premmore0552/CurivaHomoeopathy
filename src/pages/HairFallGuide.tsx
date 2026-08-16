import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { 
  BookOpen, 
  Menu, 
  X, 
  Search, 
  Bookmark, 
  Sparkles, 
  Send, 
  ArrowLeft, 
  ArrowRight,
  Sun, 
  Moon, 
  Volume2, 
  VolumeX, 
  Loader2, 
  Check, 
  Info,
  ChevronRight,
  User,
  Activity,
  Award,
  AlertTriangle,
  Leaf,
  Brain,
  Coffee,
  CheckCircle,
  Hash
} from "lucide-react";
import SEO from "../components/SEO";

// Define Types
interface Chapter {
  id: string;
  title: string;
  subtitle: string;
  type?: string;
  content: string;
}

export default function HairFallGuide() {
  const navigate = useNavigate();
  
  // Embedded Complete Book Content Database
  const BOOK_DATA: Chapter[] = [
    {
      id: "cover",
      title: "Front Cover",
      subtitle: "Interactive Title Hub",
      type: "cover",
      content: `
        <div class="text-center py-10 md:py-16 max-w-2xl mx-auto flex flex-col items-center justify-center min-h-[50vh]">
          <span class="text-xs md:text-sm uppercase tracking-[0.3em] font-bold text-emerald-600 dark:text-emerald-400 mb-4 block">CURIVA HOMOEOPATHY</span>
          
          <h1 class="text-4xl md:text-6xl font-serif font-black text-slate-900 dark:text-white leading-tight tracking-tight mb-4">
            HAIR FALL<br><span class="text-emerald-700 dark:text-emerald-400 font-normal italic">RECOVERY GUIDE</span>
          </h1>
          
          <p class="text-lg md:text-xl text-slate-600 dark:text-slate-300 font-serif italic max-w-lg mb-8">
            Understanding Hair Loss, Building Better Habits & Supporting Healthier Hair Naturally
          </p>

          <div class="h-0.5 w-24 bg-emerald-500 dark:bg-emerald-600 my-4"></div>

          <p class="text-xs md:text-sm tracking-wide text-slate-500 dark:text-slate-400 max-w-md mb-10">
            A Practical Guide for Students, Professionals, Men & Women Living in the Modern World
          </p>

          <div class="bg-emerald-50 dark:bg-zinc-800/80 rounded-2xl p-6 text-left w-full border border-emerald-100 dark:border-zinc-700 mb-10 max-w-md shadow-sm">
            <span class="text-xs uppercase font-bold tracking-wider text-emerald-950 dark:text-emerald-400 block mb-3">🔍 What's Inside:</span>
            <ul class="space-y-2.5 text-xs md:text-sm text-slate-700 dark:text-slate-300">
              <li class="flex items-center gap-2"><span class="text-emerald-600 font-bold">✓</span> Causes of Hair Fall Honestly Explained</li>
              <li class="flex items-center gap-2"><span class="text-emerald-600 font-bold">✓</span> Stress, Sleep & Nutrition Insights</li>
              <li class="flex items-center gap-2"><span class="text-emerald-600 font-bold">✓</span> Social Media Hair Myths Debunked</li>
              <li class="flex items-center gap-2"><span class="text-emerald-600 font-bold">✓</span> Practical 90-Day Action Plan & Scorecard</li>
              <li class="flex items-center gap-2"><span class="text-emerald-600 font-bold">✓</span> Traditional Homoeopathic Constitutional Insights</li>
            </ul>
          </div>

          <div class="text-slate-500 dark:text-slate-400 text-xs italic max-w-sm">
            &ldquo;Healthy hair is rarely built by a miracle product. It is almost always the result of healthier daily choices.&rdquo;
          </div>
        </div>
      `
    },
    {
      id: "ch1",
      title: "Chapter 1",
      subtitle: "A Personal Conversation About Hair Fall",
      content: `
        <h2 class="text-3xl md:text-4xl font-serif font-black text-slate-900 dark:text-white mb-6">Before We Begin: A Personal Conversation About Hair Fall</h2>
        <p class="mb-4">Let me ask you something.</p>
        <p class="mb-4">When was the last time you looked in the mirror and checked your hairline? Yesterday? This morning? A few minutes ago?</p>
        <p class="mb-4 font-medium text-slate-800 dark:text-slate-100">If you're reading this guide, chances are hair fall has become more than just a health concern. It has become an emotional concern.</p>
        <p class="mb-4">And that's completely understandable. Hair is deeply connected to how we see ourselves. It affects confidence, first impressions, photographs, social interactions, and self-esteem.</p>
        <p class="mb-6">For many people, hair represents youth, vitality, attractiveness, and identity. So when hair starts falling excessively, the emotional impact can be much bigger than most people realize.</p>

        <div class="bg-amber-50/60 dark:bg-amber-950/20 border-l-4 border-amber-500 p-5 rounded-r-xl mb-6 shadow-sm">
          <p class="font-bold text-amber-900 dark:text-amber-400 mb-1 flex items-center gap-1.5 text-sm uppercase tracking-wider">
            <span class="text-amber-500">⚠</span> The Hidden Anxiety Nobody Talks About
          </p>
          <p class="text-sm text-slate-700 dark:text-slate-350 leading-relaxed">
            Hair fall doesn't usually start with panic. It starts with curiosity. You notice a few extra hairs on your pillow. You tell yourself: "It's probably nothing." Then you see more hair while shampooing. Again you reassure yourself: "It happens to everyone." Then comes the bathroom drain, the comb, the floor, the hairline...
          </p>
        </div>

        <h3 class="text-xl font-serif font-bold text-slate-800 dark:text-zinc-200 mt-8 mb-4">The Social Media Problem</h3>
        <p class="mb-4">Let's be honest. Today's generation is growing up in a world where appearance receives more attention than ever before. Every day we see perfect hairstyles, perfect beards, perfect skin, and perfect transformations. But what we rarely see is reality.</p>
        <p class="mb-4">We don't see stress, poor sleep, nutritional deficiencies, hormonal disorders, anxiety, burnout, or general health struggles. What we see is the final edited version. Comparing our reality to someone else's highlight reel can create enormous stress&mdash;which, ironically, may worsen hair fall.</p>
        
        <div class="my-6 p-5 bg-emerald-50 dark:bg-zinc-800/50 rounded-2xl border border-emerald-100 dark:border-zinc-700 text-sm">
          <span class="uppercase tracking-wider font-semibold text-emerald-800 dark:text-emerald-400 text-xs block mb-2">What This Book Is NOT</span>
          <p class="text-slate-600 dark:text-slate-300 leading-relaxed">
            This book is not a miracle solution. It will not promise to grow all your hair back in 7 days or reverse pattern baldness overnight. Real, sustainable improvement comes from understanding the problem honestly and addressing its root biological triggers.
          </p>
        </div>
      `
    },
    {
      id: "ch2",
      title: "Chapter 2",
      subtitle: "Why Hair Fall Feels Worse Today",
      content: `
        <h2 class="text-3xl md:text-4xl font-serif font-black text-slate-900 dark:text-white mb-6">Why Hair Fall Feels Worse Today Than Ever Before</h2>
        <p class="mb-4">Have you ever noticed that almost everyone seems to be talking about hair fall these days? College students, young professionals, gym enthusiasts, content creators, and even teenagers.</p>
        <p class="mb-4">Hair fall has become so common that many assume it is normal. But why is it happening? Has human anatomy suddenly mutated? Not really. What has changed is our lifestyle. And dramatically so.</p>

        <h3 class="text-xl font-serif font-bold text-slate-800 dark:text-zinc-200 mt-8 mb-4">Imagine Two Different Days</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          <div class="p-5 bg-slate-100 dark:bg-zinc-800/80 rounded-xl shadow-sm border border-slate-200/50 dark:border-zinc-700">
            <span class="font-black text-slate-800 dark:text-zinc-200 block mb-2 uppercase tracking-wide text-xs">30 Years Ago</span>
            <ul class="space-y-1.5 text-sm list-disc list-inside text-slate-600 dark:text-slate-400">
              <li>Wake up early with normal biological light</li>
              <li>Eat home-cooked breakfast</li>
              <li>Walk or cycle, catching morning sunlight</li>
              <li>Eat freshly prepared seasonal food</li>
              <li>Sleep relatively early in deep darkness</li>
            </ul>
          </div>
          <div class="p-5 bg-emerald-50/50 dark:bg-emerald-950/20 rounded-xl border border-emerald-100 dark:border-zinc-700 shadow-sm">
            <span class="font-black text-emerald-800 dark:text-emerald-400 block mb-2 uppercase tracking-wide text-xs">Typical Day Today</span>
            <ul class="space-y-1.5 text-sm list-disc list-inside text-slate-700 dark:text-slate-350">
              <li>Wake up after multiple snooze alarms, feeling tired</li>
              <li>Skip breakfast, rush out on an empty stomach</li>
              <li>Sit for 8+ hours directly staring at screens</li>
              <li>Order fast processed food online</li>
              <li>Sleep long after midnight scrolling blue light</li>
            </ul>
          </div>
        </div>

        <h3 class="text-xl font-serif font-bold text-slate-800 dark:text-zinc-200 mt-8 mb-4">Hair Is Not Essential For Survival</h3>
        <p class="mb-4">This may sound strange. But your body doesn't consider hair a priority. Your biology prioritizes your heart, brain, lungs, kidneys, and immune system. When nutrients or energy levels become limited due to stress or poor diet, resources are immediately directed toward survival first. Hair receives whatever residual materials are left.</p>
        <p class="mb-4">That's why nutritional gaps, chronic stress, and systemic exhaustion show up in your hair quality first. Your hair is often a direct, sensitive thermometer of your internal wellness.</p>
      `
    },
    {
      id: "ch3",
      title: "Chapter 3",
      subtitle: "The Science of Hair Growth",
      content: `
        <h2 class="text-3xl md:text-4xl font-serif font-black text-slate-900 dark:text-white mb-6">The Science of Hair Growth (Made Simple)</h2>
        <p class="mb-4">Before we talk about stopping hair fall, let's establish a core rule. You cannot protect what you do not understand.</p>
        <p class="mb-4">Most modern consumers know more about their smartphone specifications than their own hair. They know how many megapixels their camera is, how much RAM their device hosts, but ask them how their own hair roots generate tissue, and they remain in the dark.</p>
        
        <div class="bg-emerald-50 dark:bg-zinc-800/80 p-5 rounded-2xl border border-emerald-100/60 dark:border-zinc-700 my-6 shadow-sm">
          <span class="font-bold text-emerald-800 dark:text-emerald-400 block mb-2 text-sm uppercase tracking-wide">💡 The Alive/Dead Paradox</span>
          <p class="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            The strand of hair you see above your scalp is actually <strong>dead keratinized tissue</strong>. It has no nervous system, nor does it heal or self-repair. That is why split ends cannot be glued back together by heavy branding. Real hair growth and nourishment happens exclusively underneath the skin at the living base of the <strong>hair follicle</strong>.
          </p>
        </div>

        <h3 class="text-xl font-serif font-bold text-slate-800 dark:text-zinc-200 mt-8 mb-4">Meet The Hair Follicle</h3>
        <p class="mb-4">Imagine a tiny factory beneath your scalp. Each follicle works completely independently from its neighbors, possesses its own biological clock, and generates its own hair strand. Your scalp contains roughly 80,000 to 150,000 of these independent factories.</p>
        <p class="mb-4">On average, hair grows approximately <strong>1 to 1.5 centimeters per month</strong>. That is roughly 12 to 18 centimeters per year. This slow, steady biological cycle explains why advertising campaigns promising dramatic thickness changes within 3 to 7 days are scientifically impossible.</p>
      `
    },
    {
      id: "ch4",
      title: "Chapter 4",
      subtitle: "Understanding Your Hair Follicles",
      content: `
        <h2 class="text-3xl md:text-4xl font-serif font-black text-slate-900 dark:text-white mb-6">Understanding Your Hair Follicles</h2>
        <p class="mb-4">If hair strands are the trees, then hair follicles are the roots embedded in the micro-soil. Any qualified gardener knows that nurturing rich roots is far more critical than polishing withered leaves.</p>
        <p class="mb-4">Unfortunately, most commercial attention is spent strictly on hair shafts. People seek immediate glossy surfaces through chemicals rather than supporting the follicles underneath. Yet those follicles hold the key to density, strength, and continuous growth.</p>
        
        <h3 class="text-xl font-serif font-bold text-slate-800 dark:text-zinc-200 mt-8 mb-4">The Need for Microcirculation</h3>
        <p class="mb-4">Your blood delivers crucial oxygen, proteins (amino acids), ferritin, zinc, vitamins, and metabolic hormones to the base of your follicles. Without rich microcirculation and high-quality internal nutrition, follicles gradually shrink and enter dormant states.</p>
        
        <div class="bg-red-50 dark:bg-red-950/20 border-l-4 border-red-500 p-5 rounded-r-xl my-6">
          <span class="font-bold text-red-900 dark:text-red-400 block mb-2 text-sm uppercase tracking-wider">☠ What Damages Follicle Integrity?</span>
          <ul class="list-disc list-inside space-y-1.5 text-sm text-slate-700 dark:text-slate-350">
            <li><strong>Poor Systemic Nutrition:</strong> Minimal protein intake and missing core trace elements.</li>
            <li><strong>Vasoconstriction:</strong> Triggered by smoking, which blocks micro-capillary flow.</li>
            <li><strong>Local Inflammation:</strong> Stubborn fungal dandruff, sebum plug blockage, or chemical irritation.</li>
            <li><strong>Severe Circadian Disruption:</strong> Compromising nightly growth hormone release.</li>
          </ul>
        </div>

        <p class="mb-4">The encouraging reality is most follicles in early thinning are not dead; they are simply struggling. Improving your biological baseline can revitalize dormant follicles before they become fully scarred or miniaturized.</p>
      `
    },
    {
      id: "ch5",
      title: "Chapter 5",
      subtitle: "The Hair Growth Cycle",
      content: `
        <h2 class="text-3xl md:text-4xl font-serif font-black text-slate-900 dark:text-white mb-6">The Hair Growth Cycle Nobody Explains Properly</h2>
        <p class="mb-4">Most people believe that "Losing hair = Crisis." But shedding is an essential part of the cellular lifecycle. Every healthy scalp sheds hair daily as part of its renewal cycle.</p>
        <p class="mb-6">The difference is that healthy shedding is balanced by matching follicle regeneration. Thinning only occurs when more follicles enter the resting phase than the active growth phase.</p>

        <div class="space-y-4">
          <div class="p-5 bg-emerald-50 dark:bg-zinc-800 text-slate-800 dark:text-slate-100 rounded-xl border border-emerald-100/60 shadow-sm">
            <span class="font-bold text-emerald-800 dark:text-emerald-400 block text-lg mb-1">Phase 1: The Growing Phase (Anagen)</span>
            <p class="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              This is the active production factory. Cells divide rapidly, amino acids form keratin chains, and the hair actively extends. This phase typically lasts <strong>2 to 7 years</strong>. Approximately 85% to 90% of your scalp is in this phase at any point.
            </p>
          </div>
          <div class="p-5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200">
            <span class="font-semibold text-slate-800 dark:text-zinc-200 block text-lg mb-1">Phase 2: The Transition Phase (Catagen)</span>
            <p class="text-sm text-slate-600 dark:text-slate-350 leading-relaxed">
              The follicle shuts off from active blood supply, the hair bulb detaches slightly, and growth halts. This is a brief transition lasting roughly <strong>2 to 3 weeks</strong>.
            </p>
          </div>
          <div class="p-5 bg-amber-50/50 dark:bg-amber-900/10 rounded-xl border border-amber-200/50">
            <span class="font-bold text-amber-800 dark:text-amber-400 block text-lg mb-1">Phase 3: The Resting Phase (Telogen)</span>
            <p class="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              The detached "club hair" rests in the dormant follicle, eventually shedding when a new anagen hair begins pushing out, or during local friction (combing/shampooing). This phase lasts roughly <strong>3 months</strong> (representing 10% to 15% of your hairs).
            </p>
          </div>
        </div>

        <div class="bg-blue-50 dark:bg-blue-950/20 border-l-4 border-blue-500 p-5 rounded-r-xl my-6 shadow-sm">
          <span class="font-bold text-blue-900 dark:text-blue-400 block mb-1 text-sm uppercase tracking-wider">🔬 Telogen Effluvium (The 90-Day Delay)</span>
          <p class="text-sm text-slate-700 dark:text-slate-350 leading-relaxed">
            When you experience severe mental grief, high fever, viral illness, major surgery, or start an immediate crash restriction diet, your biology shocks a massive percentage of active follicles directly into the resting (Telogen) stage. 
            However, <strong>the hairs do not shed immediately</strong>. They occupy the resting stage and fall out in clumps <strong>2 to 4 months later</strong>. This delay is why many people fail to connect their hair fall to a prior stress event.
          </p>
        </div>
      `
    },
    {
      id: "ch6",
      title: "Chapter 6",
      subtitle: "Why Losing Hair Is Normal—Until It Isn't",
      content: `
        <h2 class="text-3xl md:text-4xl font-serif font-black text-slate-900 dark:text-white mb-6">Why Losing Hair Is Normal—Until It Isn't</h2>
        <p class="mb-4">It is fully normal to shed <strong>50 to 100 hairs per day</strong>. If you have long, dark hair, even a normal shedding of 40 hairs looks visually dramatic when trapped in a bathroom drain or on a comb, leading to unneeded panic.</p>

        <h3 class="text-xl font-serif font-bold text-slate-800 dark:text-zinc-200 mt-8 mb-4">Signs That Indicate Genuine Thinning</h3>
        <ul class="space-y-3 list-none mb-6">
          <li class="flex items-start gap-2.5">
            <span class="text-amber-500 font-bold shrink-0">⚡</span>
            <div><strong>Reduced Density:</strong> Your ponytail feels noticeably lighter, or scalp skin becomes easily visible under bright lights.</div>
          </li>
          <li class="flex items-start gap-2.5">
            <span class="text-amber-500 font-bold shrink-0">⚡</span>
            <div><strong>Widening Part:</strong> The central partition line gets progressively wider, or the frontal hairline Recedes at the temples.</div>
          </li>
          <li class="flex items-start gap-2.5">
            <span class="text-amber-500 font-bold shrink-0">⚡</span>
            <div><strong>Chronic Prolonged Shedding:</strong> High hair loss that continues heavily for more than 4-6 months consecutively.</div>
          </li>
          <li class="flex items-start gap-2.5">
            <span class="text-amber-500 font-bold shrink-0">⚡</span>
            <div><strong>Bald Patches:</strong> Defined, smooth round spots of total hair loss (indicates alopecia areata, an autoimmune response).</div>
          </li>
        </ul>

        <div class="bg-emerald-50 dark:bg-zinc-800 p-5 rounded-xl border border-emerald-100 dark:border-zinc-700 shadow-sm text-sm">
          <span class="font-bold text-emerald-800 dark:text-emerald-400 block mb-2 uppercase tracking-wide">Hair Fall vs. Hair Breakage</span>
          <p class="mb-2"><strong>Hair Fall:</strong> The entire hair strand slides completely out from the follicle root. You will observe a tiny, off-white biological bulb at the tip of the strand.</p>
          <p><strong>Hair Breakage:</strong> The strand snaps midway due to surface brittleness, heat styling, or excessive pulling. There is no white bulb. The living root is completely unaffected.</p>
        </div>
      `
    },
    {
      id: "ch7",
      title: "Chapter 7",
      subtitle: "The Real Causes of Hair Fall",
      content: `
        <h2 class="text-3xl md:text-4xl font-serif font-black text-slate-900 dark:text-white mb-6">The Real Causes of Hair Fall in Modern Life</h2>
        <p class="mb-4">Hair fall is rarely an isolated phenomenon. It is a language your biology uses to alert you that several internal or environmental systems are out of balance.</p>
        
        <div class="space-y-4 my-6">
          <div class="border-b border-slate-200 dark:border-zinc-800 pb-4">
            <span class="font-bold text-slate-900 dark:text-zinc-100 block text-base mb-1">1. Chronic Mental & Emotional Stress</span>
            <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Flooding the system with elevated cortisol levels forces growing follicles to enter premature hibernation.
            </p>
          </div>
          <div class="border-b border-slate-200 dark:border-zinc-800 pb-4">
            <span class="font-bold text-slate-900 dark:text-zinc-100 block text-base mb-1">2. Chronic Sleep Deprivation</span>
            <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Disrupting your circadian patterns prevents cellular regeneration and stops growth hormones from repairing follicle cells nightly.
            </p>
          </div>
          <div class="border-b border-slate-200 dark:border-zinc-800 pb-4">
            <span class="font-bold text-slate-900 dark:text-zinc-100 block text-base mb-1">3. Systemic Protein Deficiencies</span>
            <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Living on low-protein raw foods or carb-heavy fast food deprives the body of the key building materials (amino acids) to synthesize hair keratin.
            </p>
          </div>
          <div class="border-b border-slate-200 dark:border-zinc-800 pb-4">
            <span class="font-bold text-slate-900 dark:text-zinc-100 block text-base mb-1">4. Missing Micronutrient Gaps</span>
            <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Sub-optimal levels of Vitamin D3, Iron/Ferritin, Vitamin B12, and Zinc systematically starve cell division.
            </p>
          </div>
          <div class="pb-2">
            <span class="font-bold text-slate-900 dark:text-zinc-100 block text-base mb-1">5. Endocrine & Hormonal Shifts</span>
            <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Conditions like thyroid imbalances, insulin resistance, or Polycystic Ovary Syndrome (PCOS) actively alter hair follicle sensitivity.
            </p>
          </div>
        </div>
      `
    },
    {
      id: "ch8",
      title: "Chapter 8",
      subtitle: "Stress, Cortisol & Hair Loss",
      content: `
        <h2 class="text-3xl md:text-4xl font-serif font-black text-slate-900 dark:text-white mb-6">Stress, Cortisol & Hair Loss — Explained Like a Friend</h2>
        <p class="mb-4">Let's have an honest talk about stress. We don't mean "motivational stress" that prompts you to work harder. We mean the silent, exhausting stress that runs your mind in circles, clenches your jaw, and follows you into the shower.</p>
        <p class="mb-4">To your ancient nervous system, exam anxiety, emotional breakups, professional burnout, and financial stress are processed identifying the same chemical signals: "Alert! Danger nearby."</p>

        <div class="bg-emerald-50 dark:bg-zinc-800/80 p-5 rounded-2xl border border-emerald-100 dark:border-zinc-700 my-6 shadow-sm">
          <span class="font-bold text-emerald-800 dark:text-emerald-400 block mb-2 text-sm uppercase tracking-wide">🧠 Cortisol: The Resource Diverter</span>
          <p class="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            Cortisol is your primary stress survival hormone. Under sustained cortisol spikes, your biology suppresses non-essential processes (like hair follicle development, digestion, and skin cell turnover) to preserve energy for muscle defense. 
          </p>
        </div>

        <p class="mb-4">Because of the delayed 90-day growth cycle, the stress you endured during high exams in January will show up as heavy hair shedding on your comb in April. Recognizing this connection is key to preventing useless product hopping.</p>
      `
    },
    {
      id: "ch9",
      title: "Chapter 9",
      subtitle: "The Sleep Deprivation Epidemic",
      content: `
        <h2 class="text-3xl md:text-4xl font-serif font-black text-slate-900 dark:text-white mb-6">The Sleep Deprivation Epidemic: Why Late Nights Kill Follicles</h2>
        <p class="mb-4">"Just one more minute on social media..." turns into 2:30 AM. This is one of the most destructive lifestyle traps of our modern era.</p>
        <p class="mb-4">Sleep is not just rest for your conscious mind; it is a vital metabolic, neuro-chemical cleaning session for your entire body. While you sleep in deep darkness, your pineal gland releases crucial hormones that direct cellular repair and control oxidative stress.</p>

        <div class="bg-amber-50/60 dark:bg-amber-900/20 border-l-4 border-amber-500 p-5 rounded-r-xl my-6">
          <span class="font-semibold text-amber-900 dark:text-amber-400 block mb-1 flex items-center gap-1 text-sm uppercase tracking-wider">📱 The Blue Light Crisis</span>
          <p class="text-sm text-slate-700 dark:text-slate-350 leading-relaxed">
            Staring directly at glowing phones or laptops late at night floods your optic nerve with blue light, tricking your brain into thinking it is noon. This strongly suppresses melatonin production, preventing your body from entering deep, restorative sleep stages. The result? Sub-optimal healing and elevated morning cortisol.
          </p>
        </div>

        <p class="mb-4">By systematically cutting your sleep to 5 or 6 chaotic hours, you are physically denying your hair follicles the necessary overnight cell-regeneration cycles needed to stay in their growth phase.</p>
      `
    },
    {
      id: "ch10",
      title: "Chapter 10",
      subtitle: "The Protein Crisis",
      content: `
        <h2 class="text-3xl md:text-4xl font-serif font-black text-slate-900 dark:text-white mb-6">The Protein Crisis</h2>
        <p class="mb-4">Imagine trying to build a solid brick house without any actual bricks. It is fully impossible. Yet, millions of people expect their bodies to grow dense, strong hair while consuming almost zero protein.</p>
        <p class="mb-4">Your hair strand is essentially comprised of a tough structural protein called <strong>keratin</strong>. No matter what expensive serums, designer botanical shampoos, or scalp oils you apply to the dead surface hair, your follicles require ingestible proteins (amino acids) to synthesize strong hair tissue.</p>

        <h3 class="text-xl font-serif font-bold text-slate-800 dark:text-zinc-200 mt-8 mb-4">Quality & Easy Protein Sources</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          <div class="p-5 bg-emerald-50 dark:bg-zinc-800 rounded-xl border border-emerald-100 dark:border-zinc-700 shadow-sm">
            <span class="font-bold text-emerald-800 dark:text-emerald-400 block mb-3 uppercase tracking-wide text-xs">🌿 Plant-Based (Vegetarian)</span>
            <ul class="space-y-1.5 text-sm text-slate-700 dark:text-slate-300">
              <li>• Chickpeas & Lentils (Dals)</li>
              <li>• Paneer & Greek Yogurt</li>
              <li>• Soya Chunks & Tofu</li>
              <li>• Sprouted Moong & Peanuts</li>
            </ul>
          </div>
          <div class="p-5 bg-blue-50/50 dark:bg-zinc-800 rounded-xl border border-blue-100 dark:border-zinc-700 shadow-sm">
            <span class="font-bold text-blue-800 dark:text-blue-400 block mb-3 uppercase tracking-wide text-xs">🍳 Animal-Based (Non-Vegetarian)</span>
            <ul class="space-y-1.5 text-sm text-slate-700 dark:text-slate-300">
              <li>• Farm-Fresh Whole Eggs</li>
              <li>• Grilled Lean Chicken breast</li>
              <li>• Salmon & Cod (Oils provide fatty acids)</li>
              <li>• Clean Whey Isolate (If active)</li>
            </ul>
          </div>
        </div>

        <p class="mb-4">A simple, powerful starting point: Ensure your morning breakfast has a clean source of protein (like eggs or sprouts) rather than just carbohydrate-heavy biscuits and sugary milk tea.</p>
      `
    },
    {
      id: "ch11",
      title: "Chapter 11",
      subtitle: "Vitamin D, Iron, B12 & Zinc",
      content: `
        <h2 class="text-3xl md:text-4xl font-serif font-black text-slate-900 dark:text-white mb-6">Vitamin D, Iron, B12 & Zinc — The Hidden Deficiencies</h2>
        <p class="mb-4">If the soil lacks fundamental minerals, even the most watered seedling cannot sprout into a strong tree. Similarly, your hair factories require precise chemical co-factors to manufacture keratin.</p>

        <div class="space-y-4 my-6">
          <div class="p-4 bg-slate-100 dark:bg-zinc-800 rounded-xl border border-slate-200">
            <span class="font-black text-slate-800 dark:text-zinc-200 block mb-1">☀ Vitamin D3 (The Hormone Precursor)</span>
            <p class="text-sm text-slate-600 dark:text-slate-400">
              Modern indoor life has left up to 80% of urban workers highly deficient. D3 acts as a key to turn on active hair growth cycles. Low levels are strongly linked to chronic thinning.
            </p>
          </div>
          <div class="p-4 bg-slate-100 dark:bg-zinc-800 rounded-xl border border-slate-200">
            <span class="font-black text-slate-800 dark:text-zinc-200 block mb-1">🩸 Iron & Ferritin (The Oxygen Carriage)</span>
            <p class="text-sm text-slate-600 dark:text-slate-400">
              Iron is needed to synthesize hemoglobin, which carries oxygen directly to your dividing follicle cells. Sub-optimal reserves (ferritin < 40 ug/L) force follicles to prematurely exit the growing phase.
            </p>
          </div>
          <div class="p-4 bg-slate-100 dark:bg-zinc-800 rounded-xl border border-slate-200">
            <span class="font-black text-slate-800 dark:text-zinc-200 block mb-1">🧬 B12 & Zinc (The Cellular Engines)</span>
            <p class="text-sm text-slate-600 dark:text-slate-400">
              Zinc is a central cofactor for dynamic cell division and structural enzyme pathways. B12 supports standard red blood cell development and robust energy patterns.
            </p>
          </div>
        </div>

        <p class="mb-4">Instead of buying arbitrary "hair gummies" based on internet hype, get a targeted blood check for Ferritin, Vitamin D3, and Vitamin B12, then consult a trusted physician.</p>
      `
    },
    {
      id: "ch12",
      title: "Chapter 12",
      subtitle: "Hormones & Hair",
      content: `
        <h2 class="text-3xl md:text-4xl font-serif font-black text-slate-900 dark:text-white mb-6">Hormones & Hair: The Endocrine Traffic System</h2>
        <p class="mb-4">If nutrients are the bricks and sleep is the factory schedule, then hormones are the supervisors. They dictate how resources are distributed across your biology.</p>
        
        <h3 class="text-xl font-serif font-bold text-slate-850 dark:text-zinc-200 mt-6 mb-3">Core Hormonal Triggers</h3>
        <div class="space-y-4">
          <div class="p-5 bg-emerald-50 dark:bg-zinc-800 rounded-xl border-l-4 border-emerald-500 shadow-sm">
            <span class="font-bold text-emerald-950 dark:text-emerald-400 block mb-1">Polycystic Ovary Syndrome (PCOS) & Androgens</span>
            <p class="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              Insulin resistance triggers higher levels of free androgens (male hormones) in women. This hormone profile miniaturizes top-scalp follicles while promoting unwanted facial hair.
            </p>
          </div>
          <div class="p-5 bg-emerald-50 dark:bg-zinc-800 rounded-xl border-l-4 border-emerald-500 shadow-sm">
            <span class="font-bold text-emerald-950 dark:text-emerald-400 block mb-1">Chronic Thyroid Imbalances</span>
            <p class="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              Both hypothyroidism (sluggish thyroid) and hyperthyroidism (overactive thyroid) can cause widespread dry skin, sluggish metabolism, and diffuse systemic hair thinning.
            </p>
          </div>
        </div>

        <p class="mt-5 mb-4">Using temporary surface remedies cannot fix deep endocrine shifts. Restoring hormonal balance under professional medical guidance is essential for true healing.</p>
      `
    },
    {
      id: "ch13",
      title: "Chapter 13",
      subtitle: "Student Hair Fall Factory",
      content: `
        <h2 class="text-3xl md:text-4xl font-serif font-black text-slate-900 dark:text-white mb-6">Student Hair Fall: Why College Life is a Hair Fall Factory</h2>
        <p class="mb-4">Let's look at a typical day for a modern college student: late-night study sessions, sleeping at 3 AM, skipping breakfast, living on instant noodles and cheap canteen junk food, and dealing with constant exam anxiety.</p>
        <p class="mb-4">While this routine is common in hostel life, it is extremely taxing on your physical biology. Your hair is often the first system to reflect this chronic strain.</p>

        <div class="bg-amber-50/60 dark:bg-amber-900/20 border-l-4 border-amber-500 p-5 rounded-r-xl my-6">
          <span class="font-semibold text-amber-900 dark:text-amber-400 block mb-1 text-sm uppercase tracking-wider">🏠 The Hostel Diet Reality</span>
          <p class="text-sm text-slate-700 dark:text-slate-350 leading-relaxed">
            Hostel food often lacks quality proteins, real iron, and essential trace minerals. Combined with high stress during exams and overuse of high-caffeine energy drinks, this creates the perfect conditions for telogen effluvium (delayed heavy shedding).
          </p>
        </div>

        <p class="mb-4">Remember: Your grades are important, but sacrificing your physical health isn't necessary for success. Making simple changes, like waking up 30 minutes earlier for breakfast and setting a consistent bedtime, can yield compounding positive outcomes over time.</p>
      `
    },
    {
      id: "ch14",
      title: "Chapter 14",
      subtitle: "Working Professionals & Burnout",
      content: `
        <h2 class="text-3xl md:text-4xl font-serif font-black text-slate-900 dark:text-white mb-6">Working Professionals & Burnout</h2>
        <p class="mb-4">"Once I start my career, everything will fall into place!" Then comes the reality: demanding deadlines, back-to-back meetings, long commutes, and late-night emails.</p>
        <p class="mb-4">Your body doesn't distinguish between academic stress and corporate stress. It simply responds to the chronic workload by releasing cortisol and conserving resources.</p>

        <div class="p-5 bg-slate-100 dark:bg-zinc-800 rounded-2xl border border-slate-200">
          <span class="font-bold text-slate-800 dark:text-zinc-200 block mb-3 text-sm uppercase tracking-wider">💼 Corporate Lifestyle Challenges</span>
          <ul class="space-y-2 text-sm text-slate-700 dark:text-slate-300">
            <li class="flex items-center gap-2">✓ Sitting for 8-10 hours at a desk (limiting overall circulation)</li>
            <li class="flex items-center gap-2">✓ Skipping real meals or eating quickly while working</li>
            <li class="flex items-center gap-2">✓ Drinking multiple cups of coffee to mask fatigue</li>
            <li class="flex items-center gap-2">✓ Checking work emails in bed, which disrupts sleep</li>
          </ul>
        </div>

        <p class="mt-5 mb-4">Burnout builds gradually over time. When your body is physically exhausted, non-essential processes like hair growth are deprioritized. Your career is important, but remember that your health is the vehicle that carries you forward.</p>
      `
    },
    {
      id: "ch15",
      title: "Chapter 15",
      subtitle: "Hair Fall in Women",
      content: `
        <h2 class="text-3xl md:text-4xl font-serif font-black text-slate-900 dark:text-white mb-6">Hair Fall in Women: More Than Just Cosmetic</h2>
        <p class="mb-4">Across cultures, hair is deeply connected to a woman's identity and self-expression. For this reason, experiencing hair thinning can feel deeply personal and emotionally challenging.</p>
        <p class="mb-4">Societal pressures often create unrealistic standards of perfect, thick hair, causing women with mild thinning to experience severe anxiety, resulting in constant mirror-checking and product-hopping.</p>

        <div class="bg-emerald-50 dark:bg-zinc-800/80 p-5 rounded-2xl border border-emerald-100 dark:border-zinc-700 my-6 shadow-sm">
          <span class="font-bold text-emerald-800 dark:text-emerald-400 block mb-2 text-sm uppercase tracking-wider">🌸 Key Biological Triggers</span>
          <ul class="space-y-3 text-sm text-slate-700 dark:text-slate-300">
            <li><strong>Postpartum Shedding:</strong> Estrogen levels drop sharply after childbirth, causing many hairs that stayed in the growth phase during pregnancy to shed all at once. This is temporary, and recovery usually begins within 6 months.</li>
            <li><strong>Iron & Ferritin Levels:</strong> Regular blood loss from menstruation, combined with a low-iron diet, often leads to sub-optimal ferritin reserves, reducing hair density.</li>
            <li><strong>Severe Stress & Styling:</strong> Tight hairstyles (traction alopecia) and harsh chemical straighteners can damage hair shafts and follicles over time.</li>
          </ul>
        </div>
      `
    },
    {
      id: "ch16",
      title: "Chapter 16",
      subtitle: "Hair Fall in Men & Genetics",
      content: `
        <h2 class="text-3xl md:text-4xl font-serif font-black text-slate-900 dark:text-white mb-6">Hair Fall in Men: Pattern Baldness, Genetics & Lifestyle</h2>
        <p class="mb-4">Checking your hairline in the mirror, comparing old photos, and searching the web at midnight for solutions&mdash;this is a shared experience for millions of men navigating early hair thinning.</p>

        <h3 class="text-xl font-serif font-bold text-slate-800 dark:text-zinc-200 mt-8 mb-4">Understanding Male Pattern Baldness (MPB)</h3>
        <p class="mb-4">Male pattern baldness, also known as Androgenetic Alopecia, is primarily driven by genetics and sensitivity to a hormone called <strong>Dihydrotestosterone (DHT)</strong>, which is a byproduct of testosterone.</p>

        <div class="bg-amber-50/60 dark:bg-amber-900/20 border-l-4 border-amber-500 p-5 rounded-r-xl my-6">
          <span class="font-semibold text-amber-900 dark:text-amber-400 block mb-1 text-sm uppercase tracking-wider">🔍 The Miniaturization Process</span>
          <p class="text-sm text-slate-700 dark:text-slate-350 leading-relaxed">
            If you have genetically sensitive scalp follicles, exposure to DHT causes them to shrink (miniaturize) over time. With each growth cycle, the hair produced becomes shorter, finer, and weaker, until the follicle eventually stops producing visible hair. This is a genetic process, not one caused by wearing caps, washing daily, or using hair styling gel.
          </p>
        </div>

        <p class="mb-4">While genetics sets your baseline blueprint, lifestyle factors like high stress, poor sleep, smoking, and nutritional deficiencies can influence how quickly that blueprint is expressed. Supporting your overall physical health can help maintain healthy hair follicles for longer.</p>
      `
    },
    {
      id: "ch17",
      title: "Chapter 17",
      subtitle: "Social Media vs Reality",
      content: `
        <h2 class="text-3xl md:text-4xl font-serif font-black text-slate-900 dark:text-white mb-6">Social Media vs Reality: The Hair Growth Lies</h2>
        <p class="mb-4">"Regrow hair in 7 days," "The secret oil that reverses baldness," "100% guaranteed results." Within minutes of scrolling, you're flooded with clickbait promises.</p>
        <p class="mb-4">Why? Because hair loss creates vulnerability and anxiety, and fear gets views. Unfortunately, many online creators understand this psychology all too well.</p>

        <div class="bg-slate-100 dark:bg-zinc-800 p-5 rounded-2xl my-6 border border-slate-200">
          <span class="font-bold text-slate-800 dark:text-zinc-200 block mb-2 text-sm uppercase tracking-wider">📸 The Transformation Trap</span>
          <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Before-and-after photos are often heavily influenced by professional studio lighting, specific grooming angles, styling techniques, cosmetic hair fibers, and digital filters. Real, biological hair recovery takes months and is rarely a quick, viral fix.
          </p>
        </div>

        <p class="mb-4">Be skeptical of overnight transformations and miracle products. Sustainable hair health is built on consistency and addressing the root causes of the issue, not quick-fix marketing.</p>
      `
    },
    {
      id: "ch18",
      title: "Chapter 18",
      subtitle: "The Truth About Oils, Shampoos & Supps",
      content: `
        <h2 class="text-3xl md:text-4xl font-serif font-black text-slate-900 dark:text-white mb-6">The Truth About Oils, Shampoos, Serums & Supplements</h2>
        <p class="mb-4">The global hair care market is worth billions, with endless products claiming to be revolutionary. Let's look past the marketing to understand what these products actually do.</p>

        <div class="space-y-4 my-6">
          <div class="p-4 bg-emerald-50 dark:bg-zinc-800 rounded-xl border border-emerald-100">
            <span class="font-bold text-emerald-800 dark:text-emerald-400 block mb-1">🏺 Hair Oils</span>
            <p class="text-sm text-slate-600 dark:text-slate-350 leading-relaxed">
              Oiling is excellent for conditioning the hair shaft, reducing dryness, and limiting mechanical breakage. However, oil cannot cure genetic hair loss or replace standard systemic nutrition.
            </p>
          </div>
          <div class="p-4 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200">
            <span class="font-bold text-slate-800 dark:text-zinc-200 block mb-1">🧼 Shampoos</span>
            <p class="text-sm text-slate-600 dark:text-slate-350 leading-relaxed">
              A shampoo's primary job is to clean the scalp by removing dirt, excess sebum, and product buildup. Because it is rinsed off quickly, it cannot dramatically alter deep follicle biology or stop internal hair fall.
            </p>
          </div>
          <div class="p-4 bg-amber-50/50 dark:bg-amber-900/10 rounded-xl border border-amber-200">
            <span class="font-bold text-amber-800 dark:text-amber-400 block mb-1">💊 Supplements</span>
            <p class="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              Highly beneficial if you have a diagnosed deficiency (like iron or Vitamin D). However, taking random "hair vitamins" without knowing your levels is often just expensive guesswork.
            </p>
          </div>
        </div>
      `
    },
    {
      id: "ch19",
      title: "Chapter 19",
      subtitle: "The Hair Washing Debate",
      content: `
        <h2 class="text-3xl md:text-4xl font-serif font-black text-slate-900 dark:text-white mb-6">The Hair Washing Debate: How Often is Right?</h2>
        <p class="mb-4">"Wash daily" vs. "Never wash daily." The truth is simple: there is no one-size-fits-all schedule. The ideal frequency depends on your unique scalp environment.</p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          <div class="p-5 bg-slate-100 dark:bg-zinc-800 rounded-xl border border-slate-200">
            <span class="font-bold text-slate-900 dark:text-zinc-100 block mb-2 text-xs uppercase tracking-wide">Oily Scalps</span>
            <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              May need more frequent washing (e.g., every alternate day) to clear excess sebum and keep the scalp clean and comfortable, reducing the risk of fungal buildup.
            </p>
          </div>
          <div class="p-5 bg-emerald-50 dark:bg-zinc-800 rounded-xl border border-emerald-100">
            <span class="font-bold text-emerald-800 dark:text-emerald-400 block mb-2 text-xs uppercase tracking-wide">Dry Scalps</span>
            <p class="text-sm text-slate-700 dark:text-slate-350 leading-relaxed">
              Benefit from less frequent washing (e.g., 2 times a week) to preserve natural protective lipids and prevent dryness and irritation.
            </p>
          </div>
        </div>

        <p class="mb-4">Remember, washing hair does not cause follicles to shed. The hairs you see in the drain were already in the telogen phase, and the washing process simply removed them. Avoid scalding hot water, and pat your hair gently with a towel rather than rubbing aggressively.</p>
      `
    },
    {
      id: "ch20",
      title: "Chapter 20",
      subtitle: "The 90-Day Action Plan",
      content: `
        <h2 class="text-3xl md:text-4xl font-serif font-black text-slate-900 dark:text-white mb-6">The Ultimate Hair Recovery Blueprint: Your 90-Day Action Plan</h2>
        <p class="mb-4">Lasting hair health is built from the bottom up, not the top down. This interactive planner is designed to help you organize and track your recovery habits over the next 90 days.</p>

        <h3 class="text-xl font-serif font-bold text-slate-800 dark:text-zinc-200 mt-8 mb-4">The Hair Recovery Pyramid</h3>
        <div class="bg-emerald-50 dark:bg-zinc-800 p-6 rounded-2xl text-center border border-emerald-100/60 my-6">
          <div class="space-y-2.5 max-w-xs mx-auto text-xs font-semibold">
            <div class="bg-emerald-800 text-white py-1.5 px-3 rounded shadow-sm">Level 6: Gentle Scalp Care & Products</div>
            <div class="bg-emerald-700 text-white py-1.5 px-3 rounded shadow-sm">Level 5: Managing External Triggers</div>
            <div class="bg-emerald-600 text-white py-1.5 px-3 rounded shadow-sm">Level 4: Regular Exercise & Circulation</div>
            <div class="bg-emerald-500 text-white py-1.5 px-3 rounded shadow-sm text-slate-900">Level 3: Intentional Stress Management</div>
            <div class="bg-emerald-200 text-slate-900 py-1.5 px-3 rounded border border-emerald-300">Level 2: Balanced Nutrition & Protein</div>
            <div class="bg-white text-slate-950 py-2 px-3 rounded border-2 border-emerald-400">Level 1: Consistent Sleep (Foundation)</div>
          </div>
        </div>

        <p class="mb-4">Use the active scorecard below to grade your habits daily. Real progress is built on slow, compounding changes, not overnight miracles.</p>
      `
    },
    {
      id: "ch21",
      title: "Chapter 21",
      subtitle: "Homoeopathy & Hair Fall",
      content: `
        <h2 class="text-3xl md:text-4xl font-serif font-black text-slate-900 dark:text-white mb-6">Homoeopathy & Hair Fall: A Realistic Perspective</h2>
        <p class="mb-4">Can Homoeopathy help hair fall? The honest answer is: <strong>it depends entirely on the cause</strong>. Hair fall is not a disease; it is a symptom of an underlying issue.</p>
        <p class="mb-4">Whether triggered by chronic stress, nutritional deficiencies, or hormonal disorders, different causes require personalized approaches. Homoeopathy is traditionally based on understanding the individual holistically, rather than offering a one-size-fits-all solution.</p>

        <div class="my-6 p-5 bg-emerald-50 dark:bg-zinc-800 rounded-2xl border border-emerald-100 dark:border-zinc-700 text-sm">
          <span class="uppercase tracking-wider font-semibold text-emerald-800 dark:text-emerald-400 text-xs block mb-2">🌿 What Homoeopathy Cannot Do</span>
          <p class="text-slate-600 dark:text-slate-350 leading-relaxed">
            Homoeopathy cannot instantly regrow hair overnight, reverse years of neglect within days, or correct severe nutritional deficiencies without dietary changes. Be cautious of any claims of guaranteed overnight transformations.
          </p>
        </div>

        <h3 class="text-xl font-serif font-bold text-slate-800 dark:text-zinc-200 mt-8 mb-4">Constitutional Perspectives</h3>
        <p class="mb-4">In traditional Homoeopathic literature, selection is based on the individual's unique physical, mental, and constitutional makeup. Some commonly discussed constitutional profiles include:</p>
        
        <ul class="space-y-4 list-none mb-6 text-sm">
          <li class="flex items-start gap-2.5 p-4 bg-slate-100 dark:bg-zinc-800 rounded-xl">
            <span class="text-emerald-600 font-bold shrink-0 mt-0.5">🌿</span>
            <div><strong>Natrum Muriaticum:</strong> Historically associated in classical literature with cases involving prolonged emotional stress, unexpressed grief, or postpartum hair shedding accompanied by a greasy scalp.</div>
          </li>
          <li class="flex items-start gap-2.5 p-4 bg-slate-100 dark:bg-zinc-800 rounded-xl">
            <span class="text-emerald-600 font-bold shrink-0 mt-0.5">🌿</span>
            <div><strong>Lycopodium Clavatum:</strong> Often considered in constitutional prescribing where hair thinning is accompanied by digestive bloat, gas, and early graying.</div>
          </li>
          <li class="flex items-start gap-2.5 p-4 bg-slate-100 dark:bg-zinc-800 rounded-xl">
            <span class="text-emerald-600 font-bold shrink-0 mt-0.5">🌿</span>
            <div><strong>Phosphorus:</strong> Discussed in cases where hair falls out in large clumps or defined bundles, particularly in sensitive, highly reactive individuals with dry, itchy scalps.</div>
          </li>
          <li class="flex items-start gap-2.5 p-4 bg-slate-100 dark:bg-zinc-800 rounded-xl">
            <span class="text-emerald-600 font-bold shrink-0 mt-0.5">🌿</span>
            <div><strong>Silicea / Fluoric Acid:</strong> Mentioned in classical texts in relation to fragile, easily broken hair shafts and the overall structural integrity of nails and skin.</div>
          </li>
        </ul>
      `
    },
    {
      id: "ch22",
      title: "Chapter 22",
      subtitle: "The Hair Recovery Mindset",
      content: `
        <h2 class="text-3xl md:text-4xl font-serif font-black text-slate-900 dark:text-white mb-6">The Hair Recovery Mindset: Why Mental Health Matters</h2>
        <p class="mb-4">Let's talk about something most hair fall guides completely ignore&mdash;not shampoos, not supplements, but <strong>your mind</strong>.</p>
        <p class="mb-4">For many people, the greatest challenge of hair loss is the emotional impact. Constant mirror checking, examining the hairline, comparing yourself to old photos, and scrolling through social media can lead to high anxiety.</p>

        <div class="bg-amber-50/60 dark:bg-amber-900/20 border-l-4 border-amber-500 p-5 rounded-r-xl my-6">
          <span class="font-semibold text-amber-900 dark:text-amber-400 block mb-1 text-sm uppercase tracking-wider">🧠 The Stress Loop</span>
          <p class="text-sm text-slate-700 dark:text-slate-350 leading-relaxed">
            Anxiety doesn't grow hair&mdash;it increases cortisol, which can prolong the shedding phase. Breaking this cycle by focusing on what you can control is key to supporting your overall well-being.
          </p>
        </div>

        <p class="mb-4"><strong>Remember:</strong> You are not your hair, your hairline, or your scalp density. You are a complete human being. True confidence is built on character, skills, and relationships, not just appearance.</p>
      `
    },
    {
      id: "ch23",
      title: "Chapter 23",
      subtitle: "Ultimate Myths Debunked",
      content: `
        <h2 class="text-3xl md:text-4xl font-serif font-black text-slate-900 dark:text-white mb-6">The Ultimate Hair Fall Myths Debunked</h2>
        <p class="mb-4">Ask ten people why hair falls, and you'll likely get fifteen different answers. Let's clear up some common misconceptions with a quick reality check.</p>

        <div class="space-y-6 my-6 text-sm">
          <div class="p-5 bg-slate-100 dark:bg-zinc-800 rounded-xl border border-slate-200/50">
            <span class="font-bold text-slate-900 dark:text-zinc-100 block mb-2 text-base">Myth #1: Oiling regrows lost hair</span>
            <p class="text-slate-600 dark:text-slate-400 leading-relaxed">
              <strong>Reality:</strong> Oil is great for conditioning the hair shaft and supporting scalp massage, but it cannot reverse genetic pattern baldness or replace systemic nutrients.
            </p>
          </div>
          <div class="p-5 bg-slate-100 dark:bg-zinc-800 rounded-xl border border-slate-200/50">
            <span class="font-bold text-slate-900 dark:text-zinc-100 block mb-2 text-base">Myth #2: Shaving your head makes hair grow back thicker</span>
            <p class="text-slate-600 dark:text-slate-400 leading-relaxed">
              <strong>Reality:</strong> Shaving cuts hair at the surface, giving the blunt ends a temporarily coarser feel as they grow out. It does not change the follicle's biological width or density.
            </p>
          </div>
          <div class="p-5 bg-slate-100 dark:bg-zinc-800 rounded-xl border border-slate-200/50">
            <span class="font-bold text-slate-900 dark:text-zinc-100 block mb-2 text-base">Myth #3: Changing shampoo stops hair fall</span>
            <p class="text-slate-600 dark:text-slate-400 leading-relaxed">
              <strong>Reality:</strong> Shampoos clean the scalp surface. Since they are quickly washed off, they cannot address internal triggers like stress, iron, or thyroid changes.
            </p>
          </div>
        </div>
      `
    },
    {
      id: "ch24",
      title: "Chapter 24",
      subtitle: "Your Personal Recovery Plan",
      content: `
        <h2 class="text-3xl md:text-4xl font-serif font-black text-slate-900 dark:text-white mb-6">Build Your Personal Hair Recovery Plan</h2>
        <p class="mb-4">Because hair fall is highly individual, what works for someone else may not be what your body needs. Use this interactive planner below to identify your triggers and select your recovery goals.</p>

        <p class="mb-4">Select your custom focus group below to read your actionable guide, then write in your lifestyle details to get a personalized 7-day hair wellness regimen crafted by our built-in Curiva AI assistant.</p>
      `
    },
    {
      id: "ch25",
      title: "Chapter 25",
      subtitle: "Practical Actionable Steps",
      content: `
        <h2 class="text-3xl md:text-4xl font-serif font-black text-slate-900 dark:text-white mb-6">Practical Steps for Healthier Hair: What to Do From Today</h2>
        <p class="mb-4">Hair health is built on daily habits, not one-time decisions. Here is a summary of the key practices to help you create a supportive environment for healthy growth starting today.</p>

        <div class="space-y-4 my-6 text-sm">
          <div class="flex gap-4 p-4 bg-slate-50 dark:bg-zinc-800 rounded-xl border border-slate-200">
            <div class="bg-emerald-100 dark:bg-emerald-900/50 p-2.5 rounded-lg h-10 w-10 flex items-center justify-center font-bold text-emerald-800 dark:text-emerald-400 shrink-0">1</div>
            <div>
              <h4 class="font-bold text-slate-900 dark:text-white text-base">Prioritize Sleep Consistency</h4>
              <p class="text-slate-600 dark:text-slate-400 leading-relaxed">
                Aim for 7 to 9 hours of quality sleep. Your body performs essential repair and growth hormone release during deep, quiet sleep stages.
              </p>
            </div>
          </div>
          <div class="flex gap-4 p-4 bg-slate-50 dark:bg-zinc-800 rounded-xl border border-slate-200">
            <div class="bg-emerald-100 dark:bg-emerald-900/50 p-2.5 rounded-lg h-10 w-10 flex items-center justify-center font-bold text-emerald-800 dark:text-emerald-400 shrink-0">2</div>
            <div>
              <h4 class="font-bold text-slate-900 dark:text-white text-base">Eat Sufficient Quality Protein</h4>
              <p class="text-slate-600 dark:text-slate-400 leading-relaxed">
                Include clean protein sources (eggs, panel, moong sprouts, dal, clean lean meats) at breakfast to give your follicles living keratin bricks.
              </p>
            </div>
          </div>
          <div class="flex gap-4 p-4 bg-slate-50 dark:bg-zinc-800 rounded-xl border border-slate-200">
            <div class="bg-emerald-100 dark:bg-emerald-900/50 p-2.5 rounded-lg h-10 w-10 flex items-center justify-center font-bold text-emerald-800 dark:text-emerald-400 shrink-0">3</div>
            <div>
              <h4 class="font-bold text-slate-900 dark:text-white text-base">Manage Stress Intentionally</h4>
              <p class="text-slate-600 dark:text-slate-400 leading-relaxed">
                Incorporate simple cortisol-lowering habits (walking in nature, simple breathing checks, meditation) into your daily college or office schedule.
              </p>
            </div>
          </div>
        </div>

        <div class="bg-emerald-800 text-white p-6 rounded-2xl my-6 shadow-sm">
          <span class="text-xs uppercase tracking-widest font-bold block mb-1 text-emerald-300">Final Word</span>
          <p class="text-sm font-serif italic leading-relaxed">
            &ldquo;Hair fall is almost always a signal, not the ultimate disease. It is your body's sensitive way of asking for better sleep, better nutrition, stress reduction, and deep, consistent care.&rdquo;
          </p>
        </div>
      `
    },
    {
      id: "backcover",
      title: "Back Cover",
      subtitle: "Summary & Back Matter",
      content: `
        <div class="text-center py-12 max-w-xl mx-auto">
          <div class="h-1 w-12 bg-emerald-500 dark:bg-emerald-600 mx-auto mb-6"></div>
          
          <p class="text-base text-slate-600 dark:text-slate-350 mb-8 leading-relaxed font-serif">
            Most people focus exclusively on topical shampoos, oils, and chemical serums. Few step back to understand the true biological triggers of hair thinning. Written in a simple, practical, empathetic tone, this guide helps you look past commercial myths and focus on sustainable, evidence-based habit changes that support healthier hair and systemic wellness from within.
          </p>

          <p class="text-sm text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
            Whether you are a student, working corporate professional, a woman post-childbirth, or exploring male genetic patterns, this handbook provides clear, realistic insights without hyped marketing claims or miracle product sales pitches.
          </p>

          <div class="bg-emerald-50 dark:bg-zinc-800 p-6 rounded-2xl mb-8 border border-emerald-100/60 inline-block">
            <span class="text-sm font-serif font-bold text-slate-800 dark:text-zinc-200 block">Curiva Homoeopathy</span>
            <span class="text-xs text-emerald-700 dark:text-emerald-400 block mt-1 uppercase tracking-wider font-semibold">Tiny Doses. True Shifts.</span>
          </div>
        </div>
      `
    }
  ];

  // Component State
  const [currentChapterIndex, setCurrentChapterIndex] = useState<number>(() => {
    const saved = localStorage.getItem("curiva_last_chapter");
    if (saved !== null) {
      const idx = parseInt(saved);
      if (idx >= 0 && idx < BOOK_DATA.length) return idx;
    }
    return 0;
  });

  const [readingTheme, setReadingTheme] = useState<"cream" | "light" | "dark" | "default">(() => {
    return (localStorage.getItem("curiva_reading_theme") as any) || "cream";
  });

  const [fontStyle, setFontStyle] = useState<"serif" | "sans">(() => {
    return (localStorage.getItem("curiva_font_style") as any) || "serif";
  });

  const [fontSizeMultiplier, setFontSizeMultiplier] = useState<number>(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isCoachOpen, setIsCoachOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const getThemeClasses = () => {
    switch (readingTheme) {
      case "cream":
        return "ebook-theme-cream bg-[#fbf9f4] text-[#2c2520] border-[#dfd5c2] shadow-soft font-serif-reader";
      case "dark":
        return "ebook-theme-dark bg-[#1e293b] text-[#f1f5f9] border-[#334155] shadow-soft";
      case "light":
        return "ebook-theme-light bg-white text-slate-800 border-slate-200/60 shadow-soft";
      default:
        return "bg-bg-primary text-text-primary border-border shadow-soft";
    }
  };

  const getProseThemeClasses = () => {
    switch (readingTheme) {
      case "cream":
        return "prose-stone prose-headings:text-[#2c2520] prose-p:text-[#433932] prose-strong:text-[#2c2520] prose-blockquote:border-primary prose-blockquote:text-[#433932] prose-blockquote:bg-[#f3ede2]/60";
      case "dark":
        return "prose-invert prose-headings:text-slate-100 prose-p:text-slate-300 prose-strong:text-white prose-blockquote:border-primary prose-blockquote:bg-slate-900/40";
      case "light":
        return "prose-slate prose-headings:text-slate-900 prose-p:text-slate-600 prose-strong:text-slate-900 prose-blockquote:border-primary prose-blockquote:bg-slate-50";
      default:
        return "prose-slate dark:prose-invert prose-blockquote:border-primary";
    }
  };

  const getPageBackgroundClass = () => {
    switch (readingTheme) {
      case "cream":
        return "bg-[#FAF6EE] text-[#2c2520]";
      case "dark":
        return "bg-[#0f172a] text-[#f1f5f9]";
      case "light":
        return "bg-[#f8fafc] text-slate-800";
      default:
        return "bg-bg-secondary text-text-primary";
    }
  };

  const getHeaderThemeClass = () => {
    switch (readingTheme) {
      case "cream":
        return "bg-[#FAF8F5]/95 border-[#dfd5c2] text-[#2c2520]";
      case "dark":
        return "bg-[#0f172a]/95 border-slate-800 text-slate-100";
      case "light":
        return "bg-white/95 border-slate-200 text-slate-800";
      default:
        return "bg-bg-primary/95 border-border text-text-primary";
    }
  };

  const getSanitizedContent = (htmlContent: string) => {
    if (readingTheme === "dark") {
      return htmlContent;
    }
    // Strip Tailwind dark classes when in Light or Cream reading theme
    return htmlContent
      .replace(/\bdark:text-[a-z0-9/-]+\b/g, '')
      .replace(/\bdark:bg-[a-z0-9/-]+\b/g, '')
      .replace(/\bdark:border-[a-z0-9/-]+\b/g, '')
      .replace(/\bdark:prose-invert\b/g, '');
  };

  // Habits Scorecard State (Chapter 20)
  const [checkedHabits, setCheckedHabits] = useState<boolean[]>([false, false, false, false, false]);
  
  // Mission Selector State (Chapter 24)
  const [selectedMission, setSelectedMission] = useState<string | null>(null);

  // Bookmarks State
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("curiva_bookmarks") || "[]");
    } catch {
      return [];
    }
  });

  // AI Personalized Plan State (Chapter 24)
  const [aiPlanInput, setAiPlanInput] = useState<string>("");
  const [aiPlanOutput, setAiPlanOutput] = useState<string>("");
  const [isGeneratingPlan, setIsGeneratingPlan] = useState<boolean>(false);
  const [planError, setPlanError] = useState<string>("");

  // AI Scalp Coach Chat state
  const [chatInput, setChatInput] = useState<string>("");
  const [isCoachTyping, setIsCoachTyping] = useState<boolean>(false);
  const [chatMessages, setChatMessages] = useState<Array<{ sender: "user" | "coach"; text: string; isError?: boolean }>>([
    {
      sender: "coach",
      text: "Hello! I am your ✨ **Curiva AI Scalp Coach**.\n\nI have read the complete *Hair Fall Recovery Guide* and can help customize your health journey. Feel free to ask me anything about stress, protein, sleep, or Homoeopathic constitutional perspectives."
    }
  ]);

  // Notification Toast State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Theme support (synced with app context)
  const [isDark, setIsDark] = useState<boolean>(() => {
    return document.documentElement.classList.contains("dark");
  });

  const chatMessagesEndRef = useRef<HTMLDivElement>(null);

  // Parse direct chapter query link on mount
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const chParam = params.get("chapter");
      if (chParam !== null) {
        const idx = parseInt(chParam, 10);
        if (idx >= 0 && idx < BOOK_DATA.length) {
          setCurrentChapterIndex(idx);
          // Clean the query parameters from URL so refreshes don't lock the chapter
          window.history.replaceState({}, document.title, window.location.pathname);
        }
      }
    } catch (e) {
      console.error("Error reading chapter query param:", e);
    }
  }, [BOOK_DATA.length]);

  // Sync scroll on chat messages
  useEffect(() => {
    if (chatMessagesEndRef.current) {
      chatMessagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages, isCoachTyping]);

  // Save last visited chapter
  useEffect(() => {
    localStorage.setItem("curiva_last_chapter", currentChapterIndex.toString());
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentChapterIndex]);

  // Apply Toast dismissal
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  // Bookmark operational logic
  const toggleBookmark = () => {
    const chapterId = BOOK_DATA[currentChapterIndex].id;
    let nextBookmarks = [...bookmarks];
    if (bookmarks.includes(chapterId)) {
      nextBookmarks = nextBookmarks.filter(id => id !== chapterId);
      triggerToast("Bookmark removed");
    } else {
      nextBookmarks.push(chapterId);
      triggerToast("Chapter bookmarked");
    }
    setBookmarks(nextBookmarks);
    localStorage.setItem("curiva_bookmarks", JSON.stringify(nextBookmarks));
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return; // Don't trigger book controls when user is typing
      }
      if (e.key === "ArrowLeft" && currentChapterIndex > 0) {
        setCurrentChapterIndex(prev => prev - 1);
      } else if (e.key === "ArrowRight" && currentChapterIndex < BOOK_DATA.length - 1) {
        setCurrentChapterIndex(prev => prev + 1);
      } else if (e.key === "Escape") {
        setIsSearchOpen(false);
        setIsSidebarOpen(false);
        setIsCoachOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentChapterIndex, BOOK_DATA.length]);

  // eBook Copy and Security Protection Interceptions (from PDF rules)
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      triggerToast("🔒 eBook Copy Protection: Right-click is disabled to protect materials.");
    };

    const handleCopy = (e: ClipboardEvent) => {
      e.preventDefault();
      triggerToast("🔒 eBook Copy Protection: Copying content is disabled.");
    };

    const handleKeyDownSecurity = (e: KeyboardEvent) => {
      const forbiddenKeys = ["c", "x", "s", "u", "p", "a"];
      if ((e.ctrlKey || e.metaKey) && forbiddenKeys.includes(e.key.toLowerCase())) {
        e.preventDefault();
        triggerToast("🔒 Reader Security: Copying or printing this work is protected.");
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("copy", handleCopy);
    document.addEventListener("keydown", handleKeyDownSecurity);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("copy", handleCopy);
      document.removeEventListener("keydown", handleKeyDownSecurity);
    };
  }, []);

  // Search filter
  const handleSearchInput = (val: string) => {
    setSearchQuery(val);
    const query = val.toLowerCase().trim();
    if (!query) {
      setSearchResults([]);
      return;
    }

    const matches: any[] = [];
    BOOK_DATA.forEach((chapter, index) => {
      const plainText = chapter.content.replace(/<[^>]*>/g, "").toLowerCase();
      if (plainText.includes(query)) {
        const matchIdx = plainText.indexOf(query);
        const start = Math.max(0, matchIdx - 40);
        const end = Math.min(plainText.length, matchIdx + query.length + 50);
        let snippet = plainText.substring(start, end);
        if (start > 0) snippet = "..." + snippet;
        if (end < plainText.length) snippet = snippet + "...";

        matches.push({
          chapterIndex: index,
          chapterTitle: `${chapter.title}: ${chapter.subtitle}`,
          snippet: snippet,
          query: query
        });
      }
    });

    setSearchResults(matches);
  };

  // Scorecard metrics
  const toggleHabit = (idx: number) => {
    const nextChecked = [...checkedHabits];
    nextChecked[idx] = !nextChecked[idx];
    setCheckedHabits(nextChecked);
  };

  const completedScore = checkedHabits.filter(Boolean).length;
  const getScorecardFeedback = () => {
    if (completedScore <= 1) return { text: "Time for a basic routine reset 🛑", color: "text-red-500" };
    if (completedScore <= 3) return { text: "Good start, keep building consistency ⚡", color: "text-amber-500" };
    return { text: "Excellent foundation! Keep shining! 🌱", color: "text-emerald-500 font-bold" };
  };

  // AI Personalized Custom Blueprint Generator
  const generateCustomAIPlan = async () => {
    const query = aiPlanInput.trim();
    if (!query) {
      triggerToast("Please provide details about your routine first.");
      return;
    }

    setIsGeneratingPlan(true);
    setPlanError("");
    setAiPlanOutput("");

    try {
      const response = await fetch("/api/gemini/hair-loss-coach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: query,
          type: "blueprint"
        })
      });

      if (!response.ok) {
        throw new Error("Service returned error " + response.status);
      }

      const resData = await response.json();
      setAiPlanOutput(resData.text || "No plan was compiled.");
    } catch (err: any) {
      console.error(err);
      setPlanError(err.message || "Failed to customize plan. Please try again.");
    } finally {
      setIsGeneratingPlan(false);
    }
  };

  // Send message to Gemini coach
  const handleSendChatMessage = async (presetText?: string) => {
    const textToSend = presetText || chatInput.trim();
    if (!textToSend) return;

    if (!presetText) setChatInput("");

    // Append user message
    const nextMessages = [...chatMessages, { sender: "user" as const, text: textToSend }];
    setChatMessages(nextMessages);
    setIsCoachTyping(true);

    try {
      const response = await fetch("/api/gemini/hair-loss-coach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: textToSend,
          type: "coach",
          conversationHistory: nextMessages.slice(-5) // Send short context
        })
      });

      if (!response.ok) {
        throw new Error("Coach failed to fetch response: status " + response.status);
      }

      const resData = await response.json();
      setChatMessages(prev => [...prev, { sender: "coach", text: resData.text || "No advice received." }]);
    } catch (err: any) {
      console.error(err);
      setChatMessages(prev => [...prev, { sender: "coach", text: `I am experiencing a slight connectivity glitch. Please try again! (${err.message})`, isError: true }]);
    } finally {
      setIsCoachTyping(false);
    }
  };

  // Parse custom markdown tags
  const renderFormattedMarkdown = (text: string) => {
    // Simple fast safe transformer
    return text
      .split("\n\n")
      .map((para, i) => {
        let content = para;
        // Headings
        if (content.startsWith("### ")) {
          return <h4 key={i} className="font-bold text-slate-900 dark:text-white mt-4 mb-2 text-base">{content.replace("### ", "")}</h4>;
        }
        if (content.startsWith("## ")) {
          return <h3 key={i} className="font-serif font-bold text-slate-900 dark:text-white mt-6 mb-3 text-lg">{content.replace("## ", "")}</h3>;
        }
        if (content.startsWith("- ")) {
          const listItems = para.split("\n").map((li, j) => {
            const cleanLi = li.replace("- ", "").trim();
            return (
              <li key={j} className="flex items-start gap-2.5 my-1.5 text-sm text-slate-700 dark:text-slate-300">
                <CheckCircle className="w-4 h-4 text-emerald-600 mt-1 shrink-0" />
                <span>{cleanLi}</span>
              </li>
            );
          });
          return <ul key={i} className="my-3 space-y-1">{listItems}</ul>;
        }

        // Bold and italics
        content = content.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
        content = content.replace(/\*(.*?)\*/g, "<em>$1</em>");

        return (
          <p 
            key={i} 
            className="mb-4 leading-relaxed text-sm text-slate-700 dark:text-slate-350"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        );
      });
  };

  // Define focus goals array for Chapter 24
  const focusPlans: Record<string, { title: string; desc: string; items: string[] }> = {
    student: {
      title: "Mission A: Student Recovery Program",
      desc: "Optimized specifically for academic pressure, hostel mess limits, and irregular study hours.",
      items: [
        "Consistent Sleep: Set alarms to wind down before midnight to protect morning melatonin repair.",
        "Nourishing Breakfast: Prioritize simple proteins (boiled eggs, soaked paneer, sprouts) within 60 mins of waking.",
        "Conscious Hydration: Carry a dedicated copper or steel bottle; consume at least 2.5L of pure water daily.",
        "Daily Sun Catch: Walk outdoors for 15-20 minutes in the morning light to maintain Vitamin D."
      ]
    },
    professional: {
      title: "Mission B: Professional Balance Protocol",
      desc: "Tailored to offset sedentary desk cycles, toxic screen times, and continuous high cortisol burnout.",
      items: [
        "Bedtime Boundaries: Configure a strict 1-hour screen-free digital detox before sleeping.",
        "Eat Off-Keyboard: Treat lunch as a focus session; step away from devices to allow proper digestion.",
        "Desk Circulation Breaks: Stand up every 60 minutes; take a brisk 10-minute walk at lunch.",
        "Caffeine Curfew: Avoid caffeine spikes after 2:00 PM to protect deep REM sleep."
      ]
    },
    women: {
      title: "Mission C: Female Endocrine & Follicular Care",
      desc: "Designed to normalize iron stores, support thyroid pathways, and reduce insulin resistance in PCOS.",
      items: [
        "Iron Enrichment: Pair iron-rich meals (spinach, seeds, pomegranates) with Vitamin C for absorption.",
        "Zero Crash Diets: Ditch sudden extreme caloric deficits that throw follicles into hibernation.",
        "Clinical Tracking: Monitor D3, Ferritin, and Thyroid profiles under medical supervision.",
        "Active Stress Outlets: Commit to daily somatic journaling or restorative breathing cycles."
      ]
    },
    men: {
      title: "Mission D: Male Follicular Density Strategy",
      desc: "Developed to delay DHT sensitivity patterns, preserve existing hair roots, and protect scalp circulation.",
      items: [
        "High-Intensity Movement: Combine moderate resistance weight training with regular cardio.",
        "Follicle Circulation: Stimulate follicle roots with a weekly 5-minute scalp massage.",
        "DHT Awareness: Understand the role of genetics to build realistic wellness goals.",
        "Circulatory Protection: Eliminate smoking entirely to prevent scalp capillary constriction."
      ]
    }
  };

  const readingProgressPercent = ((currentChapterIndex + 1) / BOOK_DATA.length) * 100;
  const currentChapter = BOOK_DATA[currentChapterIndex];

  return (
    <>
      <SEO 
        title="Interactive Hair Fall Recovery Guide | Curiva" 
        description="Explore the complete comprehensive eBook Guide with practical advice, scorecards, custom planners and real-time AI Scalp Coaching."
      />

      <div className={`min-h-screen font-sans flex flex-col relative overflow-hidden transition-colors duration-300 ${getPageBackgroundClass()}`}>
        
        {/* Top Progress bar tracker */}
        <div className="fixed top-0 left-0 w-full h-1.5 bg-border/40 z-50">
          <motion.div 
            className="h-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${readingProgressPercent}%` }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          />
        </div>

        {/* Ebook Navigation Header */}
        <div className={`sticky top-0 backdrop-blur-md border-b z-40 px-4 py-3 flex items-center justify-between shadow-sm transition-colors duration-300 ${getHeaderThemeClass()}`}>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-2.5 hover:bg-bg-secondary rounded-xl transition text-primary hover:text-primary-dark"
              title="Table of Contents"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-widest font-black text-primary">CURIVA HOMOEOPATHY</span>
              <span className="text-sm font-display font-black hidden md:inline text-current opacity-90">
                Hair Fall Recovery Guide
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Theme Selectors */}
            <div className="flex items-center space-x-1.5 border-r border-border pr-2.5 mr-1 hidden lg:flex">
              <button 
                onClick={() => {
                  setReadingTheme("cream");
                  localStorage.setItem("curiva_reading_theme", "cream");
                }} 
                className={`w-6 h-6 rounded-full bg-[#fbf9f4] border transition ${readingTheme === "cream" ? "border-primary ring-2 ring-primary/20 scale-110 shadow-sm" : "border-stone-300 hover:scale-105"}`}
                title="Cream Theme"
              />
              <button 
                onClick={() => {
                  setReadingTheme("light");
                  localStorage.setItem("curiva_reading_theme", "light");
                }} 
                className={`w-6 h-6 rounded-full bg-white border transition ${readingTheme === "light" ? "border-primary ring-2 ring-primary/20 scale-110 shadow-sm" : "border-slate-300 hover:scale-105"}`}
                title="Light Theme"
              />
              <button 
                onClick={() => {
                  setReadingTheme("dark");
                  localStorage.setItem("curiva_reading_theme", "dark");
                }} 
                className={`w-6 h-6 rounded-full bg-slate-900 border transition ${readingTheme === "dark" ? "border-primary ring-2 ring-primary/20 scale-110 shadow-sm" : "border-slate-700 hover:scale-105"}`}
                title="Dark Theme"
              />
            </div>

            {/* Font Style Selectors */}
            <div className="flex items-center border border-border rounded-lg overflow-hidden bg-bg-secondary mr-1 hidden md:flex">
              <button 
                onClick={() => {
                  setFontStyle("serif");
                  localStorage.setItem("curiva_font_style", "serif");
                }}
                className={`px-2.5 py-1 text-xs transition border-r border-border font-serif-reader ${fontStyle === "serif" ? "bg-primary-light text-primary font-bold" : "hover:bg-border/60 text-text-secondary"}`}
                title="Serif Font"
              >
                Serif
              </button>
              <button 
                onClick={() => {
                  setFontStyle("sans");
                  localStorage.setItem("curiva_font_style", "sans");
                }}
                className={`px-2.5 py-1 text-xs transition font-sans-book ${fontStyle === "sans" ? "bg-primary-light text-primary font-bold" : "hover:bg-border/60 text-text-secondary"}`}
                title="Sans Font"
              >
                Sans
              </button>
            </div>

            {/* Search index button */}
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="p-2 hover:bg-bg-secondary rounded-xl transition text-text-secondary"
              title="Search Book Index"
            >
              <Search className="w-4.5 h-4.5" />
            </button>

            {/* Bookmark current chapter */}
            <button 
              onClick={toggleBookmark}
              className="p-2 hover:bg-bg-secondary rounded-xl transition text-text-secondary"
              title="Bookmark Chapter"
            >
              <Bookmark className={`w-4.5 h-4.5 ${bookmarks.includes(currentChapter.id) ? "fill-primary text-primary" : ""}`} />
            </button>

            {/* Adjust font size */}
            <div className="flex items-center border border-border rounded-lg overflow-hidden bg-bg-secondary">
              <button 
                onClick={() => setFontSizeMultiplier(prev => Math.max(-2, prev - 1))}
                className="px-2.5 py-1 text-xs hover:bg-border/60 transition border-r border-border font-bold text-text-secondary"
                title="Decrease Font Size"
              >
                A-
              </button>
              <button 
                onClick={() => setFontSizeMultiplier(prev => Math.min(4, prev + 1))}
                className="px-2.5 py-1 text-xs hover:bg-border/60 transition font-bold text-text-secondary"
                title="Increase Font Size"
              >
                A+
              </button>
            </div>

            {/* AI Coach Trigger button */}
            <button 
              onClick={() => setIsCoachOpen(true)}
              className="p-2 bg-primary-light hover:bg-primary/20 text-primary rounded-xl transition flex items-center gap-1.5 font-bold text-xs shadow-sm"
              title="Consult AI Scalp Coach"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-dark"></span>
              </span>
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">AI Coach</span>
            </button>

            {/* Close Ebook to articles */}
            <button 
              onClick={() => navigate("/articles")}
              className="p-2 hover:bg-bg-secondary rounded-xl transition text-text-secondary text-xs uppercase font-extrabold tracking-widest pl-3 ml-2 border-l border-border"
            >
              Exit
            </button>
          </div>
        </div>

        {/* Main Book Frame */}
        <div className="flex-grow flex max-w-7xl mx-auto w-full relative z-10 px-12 md:px-16 py-8 items-stretch justify-center">
          
          {/* LEFT HOVER TRIGGER ZONE FOR PREVIOUS PAGE */}
          {currentChapterIndex > 0 && (
            <div className="absolute left-0 top-0 bottom-0 w-12 md:w-16 flex items-center justify-center z-30 group">
              <button
                onClick={() => setCurrentChapterIndex(prev => Math.max(0, prev - 1))}
                className="flex flex-col items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-white/90 dark:bg-zinc-900/90 hover:bg-primary hover:text-white border border-border/80 hover:border-primary rounded-full shadow-lg transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 scale-90 group-hover:scale-110 cursor-pointer"
                title="Go to Previous Chapter"
              >
                <ArrowLeft className="w-5 h-5 text-text-primary group-hover:text-white transition-colors" />
                <span className="absolute left-14 scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-200 bg-slate-900 text-white text-[10px] py-1 px-3 rounded-xl font-bold font-sans whitespace-nowrap shadow-md pointer-events-none">
                  Previous Page
                </span>
              </button>
            </div>
          )}

          {/* RIGHT HOVER TRIGGER ZONE FOR NEXT PAGE */}
          {currentChapterIndex < BOOK_DATA.length - 1 && (
            <div className="absolute right-0 top-0 bottom-0 w-12 md:w-16 flex items-center justify-center z-30 group">
              <button
                onClick={() => setCurrentChapterIndex(prev => Math.min(BOOK_DATA.length - 1, prev + 1))}
                className="flex flex-col items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-white/90 dark:bg-zinc-900/90 hover:bg-primary hover:text-white border border-border/80 hover:border-primary rounded-full shadow-lg transition-all duration-300 transform -translate-x-2 group-hover:translate-x-0 scale-90 group-hover:scale-110 cursor-pointer"
                title="Go to Next Chapter"
              >
                <ArrowRight className="w-5 h-5 text-text-primary group-hover:text-white transition-colors" />
                <span className="absolute right-14 scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-200 bg-slate-900 text-white text-[10px] py-1 px-3 rounded-xl font-bold font-sans whitespace-nowrap shadow-md pointer-events-none">
                  Next Page
                </span>
              </button>
            </div>
          )}
          
          {/* Elegant Book Canvas mimicking a real printed hardcover page */}
          <div className={`flex-grow max-w-3xl w-full flex flex-col justify-between min-h-[80vh] p-6 md:p-12 rounded-2xl border transition-all duration-300 ${getThemeClasses()} ${fontStyle === "serif" ? "font-serif-reader" : "font-sans-book"}`}>
            <article className="py-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentChapterIndex}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className={`max-w-none transition-all duration-200 prose ${getProseThemeClasses()}`}
                  style={{ fontSize: `${18 + fontSizeMultiplier * 2}px`, lineHeight: "1.85" }}
                >
                  <div dangerouslySetInnerHTML={{ __html: getSanitizedContent(currentChapter.content) }} />
                </motion.div>
              </AnimatePresence>

              {/* Dynamic Scorecard for Chapter 20 */}
              {currentChapter.id === "ch20" && (
                <div className="bg-bg-secondary/40 dark:bg-zinc-900/40 p-6 rounded-2xl border border-border my-8 shadow-sm animate-fade-in-up">
                  <span className="text-[10px] uppercase font-black tracking-wider text-primary dark:text-primary block mb-2">
                    📋 INTERACTIVE DAILY HABITS SCORECARD
                  </span>
                  <p className="text-xs text-text-secondary mb-4">
                    Check the wellness behaviors you fully met today to calculate your baseline grade:
                  </p>

                  <div className="space-y-2">
                    {[
                      { title: "Consistent Sleep", text: "Got 7 to 9 hours of restorative sleep, screen off before bed." },
                      { title: "Living Protein", text: "Included organic amino acid matrix builders at morning breakfast." },
                      { title: "Cortisol Balance", text: "Engaged in at least 15 minutes of quiet mental de-stressing or breathing." },
                      { title: "Hydration Target", text: "Sipped 2.5L+ of pure water to support cellular metabolic transfer." },
                      { title: "Circulatory Movement", text: "Completed 20-30 mins of walk, sun, or resistance exercises." }
                    ].map((habit, idx) => (
                      <label 
                        key={idx}
                        className={`flex items-start gap-3 p-3 rounded-xl cursor-pointer transition border border-transparent ${checkedHabits[idx] ? "bg-primary-light/50 dark:bg-primary/10 border-primary/20" : "hover:bg-border/30"}`}
                      >
                        <input
                          type="checkbox"
                          checked={checkedHabits[idx]}
                          onChange={() => toggleHabit(idx)}
                          className="mt-1 rounded text-primary focus:ring-primary border-border"
                        />
                        <span className="text-sm">
                          <strong>{habit.title}:</strong> <span className="text-text-secondary">{habit.text}</span>
                        </span>
                      </label>
                    ))}
                  </div>

                  <div className="mt-6 pt-4 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-2">
                    <span className="text-sm font-bold">
                      Your Score: <span className="text-lg text-primary">{completedScore}</span>/5
                    </span>
                    <span className={`text-xs font-semibold ${getScorecardFeedback().color}`}>
                      {getScorecardFeedback().text}
                    </span>
                  </div>
                </div>
              )}

              {/* Dynamic Module for Chapter 24 */}
              {currentChapter.id === "ch24" && (
                <div className="space-y-8 my-8 animate-fade-in-up">
                  
                  {/* Step 1: Mission selection layout */}
                  <div className="bg-bg-secondary/40 dark:bg-zinc-900/40 p-6 rounded-2xl border border-border">
                    <span className="text-[10px] uppercase font-black tracking-wider text-primary dark:text-primary block mb-3">
                      🎯 STEP 1: SELECT YOUR WELLNESS FOCUS
                    </span>
                    
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      {[
                        { key: "student", label: "Student Focus", desc: "For exam loads & mess food", icon: "🎓" },
                        { key: "professional", label: "Corporate Focus", desc: "For desk stress & screen fatigue", icon: "💼" },
                        { key: "women", label: "Women's Care", desc: "For iron, hormones & postpartum", icon: "🌸" },
                        { key: "men", label: "Men's Care", desc: "For DHT sensitivity & MPB", icon: "⚡" }
                      ].map(mission => (
                        <button
                          key={mission.key}
                          onClick={() => setSelectedMission(mission.key)}
                          className={`p-4 rounded-xl border text-left transition flex flex-col justify-between h-28 ${selectedMission === mission.key ? "ring-2 ring-primary bg-primary-light/50 dark:bg-primary/10 border-primary/40" : "bg-bg-primary border-border hover:bg-border/30"}`}
                        >
                          <span className="text-2xl">{mission.icon}</span>
                          <div>
                            <span className="font-bold text-xs block text-text-primary">{mission.label}</span>
                            <span className="text-[10px] text-text-secondary line-clamp-1">{mission.desc}</span>
                          </div>
                        </button>
                      ))}
                    </div>

                    <AnimatePresence mode="wait">
                      {selectedMission && (
                        <motion.div
                          key={selectedMission}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="bg-bg-primary p-4 rounded-xl border border-border"
                        >
                          <h4 className="font-serif font-black text-sm text-text-primary mb-1">
                            {focusPlans[selectedMission].title}
                          </h4>
                          <p className="text-[11px] text-text-secondary mb-3">
                            {focusPlans[selectedMission].desc}
                          </p>
                          <div className="h-px bg-border my-2" />
                          <span className="text-[10px] font-black uppercase text-primary dark:text-primary-light block mb-2">Focus Guidelines:</span>
                          <ul className="space-y-2">
                            {focusPlans[selectedMission].items.map((item, idx) => (
                              <li key={idx} className="text-xs text-text-secondary flex items-start gap-2">
                                <span className="text-primary font-bold mt-0.5">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Step 2: Personalized AI Plan customized using Gemini */}
                  <div className="bg-bg-secondary/40 dark:bg-zinc-900/40 p-6 rounded-2xl border-2 border-dashed border-border">
                    <span className="text-[10px] uppercase font-black tracking-wider text-primary dark:text-primary flex items-center gap-1.5 mb-2">
                      <Sparkles className="w-3.5 h-3.5 text-primary" />
                      <span>STEP 2: CUSTOMIZE PERSONAL BLUEPRINT</span>
                    </span>
                    <h3 className="font-serif font-black text-lg text-text-primary mb-1">
                      ✨ AI Scalp Blueprint Generator
                    </h3>
                    <p className="text-xs text-text-secondary mb-4">
                      Briefly enter your diet, sleep schedule, average coffee count, or stress level to write a custom 7-day hair recovery blueprint instantly.
                    </p>

                    <div className="space-y-3">
                      <textarea
                        value={aiPlanInput}
                        onChange={(e) => setAiPlanInput(e.target.value)}
                        rows={3}
                        maxLength={400}
                        placeholder="e.g. Vegetarian diet, sleep at 2 AM for 6 hours, drink 3 cups of coffee daily, high exam stress."
                        className="w-full p-3.5 bg-bg-primary rounded-xl border border-border text-xs md:text-sm outline-none focus:ring-1 focus:ring-primary transition resize-none"
                      />

                      <button
                        onClick={generateCustomAIPlan}
                        disabled={isGeneratingPlan}
                        className="w-full py-3 bg-primary hover:bg-primary-dark disabled:opacity-50 text-white font-bold rounded-xl text-xs md:text-sm transition flex items-center justify-center gap-2"
                      >
                        {isGeneratingPlan ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Crafting Ebook Blueprint...</span>
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-4 h-4" />
                            <span>Generate Custom AI Plan</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* AI plan results renderer */}
                    {isGeneratingPlan && (
                      <div className="mt-4 p-4 bg-bg-primary rounded-xl border border-border flex items-center gap-2.5 text-xs text-text-secondary animate-pulse">
                        <Loader2 className="w-4 h-4 animate-spin text-primary" />
                        <span>Analysing schedule vectors & compiling hair-wellness regimens...</span>
                      </div>
                    )}

                    {planError && (
                      <div className="mt-4 p-3.5 bg-red-50 dark:bg-red-950/20 text-red-800 dark:text-red-400 rounded-xl flex items-start gap-2 text-xs">
                        <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
                        <div>
                          <strong>Retrieval Error:</strong> {planError}
                        </div>
                      </div>
                    )}

                    {aiPlanOutput && (
                      <div className="mt-6 p-5 bg-card/60 rounded-xl border border-border prose dark:prose-invert max-w-none text-xs md:text-sm">
                        <div className="border-b border-border pb-2 mb-3 flex items-center justify-between">
                          <span className="font-bold text-[10px] tracking-wide text-primary dark:text-primary uppercase">✨ Personalized Wellness Regimen</span>
                          <button onClick={() => setAiPlanOutput("")} className="text-[10px] text-text-secondary hover:text-text-primary">Dismiss</button>
                        </div>
                        {renderFormattedMarkdown(aiPlanOutput)}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </article>

            {/* Bottom Pages Control pagination bar */}
            <div className="border-t border-border pt-6 mt-12 mb-8 flex items-center justify-between">
              <button 
                onClick={() => setCurrentChapterIndex(prev => Math.max(0, prev - 1))}
                disabled={currentChapterIndex === 0}
                className="flex items-center gap-1.5 text-xs md:text-sm font-semibold text-primary dark:text-primary hover:text-primary-dark dark:hover:text-primary-light disabled:opacity-40 transition"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Prev Chapter</span>
              </button>
              
              <span className="text-[11px] text-text-secondary font-black font-mono">
                PAGE {currentChapterIndex + 1} OF {BOOK_DATA.length}
              </span>

              <button 
                onClick={() => setCurrentChapterIndex(prev => Math.min(BOOK_DATA.length - 1, prev + 1))}
                disabled={currentChapterIndex === BOOK_DATA.length - 1}
                className="flex items-center gap-1.5 text-xs md:text-sm font-semibold text-primary dark:text-primary hover:text-primary-dark dark:hover:text-primary-light disabled:opacity-40 transition"
              >
                <span>Next Chapter</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Collapsible TABLE OF CONTENTS Drawer Overlay */}
        <AnimatePresence>
          {isSidebarOpen && (
            <>
              {/* Backdrop gray clickout */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsSidebarOpen(false)}
                className="fixed inset-0 bg-black/55 backdrop-blur-sm z-50 transition-opacity"
              />

              {/* Sidebar card container */}
              <motion.aside 
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 220 }}
                className="fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-bg-primary border-r border-border z-50 flex flex-col"
              >
                <div className="p-4 border-b border-border flex justify-between items-center bg-bg-secondary">
                  <span className="font-serif font-black text-text-primary flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-primary" />
                    <span>eBook Index</span>
                  </span>
                  <button 
                    onClick={() => setIsSidebarOpen(false)}
                    className="p-1 hover:bg-border/60 rounded-xl transition text-text-secondary"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <nav className="flex-1 overflow-y-auto p-3 space-y-1 custom-scrollbar">
                  {BOOK_DATA.map((ch, idx) => {
                    const isActive = idx === currentChapterIndex;
                    const hasBmk = bookmarks.includes(ch.id);
                    return (
                      <button
                        key={ch.id}
                        onClick={() => {
                          setCurrentChapterIndex(idx);
                          setIsSidebarOpen(false);
                        }}
                        className={`w-full text-left p-2.5 rounded-xl transition flex items-center justify-between group ${isActive ? "bg-primary-light/50 dark:bg-primary/10 border-l-4 border-primary font-bold" : "hover:bg-bg-secondary"}`}
                      >
                        <div className="flex flex-col text-left max-w-[85%]">
                          <span className={`text-[10px] uppercase font-black ${isActive ? "text-primary dark:text-primary-light" : "text-text-secondary group-hover:text-text-primary"}`}>
                            {ch.title}
                          </span>
                          <span className="text-xs font-serif text-text-primary truncate">{ch.subtitle}</span>
                        </div>
                        {hasBmk && (
                          <Bookmark className="w-3 h-3 text-primary fill-primary shrink-0 select-none" />
                        )}
                      </button>
                    );
                  })}
                </nav>

                <div className="p-4 border-t border-border bg-bg-secondary/40 text-center">
                  <p className="text-[10px] uppercase text-text-secondary tracking-widest">&copy; 2026 Curiva Homoeopathy</p>
                  <p className="text-[10px] font-black text-primary tracking-wider mt-1">Tiny Doses. True Shifts.</p>
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* Collapsible CO-OP AI COACH Sidebar Drawer */}
        <AnimatePresence>
          {isCoachOpen && (
            <>
              {/* Back clickout */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsCoachOpen(false)}
                className="fixed inset-0 bg-black/55 backdrop-blur-sm z-50 transition-opacity"
              />

              <motion.aside 
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 220 }}
                className="fixed top-0 right-0 h-full w-96 max-w-[90vw] bg-bg-primary border-l border-border z-50 flex flex-col"
              >
                <div className="p-4 border-b border-border flex justify-between items-center bg-primary-light/60 dark:bg-zinc-900">
                  <span className="font-serif font-black text-primary dark:text-primary-light flex items-center gap-1.5 text-sm uppercase">
                    <Sparkles className="w-4.5 h-4.5 text-primary" />
                    <span>Curiva AI Scalp Coach</span>
                  </span>
                  <button 
                    onClick={() => setIsCoachOpen(false)}
                    className="p-1 hover:bg-border/60 rounded-xl transition text-text-secondary"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Message area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-bg-secondary/20">
                  {chatMessages.map((msg, idx) => (
                    <div 
                      key={idx} 
                      className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div className={`p-3.5 rounded-2xl max-w-[85%] shadow-sm ${msg.sender === "user" ? "bg-primary text-white rounded-tr-none" : msg.isError ? "bg-red-50 dark:bg-red-950/20 text-red-900 border-l-4 border-red-500 rounded-tl-none text-xs" : "bg-bg-primary rounded-tl-none"}`}>
                        {msg.sender === "coach" && (
                          <span className="text-[10px] uppercase font-black text-primary dark:text-primary-light block mb-1">
                            ✨ AI Coach
                          </span>
                        )}
                        <div className="text-xs md:text-sm leading-relaxed whitespace-pre-wrap">
                          {msg.sender === "coach" ? renderFormattedMarkdown(msg.text) : msg.text}
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Coach typing loader */}
                  {isCoachTyping && (
                    <div className="flex justify-start">
                      <div className="p-3 bg-bg-primary border border-border rounded-2xl rounded-tl-none flex items-center gap-2 text-xs text-text-secondary">
                        <Loader2 className="w-4 h-4 animate-spin text-primary" />
                        <span>AI Coach is reading Ebook parameters...</span>
                      </div>
                    </div>
                  )}

                  <div ref={chatMessagesEndRef} />
                </div>

                {/* suggested prompts shortcuts */}
                {chatMessages.length <= 2 && (
                  <div className="px-4 py-3 border-t border-border bg-bg-secondary space-y-1.5">
                    <span className="text-[9px] uppercase tracking-wider font-semibold text-text-secondary">Suggested Prompts</span>
                    {[
                      { l: "Why does chronic stress hit 3 months later?", q: "Explain why stress shows up as delayed hair shedding 3 months later." },
                      { l: "Affordable protein sources for hostel mess", q: "What are some highly affordable vegetarian protein sources for a hostel student?" },
                      { l: "Homoepathy perspective on hair oil myths", q: "How does classical homoeopathic individualization view commercial hair oil myths?" }
                    ].map((btnText, i) => (
                      <button
                        key={i}
                        onClick={() => handleSendChatMessage(btnText.q)}
                        className="w-full text-left p-2.5 bg-bg-primary hover:bg-primary-light/50 hover:text-primary border border-border rounded-xl text-[11px] font-semibold text-text-primary transition flex justify-between items-center"
                      >
                        <span>💡 {btnText.l}</span>
                        <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                      </button>
                    ))}
                  </div>
                )}

                {/* Input box */}
                <div className="p-3 border-t border-border bg-bg-primary flex items-center gap-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSendChatMessage();
                    }}
                    placeholder="Ask about stress, nutrition, or homoeopathy..."
                    className="flex-1 p-2.5 bg-bg-secondary rounded-xl border border-border text-xs md:text-sm outline-none focus:ring-1 focus:ring-primary focus:bg-bg-primary transition"
                  />
                  <button
                    onClick={() => handleSendChatMessage()}
                    className="p-2.5 bg-primary hover:bg-primary-dark text-white rounded-xl transition flex justify-center items-center h-10 w-10 shrink-0"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* Search overlays modal */}
        <AnimatePresence>
          {isSearchOpen && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-center items-start pt-20 px-4">
              <motion.div 
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-bg-primary w-full max-w-2xl rounded-2xl shadow-2xl border border-border overflow-hidden flex flex-col max-h-[75vh]"
              >
                <div className="p-4 border-b border-border flex items-center gap-3 bg-bg-secondary">
                  <Search className="w-4.5 h-4.5 text-text-secondary" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => handleSearchInput(e.target.value)}
                    placeholder="Search chapters, triggers, Homoeopathic tips..."
                    autoFocus
                    className="w-full bg-transparent outline-none text-text-primary placeholder-text-secondary text-sm md:text-base"
                  />
                  <button 
                    onClick={() => {
                      setIsSearchOpen(false);
                      setSearchQuery("");
                      setSearchResults([]);
                    }}
                    className="p-1.5 hover:bg-border/60 rounded-lg transition"
                  >
                    <X className="w-4.5 h-4.5" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                  {searchResults.length === 0 ? (
                    <p className="text-text-secondary text-center py-12 text-sm">
                      {searchQuery ? "No matching chapters found. Try searching for 'cortisol', 'PCOS', or 'mineral'." : "Type keywords to scan the recovery handbook instantly..."}
                    </p>
                  ) : (
                    <div className="divide-y divide-border">
                      {searchResults.map((match, idx) => (
                        <div 
                          key={idx}
                          onClick={() => {
                            setCurrentChapterIndex(match.chapterIndex);
                            setIsSearchOpen(false);
                            setSearchQuery("");
                            setSearchResults([]);
                          }}
                          className="py-3 px-2 rounded-xl hover:bg-bg-secondary/40 cursor-pointer transition flex flex-col justify-start text-left"
                        >
                          <span className="font-bold text-primary dark:text-primary-light block text-[10px] uppercase tracking-wider">
                            {match.chapterTitle}
                          </span>
                          <p className="text-xs text-text-secondary mt-1.5 italic line-clamp-2">
                            ...{match.snippet}...
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Global Floating Notification Toast */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="fixed bottom-6 right-6 bg-primary dark:bg-primary-dark text-white px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 z-50 text-xs font-bold"
            >
              <Info className="w-4 h-4 text-primary-light" />
              <span>{toastMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </>
  );
}
