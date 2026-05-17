import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { useTheme } from '../context/ThemeContext';
import { Maximize, Minimize, Settings2, Share2, ZoomIn, ZoomOut, Layout, Disc } from 'lucide-react';

interface Node extends d3.SimulationNodeDatum {
  id: string;
  name: string;
  group: number;
  radius: number;
  color?: string;
  description?: string;
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
}

interface Link extends d3.SimulationLinkDatum<Node> {
  source: string | Node;
  target: string | Node;
  value: number;
}

interface InteractiveMindMapProps {
  data: {
    nodes: { id: string; name: string; group: number; description?: string }[];
    links: { source: string; target: string; value: number }[];
  };
  height?: number;
}

export default function InteractiveMindMap({ data, height = 600 }: InteractiveMindMapProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const [zoomLevel, setZoomLevel] = useState(1);
  const [viewMode, setViewMode] = useState<'radial' | 'tree'>('radial');
  const zoomBehaviorRef = useRef<any>(null);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const nodes: Node[] = data.nodes.map(d => ({ 
      ...d, 
      radius: d.group === 0 ? 50 : d.group === 1 ? 35 : 25 
    }));
    
    const links: Link[] = data.links.map(d => ({ ...d }));

    const simulation = d3.forceSimulation<Node>(nodes);

    if (viewMode === 'radial') {
      simulation
        .force('link', d3.forceLink<Node, Link>(links).id(d => d.id).distance(150))
        .force('charge', d3.forceManyBody().strength(-600))
        .force('center', d3.forceCenter(width / 2, height / 2))
        .force('collide', d3.forceCollide().radius(d => (d as Node).radius + 20));
    } else {
      // Tree-like layout using forces
      simulation
        .force('link', d3.forceLink<Node, Link>(links).id(d => d.id).distance(100))
        .force('charge', d3.forceManyBody().strength(-300))
        .force('x', d3.forceX(width / 2).strength(0.1))
        .force('y', d3.forceY((d: any) => d.group * 150 + 100).strength(0.5))
        .force('collide', d3.forceCollide().radius(d => (d as Node).radius + 20));
    }

    const g = svg.append('g');

    // Add zoom behavior
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.1, 5])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
        setZoomLevel(event.transform.k);
      });

    svg.call(zoom);
    zoomBehaviorRef.current = zoom;

    const link = g.append('g')
      .attr('stroke', theme === 'dark' ? '#ba1173' : '#f2c9d6')
      .attr('stroke-opacity', 0.4)
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke-width', d => Math.sqrt(d.value) * 2);

    const node = g.append('g')
      .selectAll('g')
      .data(nodes)
      .join('g')
      .attr('class', 'cursor-pointer')
      .call(d3.drag<SVGGElement, Node>()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended) as any);

    const colors = {
      0: '#ba1173', // Main
      1: theme === 'dark' ? '#df1d8d' : '#8c2d5d', // Branches
      2: theme === 'dark' ? '#5c0d3a' : '#f8dbe6', // Sub-branches
    };

    // Glow effect
    const defs = svg.append('defs');
    const filter = defs.append('filter').attr('id', 'glow');
    filter.append('feGaussianBlur').attr('stdDeviation', '3').attr('result', 'blur');
    const feMerge = filter.append('feMerge');
    feMerge.append('feMergeNode').attr('in', 'blur');
    feMerge.append('feMergeNode').attr('in', 'SourceGraphic');

    node.append('circle')
      .attr('r', d => d.radius)
      .attr('fill', d => (colors as any)[d.group] || colors[2])
      .attr('stroke', theme === 'dark' ? '#fff' : '#ba1173')
      .attr('stroke-width', 2)
      .attr('class', 'transition-all duration-300 hover:opacity-80')
      .style('filter', d => d.group === 0 ? 'url(#glow)' : 'none');

    node.append('text')
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'middle')
      .attr('fill', d => d.group === 0 ? '#fff' : (theme === 'dark' ? '#fcf4f6' : '#2d0a1b'))
      .attr('font-size', d => d.group === 0 ? '12px' : '10px')
      .attr('font-weight', '800')
      .attr('class', 'font-display uppercase tracking-widest pointer-events-none select-none')
      .text(d => d.name)
      .attr('dy', '0.3em');

    simulation.on('tick', () => {
      link
        .attr('x1', d => (d.source as any).x)
        .attr('y1', d => (d.source as any).y)
        .attr('x2', d => (d.target as any).x)
        .attr('y2', d => (d.target as any).y);

      node
        .attr('transform', d => `translate(${d.x},${d.y})`);
    });

    function dragstarted(event: d3.D3DragEvent<SVGGElement, Node, Node>, d: Node) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event: d3.D3DragEvent<SVGGElement, Node, Node>, d: Node) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event: d3.D3DragEvent<SVGGElement, Node, Node>, d: Node) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    return () => {
      simulation.stop();
    };
  }, [data, theme, height, viewMode]);

  const handleZoom = (value: number) => {
    if (!svgRef.current || !zoomBehaviorRef.current) return;
    const svg = d3.select(svgRef.current);
    zoomBehaviorRef.current.scaleTo(svg, value);
  };

  const resetZoom = () => {
    if (!svgRef.current || !zoomBehaviorRef.current) return;
    const svg = d3.select(svgRef.current);
    zoomBehaviorRef.current.transform(svg, d3.zoomIdentity);
  };

  return (
    <div 
      className="w-full bg-bg-secondary/50 rounded-[4rem] border border-border overflow-hidden relative group/canvas shadow-2xl"
      style={{ height }}
    >
      {/* Top Header Labels */}
      <div className="absolute top-10 left-10 z-10 pointer-events-none">
        <h4 className="text-xl font-display font-black text-text-primary uppercase tracking-tighter italic leading-none">
          Organon <span className="text-primary tracking-widest text-xs ml-2 not-italic underline decoration-primary/30">Mind Map</span>
        </h4>
        <p className="text-[10px] text-text-tertiary uppercase tracking-[0.3em] font-black mt-3 opacity-60">
          {viewMode === 'radial' ? 'Force-Directed Radial View' : 'Hierarchical Tree View'}
        </p>
      </div>

      {/* Floating Controls Overlay */}
      <div className="absolute top-10 right-10 z-20 flex flex-col gap-3">
        {/* View Switcher */}
        <div className="p-1.5 bg-white dark:bg-zinc-900 border border-border rounded-2xl shadow-xl flex gap-1">
          <button 
            onClick={() => setViewMode('radial')}
            className={`p-2 rounded-xl transition-all ${viewMode === 'radial' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-text-tertiary hover:bg-bg-primary'}`}
            title="Radial View"
          >
            <Disc className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setViewMode('tree')}
            className={`p-2 rounded-xl transition-all ${viewMode === 'tree' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-text-tertiary hover:bg-bg-primary'}`}
            title="Tree View"
          >
            <Layout className="w-5 h-5" />
          </button>
        </div>

        {/* Zoom Controls */}
        <div className="p-2 bg-white dark:bg-zinc-900 border border-border rounded-2xl shadow-xl flex flex-col gap-2 items-center">
          <button 
            onClick={() => handleZoom(zoomLevel * 1.2)}
            className="p-2 text-text-secondary hover:text-primary transition-colors"
          >
            <ZoomIn className="w-5 h-5" />
          </button>
          
          <div className="h-32 w-1 relative group/slider">
            <input 
              type="range"
              min="0.1"
              max="5"
              step="0.1"
              value={zoomLevel}
              onChange={(e) => handleZoom(parseFloat(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              style={{ writingMode: 'vertical-lr' as any }}
            />
            <div className="absolute inset-0 bg-border rounded-full" />
            <div 
              className="absolute bottom-0 left-0 right-0 bg-primary rounded-full transition-all duration-300" 
              style={{ height: `${(zoomLevel / 5) * 100}%` }}
            />
            <div 
              className="absolute left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-2 border-primary rounded-full shadow-lg transition-all duration-300 pointer-events-none"
              style={{ bottom: `${(zoomLevel / 5) * 100}%` }}
            />
          </div>

          <button 
            onClick={() => handleZoom(zoomLevel / 1.2)}
            className="p-2 text-text-secondary hover:text-primary transition-colors"
          >
            <ZoomOut className="w-5 h-5" />
          </button>
          
          <div className="w-full h-px bg-border my-1" />
          
          <button 
            onClick={resetZoom}
            className="p-2 text-text-secondary hover:text-primary transition-colors"
            title="Reset View"
          >
            <Maximize className="w-4 h-4" />
          </button>
        </div>

        {/* Extra Actions */}
        <button className="p-3 bg-white dark:bg-zinc-900 border border-border rounded-2xl shadow-xl text-text-secondary hover:text-primary transition-all hover:scale-105">
          <Settings2 className="w-5 h-5" />
        </button>
      </div>

      {/* Bottom Status */}
      <div className="absolute bottom-10 left-10 z-10 flex gap-4">
        <div className="flex items-center gap-3 px-5 py-2.5 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-border rounded-2xl shadow-lg">
          <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          <span className="text-[10px] font-black text-text-primary uppercase tracking-widest">{Math.round(zoomLevel * 100)}% Magnification</span>
        </div>
        <div className="hidden md:flex items-center gap-3 px-5 py-2.5 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-border rounded-2xl shadow-lg">
           <Share2 className="w-3.5 h-3.5 text-text-tertiary" />
           <span className="text-[10px] font-black text-text-tertiary uppercase tracking-widest">Share Research</span>
        </div>
      </div>

      <svg 
        ref={svgRef} 
        width="100%" 
        height={height}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      />
    </div>
  );
}

