import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as d3 from 'd3';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ZoomIn, ZoomOut, Maximize, Search, Filter, 
  ChevronRight, ChevronDown, BookOpen, Share2, 
  Download, Info, X, Wind, Brain, Shield, 
  HeartPulse, Heart, Activity, ArrowRight, Home, History
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import * as Icons from 'lucide-react';

interface MindMapNode {
  id: string;
  name: string;
  type: 'root' | 'category' | 'topic' | 'remedy' | 'lifestyle' | 'research';
  summary?: string;
  articleId?: string;
  iconName?: keyof typeof Icons;
  children?: MindMapNode[];
  color?: string;
}

const data: MindMapNode = {
  id: "root",
  name: "Curiva Research",
  type: "root",
  color: "#ba1173",
  children: [
    {
      id: "materia-medica-root",
      name: "Materia Medica A-Z",
      type: "category",
      iconName: "BookOpen",
      color: "#10b981",
      children: [
        {
          id: "mineral-remedies",
          name: "Minerals & Salts",
          type: "topic",
          summary: "Elemental remedies, acids, and tissue salts with deep chronic and constitutional action.",
          children: [
            { id: "arsenicum-album", name: "Arsenicum Alb", type: "remedy", articleId: "/remedy/arsenicum-album", summary: "Arsenious acid. Marked by intense anxiety, restlessness, burning pains relieved by heat, and drinking in small sips." },
            { id: "calc-carb", name: "Calcarea Carb", type: "remedy", articleId: "/remedy/calc-carb", summary: "Calcium carbonate. Suits fair, flabby, cold damp constitution. Sour sweat on head, cold damp feet." },
            { id: "nat-mur", name: "Natrum Mur", type: "remedy", articleId: "/remedy/nat-mur", summary: "Sodium chloride. Solitary grief, mapping-type headache, dry cracked lips, worse under direct sun." },
            { id: "sulphur", name: "Sulphur", type: "remedy", articleId: "/remedy/sulphur", summary: "Elemental sulphur. Ragged philosopher, burning soles, skin eruptions worse from washing, dislikes bathing." },
            { id: "silicea", name: "Silicea", type: "remedy", articleId: "/remedy/silicea", summary: "Silica. Cold, sweaty feet with offensive odor, lack of grit or self-confidence, slow healing." },
            { id: "phosphorus", name: "Phosphorus", type: "remedy", articleId: "/remedy/phosphorus", summary: "Elemental phosphorus. Tall, slender active individuals. Bleeding tendency, craves cold drinks and ice creams." }
          ]
        },
        {
          id: "botanical-remedies",
          name: "Plant Kingdom",
          type: "topic",
          summary: "Remedies derived from wild plants, creepers, and trees with rapid energetic responses.",
          children: [
            { id: "aconite", name: "Aconite", type: "remedy", articleId: "/remedy/aconite", summary: "Monkshood. Sudden violent fevers and acute panics from cold dry winds. Great fear of death." },
            { id: "arnica", name: "Arnica", type: "remedy", articleId: "/remedy/arnica", summary: "Leopards bane. Premiere medicine for blunt trauma, soreness, muscle bruising, and mechanical strain." },
            { id: "belladonna", name: "Belladonna", type: "remedy", articleId: "/remedy/belladonna", summary: "Deadly nightshade. Flashing heat, congestive throbbing pain, sudden onset, bright red face, dilated pupils." },
            { id: "bryonia", name: "Bryonia", type: "remedy", articleId: "/remedy/bryonia", summary: "Wild hops. Worse for slightest touch or motion. Extreme dryness of mucous membranes, thirst for large quantities." },
            { id: "pulsatilla", name: "Pulsatilla", type: "remedy", articleId: "/remedy/pulsatilla", summary: "Windflower. Mild, yielding temperament. Changeable complaints, seeks cool open air, thirstless." },
            { id: "gelsemium", name: "Gelsemium", type: "remedy", articleId: "/remedy/gelsemium", summary: "Yellow jasmine. Motor paralysis, dullness, dizziness, heaviness of eyelids, thirstless." },
            { id: "lycopodium", name: "Lycopodium", type: "remedy", articleId: "/remedy/lycopodium", summary: "Club moss. Deep flatulence, right-sided symptoms that travel to left, craves warm sweets, feels insecure." }
          ]
        },
        {
          id: "animal-remedies",
          name: "Animal Poisons",
          type: "topic",
          summary: "Energetic, reactive animal kingdoms materials representing high physiological speed and sensitivity.",
          children: [
            { id: "apis", name: "Apis Mel", type: "remedy", articleId: "/remedy/apis", summary: "Honeybee venom. Stinging, burning pain, baggy edema around eyelids, extremely sensitive to heat." },
            { id: "lachesis", name: "Lachesis", type: "remedy", articleId: "/remedy/lachesis", summary: "Surukuku snake venom. Marked left-sided congestion, extreme talkativeness, intolerance to collars." }
          ]
        }
      ]
    },
    {
      id: "clinical-materia-medica-root",
      name: "Clinical Therapeutics",
      type: "category",
      iconName: "Activity",
      color: "#0ea5e9",
      children: [
        {
          id: "clinical-gastro",
          name: "Digestive Systems",
          type: "topic",
          summary: "Gastrointestinal clinical disorders mapped to targeted therapeutics.",
          children: [
            { id: "acidity-clinical", name: "Acidity & Heartburn", type: "research", articleId: "/read/acidity-relief", summary: "Management of burning, reflux, and bloating with Nux Vomica, Lycopodium, and Carbo Veg." },
            { id: "constipation-clinical", name: "Bowel Inertia", type: "research", articleId: "/read/constipation-remedies", summary: "Resolving chronic dry, hard stools using Bryonia, Alumina, and Opium." }
          ]
        },
        {
          id: "clinical-respiratory",
          name: "Respiratory Tracts",
          type: "topic",
          summary: "Pulmonary pathologies and allergy states of nose, ears, and airways.",
          children: [
            { id: "allergy-clinical", name: "Allergic Rhinitis", type: "research", articleId: "/read/allergic-rhinitis", summary: "Controlling excoriating coryza, sneezing, and watery eyes with Allium Cepa and Sabadilla." },
            { id: "asthma-clinical", name: "Spasmodic Asthma", type: "research", articleId: "/read/asthma-relief", summary: "Guiding acute asthmatic dyspnea and wheezing with Ipecac, Arsenicum, and Lobelia." },
            { id: "sinusitis-clinical", name: "Acute Sinusitis", type: "research", articleId: "/read/sinusitis-remedies", summary: "Alleviating frontal congestion with Kali Bichromicum and Silicea." }
          ]
        },
        {
          id: "clinical-integumentary",
          name: "Dermatological Care",
          type: "topic",
          summary: "Management of chronic eczema, acne, psoriasis, and deep tissue lesions.",
          children: [
            { id: "acne-clinical", name: "Acne Vulgaris", type: "research", articleId: "/read/acne-healing", summary: "Treating inflammatory pustules and scars with Berberis Aquifolium, Pulsatilla, and Sulfur." },
            { id: "eczema-clinical", name: "Eczema & Dermatitis", type: "research", articleId: "/read/eczema-treatment", summary: "Calming dry, cracked skin eruptions and itching with Graphites, Mezereum, and Petroleum." },
            { id: "hair-loss-clinical", name: "Hairfall & Thinning", type: "research", articleId: "/read/hair-loss-homeopathy", summary: "Restoring hair follicle vitality and treating alopecia areata with Fluoric Acid, Phosphorus, and Lycopodium." }
          ]
        },
        {
          id: "clinical-neuro",
          name: "Nervous Headache",
          type: "topic",
          summary: "Differential clinical guides for migraine, tension cephalalgia, and neuralgia.",
          children: [
            { id: "migraine-clinical", name: "Migraine Protocol", type: "research", articleId: "/read/migraine-remedies", summary: "Classifying congestive, nerved, and occipital throbbing headache with Belladonna and Iris." }
          ]
        }
      ]
    },
    {
      id: "organon-philosophy",
      name: "Organon & Principles",
      type: "category",
      iconName: "GraduationCap",
      color: "#f59e0b",
      children: [
        {
          id: "hahnemannian-principles",
          name: "Classical Philosophy",
          type: "topic",
          summary: " bedrock therapeutic dogmas established by Dr. Samuel Hahnemann.",
          children: [
            { id: "samuel-hahnemann", name: "Founder's Philosophy", type: "research", articleId: "/glossary/philosophy", summary: "Similia Similibus Curentur. Exploring dynamic drug proving and pure healing mechanisms." },
            { id: "aphorisms-vital", name: "Vital Force (Aphorisms 9-16)", type: "research", articleId: "/glossary/philosophy", summary: "Understanding the spirit-like force that animates the healthy organism." }
          ]
        }
      ]
    }
  ]
};

