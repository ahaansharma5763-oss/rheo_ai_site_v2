/* The ocean. One set of points, every scene on the page. */
(function () {
'use strict';
const cv = document.getElementById('world');
const gl = cv.getContext('webgl2', { antialias: false, alpha: false, powerPreference: 'high-performance' });
const STILL = matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!gl) { document.documentElement.classList.add('no-gl'); window.RheoWorld = null; return; }

const TOUCH = matchMedia('(pointer: coarse)').matches;
const SMALL = Math.min(innerWidth, innerHeight) < 620 || TOUCH;
const PAGE = window.PAGE || { scenes: ['hero'] };
const N = SMALL ? 52000 : 150000;
let drawN = N;

const hex = h => [parseInt(h.slice(1, 3), 16) / 255, parseInt(h.slice(3, 5), 16) / 255, parseInt(h.slice(5, 7), 16) / 255];
const C = { mist: hex('#8293b3'), ink: hex('#050E1D'), navy: hex('#0B2147'), n2: hex('#142a54'), n3: hex('#1a3a74'), prus: hex('#1E4080'), ocean: hex('#2E74AC'), crest: hex('#3FAEDE'), blue: hex('#8FDCF8'), foam: hex('#F4EDDF'), cream: hex('#C6BCA3'), gold: hex('#D4AF5E'), hi: hex('#FFDF8F') };
const mixc = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const sstep = (a, b, v) => { const t = clamp((v - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };

/* ---------- shaders ---------- */
const VS = `#version 300 es
precision highp float;
layout(location=0) in vec3 aPA; layout(location=1) in vec4 aCA; layout(location=2) in vec2 aSA;
layout(location=3) in vec3 aPB; layout(location=4) in vec4 aCB; layout(location=5) in vec2 aSB;
layout(location=6) in vec4 aR;
uniform mat4 uVP,uXA,uXB; uniform vec4 uFA,uFB;
uniform float uT,uMix,uSpan,uScat,uPx,uDpr,uDim,uFogN,uFogF,uCalm,uSwA,uSwB,uGlow,uCut;
uniform vec3 uDelay,uWave; uniform vec2 uMouse; uniform vec4 uMoon; uniform vec4 uRip[4];
out vec4 vC;
float sea(vec2 p,float t){
  float h=sin(p.x*.17+t*.5)*.95+sin(p.y*.23-t*.62+p.x*.05)*1.05+sin((p.x+p.y)*.41+t*.85)*.38+sin((p.x-p.y*1.3)*.83-t*1.2)*.17;
  return h;
}
vec3 fx(vec3 p,float m,vec4 F,vec4 r,float t,inout float sh,inout float a){
  if(m>1.5&&m<3.5){ p.x=p.x*uWave.z+uWave.x; p.y=p.y*uWave.z+uWave.y; }
  if(F.x>0.&&m<1.5){
    float h=sea(p.xz,t)*F.x*uCalm; float d=distance(p.xz,uMouse);
    h+=sin(d*1.05-t*3.)*exp(-d*d*.011)*1.15*F.x;
    for(int i=0;i<4;i++){ float age=t-uRip[i].z; if(age>0.&&age<9.){ float dr=distance(p.xz,uRip[i].xy),front=age*7.5; h+=sin((dr-front)*.85)*exp(-pow((dr-front)*.17,2.))*exp(-age*.42)*uRip[i].w*F.x; } }
    p.y+=h; sh=h;
  }
  if(m>1.5&&m<2.5){
    float c=smoothstep(.35,1.,p.y/(24.*uWave.z+.001));
    p.x+=(sin(t*.34)*.55+sin(t*.71+p.y*.22)*.14)*c*uWave.z;
    p.y+=sin(t*.45+p.x*.1)*.2*c*uWave.z;
    p.z+=sin(t*.5+p.x*.2)*.3*c;
  }
  if(m>2.5&&m<3.5){
    float f=fract(t*(.05+.09*r.x)+r.y);
    p+=vec3(-(.6+r.z*4.5)*f,(.5+r.w*3.4)*f-4.2*f*f,(r.x-.5)*3.*f)*uWave.z;
    a*=smoothstep(0.,.08,f)*(1.-f)*(1.-f);
  }
  if(F.y!=0.){
    p.x=mod(p.x+1.25+t*F.y*(.55+r.x*.9),2.5)-1.25;
    p.y+=sin(p.x*7.+t*.7+r.y*6.28)*.007+sin(p.x*3.-t*.4)*.012;
    a*=smoothstep(1.2,.92,abs(p.x))*smoothstep(uCut-.3,uCut,p.x);
  }
  if(F.z!=0.){
    p.z=mod(p.z+150.+t*F.z*(.5+r.x),190.)-150.;
    a*=smoothstep(40.,18.,p.z)*smoothstep(-150.,-90.,p.z);
  }
  if(m>=10.) p.y+=(m-10.)*F.w;
  if(m>6.5&&m<7.5){ float ca=cos(t*.16),sa=sin(t*.16); p=vec3(ca*p.x-sa*p.y,sa*p.x+ca*p.y,p.z); }
  if(m>7.5&&m<8.5){ vec2 hc=vec2(-15.5,1.); vec2 q=p.xy-hc; float ca=cos(-t*.42),sa=sin(-t*.42); p.xy=hc+vec2(ca*q.x-sa*q.y,sa*q.x+ca*q.y); }
  if(m>8.5&&m<9.5){ p.y=mod(p.y+22.+t*(.5+r.x*1.1),17.)-22.; a*=smoothstep(-22.,-19.,p.y)*smoothstep(-5.,-7.5,p.y); }
  if(m>3.5&&m<4.5){ float ca=cos(t*.035),sa=sin(t*.035); vec3 q=vec3(ca*p.x+sa*p.z,p.y,-sa*p.x+ca*p.z); vec3 n=q/15.; a*=step(0.,n.z)*(.42+.58*smoothstep(-.1,.9,dot(n,normalize(vec3(-.62,.42,.66))))); p=q+uMoon.xyz; p.y+=uMoon.w; }
  return p;
}
void main(){
  float t=uT,shA=0.,shB=0.,aA=aCA.a,aB=aCB.a;
  vec3 pa=(uXA*vec4(fx(aPA,aSA.y,uFA,aR,t,shA,aA),1.)).xyz;
  vec3 pb=(uXB*vec4(fx(aPB,aSB.y,uFB,aR,t,shB,aB),1.)).xyz;
  float sw=clamp(aPA.x/92.+.5,0.,1.),rad=clamp(length(aPA.xz)/70.,0.,1.);
  float w=clamp(dot(uDelay,vec3(aR.x,sw,rad)),0.,1.);
  float e=smoothstep(w*(1.-uSpan),w*(1.-uSpan)+uSpan,uMix);
  vec3 p=mix(pa,pb,e);
  float arc=sin(e*3.14159);
  p+=(aR.xyz-.5)*uScat*arc;
  p.y+=(aR.w-.35)*uScat*.35*arc;
  gl_Position=uVP*vec4(p,1.);
  float dz=gl_Position.w;
  vec3 c=mix(aCA.rgb,aCB.rgb,e);
  float a=mix(aA,aB,e),sh=mix(shA,shB,e),m=e<.5?aSA.y:aSB.y;
  float s=mix(aSA.x,aSB.x,e);
  if(sh!=0.){
    c=mix(c,vec3(.56,.86,.97),smoothstep(1.,2.5,sh)*.62);
    c=mix(c,vec3(.96,.93,.87),smoothstep(2.3,3.4,sh)*.34);
    c*=.55+.45*smoothstep(-2.4,.8,sh);
  }
  if(m>.5&&m<1.5){ float tw=.5+.5*sin(t*1.5+aR.x*6.28); a*=.45+.55*tw; s*=1.+.7*tw*uGlow; }
  float sweep=e<.5?uSwA:uSwB;
  if(sweep>=0.){
    if(m>4.5&&m<5.5){ vec3 q=e<.5?aPA:aPB; float ang=fract(atan(q.x,q.y)/6.28318+1.);
      if(ang<sweep){ c=vec3(.769,.635,.353); a=min(.72,a*.8); s*=1.08; } else { a*=.3; } }
    if(m>5.5&&m<6.5){ vec3 q=e<.5?aPA:aPB; float xn=q.x*.5+.5; a*=xn<sweep?1.:.05; }
  }
  a*=1.-smoothstep(uFogN,uFogF,dz);
  a*=uDim;
  gl_PointSize=clamp(s*uPx/dz,uDpr*.9,70.*uDpr);
  vC=vec4(c,a);
}`;
const FS = `#version 300 es
precision mediump float; in vec4 vC; out vec4 o; uniform float uAdd;
void main(){ float r=length(gl_PointCoord-.5); float a=smoothstep(.5,.2,r)*vC.a; if(a<.004)discard; o=vec4(vC.rgb*a,a*(1.-uAdd)); }`;
function sh(type, src) { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s)); return s; }
const prog = gl.createProgram(); gl.attachShader(prog, sh(gl.VERTEX_SHADER, VS)); gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FS)); gl.linkProgram(prog);
if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(prog));
gl.useProgram(prog);
const U = {}; ['uVP', 'uXA', 'uXB', 'uFA', 'uFB', 'uT', 'uMix', 'uSpan', 'uScat', 'uPx', 'uDpr', 'uDim', 'uFogN', 'uFogF', 'uCalm', 'uSwA', 'uSwB', 'uGlow', 'uDelay', 'uWave', 'uMouse', 'uMoon', 'uAdd', 'uCut', 'uRip'].forEach(n => U[n] = gl.getUniformLocation(prog, n));
gl.enable(gl.BLEND); gl.blendFuncSeparate(gl.ONE, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA); gl.disable(gl.DEPTH_TEST); gl.clearColor(5 / 255, 14 / 255, 29 / 255, 1);
const vao = gl.createVertexArray(); gl.bindVertexArray(vao);
const rnd = new Float32Array(N * 4); for (let i = 0; i < rnd.length; i++) rnd[i] = Math.random();
const rb = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, rb); gl.bufferData(gl.ARRAY_BUFFER, rnd, gl.STATIC_DRAW);
gl.enableVertexAttribArray(6); gl.vertexAttribPointer(6, 4, gl.FLOAT, false, 0, 0);
for (let i = 0; i < 6; i++) gl.enableVertexAttribArray(i);

