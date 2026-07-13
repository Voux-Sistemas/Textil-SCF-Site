import { useEffect, useRef } from "react";

/* Tecido interativo do hero: a estampa ondula sob o cursor como um pano
   (ondas que se propagam do mouse + dobras sombreadas + leve bojo), em
   WebGL puro, sem biblioteca.

   Salvaguardas: só monta com ponteiro fino (desktop) e sem
   prefers-reduced-motion; se WebGL ou as texturas falharem, o canvas fica
   transparente e o slideshow de <img> por baixo segue valendo. O crossfade
   das duas estampas é reproduzido no shader (mesmo ritmo de 18s do CSS). */

const VERT = `
attribute vec2 a;
void main() { gl_Position = vec4(a, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;
uniform sampler2D uT0;
uniform sampler2D uT1;
uniform vec2 uRes;
uniform vec2 uImg0;
uniform vec2 uImg1;
uniform vec2 uMouse;
uniform float uAmp;
uniform float uTime;

/* object-fit: cover da imagem no retangulo do canvas */
vec2 cover(vec2 uv, vec2 img) {
  float ra = uRes.x / uRes.y;
  float ia = img.x / img.y;
  vec2 s = ra > ia ? vec2(1.0, ia / ra) : vec2(ra / ia, 1.0);
  return (uv - 0.5) * s + 0.5;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  vec2 p = uv - uMouse;
  p.x *= uRes.x / uRes.y;
  float d = length(p);
  float infl = exp(-d * 2.4);

  /* Onda radial saindo do cursor (o "toque" no pano) */
  float phase = d * 17.0 - uTime * 4.2;
  float ripple = sin(phase);

  /* Ondulação larga do pano inteiro enquanto o mouse está sobre o hero */
  float swellX = sin(uv.y * 9.0 + uTime * 1.4);
  float swellY = sin(uv.x * 7.0 - uTime * 1.1);

  vec2 disp = normalize(p + 1e-4) * ripple * infl * uAmp * 0.011;
  disp += vec2(swellX, swellY) * uAmp * (0.25 + 0.75 * infl) * 0.006;
  disp -= p * infl * uAmp * 0.02; /* bojo: o tecido "sobe" sob o cursor */

  vec2 uvD = uv + disp;
  vec3 c0 = texture2D(uT0, cover(uvD, uImg0)).rgb;
  vec3 c1 = texture2D(uT1, cover(uvD, uImg1)).rgb;

  /* Crossfade no ritmo do slideshow CSS (ciclo 18s, fusoes de ~1.6s) */
  float u = mod(uTime, 18.0);
  float fade = smoothstep(8.2, 9.8, u) - smoothstep(16.4, 18.0, u);
  vec3 col = mix(c0, c1, fade);

  /* Dobras iluminadas: derivada da onda vira luz/sombra (o 3D do pano) */
  float shade = cos(phase) * infl * uAmp * 0.17 + swellX * uAmp * 0.035;
  col *= (1.0 + shade) * 0.82; /* 0.82 = mesmo brightness dos <img> */

  gl_FragColor = vec4(col, 1.0);
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type);
  if (!sh) return null;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) return null;
  return sh;
}

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

interface FabricCanvasProps {
  images: [string, string];
}

export function FabricCanvas({ images }: FabricCanvasProps) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const gl = canvas.getContext("webgl", {
      antialias: false,
      powerPreference: "low-power",
    });
    if (!gl) return;

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;
    const prog = gl.createProgram();
    if (!prog) return;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    /* Quad de tela cheia */
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW,
    );
    const aLoc = gl.getAttribLocation(prog, "a");
    gl.enableVertexAttribArray(aLoc);
    gl.vertexAttribPointer(aLoc, 2, gl.FLOAT, false, 0, 0);

    const U = (name: string) => gl.getUniformLocation(prog, name);
    const uRes = U("uRes");
    const uImg0 = U("uImg0");
    const uImg1 = U("uImg1");
    const uMouse = U("uMouse");
    const uAmp = U("uAmp");
    const uTime = U("uTime");

    let raf = 0;
    let disposed = false;
    let visible = true;
    const start = performance.now();

    /* Mouse suavizado (o atraso da mola vende a fisica do pano) */
    const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };
    let amp = 0;
    let ampTarget = 0;

    const section = canvas.closest("section");
    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.tx = (e.clientX - r.left) / r.width;
      mouse.ty = 1 - (e.clientY - r.top) / r.height;
      ampTarget = 1;
    };
    const onLeave = () => {
      ampTarget = 0;
    };
    section?.addEventListener("mousemove", onMove);
    section?.addEventListener("mouseleave", onLeave);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = Math.round(canvas.clientWidth * dpr);
      const h = Math.round(canvas.clientHeight * dpr);
      if (w && h && (canvas.width !== w || canvas.height !== h)) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(canvas);

    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
    const makeTexture = (unit: number, img: HTMLImageElement) => {
      const tex = gl.createTexture();
      gl.activeTexture(gl.TEXTURE0 + unit);
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, img);
    };

    Promise.all(images.map(loadImage)).then(([img0, img1]) => {
      if (disposed) return;
      makeTexture(0, img0);
      makeTexture(1, img1);
      gl.uniform1i(U("uT0"), 0);
      gl.uniform1i(U("uT1"), 1);
      gl.uniform2f(uImg0, img0.naturalWidth, img0.naturalHeight);
      gl.uniform2f(uImg1, img1.naturalWidth, img1.naturalHeight);
      resize();

      const frame = () => {
        raf = requestAnimationFrame(frame);
        if (!visible || document.hidden) return;
        mouse.x += (mouse.tx - mouse.x) * 0.1;
        mouse.y += (mouse.ty - mouse.y) * 0.1;
        amp += (ampTarget - amp) * 0.05;
        gl.uniform2f(uRes, canvas.width, canvas.height);
        gl.uniform2f(uMouse, mouse.x, mouse.y);
        gl.uniform1f(uAmp, amp);
        gl.uniform1f(uTime, (performance.now() - start) / 1000);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      };
      frame();
    }).catch(() => {
      /* sem textura, sem desenho: o slideshow por baixo continua */
    });

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      section?.removeEventListener("mousemove", onMove);
      section?.removeEventListener("mouseleave", onLeave);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [images]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
    />
  );
}
