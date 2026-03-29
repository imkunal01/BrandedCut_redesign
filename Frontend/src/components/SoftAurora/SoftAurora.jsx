import { Renderer, Program, Mesh, Triangle } from 'ogl';
import { useEffect, useRef } from 'react';
import './SoftAurora.css';

function hexToVec3(hex) {
  const h = hex.replace('#', '');
  return [
    parseInt(h.slice(0, 2), 16) / 255,
    parseInt(h.slice(2, 4), 16) / 255,
    parseInt(h.slice(4, 6), 16) / 255
  ];
}

const vertexShader = `
attribute vec2 uv;
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0, 1);
}
`;

// Optimised: mediump precision + 2 octaves instead of 3 + simplified hash
const fragmentShader = `
precision mediump float;

uniform float uTime;
uniform vec3 uResolution;
uniform float uSpeed;
uniform float uScale;
uniform float uBrightness;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform float uNoiseFreq;
uniform float uNoiseAmp;
uniform float uBandHeight;
uniform float uBandSpread;
uniform float uLayerOffset;
uniform float uColorSpeed;
uniform vec2 uMouse;
uniform float uMouseInfluence;
uniform bool uEnableMouse;

#define TAU 6.28318

// Faster hash — no acos/sphere mapping
float hash(vec3 p) {
  return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453);
}

vec3 gradientHash(vec3 p) {
  float h = hash(p);
  float theta = h * TAU;
  float phi = hash(p + 1.3) * 3.14159;
  return vec3(cos(theta) * sin(phi), sin(theta) * sin(phi), cos(phi));
}

float smooth3(float t) {
  return t * t * (3.0 - 2.0 * t);
}

float perlin3D(float amplitude, float frequency, float px, float py, float pz) {
  float x = px * frequency;
  float y = py * frequency;
  float fx = floor(x); float fy = floor(y); float fz = floor(pz);
  float cx = fx + 1.0;  float cy = fy + 1.0;  float cz = fz + 1.0;

  float d000 = dot(gradientHash(vec3(fx, fy, fz)), vec3(x - fx, y - fy, pz - fz));
  float d100 = dot(gradientHash(vec3(cx, fy, fz)), vec3(x - cx, y - fy, pz - fz));
  float d010 = dot(gradientHash(vec3(fx, cy, fz)), vec3(x - fx, y - cy, pz - fz));
  float d110 = dot(gradientHash(vec3(cx, cy, fz)), vec3(x - cx, y - cy, pz - fz));
  float d001 = dot(gradientHash(vec3(fx, fy, cz)), vec3(x - fx, y - fy, pz - cz));
  float d101 = dot(gradientHash(vec3(cx, fy, cz)), vec3(x - cx, y - fy, pz - cz));
  float d011 = dot(gradientHash(vec3(fx, cy, cz)), vec3(x - fx, y - cy, pz - cz));
  float d111 = dot(gradientHash(vec3(cx, cy, cz)), vec3(x - cx, y - cy, pz - cz));

  float sx = smooth3(x - fx);
  float sy = smooth3(y - fy);
  float sz = smooth3(pz - fz);

  float ly0 = mix(mix(d000, d100, sx), mix(d010, d110, sx), sy);
  float ly1 = mix(mix(d001, d101, sx), mix(d011, d111, sx), sy);
  return amplitude * mix(ly0, ly1, sz);
}

vec3 cosineGradient(float t, vec3 a, vec3 b, vec3 c, vec3 d) {
  return a + b * cos(TAU * (c * t + d));
}

float auroraGlow(float t, vec2 shift) {
  vec2 uv = gl_FragCoord.xy / uResolution.y;
  uv += shift;
  vec2 samplePos = uv * uScale;

  // 2 octaves (down from 3) — saves ~33% fragment work
  float noiseVal = perlin3D(uNoiseAmp, uNoiseFreq, samplePos.x, samplePos.y, t);
  noiseVal     += perlin3D(uNoiseAmp * 0.5, uNoiseFreq * 2.0, samplePos.x, samplePos.y, t);

  float yBand = uv.y * 10.0 - uBandHeight * 10.0;
  return 0.3 * max(exp(uBandSpread * (1.0 - 1.1 * abs(noiseVal + yBand))), 0.0);
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution.xy;
  float t = uSpeed * 0.4 * uTime;

  vec2 shift = vec2(0.0);
  if (uEnableMouse) {
    shift = (uMouse - 0.5) * uMouseInfluence;
  }

  float g1 = auroraGlow(t, shift);
  float g2 = auroraGlow(t + uLayerOffset, shift);

  vec3 col = g1 * cosineGradient(uv.x + uTime * uSpeed * 0.2 * uColorSpeed,
    vec3(0.5), vec3(0.5), vec3(1.0), vec3(0.3, 0.20, 0.20)) * uColor1;
  col      += g2 * cosineGradient(uv.x + uTime * uSpeed * 0.1 * uColorSpeed,
    vec3(0.5), vec3(0.5), vec3(2.0, 1.0, 0.0), vec3(0.5, 0.20, 0.25)) * uColor2;

  col *= uBrightness;
  float alpha = clamp(length(col), 0.0, 1.0);
  gl_FragColor = vec4(col, alpha);
}
`;