/* ---------- maths ---------- */
const persp = (fov, asp, n, f) => { const t = 1 / Math.tan(fov / 2), d = 1 / (n - f); return [t / asp, 0, 0, 0, 0, t, 0, 0, 0, 0, (n + f) * d, -1, 0, 0, 2 * n * f * d, 0]; };
const norm = v => { const l = Math.hypot(v[0], v[1], v[2]) || 1; return [v[0] / l, v[1] / l, v[2] / l]; };
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
function look(e, c) { const z = norm([e[0] - c[0], e[1] - c[1], e[2] - c[2]]), x = norm(cross([0, 1, 0], z)), y = cross(z, x); return [x[0], y[0], z[0], 0, x[1], y[1], z[1], 0, x[2], y[2], z[2], 0, -dot(x, e), -dot(y, e), -dot(z, e), 1]; }
function mul(a, b) { const o = new Array(16); for (let c = 0; c < 4; c++) for (let r = 0; r < 4; r++) o[c * 4 + r] = a[r] * b[c * 4] + a[r + 4] * b[c * 4 + 1] + a[r + 8] * b[c * 4 + 2] + a[r + 12] * b[c * 4 + 3]; return o; }
const IDENT = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
function trs(tx, ty, tz, sx, sy, sz, yaw, pitch, roll) {
  const cy = Math.cos(yaw || 0), sy2 = Math.sin(yaw || 0), cp = Math.cos(pitch || 0), sp = Math.sin(pitch || 0), cr = Math.cos(roll || 0), sr = Math.sin(roll || 0);
  const Ry = [cy, 0, -sy2, 0, 0, 1, 0, 0, sy2, 0, cy, 0, 0, 0, 0, 1], Rx = [1, 0, 0, 0, 0, cp, sp, 0, 0, -sp, cp, 0, 0, 0, 0, 1], Rz = [cr, sr, 0, 0, -sr, cr, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
  const R = mul(mul(Rx, Ry), Rz), S = [sx, 0, 0, 0, 0, sy, 0, 0, 0, 0, sz, 0, 0, 0, 0, 1], M = mul(R, S); M[12] = tx; M[13] = ty; M[14] = tz; return M;
}

/* Every scene is built off the main thread so the opening stays smooth. */
function Builders(cfg) {
const { N, SMALL, ANCH, SIGNALS, TEN, LANES } = cfg; const waveImg = cfg.wave;
const hex = h => [parseInt(h.slice(1, 3), 16) / 255, parseInt(h.slice(3, 5), 16) / 255, parseInt(h.slice(5, 7), 16) / 255];
const C = { mist: hex('#8293b3'), ink: hex('#050E1D'), navy: hex('#0B2147'), n2: hex('#142a54'), n3: hex('#1a3a74'), prus: hex('#1E4080'), ocean: hex('#2E74AC'), crest: hex('#3FAEDE'), blue: hex('#8FDCF8'), foam: hex('#F4EDDF'), cream: hex('#C6BCA3'), gold: hex('#D4AF5E'), hi: hex('#FFDF8F') };
const mixc = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const sstep = (a, b, v) => { const t = clamp((v - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };
/* ---------- noise, used to draw the charts ---------- */
const hash = (x, y) => { const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453; return s - Math.floor(s); };
function vn(x, y) { const ix = Math.floor(x), iy = Math.floor(y), fx = x - ix, fy = y - iy, u = fx * fx * (3 - 2 * fx), v = fy * fy * (3 - 2 * fy); const a = hash(ix, iy), b = hash(ix + 1, iy), c = hash(ix, iy + 1), d = hash(ix + 1, iy + 1); return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v; }
function fbm(x, y) { let f = 0, a = .5; for (let i = 0; i < 4; i++) { f += a * vn(x, y); x = x * 2.03 + 17; y = y * 2.03 + 9; a *= .5; } return f; }

/* ---------- scene builders: 9 floats per point: x y z r g b a size meta ---------- */
const STRIDE = 9;
const newArr = () => new Float32Array(N * STRIDE);
function put(A, i, x, y, z, c, a, s, m) { const o = i * STRIDE; A[o] = x; A[o + 1] = y; A[o + 2] = z; A[o + 3] = c[0]; A[o + 4] = c[1]; A[o + 5] = c[2]; A[o + 6] = a; A[o + 7] = s; A[o + 8] = m; }

function seaRows(A, from, to, opt) {
  opt = opt || {}; const K = SMALL ? 150 : 250, count = to - from, per = Math.max(8, Math.floor(count / K)), base = opt.base || C.ocean;
  for (let i = 0; i < count; i++) {
    const k = Math.floor(i / per) % K, q = (k + .5) / K, z = 16 - 200 * Math.pow(q, 1.72), w = 22 + (16 - z) * .92, f = Math.random();
    const x = -w + 2 * w * ((i % per + f * .9) / per), near = 1 - q, c = mixc(C.prus, base, .25 + .75 * near);
    put(A, from + i, x, 0, z + (Math.random() - .5) * .2, c, .36 + .3 * Math.pow(near, .8), .07 + .024 * Math.random(), 0);
  }
}
function waveInto(A, from, to) {
  const d = waveImg.d, W = waveImg.w, H = waveImg.h, WW = 44, HH = WW * H / W; let i = from, guard = 0;
  while (i < to && guard++ < 6e7) {
    const px = Math.floor(Math.random() * W), py = Math.floor(Math.random() * H), o = (py * W + px) * 4, r = d[o] / 255, g = d[o + 1] / 255, b = d[o + 2] / 255, lum = .3 * r + .55 * g + .15 * b;
    if (lum < .09) continue;
    const weight = lum > .7 ? .62 : Math.min(1, Math.pow(lum * 2.1, 1.4));
    if (Math.random() > weight) continue;
    const u = (px + Math.random()) / W, v = (py + Math.random()) / H, foam = lum > .7;
    const z = -18 + (Math.sin(u * Math.PI) - .5) * 7 + sstep(.55, .08, v) * 6 + Math.random() * .5;
    const c = foam ? mixc(C.foam, C.hi, Math.random() * .08) : [Math.min(1, r * 1.25), Math.min(1, g * 1.25), Math.min(1, b * 1.2)];
    put(A, i, -9 + u * WW, (1 - v) * HH, z, c, foam ? .96 : .82, foam ? .062 : .058 + .016 * Math.random(), 2); i++;
  }
  while (i < to) { put(A, i, 0, -40, 0, C.ink, 0, .01, 2); i++; }
}
function sprayInto(A, from, to) {
  const WW = 44, HH = WW * waveImg.h / waveImg.w;
  for (let i = from; i < to; i++) { const u = .2 + Math.random() * .16, v = .1 + Math.random() * .3; put(A, i, -9 + u * WW, (1 - v) * HH, -13 + Math.random() * 3, C.foam, .8, .05 + Math.random() * .07, 3); }
}
function buildHero() {
  const A = newArr(), a = Math.floor(N * .5), b = Math.floor(N * .994), g = N - 150;
  seaRows(A, 0, a); waveInto(A, a, b); sprayInto(A, b, g);
  for (let i = g; i < N; i++) { const s = SIGNALS[i % 3], ang = Math.random() * 6.28, r = Math.pow(Math.random(), 1.3) * .75; put(A, i, s[0] + Math.cos(ang) * r, 0, s[1] + Math.sin(ang) * r * .6, mixc(hex('#C4A25A'), C.gold, Math.random()), .85, .1, 1); }
  return A;
}
function buildHorizon() { const A = newArr(); for (let i = 0; i < N; i++) put(A, i, (Math.random() - .5) * 170, 2 + (Math.random() - .5) * .08, -36, mixc(C.ocean, C.blue, Math.random()), .5, .07, 0); return A; }

/* the chart: points lying on contour lines */
const XR = 50, ZR = 34, KL = 13;
const field = (x, z) => fbm(x * .036 + 3, z * .036 + 7);
let contour = null;
function ensureContour() {
  if (contour) return contour; contour = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) {
    let x = (Math.random() * 2 - 1) * XR, z = (Math.random() * 2 - 1) * ZR, h = field(x, z); const haze = Math.random() < .05;
    if (!haze) {
      let lvl = Math.round(h * KL) / KL; const heavy = Math.round(h * KL) % 5 === 0; if (!heavy && Math.random() < .42) { h = field(x, z); }
      for (let s = 0; s < 3; s++) { const e = .5, gx = (field(x + e, z) - h) / e, gz = (field(x, z + e) - h) / e, g2 = gx * gx + gz * gz + 1e-6; if (g2 < 2e-5) { x = (Math.random() * 2 - 1) * XR; z = (Math.random() * 2 - 1) * ZR; h = field(x, z); lvl = Math.round(h * KL) / KL; continue; } const k = clamp((lvl - h) / g2, -22, 22); x += gx * k * .9; z += gz * k * .9; h = field(x, z); }
      const w = heavy ? .1 : .035; x += (Math.random() - .5) * w; z += (Math.random() - .5) * w;
    }
    contour[i * 3] = x; contour[i * 3 + 1] = z; contour[i * 3 + 2] = h;
  }
  return contour;
}
const ramp = h => { const t = clamp((h - .24) / .5, 0, 1); return t < .5 ? mixc(C.ocean, C.crest, t * 2) : mixc(C.crest, C.blue, (t - .5) * 2); };
function buildMap() { const A = newArr(), K = ensureContour(); for (let i = 0; i < N; i++) { const h = K[i * 3 + 2]; put(A, i, K[i * 3], (h - .5) * 5, K[i * 3 + 1], ramp(h), .5 + .4 * Math.random(), .075, 0); } return A; }
const fitSeed = (x, z) => 1 - sstep(.47, .53, fbm(x * .085 + 31, z * .085 + 11)) * .99;
function buildFit() { const A = newArr(), K = ensureContour(); for (let i = 0; i < N; i++) { const x = K[i * 3], z = K[i * 3 + 1], h = K[i * 3 + 2], keep = fitSeed(x, z) < .3; if (keep) put(A, i, x, (h - .5) * 5, z, mixc(ramp(h), C.foam, .22), .95, .085, 0); else put(A, i, x, -16 - Math.random() * 18, z, C.prus, .12, .06, 0); } return A; }
function buildReason() {
  const A = newArr(), K = ensureContour();
  for (let i = 0; i < N; i++) {
    const x = K[i * 3], z = K[i * 3 + 1], h = K[i * 3 + 2], keep = fitSeed(x, z) < .3;
    if (i < 5400) { const a0 = ANCH[i % 5], th = Math.random() * 6.283, b = Math.random(), r = b < .34 ? 1.1 : b < .62 ? Math.random() * .34 : 2.5 + (Math.random() - .5) * .03; put(A, i, a0[0] + Math.cos(th) * r, 1.2, a0[1] + Math.sin(th) * r, mixc(hex('#C4A25A'), C.gold, Math.random()), .72, b < .62 ? .1 : .055, 1); continue; }
    if (keep) put(A, i, x, (h - .5) * 5, z, ramp(h), .5, .07, 0);
    else put(A, i, x, -18 - Math.random() * 18, z, C.prus, .05, .05, 0);
  }
  return A;
}
function buildTunnel() { const A = newArr(); for (let i = 0; i < N; i++) { const ang = Math.random() * 6.283, r = 15.5 + Math.pow(Math.random(), 1.5) * 30, z = -150 + Math.random() * 190; const c = Math.random() < .1 ? C.blue : mixc(C.prus, C.ocean, Math.random()); put(A, i, Math.cos(ang) * r * 1.65, Math.sin(ang) * r, z, c, .55 + Math.random() * .4, .07 + Math.random() * .05, 0); } return A; }
function buildDial() {
  const A = newArr(), R = 1; let i = 0, n = N;
  const ticks = Math.floor(n * .3), rings = Math.floor(n * .5);
  for (; i < ticks; i++) { const k = Math.floor(Math.random() * 12), a = (k + .08 + Math.random() * .84) / 12 * 6.28318, r = R * (.94 + Math.random() * .06); put(A, i, Math.sin(a) * r, Math.cos(a) * r, 0, C.crest, .85, .07, 5); }
  for (; i < ticks + rings; i++) {
    const a = Math.random() * 6.28318, b = Math.random(); let r;
    if (b < .25) r = .9; else if (b < .55) r = .72 + (Math.random() - .5) * .002; else if (b < .8) r = .56; else { const g = Math.floor(a / 6.28318 * 96); const ga = (g + .5) / 96 * 6.28318; r = .86 + Math.random() * .03; put(A, i, Math.sin(ga) * r, Math.cos(ga) * r, 0, C.ocean, .7, .05, 0); continue; }
    put(A, i, Math.sin(a) * r, Math.cos(a) * r, (Math.random() - .5) * .01, r > .8 ? C.ocean : C.prus, .55, .055, 0);
  }
  for (; i < n; i++) { const a = Math.random() * 6.283, r = 1.1 + Math.pow(Math.random(), .7) * 2.4; put(A, i, Math.sin(a) * r, Math.cos(a) * r, -Math.random() * .6, C.prus, .18, .06, 0); }
  return A;
}
function buildBar() {
  const A = newArr(), segs = [[-1, -.42, C.crest, 1], [-.42, .22, C.ocean, 1], [.22, .62, C.prus, 1], [.62, 1, C.prus, .16]];
  const bar = Math.floor(N * .72), ROWS = 19; let i = 0;
  for (; i < bar; i++) {
    const r = Math.random(), s = r < .36 ? segs[0] : r < .75 ? segs[1] : r < .96 ? segs[2] : segs[3], x = s[0] + Math.random() * (s[1] - s[0]) * .99;
    if (s === segs[3]) { const row = Math.random() * .3 - .15, h = ((x * 26 + row * 26) % 1 + 1) % 1; if (h > .14) { i--; continue; } put(A, i, x, row, 0, C.ocean, .6, .05, 0); continue; }
    const row = Math.floor(Math.random() * ROWS), y = (row / (ROWS - 1) - .5) * .3, edge = row === 0 || row === ROWS - 1; put(A, i, x, y, 0, edge ? C.blue : s[2], edge ? .95 : .72, .05, 6);
  }
  for (; i < N; i++) { const hl = Math.floor(Math.random() * 16), y = -1.3 + hl * .18; put(A, i, (Math.random() * 2 - 1) * 1.35, y, -.1, C.prus, .12, .05, 0); }
  return A;
}
function buildRivers() { const A = newArr(); for (let i = 0; i < N; i++) { const l = i % 5, sp = (Math.random() - .5) * .012; const c = l === 0 ? mixc(hex('#C4A25A'), C.gold, Math.random()) : mixc(C.ocean, C.blue, Math.random() * .5); put(A, i, (Math.random() * 2.5) - 1.25, -LANES[l] + sp + (Math.random() < .12 ? (Math.random() - .5) * .05 : 0), (Math.random() - .5) * .04, c, l === 0 ? .62 : .5, .05 + Math.random() * .02, 0); } return A; }
function buildStrata() { const A = newArr(); for (let i = 0; i < N; i++) { if (i % 2) { put(A, i, -1.1 + Math.random() * 1.2, -1.05 + Math.random() * 2.1, Math.random() * 1.2, mixc(C.mist, C.prus, Math.random()), .17, .05 + Math.random() * .03, 0); } else { const k = (i >> 1) % 40, y = -1.02 + k * .0525; put(A, i, .12 + Math.random() * 1, y + (Math.random() - .5) * .002, 0, mixc(C.ocean, C.blue, Math.random()), .36, .046, 0); } } return A; }
function buildTen() {
  const A = newArr(), K = ensureContour(), gold = Math.floor(N * .035);
  for (let i = 0; i < N - gold; i++) { const x = K[i * 3], z = K[i * 3 + 1], h = K[i * 3 + 2]; put(A, i, x, 0, z, mixc(C.navy, C.prus, Math.random()), .34 + .3 * Math.random(), .082, 0); }
  for (let i = N - gold; i < N; i++) { const t = TEN[i % 10], a = Math.random() * 6.283, b = Math.random(), r = b < .45 ? 1.9 : b < .72 ? Math.random() * .55 : 3.1 + (Math.random() - .5) * .04; put(A, i, t[0] + Math.cos(a) * r, .1, t[1] + Math.sin(a) * r, hex('#7A6128'), .95, b < .72 ? .15 : .09, 0); }
  return A;
}

/* the machines, drawn as real 3D boxes made of points */
function Mach() { this.p = []; }
Mach.prototype.grid = function (cx, cy, cz, w, d, step, L, col) { const x0 = cx - w / 2, z0 = cz - d / 2; for (let x = x0 + step; x < cx + w / 2 - .01; x += step) this.p.push({ t: 0, a: [x, cy + .01, z0], b: [x, cy + .01, z0 + d], c: col || C.ocean, al: .55, l: L, w: d * 7 }); for (let z = z0 + step; z < cz + d / 2 - .01; z += step) this.p.push({ t: 0, a: [x0, cy + .01, z], b: [x0 + w, cy + .01, z], c: col || C.ocean, al: .55, l: L, w: w * 7 }); };
Mach.prototype.box = function (cx, cy, cz, w, h, d, o) { o = o || {}; const L = o.l || 0, ec = o.e || C.crest, fc = o.f || C.ocean, fa = o.fa === undefined ? .4 : o.fa, ea = o.ea || 1, x0 = cx - w / 2, x1 = cx + w / 2, y0 = cy, y1 = cy + h, z0 = cz - d / 2, z1 = cz + d / 2;
  const seg = (a, b) => this.p.push({ t: 0, a, b, c: ec, al: ea, l: L, w: Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]) * 20 });
  [[[x0, y1, z0], [x1, y1, z0]], [[x1, y1, z0], [x1, y1, z1]], [[x1, y1, z1], [x0, y1, z1]], [[x0, y1, z1], [x0, y1, z0]], [[x0, y0, z1], [x1, y0, z1]], [[x1, y0, z0], [x1, y0, z1]], [[x0, y0, z1], [x0, y1, z1]], [[x1, y0, z1], [x1, y1, z1]], [[x1, y0, z0], [x1, y1, z0]], [[x0, y0, z0], [x1, y0, z0]], [[x0, y0, z0], [x0, y1, z0]], [[x0, y0, z0], [x0, y0, z1]]].forEach(s => seg(s[0], s[1]));
  const face = (o2, u, v, wt, col) => this.p.push({ t: 1, o: o2, u, v, c: col || fc, al: fa, l: L, w: wt * (o.dens || 4) * 6 });
  face([x0, y1, z0], [w, 0, 0], [0, 0, d], w * d, fc); face([x0, y0, z1], [w, 0, 0], [0, h, 0], w * h, o.f2 || C.navy); face([x1, y0, z0], [0, 0, d], [0, h, 0], d * h, o.f3 || C.n2);
};
Mach.prototype.fill = function () {
  const A = newArr(); let tot = 0; for (const q of this.p) tot += q.w; const cum = []; let acc = 0; for (const q of this.p) { acc += q.w; cum.push(acc); }
  for (let i = 0; i < N; i++) {
    const r = Math.random() * tot; let lo = 0, hi = cum.length - 1; while (lo < hi) { const m = (lo + hi) >> 1; if (cum[m] < r) lo = m + 1; else hi = m; }
    const q = this.p[lo], f = Math.random();
    if (q.t === 3) { const ang = Math.random() * 6.2832, rr = Math.sqrt(Math.random()) * q.r, dy = q.dome ? Math.sqrt(Math.max(0, 1 - (rr / q.r) * (rr / q.r))) * q.dome : 0; put(A, i, q.c0[0] + Math.cos(ang) * rr, q.c0[1] + dy, q.c0[2] + Math.sin(ang) * rr, q.c, q.al, .055, 10 + q.l); }
    else if (q.t === 0) put(A, i, q.a[0] + (q.b[0] - q.a[0]) * f, q.a[1] + (q.b[1] - q.a[1]) * f, q.a[2] + (q.b[2] - q.a[2]) * f, q.c, q.al, .05, 10 + q.l);
    else { const g = Math.random(); put(A, i, q.o[0] + q.u[0] * f + q.v[0] * g, q.o[1] + q.u[1] * f + q.v[1] * g, q.o[2] + q.u[2] * f + q.v[2] * g, q.c, q.al, .058, 10 + q.l); }
  }
  return A;
};
const CAP = { e: C.foam, f: C.foam, f2: C.cream, f3: C.cream, fa: 1, dens: 60 };
function topStack(M, L) { M.box(0, 0, 0, 9, .6, 9, { l: L, e: C.blue, dens: 7 }); M.box(0, .6, 0, 6, .4, 6, { l: L, e: C.crest, dens: 9 }); M.box(0, 1, 0, 3.6, 1.5, 3.6, Object.assign({ l: L }, CAP)); M.grid(0, .6, 0, 9, 9, 1.5, L, C.blue); }
function buildReply() {
  const M = new Mach();
  M.box(0, 0, 0, 22, .9, 15, { l: 0, dens: 3 }); M.grid(0, .9, 0, 22, 15, 1.5, 0); for (let a = 0; a < 8; a++) M.box(-8.4 + a * 2.4, .9, 0, 1.1, .22, 1.1, { l: 0, e: C.blue, fa: .6, dens: 12 }); for (const s of [[-10, -6.3], [10, -6.3], [-10, 6.3], [10, 6.3]]) M.box(s[0], .9, s[1], 1.5, 1, 1.5, { l: 0, e: C.blue, dens: 8 });
  M.box(0, 0, 0, 22, .9, 11, { l: 1, dens: 3 }); M.grid(0, .9, 0, 22, 11, 1.1, 1); for (let a = 0; a < 5; a++) M.box(-7.5 + a * 3.2, .9, -1.6, 2.6, .25, 3.4, { l: 1, e: C.blue, dens: 8 }); M.box(-9, .9, 2.6, 3, 1.9, 3, { l: 1, e: C.crest, dens: 5 }); for (let a = 0; a < 4; a++) M.box(5 + a * 1.6, .9, 3.2, 1.2, 1 + a * .25, 1.2, { l: 1, e: C.crest, dens: 7 });
  M.box(0, 0, 0, 20, .8, 14, { l: 2, dens: 3 }); M.grid(0, .8, 0, 20, 14, 2, 2); for (const z of [-3.6, 3.6]) { for (const x of [-7.5, 7.5]) M.box(x, .8, z, 1.2, 4, 1.2, { l: 2, e: C.blue, dens: 7 }); M.box(0, 4.8, z, 16.2, 1, 1.2, { l: 2, e: C.crest, dens: 9 }); } M.box(0, .8, 0, 1.8, 2.8, 1.8, { l: 2, e: C.foam, dens: 6 });
  topStack(M, 3); return M.fill();
}
function buildAdm() {
  const M = new Mach();
  M.box(0, 0, 0, 22, .9, 15, { l: 0, dens: 3 }); M.grid(0, .9, 0, 22, 15, 1.5, 0); for (let a = 0; a < 6; a++) for (let b = 0; b < 4; b++) M.box(-8.75 + a * 3.5, .9, -4.8 + b * 3.2, 2.4, .35, 2.2, { l: 0, e: C.blue, dens: 7 });
  M.box(0, 0, 0, 20, .8, 13, { l: 1, dens: 3 }); for (let a = 0; a < 7; a++) for (let b = 0; b < 3; b++) { const h = .3 + (((a * 7 + b * 3) % 5) * .42); M.box(-7.8 + a * 2.6, .8, -3.6 + b * 3.6, 2, h, 2.6, { l: 1, e: (a + b) % 5 === 1 ? C.foam : C.crest, dens: 7 }); }
  M.box(0, 0, 0, 16, .8, 10, { l: 2, dens: 3 }); for (const x of [-6, 0, 6]) { M.box(x, .8, -2.6, 1, 3.2, 1, { l: 2, e: C.blue, dens: 7 }); M.box(x, .8, 2.6, 1, 3.2, 1, { l: 2, e: C.blue, dens: 7 }); M.box(x, 4, 0, 1.2, .8, 6.4, { l: 2, e: C.crest, dens: 9 }); }
  topStack(M, 3); return M.fill();
}
function buildStaff() {
  const M = new Mach();
  M.box(0, 0, 0, 22, .9, 15, { l: 0, dens: 3 }); M.grid(0, .9, 0, 22, 15, 1.5, 0); for (let b = 0; b < 6; b++) M.box(0, .9, -5.8 + b * 2.3, 18, .4, 1.5, { l: 0, e: C.blue, dens: 6 });
  M.box(0, 0, 0, 20, .8, 13, { l: 1, dens: 3 }); for (let a = 0; a < 6; a++) for (let b = 0; b < 2; b++) M.box(-7.5 + a * 3, .8, -2.8 + b * 5.6, 2.2, 3.4, 3.6, { l: 1, e: C.crest, dens: 5 });
  M.box(0, 0, 0, 14, .8, 14, { l: 2, dens: 3 }); for (let k = 0; k < 4; k++) { const a = k / 4 * 6.283 + .78; M.box(Math.cos(a) * 5, .8, Math.sin(a) * 5, 1.4, 4.2, 1.4, { l: 2, e: C.blue, dens: 7 }); } M.box(0, 5, 0, 11, .5, 11, { l: 2, e: C.crest, dens: 6 });
  topStack(M, 3); return M.fill();
}
function buildClosing() {
  const A = newArr(), a = Math.floor(N * .56); seaRows(A, 0, a, { base: C.ocean });
  const R = 15;
  for (let i = a; i < N; i++) {
    const u = Math.random() * 2 - 1, th = Math.random() * 6.28318, s = Math.sqrt(1 - u * u), x = s * Math.cos(th), y = u, z = s * Math.sin(th);
    const h = fbm(x * 1.5 + 4 + z * .6, y * 1.5 + 2 + z * .9), band = Math.abs((h * 9) % 1 - .5), line = band < .07;
    let c = mixc(C.foam, C.cream, clamp((h - .32) * 3.2, 0, 1)); if (line) c = mixc(c, hex('#7A6128'), .72);
    put(A, i, x * R, y * R, z * R, c, line ? .75 : 1, line ? .09 : .14, 4);
  }
  return A;
}


function buildSegs() { const A = newArr(), K = ensureContour(), cols = [C.blue, C.cream, C.crest], off = [-7, 0, 7]; for (let i = 0; i < N; i++) { const x = K[i * 3], z = K[i * 3 + 1], h = K[i * 3 + 2], keep = fitSeed(x, z) < .3; if (keep) { const b = x < -16 ? 0 : x < 16 ? 1 : 2; put(A, i, x + off[b], (h - .5) * 5, z, cols[b], .95, .085, 0); } else put(A, i, x, -24 - Math.random() * 18, z, C.prus, .03, .05, 0); } return A; }
function buildTenDark() { const A = newArr(), K = ensureContour(), gold = Math.floor(N * .05); for (let i = 0; i < N - gold; i++) { const h = K[i * 3 + 2]; put(A, i, K[i * 3], 0, K[i * 3 + 1], ramp(h), .34 + .3 * Math.random(), .07, 0); } for (let i = N - gold; i < N; i++) { const t = TEN[i % 10], a = Math.random() * 6.283, b = Math.random(), r = b < .4 ? 1.7 : b < .66 ? Math.random() * .5 : 2.9 + (Math.random() - .5) * .03; put(A, i, t[0] * .86 - 12, .1, t[1], mixc(hex('#C4A25A'), C.gold, Math.random()), .8, b < .66 ? .11 : .06, 1); } return A; }
function buildSchool() {
  const M = new Mach(); const LIT = { e: C.foam, f: C.foam, f2: C.cream, f3: C.cream, fa: .95, dens: 40 };
  M.box(0, 0, 0, 26, .7, 18, { l: 0, dens: 3 }); M.grid(0, .7, 0, 26, 18, 2, 0); for (let a = 0; a < 5; a++) M.box(-1 + 0, .7, 8.2 - a * .1, 3, .12, .9, { l: 0, e: C.blue, dens: 6 });
  M.box(0, 0, 0, 18, 5, 8, { l: 1, e: C.blue, dens: 2.4 }); M.box(0, 5, 0, 19.4, .35, 9.4, { l: 1, e: C.crest, dens: 5 }); M.box(0, 5.35, 0, 15, .6, 6, { l: 1, e: C.crest, dens: 5 }); M.box(-11.5, 0, .5, 5, 3.6, 7, { l: 1, e: C.blue, dens: 2.4 }); M.box(11.5, 0, .5, 5, 3.6, 7, { l: 1, e: C.blue, dens: 2.4 }); M.box(0, 5.9, 0, 3.4, 5, 3.4, { l: 1, e: C.blue, dens: 3 }); M.box(0, 10.9, 0, 4.2, .4, 4.2, Object.assign({ l: 1 }, LIT));
  for (let a = 0; a < 7; a++) for (let b = 0; b < 2; b++) { if (a === 3 && b === 0) { M.box(0, .02, 4.02, 2, 2.4, .1, Object.assign({ l: 1 }, LIT)); continue; } const lit = (a * 3 + b * 5) % 4 === 0; M.box(-6.9 + a * 2.3, 1 + b * 2.1, 4.02, 1.3, 1.2, .08, lit ? Object.assign({ l: 1 }, LIT) : { l: 1, e: C.crest, dens: 9 }); }
  M.box(0, 0, 0, 20, .4, 13, { l: 2, dens: 3 }); for (let a = 0; a < 7; a++) for (let b = 0; b < 4; b++) { const on = (a * 5 + b * 3) % 7 === 2; M.box(-7.8 + a * 2.6, .4, -4.5 + b * 3, 2.1, on ? .7 : .12, 2.4, on ? Object.assign({ l: 2 }, LIT) : { l: 2, e: C.blue, dens: 7 }); }
  return M.fill();
}
function buildOrg() {
  const M = new Mach(), link = (a, b, L) => M.p.push({ t: 0, a, b, c: C.blue, al: .85, l: L, w: Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]) * 14 });
  M.box(0, 0, 0, 30, .6, 22, { l: 0, dens: 2.6 }); M.grid(0, .6, 0, 30, 22, 2, 0);
  const rows = [-9, -3, 3, 9];
  for (let a = 0; a < 3; a++) { const x2 = -9.5 + a * 9.5, top = [x2, 11.5, 0]; link([0, 19, 0], top, 0); M.box(x2, 11.5, 0, 3, 2.6, 3, { l: 0, e: C.crest, dens: 7 });
    for (let b = 0; b < 3; b++) { const x3 = x2 - 3.1 + b * 3.1; for (const z of [-5, 5]) { link([x2, 11.5, 0], [x3, 6.6, z], 0); M.box(x3, 4.4, z, 2.2, 2.2, 2.2, { l: 0, e: C.crest, dens: 7 }); for (let c = 0; c < 4; c++) M.box(x3, .6 + c * .78, z, 2, .52, 2.6, { l: 0, e: c === 3 && (a + b) % 2 === 0 ? C.foam : C.ocean, dens: 5 }); } } }
  M.box(0, 19, 0, 4.2, 3.4, 4.2, Object.assign({ l: 0 }, CAP));
  return M.fill();
}
function buildThali() {
  const M = new Mach(), disc = (cx, cy, cz, r, col, al, dens, L, dome) => M.p.push({ t: 3, c0: [cx, cy, cz], r, c: col, al, l: L || 0, w: r * r * dens, dome: dome || 0 }), ring = (cx, cy, cz, r, col, al, L) => { const n = 48; for (let i = 0; i < n; i++) { const a = i / n * 6.2832, b = (i + 1) / n * 6.2832; M.p.push({ t: 0, a: [cx + Math.cos(a) * r, cy, cz + Math.sin(a) * r], b: [cx + Math.cos(b) * r, cy, cz + Math.sin(b) * r], c: col, al, l: L || 0, w: r * .13 * 26 }); } };
  disc(0, 0, 0, 13, C.prus, .4, 12); ring(0, 0, 0, 13, C.blue, 1); ring(0, .7, 0, 13.7, C.crest, 1); ring(0, .05, 0, 11.6, C.ocean, .8);
  const foods = [C.foam, C.ocean, C.gold, C.crest, C.cream, C.blue];
  for (let k = 0; k < 6; k++) { const a = k / 6 * 6.2832 + .5, x = Math.cos(a) * 8, z = Math.sin(a) * 8, rr = 2.8; ring(x, .1, z, rr, C.blue, 1); ring(x, 1.2, z, rr + .35, C.crest, 1); disc(x, .85, z, rr, foods[k], .9, 34); }
  disc(0, .3, 0, 3.6, C.foam, 1, 70, 0, 2.6);
  M.box(0, 13.5, -10, 28, .5, .8, { l: 1, e: C.crest, dens: 9 }); for (const x of [-13, 13]) M.box(x, 0, -10, .6, 13.5, .6, { l: 0, e: C.blue, dens: 6 });
  for (let k = 0; k < 5; k++) { const lit = k === 1, x = -9.6 + k * 4.8; M.box(x, 9, -10, 3.4, 4.5, .08, lit ? Object.assign({ l: 1 }, CAP) : { l: 1, e: C.blue, f: C.ocean, dens: 16 }); for (let l = 0; l < 4; l++) M.p.push({ t: 0, a: [x - 1.2, 12.6 - l * .8, -9.9], b: [x + 1.2 - (l === 3 ? 1 : 0), 12.6 - l * .8, -9.9], c: lit ? C.navy : C.blue, al: lit ? 1 : .8, l: 1, w: 12 }); }
  return M.fill();
}
function buildWheel() {
  const A = new Mach(), R = 14, n = 26, seg = (a, b, c, al, m, w) => A.p.push({ t: 0, a, b, c, al, m, l: 0, w: Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]) * (w || 22) });
  for (const z of [-3, 3]) for (const r of [R, R - 2.4, 4]) for (let i = 0; i < 64; i++) { const a = i / 64 * 6.2832, b = (i + 1) / 64 * 6.2832; seg([Math.cos(a) * r, Math.sin(a) * r, z], [Math.cos(b) * r, Math.sin(b) * r, z], r === R ? C.blue : C.crest, 1, 7); }
  for (let i = 0; i < 12; i++) { const a = i / 12 * 6.2832; for (const z of [-3, 3]) seg([Math.cos(a) * 4, Math.sin(a) * 4, z], [Math.cos(a) * (R - 2.4), Math.sin(a) * (R - 2.4), z], C.crest, .9, 7, 26); }
  for (let i = 0; i < n; i++) { const a = i / n * 6.2832, c = Math.cos(a), s = Math.sin(a); for (const r of [R - 2.4, R + 2]) seg([c * r, s * r, -3], [c * r, s * r, 3], C.ocean, .85, 7, 12); for (const z of [-3, 3]) seg([c * (R - 2.4), s * (R - 2.4), z], [c * (R + 2), s * (R + 2), z], C.blue, .9, 7, 24); }
  for (let i = 0; i < 28; i++) { const a = i / 28 * 6.2832, b = (i + 1) / 28 * 6.2832; seg([Math.cos(a) * 1.5, Math.sin(a) * 1.5, -4.5], [Math.cos(b) * 1.5, Math.sin(b) * 1.5, -4.5], C.foam, 1, 7, 40); seg([Math.cos(a) * 1.5, Math.sin(a) * 1.5, 4.5], [Math.cos(b) * 1.5, Math.sin(b) * 1.5, 4.5], C.foam, 1, 7, 40); }
  /* the hand wheel: where a person stays in charge */
  const hx = -15.5, hy = 1, hr = 4.2; for (let i = 0; i < 48; i++) { const a = i / 48 * 6.2832, b = (i + 1) / 48 * 6.2832; for (const r of [hr, hr - .7, .8]) seg([hx + Math.cos(a) * r, hy + Math.sin(a) * r, 8], [hx + Math.cos(b) * r, hy + Math.sin(b) * r, 8], C.foam, 1, 8, 90); } for (let i = 0; i < 6; i++) { const a = i / 6 * 6.2832; seg([hx + Math.cos(a) * .8, hy + Math.sin(a) * .8, 8], [hx + Math.cos(a) * (hr - .7), hy + Math.sin(a) * (hr - .7), 8], C.foam, 1, 8, 80); }
  seg([hx, hy, 8], [hx, -17, 8], C.cream, .9, 0, 60); seg([hx - .9, hy, 8], [hx - .9, -17, 8], C.cream, .6, 0, 40); seg([hx + .9, hy, 8], [hx + .9, -17, 8], C.cream, .6, 0, 40);
  for (let x = -30; x < 30; x += 1) seg([x, -17 + Math.sin(x * .3) * .25, 3], [x + 1, -17 + Math.sin((x + 1) * .3) * .25, 3], C.blue, .85, 0, 28);
  return A.fillM();
}
Mach.prototype.fillM = function () { const A = newArr(); let tot = 0; const cum = []; for (const q of this.p) { tot += q.w; cum.push(tot); } for (let i = 0; i < N; i++) { const r = Math.random() * tot; let lo = 0, hi = cum.length - 1; while (lo < hi) { const m = (lo + hi) >> 1; if (cum[m] < r) lo = m + 1; else hi = m; } const q = this.p[lo], f = Math.random(); put(A, i, q.a[0] + (q.b[0] - q.a[0]) * f, q.a[1] + (q.b[1] - q.a[1]) * f, q.a[2] + (q.b[2] - q.a[2]) * f, q.c, q.al, .055, q.m); } return A; };
function buildSection() {
  const A = newArr(), s = 22 / 44, WW = 44, HH = WW * waveImg.h / waveImg.w, a = Math.floor(N * .34), b = Math.floor(N * .88), g = N - 1600, SY = -6;
  let i = 0, guard = 0; const d = waveImg.d, W = waveImg.w, H = waveImg.h;
  while (i < a && guard++ < 4e7) { const px = Math.floor(Math.random() * W), py = Math.floor(Math.random() * H), o = (py * W + px) * 4, r = d[o] / 255, gg = d[o + 1] / 255, bb = d[o + 2] / 255, lum = .3 * r + .55 * gg + .15 * bb; if (lum < .09) continue; if (Math.random() > (lum > .7 ? .62 : Math.min(1, Math.pow(lum * 2.1, 1.4)))) continue; const u = (px + Math.random()) / W, v = (py + Math.random()) / H, foam = lum > .7; put(A, i, 12 + (u - .35) * WW * .78, SY + (1 - v) * HH * .78, 2, foam ? C.foam : [Math.min(1, r * 1.25), Math.min(1, gg * 1.25), Math.min(1, bb * 1.2)], foam ? .95 : .82, .058, 0); i++; }
  for (; i < b; i++) { const row = Math.floor(Math.random() * 46), q = row / 45, x = (Math.random() - .5) * 110, y = SY - Math.pow(q, 1.25) * 17.5 + Math.sin(x * .09 + row * .7) * (.1 + q * .7) + Math.sin(x * .03 + row) * q * .9; put(A, i, x, y, 0, q < .03 ? C.blue : mixc(C.ocean, C.navy, Math.pow(q, .7)), q < .03 ? 1 : .62 - q * .36, .05 + (q < .03 ? .012 : 0), 0); }
  const shafts = [[-30, -19], [-17, -15], [-4, -20], [7, -13], [21, -18]];
  for (; i < g; i++) { const sh = shafts[i % 5], t = Math.random(); put(A, i, sh[0], SY + (sh[1] - SY) * t, .4, C.blue, .75, .036, 0); }
  for (; i < N - 700; i++) { const sh = shafts[i % 5], ang = Math.random() * 6.283, br = Math.random(), r = br < .5 ? .85 : br < .7 ? Math.random() * .25 : 1.8; put(A, i, sh[0] + Math.cos(ang) * r, sh[1] + Math.sin(ang) * r, .4, mixc(hex('#C4A25A'), C.gold, Math.random()), .8, br < .7 ? .085 : .045, 1); }
  for (; i < N; i++) { const sh = shafts[i % 5]; put(A, i, sh[0] + (Math.random() - .5) * .9, -22 + Math.random() * 17, .3, C.gold, .65, .05, 9); }
  return A;
}
function buildGuard() {
  const A = newArr(), n = N; let i = 0;
  const rings = Math.floor(n * .3), sats = Math.floor(n * .55), R = 7.5;
  for (; i < rings; i++) { const a = Math.random() * 6.2832, b = Math.random(), r = b < .62 ? R : b < .8 ? R + .7 : R * .84; put(A, i, Math.cos(a) * r, Math.sin(a) * r, 0, b < .62 ? C.foam : C.crest, b < .62 ? 1 : .6, b < .62 ? .06 : .045, 0); }
  const P = 6;
  for (; i < rings + sats; i++) { const k = i % P, a = k / P * 6.2832 + .52, cx = Math.cos(a) * 15.5, cy = Math.sin(a) * 13, row = Math.floor(Math.random() * 3), w = Math.floor(Math.random() * 12), x = cx - 3.3 + w * .6 + Math.random() * .46, h = (w + 1) / 12 * 3, up = Math.random() * h; const edge = Math.random() < .2; if (edge) { const e = Math.random(), s = Math.floor(Math.random() * 4); const ex = s < 2 ? cx - 3.7 + e * 7.4 : (s === 2 ? cx - 3.7 : cx + 3.7), ey = s >= 2 ? cy - 2.2 + e * 4.4 : (s === 0 ? cy - 2.2 : cy + 2.2); put(A, i, ex, ey, 0, C.blue, .9, .042, 0); } else put(A, i, x, cy - 1.8 + up, 0, w > 8 ? C.blue : C.crest, .78, .052, 0); }
  for (; i < n; i++) { const a = Math.random() * 6.283, r = 21 + Math.random() * 28; put(A, i, Math.cos(a) * r * 1.5, Math.sin(a) * r, -2, C.prus, .13, .05, 0); }
  return A;
}
function buildRoute() {
  const A = newArr(), nodes = [[-.84, -.28], [-.5, .3], [-.16, -.2], [.16, .32], [.5, -.16], [.84, .26]], cat = (t, a, b, c, d) => .5 * ((2 * b) + (-a + c) * t + (2 * a - 5 * b + 4 * c - d) * t * t + (-a + 3 * b - 3 * c + d) * t * t * t); let i = 0;
  const path = Math.floor(N * .36), ring = Math.floor(N * .12);
  for (; i < path; i++) { const f = Math.random() * 5, k = Math.floor(f), t = f - k, p = q => nodes[clamp(q, 0, 5)]; const x = cat(t, p(k - 1)[0], p(k)[0], p(k + 1)[0], p(k + 2)[0]), y = cat(t, p(k - 1)[1], p(k)[1], p(k + 1)[1], p(k + 2)[1]); const sp = (Math.random() - .5) * .006; put(A, i, x + sp, y + sp, 0, C.foam, .95, .048, 6); }
  for (; i < path + ring; i++) { const n = nodes[i % 6], a = Math.random() * 6.283, b = Math.random(), r = b < .5 ? .045 : b < .72 ? Math.random() * .012 : .09; put(A, i, n[0] + Math.cos(a) * r * .625, n[1] + Math.sin(a) * r, 0, b < .72 ? C.gold : C.blue, .85, b < .72 ? .06 : .04, 0); }
  for (; i < N; i++) { let x = 0, y = 0, h = 0, t = 0; do { x = Math.random() * 2.2 - 1.1; y = Math.random() * 2.2 - 1.1; h = fbm(x * 2.3 + 3, y * 1.6 + 7); t++; } while (Math.abs((h * 12) % 1 - .5) > .05 && t < 10); put(A, i, x, y, -.05, mixc(C.prus, C.ocean, Math.random()), .34, .046, 0); }
  return A;
}
const tideY = x => { const u = (x + 1) / 2; return -.34 + .05 * Math.sin(u * 8) + .36 * Math.pow(u, 1.7) * (.55 + .45 * Math.sin(u * 19 - 1.2)); };
function buildTide() {
  const A = newArr(); let i = 0; const line = Math.floor(N * .34), rows = Math.floor(N * .58);
  for (; i < line; i++) { const x = Math.random() * 2 - 1; put(A, i, x, tideY(x), 0, C.navy, .95, .05, 6); }
  for (; i < line + rows; i++) { const x = Math.random() * 2 - 1, q = Math.floor(Math.random() * 16) / 16, y0 = tideY(x), y = y0 - q * (y0 + .86); put(A, i, x, y, 0, mixc(C.prus, C.ocean, Math.random() * .6), .55 - q * .3, .042, 6); }
  for (; i < N; i++) { const k = i % 7, x = -.92 + k * .3067, a = Math.random() * 6.283, b = Math.random(), r = b < .5 ? .018 : b < .75 ? Math.random() * .006 : .034; put(A, i, x + Math.cos(a) * r * .62, tideY(x) + Math.sin(a) * r, 0, hex('#7A6128'), .95, b < .75 ? .062 : .045, 0); }
  return A;
}
function buildBeacon() { const A = newArr(), a = N - 900; seaRows(A, 0, a, { base: C.ocean }); for (let i = a; i < N; i++) { const t = Math.random(), r = Math.pow(t, 2) * 2.5, ang = Math.random() * 6.283; put(A, i, Math.cos(ang) * r, 2.2 + Math.sin(ang) * r * .7, -46, mixc(C.gold, C.hi, Math.random()), .95, .1, 1); } return A; }
return { segs: buildSegs, tenDark: buildTenDark, school: buildSchool, org: buildOrg, thali: buildThali, wheel: buildWheel, section: buildSection, guard: buildGuard, route: buildRoute, tide: buildTide, beacon: buildBeacon, horizon: buildHorizon, hero: buildHero, map: buildMap, fit: buildFit, reason: buildReason, tunnel: buildTunnel, dial: buildDial, bar: buildBar, rivers: buildRivers, strata: buildStrata, ten: buildTen, m0: buildReply, m1: buildAdm, m2: buildStaff, closing: buildClosing };
}
const STRIDE = 9;
const SIGNALS = [[-16, 3], [-5.5, -8], [-21, -15]];
const ANCH = [[-30, -16], [-9, -15], [5, 4], [27, 13], [11, 15]];
const TEN = [[-9, -21], [6, -24], [21, -20], [33, -11], [38, 4], [31, 18], [14, 23], [-6, 22], [-20, 16], [-33, 21]];
const LANES = [-.56, -.28, 0, .28, .56];

