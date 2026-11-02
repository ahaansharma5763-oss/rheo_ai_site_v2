/* Choreography: scroll drives the ocean, the ocean drives the page. */
(function () {
'use strict';
const $ = (s, r) => (r || document).querySelector(s), $$ = (s, r) => [...(r || document).querySelectorAll(s)];
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const sstep = (a, b, v) => { const t = clamp((v - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };
const W = window.RheoWorld, PAGE = window.PAGE || { stages: [], scenes: [] }, root = document.documentElement;
const STILL = matchMedia('(prefers-reduced-motion: reduce)').matches, TOUCH = matchMedia('(pointer: coarse)').matches;
const SMALLV = () => innerWidth < 900;
(function () { const b = $('#mbtn'), m = $('#mlist'); if (!b) return; b.addEventListener('click', () => { const open = m.hidden; m.hidden = !open; b.setAttribute('aria-expanded', open ? 'true' : 'false'); b.textContent = open ? 'Close' : 'Menu'; root.classList.toggle('locked', open); }); addEventListener('keydown', e => { if (e.key === 'Escape' && !m.hidden) b.click(); }); })();
if (!W) { boundForm(); return; }

/* ---------- smooth scroll ---------- */
let lenis = null;
if (window.Lenis && !STILL && !TOUCH) lenis = new Lenis({ lerp: .085, wheelMultiplier: .92 });
const goTo = (t, off) => { if (lenis) lenis.scrollTo(t, { offset: off || 0, duration: 1.7, easing: x => 1 - Math.pow(1 - x, 3.4) }); else if (typeof t === 'number') scrollTo({ top: t, behavior: STILL ? 'auto' : 'smooth' }); else t.scrollIntoView({ behavior: STILL ? 'auto' : 'smooth' }); };

/* ---------- chapters, rail, nav ---------- */
const secs = $$('.ch'), byId = {}; secs.forEach(s => byId[s.id] = s);
const rail = $('#rail');
if (secs.length > 2) secs.forEach(s => { const b = document.createElement('button'); b.type = 'button'; b.innerHTML = '<span>' + s.dataset.ch + '</span><i></i>'; b.setAttribute('aria-label', 'Go to ' + s.dataset.ch); b.addEventListener('click', () => goTo(s)); rail.appendChild(b); s._rail = b; });
$$('[data-go]').forEach(a => a.addEventListener('click', e => { e.preventDefault(); const t = byId[a.dataset.go]; if (t) goTo(t); }));
$$('#nav [data-page]').forEach(a => { if (a.dataset.page === PAGE.id) a.setAttribute('aria-current', 'page'); });
const tops = {}; let vh = innerHeight;
function measure() { vh = innerHeight; secs.forEach(s => { const r = s.getBoundingClientRect(); tops[s.id] = { t: r.top + scrollY, h: r.height }; }); }
addEventListener('resize', measure); addEventListener('load', measure); measure();
const prog = (id, y) => { const k = tops[id]; if (!k) return -9; return (y - k.t) / Math.max(1, k.h - vh); };
const yOf = (id, f) => { const k = tops[id]; return k.t + f * Math.max(1, k.h - vh); };

/* ---------- which scene is on screen ---------- */
const first = PAGE.first || (PAGE.stages[0] && PAGE.stages[0][1]) || 'hero';
function timeline(y) {
  const st = PAGE.stages;
  for (let i = 0; i < st.length; i++) {
    const a = yOf(st[i][0], st[i][2]), b = yOf(st[i][0], st[i][3]);
    if (y <= b) {
      if (y >= a || i === 0) return { from: st[i][1], to: st[i][1], mix: 0 };
      const p = yOf(st[i - 1][0], st[i - 1][3]);
      return { from: st[i - 1][1], to: st[i][1], mix: clamp((y - p) / Math.max(1, a - p), 0, 1) };
    }
  }
  const l = st[st.length - 1][1]; return { from: l, to: l, mix: 0 };
}

/* ---------- pointer ---------- */
const ptr = { x: innerWidth * .6, y: innerHeight * .5, sx: 0, sy: 0, rx: innerWidth * .6, ry: innerHeight * .5 }, ring = $('#ring');
addEventListener('pointermove', e => {
  ptr.x = e.clientX; ptr.y = e.clientY; document.body.classList.add('moved');
  const hot = e.target.closest && e.target.closest('a,button,label,input,textarea,summary'); ring.classList.toggle('hot', !!hot);
  $$('.panel').forEach(p => { const r = p.getBoundingClientRect(); p.style.setProperty('--mx', (e.clientX - r.left) + 'px'); p.style.setProperty('--my', (e.clientY - r.top) + 'px'); });
}, { passive: true });
if (!TOUCH) $$('.btn').forEach(b => {
  b.addEventListener('pointermove', e => { const r = b.getBoundingClientRect(); b.style.transform = 'translate(' + ((e.clientX - r.left - r.width / 2) * .12) + 'px,' + ((e.clientY - r.top - r.height / 2) * .22) + 'px)'; });
  b.addEventListener('pointerleave', () => { b.style.transform = ''; });
});

/* ---------- ripples: the water answers ---------- */
let ripI = 0, ripClock = 2;
const SEA = { hero: 1, closing: 1, moonhero: 1, beacon: 1 };
function ripple(x, z, amp) { const o = ripI++ % 4 * 4, r = W.S.rip; r[o] = x; r[o + 1] = z; r[o + 2] = W.T(); r[o + 3] = amp; }
addEventListener('pointerdown', e => { if (e.target.closest('a,button,input,textarea,label,summary,#drawer')) return; if (SEA[W.S.to]) { const h = W.ray(e.clientX, e.clientY); if (h) ripple(h[0], h[1], 1.7); } }, { passive: true });

/* ---------- hero signals, one at a time ---------- */
const sig = $('#sig'), sigD = sig && $('.sig-d', sig), sigT = sig && $('.sig-t', sig);
const SIG = [['22 Oct', 'Job ad names their system', 0], ['19 Oct', 'Senior hire announced', 1], ['14 Oct', 'New branch opened', 2]]; let sigI = 0, sigClock = 1.2, sigOn = false;
function scramble(el, to) { if (STILL) { el.textContent = to; return; } const ch = '0123456789'; let n = 0; const iv = setInterval(() => { n++; el.textContent = to.split('').map((c, i) => (c === ' ' || i < n / 2 ? c : (/[0-9]/.test(c) ? ch[Math.floor(Math.random() * 10)] : c))).join(''); if (n > to.length * 2) { el.textContent = to; clearInterval(iv); } }, 34); }

/* ---------- the funnel: whole market, serviceable, segments ---------- */
const fnRows = $$('#funnel .fn'), scan = $('.scan'), scanL = $('#scanl'), segLabs = $$('.seglab'); let fnLast = -1;
const fmt = n => n.toLocaleString('en-US');
function funnel(y) {
  if (!fnRows.length) return; const p = prog('map', y);
  const s1 = clamp((p - .12) / .3, 0, 1), s2 = clamp((p - .5) / .34, 0, 1), inFirst = s1 > .002 && s1 < .998, inSecond = s2 > .002 && s2 < .998;
  const at = inSecond ? s2 : s1; if (scan) { scan.style.setProperty('--scan', (at * 100).toFixed(2) + '%'); scan.classList.toggle('on', inFirst || inSecond); if (scanL) { const t = inSecond ? 'Sorting into segments' : 'AI agent reading websites'; if (scanL.textContent !== t) scanL.textContent = t; } }
  const stage = p < .42 ? (s1 > .5 ? 1 : 0) : p < .84 ? (s2 > .5 ? 2 : 1) : 2; const liveN = 6400 - (6400 - 1850) * sstep(0, 1, s1);
  fnRows.forEach((r, i) => { r.classList.toggle('on', i === stage); r.classList.toggle('done', i < stage); });
  const n0 = $('.fn-n', fnRows[1]); if (n0) n0.textContent = s1 <= 0 ? '?' : s1 >= 1 ? '1,850' : fmt(Math.round(liveN / 50) * 50);
  const lab = sstep(.72, .84, p) * (1 - sstep(1.02, 1.12, p));
  segLabs.forEach(el => { const q = W.project([+el.dataset.x, 0, +el.dataset.z]); el.style.transform = 'translate(' + q.x.toFixed(0) + 'px,' + q.y.toFixed(0) + 'px) translate(-50%,-50%)'; el.style.opacity = SMALLV() ? 0 : lab.toFixed(3); });
}

/* ---------- signals with detail ---------- */
const rows = $$('#ledger .row'), svg = $('#leaders'), NS = 'http://www.w3.org/2000/svg', sigd = $('#sigd');
const SD = [
  ['"ERP administrator. Move us from Business One to Odoo."', 'A system change is on the table, and someone owns the budget.', 'Finance director', '5 Nov', 30, 'Role filled', 72],
  ['"We welcome our new Head of Operations."', 'New leaders often review suppliers early.', 'Head of Operations', '9 Nov', 42, 'Early next year', 88],
  ['"Our second branch opens in Abu Dhabi."', 'A new site needs systems and suppliers set up.', 'Managing director', '12 Nov', 58, 'Branch opens', 64],
  ['"First IT manager. Build the function from scratch."', 'They are building something that did not exist before.', 'General manager', '16 Nov', 70, 'Role filled', 52],
  ['"Moving into Saudi next year."', 'Growth plans need capacity they do not have yet.', 'Managing director', '20 Nov', 80, 'Move happens', 96]
];
const leaders = rows.map(() => { const g = document.createElementNS(NS, 'g'), l = document.createElementNS(NS, 'path'), c = document.createElementNS(NS, 'circle'); c.setAttribute('r', 4); g.append(l, c); svg.appendChild(g); return { g, l, c }; });
let hotRow = -1, sigShown = -1;
rows.forEach((r, i) => { r.addEventListener('pointerenter', () => hotRow = i); r.addEventListener('pointerleave', () => hotRow = -1); r.addEventListener('focus', () => hotRow = i); r.addEventListener('blur', () => hotRow = -1); const st = $('.st', r); if (st) for (let k = 0; k < 3; k++) { const d = document.createElement('i'); if (k < +st.dataset.s) d.className = 'f'; st.appendChild(d); } });
function showSig(i) { if (i === sigShown || !sigd) return; sigShown = i; const d = SD[i]; sigd.classList.remove('in'); void sigd.offsetWidth; sigd.classList.add('in'); $('.sd-q', sigd).textContent = d[0]; $('.sd-w', sigd).textContent = d[1]; $('.sd-s', sigd).textContent = d[2] + '. Our judgement.'; $('.sd-c1', sigd).textContent = d[3]; $('.sd-b1', sigd).style.setProperty('--w', d[4] + '%'); $('.sd-c2', sigd).textContent = d[5]; $('.sd-b2', sigd).style.setProperty('--w', d[6] + '%'); rows.forEach((r, k) => r.classList.toggle('act', k === i)); }
if (rows.length) showSig(0);

/* ---------- the typed line ---------- */
const typed = $('#typed'), caret = $('#caret'), wok = $('#wok'), writer = $('#writer'), LINE = typed ? typed.textContent : ''; const wr = { state: 0, n: 0, clock: 0 };
function writerTick(y, dt) {
  if (!typed || STILL) return; const p = prog('line', y), on = p > -.3 && p < 1.15;
  if (!on) { if (wr.state) { wr.state = 0; typed.textContent = LINE; writer.classList.remove('beam', 'ok', 'src'); caret.classList.remove('on'); wok.classList.remove('on'); } return; }
  if (wr.state === 0) { if (p > -.12) { wr.state = 1; wr.clock = 0; typed.textContent = ''; wr.n = 0; writer.classList.add('src'); } return; }
  wr.clock += dt;
  if (wr.state === 1 && wr.clock > .7) { wr.state = 2; wr.clock = 0; writer.classList.add('beam'); }
  if (wr.state === 2 && wr.clock > .55) { wr.state = 3; wr.clock = 0; caret.classList.add('on'); }
  if (wr.state === 3) { const n = Math.min(LINE.length, Math.floor(wr.clock * 34)); if (n !== wr.n) { typed.textContent = LINE.slice(0, n); wr.n = n; } if (n >= LINE.length) { wr.state = 4; wr.clock = 0; } }
  if (wr.state === 4 && wr.clock > .3) { wr.state = 5; caret.classList.remove('on'); wok.classList.add('on'); writer.classList.add('ok'); }
}

/* ---------- the reply desk ---------- */
const RP = [
  { q: 'Send me times for next week.', l: 0, d: 'Tuesday 11:00 or Wednesday 14:00 Dubai time?', go: 'Approve' },
  { q: 'Do you work with distributors?', l: 1, d: 'Yes, we do. Thursday 11:00 or Friday 10:30 Dubai time?', go: 'Approve' },
  { q: 'Try me in January.', l: 2, d: 'Noted. We come back in January.', go: 'Follow up: January' },
  { q: 'Speak to our CFO instead.', l: 3, d: 'Thank you. We will write to them.', go: 'Approve' },
  { q: 'Please remove me.', l: 4, d: 'Done. You will not hear from us again.', go: 'Removed' }
];
const card = $('#rcard'), laneEls = $$('#lanes span'), rp = { i: -1, clock: 0, phase: 0 }; let rQ, rD, rGo; if (card) { rQ = $('.r-q', card); rD = $('.r-d', card); rGo = $('.r-go', card); }
function rpShow(i) { const r = RP[i]; rQ.textContent = '"' + r.q + '"'; rD.textContent = r.d; rGo.textContent = r.go; card.classList.remove('sorted', 'approved'); laneEls.forEach(e => e.classList.remove('on')); card.style.setProperty('--y', '0px'); }
if (card) rpShow(0);
function replyTick(y, dt) {
  if (!card || STILL) return; const p = prog('replies', y); if (p < -.25 || p > 1.05) return; rp.clock += dt;
  if (rp.i < 0) { rp.i = 0; rpShow(0); rp.clock = 0; rp.phase = 0; }
  if (rp.phase === 0 && rp.clock > .9) { rp.phase = 1; const r = RP[rp.i]; card.style.setProperty('--y', (W.LANES[r.l] * vh * .5).toFixed(0) + 'px'); card.classList.add('sorted'); if (laneEls[r.l]) laneEls[r.l].classList.add('on'); rp.clock = 0; }
  else if (rp.phase === 1 && rp.clock > 1.5) { rp.phase = 2; card.classList.add('approved'); rp.clock = 0; }
  else if (rp.phase === 2 && rp.clock > 1.3) { rp.i = (rp.i + 1) % RP.length; rpShow(rp.i); rp.phase = 0; rp.clock = 0; }
}

/* ---------- agents: scroll turns one into the next ---------- */
const AG = ['m0', 'school', 'org', 'thali'], tabs = $$('.tabs [role=tab]'), aps = $$('.ap'); let agI = 0;
function agSet(i) { if (i === agI) return; agI = i; tabs.forEach((t, k) => { t.setAttribute('aria-selected', k === i ? 'true' : 'false'); t.tabIndex = k === i ? 0 : -1; }); aps.forEach((a, k) => a.classList.toggle('on', k === i)); }
tabs.forEach((t, i) => t.addEventListener('click', () => { const st = PAGE.stages.find(s => s[1] === AG[i]); if (st) goTo(yOf(st[0], (st[2] + st[3]) / 2)); }));
function agents(y) {
  if (!tabs.length) return; const S = W.S; const cur = S.mix > .5 ? S.to : S.from, i = AG.indexOf(cur); if (i >= 0) agSet(i);
  const st = PAGE.stages.find(s => s[1] === cur && AG.includes(cur)); if (st) { const p = prog(st[0], y), loc = (p - st[2]) / Math.max(.01, st[3] - st[2]); S.explode = sstep(-.05, .85, loc) * (1 - sstep(1.0, 1.25, loc)); } 
}

/* ---------- six steps on a route ---------- */
const stepEls = $$('.step'), nodeEls = $$('.nodes b'); const NODES = [[-.84, -.28], [-.5, .3], [-.16, -.2], [.16, .32], [.5, -.16], [.84, .26]];
function steps(y) {
  if (!stepEls.length) return; const p = prog('steps', y), q = clamp((p - .02) / .94, 0, 1), i = Math.min(5, Math.floor(q * 6));
  stepEls.forEach((s, k) => s.classList.toggle('on', k === i)); W.S.route = .08 + (.92 - .08) * sstep(0, 1, q);
  const n = W.narrow(), hw = W.hw(), hh = W.hh(); nodeEls.forEach((b, k) => { const c = W.project([NODES[k][0] * hw * .98, NODES[k][1] * hh * (n ? .36 : .62) + hh * (n ? .3 : .16), 0]); b.style.transform = 'translate(' + c.x.toFixed(0) + 'px,' + c.y.toFixed(0) + 'px) translate(-50%,-50%)'; b.classList.toggle('on', k <= i); b.classList.toggle('cur', k === i); });
  const nd = $('.nodes'); if (nd) nd.style.opacity = (W.S.to === 'route' && W.S.from === 'route') ? 1 : (W.S.to === 'route' ? sstep(.7, 1, W.S.mix) : W.S.from === 'route' ? 1 - sstep(0, .25, W.S.mix) : 0);
}

/* ---------- small things: guard label, wheel tag, tide, why rows, twelve, day ---------- */
const twItems = $$('#twlist li'), countN = $('#countn'), countEl = $('#count'), dayLabels = $$('#daylabels li'), dayLine = $('#dayline'), whyRows = $$('.tr:not(.th)'), gcore = $('#gcore'), wtag = $('#wtag'), tideEls = $$('#tidel li'); let cntLast = -1;
function chart(y) {
  if (twItems.length) { const q = clamp((prog('twelve', y) - .02) / .82, 0, 1), c = Math.max(1, Math.ceil(q * 12)); W.S.twelve = q; if (c !== cntLast) { countN.textContent = c; twItems.forEach((li, i) => li.classList.toggle('on', i < c)); cntLast = c; } }
  if (dayLabels.length) { const qd = clamp((prog('day', y) - .02) / .84, 0, 1); W.S.day = qd * .82; const stops = [0, .29, .61, .81]; dayLabels.forEach((li, i) => li.classList.toggle('on', W.S.day > stops[i] + .001)); dayLine.classList.toggle('on', qd > .96); }
  for (const id of ['why', 'wrong']) { if (!byId[id]) continue; const rs = $$('.tr:not(.th)', byId[id]), on = clamp((prog(id, y) + .35) / .6, 0, 1) * rs.length; rs.forEach((r, i) => r.classList.toggle('on', i < on)); }
  if (rows.length) { const pR = prog('reason', y), lit = clamp((pR + .05) / .7, 0, 1) * rows.length; rows.forEach((r, i) => r.classList.toggle('lit', i < lit)); const auto = Math.min(rows.length - 1, Math.floor(clamp((pR - .02) / .92, 0, .999) * rows.length)); showSig(hotRow >= 0 ? hotRow : auto); }
  if (tideEls.length) { const q = clamp((prog('when', y) + .05) / .9, 0, 1); W.S.tide = .02 + q * .98; tideEls.forEach((li, i) => li.classList.toggle('on', q >= (i + .1) / 7)); }
}
function overlays(y, T) {
  const tl = W.S, small = SMALLV(), heroOn = tl.to === 'hero' && tl.from === 'hero';
  if (sig) { if (heroOn && y < vh * .4 && !STILL && !intro.on) { sigClock -= 1 / 60; if (sigClock <= 0) { sigOn = !sigOn; if (sigOn) { sigI = (sigI + 1) % 3; scramble(sigD, SIG[sigI][0]); sigT.textContent = SIG[sigI][1]; sigClock = 3.4; } else sigClock = .9; } const s = W.SIGNALS[SIG[sigI][2]], h = W.seaJS(s[0], s[1], T), p = W.project([s[0], h, s[1]]); sig.style.transform = 'translate(' + p.x.toFixed(1) + 'px,' + p.y.toFixed(1) + 'px)'; sig.classList.toggle('on', sigOn); } else sig.classList.remove('on'); }
  if (rows.length) { const inR = tl.to === 'reason' || tl.from === 'reason', o = inR ? (tl.to === 'reason' && tl.from === 'reason' ? 1 : (tl.to === 'reason' ? sstep(.7, 1, tl.mix) : 1 - sstep(0, .25, tl.mix))) : 0; svg.style.opacity = o.toFixed(3);
    if (o > .01 && !small) rows.forEach((r, i) => { const a = W.ANCH[+r.dataset.a], p = W.project([a[0], 1.2, a[1]]), b = r.getBoundingClientRect(), x0 = b.left, y0 = b.top + b.height / 2, mid = (p.x + x0) / 2; leaders[i].l.setAttribute('d', 'M' + x0.toFixed(1) + ' ' + y0.toFixed(1) + ' C' + mid.toFixed(1) + ' ' + y0.toFixed(1) + ' ' + mid.toFixed(1) + ' ' + p.y.toFixed(1) + ' ' + p.x.toFixed(1) + ' ' + p.y.toFixed(1)); leaders[i].c.setAttribute('cx', p.x.toFixed(1)); leaders[i].c.setAttribute('cy', p.y.toFixed(1)); leaders[i].g.setAttribute('class', (r.classList.contains('lit') ? 'lit' : '') + (sigShown === i ? ' hot' : '')); }); }
  if (countEl && !small) { const hh = W.hh(), hw = W.hw(), n = W.narrow(), c = W.project([W.dialX(), W.dialY(), 0]); countEl.style.transform = 'translate(' + c.x.toFixed(1) + 'px,' + c.y.toFixed(1) + 'px) translate(-50%,-50%)'; countEl.style.opacity = (tl.from === 'dial' && tl.to === 'dial') ? 1 : tl.to === 'dial' ? sstep(.6, 1, tl.mix).toFixed(3) : tl.from === 'dial' ? (1 - sstep(0, .3, tl.mix)).toFixed(3) : 0; }
  if (gcore) { const hh = W.hh(), hw = W.hw(), n = W.narrow(), c = W.project([n ? 0 : -hw * .4, n ? -hh * .42 : -hh * .02, 0]); gcore.style.transform = 'translate(' + c.x.toFixed(1) + 'px,' + c.y.toFixed(1) + 'px) translate(-50%,-50%)'; gcore.style.opacity = tl.to === 'guard' && tl.from === 'guard' ? 1 : tl.to === 'guard' ? sstep(.6, 1, tl.mix).toFixed(3) : tl.from === 'guard' ? (1 - sstep(0, .3, tl.mix)).toFixed(3) : 0; }
  if (wtag) { const hh = W.hh(), hw = W.hw(), n = W.narrow(), s = hh * (n ? .03 : .046), c = W.project([(n ? 0 : hw * .56) - 19.5 * s, (n ? -hh * .42 : -hh * .02) + 7.5 * s, 8 * s]); wtag.style.transform = 'translate(' + c.x.toFixed(0) + 'px,' + c.y.toFixed(0) + 'px)'; wtag.style.opacity = tl.to === 'wheel' && tl.from === 'wheel' && !n ? 1 : 0; }
}

/* ---------- per-section look ---------- */
const STICK = secs.map(s => ({ s, el: $('.stick', s), op: -1 }));
function applySection(y) {
  const small = SMALLV();
  STICK.forEach(o => {
    const k = tops[o.s.id], isFirst = o.s === secs[0], last = o.s === secs[secs.length - 1], enter = isFirst ? 1 : sstep(k.t - vh * .62, k.t - vh * .06, y), bottom = k.t + k.h - vh, exit = last ? 0 : sstep(bottom + vh * .02, bottom + vh * .44, y);
    const op = small ? 1 : enter * (1 - exit), ty = small ? 0 : (1 - enter) * 30 - exit * 26;
    if (Math.abs(op - o.op) > .002) { o.el.style.setProperty('--op', op.toFixed(3)); o.el.style.setProperty('--ty', ty.toFixed(1) + 'px'); o.op = op; }
  });
  const active = secs.reduce((best, s) => (tops[s.id].t <= y + vh * .5 ? s : best), secs[0]);
  if (active !== applySection._a) { if (applySection._a && applySection._a._rail) applySection._a._rail.classList.remove('on'); if (active._rail) active._rail.classList.add('on'); applySection._a = active; root.dataset.ch = active.id; }
}

const bgInk = [5, 14, 29], bgFoam = [244, 237, 223]; let smoothY = scrollY; const intro = { on: true, t: 0 }; let foamLast = -1;
const drawer = $('#drawer');
window.__beforeFrame = function (dt, T) {
  if (lenis) lenis.raf(performance.now());
  const y = scrollY; smoothY += (y - smoothY) * (STILL ? 1 : .14); const v = smoothY, tl = timeline(v);
  if (intro.on) {
    if (y > vh * .3 || STILL) intro.on = false;
    else if (W.isReady(first)) { intro.t = Math.min(1, intro.t + dt / 2.6); W.S.from = 'horizon'; W.S.to = first; W.S.mix = intro.t; if (intro.t >= 1) intro.on = false; }
    else { W.S.from = 'horizon'; W.S.to = 'horizon'; W.S.mix = 0; }
  }
  if (!intro.on && W.isReady(tl.from) && W.isReady(tl.to)) { W.S.from = tl.from; W.S.to = tl.to; W.S.mix = tl.mix; }
  ptr.sx += (ptr.x / innerWidth - .5 - ptr.sx) * .05; ptr.sy += (ptr.y / innerHeight - .5 - ptr.sy) * .05; W.S.mx = ptr.sx; W.S.my = ptr.sy;
  const sc = W.S.to, seaOn = !!SEA[sc], chartOn = sc === 'map' || sc === 'fit' || sc === 'segs' || sc === 'reason' || sc === 'ten' || sc === 'tenDark';
  W.S.camShift = TOUCH ? [0, 0] : seaOn ? [ptr.sx * 2.6, -ptr.sy * 1.3] : chartOn ? [ptr.sx * 1.6, -ptr.sy * .7] : [0, 0];
  if (seaOn && !TOUCH) { const r = W.ray(ptr.x, ptr.y); W.S.mouse = r || [999, 999]; } else W.S.mouse = [999, 999];
  if (seaOn && !STILL) { ripClock -= dt; if (ripClock <= 0) { ripClock = 2.6 + Math.random() * 2; ripple(-24 + Math.random() * 48, -34 + Math.random() * 38, .85); } }
  const e = W.S.mix * W.S.mix * (3 - 2 * W.S.mix), fa = W.scenes[W.S.from].foam ? 1 : 0, fb = W.scenes[W.S.to].foam ? 1 : 0, foam = fa + (fb - fa) * e;
  if (foam !== foamLast) { const c = bgInk.map((b, i) => Math.round(b + (bgFoam[i] - b) * foam)); document.body.style.backgroundColor = 'rgb(' + c.join(',') + ')'; W.S.bg = c.map(x => x / 255); root.classList.toggle('on-foam', foam > .55); foamLast = foam; }
  const quiet = !SMALLV() ? 1 : ['dial', 'bar', 'tide'].includes(sc) ? .13 : ['rivers', 'riversLow'].includes(sc) ? .3 : ['strata', 'map', 'fit', 'segs', 'reason', 'm0', 'school', 'org', 'thali', 'route', 'guard'].includes(sc) ? .45 : 1, drOpen = drawer && !drawer.classList.contains('inline') && !drawer.hidden;
  W.S.calm += ((drOpen ? .3 : 1) - W.S.calm) * .04; W.S.dim += ((drOpen ? .55 : quiet) - W.S.dim) * .05;
  applySection(v); funnel(v); chart(v); steps(v); agents(v); writerTick(v, dt); replyTick(v, dt);
  ptr.rx += (ptr.x - ptr.rx) * .16; ptr.ry += (ptr.y - ptr.ry) * .16; ring.style.transform = 'translate(' + ptr.rx.toFixed(1) + 'px,' + ptr.ry.toFixed(1) + 'px)';
};
window.__afterFrame = T => overlays(smoothY, T);

/* ---------- entries on the free list ---------- */
const etabs = $$('.etabs [role=tab]'), ents = $$('.ent');
etabs.forEach((t, i) => t.addEventListener('click', () => { etabs.forEach((x, k) => x.setAttribute('aria-selected', k === i ? 'true' : 'false')); ents.forEach((x, k) => x.classList.toggle('on', k === i)); }));

boundForm();
window.__seek = function (id, p) { const k = tops[id] || tops[secs[0].id]; const y = k.t + (p || 0) * Math.max(1, k.h - vh); if (lenis) lenis.scrollTo(y, { immediate: true, force: true }); scrollTo(0, y); smoothY = y; intro.on = false; };
if (STILL) root.classList.add('still');

/* ---------- the free list form ---------- */
function boundForm() {
  const drawer = $('#drawer'), form = $('#form'); if (!form) return;
  const scrim = $('#scrim'), done = $('#done'), steps = $$('fieldset', form), next = $('#next'), back = $('#back'), err = $('#err'), stepn = $('#stepn'), tenEl = $('#ten'), inline = drawer.classList.contains('inline');
  let step = 0, lastFocus = null; const dots = [];
  for (let i = 0; i < 10; i++) { const d = document.createElement('i'); d.style.setProperty('--i', i); tenEl.appendChild(d); dots.push(d); }
  const LIGHT = [0, 3, 6, 10], lenisRef = () => (typeof lenis !== 'undefined' ? lenis : null);
  const light = n => dots.forEach((d, i) => d.classList.toggle('on', i < n));
  function open() { if (inline) { drawer.scrollIntoView({ behavior: 'smooth', block: 'center' }); const f = $('input,textarea', steps[step]); if (f) f.focus({ preventScroll: true }); return; } lastFocus = document.activeElement; drawer.hidden = false; scrim.hidden = false; requestAnimationFrame(() => { drawer.classList.add('open'); scrim.classList.add('open'); }); if (lenisRef()) lenisRef().stop(); root.classList.add('locked'); setTimeout(() => { const f = $('input,textarea', steps[step]); if (f && !TOUCH) f.focus(); }, 500); }
  function close() { drawer.classList.remove('open'); scrim.classList.remove('open'); root.classList.remove('locked'); if (lenisRef()) lenisRef().start(); setTimeout(() => { drawer.hidden = true; scrim.hidden = true; if (lastFocus) lastFocus.focus(); }, STILL ? 0 : 520); }
  $$('[data-open]').forEach(b => b.addEventListener('click', open));
  if (!inline) { $('#drx').addEventListener('click', close); scrim.addEventListener('click', close); addEventListener('keydown', e => { if (e.key === 'Escape' && !drawer.hidden) close(); }); }
  const NEXT = ['Next: your market', 'Next: where we send it', 'Get my free list'];
  function show(i) { step = i; steps.forEach((s, k) => s.hidden = k !== i); stepn.textContent = 'Step ' + (i + 1) + ' of 3'; next.textContent = NEXT[i]; back.hidden = i === 0; err.hidden = true; const f = $('input,textarea', steps[i]); if (f && !TOUCH && !inline) f.focus(); }
  function valid(i) { let ok = true; $$('.bad', steps[i]).forEach(x => x.classList.remove('bad')); $$('[required]', steps[i]).forEach(f => { const v = f.value.trim(), bad = !v || (f.type === 'email' && !/^[^\s@<>,;"()]{1,64}@[^\s@<>,;"()]+\.[^\s@<>,;"()]{2,}$/.test(v)) || (f.name === 'website' && !/^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,}(\/\S*)?$/i.test(v)); if (bad) { f.classList.add('bad'); ok = false; } }); { const p = $('[name=phone]', steps[i]); if (p && p.value.trim() && !/^\+?[0-9 ()-]{7,24}$/.test(p.value.trim())) { p.classList.add('bad'); ok = false; } } if (i === 1) { if (!$('#c-mkt input:checked')) { $('#c-mkt').classList.add('bad'); ok = false; } if (!$('#c-deal input:checked')) { $('#c-deal').classList.add('bad'); ok = false; } } return ok; }
  $('#c-deal').addEventListener('change', () => { const v = $('#c-deal input:checked').value; $('#fitnote').hidden = !(v.startsWith('Under') || v.startsWith('AED 10,000')); });
  const ERR0 = err.textContent, FAIL = "That didn't reach us. Please try again, or write to ahaan@rheoai.co.in.";
  function utm() { const out = {}; let saved = {}; try { saved = JSON.parse(sessionStorage.getItem('rheo_utm') || '{}'); } catch (x) {} new URLSearchParams(location.search).forEach((v, k) => { if (/^utm_/.test(k)) saved[k] = v; }); try { sessionStorage.setItem('rheo_utm', JSON.stringify(saved)); } catch (x) {} for (const k in saved) out[k] = saved[k]; return out; }
  utm();
  function finish() { light(LIGHT[3]); $('#doneh').textContent = replyLine(); form.hidden = true; done.hidden = false; done.focus(); }
  function send() {
    if (!window.__LIVE__) { finish(); return; }
    next.disabled = true; next.textContent = 'Sending...';
    const val = n => { const f = $('[name=' + n + ']', form); return f ? f.value.trim() : ''; };
    const body = { website: val('website'), sells: $('#f-sell').value.trim(), buyers: $('#f-buy').value.trim(), name: val('name'), email: val('email'), phone: val('phone'), company_url: val('company_url'), markets: $$('#c-mkt input:checked').map(x => x.value), deal: ($('#c-deal input:checked') || {}).value || '', utm: utm() };
    const failed = m => { next.disabled = false; next.textContent = NEXT[2]; err.textContent = m || FAIL; err.hidden = false; };
    fetch('/api/forecast', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      .then(r => r.json().catch(() => ({})).then(j => { if (r.ok && j.ok === true) finish(); else failed(r.status === 400 && j.message ? j.message : ''); }))
      .catch(() => failed());
  }
  form.addEventListener('submit', e => { e.preventDefault(); err.textContent = ERR0; if (!valid(step)) { err.hidden = false; const b = $('input.bad, textarea.bad', steps[step]); if (b) b.focus(); return; } if (step < 2) { light(LIGHT[step + 1]); show(step + 1); return; } send(); });
  back.addEventListener('click', () => { show(step - 1); light(LIGHT[step]); });
  function replyLine() { const fmt = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Dubai', weekday: 'long', hour: 'numeric', hour12: false }), parts = fmt.formatToParts(new Date()), wd = parts.find(p => p.type === 'weekday').value, hr = +parts.find(p => p.type === 'hour').value, days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], d = days.indexOf(wd), work = d < 5; if (work && hr >= 8 && hr < 18) return 'We reply from ahaan@rheoai.co.in within 2 working hours.'; let n = d, g = 0; if (!(work && hr < 8)) { do { n = (n + 1) % 7; g++; } while (n > 4 && g < 8); } return 'We reply from ahaan@rheoai.co.in by 10:00 UAE time on ' + days[n] + '.'; }
}
})();
