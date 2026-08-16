import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, CheckCircle2, ShieldCheck, Activity, Heart, Sparkles, Search, ArrowUpRight, BookOpen, LayoutGrid } from 'lucide-react';
import SEO from '../components/SEO';
import ShareButton from '../components/ShareButton';
import InteractiveMindMap from '../components/InteractiveMindMap';
import { ContentNavigator } from '../components/ContentNavigator';

interface AilmentData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  approach: string;
  benefits: string[];
  remedies: string[];
  image: string;
}

const ailments: Record<string, AilmentData> = {
  'skin-health': {
    id: 'skin-health',
    title: 'Homoeopathy for Skin Conditions',
    subtitle: 'Healing from within for vibrant, clear skin.',
    description: 'Vibrant skin is often a reflection of internal health. Homoeopathy treats skin disorders by addressing the underlying constitution rather than merely suppressing surface symptoms with topical creams. Whether you are dealing with chronic Eczema, Psoriasis, or persistent Acne, our tailored approach helps restore your skin\'s natural balance.',
    approach: 'We look at your unique triggers—be it digestive issues, stress, or environmental factors. By selecting a remedy that matches your whole physical and emotional state, we help your body regulate its immune response and detoxify effectively.',
    benefits: [
      'Reduces inflammation and redness naturally',
      'Addresses the root cause of chronic outbreaks',
      'Safe for infants with cradle cap or childhood eczema',
      'No side effects associated with long-term steroid use',
      'Long-term remission for stubborn conditions'
    ],
    remedies: ['Sulphur', 'Graphites', 'Psorinum', 'Sepia', 'Natrum Mur'],
    image: 'https://picsum.photos/seed/skin/1200/600'
  },
  'chronic-pain': {
    id: 'chronic-pain',
    title: 'Managing Chronic Pain Naturally',
    subtitle: 'Gentle relief for stiffness, inflammation, and discomfort.',
    description: 'Chronic pain, whether from Arthritis, Fibromyalgia, or old injuries, can significantly impact quality of life. Homoeopathy offers a non-addictive, gentle alternative for managing pain. Our remedies work with the body\'s nervous and musculoskeletal systems to reduce sensitivity and improve mobility.',
    approach: 'We analyze the nature of your pain—is it better with movement or rest? Is it worse in damp weather? These specific details lead us to the precise remedy that can alleviate your discomfort and improve joint function.',
    benefits: [
      'Improves mobility and joint flexibility',
      'Reduces dependence on systemic painkillers',
      'Addresses weather-related rheumatic sensitivity',
      'Non-habit forming and safe for long-term use',
      'Helps manage the emotional frustration of living with pain'
    ],
    remedies: ['Rhus Tox', 'Bryonia', 'Arnica', 'Causticum', 'Mag Phos'],
    image: 'https://picsum.photos/seed/pain/1200/600'
  },
  'stress-anxiety': {
    id: 'stress-anxiety',
    title: 'Homoeopathy for Mental Wellness',
    subtitle: 'Restoring emotional equilibrium and inner peace.',
    description: 'In today\'s fast-paced world, stress, anxiety, and burnout are common challenges. Homoeopathy treats the mind and body as one. Our remedies help balance the nervous system, allowing you to manage life\'s stressors with greater resilience without the "brain fog" or numbing effects of traditional sedatives.',
    approach: 'We focus on your specific experience of anxiety—be it performance stress, grief-related sadness, or panic attacks. By matching a remedy to your specific emotional triggers, we facilitate a natural state of calm and focus.',
    benefits: [
      'Promotes restful sleep and reduces insomnia',
      'Naturally alleviates panic and generalized anxiety',
      'No risk of dependency or withdrawal symptoms',
      'Supports focus and clarity during demanding times',
      'Helps process deep-seated grief and emotional blocks'
    ],
    remedies: ['Ignatia', 'Aconite', 'Argentum Nit', 'Gelsemium', 'Lycopodium'],
    image: 'https://picsum.photos/seed/mental/1200/600'
  },
  'digestive-issues': {
    id: 'digestive-issues',
    title: 'Holistic Digestive Support',
    subtitle: 'Relief for IBS, Gastritis, and food sensitivities.',
    description: 'A healthy gut is essential for overall vitality. Digestive complaints like IBS, bloating, and food intolerances often indicate an system-wide imbalance. Homoeopathy helps strengthen the digestive fire and resolve inflammation in the gut lining.',
    approach: 'We assess your dietary habits, energy patterns, and how your digestion reacts to specific stressors. Homoeopathic treatment aims to recalibrate your digestive processes so you can enjoy food again without fear of discomfort.',
    benefits: [
      'Reduces bloating, gas, and abdominal discomfort',
      'Effective for Irritable Bowel Syndrome (IBS)',
      'Helps manage acid reflux and gastritis naturally',
      'Supports the gut-brain axis for emotional stability',
      'Gentle regulation of bowel movements'
    ],
    remedies: ['Nux Vomica', 'Lycopodium', 'Pulsatilla', 'Carbo Veg', 'Arsenicum Alb'],
    image: 'https://picsum.photos/seed/digestive/1200/600'
  },
  'respiratory-health': {
    id: 'respiratory-health',
    title: 'Breathe Easy: Respiratory Care',
    subtitle: 'Support for Asthma, Hay Fever, and Allergies.',
    description: 'Respiratory challenges like seasonal allergies or chronic asthma can be exhausting. Homoeopathy treats the hypersensitivity of the immune system that causes these reactions, helping you breathe more freely throughout the seasons.',
    approach: 'Whether it is a reaction to pollen, dust, or cold air, we find the remedy that matches your respiratory symptoms and your overall susceptibility. Over time, this decreases the frequency and severity of allergic episodes.',
    benefits: [
      'Alleviates seasonal hay fever naturally',
      'Supports lung function in chronic respiratory conditions',
      'Non-drowsy alternative to antihistamines',
      'Reduces the hyper-reactivity of the bronchial tubes',
      'Effective for child-onset allergies and catarrh'
    ],
    remedies: ['Allium Cepa', 'Arsenic Alb', 'Euphrasia', 'Spongia', 'Natrum Sulph'],
    image: 'https://picsum.photos/seed/breathing/1200/600'
  },
  'immunity-wellness': {
    id: 'immunity-wellness',
    title: 'Immunity & Constitutional Wellness',
    subtitle: 'Strengthening your defenses from the ground up.',
    description: 'Immunity is not just about avoiding a cold; it is about the body\'s innate ability to maintain balance against external stressors. Homoeopathy focuses on "hosting resistance"—strengthening the individual\'s constitution so they are less susceptible to illness and recover faster when they do fall sick.',
    approach: 'We look at your overall vitality, sleep patterns, and susceptibility to seasonal changes. Constitutional remedies are chosen to optimize your immune response and provide a deep sense of well-being.',
    benefits: [
      'Reduces frequency of recurrent colds and flu',
      'Supports faster recovery from chronic fatigue',
      'Naturally balances the immune system',
      'Ideal for post-viral recovery and long-term vitality',
      'Enhances the body\'s natural resilience to stress'
    ],
    remedies: ['Silica', 'Calc Carb', 'Tuberculinum', 'Phosphorus', 'Arsenic Alb'],
    image: 'https://picsum.photos/seed/immunity/1200/600'
  }
};