/* ---------- scenes ---------- */
const scenes = {};
const asp = () => innerWidth / innerHeight;
const D = 62, TAN = Math.tan(36 * Math.PI / 360);
const hh = () => D * TAN; const hw = () => hh() * asp();
const narrow = () => asp() < 1.05;
const heroCam = () => narrow() ? { pos: [0, 4.5, 36], look: [0, 19.5, -18] } : { pos: [0, 5.5, 36], look: [0, 12.6, -18] };
const closeCam = () => narrow() ? { pos: [0, 4.5, 36], look: [0, 10, -18] } : { pos: [0, 3.8, 36], look: [0, 12.4, -18] };
function def(name, o) { scenes[name] = Object.assign({ name, buf: null, cam: () => ({ pos: [0, 0, D], look: [0, 0, 0] }), fx: [0, 0, 0, 0], add: 1, fog: [900, 1000], delay: [.6, .2, .2], span: .42, scat: 10, xf: () => IDENT, sweep: () => -1 }, o); }
def('horizon', { cam: heroCam, fog: [70, 215] });
def('hero', { cam: heroCam, fx: [1, 0, 0, 0], fog: [70, 215], delay: [.75, 0, .25], scat: 8 });
const mapCam = () => narrow() ? { pos: [0, 118, 42], look: [0, 0, -2] } : { pos: [0, 66, 30], look: [2, 0, -2] };
def('map', { cam: mapCam, delay: [.3, 0, .7], scat: 9 });
def('fit', { cam: mapCam, delay: [.12, .88, 0], span: .16, scat: 1.5 });
def('reason', { cam: () => { const c = mapCam(); return { pos: [c.pos[0], c.pos[1] * .92, c.pos[2]], look: c.look }; }, delay: [.8, .2, 0], span: .5, scat: 1 });
def('tunnel', { cam: () => ({ pos: [0, 0, 44], look: [0, 0, 0] }), fx: [0, 0, 3.4, 0], delay: [.9, 0, .1], scat: 22 });
const dialX = () => { const n = narrow(); return n ? 0 : -hw() * .47; };
const dialShort = () => !narrow() && innerHeight < 760, dialY = () => narrow() ? hh() * .1 : -hh() * (dialShort() ? .38 : .32);
def('dial', { xf: t => { const s = hh() * (narrow() ? .46 : dialShort() ? .38 : .45); return trs(dialX(), dialY(), 0, s, s, s, 0, 0, t * .02); }, delay: [.9, 0, .1], scat: 16, sweep: () => S.twelve });
def('bar', { xf: () => { const w = hw() * (narrow() ? .9 : .78), s = hh(); return trs(0, narrow() ? -hh() * .02 : -hh() * .02, 0, w, s * (narrow() ? .5 : .7), s, 0, 0, 0); }, delay: [.8, .2, 0], scat: 12, sweep: () => S.day });
def('rivers', { xf: () => trs(0, 0, 0, hw() * 1.04, hh(), 4, 0, 0, 0), fx: [0, .07, 0, 0], delay: [.85, .15, 0], scat: 14 });
def('strata', { xf: () => trs(0, 0, 0, hw() * 1.04, hh(), 4, 0, 0, 0), delay: [.9, .1, 0], scat: 5 });
const tenCam = () => narrow() ? { pos: [0, 118, 26], look: [0, 0, -2] } : { pos: [0, 66, 24], look: [0, 0, -2] };
def('ten', { cam: tenCam, add: 0, delay: [.7, 0, .3], scat: 14 });
const machXf = () => { const n = narrow(), s = hh() * (n ? .024 : .05), yaw = .785 + S.mx * .3 + Math.sin(T * .16) * .09, pitch = .55 - S.my * .12; return trs(n ? 0 : hw() * .33, n ? -hh() * (.66 + S.explode * .12) : -hh() * (.2 + S.explode * .46), 0, s, s, s, yaw, pitch, 0); };
const mfx = () => [0, 0, 0, 0];
def('m0', { xf: machXf, fx: mfx(), delay: [.9, .1, 0], scat: 12 });
def('m1', { xf: machXf, fx: mfx(), delay: [.9, .1, 0], scat: 9 });
def('m2', { xf: machXf, fx: mfx(), delay: [.9, .1, 0], scat: 9 });
def('closing', { cam: closeCam, fx: [.85, 0, 0, 0], fog: [70, 215], delay: [.7, 0, .3], scat: 10 });

