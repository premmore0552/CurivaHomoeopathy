import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { useTheme } from './ThemeContext';

interface Node extends d3.SimulationNodeDatum {
  id: string;
  name: string;
  group: number;
  radius: number;
  color?: string;
  description?: string;
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

export default function InteractiveMindMap({ data, height = 500 }: InteractiveMindMapProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const nodes: Node[] = data.nodes.map(d => ({ 
      ...d, 
      radius: d.group === 0 ? 45 : d.group === 1 ? 30 : 20 
    }));
    
    const links: Link[] = data.links.map(d => ({ ...d }));

    const simulation = d3.forceSimulation<Node>(nodes)
      .force('link', d3.forceLink<Node, Link>(links).id(d => d.id).distance(120))
      .force('charge', d3.forceManyBody().strength(-400))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collide', d3.forceCollide().radius(d => (d as Node).radius + 15));

    const g = svg.append('g');

    // Add zoom behavior
    svg.call(d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.5, 3])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      }));

    const link = g.append('g')
      .attr('stroke', theme === 'dark' ? '#5c0d3a' : '#f2c9d6')
      .attr('stroke-opacity', 0.6)
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke-width', d => Math.sqrt(d.value) * 1.5);

    const node = g.append('g')
      .selectAll('g')
      .data(nodes)
      .join('g')
      .call(d3.drag<SVGGElement, Node>()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended) as any);

    const colors = {
      0: '#ba1173', // Main
      1: theme === 'dark' ? '#bd1576' : '#724e5b', // Branches
      2: theme === 'dark' ? '#5c0d3a' : '#f8dbe6', // Sub-branches
    };

    node.append('circle')
      .attr('r', d => d.radius)
      .attr('fill', d => (colors as any)[d.group] || colors[2])
      .attr('stroke', theme === 'dark' ? '#1a0410' : '#fff')
      .attr('stroke-width', 2)
      .attr('filter', 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))');

    node.append('text')
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'middle')
      .attr('dy', d => d.radius + 15)
      .attr('fill', theme === 'dark' ? '#fcf4f6' : '#2d0a1b')
      .attr('font-size', d => d.group === 0 ? '14px' : '11px')
      .attr('font-weight', d => d.group === 0 ? '800' : '600')
      .attr('class', 'font-display uppercase tracking-widest pointer-events-none')
      .text(d => d.name);

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
      
      // Haptic feedback
      if ('vibrate' in navigator) navigator.vibrate(5);
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
  }, [data, theme, height]);

  return (
    <div 
      ref={containerRef} 
      className="w-full bg-bg-secondary/30 rounded-[3rem] border border-border overflow-hidden relative group cursor-grab active:cursor-grabbing"
      style={{ height }}
    >
      <div className="absolute top-6 left-8 z-10 pointer-events-none">
        <h4 className="text-xs font-black text-primary uppercase tracking-[0.3em]">Draggable Research Map</h4>
        <p className="text-[10px] text-text-secondary uppercase tracking-widest font-medium opacity-60">Interactive clinical correlations</p>
      </div>
      
      <div className="absolute bottom-6 right-8 z-10 flex gap-2">
        <div className="px-3 py-1 bg-bg-primary/80 backdrop-blur-sm border border-border rounded-full text-[9px] font-bold text-text-secondary uppercase tracking-widest">
          Scroll to Zoom
        </div>
        <div className="px-3 py-1 bg-bg-primary/80 backdrop-blur-sm border border-border rounded-full text-[9px] font-bold text-text-secondary uppercase tracking-widest">
          Drag nodes
        </div>
      </div>

      <svg 
        ref={svgRef} 
        width="100%" 
        height={height}
        className="w-full h-full"
      />
    </div>
  );
}
