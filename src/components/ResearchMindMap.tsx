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
      id: "digestive",
      name: "Digestive Health",
      type: "category",
      iconName: "HeartPulse",
      color: "#ba1173",
      articleId: "/guide/better-digestion",
      children: [
        { 
          id: "acidity", 
          name: "Acidity & Heartburn", 
          type: "topic", 
          summary: "Substernal pain and burning associated with reflux of gastric juices.",
          articleId: "/conditions/acidity",
          children: [
            { id: "argentum-nitricum", name: "Argentum Nit", type: "remedy", articleId: "/read/argentum-nitricum-profile" },
            { id: "nux-vomica", name: "Nux Vomica", type: "remedy", articleId: "/read/nux-vomica" },
            { id: "phosphoric-acid", name: "Acidum Phos", type: "remedy", articleId: "/read/phosphoric-acid-profile" }
          ]
        },
        { 
          id: "flatulence", 
          name: "Bloating & Gas", 
          type: "topic",
          summary: "Excessive gas in the digestive tract leading to abdominal discomfort.",
          articleId: "/conditions/acidity",
          children: [
            { id: "lycopodium", name: "Lycopodium", type: "remedy", articleId: "/read/lycopodium" },
            { id: "carbo-vegetabilis", name: "Carbo Veg", type: "remedy", articleId: "/read/carbo-vegetabilis-profile" }
          ]
        }
      ]
    },
    {
      id: "respiratory",
      name: "Respiratory Care",
      type: "category",
      iconName: "Wind",
      color: "#bd1576",
      articleId: "/guide/asthma-relief",
      children: [
        { 
          id: "asthma", 
          name: "Asthma Patterns", 
          type: "topic",
          summary: "Narrowing of the windpipe causing obstruction of breathing.",
          articleId: "/conditions/asthma",
          children: [
            { id: "aspidosperma", name: "Aspidosperma", type: "remedy", articleId: "/read/aspidosperma-profile" },
            { id: "ipecac", name: "Ipecac", type: "remedy", articleId: "/read/ipecac-profile" },
            { id: "arsenicum-album", name: "Arsenicum Alb", type: "remedy", articleId: "/read/arsenicum-profile" }
          ]
        },
        { 
          id: "flu", 
          name: "Flu & Fevers", 
          type: "topic",
          summary: "Acute viral infection characterized by fever, chills, and muscular pain.",
          articleId: "/guide/immunity-wellness",
          children: [
            { id: "aconite", name: "Aconite", type: "remedy", articleId: "/read/aconite" },
            { id: "gelsemium", name: "Gelsemium", type: "remedy", articleId: "/read/gelsemium" },
            { id: "bryonia", name: "Bryonia", type: "remedy", articleId: "/read/bryonia" }
          ]
        }
      ]
    },
    {
      id: "clinical",
      name: "Clinical Ailments",
      type: "category",
      iconName: "Shield",
      color: "#ba1775",
      articleId: "/topics",
      children: [
        { 
          id: "acne", 
          name: "Acne (Pimples)", 
          type: "topic",
          summary: "Inflammatory condition of the sebaceous glands.",
          articleId: "/guide/skin-health",
          children: [
            { id: "antimonium-crudum", name: "Antimonium Cr", type: "remedy", articleId: "/read/antimonium-crudum-profile" },
            { id: "berberis-aquifolium", name: "Berberis Aq", type: "remedy", articleId: "/read/berberis-aquifolium-profile" }
          ]
        },
        { 
          id: "allergy", 
          name: "Allergy States", 
          type: "topic",
          summary: "Hypersensitive immune response to environmental triggers.",
          articleId: "/conditions/asthma",
          children: [
            { id: "allium-cepa", name: "Allium Cepa", type: "remedy", articleId: "/read/allium-cepa-profile" },
            { id: "apis-mellifica", name: "Apis Mel", type: "remedy", articleId: "/read/apis-mellifica-profile" }
          ]
        }
      ]
    },
    {
      id: "locomotor",
      name: "Bones & Joints",
      type: "category",
      iconName: "Activity",
      color: "#724e5b",
      articleId: "/guide/joint-pain-remedies",
      children: [
        { 
          id: "backache", 
          name: "Backache & Spine", 
          type: "topic",
          summary: "Pain in the posterior region of the torso from neck to pelvis.",
          articleId: "/guide/chronic-pain",
          children: [
            { id: "aconite", name: "Aconite", type: "remedy", articleId: "/read/aconite" },
            { id: "aesculus-hippocastanum", name: "Aesculus Hip", type: "remedy", articleId: "/read/aesculus-hippocastanum-profile" },
            { id: "rhus-toxicodendron", name: "Rhus Tox", type: "remedy", articleId: "/read/rhus-tox-profile" }
          ]
        },
        { 
          id: "fractures", 
          name: "Fracture Support", 
          type: "topic",
          summary: "Supportive care for bone healing after mechanical break.",
          articleId: "/guide/chronic-pain",
          children: [
            { id: "symphytum", name: "Symphytum", type: "remedy", articleId: "/read/symphytum-profile" },
            { id: "arnica", name: "Arnica", type: "remedy", articleId: "/read/arnica" }
          ]
        }
      ]
    },
    {
      id: "timeline",
      name: "Research Timeline",
      type: "category",
      iconName: "History",
      color: "#64748b",
      children: [
        { 
          id: "t1", 
          name: "Foundations (1796-1810)", 
          type: "research",
          summary: "Hahnemann publishes 'Organon of Medicine', establishing the Similia principle.",
          articleId: "/read/what-is-homeopathy"
        },
        { 
          id: "t2", 
          name: "Clinical Expansion", 
          type: "research",
          summary: "Kent and Hering expand the Materia Medica with rigorous provings.",
          articleId: "/read/how-it-works"
        },
        { 
          id: "t3", 
          name: "Modern Nanobiology", 
          type: "research",
          summary: "Recent studies exploring hormetic effects and nanoparticle clusters in high dilutions.",
          articleId: "/read/how-it-works"
        }
      ]
    }
  ]
};

