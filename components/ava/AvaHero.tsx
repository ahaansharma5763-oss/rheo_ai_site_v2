'use client';

import { useEffect, useState } from 'react';

/* ─── Chat types & data ─── */
interface Message { id: number; from: 'user' | 'ava'; text: string; time: string; }
const MESSAGES: Message[] = [
  { id: 1, from: 'user', text: 'I want to book a 5v5 slot for Saturday evening', time: '9:41 AM' },
  { id: 2, from: 'ava',  text: 'Saturday 6pm is available, ₹1,400/hr for 5v5. Sending payment link now? 🌊', time: '9:41 AM' },
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
      <div style={{ background:u?'#005C4B':'#202C33', color:'#E9EDEF', borderRadius:u?'14px 14px 0 14px':'0 14px 14px 14px', padding:'9px 13px', fontFamily:'var(--sans)', fontSize:'13px', lineHeight:1.55 }}>{msg.text}</div>
      <span style={{ fontSize:'10px', color:'#8696A0', alignSelf:u?'flex-end':'flex-start', fontFamily:'var(--sans)' }}>{msg.time}{u?'':' · AVA'}</span>
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
    <div style={{ width:'360px', height:'720px', background:'#0B141A', borderRadius:'44px', border:'2.5px solid #1F2C34', overflow:'hidden', boxShadow:'0 60px 140px rgba(0,0,0,.9),0 0 0 1px rgba(196,162,90,.15),0 0 100px rgba(196,162,90,.08)', display:'flex', flexDirection:'column', position:'relative', flexShrink:0 }}>
      <div style={{ position:'absolute', top:'14px', left:'50%', transform:'translateX(-50%)', width:'100px', height:'28px', background:'#0D1118', borderRadius:'20px', zIndex:10 }} />
      <div style={{ background:'#1F2C34', padding:'12px 16px', paddingTop:'52px', display:'flex', alignItems:'center', gap:'10px', flexShrink:0 }}>
        <span style={{ color:'#00A884', fontSize:'16px' }}>‹</span>
        <div style={{ width:'42px', height:'42px', borderRadius:'50%', background:'linear-gradient(135deg,#C4A25A,#2E6B8E)', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 0 14px rgba(196,162,90,.35)' }}>
          <span style={{ fontSize:'16px', color:'white', fontFamily:'var(--serif)' }}>A</span>
        </div>
        <div style={{ flex:1 }}>
          <div style={{ fontFamily:'var(--sans)', fontSize:'15px', color:'#E9EDEF', fontWeight:600 }}>AVA</div>
          <div style={{ fontFamily:'var(--sans)', fontSize:'11px', color:'#00A884' }}>● online</div>
        </div>
        <span style={{ color:'#8696A0', fontSize:'18px', marginLeft:'auto' }}>📹</span>
        <span style={{ color:'#8696A0', fontSize:'18px' }}>📞</span>
      </div>
      <div style={{ flex:1, background:'#0B141A', display:'flex', flexDirection:'column', padding:'14px', gap:'8px', overflowY:'hidden', justifyContent:'flex-end' }}>
        <div style={{ alignSelf:'center', fontSize:'11px', fontFamily:'var(--sans)', color:'#8696A0', background:'rgba(11,20,26,.8)', padding:'3px 10px', borderRadius:'8px', marginBottom:'4px' }}>Today</div>
        {visibleMsgs.map(i => <ChatBubble key={MESSAGES[i].id} msg={MESSAGES[i]} />)}
        {typingActive && <TypingIndicator />}
        {confirmed && <div style={{ alignSelf:'center', fontSize:'11px', fontFamily:'var(--sans)', color:'#25D366', display:'flex', alignItems:'center', gap:'4px' }}><span>✓✓</span> Booking confirmed, Sat 6pm</div>}
      </div>
      <div style={{ background:'#1F2C34', padding:'10px 14px', display:'flex', alignItems:'center', gap:'8px' }}>
        <span style={{ fontSize:'18px' }}>😊</span>
        <div style={{ flex:1, height:'38px', background:'#2A3942', borderRadius:'20px', display:'flex', alignItems:'center', paddingLeft:'14px' }}>
          <span style={{ fontFamily:'var(--sans)', fontSize:'12px', color:'#8696A0' }}>Message</span>
        </div>
        <div style={{ width:'38px', height:'38px', borderRadius:'50%', background:'linear-gradient(135deg,#C4A25A,#2E6B8E)', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <span style={{ fontSize:'16px' }}>🎤</span>
        </div>
      </div>
    </div>
  );
}

/* ─── Botanical motif, very faint left-edge decoration ─── */
function BotanicalMotif() {
  const G = '#C4A25A'; const B = '#4599B5';
  const stemPaths = [
    { d:'M 55 300 C 59 278,63 262,60 244 C 57 226,48 215,50 198 C 52 181,65 170,67 153 C 69 136,59 122,53 108 C 47 94,37 82,40 66 C 43 50,59 40,60 24 C 61 12,55 3,51 -4', gold:true,  delay:0   },
    { d:'M 50 198 C 38 192,22 185,12 178',                                                                                                                                    gold:false, delay:0.5 },
    { d:'M 12 178 C 6 173,2 167,4 160',                                                                                                                                       gold:false, delay:0.7 },
    { d:'M 67 153 C 79 148,91 140,97 132',                                                                                                                                    gold:true,  delay:0.4 },
    { d:'M 40 66 C 27 60,15 53,9 44',                                                                                                                                         gold:false, delay:0.3 },
    { d:'M 60 24 C 71 18,81 11,85 2',                                                                                                                                         gold:true,  delay:0.2 },
    { d:'M 50 198 C 54 188,60 180,65 172',                                                                                                                                    gold:true,  delay:0.8 },
  ];
  const flowers: { cx:number; cy:number; r:number; gold:boolean; delay:number }[] = [
    { cx:53, cy:108, r:12, gold:true,  delay:0   },
    { cx:50, cy:198, r:9,  gold:false, delay:0.6 },
    { cx:97, cy:132, r:7,  gold:true,  delay:0.4 },
    { cx:85, cy:2,   r:6,  gold:true,  delay:0.2 },
    { cx:9,  cy:44,  r:6,  gold:false, delay:0.8 },
  ];
  return (
    <svg aria-hidden="true"
      style={{ position:'absolute', left:0, top:0, width:'19%', height:'100%', pointerEvents:'none', zIndex:1, opacity:0.18 }}
      viewBox="0 0 110 300" preserveAspectRatio="xMidYMid meet">
      <defs><style>{`
        @keyframes stemL { 0%{stroke-dashoffset:300;opacity:0} 8%{opacity:.9} 90%{opacity:.4} 100%{stroke-dashoffset:-300;opacity:0} }
        @keyframes flrL  { 0%,100%{opacity:.1} 50%{opacity:.5} }
      `}</style></defs>
      {stemPaths.map((s,i) => (
        <g key={`stem-${i}`}>
          <path d={s.d} fill="none" stroke={s.gold?G:B} strokeWidth="0.6" strokeLinecap="round" opacity="0.9" />
          <path d={s.d} fill="none" stroke={s.gold?'#E0C87A':'#7EC8E3'} strokeWidth="1.3" strokeLinecap="round" strokeDasharray="24 300"
            style={{ animation:`stemL ${5.5+s.delay*0.7}s ease-in-out ${s.delay}s infinite` }} />
        </g>
      ))}
      {flowers.map((f,i) => {
        const c = f.gold ? G : B; const n = 12;
        return (
          <g key={i} transform={`translate(${f.cx},${f.cy})`} style={{ animation:`flrL ${2.8+f.delay*0.4}s ease-in-out ${f.delay}s infinite` }}>
            {Array.from({length:n},(_,j) => <path key={j} d={`M 0 ${-f.r*0.25} C ${f.r*0.09} ${-f.r*0.6} ${f.r*0.07} ${-f.r*0.9} 0 ${-f.r} C ${-f.r*0.07} ${-f.r*0.9} ${-f.r*0.09} ${-f.r*0.6} 0 ${-f.r*0.25}`}
              fill={c} fillOpacity="0.06" stroke={c} strokeWidth="0.28" transform={`rotate(${j*360/n})`} />)}
            <circle r={f.r*0.18} fill="none" stroke={c} strokeWidth="0.28" opacity="0.7" />
            <circle r={f.r*0.08} fill={c} opacity="0.4" />
          </g>
        );
      })}
    </svg>
  );
}

/* ─── Workflow diagram, right side, tall, fills page ─── */
function WorkflowDiagram() {
  const G = '#C4A25A'; const B = '#4599B5'; const F = '#7EC8E3'; const O = '#2E6B8E';

  function Node({ accent, icon, title, children }: { accent:string; icon:string; title:string; children:React.ReactNode }) {
    return (
      <div style={{ background:'rgba(7,16,30,0.78)', border:`1px solid ${accent}22`, borderLeft:`2.5px solid ${accent}`, borderRadius:'8px', padding:'13px 16px', flexShrink:0 }}>
        <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'8px' }}>
          <span style={{ fontSize:'13px', opacity:0.7 }}>{icon}</span>
          <span style={{ fontFamily:'var(--sans)', fontSize:'9px', letterSpacing:'0.36em', textTransform:'uppercase', color:accent, fontWeight:500 }}>{title}</span>
        </div>
        {children}
      </div>
    );
  }

  function Chip({ label, color }: { label:string; color:string }) {
    return <span style={{ fontFamily:'var(--sans)', fontSize:'8px', letterSpacing:'0.18em', textTransform:'uppercase', color:`${color}90`, border:`1px solid ${color}20`, borderRadius:'4px', padding:'3px 7px', whiteSpace:'nowrap' }}>{label}</span>;
  }

  function Line({ color = G }: { color?: string }) {
    return (
      <div style={{ display:'flex', justifyContent:'center', alignItems:'center', height:'32px', position:'relative' }}>
        <div style={{ width:'1px', height:'100%', background:`linear-gradient(to bottom,${color}60,${color}25)` }} />
        <div style={{ position:'absolute', bottom:'1px', width:'0', height:'0', borderLeft:'4px solid transparent', borderRight:'4px solid transparent', borderTop:`5px solid ${color}50` }} />
        <div className="flow-dot" style={{ position:'absolute', width:'5px', height:'5px', borderRadius:'50%', background:color, boxShadow:`0 0 6px ${color}`, animation:`flowDot 2.2s ease-in-out infinite` }} />
      </div>
    );
  }

  function SubTag({ text, color }: { text:string; color:string }) {
    return <span style={{ fontFamily:'var(--sans)', fontSize:'9.5px', color:`rgba(238,232,224,0.42)`, lineHeight:1.5 }}>{text}</span>;
  }

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:0, width:'100%' }}>
      <style>{`
        @keyframes flowDot {
          0%   { transform:translateY(-14px); opacity:0; }
          15%  { opacity:1; }
          85%  { opacity:.8; }
          100% { transform:translateY(14px); opacity:0; }
        }
      `}</style>

      {/* 1, Input */}
      <Node accent={B} icon="◎" title="Input Channel">
        <SubTag text="Incoming intent received & authenticated" color={B} />
        <div style={{ display:'flex', gap:'6px', marginTop:'8px', flexWrap:'wrap' }}>
          {['WhatsApp','Web Chat','Voice API','Webhook'].map(c => <Chip key={c} label={c} color={B} />)}
        </div>
      </Node>

      <Line color={B} />

      {/* 2, NLP */}
      <Node accent={G} icon="⬡" title="NLP Pipeline">
        <SubTag text="Parsing, classification and context resolution" color={G} />
        <div style={{ display:'flex', gap:'5px', marginTop:'8px' }}>
          {['Intent','Entities','Sentiment','Slot Fill'].map(t => (
            <div key={t} style={{ flex:1, background:`rgba(196,162,90,0.07)`, border:`1px solid ${G}20`, borderRadius:'5px', padding:'6px 4px', textAlign:'center', fontFamily:'var(--sans)', fontSize:'8px', color:`${G}80`, letterSpacing:'0.1em', textTransform:'uppercase' }}>{t}</div>
          ))}
        </div>
        <div style={{ marginTop:'7px', fontFamily:'var(--sans)', fontSize:'9px', color:`rgba(238,232,224,0.3)`, letterSpacing:'0.1em' }}>Context window · Long-term memory retrieval</div>
      </Node>

      <Line color={G} />

      {/* 3, Core */}
      <Node accent={O} icon="◈" title="AVA Intelligence Core">
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'5px', marginTop:'2px' }}>
          {[
            { label:'Rule Engine',    sub:'Business logic\n& constraints'  },
            { label:'Vector Search',  sub:'Semantic match\n& retrieval'    },
            { label:'Policy Guard',   sub:'Rate limits\n& auth checks'     },
            { label:'Fallback AI',    sub:'LLM escalation\n& clarification'},
          ].map(n => (
            <div key={n.label} style={{ background:`rgba(46,107,142,0.1)`, border:`1px solid ${O}25`, borderRadius:'5px', padding:'7px 8px' }}>
              <div style={{ fontFamily:'var(--sans)', fontSize:'8px', color:`${F}90`, letterSpacing:'0.18em', textTransform:'uppercase', marginBottom:'3px' }}>{n.label}</div>
              <div style={{ fontFamily:'var(--sans)', fontSize:'8px', color:'rgba(238,232,224,0.35)', lineHeight:1.4, whiteSpace:'pre-line' }}>{n.sub}</div>
            </div>
          ))}
        </div>
      </Node>

      <Line color={O} />

      {/* 4, Action layer, 3-way */}
      <div style={{ display:'flex', gap:'6px', position:'relative' }}>
        <div style={{ position:'absolute', top:0, left:'16%', right:'16%', height:'1px', background:`linear-gradient(to right,${B}30,${G}40,${B}30)` }} />
        {[
          { label:'Booking',  subs:['Slot scheduler','Calendar sync','Conflict check'],  color:B },
          { label:'Payments', subs:['UPI · Razorpay','Payment links','Reconciliation'], color:G },
          { label:'CRM Sync', subs:['Lead tracking','Follow-up queue','Churn alerts'],   color:B },
        ].map(n => (
          <div key={n.label} style={{ flex:1, background:'rgba(7,16,30,0.78)', border:`1px solid ${n.color}25`, borderTop:`2px solid ${n.color}`, borderRadius:'0 0 8px 8px', padding:'9px 8px' }}>
            <div style={{ fontFamily:'var(--sans)', fontSize:'8.5px', color:n.color, letterSpacing:'0.28em', textTransform:'uppercase', fontWeight:500, marginBottom:'6px', textAlign:'center' }}>{n.label}</div>
            {n.subs.map(s => <div key={s} style={{ fontFamily:'var(--sans)', fontSize:'8px', color:'rgba(238,232,224,0.38)', lineHeight:1.6 }}>· {s}</div>)}
          </div>
        ))}
      </div>

      <Line color={G} />

      {/* 5, Confirmation */}
      <Node accent={F} icon="✓" title="Confirmation Engine">
        <SubTag text="Multi-channel dispatch with guaranteed delivery" color={F} />
        <div style={{ display:'flex', gap:'5px', marginTop:'8px', flexWrap:'wrap' }}>
          {['WhatsApp','SMS','Email','Push','Webhook'].map(c => <Chip key={c} label={c} color={F} />)}
        </div>
        <div style={{ marginTop:'7px', fontFamily:'var(--sans)', fontSize:'9px', color:`rgba(238,232,224,0.3)`, letterSpacing:'0.1em' }}>Audit log · Retry queue · Delivery receipts</div>
      </Node>

      <Line color={F} />

      {/* 6, Dashboard */}
      <Node accent={G} icon="▣" title="Owner Dashboard">
        <SubTag text="Live operations intelligence & revenue analytics" color={G} />
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'5px', marginTop:'8px' }}>
          {[
            { label:'Revenue MIS',   val:'Real-time P&L'  },
            { label:'Booking Flow',  val:'Funnel analytics'},
            { label:'Alert Rules',   val:'Custom triggers' },
            { label:'Export API',    val:'CSV · Sheets'    },
          ].map(m => (
            <div key={m.label} style={{ background:`rgba(196,162,90,0.06)`, border:`1px solid ${G}15`, borderRadius:'5px', padding:'6px 8px' }}>
              <div style={{ fontFamily:'var(--sans)', fontSize:'8px', color:`${G}80`, letterSpacing:'0.16em', textTransform:'uppercase' }}>{m.label}</div>
              <div style={{ fontFamily:'var(--sans)', fontSize:'8.5px', color:'rgba(238,232,224,0.42)', marginTop:'2px' }}>{m.val}</div>
            </div>
          ))}
        </div>
      </Node>
    </div>
  );
}

