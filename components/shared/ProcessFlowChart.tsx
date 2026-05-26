'use client';

import { useEffect, useRef } from 'react';

const flowNodes = [
  { id: 'audit',   label: 'Ops Audit',       sub: '45 min discovery', color: '#C4A25A' },
  { id: 'design',  label: 'Custom Design',    sub: 'Blueprint approval', color: '#4599B5' },
  { id: 'build',   label: 'Build & Test',     sub: '1-week live test', color: '#4599B5' },
  { id: 'maintain',label: 'Maintain',         sub: 'Monthly retainer', color: '#4599B5' },
];

export default function ProcessFlowChart() {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = '0';
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          el.style.transition = 'opacity 0.9s ease';
          el.style.opacity = '1';
          obs.disconnect();
        }
      });
    }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Layout: 4 nodes in a horizontal row, connected by arrows
  const nodeW = 130;
  const nodeH = 64;
  const gapX = 60;
  const totalW = flowNodes.length * nodeW + (flowNodes.length - 1) * gapX;
  const svgH = 120;
  const startX = 0;
  const nodeY = (svgH - nodeH) / 2;

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${totalW} ${svgH}`}
      width="100%"
      style={{ maxWidth: `${totalW}px`, display: 'block', overflow: 'visible' }}
      aria-label="4-step process flow"
    >
      <defs>
        <marker id="arrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
          <path d="M1,1 L7,4 L1,7 L3,4 Z" fill="rgba(196,162,90,0.5)" />
        </marker>
        <marker id="arrowBlue" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
          <path d="M1,1 L7,4 L1,7 L3,4 Z" fill="rgba(69,153,181,0.4)" />
        </marker>
      </defs>

      {flowNodes.map((node, i) => {
        const x = i * (nodeW + gapX);
        const isFirst = i === 0;

        return (
          <g key={node.id}>
            {/* Connector arrow */}
            {i > 0 && (
              <line
                x1={x - gapX + 2}
                y1={svgH / 2}
                x2={x - 4}
                y2={svgH / 2}
                stroke={isFirst ? 'rgba(196,162,90,0.4)' : 'rgba(69,153,181,0.3)'}
                strokeWidth="1"
                markerEnd={i === 1 ? 'url(#arrow)' : 'url(#arrowBlue)'}
                strokeDasharray={i === 1 ? 'none' : 'none'}
              />
            )}

            {/* Node box */}
            <rect
              x={x}
              y={nodeY}
              width={nodeW}
              height={nodeH}
              fill="none"
              stroke={node.color}
              strokeWidth={isFirst ? '1' : '0.75'}
              strokeOpacity={isFirst ? '0.7' : '0.35'}
            />

            {/* Gold top border for first node */}
            {isFirst && (
              <line x1={x} y1={nodeY} x2={x + nodeW} y2={nodeY} stroke="#C4A25A" strokeWidth="2" />
            )}

            {/* Step number */}
            <text
              x={x + 10}
              y={nodeY + 16}
              fontFamily="'DM Sans', sans-serif"
              fontSize="9"
              fill={node.color}
              opacity={isFirst ? '0.9' : '0.6'}
              letterSpacing="2"
            >
              0{i + 1}
            </text>

            {/* Label */}
            <text
              x={x + nodeW / 2}
              y={nodeY + nodeH / 2 + 2}
              fontFamily="Georgia, serif"
              fontSize="13"
              fill="#EEE8E0"
              textAnchor="middle"
              dominantBaseline="middle"
            >
              {node.label}
            </text>

            {/* Sub label */}
            <text
              x={x + nodeW / 2}
              y={nodeY + nodeH - 12}
              fontFamily="'DM Sans', sans-serif"
              fontSize="9"
              fill="rgba(126,200,227,0.5)"
              textAnchor="middle"
              letterSpacing="1"
            >
              {node.sub}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