export default function AilmentDetail() {
  const { ailmentId } = useParams<{ ailmentId: string }>();
  const data = ailmentId ? ailments[ailmentId] : null;

  const ailmentKeys = Object.keys(ailments);
  const currentIndex = ailmentKeys.indexOf(ailmentId || '');
  const prevKey = currentIndex > 0 ? ailmentKeys[currentIndex - 1] : null;
  const nextKey = currentIndex < ailmentKeys.length - 1 ? ailmentKeys[currentIndex + 1] : null;

  const prev = prevKey ? ailments[prevKey] : null;
  const next = nextKey ? ailments[nextKey] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [ailmentId]);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-primary">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-text-primary mb-4">Ailment not found</h2>
          <Link to="/" className="text-primary hover:underline">Return to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-primary transition-colors duration-300 pb-20">
      <SEO 
        title={`${data.title} | Curiva Homoeopathy`}
        description={data.description}
        image={data.image}
      />
      
      <header className="relative h-[40vh] min-h-[300px] overflow-hidden">
        <img 
          src={data.image} 
          alt={data.title} 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full p-8 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <Link 
              to="/health-guides" 
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              Back to Health Guides
            </Link>
            <h1 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
              {data.title}
            </h1>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="text-lg md:text-xl text-white/90 font-medium italic">
                — {data.subtitle}
              </p>
              <ShareButton 
                title={data.title} 
                text={data.description} 
                variant="outline" 
                label="Share Guide" 
              />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-12">
            {/* Quick Navigation / Table of Contents */}
            <div className="p-6 bg-bg-secondary rounded-3xl border border-border shadow-sm mb-8">
              <div className="flex items-center gap-3 mb-4">
                <LayoutGrid className="w-5 h-5 text-primary" />
                <h3 className="font-display font-black text-lg text-text-primary uppercase tracking-tight italic">Jump to <span className="text-primary italic">Section</span></h3>
              </div>
              <div className="flex flex-wrap gap-4">
                <a href="#understanding" className="text-sm font-bold text-text-secondary hover:text-primary transition-colors flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/30" /> Understanding
                </a>
                <a href="#approach" className="text-sm font-bold text-text-secondary hover:text-primary transition-colors flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/30" /> Our Approach
                </a>
                <a href="#remedies-map" className="text-sm font-bold text-text-secondary hover:text-primary transition-colors flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/30" /> Relational Map
                </a>
                <a href="#benefits" className="text-sm font-bold text-text-secondary hover:text-primary transition-colors flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/30" /> Benefits
                </a>
                <a href="#remedies" className="text-sm font-bold text-text-secondary hover:text-primary transition-colors flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/30" /> Example Remedies
                </a>
              </div>
            </div>

            <section id="understanding" className="scroll-mt-28">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Activity className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-display font-bold text-text-primary">Understanding the Condition</h2>
              </div>
              <p className="text-lg text-text-secondary leading-relaxed first-letter:text-5xl first-letter:font-serif first-letter:text-primary first-letter:mr-3 first-letter:float-left">
                {data.description}
              </p>
            </section>

            <section id="approach" className="bg-bg-secondary p-8 rounded-3xl border border-border scroll-mt-28">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-display font-bold text-text-primary">Our Homoeopathic Approach</h2>
              </div>
              <p className="text-text-secondary leading-relaxed">
                {data.approach}
              </p>
            </section>

            <section id="remedies-map" className="scroll-mt-28">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-display font-bold text-text-primary">Remedy Relationship Network</h2>
              </div>
              <InteractiveMindMap 
                height={400}
                data={{
                  nodes: [
                    { id: 'main', name: data.title.split(' ').pop() || data.title, group: 0 },
                    ...data.remedies.map(r => ({ id: r, name: r, group: 1 })),
                    { id: 'constitutional', name: 'Constitutional', group: 2 },
                    { id: 'acute', name: 'Acute Phase', group: 2 }
                  ],
                  links: [
                    ...data.remedies.map(r => ({ source: 'main', target: r, value: 2 })),
                    { source: 'main', target: 'constitutional', value: 1 },
                    { source: 'main', target: 'acute', value: 1 }
                  ]
                }}
              />
            </section>

            <section id="benefits" className="scroll-mt-28">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <ShieldCheck className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-display font-bold text-text-primary">Benefits of Homoeopathy</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {data.benefits.map((benefit, idx) => (
                  <motion.div 
                    key={`${data.id}-benefit-${idx}`}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-start gap-3 p-4 bg-bg-primary rounded-xl border border-border hover:border-primary/30 transition-colors"
                  >
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm font-medium text-text-primary">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Tool Integration */}
            <div className="my-12 p-8 bg-primary/10 rounded-[2rem] text-center border-2 border-primary/20">
              <div className="w-16 h-16 bg-bg-primary rounded-full flex items-center justify-center mx-auto mb-4 border border-border shadow-sm">
                <BookOpen className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-display font-bold text-text-primary mb-3">
                Deepen Your Research
              </h3>
              <p className="text-text-secondary mb-6 max-w-lg mx-auto">
                Discover how these patterns are traditionally studied through our comprehensive database of clinical insights and research topics.
              </p>
              <Link to="/topics" className="inline-flex flex-wrap items-center justify-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:scale-105 transition-all w-full sm:w-auto">
                Explore Research Database
                <ArrowUpRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Previous / Next Ailment Navigation */}
            <ContentNavigator 
              prev={prev ? { to: `/ailment/${prev.id}`, title: prev.title, label: 'Previous Ailment' } : null}
              next={next ? { to: `/ailment/${next.id}`, title: next.title, label: 'Next Ailment' } : null}
            />
          </div>

          <aside className="space-y-8">
            <div className="p-8 bg-primary rounded-3xl text-white shadow-xl shadow-primary/20 sticky top-28">
              <Sparkles className="w-8 h-8 mb-4 opacity-50" />
              <h3 className="text-xl font-display font-bold mb-4">Educational Research</h3>
              <p className="text-white/80 text-sm mb-6">
                Curiva is a platform providing research-backed clinical insights. Content is curated by a BHMS student for informational purposes only.
              </p>
              <div className="space-y-3">
                <div className="px-4 py-3 bg-white/10 rounded-xl border border-white/20 text-[10px] font-black uppercase tracking-widest text-center">
                  BHMS Student Resource
                </div>
                <a 
                  href="https://www.instagram.com/curivahomoeopathy/" target="_blank" rel="noopener noreferrer"
                  className="w-full py-3 bg-white text-primary font-bold rounded-xl flex items-center justify-center hover:bg-white/90 transition-all text-sm mb-4"
                >
                  Follow for Insights
                </a>
              </div>
            </div>

            <div id="remedies" className="p-6 bg-bg-secondary rounded-3xl border border-border scroll-mt-28">
              <h4 className="text-sm font-bold text-text-primary mb-4 uppercase tracking-wider">Example Remedies</h4>
              <div className="flex flex-wrap gap-2">
                {data.remedies.map((remedy, idx) => (
                  <span key={`${data.id}-remedy-${idx}`} className="px-3 py-1 bg-bg-primary text-primary text-xs font-bold rounded-full border border-border">
                    {remedy}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-[10px] text-text-secondary italic">
                *Remedies are provided for academic study. Authentic Homoeopathic prescribing always requires an individualized case-taking by a qualified professional.
              </p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
