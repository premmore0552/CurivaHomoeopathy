import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, BookOpen, ExternalLink, ShieldAlert, ShieldCheck } from 'lucide-react';
import SEO from '../components/SEO';
import { researchNodes } from '../components/ResearchMindMap';

const evidenceUrl = 'https://www.nccih.nih.gov/health/homeopathy';
const nhsUrl = 'https://www.nhs.uk/conditions/homeopathy/';
const governmentIndiaUrl = 'https://www.nch.org.in/';

const clinicalDetails: Record<string, {heading:string; sections:{title:string;body:string}[]; sources:{label:string;url:string}[]}> = {
  'acid-reflux': { heading:'Understanding acid reflux', sections:[
    {title:'Overview',body:'Acid reflux occurs when stomach contents flow back into the oesophagus and may cause heartburn or regurgitation. Symptoms can overlap with other conditions, so persistent or changing symptoms should be assessed by a qualified health professional.'},
    {title:'When to seek care',body:'Seek urgent care for chest pain with breathlessness, sweating, faintness, or pain spreading to the arm or jaw. Prompt medical assessment is also important for difficulty swallowing, vomiting blood, black stools, persistent vomiting, or unexplained weight loss.'},
    {title:'Evidence note',body:'This entry is general health education, not a treatment plan. The database does not claim that homoeopathy treats reflux. Discuss ongoing symptoms and medicines with a clinician.'}
  ],sources:[{label:'NCCIH: Homeopathy evidence and safety',url:evidenceUrl}]},
  'constipation': {heading:'Understanding constipation',sections:[
    {title:'Overview',body:'Constipation can include hard or lumpy stools, straining, a feeling of incomplete emptying, or fewer bowel movements than usual. Causes vary and may include diet, medicines, activity, and underlying health conditions.'},
    {title:'When to seek care',body:'Seek urgent assessment if constipation comes with severe or persistent abdominal pain, vomiting, a swollen abdomen, blood in the stool, or inability to pass gas. New persistent symptoms or unexplained weight loss should be discussed with a clinician.'},
    {title:'Evidence note',body:'This page provides general educational information. It does not recommend homoeopathic remedies as proven treatment for constipation.'}
  ],sources:[{label:'NCCIH: Homeopathy evidence and safety',url:evidenceUrl}]},
  'allergic-rhinitis': {heading:'Understanding allergic rhinitis',sections:[
    {title:'Overview',body:'Allergic rhinitis is an inflammatory response in the nasal lining after exposure to allergens such as pollen, dust mites, or animal dander. Symptoms may include sneezing, nasal itching, congestion, and a runny nose.'},
    {title:'Care and safety',body:'Options supported by clinical guidance can include reducing exposure to triggers, saline nasal rinses, antihistamines, and intranasal corticosteroids, selected according to age, symptoms, and clinician or pharmacist advice. Breathing difficulty or swelling of the tongue or throat is an emergency.'},
    {title:'Evidence note',body:'Do not substitute homoeopathy for effective allergy treatment. Evidence for homoeopathy as a treatment for specific conditions is limited.'}
  ],sources:[{label:'NCCIH: Homeopathy evidence and safety',url:evidenceUrl},{label:'NHS: Homeopathy',url:nhsUrl}]},
  'asthma': {heading:'Understanding asthma',sections:[
    {title:'Overview',body:'Asthma is a chronic condition involving airway inflammation and variable narrowing. Symptoms may include wheeze, cough, chest tightness, and breathlessness. Diagnosis and an individual action plan should be developed with a qualified clinician.'},
    {title:'Emergency warning',body:'If someone is struggling to breathe, cannot speak in full sentences, becomes blue or drowsy, or their prescribed reliever is not helping, seek emergency medical care immediately. Do not delay prescribed inhalers or urgent treatment for an alternative remedy.'},
    {title:'Evidence note',body:'Homoeopathy should not replace inhaled medicines, an asthma action plan, or emergency treatment. Reliable evidence does not establish homoeopathy as an effective asthma treatment.'}
  ],sources:[{label:'NCCIH: Homeopathy evidence and safety',url:evidenceUrl},{label:'NHS: Homeopathy',url:nhsUrl}]},
  'sinusitis': {heading:'Understanding sinusitis',sections:[
    {title:'Overview',body:'Sinusitis is inflammation of the lining of the sinuses and commonly occurs after a viral respiratory infection. Symptoms may include facial pressure, nasal blockage, discharge, and reduced sense of smell.'},
    {title:'When to seek care',body:'Seek urgent medical assessment for swelling or redness around an eye, double vision or reduced vision, severe frontal headache, confusion, or neurological symptoms. Consult a clinician for severe, worsening, or persistent symptoms.'},
    {title:'Evidence note',body:'This is a general overview and does not diagnose the cause of sinus symptoms. Homoeopathy is not established as an effective treatment for sinusitis.'}
  ],sources:[{label:'NCCIH: Homeopathy evidence and safety',url:evidenceUrl}]},
  'acne': {heading:'Understanding acne',sections:[
    {title:'Overview',body:'Acne is a common inflammatory condition of hair follicles and oil glands. It can cause blackheads, whiteheads, inflamed papules, pustules, and sometimes nodules or scars.'},
    {title:'Care and safety',body:'Evidence-based care may include gentle cleansing and topical treatments such as benzoyl peroxide or retinoids; the appropriate choice depends on age, severity, pregnancy considerations, and skin tolerance. Painful nodules, scarring, or significant distress warrant professional advice.'},
    {title:'Evidence note',body:'Do not interpret traditional remedy descriptions as proof of benefit. Homoeopathy has little reliable evidence for treating specific health conditions.'}
  ],sources:[{label:'NCCIH: Homeopathy evidence and safety',url:evidenceUrl}]},
  'eczema': {heading:'Understanding eczema and dermatitis',sections:[
    {title:'Overview',body:'Eczema is a term for inflammatory skin conditions that often cause dryness and itching. Dermatitis has several forms and may be related to irritants, allergens, or other skin-barrier factors.'},
    {title:'Care and safety',body:'Skin care often includes avoiding known irritants and using fragrance-free moisturisers. A clinician can help identify the type of rash and advise treatment. Rapidly spreading redness, fever, severe pain, or signs of infection need prompt assessment.'},
    {title:'Evidence note',body:'This entry does not recommend homoeopathy as a proven treatment for eczema or dermatitis.'}
  ],sources:[{label:'NCCIH: Homeopathy evidence and safety',url:evidenceUrl}]},
  'migraine': {heading:'Understanding migraine',sections:[
    {title:'Overview',body:'Migraine is a neurological disorder that can cause recurring attacks of headache, nausea, and sensitivity to light or sound. Some people experience aura symptoms. Diagnosis and prevention strategies depend on attack patterns and personal health history.'},
    {title:'Red flags',body:'A sudden, extremely severe headache, new weakness, confusion, fainting, fever with neck stiffness, or a new headache after significant head injury requires urgent medical assessment.'},
    {title:'Evidence note',body:'There is not reliable evidence establishing homoeopathy as an effective migraine treatment. Do not stop prescribed medication without discussing it with your clinician.'}
  ],sources:[{label:'NCCIH: Homeopathy evidence and safety',url:evidenceUrl}]},
  'evidence-safety': {heading:'Evidence and safety: how to read homeopathy research', sections:[
    {title:'What evidence reviews say',body:'The US National Center for Complementary and Integrative Health states that there is little evidence supporting homeopathy as an effective treatment for any specific health condition. The NHS likewise explains that there is no good-quality evidence that homeopathy is effective for any health condition.'},
    {title:'Product safety',body:'Some products labelled homeopathic may contain measurable active ingredients and can cause side effects or interact with medicines. Highly diluted products and lower-dilution products are not interchangeable. Product quality and ingredients matter.'},
    {title:'Safer decisions',body:'Do not delay proven treatment, stop prescribed medicines, or use homeopathy as a substitute for vaccination or emergency care. Discuss any complementary products with your doctor or pharmacist and provide the exact product label.'}
  ],sources:[{label:'US NIH NCCIH: Homeopathy',url:evidenceUrl},{label:'NHS: Homeopathy',url:nhsUrl}]},
  'history-hahnemann': {heading:'Samuel Hahnemann and the history of homeopathy',sections:[
    {title:'Historical context',body:'Christian Friedrich Samuel Hahnemann (1755–1843) was a German physician who developed the system later called homeopathy in the late eighteenth and early nineteenth centuries. Its historical doctrines include the principle of similars and serial dilution.'},
    {title:'Historical versus scientific claims',body:'The history of a medical system is distinct from evidence that it is effective. Historical writings are primary sources for what practitioners believed, but they are not substitutes for modern controlled clinical research.'},
    {title:'Further study',body:'Use this entry as a starting point for studying the history of medical ideas. Evaluate claims about health outcomes separately using systematic reviews and reliable public-health sources.'}
  ],sources:[{label:'US NIH NCCIH: Homeopathy overview',url:evidenceUrl},{label:'National Commission for Homoeopathy, India',url:governmentIndiaUrl}]},
  'like-cures-like': {heading:'“Like cures like”: a historical principle',sections:[
    {title:'Meaning within homeopathy',body:'The principle of similars proposes that a substance associated with certain symptoms in healthy people may be selected under homeopathic doctrine for a person with similar symptoms. This is a description of the tradition’s theory, not evidence that the method is effective.'},
    {title:'Scientific evaluation',body:'A therapeutic principle must be evaluated through well-designed clinical studies with appropriate controls, transparent outcomes, and reproducible results. The principle itself does not establish clinical benefit.'},
    {title:'Reading note',body:'When reading materia medica or historical texts, label traditional claims as traditional claims and compare them with contemporary evidence.'}
  ],sources:[{label:'US NIH NCCIH: Homeopathy',url:evidenceUrl}]},
  'dilution-potentisation': {heading:'Serial dilution and potentisation',sections:[
    {title:'Traditional process',body:'Homeopathic preparations are often described as being produced through repeated dilution and shaking, a process traditionally called potentisation. Different scales and preparation methods exist.'},
    {title:'Chemistry context',body:'At sufficiently high dilutions, the expected number of molecules from the original starting material can become extremely small or zero in a typical dose. Proposed explanations for effects at ultra-high dilution are not established as accepted mechanisms in mainstream chemistry or physics.'},
    {title:'Safety context',body:'Not all products labelled homeopathic are highly diluted. Some may contain active ingredients, contaminants, or alcohol and can cause harm. Do not assume a product is safe based only on its label.'}
  ],sources:[{label:'US NIH NCCIH: Homeopathy',url:evidenceUrl},{label:'US FDA: Homeopathic products',url:'https://www.fda.gov/drugs/information-drug-class/homeopathic-products'}]}
};