/* ─── Hero ─── */
export default function AvaHero() {
  return (
    <section style={{ position:'relative', height:'100svh', minHeight:'700px', background:'transparent', overflow:'hidden' }}>
      <style>{`
        @keyframes typingBounce { 0%,60%,100%{transform:translateY(0)} 30%{transform:translateY(-5px)} }
        @keyframes bubbleIn { from{opacity:0;transform:scale(.92) translateY(6px)} to{opacity:1;transform:scale(1) translateY(0)} }
        @keyframes avaGlow { 0%,100%{text-shadow:0 0 80px rgba(196,162,90,.3),0 0 30px rgba(196,162,90,.15)} 50%{text-shadow:0 0 120px rgba(196,162,90,.55),0 0 60px rgba(196,162,90,.25),0 0 8px rgba(196,162,90,.4)} }

        .ava-inner {
          position:relative; z-index:10;
          display:flex; align-items:center;
          height:100svh;
          padding:0 52px;
          gap:40px;
        }
        .ava-left     { flex:0 0 260px; }
        .ava-center   { flex:1; display:flex; align-items:center; justify-content:center; }
        .ava-workflow { flex:0 0 400px; height:calc(100svh - 100px); overflow-y:auto; display:flex; align-items:center; }
        .ava-workflow::-webkit-scrollbar { display:none; }

        @media(max-width:1280px) { .ava-workflow { flex:0 0 340px; } }
        @media(max-width:1100px) { .ava-workflow { display:none !important; } .ava-left { flex:0 0 300px; } }
        @media(max-width:840px) {
          .ava-inner {
            flex-direction:column !important;
            height:auto !important;
            min-height:100svh !important;
            padding:110px 24px 60px !important;
            gap:36px !important;
            align-items:center !important;
            justify-content:center !important;
          }
          .ava-left  { flex:0 0 auto !important; text-align:center !important; max-width:100% !important; }
          .ava-pills { justify-content:center !important; }
          .ava-center { flex:0 0 auto !important; transform:scale(.78); transform-origin:top center; margin-bottom:-100px; }
        }
        @media(max-width:480px) { .ava-center { transform:scale(.64) !important; margin-bottom:-160px !important; } }
      `}</style>

      {/* Botanical motif, faint left edge */}
      <BotanicalMotif />

      {/* Strong radial glow behind AVA text */}
      <div aria-hidden="true" style={{ position:'absolute', left:'52px', top:'50%', transform:'translateY(-50%)', width:'320px', height:'400px', background:'radial-gradient(ellipse at 30% 50%, rgba(196,162,90,0.08) 0%, transparent 70%)', pointerEvents:'none', zIndex:2 }} />

      <div className="ava-inner">

        {/* LEFT, AVA title */}
        <div className="ava-left" style={{ position:'relative', zIndex:3 }}>
          <p style={{ fontFamily:'var(--sans)', fontSize:'10px', color:'var(--gold)', textTransform:'uppercase', letterSpacing:'.44em', margin:'0 0 14px 0', opacity:0.8 }}>INTRODUCING</p>

          <h1 style={{ fontFamily:'var(--serif)', fontSize:'clamp(88px,8.5vw,124px)', color:'var(--gold)', letterSpacing:'.1em', lineHeight:0.95, margin:'0 0 4px 0', animation:'avaGlow 4s ease-in-out infinite' }}>AVA</h1>

          <div style={{ width:'44px', height:'1px', background:'linear-gradient(to right,var(--gold),transparent)', margin:'20px 0' }} />

          <p style={{ fontFamily:'var(--sans)', fontSize:'16px', color:'var(--warm-foam)', letterSpacing:'.07em', margin:'0 0 6px 0', fontWeight:300, lineHeight:1.5 }}>Your AI operations agent.</p>

          <p style={{ fontFamily:'var(--sans)', fontSize:'11px', color:'var(--ocean)', fontStyle:'italic', letterSpacing:'.06em', margin:'0 0 32px 0' }}>A Rheo AI Product.</p>

          <div className="ava-pills" style={{ display:'flex', flexWrap:'wrap', gap:'7px' }}>
            {['WhatsApp','Booking','Payments','CRM'].map(f => (
              <span key={f} style={{ fontFamily:'var(--sans)', fontSize:'9px', color:'var(--crest)', letterSpacing:'.16em', textTransform:'uppercase', border:'1px solid rgba(69,153,181,.22)', borderRadius:'20px', padding:'4px 11px', background:'rgba(69,153,181,.05)' }}>{f}</span>
            ))}
          </div>
        </div>

        {/* CENTER, phone */}
        <div className="ava-center">
          <PhoneMockup />
        </div>

        {/* RIGHT, workflow */}
        <div className="ava-workflow">
          <WorkflowDiagram />
        </div>

      </div>
    </section>
  );
}