const NODE_RADIUS = 40;
const NODE_DISTANCE = 180;

export default function ResearchMindMap() {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedNode, setSelectedNode] = useState<MindMapNode | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [filterType, setFilterType] = useState<string>("all");
  const [loading, setLoading] = useState(true);
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
      const matchesType = filterType === 'all' || node.type === filterType;
      
      const filteredChildren = node.children 
        ? node.children.map(filterNode).filter((n): n is MindMapNode => n !== null) 
        : [];
        
      if (matchesSearch || filteredChildren.length > 0) {
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
        if (d.data.articleId) {
          // Double click or explicit button? Let's show summary modal first
        }
      })
      .attr("cursor", "pointer");

    // Node Background
    node.append("circle")
      .attr("r", d => d.data.type === 'root' ? 45 : 35)
      .attr("fill", d => d.data.color || "#fff")
      .attr("stroke", d => d.data.color || "#cbd5e1")
      .attr("stroke-width", 2)
      .attr("class", "transition-all duration-300");

    // Node Icons
    node.each(function(d) {
      if (d.data.iconName) {
        const IconComponent = (Icons as any)[d.data.iconName];
        if (IconComponent) {
          // We can't directly append React component, so we'll use a foreignObject or just labels
          // For simplicity in D3, let's use labels and icons via text if needed, 
          // or just overlays in React.
          // Let's use labels for now.
        }
      }
    });

    // Node Labels
    node.append("text")
      .attr("dy", d => d.children ? "-2.5em" : "2.5em")
      .attr("text-anchor", "middle")
      .attr("class", "text-[10px] font-black uppercase tracking-widest fill-text-primary pointer-events-none")
      .text(d => d.data.name);

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

  // Mobile Tree View Component
  const MobileTree = ({ node, depth = 0 }: { node: MindMapNode, depth?: number }) => {
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
              <MobileTree key={child.id} node={child} depth={depth + 1} />
            ))}
          </div>
        )}
      </div>
    );
  };

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
            <MobileTree node={data} />
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
