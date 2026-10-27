import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Activity, ArrowDownToLine, ArrowRight, BookOpen, Check, ChevronDown,
  ChevronRight, Clipboard, ExternalLink, Filter, GitBranch, Search, Share2,
  ShieldCheck, Sparkles, X, ZoomIn, ZoomOut, RotateCcw
} from 'lucide-react';

type NodeType = 'category' | 'topic' | 'remedy' | 'research' | 'principle';
type ResearchNode = {
  id: string; name: string; type: NodeType; parent: string; summary: string;
  slug: string; tags: string[]; related: string[];
};

export const researchNodes: ResearchNode[] = [
  { id:'materia-medica', name:'Materia Medica A–Z', type:'category', parent:'', slug:'materia-medica', summary:'An index of substances described in homoeopathic materia medica, including their source and traditional descriptions.', tags:['reference','materia medica'], related:['remedy-arsenicum-album','remedy-arnica','remedy-belladonna'] },
  { id:'mineral-remedies', name:'Minerals & Salts', type:'topic', parent:'materia-medica', slug:'mineral-remedies', summary:'A traditional materia medica grouping for preparations associated with mineral and chemical sources.', tags:['minerals','reference'], related:['remedy-arsenicum-album','remedy-calcarea-carbonica','remedy-natrum-muriaticum'] },
  { id:'plant-remedies', name:'Plant-derived substances', type:'topic', parent:'materia-medica', slug:'plant-remedies', summary:'A traditional materia medica grouping for substances whose source is botanical.', tags:['botany','reference'], related:['remedy-arnica','remedy-aconitum-napellus','remedy-belladonna'] },
  { id:'animal-remedies', name:'Animal-derived substances', type:'topic', parent:'materia-medica', slug:'animal-remedies', summary:'A traditional materia medica grouping for substances derived from animals or animal products.', tags:['animal sources','reference'], related:['remedy-apis-mellifica','remedy-lachesis'] },
  { id:'remedy-arsenicum-album', name:'Arsenicum album', type:'remedy', parent:'mineral-remedies', slug:'arsenicum-album', summary:'A materia medica entry associated historically with arsenic trioxide; source material is toxic and must never be handled or self-administered.', tags:['arsenic','mineral','safety'], related:['mineral-remedies','remedy-phosphorus','evidence-homeopathy'] },
  { id:'remedy-calcarea-carbonica', name:'Calcarea carbonica', type:'remedy', parent:'mineral-remedies', slug:'calcarea-carbonica', summary:'A traditional materia medica entry associated with calcium carbonate. This profile describes historical terminology, not a proven treatment recommendation.', tags:['calcium carbonate','mineral'], related:['mineral-remedies','remedy-natrum-muriaticum'] },
  { id:'remedy-natrum-muriaticum', name:'Natrum muriaticum', type:'remedy', parent:'mineral-remedies', slug:'natrum-muriaticum', summary:'A traditional materia medica entry associated with sodium chloride, also known as common salt.', tags:['sodium chloride','mineral'], related:['mineral-remedies','remedy-calcarea-carbonica'] },
  { id:'remedy-sulphur', name:'Sulphur', type:'remedy', parent:'mineral-remedies', slug:'sulphur', summary:'A traditional materia medica entry associated with elemental sulfur. Elemental sulfur and any preparation must not be confused with evidence of clinical effectiveness.', tags:['sulfur','mineral'], related:['mineral-remedies','remedy-arsenicum-album'] },
  { id:'remedy-silicea', name:'Silicea', type:'remedy', parent:'mineral-remedies', slug:'silicea', summary:'A traditional entry associated with silica/silicon dioxide in homoeopathic materia medica.', tags:['silica','mineral'], related:['mineral-remedies','remedy-calcarea-carbonica'] },
  { id:'remedy-phosphorus', name:'Phosphorus', type:'remedy', parent:'mineral-remedies', slug:'phosphorus', summary:'A traditional materia medica entry associated with elemental phosphorus, a substance with serious toxicity in some forms.', tags:['phosphorus','mineral','safety'], related:['mineral-remedies','remedy-arsenicum-album'] },
  { id:'remedy-aconitum-napellus', name:'Aconitum napellus', type:'remedy', parent:'plant-remedies', slug:'aconitum-napellus', summary:'A traditional entry associated with monkshood (Aconitum napellus), a highly poisonous plant. Do not prepare or use the raw plant.', tags:['botany','toxic plant','safety'], related:['plant-remedies','remedy-belladonna','evidence-homeopathy'] },
  { id:'remedy-arnica', name:'Arnica montana', type:'remedy', parent:'plant-remedies', slug:'arnica', summary:'A traditional entry associated with Arnica montana. Herbal products and highly diluted homoeopathic preparations are not interchangeable; topical arnica can irritate or cause reactions.', tags:['botany','arnica','safety'], related:['plant-remedies','remedy-belladonna','evidence-homeopathy'] },
  { id:'remedy-belladonna', name:'Atropa belladonna', type:'remedy', parent:'plant-remedies', slug:'belladonna', summary:'A traditional entry associated with deadly nightshade, which contains toxic tropane alkaloids. The plant is poisonous and is not suitable for self-treatment.', tags:['botany','toxic plant','safety'], related:['plant-remedies','remedy-aconitum-napellus','evidence-homeopathy'] },
  { id:'remedy-bryonia', name:'Bryonia alba', type:'remedy', parent:'plant-remedies', slug:'bryonia', summary:'A historical materia medica entry associated with Bryonia alba. Raw plant material can be toxic; traditional descriptions are not clinical evidence.', tags:['botany','safety'], related:['plant-remedies','remedy-arnica'] },
  { id:'remedy-pulsatilla', name:'Pulsatilla', type:'remedy', parent:'plant-remedies', slug:'pulsatilla', summary:'A traditional materia medica entry associated with Pulsatilla species. Raw plant material may irritate skin and mucous membranes.', tags:['botany','safety'], related:['plant-remedies','remedy-aconitum-napellus'] },
  { id:'remedy-lycopodium', name:'Lycopodium clavatum', type:'remedy', parent:'plant-remedies', slug:'lycopodium', summary:'A traditional entry associated with clubmoss spores in homoeopathic materia medica.', tags:['botany','reference'], related:['plant-remedies','remedy-sulphur'] },
  { id:'remedy-apis-mellifica', name:'Apis mellifica', type:'remedy', parent:'animal-remedies', slug:'apis-mellifica', summary:'A traditional entry associated with honeybee material or venom. Bee stings can cause life-threatening allergic reactions; this entry is not emergency guidance.', tags:['animal source','allergy','safety'], related:['animal-remedies','remedy-lachesis'] },
  { id:'remedy-lachesis', name:'Lachesis', type:'remedy', parent:'animal-remedies', slug:'lachesis', summary:'A traditional entry associated with bushmaster snake venom. Venom is hazardous; traditional descriptions should not be interpreted as treatment advice.', tags:['animal source','venom','safety'], related:['animal-remedies','remedy-apis-mellifica'] },
  { id:'clinical-topics', name:'Clinical topic index', type:'category', parent:'', slug:'clinical-topics', summary:'An educational index of common health topics, their standard medical definitions, warning signs, and evidence-based care pathways.', tags:['clinical','health education'], related:['topic-acid-reflux','topic-asthma','topic-allergic-rhinitis','evidence-homeopathy'] },
  { id:'topic-acid-reflux', name:'Acid reflux & heartburn', type:'research', parent:'clinical-topics', slug:'acid-reflux', summary:'Acid reflux occurs when stomach contents flow back into the oesophagus. Persistent symptoms, difficulty swallowing, bleeding, or unexplained weight loss warrant medical assessment.', tags:['gastroenterology','symptoms'], related:['clinical-topics','topic-constipation','evidence-homeopathy'] },
  { id:'topic-constipation', name:'Constipation', type:'research', parent:'clinical-topics', slug:'constipation', summary:'Constipation commonly involves hard stools, straining, or fewer bowel movements than usual. Sudden severe pain, vomiting, blood in stool, or inability to pass gas needs urgent evaluation.', tags:['gastroenterology','symptoms'], related:['clinical-topics','topic-acid-reflux'] },
  { id:'topic-allergic-rhinitis', name:'Allergic rhinitis', type:'research', parent:'clinical-topics', slug:'allergic-rhinitis', summary:'Allergic rhinitis is inflammation of the nasal lining triggered by allergens. Standard care may include allergen reduction, saline, antihistamines, or nasal corticosteroids based on clinician advice.', tags:['allergy','respiratory'], related:['clinical-topics','topic-asthma','evidence-homeopathy'] },
  { id:'topic-asthma', name:'Asthma', type:'research', parent:'clinical-topics', slug:'asthma', summary:'Asthma is a chronic airway condition requiring an individualised medical action plan. Severe breathlessness, blue lips, or poor response to a reliever is an emergency.', tags:['respiratory','urgent care'], related:['clinical-topics','topic-allergic-rhinitis','evidence-homeopathy'] },
  { id:'topic-sinusitis', name:'Sinusitis', type:'research', parent:'clinical-topics', slug:'sinusitis', summary:'Sinusitis involves inflammation of the sinus lining, often following a viral upper respiratory infection. Severe symptoms, swelling around the eye, visual changes, or neurological signs need urgent care.', tags:['respiratory','ENT'], related:['clinical-topics','topic-allergic-rhinitis'] },
  { id:'topic-acne', name:'Acne', type:'research', parent:'clinical-topics', slug:'acne', summary:'Acne is a common inflammatory disorder of pilosebaceous units. Evidence-based options depend on severity and can include topical retinoids, benzoyl peroxide, or clinician-prescribed treatments.', tags:['dermatology','skin'], related:['clinical-topics','topic-eczema'] },
  { id:'topic-eczema', name:'Eczema & dermatitis', type:'research', parent:'clinical-topics', slug:'eczema', summary:'Eczema describes inflammatory skin conditions that often cause itch and dryness. Gentle skin care and appropriate moisturisers are common foundations; treatment depends on type and severity.', tags:['dermatology','skin'], related:['clinical-topics','topic-acne'] },
  { id:'topic-migraine', name:'Migraine', type:'research', parent:'clinical-topics', slug:'migraine', summary:'Migraine is a neurological disorder that can cause recurrent headache, nausea, and sensitivity to light or sound. Sudden maximal headache or new neurological symptoms require urgent assessment.', tags:['neurology','headache'], related:['clinical-topics','evidence-homeopathy'] },
  { id:'foundations', name:'Organon & principles', type:'category', parent:'', slug:'foundations', summary:'Historical and philosophical concepts associated with the development of homoeopathy, presented as history rather than established biomedical mechanism.', tags:['history','philosophy'], related:['principle-similia','principle-dilution','history-hahnemann','evidence-homeopathy'] },
  { id:'history-hahnemann', name:'Samuel Hahnemann & history', type:'principle', parent:'foundations', slug:'history-hahnemann', summary:'Samuel Hahnemann (1755–1843) developed the system later known as homeopathy in late eighteenth- and early nineteenth-century Europe.', tags:['history','biography'], related:['foundations','principle-similia'] },
  { id:'principle-similia', name:'“Like cures like”', type:'principle', parent:'foundations', slug:'like-cures-like', summary:'The principle of similars is a central historical doctrine of homoeopathy. It is a description of the system’s theory, not proof that the principle works clinically.', tags:['philosophy','history'], related:['foundations','principle-dilution','evidence-homeopathy'] },
  { id:'principle-dilution', name:'Dilution & potentisation', type:'principle', parent:'foundations', slug:'dilution-potentisation', summary:'Homoeopathic preparations are often made through serial dilution and shaking. At very high dilutions, a preparation may be unlikely to contain molecules of the starting material; the proposed mechanism is not established by mainstream chemistry or physics.', tags:['preparation','science'], related:['foundations','principle-similia','evidence-homeopathy'] },
  { id:'evidence-homeopathy', name:'Evidence & safety of homeopathy', type:'research', parent:'foundations', slug:'evidence-safety', summary:'Evidence reviews by public health agencies report little reliable evidence that homeopathy effectively treats specific conditions. Some products may contain active ingredients and cause adverse effects or interactions.', tags:['evidence','safety','critical appraisal'], related:['foundations','clinical-topics','principle-dilution'] },
];