def('segs', { cam: mapCam, delay: [.12, .88, 0], span: .16, scat: 2 });
def('tenDark', { cam: mapCam, delay: [.5, 0, .5], scat: 9 });
const yIso = () => { const n = narrow(); return { n, s: hh() * (n ? .024 : .05) }; };
const mx2 = (yBase, yExp, sk, pitch0, cx) => () => { const n = narrow(), s = hh() * (n ? .024 : .05) * (sk || 1), yaw = .785 + S.mx * .3 + Math.sin(T * .16) * .09, pitch = (pitch0 || .55) - S.my * .12; return trs(n ? 0 : hw() * (cx || .33), n ? -hh() * (.66 + S.explode * .12) : -hh() * (yBase + S.explode * yExp), 0, s, s, s, yaw, pitch, 0); };
def('school', { xf: mx2(.32, .2, 1.05), delay: [.9, .1, 0], scat: 10 });
def('org', { xf: mx2(.56, 0, .92), delay: [.9, .1, 0], scat: 10 });
def('thali', { xf: mx2(.27, .12, .96, .68, .42), delay: [.9, .1, 0], scat: 10 });
def('wheel', { xf: () => { const n = narrow(), s = hh() * (n ? .022 : .046); return trs(n ? 0 : hw() * .56, n ? -hh() * .76 : -hh() * .02, 0, s, s, s, -.42 + S.mx * .16, .08 - S.my * .08, 0); }, delay: [.9, .1, 0], scat: 12 });
def('riversLow', { alias: 'rivers', xf: () => trs(0, -hh() * .7, 0, hw() * 1.04, hh() * .26, 4, 0, 0, 0), fx: [0, .07, 0, 0], delay: [.85, .15, 0], scat: 14 });
def('section', { xf: () => { if (!narrow()) return IDENT; const s = hw() * .065; return trs(-hw() * 1.08, -hh() * .78, 0, s, s, s, 0, 0, 0); }, delay: [.8, .2, 0], scat: 8 });
def('guard', { xf: () => { const s = hh() / 20 * (narrow() ? .47 : .94); return trs(narrow() ? 0 : -hw() * .4, narrow() ? -hh() * .42 : -hh() * .02, 0, s, s, s, S.mx * .14, -S.my * .1, 0); }, delay: [.9, .1, 0], scat: 10 });
def('route', { xf: () => trs(0, narrow() ? hh() * .3 : hh() * .16, 0, hw() * .98, hh() * (narrow() ? .36 : .62), 1, 0, 0, 0), delay: [.8, .2, 0], scat: 10, sweep: () => S.route });
def('tide', { xf: () => trs(0, hh() * .05, 0, hw(), hh() * .9, 1, 0, 0, 0), add: 0, foam: true, delay: [.2, .8, 0], span: .4, scat: 5, sweep: () => S.tide });
def('beacon', { cam: closeCam, fx: [.6, 0, 0, 0], fog: [70, 215], delay: [.7, 0, .3], scat: 8 });
def('moonhero', { cam: closeCam, fx: [.7, 0, 0, 0], fog: [70, 215], delay: [.7, 0, .3], scat: 8, alias: 'closing', moon: () => narrow() ? [20, 47, -112, 0] : [hw() * .62, 25, -48, 0] });
scenes.ten.foam = true;
const QUEUE = PAGE.scenes;
function upload(sc, A) { sc.buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, sc.buf); gl.bufferData(gl.ARRAY_BUFFER, A, gl.STATIC_DRAW);  for (const k in scenes) if (scenes[k].alias === sc.name) scenes[k].buf = sc.buf; }
const pending = [];
function bindPair(a, b) {
  const stride = STRIDE * 4;
  gl.bindBuffer(gl.ARRAY_BUFFER, a.buf); gl.vertexAttribPointer(0, 3, gl.FLOAT, false, stride, 0); gl.vertexAttribPointer(1, 4, gl.FLOAT, false, stride, 12); gl.vertexAttribPointer(2, 2, gl.FLOAT, false, stride, 28);
  gl.bindBuffer(gl.ARRAY_BUFFER, b.buf); gl.vertexAttribPointer(3, 3, gl.FLOAT, false, stride, 0); gl.vertexAttribPointer(4, 4, gl.FLOAT, false, stride, 12); gl.vertexAttribPointer(5, 2, gl.FLOAT, false, stride, 28);
}

