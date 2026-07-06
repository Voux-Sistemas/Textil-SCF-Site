/* Tinta viva: composição curada de tintas têxteis que deriva devagar, como
   pigmento se espalhando na trama. É a "estampa-assinatura" vista através do
   monograma no hero (substitui o padrão gerado por hash, que podia sortear
   verde - cor vetada pelo cliente).

   Paleta: índigo, vinho, coral e âmbar (tokens --ink-* em tokens.css).
   Animação apenas em transform; congela sob prefers-reduced-motion pela
   regra global, e a composição parada continua bonita. */

interface Blob {
  color: string;
  size: string;
  pos: React.CSSProperties;
  anim: string;
  opacity?: number;
}

const blobs: Blob[] = [
  {
    color: "var(--ink-vinho)",
    size: "150%",
    pos: { top: "-14%", left: "-34%" },
    anim: "scf-ink-a 26s ease-in-out infinite",
  },
  {
    color: "var(--ink-coral)",
    size: "125%",
    pos: { top: "20%", right: "-40%" },
    anim: "scf-ink-b 21s ease-in-out infinite",
    opacity: 0.92,
  },
  {
    color: "var(--ink-ambar)",
    size: "110%",
    pos: { top: "52%", left: "-30%" },
    anim: "scf-ink-a 33s ease-in-out -8s infinite",
    opacity: 0.88,
  },
  {
    color: "var(--ink-indigo-claro)",
    size: "135%",
    pos: { bottom: "-16%", right: "-36%" },
    anim: "scf-ink-b 27s ease-in-out -13s infinite",
  },
];

export function InkFlow() {
  return (
    <div
      aria-hidden="true"
      className="relative h-full w-full overflow-hidden"
      style={{
        background:
          "linear-gradient(178deg, #232f52 0%, var(--ink-noite) 42%, #3d1e39 100%)",
      }}
    >
      {blobs.map((b, i) => (
        <span
          key={i}
          className="ink-blob"
          style={{
            width: b.size,
            ...b.pos,
            opacity: b.opacity,
            background: `radial-gradient(closest-side, ${b.color} 0%, transparent 72%)`,
            animation: b.anim,
          }}
        />
      ))}
    </div>
  );
}
