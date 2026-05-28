'use client';

import React, { useEffect, useRef } from 'react';

// Fragment shader, brand-tinted fractal smoke.
// u_color drives the bright-parts tint (defaults to Rheo AI Wave Gold #C4A25A).
const fragmentShaderSource = `#version 300 es
precision highp float;
out vec4 O;
uniform float time;
uniform vec2 resolution;
uniform vec3 u_color;

#define FC gl_FragCoord.xy
#define R resolution
#define T (time+660.)

float rnd(vec2 p){p=fract(p*vec2(12.9898,78.233));p+=dot(p,p+34.56);return fract(p.x*p.y);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p),u=f*f*(3.-2.*f);return mix(mix(rnd(i),rnd(i+vec2(1,0)),u.x),mix(rnd(i+vec2(0,1)),rnd(i+1.),u.x),u.y);}
// fbm with 4 octaves (was 5). Visually identical for slow smoke, ~20% cheaper.
float fbm(vec2 p){float t=.0,a=1.;for(int i=0;i<4;i++){t+=a*noise(p);p*=mat2(1,-1.2,.2,1.2)*2.;a*=.5;}return t;}

void main(){
  vec2 uv=(FC-.5*R)/R.y;
  vec3 col=vec3(1);
  uv.x+=.25;
  uv*=vec2(2,1);

  float n=fbm(uv*.28-vec2(T*.01,0));
  n=noise(uv*3.+n*2.);

  col.r-=fbm(uv+vec2(0,T*.015)+n);
  col.g-=fbm(uv*1.003+vec2(0,T*.015)+n+.003);
  col.b-=fbm(uv*1.006+vec2(0,T*.015)+n+.006);

  col=mix(col, u_color, dot(col,vec3(.21,.71,.07)));

  col=mix(vec3(.05),col,min(time*.5,1.));
  col=clamp(col,.05,1.);
  O=vec4(col,1);
}`;

const vertexShaderSource = `#version 300 es
precision highp float;
in vec4 position;
void main(){gl_Position=position;}`;

const BRAND_GOLD: [number, number, number] = [0.769, 0.635, 0.353];

class Renderer {
  private readonly vertexSrc = vertexShaderSource;
  private readonly vertices = [-1, 1, -1, -1, 1, 1, 1, -1];

  private gl: WebGL2RenderingContext;
  private canvas: HTMLCanvasElement;
  private program: WebGLProgram | null = null;
  private vs: WebGLShader | null = null;
  private fs: WebGLShader | null = null;
  private buffer: WebGLBuffer | null = null;
  private color: [number, number, number] = [...BRAND_GOLD];

  // Internal render scale. 0.5 means we GPU-shade 25% of the native pixel
  // count and CSS upscales the canvas with a tiny blur to smooth the result.
  // The slow brand smoke does not benefit from sharp retina sampling.
  private renderScale = 0.5;

  constructor(canvas: HTMLCanvasElement, fragmentSource: string) {
    this.canvas = canvas;
    this.gl = canvas.getContext('webgl2') as WebGL2RenderingContext;
    this.setup(fragmentSource);
    this.init();
  }

  updateColor(newColor: [number, number, number]) {
    this.color = newColor;
  }

  updateScale() {
    const targetW = Math.max(2, Math.round(window.innerWidth * this.renderScale));
    const targetH = Math.max(2, Math.round(window.innerHeight * this.renderScale));
    this.canvas.width = targetW;
    this.canvas.height = targetH;
    this.gl.viewport(0, 0, targetW, targetH);
  }

