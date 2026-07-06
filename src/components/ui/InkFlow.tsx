/* Tinta viva: luz de pigmento entrando pelas BORDAS do monograma, de fora
   pra dentro - como a tinta penetra o tecido por capilaridade. O centro fica
   claro (tecido cru), o contorno é onde a cor vive; e as cores CAMINHAM
   lentamente ao longo da borda (faixa 2x com gradiente periódico + translate
   contínuo, mesma lógica do marquee).

   Paleta SEM VERDE (veto do dono): magenta, índigo, coral, âmbar, rosa,
   violeta. Animação apenas em transform; congela sob prefers-reduced-motion
   pela regra global e a moldura parada continua bonita. */

import type { CSSProperties } from "react";

/* Gradiente periódico: sequência repetida 2x + retorno à 1ª cor, para o
   translate de -50% emendar sem salto. */
function periodic(deg: number, cores: string[]): string {
  const seq = [...cores, ...cores, cores[0]];
  const n = seq.length - 1;
  const stops = seq.map((c, i) => `${c} ${((i / n) * 100).toFixed(2)}%`);
  return `linear-gradient(${deg}deg, ${stops.join(", ")})`;
}

interface Edge {
  style: CSSProperties;
  mask: string; // direção do desvanecimento (borda -> centro)
  anim: string;
}

const PROFUNDIDADE = "22%"; // quanto a luz da borda penetra no tecido (LED: rasa)

const edges: Edge[] = [
  {
    // topo: magenta -> índigo -> vinho -> azul
    style: {
      top: 0,
      left: 0,
      width: "200%",
      height: PROFUNDIDADE,
      background: periodic(90, ["#b13066", "#35509a", "#8e2f56", "#5d7ec4"]),
    },
    mask: "linear-gradient(to bottom, #000 0%, #000 28%, transparent 100%)",
    anim: "scf-edge-x 38s linear infinite",
  },
  {
    // base: coral -> âmbar -> rosa -> coral profundo
    style: {
      bottom: 0,
      left: 0,
      width: "200%",
      height: PROFUNDIDADE,
      background: periodic(90, ["#d4562c", "#e3a63b", "#d873a4", "#c8502e"]),
    },
    mask: "linear-gradient(to top, #000 0%, #000 28%, transparent 100%)",
    anim: "scf-edge-x 46s linear infinite reverse",
  },
  {
    // esquerda: rosa -> magenta -> coral -> vinho
    style: {
      left: 0,
      top: 0,
      height: "200%",
      width: PROFUNDIDADE,
      background: periodic(180, ["#d873a4", "#b13066", "#d4562c", "#8e2f56"]),
    },
    mask: "linear-gradient(to right, #000 0%, #000 28%, transparent 100%)",
    anim: "scf-edge-y 42s linear infinite",
  },
  {
    // direita: índigo -> violeta -> azul -> índigo profundo
    style: {
      right: 0,
      top: 0,
      height: "200%",
      width: PROFUNDIDADE,
      background: periodic(180, ["#35509a", "#7b4fa6", "#5d7ec4", "#2c3e6b"]),
    },
    mask: "linear-gradient(to left, #000 0%, #000 28%, transparent 100%)",
    anim: "scf-edge-y 34s linear infinite reverse",
  },
];

export function InkFlow() {
  return (
    <div
      aria-hidden="true"
      className="relative h-full w-full overflow-hidden"
      style={{
        background:
          "linear-gradient(178deg, #f7f7f9 0%, #eef0f4 46%, #f3edef 100%)",
      }}
    >
      {edges.map((e, i) => (
        <span
          key={i}
          className="ink-edge"
          style={{
            ...e.style,
            opacity: 0.88,
            WebkitMaskImage: e.mask,
            maskImage: e.mask,
            animation: e.anim,
          }}
        />
      ))}
    </div>
  );
}