export default function SoftAurora({
  speed = 0.6,
  scale = 1.5,
  brightness = 1.0,
  color1 = '#f7f7f7',
  color2 = '#e100ff',
  noiseFrequency = 2.5,
  noiseAmplitude = 1.0,
  bandHeight = 0.5,
  bandSpread = 1.0,
  layerOffset = 0,
  colorSpeed = 1.0,
  enableMouseInteraction = true,
  mouseInfluence = 0.25
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    // Render at 0.5x DPR — halves fillrate with nearly no visible difference
    const DPR = Math.min(window.devicePixelRatio, 1) * 0.7;

    const renderer = new Renderer({ alpha: true, premultipliedAlpha: false, dpr: DPR });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);

    let program;
    let currentMouse = [0.5, 0.5];
    let targetMouse  = [0.5, 0.5];
    let isVisible = true;
    let lastFrame = 0;
    const TARGET_MS = 1000 / 30; // Cap at 30 fps

    // Pause loop when tab is hidden
    const onVisibilityChange = () => { isVisible = !document.hidden; };
    document.addEventListener('visibilitychange', onVisibilityChange);

    // Pause when scrolled out of hero viewport
    let observer;
    if (typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        ([entry]) => { isVisible = entry.isIntersecting; },
        { threshold: 0.01 }
      );
      observer.observe(container);
    }

    function handleMouseMove(e) {
      const rect = gl.canvas.getBoundingClientRect();
      targetMouse = [
        (e.clientX - rect.left) / rect.width,
        1.0 - (e.clientY - rect.top) / rect.height
      ];
    }
    function handleMouseLeave() { targetMouse = [0.5, 0.5]; }

    function resize() {
      renderer.setSize(container.offsetWidth, container.offsetHeight);
      if (program) {
        program.uniforms.uResolution.value = [
          gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height
        ];
      }
    }
    window.addEventListener('resize', resize, { passive: true });
    resize();

    const geometry = new Triangle(gl);
    program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        uTime:           { value: 0 },
        uResolution:     { value: [gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height] },
        uSpeed:          { value: speed },
        uScale:          { value: scale },
        uBrightness:     { value: brightness },
        uColor1:         { value: hexToVec3(color1) },
        uColor2:         { value: hexToVec3(color2) },
        uNoiseFreq:      { value: noiseFrequency },
        uNoiseAmp:       { value: noiseAmplitude },
        uBandHeight:     { value: bandHeight },
        uBandSpread:     { value: bandSpread },
        uLayerOffset:    { value: layerOffset },
        uColorSpeed:     { value: colorSpeed },
        uMouse:          { value: new Float32Array([0.5, 0.5]) },
        uMouseInfluence: { value: mouseInfluence },
        uEnableMouse:    { value: enableMouseInteraction }
      }
    });

    const mesh = new Mesh(gl, { geometry, program });
    container.appendChild(gl.canvas);

    if (enableMouseInteraction) {
      gl.canvas.addEventListener('mousemove', handleMouseMove, { passive: true });
      gl.canvas.addEventListener('mouseleave', handleMouseLeave);
    }

    let rafId;
    function update(time) {
      rafId = requestAnimationFrame(update);

      // Skip frame if not visible or under FPS cap
      if (!isVisible || time - lastFrame < TARGET_MS) return;
      lastFrame = time;

      program.uniforms.uTime.value = time * 0.001;

      if (enableMouseInteraction) {
        currentMouse[0] += 0.05 * (targetMouse[0] - currentMouse[0]);
        currentMouse[1] += 0.05 * (targetMouse[1] - currentMouse[1]);
        program.uniforms.uMouse.value[0] = currentMouse[0];
        program.uniforms.uMouse.value[1] = currentMouse[1];
      }

      renderer.render({ scene: mesh });
    }
    rafId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      observer?.disconnect();
      if (enableMouseInteraction) {
        gl.canvas.removeEventListener('mousemove', handleMouseMove);
        gl.canvas.removeEventListener('mouseleave', handleMouseLeave);
      }
      if (container.contains(gl.canvas)) container.removeChild(gl.canvas);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, []); // Stable deps — props don't change after mount for this usage

  return <div ref={containerRef} className="soft-aurora-container" />;
}
