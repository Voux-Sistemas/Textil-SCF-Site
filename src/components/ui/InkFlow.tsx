/* Tinta viva: campo BRANCO institucional com as cores nascendo nas BORDAS e
   derretendo em degradê até o branco central. As cores giram devagar em
   volta da marca (disco conic-gradient rotacionando); uma máscara radial
   deixa a cor plena no contorno e a dissolve suavemente rumo ao centro.

   Ciclo palíndromo SEM VERDE (veto do dono). Só transform anima; sob
   prefers-reduced-motion o degradê congela colorido, sem perda. */

const CICLO = [
  "#46609e", // índigo
  "#7b5fae", // violeta
  "#b8557e", // magenta
  "#d4764f", // coral
  "#dfb268", // âmbar
  "#d4764f",
  "#b8557e",
  "#7b5fae",
  "#46609e", // fecha onde abriu: giro sem emenda
];
const disco = `conic-gradient(from 0deg, ${CICLO.join(", ")})`;

/* Degradê borda -> centro: a máscara radial revela a cor no contorno
   (plena nas bordas/cantos) e a apaga gradualmente até o miolo branco. */
const mascara = "radial-gradient(120% 120% at 50% 50%, transparent 30%, #000 84%)";

export function InkFlow() {
  return (
    <div
      aria-hidden="true"
      className="relative h-full w-full overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #fbfbfc 0%, #eff1f4 100%)",
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          opacity: 0.85,
          WebkitMaskImage: mascara,
          maskImage: mascara,
        }}
      >
        {/* Disco de cor girando (cobre a diagonal do retângulo) */}
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
    </div>
  );
}
