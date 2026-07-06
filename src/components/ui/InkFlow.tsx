/* Tinta viva: pigmentos têxteis sobre TECIDO CRU (base clara), derivando
   devagar como tinta se espalhando na trama. É a "estampa-assinatura" vista
   através do monograma no hero. A base clara dá contraste máximo contra o
   fundo escuro estampado do hero (pedido do cliente, 2ª rodada).

   Paleta SEM VERDE (veto do dono): índigo, vinho, coral, âmbar, rosa.
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
    color: "#b13066", // vinho/magenta
    size: "130%",
    pos: { top: "-12%", left: "-30%" },
    anim: "scf-ink-a 26s ease-in-out infinite",
    opacity: 0.9,
  },
  {
    color: "#35509a", // índigo
    size: "115%",
    pos: { top: "6%", right: "-34%" },
    anim: "scf-ink-b 22s ease-in-out infinite",
    opacity: 0.88,
  },
  {
    color: "#d4562c", // coral
    size: "110%",
    pos: { top: "30%", left: "-26%" },
    anim: "scf-ink-b 30s ease-in-out -9s infinite",
    opacity: 0.85,
  },
  {
    color: "#e3a63b", // âmbar
    size: "100%",
    pos: { top: "48%", right: "-28%" },
    anim: "scf-ink-a 24s ease-in-out -6s infinite",
    opacity: 0.85,
  },
  {
    color: "#d873a4", // rosa
    size: "105%",
    pos: { bottom: "8%", left: "-30%" },
    anim: "scf-ink-a 34s ease-in-out -15s infinite",
    opacity: 0.8,
  },
  {
    color: "#5d7ec4", // azul-claro
    size: "120%",
    pos: { bottom: "-14%", right: "-32%" },
    anim: "scf-ink-b 27s ease-in-out -13s infinite",
    opacity: 0.85,
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
      {blobs.map((b, i) => (
        <span
          key={i}
          className="ink-blob"
          style={{
            width: b.size,
            ...b.pos,
            opacity: b.opacity,
            background: `radial-gradient(closest-side, ${b.color} 0%, transparent 70%)`,
            animation: b.anim,
          }}
        />
      ))}
    </div>
  );
}
