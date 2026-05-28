'use client';

interface FlowNode {
  x: number;
  numLabel: string;
  lines: string[];
}

const NODES: FlowNode[] = [
  { x: 35,  numLabel: '01', lines: ['WhatsApp', 'Cloud API'] },
  { x: 215, numLabel: '02', lines: ['n8n', 'Orchestration'] },
  { x: 395, numLabel: '03', lines: ['Claude', '(Anthropic)'] },
  { x: 575, numLabel: '04', lines: ['Google Sheets', '/ Calendar'] },
  { x: 755, numLabel: '05', lines: ['Razorpay'] },
];

// Arrows: center-right of box i → center-left of box i+1
// Box: x, y=30, width=130, height=60
// Center-right: (x+130, 60), center-left of next: (next_x, 60)
const ARROWS = NODES.slice(0, -1).map((node, i) => ({
  x1: node.x + 130,
  y1: 60,
  x2: NODES[i + 1].x,
  y2: 60,
}));

export default function HowAvaWorksSection() {
  return (
    <section style={{ padding: '120px 0' }}>
      <style>{`
        @keyframes flowDash {
          to { stroke-dashoffset: -16; }
        }
        .flow-arrow-line {
          stroke-dasharray: 4 4;
          stroke-dashoffset: 16;
          animation: flowDash 1.5s linear infinite;
        }
        .flow-box {
          cursor: default;
          transition: filter 0.2s ease;
        }
        .flow-box:hover .flow-box-top {
          opacity: 1 !important;
        }
        @media (max-width: 767px) {
          .how-ava-inner { padding: 0 24px !important; }
        }
      `}</style>

      <div
        className="how-ava-inner"
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 64px',
        }}
      >
        {/* Label */}
        <p
          style={{
            fontFamily: 'var(--sans)',
            fontSize: '11px',
            color: 'var(--gold)',
            textTransform: 'uppercase',
            letterSpacing: '0.44em',
            margin: 0,
          }}
        >
          UNDER THE HOOD
        </p>

        {/* Headline */}
        <h2
          style={{
            fontFamily: 'var(--serif)',
            fontSize: '32px',
            color: 'var(--warm-foam)',
            letterSpacing: '0.15em',
            marginTop: '16px',
            marginBottom: 0,
          }}
        >
          Enterprise-grade infrastructure. WhatsApp-native delivery.
        </h2>

        {/* Flow diagram container */}
        <div
          style={{
            width: '100%',
            marginTop: '64px',
            overflowX: 'auto',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <svg
            viewBox="0 0 900 120"
            width="900"
            height="120"
            xmlns="http://www.w3.org/2000/svg"
            style={{ display: 'block', minWidth: '900px' }}
          >
            {/* Boxes */}
            {NODES.map((node) => (
              <g key={node.numLabel} className="flow-box">
                {/* Main box */}
                <rect
                  x={node.x}
                  y={30}
                  width={130}
                  height={60}
                  fill="#1A3566"
                  rx={2}
                  stroke="#2E6B8E"
                  strokeWidth={0.5}
                  strokeOpacity={0.4}
                />
                {/* Gold top-border highlight on hover, always rendered, toggled by CSS */}
                <rect
                  className="flow-box-top"
                  x={node.x}
                  y={30}
                  width={130}
                  height={2}
                  fill="#C4A25A"
                  rx={0}
                  opacity={0}
                  style={{ transition: 'opacity 0.2s ease' }}
                />
                {/* Gold number above box */}
                <text
                  x={node.x + 65}
                  y={22}
                  textAnchor="middle"
                  fontFamily="var(--sans)"
                  fontSize={10}
                  fill="#C4A25A"
                  letterSpacing="0.1em"
                >
                  {node.numLabel}
                </text>
                {/* Box label lines */}
                {node.lines.length === 1 ? (
                  <text
                    x={node.x + 65}
                    y={64}
                    textAnchor="middle"
                    fontFamily="var(--serif)"
                    fontSize={11}
                    fill="#EEE8E0"
                  >
                    {node.lines[0]}
                  </text>
                ) : (
                  <>
                    <text
                      x={node.x + 65}
                      y={56}
                      textAnchor="middle"
                      fontFamily="var(--serif)"
                      fontSize={11}
                      fill="#EEE8E0"
                    >
                      {node.lines[0]}
                    </text>
                    <text
                      x={node.x + 65}
                      y={72}
                      textAnchor="middle"
                      fontFamily="var(--serif)"
                      fontSize={11}
                      fill="#EEE8E0"
                    >
                      {node.lines[1]}
                    </text>
                  </>
                )}
              </g>
            ))}

            {/* Connecting arrows */}
            {ARROWS.map((arrow, i) => (
              <g key={i}>
                <line
                  x1={arrow.x1}
                  y1={arrow.y1}
                  x2={arrow.x2 - 6}
                  y2={arrow.y2}
                  stroke="#4599B5"
                  strokeWidth={1}
                  className="flow-arrow-line"
                />
                {/* Arrowhead triangle */}
                <polygon
                  points={`${arrow.x2},${arrow.y2} ${arrow.x2 - 6},${arrow.y2 - 4} ${arrow.x2 - 6},${arrow.y2 + 4}`}
                  fill="#4599B5"
                />
              </g>
            ))}
          </svg>
        </div>

        {/* Body text */}
        <p
          style={{
            fontFamily: 'var(--sans)',
            fontSize: '14px',
            color: 'var(--ocean)',
            lineHeight: 1.9,
            maxWidth: '700px',
            margin: '48px auto 0',
            textAlign: 'center',
          }}
        >
          Ava operates as a stateful multi-agent system. Inbound events from WhatsApp Cloud API
          trigger conditional workflow trees in n8n. Each branch routes to the appropriate LLM
          prompt chain via the Anthropic API, with context injected from Google Sheets (customer
          history, booking records, lead scores). Confirmed actions, bookings, payments,
          escalations, are committed back to the data layer and surfaced in your daily report.
        </p>
      </div>
    </section>
  );
}
