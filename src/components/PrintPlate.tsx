import { LockSimple, ArrowUpRight } from "@phosphor-icons/react";
import type { Estampa } from "../lib/api";

interface PrintPlateProps {
  estampa: Estampa;
  /** abre a visualização maior (PrintModal) */
  onOpen: (estampa: Estampa) => void;
}

/* Placa do "recorte do acervo" (galeria pública): a foto real da API,
   desfocada de propósito, com cadeado. A marca d'água já vem na imagem
   (a API aplica no centro); o nítido fica na Área do Cliente. */
export function PrintPlate({ estampa, onOpen }: PrintPlateProps) {
  const foto = estampa.miniatura_url ?? estampa.imagem_url ?? "";

  return (
    <button
      type="button"
      onClick={() => onOpen(estampa)}
      aria-label={`Estampa ${estampa.codigo}, ${estampa.nome}${estampa.categoria ? `, ${estampa.categoria}` : ""}. Abrir detalhes.`}
      className="group relative isolate block aspect-[4/5] w-full cursor-pointer overflow-hidden rounded-[var(--radius-card)] bg-bone-2 shadow-[0_18px_44px_-26px_rgba(27,28,32,0.55)] outline-offset-2"
    >
      <img
        src={foto}
        alt=""
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full scale-[1.08] object-cover blur-[5px]"
      />

      {/* Etiqueta de referência (catálogo), topo-esquerda */}
      <div className="absolute left-3 top-3 z-10">
        <span className="inline-flex rounded-[3px] bg-[var(--color-bone)]/90 px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-[0.1em] text-[var(--color-ink)] backdrop-blur-sm">
          Ref. {estampa.codigo}
          {estampa.categoria ? ` · ${estampa.categoria}` : ""}
        </span>
      </div>

      {/* Cadeado (topo-direita) */}
      <div className="absolute right-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-[3px] bg-[var(--color-ink)]/80 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--color-bone)] backdrop-blur-sm">
        <LockSimple size={12} weight="bold" aria-hidden="true" />
        Restrito
      </div>

      {/* Revelação no hover/focus: nome + chamada para o detalhe */}
      <div className="absolute inset-x-0 bottom-0 z-10 translate-y-full bg-gradient-to-t from-[var(--color-ink)] via-[var(--color-ink)]/92 to-transparent p-5 pt-16 text-left transition-transform duration-500 ease-[var(--ease-hover)] group-hover:translate-y-0 group-focus-within:translate-y-0">
        <h3 className="font-display text-[22px] font-medium leading-tight text-bone">
          {estampa.nome}
        </h3>
        <span className="mt-3 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-indigo-soft)]">
          Ver detalhes e pedir orçamento
          <ArrowUpRight size={13} weight="bold" aria-hidden="true" />
        </span>
      </div>
    </button>
  );
}
