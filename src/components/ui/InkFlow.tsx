/* Tinta viva: TECIDO TINGIDO (dip-dye). A janela do monograma mostra um pano
   mergulhado em tinta: um fluxo contínuo e saturado de cor subindo devagar
   pela trama - o mesmo gesto do reveal do hero, que "tinge" de baixo pra cima.
   Por cima, textura de trama (fios finos) e um brilho de cetim no alto.

   O ciclo de cor é um PALÍNDROMO (índigo -> violeta -> magenta -> coral ->
   âmbar -> coral -> magenta -> violeta -> índigo): cada transição é entre
   matizes vizinhos, então o loop não tem emenda nem salto. SEM VERDE (veto
   do dono). Só transform anima; congela sob prefers-reduced-motion. */

const periodo = [
  "#2c3e6b", // índigo (âncora da marca)
  "#7b4fa6", // violeta
  "#b13066", // magenta
  "#d4562c", // coral
  "#e3a63b", // âmbar
  "#d4562c",
  "#b13066",
  "#7b4fa6",
];

/* Gradiente periódico 2x + retorno à 1ª cor: o translate de -50% emenda
   perfeitamente (mesma lógica do marquee). */
function tinta(): string {
  const seq = [...periodo, ...periodo, periodo[0]];
  const n = seq.length - 1;
  const stops = seq.map((c, i) => `${c} ${((i / n) * 100).toFixed(2)}%`);
  return `linear-gradient(180deg, ${stops.join(", ")})`;
}

export function InkFlow() {
  return (
    <div aria-hidden="true" className="relative h-full w-full overflow-hidden">
      {/* O tingimento: camada 2x subindo em loop contínuo */}
      <div
        className="ink-dye inset-x-0 top-0 h-[200%]"
        style={{ background: tinta(), animation: "scf-dye 44s linear infinite" }}
      />

      {/* A trama: fios verticais e horizontais, quase imperceptíveis */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, rgba(255,255,255,0.07) 0 1px, transparent 1px 3px), " +
            "repeating-linear-gradient(0deg, rgba(12,12,24,0.06) 0 1px, transparent 1px 3px)",
        }}
      />

      {/* Cetim: um respiro de luz no alto, dá corpo de tecido nobre */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(130% 55% at 28% 10%, rgba(255,255,255,0.28) 0%, transparent 58%)",
        }}
      />
    </div>
  );
}