/* ---------- live state, set by the page ---------- */
const S = { bg: [5 / 255, 14 / 255, 29 / 255], from: 'horizon', to: 'hero', mix: 0, twelve: 0, day: 0, route: 0, tide: 0, rip: new Float32Array(16), mx: 0, my: 0, explode: 0, calm: 1, dim: 1, mouse: [999, 999], camShift: [0, 0] };
let T = 0, last = 0, ready = false, W = 0, H = 0, dpr = 1, boundA = null, boundB = null, VP = IDENT;
const lerpV = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
function resize() {
  dpr = Math.min(devicePixelRatio || 1, SMALL ? 1.6 : 1.8) * qual; W = innerWidth; H = innerHeight;
  cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr); gl.viewport(0, 0, cv.width, cv.height);
}
let qual = 1, frames = 0, tacc = 0;
addEventListener('resize', resize);

const waveUniform = () => {
  if (asp() < .8) return [-6.2, 0, .5];
  if (asp() < 1.05) return [-5.4, 0, .62];
  if (asp() < 1.35) return [4.4, 0, .72];
  return [5.4, 0, .9];
};
const moonUniform = () => narrow() ? [5, 36, -74, 0] : [hw() * 1.02 + 3, 31, -70, 0];
const project = (p) => { const x = VP[0] * p[0] + VP[4] * p[1] + VP[8] * p[2] + VP[12], y = VP[1] * p[0] + VP[5] * p[1] + VP[9] * p[2] + VP[13], w = VP[3] * p[0] + VP[7] * p[1] + VP[11] * p[2] + VP[15]; return { x: (x / w * .5 + .5) * W, y: (.5 - y / w * .5) * H, w }; };
const seaJS = (x, z, t) => Math.sin(x * .17 + t * .5) * .95 + Math.sin(z * .23 - t * .62 + x * .05) * 1.05 + Math.sin((x + z) * .41 + t * .85) * .38 + Math.sin((x - z * 1.3) * .83 - t * 1.2) * .17;

