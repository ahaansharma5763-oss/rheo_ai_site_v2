'use client';

import { useEffect, useState } from 'react';

/* ─── Chat types & data ─── */
interface Message { id: number; from: 'user' | 'ava'; text: string; time: string; }
const MESSAGES: Message[] = [
  { id: 1, from: 'user', text: 'I want to book a 5v5 slot for Saturday evening', time: '9:41 AM' },
  { id: 2, from: 'ava',  text: 'Saturday 6pm is available — ₹1,400/hr for 5v5. Sending payment link now? 🌊', time: '9:41 AM' },
  { id: 3, from: 'user', text: 'Yes please', time: '9:42 AM' },
  { id: 4, from: 'ava',  text: 'Done! Payment link sent to WhatsApp. Slot held 15 mins. See you Saturday! ⚡', time: '9:42 AM' },
];
const MSG_SCHEDULE = [800, 2000, 3200, 4500];
const TYPING_SHOW  = [null, 1200, null, 3600] as (number | null)[];
const TYPING_HIDE  = [null, 2000, null, 4500] as (number | null)[];

function TypingIndicator() {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:'4px', background:'#202C33', borderRadius:'0 14px 14px 14px', padding:'12px 16px', alignSelf:'flex-start', maxWidth:'72px' }}>
      {[0,1,2].map(i => <span key={i} style={{ display:'block', width:'6px', height:'6px', borderRadius:'50%', background:'#8696A0', animation:'typingBounce 1.2s ease-in-out infinite', animationDelay:`${i*0.2}s` }} />)}
    </div>
  );
}

function ChatBubble({ msg }: { msg: Message }) {
  const u = msg.from === 'user';
  return (
    <div style={{ display:'flex', flexDirection:'column', alignSelf:u?'flex-end':'flex-start', maxWidth:u?'82%':'88%', gap:'3px', animation:'bubbleIn 0.3s cubic-bezier(0.34,1.56,0.64,1) both' }}>
      <div style={{ background:u?'#005C4B':'#202C33', color:'#E9EDEF', borderRadius:u?'14px 14px 0 14px':'0 14px 14px 14px', padding:'9px 13px', fontFamily:"'DM Sans',sans-serif", fontSize:'13px', lineHeight:1.55, boxShadow:u?'0 2px 8px rgba(0,92,75,.3)':'0 2px 8px rgba(0,0,0,.3)' }}>{msg.text}</div>
      <span style={{ fontSize:'10px', color:'#8696A0', alignSelf:u?'flex-end':'flex-start', fontFamily:"'DM Sans',sans-serif", paddingRight:u?'3px':0, paddingLeft:u?0:'3px' }}>{msg.time}{u?'':' · AVA'}</span>
    </div>
  );
}

