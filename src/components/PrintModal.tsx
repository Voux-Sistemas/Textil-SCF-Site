import { useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X, LockSimple } from "@phosphor-icons/react";
import { OrcamentoWhatsApp } from "./OrcamentoWhatsApp";
import type { Estampa } from "../lib/api";

/* Visualização maior da estampa (ref. santaconstancia.com.br: card -> página
   de detalhe com ficha). Aqui vira modal e MANTÉM a proteção: a foto segue
   desfocada (a marca d'água já vem nela, da API); o nítido fica na Área do
   Cliente. Na ficha só entra o que a estampa tem cadastrado no PDV.
   Processo, resolução e aplicações são da Casa, não de cada estampa: ficam
   fora daqui (proposta de levar para Serviços). */

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

/* As linhas da ficha que existem para esta estampa, na ordem de leitura. */
function linhasDaFicha(e: Estampa): [string, string][] {
  const t = e.tecido;
  const linhas: [string, string | null | undefined][] = [
    ["Referência", e.codigo],
    ["Categoria", e.categoria],
    ["Coleção", e.colecao],
    ["Cor", e.familia_cor],
    ["Composição", t?.composicao],
    ["Gramatura", t?.gramatura ? `${t.gramatura} g/m²` : null],
    ["Largura", t?.largura ? `${t.largura.toLocaleString("pt-BR")} cm` : null],
  ];
  return linhas.filter((l): l is [string, string] => !!l[1]);
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
            aria-label={`Estampa ${estampa.codigo} - ${estampa.nome}`}
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

            {/* Estampa grande (segue protegida: desfocada + marca d'água da API) */}
            <div className="relative aspect-[4/3] overflow-hidden bg-bone-2 md:aspect-auto md:min-h-[520px]">
              <img
                src={estampa.imagem_url ?? estampa.miniatura_url ?? ""}
                alt={`Estampa ${estampa.codigo} - ${estampa.nome}`}
                className="absolute inset-0 h-full w-full scale-[1.06] object-cover blur-[5px]"
              />
              <span className="absolute left-3 top-3 inline-flex rounded-[3px] bg-[var(--color-bone)]/90 px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-[0.1em] text-[var(--color-ink)] backdrop-blur-sm">
                Ref. {estampa.codigo}
              </span>
              <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-[3px] bg-[var(--color-ink)]/80 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--color-bone)] backdrop-blur-sm">
                <LockSimple size={12} weight="bold" aria-hidden="true" />
                Prévia protegida
              </span>
            </div>

            {/* Ficha técnica + orçamento */}
            <div className="flex flex-col p-7 md:p-9">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-indigo)]">
                {estampa.categoria ?? "Estampa"}
              </p>
              <h3 className="mt-2 font-display text-[clamp(26px,3vw,34px)] font-medium leading-tight text-ink">
                {estampa.nome}
              </h3>
              {estampa.descricao && (
                <p className="mt-3 text-[15px] leading-[1.6] text-ink-2">{estampa.descricao}</p>
              )}

              <dl className="mt-6">
                {linhasDaFicha(estampa).map(([label, value]) => (
                  <Ficha key={label} label={label} value={value} />
                ))}
              </dl>

              {/* Porta de saída: orçamento pelo WhatsApp (grava na API) ou a
                  Área do Cliente (nítido, variantes e preço) */}
              <div className="mt-8 border-t border-[var(--color-line)] pt-6 md:mt-auto">
                <OrcamentoWhatsApp key={estampa.codigo} estampa={estampa} />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