function ray(mx, my) { /* where the cursor meets the sea */
  const c = scenes[S.to].cam(); const fwd = norm([c.look[0] - c.pos[0], c.look[1] - c.pos[1], c.look[2] - c.pos[2]]), right = norm(cross(fwd, [0, 1, 0])), up = cross(right, fwd); const ty = TAN, tx = ty * asp(); const nx = mx / W * 2 - 1, ny = 1 - my / H * 2; const d = norm([fwd[0] + right[0] * nx * tx + up[0] * ny * ty, fwd[1] + right[1] * nx * tx + up[1] * ny * ty, fwd[2] + right[2] * nx * tx + up[2] * ny * ty]); if (d[1] >= -.001) return null; const k = -c.pos[1] / d[1]; return [c.pos[0] + d[0] * k, c.pos[2] + d[2] * k];
}

function frame(now) {
  requestAnimationFrame(frame);
  if (pending.length) { const q = pending.shift(); upload(scenes[q.n], q.A); boundA = boundB = null; }
  if (!ready) return;
  const dt = Math.min(.05, (now - last) / 1000); last = now; if (!STILL) T += dt;
  if (window.__beforeFrame) window.__beforeFrame(dt, T);
  /* drop detail if the machine is struggling */
  if (dt > 0 && !window.__noAdapt) { frames++; tacc += dt; if (frames === 50) { const avg = tacc / 50; if (avg > .03 && drawN > N * .4) { drawN = Math.floor(drawN * .72); if (qual > .7) { qual *= .86; resize(); } } frames = 0; tacc = 0; } }
  const a = scenes[S.from], b = scenes[S.to]; if (!a.buf || !b.buf) return;
  if (boundA !== a || boundB !== b) { bindPair(a, b); boundA = a; boundB = b; }
  const m = S.mix, e = m * m * (3 - 2 * m), ca = a.cam(), cb = b.cam();
  const pos = lerpV(ca.pos, cb.pos, e), lk = lerpV(ca.look, cb.look, e);
  pos[0] += S.camShift[0]; pos[1] += S.camShift[1];
  VP = mul(persp(36 * Math.PI / 180, asp(), 1, 600), look(pos, lk));
  gl.clearColor(S.bg[0], S.bg[1], S.bg[2], 1); gl.clear(gl.COLOR_BUFFER_BIT);
  gl.uniformMatrix4fv(U.uVP, false, VP); gl.uniformMatrix4fv(U.uXA, false, a.xf(T)); gl.uniformMatrix4fv(U.uXB, false, b.xf(T));
  const fa = a.fx.slice(), fb = b.fx.slice(); const EX = { m0: 6.6, school: 5.2, thali: 3.2 }; if (EX[a.name]) fa[3] = S.explode * EX[a.name]; if (EX[b.name]) fb[3] = S.explode * EX[b.name];
  gl.uniform4fv(U.uFA, fa); gl.uniform4fv(U.uFB, fb);
  gl.uniform1f(U.uT, T); gl.uniform1f(U.uMix, m); gl.uniform1f(U.uSpan, b.span); gl.uniform1f(U.uScat, b.scat); gl.uniform1f(U.uPx, cv.height / (2 * TAN)); gl.uniform1f(U.uDpr, dpr);
  gl.uniform1f(U.uDim, S.dim); gl.uniform1f(U.uCalm, S.calm); gl.uniform1f(U.uGlow, 1); gl.uniform1f(U.uAdd, a.add + (b.add - a.add) * e);
  gl.uniform1f(U.uFogN, a.fog[0] + (b.fog[0] - a.fog[0]) * e); gl.uniform1f(U.uFogF, a.fog[1] + (b.fog[1] - a.fog[1]) * e);
  gl.uniform1f(U.uSwA, a.sweep()); gl.uniform1f(U.uSwB, b.sweep());
  gl.uniform3fv(U.uDelay, b.delay); gl.uniform3fv(U.uWave, waveUniform()); gl.uniform4fv(U.uMoon, (b.moon || a.moon || moonUniform)());
  gl.uniform4fv(U.uRip, S.rip);
  gl.uniform2fv(U.uMouse, S.mouse); gl.uniform1f(U.uCut, b.name === 'rivers' && !narrow() ? -.1 : -9);
  gl.drawArrays(gl.POINTS, 0, drawN);
  if (window.__afterFrame) window.__afterFrame(T);
}