const NODE_RADIUS = 40;
const NODE_DISTANCE = 180;

// Mobile Tree View Component
const MobileTree = ({ 
  node, 
  depth = 0,
  setSelectedNode
}: { 
  node: MindMapNode; 
  depth?: number;
  setSelectedNode: (node: MindMapNode) => void;
}) => {
  const [isExpanded, setIsExpanded] = useState(depth < 1);
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className="w-full">
      <div 
        className={`flex items-center gap-3 p-4 border-b border-border hover:bg-primary/5 transition-colors ${depth === 0 ? 'bg-bg-secondary' : ''}`}
        onClick={() => {
          if (hasChildren) setIsExpanded(!isExpanded);
          else setSelectedNode(node);
        }}
      >
        <div className="flex-1 flex items-center gap-2">
          <div style={{ marginLeft: `${depth * 20}px` }} className="flex items-center gap-3">
            {hasChildren ? (
              isExpanded ? <ChevronDown className="w-4 h-4 text-primary" /> : <ChevronRight className="w-4 h-4 text-text-secondary" />
            ) : (
              <div className="w-4 h-4 rounded-full border-2 border-primary/30 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-primary rounded-full" />
              </div>
            )}
            <span className={`font-bold ${node.type === 'root' || node.type === 'category' ? 'text-primary uppercase tracking-widest text-xs' : 'text-text-primary text-sm'}`}>
              {node.name}
            </span>
          </div>
        </div>
        {node.type === 'remedy' && (
          <div className="px-2 py-0.5 bg-primary/10 text-primary text-[8px] font-black uppercase rounded tracking-tighter">
            Remedy
          </div>
        )}
      </div>
      {hasChildren && isExpanded && (
        <div className="w-full overflow-hidden">
          {node.children?.map(child => (
            <MobileTree 
              key={child.id} 
              node={child} 
              depth={depth + 1} 
              setSelectedNode={setSelectedNode}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default function ResearchMindMap() {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedNode, setSelectedNode] = useState<MindMapNode | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [filterType, setFilterType] = useState<string>("all");
  const [loading, setLoading] = useState(true);
  const [layoutMode, setLayoutMode] = useState<'tree' | 'radial'>('tree');
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Desktop View Rendering (D3)
  const filteredData = useMemo(() => {
    if (!searchTerm && filterType === 'all') return data;
    
    const filterNode = (node: MindMapNode): MindMapNode | null => {
      const matchesSearch = node.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === 'all' || node.type === filterType || (filterType === 'symptom' && (node.type === 'topic' || node.type === 'category'));
      
      const filteredChildren = node.children 
        ? node.children.map(filterNode).filter((n): n is MindMapNode => n !== null) 
        : [];
        
      if (matchesSearch || (filterType === 'all' ? filteredChildren.length > 0 : filteredChildren.length > 0)) {
        return { ...node, children: filteredChildren.length > 0 ? filteredChildren : undefined };
      }
      return null;
    };
    
    return filterNode(data) || data;
  }, [searchTerm, filterType]);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = 600;

    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [-width / 2, -height / 2, width, height]);

    svg.selectAll("*").remove();

    const g = svg.append("g");

    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.5, 3])
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
        setZoomLevel(event.transform.k);
      });

    svg.call(zoom);

    const root = d3.hierarchy(filteredData);
    
    if (layoutMode === 'tree') {
      const treeLayout = d3.tree<MindMapNode>().nodeSize([120, NODE_DISTANCE]);
      treeLayout(root);

      // Links
      g.selectAll(".link")
        .data(root.links())
        .enter()
        .append("path")
        .attr("class", "link")
        .attr("d", d3.linkHorizontal<any, any>()
          .x(d => d.y)
          .y(d => d.x))
        .attr("fill", "none")
        .attr("stroke", "#e2e8f0")
        .attr("stroke-width", 2)
        .attr("stroke-dasharray", d => (d.target.data.type === 'lifestyle' || d.target.data.type === 'research') ? "4,4" : "none");

      // Nodes
      const node = g.selectAll(".node")
        .data(root.descendants())
        .enter()
        .append("g")
        .attr("class", "node")
        .attr("transform", d => `translate(${d.y},${d.x})`)
        .on("click", (event, d) => {
          event.stopPropagation();
          setSelectedNode(d.data);
        })
        .attr("cursor", "pointer");

      // Node Background
      node.append("circle")
        .attr("r", d => d.data.type === 'root' ? 45 : 35)
        .attr("fill", d => d.data.color || "#fff")
        .attr("stroke", d => d.data.color || "#cbd5e1")
        .attr("stroke-width", 2);

      // Node Labels
      node.append("text")
        .attr("dy", d => d.children ? "-2.5em" : "2.5em")
        .attr("text-anchor", "middle")
        .attr("class", "text-[10px] font-black uppercase tracking-widest fill-text-primary pointer-events-none")
        .text(d => d.data.name);

    } else {
      // Radial Cluster Layout
      const clusterLayout = d3.cluster<MindMapNode>().size([2 * Math.PI, Math.min(width, height) / 2 - 100]);
      clusterLayout(root);

      // Links
      g.selectAll(".link")
        .data(root.links())
        .enter()
        .append("path")
        .attr("class", "link")
        .attr("d", d3.linkRadial<any, any>()
          .angle(d => d.x)
          .radius(d => d.y))
        .attr("fill", "none")
        .attr("stroke", "#e2e8f0")
        .attr("stroke-width", 2);

      // Nodes
      const node = g.selectAll(".node")
        .data(root.descendants())
        .enter()
        .append("g")
        .attr("class", "node")
        .attr("transform", d => `
          rotate(${d.x * 180 / Math.PI - 90})
          translate(${d.y},0)
        `)
        .on("click", (event, d) => {
          event.stopPropagation();
          setSelectedNode(d.data);
        })
        .attr("cursor", "pointer");

      node.append("circle")
        .attr("r", 30)
        .attr("fill", d => d.data.color || "#fff")
        .attr("stroke", d => d.data.color || "#cbd5e1")
        .attr("stroke-width", 2);

      node.append("text")
        .attr("dy", "0.31em")
        .attr("x", d => d.x < Math.PI ? 40 : -40)
        .attr("text-anchor", d => d.x < Math.PI ? "start" : "end")
        .attr("transform", d => d.x >= Math.PI ? "rotate(180)" : null)
        .attr("class", "text-[9px] font-black uppercase tracking-widest fill-text-primary pointer-events-none")
        .text(d => d.data.name);
    }

    // Initial Zoom
    svg.transition().duration(750).call(
      zoom.transform,
      d3.zoomIdentity.scale(0.8)
    );

  }, [searchTerm, filterType]);

  const handleZoom = (direction: 'in' | 'out' | 'reset') => {
    const svg = d3.select(svgRef.current);
    if (direction === 'reset') {
      svg.transition().duration(500).call(d3.zoom<any, any>().transform, d3.zoomIdentity.scale(0.8));
    } else {
      svg.transition().duration(500).call(d3.zoom<any, any>().scaleBy, direction === 'in' ? 1.5 : 0.6);
    }
  };

  // Mobile Tree is now defined at the top level outside this component.

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="relative bg-bg-secondary rounded-[3rem] border border-border shadow-2xl overflow-hidden min-h-[700px] flex flex-col">
        {loading && (
          <div className="absolute inset-0 z-[100] bg-bg-secondary flex flex-col items-center justify-center gap-4">
             <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
             <div className="text-[10px] font-black text-primary uppercase tracking-[0.2em] animate-pulse">Initializing Research Network...</div>
          </div>
        )}
        
        {/* Header Controls */}
        <div className="p-6 border-b border-border flex flex-wrap items-center justify-between gap-6 z-20 bg-bg-secondary/80 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-2xl">
              <Activity className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-display font-black text-text-primary uppercase tracking-widest">Interactive Database</h2>
              <div className="flex items-center gap-2 text-[10px] font-bold text-text-secondary uppercase tracking-widest opacity-60">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                D3 Network Mapping v2.0
              </div>
            </div>
          </div>

          <div className="flex flex-1 max-w-md relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
            <input 
              type="text" 
              placeholder="Search topics, remedies, or systems..."
              className="w-full pl-12 pr-4 py-3 bg-bg-primary border border-border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-[10px] placeholder:uppercase placeholder:font-bold placeholder:tracking-widest"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => setLayoutMode(prev => prev === 'tree' ? 'radial' : 'tree')} 
              className={`p-3 border border-border rounded-xl transition-all shadow-sm flex items-center gap-2 group ${layoutMode === 'radial' ? 'bg-primary text-white' : 'bg-bg-primary text-text-primary hover:text-primary'}`}
            >
              <Icons.Layout className="w-5 h-5" />
              <span className="text-[10px] font-black uppercase tracking-widest hidden sm:block">{layoutMode === 'tree' ? 'Radial View' : 'Tree View'}</span>
            </button>
            <button onClick={() => handleZoom('in')} className="p-3 bg-bg-primary border border-border rounded-xl hover:text-primary transition-colors shadow-sm"><ZoomIn className="w-5 h-5" /></button>
            <button onClick={() => handleZoom('out')} className="p-3 bg-bg-primary border border-border rounded-xl hover:text-primary transition-colors shadow-sm"><ZoomOut className="w-5 h-5" /></button>
            <button onClick={() => handleZoom('reset')} className="p-3 bg-bg-primary border border-border rounded-xl hover:text-primary transition-colors shadow-sm"><Maximize className="w-5 h-5" /></button>
          </div>
        </div>

        {/* Viewport */}
        <div className="flex-1 relative overflow-hidden" ref={containerRef}>
          {/* Desktop Visualizer */}
          <div className="hidden lg:block w-full h-full">
            <svg ref={svgRef} className="w-full h-full selection:bg-transparent" />
          </div>

          {/* Mobile Tree View */}
          <div className="lg:hidden w-full h-full overflow-y-auto bg-bg-primary">
            <MobileTree node={data} setSelectedNode={setSelectedNode} />
          </div>

          {/* Legend */}
          <div className="absolute bottom-6 left-6 z-20 flex flex-col gap-2 pointer-events-none">
            {[
              { label: 'Remedy', color: 'bg-primary' },
              { label: 'Topic', color: 'bg-text-primary opacity-40' },
              { label: 'Lifestyle', color: 'bg-emerald-500 border-dashed border-2' }
            ].map(item => (
              <div key={item.label} className="flex items-center gap-2 px-3 py-1 bg-white/80 dark:bg-zinc-900/80 backdrop-blur shadow-sm border border-border rounded-lg text-[9px] font-black uppercase tracking-widest">
                <div className={`w-2 h-2 rounded-full ${item.color}`} />
                {item.label}
              </div>
            ))}
          </div>

          {/* Disclosures */}
          <div className="absolute top-6 right-6 z-20 max-w-[200px] text-right pointer-events-none">
             <div className="text-[8px] font-black uppercase text-text-secondary opacity-40 tracking-tighter leading-tight">
               Research Visualizer Node System<br/>
               Student Project Repository<br/>
               Educational Model v2.2.1
             </div>
          </div>
        </div>

        {/* Node Detail Sidebar / Modal */}
        <AnimatePresence>
          {selectedNode && (
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="absolute top-0 right-0 h-full w-full sm:w-96 bg-bg-secondary border-l border-border shadow-2xl z-50 flex flex-col"
            >
              <div className="p-6 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${selectedNode.type === 'remedy' ? 'bg-primary' : 'bg-text-secondary'}`} />
                  <span className="text-[10px] font-black uppercase tracking-widest text-text-secondary">Details</span>
                </div>
                <button onClick={() => setSelectedNode(null)} className="p-2 hover:bg-primary/10 rounded-xl transition-colors"><X className="w-5 h-5" /></button>
              </div>

              <div className="flex-1 p-8 overflow-y-auto flex flex-col items-center text-center">
                 <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                    <Icons.Activity className="w-10 h-10 text-primary" />
                 </div>
                 <h3 className="text-3xl font-display font-black text-text-primary mb-2 leading-tight">{selectedNode.name}</h3>
                 <div className="flex items-center gap-1 text-[8px] font-black text-text-secondary uppercase tracking-widest mb-4 opacity-60">
                    <span>Curiva</span>
                    <ChevronRight className="w-2 h-2" />
                    <span>Research</span>
                    <ChevronRight className="w-2 h-2" />
                    <span className="text-primary">{selectedNode.type}</span>
                 </div>
                 <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-bg-primary border border-border rounded-full text-[10px] font-bold text-primary uppercase tracking-widest mb-6">
                    {selectedNode.type} Information
                 </div>
                 <p className="text-text-secondary leading-relaxed mb-8">
                   {selectedNode.summary || "Explore clinical patterns, traditional uses, and academic research regarding this specific homeopathic entity."}
                 </p>

                 <div className="w-full space-y-3">
                   {selectedNode.articleId ? (
                     <button 
                        onClick={() => {
                          const id = selectedNode.articleId;
                          if (id) navigate(id);
                        }}
                        className="w-full py-4 bg-primary text-white font-black uppercase text-xs tracking-widest rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                      >
                       <BookOpen className="w-4 h-4" />
                       View Database Entry
                     </button>
                   ) : (
                     <div className="w-full py-4 bg-bg-primary text-text-secondary font-bold text-xs rounded-xl border border-border opacity-50 flex items-center justify-center italic">
                        Node mapping coming soon
                     </div>
                   )}
                   
                   <button className="w-full py-4 bg-bg-primary border border-border text-text-primary font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-border transition-colors flex items-center justify-center gap-3">
                      <Share2 className="w-4 h-4" />
                      Share Node Link
                   </button>
                 </div>

                 <div className="mt-auto pt-10 text-[9px] font-bold text-text-secondary italic uppercase tracking-widest border-t border-border/50 w-full">
                    Disclaimer: Strictly Educational Awareness
                 </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Accessibility Fallback / Text Index */}
      <div className="mt-20 p-10 bg-bg-secondary rounded-[2.5rem] border border-border shadow-sm">
        <div className="flex items-center gap-3 mb-8">
          <Info className="w-6 h-6 text-primary" />
          <h3 className="text-xl font-display font-black text-text-primary uppercase tracking-widest">Text-Based Database Index</h3>
        </div>
        <div className="grid md:grid-cols-3 gap-10">
          {data.children?.map(cat => (
            <div key={cat.id} className="space-y-4">
              <h4 className="text-xs font-black text-primary uppercase tracking-widest border-b border-primary/20 pb-2 flex items-center gap-2">
                {cat.iconName && React.createElement((Icons as any)[cat.iconName], { className: "w-3 h-3" })}
                {cat.name}
              </h4>
              <ul className="space-y-2">
                {cat.children?.map(topic => (
                  <li key={topic.id} className="group">
                    <button 
                      onClick={() => setSelectedNode(topic)}
                      className="text-sm font-bold text-text-secondary hover:text-primary transition-colors flex items-center gap-2"
                    >
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all -ml-5 group-hover:ml-0" />
                      {topic.name}
                    </button>
                    {topic.children && (
                      <ul className="ml-4 mt-2 space-y-1">
                        {topic.children.map(sub => (
                          <li key={sub.id}>
                            <button 
                              onClick={() => setSelectedNode(sub)}
                              className="text-[11px] font-medium text-text-secondary/70 hover:text-primary transition-colors italic"
                            >
                              - {sub.name}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
