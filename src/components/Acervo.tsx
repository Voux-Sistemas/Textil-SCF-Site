import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { LockSimple } from "@phosphor-icons/react";
import { SectionHeader } from "./ui/SectionHeader";
import { Chip } from "./ui/Chip";
import { Button } from "./ui/Button";
import { Reveal } from "./ui/Reveal";
import { PrintPlate } from "./PrintPlate";
import { estampas, familias, type Familia } from "../data/estampas";
import { CATALOGO_URL } from "../data/site";

type Filtro = Familia | "Todas";
const filtros: Filtro[] = ["Todas", ...familias];

export function Acervo() {
  const [filtro, setFiltro] = useState<Filtro>("Todas");
  const reduce = useReducedMotion();

  const visiveis =
    filtro === "Todas" ? estampas : estampas.filter((e) => e.familia === filtro);

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

        {/* Filtros por família */}
        <Reveal delay={0.1} className="mt-10 flex flex-wrap gap-2.5">
          {filtros.map((f) => (
            <Chip key={f} active={filtro === f} onClick={() => setFiltro(f)}>
              {f}
            </Chip>
          ))}
        </Reveal>

        {/* Grid de placas */}
        <motion.div
          layout={!reduce}
          className="mt-10 grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {visiveis.map((e) => (
              <motion.div
                key={e.ref}
                layout={!reduce}
                initial={reduce ? false : { opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduce ? undefined : { opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                <PrintPlate estampa={e} bloqueada />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

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
    </section>
  );
}
