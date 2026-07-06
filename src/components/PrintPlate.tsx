import { LockSimple, ArrowUpRight } from "@phosphor-icons/react";
import type { Estampa } from "../data/estampas";
import { patternStyle } from "../lib/patterns";
import { CATALOGO_URL } from "../data/site";

interface PrintPlateProps {
  estampa: Estampa;
  /** ocupa 2 linhas no grid para quebrar o ritmo */
  featured?: boolean;
  /** modo galeria pública: desfoca + marca d'água + cadeado.
      false = placa-vitrine nítida (hero / a casa). */
  bloqueada?: boolean;
  /** abre a visualização maior (PrintModal). Se ausente, a placa bloqueada
      vira link direto para o catálogo (comportamento antigo). */
  onOpen?: (estampa: Estampa) => void;
}

/* Linha da ficha técnica (só na placa-vitrine nítida). */
function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3 border-t border-white/12 py-1.5">
      <dt className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-[var(--color-indigo-soft)]">
        {label}
      </dt>
      <dd className="font-mono text-[11.5px] text-bone">{value}</dd>
    </div>
  );
}

/* Marca d'água tipográfica em ladrilho diagonal. Os IDs de pattern são únicos
   por referência para não colidirem entre placas. (As imagens reais do R2 já
   vêm com watermark próprio; esta cobre os padrões-placeholder.) */
function Watermark({ refId }: { refId: string }) {
  const id = `wm-${refId}`;
  return (
    <svg aria-hidden="true" className="pointer-events-none absolute inset-0 z-[5] h-full w-full">
      <defs>
        <pattern
          id={id}
          width="172"
          height="116"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(-24)"
        >
          <text
            x="6"
            y="64"
            fontFamily="'Space Mono', ui-monospace, monospace"
            fontSize="12.5"
            letterSpacing="1.5"
            className="fill-white/40"
          >
            TÊXTIL SCF
          </text>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

export function PrintPlate({ estampa, featured = false, bloqueada = false, onOpen }: PrintPlateProps) {
  const shape =
    "group relative isolate block overflow-hidden rounded-[var(--radius-card)] " +
    "bg-bone-2 shadow-[0_18px_44px_-26px_rgba(27,28,32,0.55)] outline-offset-2 " +
    (featured ? "row-span-2 aspect-[4/5] md:aspect-auto" : "aspect-[4/5]");

  /* ---- Camada visual da estampa --------------------------------------------
     Hoje: padrão gerado em CSS (placeholder intencional).
     PARA TROCAR pela foto real do bucket R2: preencha estampa.img que o <img>
     entra no lugar do padrão. O resto da placa não muda. */
  const motion =
    "transition-transform duration-[600ms] ease-[var(--ease-hover)] " +
    (bloqueada ? "scale-[1.08]" : "group-hover:scale-[1.05] group-focus-within:scale-[1.05]");
  const blur = bloqueada ? "blur-[5px]" : "";

  const Visual = estampa.img ? (
    <img
      src={estampa.img}
      alt={`Estampa ${estampa.ref} - ${estampa.nome}`}
      loading="lazy"
      decoding="async"
      className={`absolute inset-0 h-full w-full object-cover ${blur} ${motion}`}
    />
  ) : (
    <div
      aria-hidden="true"
      className={`absolute inset-0 ${blur} ${motion}`}
      style={patternStyle(estampa.familia, estampa.ref)}
    />
  );

  /* Etiqueta de referência (catálogo), topo-esquerda */
  const RefTag = (
    <div className="absolute left-3 top-3 z-10">
      <span className="inline-flex rounded-[3px] bg-[var(--color-bone)]/90 px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-[0.1em] text-[var(--color-ink)] backdrop-blur-sm">
        {estampa.ref} · {estampa.familia}
      </span>
    </div>
  );

  /* ===== Placa BLOQUEADA: abre a visualização maior (modal); sem onOpen,
     cai no comportamento antigo de link direto para a Área do Cliente ====== */
  if (bloqueada) {
    const inner = (
      <>
        {Visual}
        <Watermark refId={estampa.ref} />
        {RefTag}

        {/* Cadeado (topo-direita) */}
        <div className="absolute right-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-[3px] bg-[var(--color-ink)]/80 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--color-bone)] backdrop-blur-sm">
          <LockSimple size={12} weight="bold" aria-hidden="true" />
          Restrito
        </div>

        {/* Revelação no hover/focus: nome + chamada para o detalhe */}
        <div className="absolute inset-x-0 bottom-0 z-10 translate-y-full p-5 pt-16 text-left transition-transform duration-500 ease-[var(--ease-hover)] group-hover:translate-y-0 group-focus-within:translate-y-0 bg-gradient-to-t from-[var(--color-ink)] via-[var(--color-ink)]/92 to-transparent">
          <h3 className="font-display text-[22px] font-medium leading-tight text-bone">
            {estampa.nome}
          </h3>
          <span className="mt-3 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-indigo-soft)]">
            {onOpen ? "Ver detalhes" : "Entrar para ver nítido"}
            <ArrowUpRight size={13} weight="bold" aria-hidden="true" />
          </span>
        </div>
      </>
    );

    if (onOpen) {
      return (
        <button
          type="button"
          onClick={() => onOpen(estampa)}
          aria-label={`Estampa ${estampa.ref}, ${estampa.nome}, família ${estampa.familia}. Abrir detalhes.`}
          className={shape + " w-full cursor-pointer"}
        >
          {inner}
        </button>
      );
    }

    return (
      <a
        href={CATALOGO_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Estampa ${estampa.ref}, ${estampa.nome}, família ${estampa.familia}. Acervo restrito - entrar na Área do Cliente para ver nítido.`}
        className={shape}
      >
        {inner}
      </a>
    );
  }

  /* ===== Placa-VITRINE nítida (hero / a casa): mostra a ficha técnica ====== */
  return (
    <article
      tabIndex={0}
      aria-label={`Estampa ${estampa.ref} - ${estampa.nome}, família ${estampa.familia}`}
      className={shape}
    >
      {Visual}
      {RefTag}

      <div className="absolute inset-x-0 bottom-0 z-10 translate-y-full p-5 pt-16 transition-transform duration-500 ease-[var(--ease-hover)] group-hover:translate-y-0 group-focus-within:translate-y-0 bg-gradient-to-t from-[var(--color-ink)] via-[var(--color-ink)]/92 to-transparent">
        <h3 className="font-display text-[22px] font-medium leading-tight text-bone">
          {estampa.nome}
        </h3>
        <dl className="mt-3">
          <Spec label="Base" value={estampa.base} />
          <Spec label="Gramatura" value={estampa.gramatura} />
          <Spec label="Processo" value={estampa.processo} />
          <Spec label="Resolução" value={estampa.resolucao} />
        </dl>
      </div>
    </article>
  );
}