  private compile(shader: WebGLShader, source: string) {
    const gl = this.gl;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error('Shader error:', gl.getShaderInfoLog(shader));
    }
  }

  reset() {
    const { gl, program, vs, fs } = this;
    if (!program) return;
    if (vs) { gl.detachShader(program, vs); gl.deleteShader(vs); }
    if (fs) { gl.detachShader(program, fs); gl.deleteShader(fs); }
    gl.deleteProgram(program);
    this.program = null;
  }

  private setup(fragmentSource: string) {
    const gl = this.gl;
    const vs = gl.createShader(gl.VERTEX_SHADER);
    const fs = gl.createShader(gl.FRAGMENT_SHADER);
    const program = gl.createProgram();
    if (!vs || !fs || !program) return;
    this.vs = vs;
    this.fs = fs;
    this.compile(vs, this.vertexSrc);
    this.compile(fs, fragmentSource);
    this.program = program;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Link error:', gl.getProgramInfoLog(program));
    }
  }

  private init() {
    const { gl, program } = this;
    if (!program) return;
    this.buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
    const pos = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);
    (program as any)._res   = gl.getUniformLocation(program, 'resolution');
    (program as any)._time  = gl.getUniformLocation(program, 'time');
    (program as any)._color = gl.getUniformLocation(program, 'u_color');
  }

  render(now = 0) {
    const { gl, program, buffer, canvas } = this;
    if (!program || !gl.isProgram(program)) return;
    gl.clearColor(0.027, 0.063, 0.118, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(program);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.uniform2f((program as any)._res, canvas.width, canvas.height);
    gl.uniform1f((program as any)._time, now * 1e-3);
    gl.uniform3fv((program as any)._color, this.color);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }
}

const hexToRgb = (hex: string): [number, number, number] | null => {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return r
    ? [parseInt(r[1], 16) / 255, parseInt(r[2], 16) / 255, parseInt(r[3], 16) / 255]
    : null;
};

interface SmokeBackgroundProps {
  smokeColor?: string;
  className?: string;
  /** Cap framerate. Default 20fps. The smoke is so slow this is invisible. */
  targetFps?: number;
}

export const SmokeBackground: React.FC<SmokeBackgroundProps> = ({
  smokeColor = '#C4A25A',
  className = '',
  targetFps = 20,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<Renderer | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    // Skip entirely on coarse-pointer (touch) devices and on very narrow
    // viewports. WebGL fbm at any res is too expensive for phone GPUs and
    // burns battery for an effect you cannot appreciate at that size.
    const touchOnly = window.matchMedia('(pointer: coarse)').matches;
    const narrow = window.innerWidth < 768;
    if (touchOnly || narrow) return;

    const canvas = canvasRef.current;
    const renderer = new Renderer(canvas, fragmentShaderSource);
    rendererRef.current = renderer;

    const onResize = () => renderer.updateScale();
    onResize();
    window.addEventListener('resize', onResize);

    // Pause when the hero canvas is out of viewport
    let visible = true;
    const io = new IntersectionObserver(
      ([entry]) => { visible = entry.isIntersecting; },
      { threshold: 0.01 }
    );
    io.observe(canvas);

    // Pause when the browser tab is hidden
    let tabVisible = !document.hidden;
    const onVis = () => { tabVisible = !document.hidden; };
    document.addEventListener('visibilitychange', onVis);

    // Honour reduced motion: render one frame, then stop the loop
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const frameMs = 1000 / Math.max(1, targetFps);
    let raf = 0;
    let lastDraw = 0;

    if (reduce) {
      renderer.render(performance.now());
      return () => {
        window.removeEventListener('resize', onResize);
        document.removeEventListener('visibilitychange', onVis);
        io.disconnect();
        renderer.reset();
      };
    }

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (!visible || !tabVisible) return;
      if (now - lastDraw < frameMs) return;
      lastDraw = now;
      renderer.render(now);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVis);
      io.disconnect();
      renderer.reset();
    };
  }, [targetFps]);

  useEffect(() => {
    const rgb = hexToRgb(smokeColor);
    if (rgb && rendererRef.current) rendererRef.current.updateColor(rgb);
  }, [smokeColor]);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full block ${className}`}
      style={{
        width: '100%',
        height: '100%',
        display: 'block',
        // Tiny blur smooths the upscale from the reduced render resolution
        filter: 'blur(0.5px)',
        willChange: 'transform',
      }}
    />
  );
};
