import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { LockSimple } from "@phosphor-icons/react";
import { SectionHeader } from "./ui/SectionHeader";
import { Chip } from "./ui/Chip";
import { Button } from "./ui/Button";
import { Reveal } from "./ui/Reveal";
import { PrintPlate } from "./PrintPlate";
import { PrintModal } from "./PrintModal";
import { buscarRecorte, type Estampa } from "../lib/api";
import { linkWhatsApp } from "../lib/whatsapp";
import { CATALOGO_URL } from "../data/site";

/* O recorte vem da API: as estampas que a SCF marca como destaque no PDV.
   Sem API (ou sem destaque marcado), a seção não quebra: mostra um aviso
   sóbrio e as duas portas de saída (Área do Cliente e WhatsApp). */
type Estado =
  | { fase: "carregando" }
  | { fase: "pronto"; estampas: Estampa[] }
  | { fase: "falhou" };

const TODAS = "Todas";
const PLACAS_CARREGANDO = 6;

export function Acervo() {
  const [estado, setEstado] = useState<Estado>({ fase: "carregando" });
  const [filtro, setFiltro] = useState(TODAS);
  const [aberta, setAberta] = useState<Estampa | null>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const controle = new AbortController();
    buscarRecorte(controle.signal).then(
      (estampas) => setEstado({ fase: "pronto", estampas }),
      () => {
        if (!controle.signal.aborted) setEstado({ fase: "falhou" });
      }
    );
    return () => controle.abort();
  }, []);

  const estampas = estado.fase === "pronto" ? estado.estampas : [];
  /* Filtros pelas categorias que o recorte tem (cadastradas no PDV). Com menos
     de duas, não há o que filtrar: a fileira de chips some. */
  const categorias = [...new Set(estampas.map((e) => e.categoria).filter((c): c is string => !!c))].sort(
    (a, b) => a.localeCompare(b, "pt-BR")
  );
  const filtros = categorias.length >= 2 ? [TODAS, ...categorias] : [];
  const visiveis = filtro === TODAS ? estampas : estampas.filter((e) => e.categoria === filtro);
  const vazio = estado.fase === "falhou" || (estado.fase === "pronto" && estampas.length === 0);

  return (
    <section id="acervo" className="section-pad">
      <div className="container-scf">
        <SectionHeader
          eyebrow="O Acervo"
          title={
            <>
              Um recorte do <span className="font-medium">acervo</span>.
            </>
          }
          lead="Mostramos só uma amostra do que produzimos, e de propósito desfocada. O acervo completo - com referências, fichas técnicas e preços - fica na Área do Cliente, aberto a quem trabalha com a Casa."
        />

        {/* Filtros por categoria (só quando o recorte tem mais de uma) */}
        {filtros.length > 0 && (
          <Reveal delay={0.1} className="mt-10 flex flex-wrap gap-2.5">
            {filtros.map((f) => (
              <Chip key={f} active={filtro === f} onClick={() => setFiltro(f)}>
                {f}
              </Chip>
            ))}
          </Reveal>
        )}

        {estado.fase === "carregando" && (
          <div
            aria-busy="true"
            aria-label="Carregando o acervo"
            className="mt-10 grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-3"
          >
            {Array.from({ length: PLACAS_CARREGANDO }, (_, i) => (
              <div
                key={i}
                aria-hidden="true"
                className="aspect-[4/5] animate-pulse rounded-[var(--radius-card)] bg-bone-2"
              />
            ))}
          </div>
        )}

        {vazio && (
          <div className="mt-10 rounded-[var(--radius-card)] border border-[var(--color-line)] bg-bone-2 px-6 py-9 md:px-10">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-2">
              {estado.fase === "falhou" ? "Acervo indisponível agora" : "Recorte em atualização"}
            </p>
            <p className="mt-3 max-w-[56ch] text-[15.5px] leading-[1.6] text-ink-2">
              {estado.fase === "falhou"
                ? "Não conseguimos carregar o recorte do acervo neste momento."
                : "O recorte do acervo está sendo atualizado."}{" "}
              O acervo completo segue na Área do Cliente, e a Casa atende pelo{" "}
              <a
                href={linkWhatsApp()}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink underline decoration-[var(--color-line)] underline-offset-4 transition-colors hover:decoration-[var(--color-ink)]"
              >
                WhatsApp
              </a>
              .
            </p>
          </div>
        )}

        {/* Grid de placas */}
        {visiveis.length > 0 && (
          <motion.div
            layout={!reduce}
            className="mt-10 grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {visiveis.map((e) => (
                <motion.div
                  key={e.codigo}
                  layout={!reduce}
                  initial={reduce ? false : { opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduce ? undefined : { opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  <PrintPlate estampa={e} onOpen={setAberta} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Porta de saída: Área do Cliente -> site de catálogo (externo) */}
        <Reveal delay={0.1} className="mt-12 flex flex-wrap items-center gap-x-5 gap-y-3">
          <Button href={CATALOGO_URL} variant="indigo" external>
            <LockSimple size={16} weight="bold" aria-hidden="true" />
            Entrar na Área do Cliente
          </Button>
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-2">
            Acesso restrito · usuário e senha
          </span>
        </Reveal>
      </div>

      {/* Visualização maior (ficha técnica + orçamento pelo WhatsApp) */}
      <PrintModal estampa={aberta} onClose={() => setAberta(null)} />
    </section>
  );
}
