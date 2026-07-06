/* Tinta viva: campo BRANCO institucional + anel de cor girando no perímetro,
   estilo RGB premium (a cor viaja em volta da marca como nos produtos com
   iluminação de borda). Dois anéis: um NÍTIDO (a fita de cor definida) e um
   BLOOM difuso por baixo (o brilho de LED), ambos girando em sincronia.

   O anel usa a técnica de máscara-moldura (duas máscaras compostas por
   exclusão: sobra só a faixa da borda) com um disco conic-gradient girando
   dentro. Ciclo de cor palíndromo SEM VERDE (veto do dono). Só transform
   anima; sob prefers-reduced-motion o anel congela colorido. */

const CICLO = [
  "#3d5fc4", // índigo vivo
  "#8b52d6", // violeta
  "#e0407e", // magenta
  "#f2643a", // coral
  "#f5b83d", // âmbar
  "#f2643a",
  "#e0407e",
  "#8b52d6",
  "#3d5fc4", // fecha onde abriu: giro sem emenda
];
const disco = `conic-gradient(from 0deg, ${CICLO.join(", ")})`;

interface AnelProps {
  espessura: number;
  blur?: number;
  opacidade: number;
}

/* Moldura de cor: máscara deixa visível só a faixa da borda; dentro dela,
   o disco cônico gira (cobre a diagonal do retângulo: w-[260%] quadrado). */
function Anel({ espessura, blur, opacidade }: AnelProps) {
  return (
    <div
      className="absolute inset-0"
      style={{
        padding: espessura,
        opacity: opacidade,
        filter: blur ? `blur(${blur}px)` : undefined,
        WebkitMaskImage: "linear-gradient(#000 0 0), linear-gradient(#000 0 0)",
        WebkitMaskClip: "content-box, border-box",
        WebkitMaskComposite: "xor",
        maskImage: "linear-gradient(#000 0 0), linear-gradient(#000 0 0)",
        maskClip: "content-box, border-box",
        maskComposite: "exclude",
      }}
    >
      <span
        className="absolute left-1/2 top-1/2 aspect-square w-[260%]"
        style={{
          background: disco,
          transform: "translate(-50%, -50%)",
          animation: "scf-rgb 18s linear infinite",
          willChange: "transform",
        }}
      />
    </div>
  );
}

export function InkFlow() {
  return (
    <div
      aria-hidden="true"
      className="relative h-full w-full overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #fbfbfc 0%, #eff1f4 100%)",
      }}
    >
      {/* Bloom: o brilho difuso do LED por baixo da fita */}
      <Anel espessura={26} blur={14} opacidade={0.5} />
      {/* A fita de cor nítida */}
      <Anel espessura={10} opacidade={0.95} />
    </div>
  );
}
