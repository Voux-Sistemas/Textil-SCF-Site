import { useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X, LockSimple, ArrowUpRight } from "@phosphor-icons/react";
import { Button } from "./ui/Button";
import { Chip } from "./ui/Chip";
import { aplicacoes, type Estampa } from "../data/estampas";
import { patternStyle } from "../lib/patterns";
import { CATALOGO_URL } from "../data/site";

/* Visualização maior da estampa (ref. santaconstancia.com.br: card -> página
   de detalhe com ficha e aplicações). Aqui vira modal e MANTÉM a proteção:
   a imagem segue desfocada + marca d'água; o nítido fica na Área do Cliente.

   Quando houver fotos reais da estampa em roupas/looks, preencher
   `estampa.img` (e futuramente um campo de looks) - o slot já está previsto. */

interface PrintModalProps {
  estampa: Estampa | null;
  onClose: () => void;
}

function Ficha({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-t border-[var(--color-line)] py-2.5">
      <dt className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-ink-2">
        {label}
      </dt>
      <dd className="text-right font-mono text-[12.5px] text-ink">{value}</dd>
    </div>
  );
}

export function PrintModal({ estampa, onClose }: PrintModalProps) {
  const reduce = useReducedMotion();

  /* Esc fecha; trava o scroll da página enquanto o modal está aberto */
  useEffect(() => {
    if (!estampa) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [estampa, onClose]);

  return (
    <AnimatePresence>
      {estampa && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-end justify-center p-0 sm:items-center sm:p-6"
          initial={reduce ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduce ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Backdrop */}
          <button
            type="button"
            aria-label="Fechar detalhe da estampa"
            onClick={onClose}
            className="absolute inset-0 bg-[var(--color-ink)]/70 backdrop-blur-sm"
          />

          {/* Painel */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`Estampa ${estampa.ref} - ${estampa.nome}`}
            className="relative grid max-h-[92dvh] w-full max-w-[980px] grid-cols-1 overflow-y-auto rounded-t-[var(--radius-card)] bg-[var(--color-bone)] shadow-[0_40px_120px_-30px_rgba(27,28,32,0.7)] sm:rounded-[var(--radius-card)] md:grid-cols-2"
            initial={reduce ? false : { opacity: 0, y: 28, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? undefined : { opacity: 0, y: 20, scale: 0.985 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Fechar */}
            <button
              type="button"
              aria-label="Fechar"
              onClick={onClose}
              className="absolute right-3 top-3 z-20 inline-flex h-9 w-9 items-center justify-center rounded-[var(--radius-input)] bg-[var(--color-ink)]/75 text-bone backdrop-blur-sm transition-colors hover:bg-[var(--color-ink)]"
            >
              <X size={16} weight="bold" aria-hidden="true" />
            </button>

            {/* Estampa grande (segue protegida: blur + marca d'água) */}
            <div className="relative aspect-[4/5] overflow-hidden md:aspect-auto md:min-h-[520px]">
              {estampa.img ? (
                <img
                  src={estampa.img}
                  alt={`Estampa ${estampa.ref} - ${estampa.nome}`}
                  className="absolute inset-0 h-full w-full scale-[1.06] object-cover blur-[5px]"
                />
              ) : (
                <div
                  aria-hidden="true"
                  className="absolute inset-0 scale-[1.06] blur-[5px]"
                  style={patternStyle(estampa.familia, estampa.ref)}
                />
              )}
              {/* Marca d'água tipográfica */}
              <svg aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full">
                <defs>
                  <pattern
                    id={`wm-modal-${estampa.ref}`}
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
                <rect width="100%" height="100%" fill={`url(#wm-modal-${estampa.ref})`} />
              </svg>
              <span className="absolute left-3 top-3 inline-flex rounded-[3px] bg-[var(--color-bone)]/90 px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-[0.1em] text-[var(--color-ink)] backdrop-blur-sm">
                {estampa.ref}
              </span>
              <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-[3px] bg-[var(--color-ink)]/80 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--color-bone)] backdrop-blur-sm">
                <LockSimple size={12} weight="bold" aria-hidden="true" />
                Prévia protegida
              </span>
            </div>

            {/* Ficha técnica */}
            <div className="flex flex-col p-7 md:p-9">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-indigo)]">
                {estampa.familia}
              </p>
              <h3 className="mt-2 font-display text-[clamp(26px,3vw,34px)] font-medium leading-tight text-ink">
                {estampa.nome}
              </h3>

              <dl className="mt-6">
                <Ficha label="Referência" value={estampa.ref} />
                <Ficha label="Base têxtil" value={estampa.base} />
                <Ficha label="Gramatura" value={estampa.gramatura} />
                <Ficha label="Processo" value={estampa.processo} />
                <Ficha label="Resolução" value={estampa.resolucao} />
              </dl>

              {/* Aplicações (segmentos) */}
              <p className="mt-7 font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink-2">
                Aplicações
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {aplicacoes[estampa.familia].map((a) => (
                  <Chip key={a} as="span">
                    {a}
                  </Chip>
                ))}
              </div>

              {/* Porta de saída: nítido, variantes e preço na Área do Cliente */}
              <div className="mt-8 border-t border-[var(--color-line)] pt-6 md:mt-auto">
                <p className="text-[14.5px] leading-[1.55] text-ink-2">
                  Cores nítidas, variantes de cartela e tabela de preços ficam
                  na Área do Cliente.
                </p>
                <Button
                  href={CATALOGO_URL}
                  variant="indigo"
                  external
                  className="mt-4 w-full sm:w-auto"
                >
                  Ver nítido na Área do Cliente
                  <ArrowUpRight size={15} weight="bold" aria-hidden="true" />
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