const typeLabels: Record<NodeType, string> = {
  category: 'Collection', topic: 'Topic group', remedy: 'Materia medica', research: 'Clinical topic', principle: 'History & principles'
};
const parentNames = new Map(researchNodes.map(node => [node.id, node.name]));

export default function ResearchMindMap() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selected, setSelected] = useState<ResearchNode | null>(null);
  const [expanded, setExpanded] = useState<string[]>(['materia-medica','clinical-topics','foundations']);
  const [copied, setCopied] = useState(false);

  const filtered = useMemo(() => researchNodes.filter(node => {
    const text = [node.name, node.summary, ...node.tags].join(' ').toLowerCase();
    return text.includes(query.toLowerCase()) && (typeFilter === 'all' || node.type === typeFilter);
  }), [query, typeFilter]);

  const childMap = useMemo(() => {
    const map = new Map<string, ResearchNode[]>();
    researchNodes.forEach(node => {
      if (!node.parent) return;
      map.set(node.parent, [...(map.get(node.parent) || []), node]);
    });
    return map;
  }, []);

  const visibleRoots = researchNodes.filter(node => !node.parent && (query || typeFilter !== 'all' || filtered.some(item => item.id === node.id) || (childMap.get(node.id) || []).length));
  const matches = new Set(filtered.map(node => node.id));
  const hasMatchingDescendant = (node: ResearchNode): boolean =>
    (childMap.get(node.id) || []).some(child => matches.has(child.id) || hasMatchingDescendant(child));
  const visibleNodes = query || typeFilter !== 'all' ? filtered : researchNodes;

  const openEntry = (node: ResearchNode) => navigate('/research-entry/' + node.slug);
  const toggleExpanded = (id: string) => setExpanded(current => current.includes(id) ? current.filter(x => x !== id) : [...current, id]);

  const shareNode = async (node: ResearchNode) => {
    const url = window.location.origin + '/research-entry/' + node.slug;
    try {
      if (navigator.share) await navigator.share({ title: node.name, text: node.summary, url });
      else if (navigator.clipboard?.writeText) { await navigator.clipboard.writeText(url); setCopied(true); window.setTimeout(() => setCopied(false), 1800); }
      else { window.prompt('Copy this link', url); }
    } catch (error) {
      if (error instanceof Error && error.name !== 'AbortError') window.prompt('Copy this link', url);
    }
  };

  const downloadIndex = () => {
    const header = ['id','name','type','parent','slug','summary','tags','related'];
    const rows = visibleNodes.map(node => [node.id,node.name,node.type,node.parent,node.slug,node.summary,node.tags.join('; '),node.related.join('; ')]);
    const csv = [header, ...rows].map(row => row.map(value => '"' + String(value).replace(/"/g,'""') + '"').join(',')).join('\n');
    const blob = new Blob([csv], { type:'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url; anchor.download = 'curiva-research-index.csv'; anchor.click();
    URL.revokeObjectURL(url);
  };

  const renderNode = (node: ResearchNode, depth = 0): React.ReactNode => {
    const children = childMap.get(node.id) || [];
    const isExpanded = expanded.includes(node.id) || Boolean(query) || typeFilter !== 'all';
    const shouldShow = !query && typeFilter === 'all' ? true : matches.has(node.id) || hasMatchingDescendant(node);
    if (!shouldShow) return null;
    return (
      <React.Fragment key={node.id}>
        <div className={`group flex items-center gap-2 border-b border-border/70 px-3 py-3 transition hover:bg-primary/[0.04] sm:px-4 ${selected?.id === node.id ? 'bg-primary/[0.07]' : ''}`} style={{ paddingLeft: `calc(0.75rem + ${Math.min(depth,5) * 1.1}rem)` }}>
          {children.length ? <button aria-label={isExpanded ? 'Collapse ' + node.name : 'Expand ' + node.name} onClick={() => toggleExpanded(node.id)} className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg hover:bg-primary/10"><ChevronDown className={`h-4 w-4 transition-transform ${isExpanded ? '' : '-rotate-90'}`} /></button> : <span className="w-8 shrink-0" />}
          <button onClick={() => setSelected(node)} className="min-w-0 flex-1 text-left">
            <span className="block truncate text-sm font-bold text-text-primary group-hover:text-primary">{node.name}</span>
            <span className="mt-0.5 block text-[10px] uppercase tracking-wider text-text-secondary">{typeLabels[node.type]}</span>
          </button>
          <button aria-label={'Open ' + node.name} onClick={() => openEntry(node)} title="Open full entry" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-border bg-bg-primary text-text-secondary transition hover:border-primary/40 hover:text-primary"><ArrowRight className="h-4 w-4" /></button>
        </div>
        {children.length > 0 && isExpanded && children.map(child => renderNode(child, depth + 1))}
      </React.Fragment>
    );
  };

  return (
    <section className="mx-auto w-full max-w-7xl px-3 py-8 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-[1.75rem] border border-border bg-bg-primary shadow-2xl shadow-black/5">
        <header className="border-b border-border bg-bg-secondary p-5 sm:p-7">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex items-start gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary"><GitBranch className="h-6 w-6" /></div>
              <div><p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Curiva knowledge graph</p><h2 className="mt-1 text-2xl font-display font-semibold text-text-primary">Interactive research database</h2><p className="mt-1 text-sm text-text-secondary">{researchNodes.length} mapped entries · searchable and cross-linked</p></div>
            </div>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => setExpanded(researchNodes.filter(n => childMap.has(n.id)).map(n => n.id))} className="inline-flex items-center gap-2 rounded-xl border border-border bg-bg-primary px-3 py-2 text-xs font-bold hover:border-primary/40"><ZoomIn className="h-4 w-4" /> Expand all</button>
              <button onClick={() => setExpanded([])} className="inline-flex items-center gap-2 rounded-xl border border-border bg-bg-primary px-3 py-2 text-xs font-bold hover:border-primary/40"><ZoomOut className="h-4 w-4" /> Collapse all</button>
              <button onClick={downloadIndex} className="inline-flex items-center gap-2 rounded-xl bg-primary px-3 py-2 text-xs font-bold text-white hover:opacity-90"><ArrowDownToLine className="h-4 w-4" /> Export CSV</button>
            </div>
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-[1fr_230px]">
            <label className="relative block"><Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary" /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search names, summaries, or tags…" className="w-full rounded-xl border border-border bg-bg-primary py-3 pl-11 pr-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15" /></label>
            <label className="relative block"><Filter className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary" /><select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} className="w-full appearance-none rounded-xl border border-border bg-bg-primary py-3 pl-10 pr-9 text-sm outline-none focus:border-primary"><option value="all">All entry types</option><option value="category">Collections</option><option value="topic">Topic groups</option><option value="remedy">Materia medica</option><option value="research">Clinical topics</option><option value="principle">History & principles</option></select><ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary" /></label>
          </div>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-text-secondary"><span>{filtered.length} matching entries</span><button onClick={() => {setQuery('');setTypeFilter('all');setSelected(null);setExpanded(['materia-medica','clinical-topics','foundations']);}} className="inline-flex items-center gap-1 font-semibold hover:text-primary"><RotateCcw className="h-3 w-3" /> Reset filters</button></div>
        </header>

        <div className="grid min-h-[620px] lg:grid-cols-[minmax(0,1fr)_minmax(300px,0.75fr)]">
          <div className="min-w-0 border-b border-border lg:border-b-0 lg:border-r">
            <div className="flex items-center justify-between border-b border-border px-4 py-3"><h3 className="text-xs font-black uppercase tracking-widest text-text-secondary">Node map</h3><span className="text-[10px] text-text-secondary">Select a node for details</span></div>
            <div className="max-h-[740px] overflow-auto">
              {query || typeFilter !== 'all' ? visibleRoots.map(root => renderNode(root)) : researchNodes.filter(node => !node.parent).map(root => renderNode(root))}
              {filtered.length === 0 && <div className="p-10 text-center text-sm text-text-secondary">No entries match this search. Try another keyword or reset filters.</div>}
            </div>
          </div>
          <aside className="flex min-w-0 flex-col bg-bg-secondary/50">
            {selected ? <>
              <div className="flex items-center justify-between border-b border-border p-5"><span className="rounded-full bg-primary/10 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-primary">{typeLabels[selected.type]}</span><button aria-label="Close node details" onClick={() => setSelected(null)} className="rounded-lg p-2 hover:bg-primary/10"><X className="h-4 w-4" /></button></div>
              <div className="flex-1 p-5 sm:p-7">
                <h3 className="text-2xl font-display font-semibold text-text-primary">{selected.name}</h3>
                <p className="mt-1 text-xs text-text-secondary">Parent: {parentNames.get(selected.parent) || 'Repository root'}</p>
                <p className="mt-5 text-sm leading-7 text-text-secondary">{selected.summary}</p>
                <div className="mt-5 flex flex-wrap gap-2">{selected.tags.map(tag => <span key={tag} className="rounded-full border border-border bg-bg-primary px-2.5 py-1 text-[10px] font-semibold text-text-secondary">{tag}</span>)}</div>
                <div className="mt-7 space-y-2">
                  <button onClick={() => openEntry(selected)} className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-bold text-white transition hover:opacity-90"><BookOpen className="h-4 w-4" /> Open full entry <ArrowRight className="h-4 w-4" /></button>
                  <button onClick={() => shareNode(selected)} className="flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-bg-primary px-4 py-3 text-sm font-bold text-text-primary hover:border-primary/40"><Share2 className="h-4 w-4" /> {copied ? 'Link copied' : 'Share / copy link'}</button>
                </div>
                <div className="mt-7 border-t border-border pt-5"><h4 className="text-[10px] font-black uppercase tracking-widest text-text-secondary">Related entries</h4><div className="mt-3 space-y-2">{selected.related.map(id => researchNodes.find(node => node.id === id)).filter((node): node is ResearchNode => Boolean(node)).map(node => <button key={node.id} onClick={() => setSelected(node)} className="flex w-full items-center gap-2 rounded-xl border border-border bg-bg-primary p-3 text-left text-sm font-semibold hover:border-primary/40 hover:text-primary"><ArrowRight className="h-4 w-4 shrink-0" />{node.name}</button>)}</div></div>
                <p className="mt-7 flex gap-2 rounded-xl bg-bg-primary p-3 text-xs leading-5 text-text-secondary"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />Educational reference only. This database does not diagnose conditions or recommend replacing evidence-based care.</p>
              </div>
            </> : <div className="flex flex-1 flex-col items-center justify-center p-8 text-center"><div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary"><Sparkles className="h-7 w-7" /></div><h3 className="mt-5 text-xl font-display font-semibold text-text-primary">Choose any node</h3><p className="mt-2 max-w-sm text-sm leading-6 text-text-secondary">Open a node to see its summary, parent collection, related topics, and a direct link to its complete reference page.</p><div className="mt-5 flex items-center gap-2 text-xs text-text-secondary"><Clipboard className="h-4 w-4" /> Every listed node has a mapped entry</div></div>}
          </aside>
        </div>
        <footer className="flex flex-col gap-2 border-t border-border bg-bg-secondary px-5 py-4 text-xs text-text-secondary sm:flex-row sm:items-center sm:justify-between"><span className="inline-flex items-center gap-2"><Check className="h-4 w-4 text-emerald-600" /> Search, filters, expansion, related links, share, and CSV export</span><span>Content is educational; clinical evidence is discussed separately.</span></footer>
      </div>
    </section>
  );
}