function genericSections(name: string, summary: string, type: string) {
  if (type === 'remedy') return [
    {title:'What this entry covers',body:summary},
    {title:'Historical materia medica context',body:'Traditional materia medica texts describe this substance using characteristic symptom patterns and historical remedy relationships. These descriptions document a medical tradition; they should not be read as validated indications or as evidence that the substance treats a disease.'},
    {title:'Safety and evidence',body:'This reference does not provide a dose or recommend self-treatment. Source materials can be toxic, allergenic, or interact with medicines, and products sold under the same label may differ substantially in dilution and composition. Reliable evidence does not establish homoeopathy as an effective treatment for specific conditions. Consult a qualified healthcare professional and do not delay proven care.'}
  ];
  if (type === 'principle') return [
    {title:'Concept overview',body:summary},
    {title:'How to study this concept',body:'Read the concept in its historical context and distinguish the original doctrine from later interpretations. A philosophical explanation is not itself evidence of clinical effectiveness.'},
    {title:'Evidence and modern care',body:'Claims about treatment outcomes require independent clinical evidence. Public-health sources report little reliable evidence that homeopathy is effective for any specific health condition; it should not replace evidence-based care.'}
  ];
  return [
    {title:'Overview',body:summary},
    {title:'How to use this entry',body:'Use this page as a navigational and educational reference. Related topics below provide additional context. For health symptoms, a qualified clinician can assess the cause and recommend care based on current evidence.'},
    {title:'Evidence and safety',body:'This page does not make a claim that homoeopathy treats this topic. The US National Center for Complementary and Integrative Health reports little evidence supporting homeopathy as an effective treatment for specific conditions. Do not delay proven treatment or stop prescribed medicines.'}
  ];
}