let waveImg = null;
function loadWave() {
  return new Promise(res => { const im = new Image(); im.onload = () => { const c = document.createElement('canvas'); c.width = im.width; c.height = im.height; const x = c.getContext('2d'); x.drawImage(im, 0, 0); waveImg = { d: x.getImageData(0, 0, im.width, im.height).data, w: im.width, h: im.height }; res(); }; im.onerror = () => res(); im.src = window.__WAVE__; });
}
async function boot() {
  resize();
  const cfg = { N, SMALL, ANCH, SIGNALS, TEN, LANES, wave: null };
  upload(scenes.horizon, Builders(cfg).horizon());
  S.from = S.to = 'horizon'; bindPair(scenes.horizon, scenes.horizon); boundA = boundB = scenes.horizon; ready = true; requestAnimationFrame(t => { last = t; frame(t); });
  await loadWave();
  cfg.wave = waveImg || { d: new Uint8ClampedArray(4), w: 1, h: 1 };
  try {
    const src = 'const Builders=' + Builders.toString() + ';onmessage=function(e){var B=Builders(e.data),o=' + JSON.stringify(QUEUE) + ';for(var i=0;i<o.length;i++){var A=B[o[i]]();postMessage({n:o[i],A:A},[A.buffer]);}};';
    const w = new Worker(URL.createObjectURL(new Blob([src], { type: 'text/javascript' })));
    w.onmessage = e => pending.push(e.data);
    w.onerror = () => { w.terminate(); mainThread(cfg); };
    w.postMessage(cfg);
  } catch (e) { mainThread(cfg); }
}
function mainThread(cfg) { const B = Builders(cfg); let i = 0; const next = () => { const n = QUEUE[i++]; if (!n) return; if (!scenes[n].buf) pending.push({ n, A: B[n]() }); setTimeout(next, 8); }; next(); }

window.RheoWorld = { dialX, dialY, PAGE, S, scenes, project, seaJS, ray, boot, SIGNALS, ANCH, TEN, LANES, hh, hw, narrow, T: () => T, isReady: n => !!scenes[n] && !!scenes[n].buf, STILL, counts: () => ({ N, drawN, qual }) };
boot().catch(e => { console.error(e); document.documentElement.classList.add('no-gl'); });
})();
