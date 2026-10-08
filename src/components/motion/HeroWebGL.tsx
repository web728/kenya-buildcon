"use client";

import { useEffect, useRef } from "react";

const VERTEX_SRC = `
  attribute vec2 aSeed;
  uniform float uTime;
  uniform vec2 uResolution;
  varying float vAlpha;
  varying float vGreen;

  void main() {
    float speed = 0.02 + aSeed.x * 0.03;
    float driftX = sin(uTime * speed + aSeed.y * 6.283) * 0.15;
    float y = mod(aSeed.y - uTime * speed * 0.6, 1.0);
    vec2 pos = vec2(aSeed.x + driftX, y);
    vec2 clip = pos * 2.0 - 1.0;
    gl_Position = vec4(clip.x, -clip.y, 0.0, 1.0);
    gl_PointSize = mix(1.5, 4.0, aSeed.x) * (uResolution.y / 700.0);
    vAlpha = 0.25 + 0.5 * aSeed.x;
    vGreen = step(0.5, fract(aSeed.y * 37.0));
  }
`;

const FRAGMENT_SRC = `
  precision mediump float;
  varying float vAlpha;
  varying float vGreen;

  void main() {
    vec2 c = gl_PointCoord - vec2(0.5);
    float d = length(c);
    if (d > 0.5) discard;
    float edge = smoothstep(0.5, 0.0, d);
    vec3 blue = vec3(0.008, 0.639, 0.863);
    vec3 green = vec3(0.145, 0.702, 0.294);
    vec3 color = mix(blue, green, vGreen);
    gl_FragColor = vec4(color, edge * vAlpha);
  }
`;

function compileShader(gl: WebGLRenderingContext, type: number, src: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

const PARTICLE_COUNT = 140;

/**
 * Lightweight raw-WebGL particle field for the hero background — a subtle
 * "construction-line particle" drift in brand blue/green. No three.js
 * dependency (a few KB of shader code, not a 500KB+ 3D engine). Renders
 * nothing (CSS/photo backdrop already covers the hero) when WebGL is
 * unavailable or the visitor prefers reduced motion.
 */
export function HeroWebGL({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const gl = canvas.getContext("webgl", { alpha: true, antialias: true, premultipliedAlpha: true });
    if (!gl) return; // No WebGL support — static backdrop already in place.

    const vertexShader = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SRC);
    const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SRC);
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;

    const seeds = new Float32Array(PARTICLE_COUNT * 2);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      seeds[i * 2] = Math.random();
      seeds[i * 2 + 1] = Math.random();
    }

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, seeds, gl.STATIC_DRAW);

    const aSeed = gl.getAttribLocation(program, "aSeed");
    const uTime = gl.getUniformLocation(program, "uTime");
    const uResolution = gl.getUniformLocation(program, "uResolution");

    gl.enableVertexAttribArray(aSeed);
    gl.vertexAttribPointer(aSeed, 2, gl.FLOAT, false, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.useProgram(program);

    let raf = 0;
    let running = true;
    const start = performance.now();

    function resize() {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const { clientWidth, clientHeight } = canvas;
      canvas.width = clientWidth * dpr;
      canvas.height = clientHeight * dpr;
      gl!.viewport(0, 0, canvas.width, canvas.height);
      gl!.uniform2f(uResolution, canvas.width, canvas.height);
    }

    function render(now: number) {
      if (!running) return;
      gl!.clear(gl!.COLOR_BUFFER_BIT);
      gl!.uniform1f(uTime, (now - start) / 1000);
      gl!.drawArrays(gl!.POINTS, 0, PARTICLE_COUNT);
      raf = requestAnimationFrame(render);
    }

    const onVisibility = () => {
      running = document.visibilityState === "visible";
      if (running) raf = requestAnimationFrame(render);
      else cancelAnimationFrame(raf);
    };

    resize();
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);
    raf = requestAnimationFrame(render);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      gl.deleteBuffer(buffer);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />;
}