export default function ResearchEntryPage() {
  const { slug = '' } = useParams();
  const entry = researchNodes.find(node => node.slug.toLowerCase() === slug.toLowerCase());
  if (!entry) return <main className="min-h-[60vh] px-5 py-24 text-center"><SEO title="Research entry not found | Curiva Homoeopathy" /><h1 className="text-3xl font-display font-semibold text-text-primary">Entry not found</h1><p className="mx-auto mt-3 max-w-lg text-text-secondary">This research entry is not in the current index.</p><Link to="/categories" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 font-bold text-white"><ArrowLeft className="h-4 w-4" /> Back to repository</Link></main>;

  const details = clinicalDetails[entry.slug];
  const sections = details?.sections || genericSections(entry.name, entry.summary, entry.type);
  const sources = details?.sources || [{label:'US NIH NCCIH: Homeopathy',url:evidenceUrl},{label:'NHS: Homeopathy',url:nhsUrl}];
  const related = entry.related.map(id => researchNodes.find(node => node.id === id)).filter((node): node is typeof researchNodes[number] => Boolean(node));

  return <main className="min-h-screen bg-bg-primary pb-20 pt-24">
    <SEO title={entry.name + ' | Curiva Research Repository'} description={entry.summary} type="article" />
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
      <Link to="/categories#repository-explorer" className="inline-flex items-center gap-2 text-sm font-bold text-text-secondary transition hover:text-primary"><ArrowLeft className="h-4 w-4" /> Back to research database</Link>
      <header className="mt-7 rounded-[2rem] border border-border bg-bg-secondary p-6 sm:p-10">
        <p className="text-[10px] font-black uppercase tracking-[0.22em] text-primary">Curiva research repository · {entry.type}</p>
        <h1 className="mt-4 text-3xl font-display font-semibold leading-tight text-text-primary sm:text-5xl">{details?.heading || entry.name}</h1>
        <p className="mt-5 max-w-3xl text-base leading-8 text-text-secondary">{entry.summary}</p>
        <div className="mt-6 flex flex-wrap gap-2">{entry.tags.map(tag => <span key={tag} className="rounded-full border border-border bg-bg-primary px-3 py-1 text-xs font-semibold text-text-secondary">{tag}</span>)}</div>
      </header>
      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px]">
        <article className="space-y-5">
          {sections.map(section => <section key={section.title} className="rounded-2xl border border-border bg-bg-primary p-5 sm:p-7"><h2 className="text-xl font-display font-semibold text-text-primary">{section.title}</h2><p className="mt-3 text-sm leading-7 text-text-secondary">{section.body}</p></section>)}
          <section className="rounded-2xl border border-amber-500/30 bg-amber-500/[0.06] p-5 sm:p-7"><div className="flex items-start gap-3"><ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" /><div><h2 className="font-bold text-text-primary">Medical safety note</h2><p className="mt-2 text-sm leading-7 text-text-secondary">Educational information only; not a diagnosis or individual treatment plan. Do not delay emergency care, stop prescribed treatment, or substitute homeopathy for vaccination or evidence-based care. Discuss products with a qualified health professional.</p></div></div></section>
          <section className="rounded-2xl border border-border bg-bg-secondary p-5 sm:p-7"><h2 className="flex items-center gap-2 text-lg font-display font-semibold text-text-primary"><BookOpen className="h-5 w-5 text-primary" /> Sources for further reading</h2><ul className="mt-4 space-y-3">{sources.map(source => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">{source.label}<ExternalLink className="h-3.5 w-3.5" /></a></li>)}</ul></section>
        </article>
        <aside className="space-y-5">
          <div className="rounded-2xl border border-border bg-bg-secondary p-5"><h2 className="font-bold text-text-primary">Entry details</h2><p className="mt-3 text-xs leading-5 text-text-secondary">Parent collection: {researchNodes.find(node => node.id === entry.parent)?.name || 'Repository root'}</p><p className="mt-3 flex items-start gap-2 text-xs leading-5 text-text-secondary"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> Evidence and traditional concepts are presented separately.</p></div>
          <div className="rounded-2xl border border-border bg-bg-primary p-5"><h2 className="font-bold text-text-primary">Related entries</h2><div className="mt-3 space-y-2">{related.map(node => <Link key={node.id} to={'/research-entry/' + node.slug} className="flex items-center gap-2 rounded-xl border border-border p-3 text-sm font-semibold text-text-secondary transition hover:border-primary/40 hover:text-primary"><ArrowRight className="h-4 w-4 shrink-0" />{node.name}</Link>)}</div></div>
          <Link to="/categories#repository-explorer" className="flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-bold text-white hover:opacity-90"><ArrowLeft className="h-4 w-4" /> Return to database</Link>
        </aside>
      </div>
    </div>
  </main>;
}