function PhoneMockup() {
  const [visibleMsgs, setVisibleMsgs] = useState<number[]>([]);
  const [typingActive, setTypingActive] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  useEffect(() => {
    const t: ReturnType<typeof setTimeout>[] = [];
    MESSAGES.forEach((_, i) => {
      const ts = TYPING_SHOW[i]; if (ts !== null) t.push(setTimeout(() => setTypingActive(true), ts));
      const th = TYPING_HIDE[i]; if (th !== null) t.push(setTimeout(() => setTypingActive(false), th));
      t.push(setTimeout(() => setVisibleMsgs(p => [...p, i]), MSG_SCHEDULE[i]));
    });
    t.push(setTimeout(() => setConfirmed(true), 5400));
    return () => t.forEach(clearTimeout);
  }, []);

  return (
    <div style={{ width:'420px', height:'800px', background:'#0B141A', borderRadius:'48px', border:'2.5px solid #1F2C34', overflow:'hidden', boxShadow:'0 80px 160px rgba(0,0,0,.9),0 0 0 1px rgba(196,162,90,.15),0 0 120px rgba(196,162,90,.06)', display:'flex', flexDirection:'column', flexShrink:0, position:'relative' }}>
      <div style={{ position:'absolute', top:'16px', left:'50%', transform:'translateX(-50%)', width:'110px', height:'32px', background:'#0D1118', borderRadius:'24px', zIndex:10 }} />
      <div style={{ background:'#1F2C34', padding:'14px 18px', paddingTop:'60px', display:'flex', alignItems:'center', gap:'12px', flexShrink:0 }}>
        <span style={{ color:'#00A884', fontSize:'18px', marginRight:'2px' }}>‹</span>
        <div style={{ width:'46px', height:'46px', borderRadius:'50%', background:'linear-gradient(135deg,#C4A25A,#2E6B8E)', flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 0 16px rgba(196,162,90,.35)' }}>
          <span style={{ fontSize:'18px', color:'white', fontFamily:'Georgia,serif' }}>A</span>
        </div>
        <div style={{ flex:1 }}>
          <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'16px', color:'#E9EDEF', fontWeight:600 }}>AVA</div>
          <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'12px', color:'#00A884' }}>● online</div>
        </div>
        <span style={{ color:'#8696A0', fontSize:'20px', marginLeft:'auto' }}>📹</span>
        <span style={{ color:'#8696A0', fontSize:'20px' }}>📞</span>
      </div>
      <div style={{ flex:1, background:'#0B141A', display:'flex', flexDirection:'column', padding:'16px', gap:'10px', overflowY:'hidden', justifyContent:'flex-end' }}>
        <div style={{ alignSelf:'center', fontSize:'12px', fontFamily:"'DM Sans',sans-serif", color:'#8696A0', background:'rgba(11,20,26,.8)', padding:'4px 12px', borderRadius:'8px', marginBottom:'4px' }}>Today</div>
        {visibleMsgs.map(i => <ChatBubble key={MESSAGES[i].id} msg={MESSAGES[i]} />)}
        {typingActive && <TypingIndicator />}
        {confirmed && <div style={{ alignSelf:'center', fontSize:'12px', fontFamily:"'DM Sans',sans-serif", color:'#25D366', letterSpacing:'.05em', marginTop:'4px', display:'flex', alignItems:'center', gap:'4px' }}><span>✓✓</span> Booking confirmed — Sat 6pm</div>}
      </div>
      <div style={{ background:'#1F2C34', padding:'12px 16px', flexShrink:0, display:'flex', alignItems:'center', gap:'10px' }}>
        <span style={{ fontSize:'20px' }}>😊</span>
        <div style={{ flex:1, height:'42px', background:'#2A3942', borderRadius:'24px', display:'flex', alignItems:'center', paddingLeft:'16px' }}>
          <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'13px', color:'#8696A0' }}>Message</span>
        </div>
        <div style={{ width:'42px', height:'42px', borderRadius:'50%', background:'linear-gradient(135deg,#C4A25A,#2E6B8E)', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 2px 14px rgba(196,162,90,.3)' }}>
          <span style={{ fontSize:'18px' }}>🎤</span>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   OTTOMAN / MUGHAL BOTANICAL MOTIF
   Thin-sketch S-curve stem with spiky leaf clusters,
   multi-layered flowers, spiral finials, curling tendrils.
   Light pulses continuously up the stem branches.
   ══════════════════════════════════════════════════ */
function BotanicalMotif() {
  const G = '#C4A25A';   // gold
  const B = '#4599B5';   // crest blue
  const P = '#2E6B8E';   // ocean

  /* Spiky leaf cluster centred at (cx,cy), spread in direction (angleDeg) */
  function LeafCluster({ cx, cy, r, angle, gold }: { cx:number; cy:number; r:number; angle:number; gold?:boolean }) {
    const c = gold ? G : B;
    const angles = [-55,-35,-15,0,15,35,55];
    return (
      <g transform={`translate(${cx},${cy}) rotate(${angle})`} opacity="0.55">
        {angles.map((a, i) => {
          const len = r * (i === 3 ? 1 : 0.78 - Math.abs(i-3)*0.06);
          return (
            <path key={i}
              d={`M 0 0 C ${Math.sin((a*Math.PI)/180)*len*0.3} ${-len*0.35} ${Math.sin((a*Math.PI)/180)*len*0.15} ${-len*0.82} ${Math.sin((a*Math.PI)/180)*len*0.05} ${-len}`}
              fill="none" stroke={c} strokeWidth="0.55" strokeLinecap="round"
            />
          );
        })}
      </g>
    );
  }

  /* Multi-layered ornate flower */
  function OrnateFlower({ cx, cy, r, gold, delay }: { cx:number; cy:number; r:number; gold?:boolean; delay:number }) {
    const c = gold ? G : B;
    const c2 = gold ? B : G;
    const outerPetals = 14; const innerPetals = 10;
    return (
      <g transform={`translate(${cx},${cy})`}
         style={{ animation:`floralPulse ${3+delay*0.3}s ease-in-out ${delay}s infinite` }}>
        {/* Outer serrated ring */}
        {Array.from({length:outerPetals},(_,i) => {
          const a = (i*360)/outerPetals;
          return <path key={i} d={`M 0 ${-r*0.28} C ${r*0.1} ${-r*0.6} ${r*0.08} ${-r*0.9} 0 ${-r} C ${-r*0.08} ${-r*0.9} ${-r*0.1} ${-r*0.6} 0 ${-r*0.28}`}
            fill={c} fillOpacity="0.05" stroke={c} strokeWidth="0.3"
            transform={`rotate(${a})`} />;
        })}
        {/* Inner petal ring */}
        {Array.from({length:innerPetals},(_,i) => {
          const a = (i*360)/innerPetals + 360/(innerPetals*2);
          return <path key={i} d={`M 0 ${-r*0.22} C ${r*0.07} ${-r*0.42} ${r*0.06} ${-r*0.62} 0 ${-r*0.68} C ${-r*0.06} ${-r*0.62} ${-r*0.07} ${-r*0.42} 0 ${-r*0.22}`}
            fill={c2} fillOpacity="0.04" stroke={c2} strokeWidth="0.25"
            transform={`rotate(${a})`} />;
        })}
        {/* Centre rings */}
        <circle r={r*0.2} fill="none" stroke={c} strokeWidth="0.3" opacity="0.6" />
        <circle r={r*0.1} fill={c} fillOpacity="0.18" />
        {/* Centre dot ring */}
        {Array.from({length:8},(_,i) => {
          const a = (i*Math.PI*2)/8;
          return <circle key={i} cx={Math.cos(a)*r*0.14} cy={Math.sin(a)*r*0.14} r="0.5" fill={c} opacity="0.4" />;
        })}
      </g>
    );
  }

  /* Tight spiral finial at end of branch */
  function Spiral({ cx, cy, r, gold }: { cx:number; cy:number; r:number; gold?:boolean }) {
    const c = gold ? G : B;
    // SVG arc approximation of a spiral (2 turns)
    const d = `M ${cx} ${cy+r*0.1}
      C ${cx+r*0.8} ${cy+r*0.1} ${cx+r} ${cy-r*0.5} ${cx} ${cy-r*0.8}
      C ${cx-r*0.5} ${cy-r*1.1} ${cx-r*0.7} ${cy-r*0.4} ${cx-r*0.15} ${cy-r*0.1}
      C ${cx+r*0.25} ${cy+r*0.15} ${cx+r*0.3} ${cy-r*0.2} ${cx} ${cy-r*0.3}`;
    return <path d={d} fill="none" stroke={c} strokeWidth="0.45" strokeLinecap="round" opacity="0.45" />;
  }

  /* Small starburst flower */
  function Starburst({ cx, cy, r, gold }: { cx:number; cy:number; r:number; gold?:boolean }) {
    const c = gold ? G : B;
    return (
      <g transform={`translate(${cx},${cy})`}>
        {Array.from({length:10},(_,i) => {
          const a = (i*360)/10;
          return <line key={i} x1="0" y1={-r*0.3} x2="0" y2={-r}
            stroke={c} strokeWidth="0.35" strokeLinecap="round"
            transform={`rotate(${a})`} opacity="0.45" />;
        })}
        <circle r={r*0.25} fill={c} fillOpacity="0.12" stroke={c} strokeWidth="0.25" />
      </g>
    );
  }

  /* Main stem paths — used both for static skeleton + light pulses */
  const stemPaths = [
    { d:'M 58 300 C 62 278, 66 262, 63 244 C 60 226, 50 215, 52 198 C 54 181, 68 170, 70 153 C 72 136, 62 122, 56 108 C 50 94, 40 82, 43 66 C 46 50, 62 40, 63 24 C 64 12, 58 3, 54 -4', delay:0, gold:true },
    { d:'M 52 198 C 40 192, 24 185, 14 178', delay:0.5, gold:false },
    { d:'M 14 178 C 8 173, 4 167, 6 160', delay:0.7, gold:false },
    { d:'M 70 153 C 82 148, 94 140, 100 132', delay:0.4, gold:true },
    { d:'M 100 132 C 106 126, 108 118, 105 110', delay:0.6, gold:true },
    { d:'M 43 66 C 30 60, 18 53, 12 44', delay:0.3, gold:false },
    { d:'M 12 44 C 7 38, 5 30, 8 22', delay:0.5, gold:false },
    { d:'M 63 24 C 74 18, 84 11, 88 2', delay:0.2, gold:true },
    { d:'M 52 198 C 56 188, 62 180, 68 172', delay:0.8, gold:true },
  ];

  return (
    <svg aria-hidden="true"
      style={{ position:'absolute', left:0, top:0, width:'22%', height:'100%', pointerEvents:'none', zIndex:1 }}
      viewBox="0 0 120 300"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <style>{`
          @keyframes floralPulse { 0%,100%{opacity:0.12} 50%{opacity:0.38} }
          @keyframes stemLight {
            0%   { stroke-dashoffset: 280; opacity:0 }
            8%   { opacity:0.8 }
            88%  { opacity:0.35 }
            100% { stroke-dashoffset:-280; opacity:0 }
          }
        `}</style>
      </defs>

      {/* Static skeleton stems */}
      {stemPaths.map((s,i) => (
        <path key={`sk-${i}`} d={s.d} fill="none"
          stroke={s.gold ? G : B} strokeWidth="0.55" strokeLinecap="round"
          opacity="0.22" />
      ))}

      {/* Traveling light on each stem */}
      {stemPaths.map((s,i) => (
        <path key={`lt-${i}`} d={s.d} fill="none"
          stroke={s.gold ? '#E0C87A' : '#7EC8E3'} strokeWidth="1.1"
          strokeLinecap="round" strokeDasharray="22 280"
          style={{ animation:`stemLight ${5+s.delay*0.8}s ease-in-out ${s.delay}s infinite` }}
        />
      ))}

      {/* Leaf clusters at junctions */}
      <LeafCluster cx={52} cy={198} r={14} angle={-30} />
      <LeafCluster cx={70} cy={153} r={12} angle={40}  gold />
      <LeafCluster cx={43} cy={66}  r={11} angle={-40} />
      <LeafCluster cx={63} cy={24}  r={10} angle={35}  gold />
      <LeafCluster cx={58} cy={244} r={10} angle={15} />

      {/* Large ornate flowers */}
      <OrnateFlower cx={56} cy={108} r={14} gold  delay={0}   />
      <OrnateFlower cx={52} cy={198} r={11}        delay={0.6} />

      {/* Medium flower at upper branch */}
      <OrnateFlower cx={105} cy={110} r={9}  gold  delay={0.4} />
      <OrnateFlower cx={8}   cy={22}  r={8}        delay={0.8} />

      {/* Starburst flowers at twig tips */}
      <Starburst cx={14}  cy={178} r={5.5} />
      <Starburst cx={6}   cy={160} r={4}   gold />
      <Starburst cx={88}  cy={2}   r={5}   gold />
      <Starburst cx={68}  cy={172} r={4}   gold />

      {/* Spiral finials at branch ends */}
      <Spiral cx={6}  cy={160} r={5}  />
      <Spiral cx={88} cy={2}   r={4}  gold />
      <Spiral cx={14} cy={178} r={4.5} />
    </svg>
  );
}

/* ══════════════════════════════════════════════════
   AVA WORKFLOW DIAGRAM
   Technical pipeline: input → AI core → action layer → output
   ══════════════════════════════════════════════════ */
function WorkflowDiagram() {
  const gold = '#C4A25A'; const blue = '#4599B5'; const foam = '#7EC8E3';
  const ocean = '#2E6B8E';

  const box = (label: string, sub: string | null, color: string, icon: string): React.CSSProperties => ({
    background: 'rgba(13,31,60,0.72)',
    border: `1px solid ${color}30`,
    borderLeft: `2px solid ${color}`,
    borderRadius: '6px',
    padding: '8px 12px',
    position: 'relative',
  });

  const label = (txt: string, color: string) => (
    <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'9px', letterSpacing:'0.32em', textTransform:'uppercase', color, fontWeight:500, marginBottom:'2px' }}>{txt}</div>
  );
  const sub = (txt: string) => (
    <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'9.5px', color:'rgba(238,232,224,0.45)', lineHeight:1.5 }}>{txt}</div>
  );
  const connector = (color = gold) => (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:0, margin:'0 auto', width:'1px', height:'22px', position:'relative', overflow:'visible' }}>
      <div style={{ width:'1px', height:'100%', background:`linear-gradient(to bottom, ${color}60, ${color}20)` }} />
      <div style={{ width:'5px', height:'5px', borderLeft:`1px solid ${color}80`, borderBottom:`1px solid ${color}80`, transform:'rotate(-45deg) translateY(-3px)', position:'absolute', bottom:0 }} />
    </div>
  );

  return (
    <div className="ava-workflow" style={{ width:'252px', flexShrink:0, display:'flex', flexDirection:'column', gap:0, justifyContent:'center' }}>
      <style>{`
        @keyframes wfPulse { 0%,100%{opacity:0.6} 50%{opacity:1} }
        @keyframes wfFlow  { 0%{transform:translateY(-4px);opacity:0} 100%{transform:translateY(4px);opacity:0.8} }
        .wf-node { transition: border-color 0.3s ease; }
        .wf-node:hover { border-color: rgba(196,162,90,0.5) !important; }
      `}</style>

      {/* INPUT */}
      <div className="wf-node" style={box('','',blue,'◎')}>
        {label('Input Channel', blue)}
        {sub('WhatsApp · Web · Voice API')}
        <div style={{ position:'absolute', top:'50%', right:'10px', transform:'translateY(-50%)', fontSize:'16px', opacity:0.35 }}>◎</div>
      </div>

      {connector(blue)}

      {/* NLP */}
      <div className="wf-node" style={box('','',gold,'⬡')}>
        {label('NLP Engine', gold)}
        {sub('Intent · Entities · Sentiment\nContext Window · Memory Fetch')}
      </div>

      {connector(gold)}

      {/* CORE */}
      <div className="wf-node" style={{ ...box('','',ocean,'◈'), padding:'10px 12px' }}>
        {label('AVA Intelligence Core', ocean)}
        <div style={{ display:'flex', gap:'6px', marginTop:'5px' }}>
          {['Rule\nEngine','Vector\nSearch','Policy\nGuard'].map((t,i) => (
            <div key={i} style={{ flex:1, background:`rgba(46,107,142,0.12)`, border:`1px solid ${ocean}25`, borderRadius:'4px', padding:'5px 4px', textAlign:'center', fontFamily:"'DM Sans',sans-serif", fontSize:'8px', color:`${foam}99`, lineHeight:1.4, whiteSpace:'pre-line' }}>{t}</div>
          ))}
        </div>
      </div>

      {connector(ocean)}

      {/* ACTION ROUTER — 3-way */}
      <div style={{ display:'flex', alignItems:'stretch', gap:'4px', position:'relative' }}>
        {/* Horizontal bar connecting the 3 */}
        <div style={{ position:'absolute', top:0, left:'16.66%', right:'16.66%', height:'1px', background:`linear-gradient(to right, ${blue}40, ${gold}40, ${blue}40)` }} />
        {[
          { label:'BOOKING',  sub:'Calendar\nSched.', color:blue  },
          { label:'PAYMENTS', sub:'UPI · Links\nRecon.', color:gold  },
          { label:'CRM SYNC', sub:'Leads\nFollow-ups', color:blue },
        ].map((n,i) => (
          <div key={i} className="wf-node" style={{ flex:1, background:'rgba(13,31,60,0.72)', border:`1px solid ${n.color}30`, borderTop:`2px solid ${n.color}`, borderRadius:'0 0 6px 6px', padding:'7px 5px', textAlign:'center' }}>
            <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'7.5px', letterSpacing:'0.25em', textTransform:'uppercase', color:n.color, fontWeight:500, marginBottom:'3px' }}>{n.label}</div>
            <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'8px', color:'rgba(238,232,224,0.38)', lineHeight:1.4, whiteSpace:'pre-line' }}>{n.sub}</div>
          </div>
        ))}
      </div>

      {connector(gold)}

      {/* CONFIRMATION */}
      <div className="wf-node" style={box('','',foam,'✓')}>
        {label('Confirmation Engine', foam)}
        {sub('Multi-channel dispatch · Receipts\nAudit log · Retry queue')}
        <div style={{ display:'flex', gap:'4px', marginTop:'6px' }}>
          {['WA','SMS','Email','Push'].map(ch => (
            <div key={ch} style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'7px', letterSpacing:'0.2em', color:`${foam}80`, border:`1px solid ${foam}20`, borderRadius:'3px', padding:'2px 5px' }}>{ch}</div>
          ))}
        </div>
      </div>

      {connector(foam)}

      {/* DASHBOARD */}
      <div className="wf-node" style={box('','',gold,'▣')}>
        {label('Owner Dashboard', gold)}
        {sub('Live analytics · Revenue MIS\nAlert rules · Export API')}
        <div style={{ display:'flex', gap:'4px', marginTop:'6px', flexWrap:'wrap' }}>
          {['Bookings','Revenue','Leads','Alerts'].map(m => (
            <div key={m} style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'7px', letterSpacing:'0.18em', color:`${gold}70`, border:`1px solid ${gold}15`, borderRadius:'3px', padding:'2px 5px' }}>{m}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Hero ─── */
export default function AvaHero() {
  return (
    <section style={{ position:'relative', minHeight:'100vh', background:'transparent', overflow:'hidden' }}>
      <style>{`
        @keyframes typingBounce { 0%,60%,100%{transform:translateY(0)} 30%{transform:translateY(-5px)} }
        @keyframes bubbleIn { from{opacity:0;transform:scale(.92) translateY(6px)} to{opacity:1;transform:scale(1) translateY(0)} }

        .ava-inner {
          position:relative; z-index:10;
          display:flex; align-items:center;
          min-height:100vh;
          padding:80px 64px 80px 72px;
          gap:48px;
        }
        .ava-left { flex:0 0 340px; }
        .ava-workflow { flex-shrink:0; }
        .ava-phone   { flex-shrink:0; }

        @media(max-width:1200px) {
          .ava-workflow { display:none !important; }
          .ava-left { flex:1 !important; max-width:460px; }
        }
        @media(max-width:960px) {
          .ava-inner {
            flex-direction:column !important;
            align-items:center !important;
            padding:120px 24px 64px !important;
            gap:40px !important;
            min-height:100svh !important;
          }
          .ava-left { flex:0 0 auto !important; max-width:100% !important; text-align:center !important; }
          .ava-pills { justify-content:center !important; }
          .ava-phone { transform:scale(.70) !important; transform-origin:top center !important; margin-bottom:-160px !important; }
        }
        @media(max-width:480px) {
          .ava-phone { transform:scale(.58) !important; margin-bottom:-220px !important; }
        }
      `}</style>

      {/* Botanical motif — left edge */}
      <BotanicalMotif />

      {/* Vignette */}
      <div aria-hidden="true" style={{ position:'absolute', inset:0, zIndex:2, pointerEvents:'none', background:'radial-gradient(ellipse 55% 70% at 38% 50%, rgba(7,16,30,.52) 0%, transparent 100%)' }} />

      <div className="ava-inner">

        {/* LEFT — brand copy */}
        <div className="ava-left">
          <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'11px', color:'var(--gold)', textTransform:'uppercase', letterSpacing:'.44em', margin:'0 0 16px 0' }}>INTRODUCING</p>
          <h1 style={{ fontFamily:'Georgia,serif', fontSize:'clamp(72px,9vw,116px)', color:'var(--gold)', letterSpacing:'.12em', lineHeight:1, margin:0, textShadow:'0 0 100px rgba(196,162,90,.25),0 0 40px rgba(196,162,90,.12)' }}>AVA</h1>
          <div style={{ width:'48px', height:'1px', background:'linear-gradient(to right,var(--gold),transparent)', margin:'22px 0' }} />
          <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'17px', color:'var(--warm-foam)', letterSpacing:'.08em', margin:'0 0 8px 0', fontWeight:300 }}>Your AI operations agent.</p>
          <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'12px', color:'var(--ocean)', fontStyle:'italic', letterSpacing:'.06em', margin:'0 0 36px 0' }}>A Rheo AI Product.</p>
          <div className="ava-pills" style={{ display:'flex', flexWrap:'wrap', gap:'8px' }}>
            {['WhatsApp Native','Instant Booking','Payment Links','CRM Sync'].map(f => (
              <span key={f} style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'9px', color:'var(--crest)', letterSpacing:'.18em', textTransform:'uppercase', border:'1px solid rgba(69,153,181,.25)', borderRadius:'20px', padding:'5px 12px', background:'rgba(69,153,181,.06)' }}>{f}</span>
            ))}
          </div>
        </div>

        {/* MIDDLE — workflow diagram */}
        <WorkflowDiagram />

        {/* RIGHT — phone, no tilt */}
        <div className="ava-phone">
          <PhoneMockup />
        </div>

      </div>
    </section>
  );
}
