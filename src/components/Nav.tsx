import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";
import { LockSimple } from "@phosphor-icons/react";
import { Button } from "./ui/Button";
import { LogoMark } from "./ui/LogoMark";
import { CATALOGO_URL } from "../data/site";

const links = [
  { label: "Acervo", href: "#acervo" },
  { label: "Serviços", href: "#servicos" },
  { label: "Processo", href: "#processo" },
  { label: "A Casa", href: "#a-casa" },
  { label: "Sustentabilidade", href: "#sustentabilidade" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();

  // muda o estado apenas ao cruzar o limiar (não re-renderiza por frame)
  useMotionValueEvent(scrollY, "change", (y) => {
    const past = y > 24;
    if (past !== scrolled) setScrolled(past);
  });

  return (
    <>
      <header
        className={
          "fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-[var(--ease-hover)] " +
          (scrolled
            ? "border-b border-[var(--color-line)] bg-[var(--color-bone)]/92 shadow-[0_8px_30px_-20px_rgba(26,24,19,0.45)] backdrop-blur-md"
            : "border-b border-transparent")
        }
      >
        <nav
          className={
            "container-scf flex items-center justify-between transition-all duration-300 " +
            (scrolled ? "h-[62px]" : "h-[78px]")
          }
        >
          {/* Wordmark (+ marca SCF quando LOGO_SRC estiver definido) */}
          <a href="#topo" className="flex items-baseline gap-2.5">
            <LogoMark className="h-9 w-[18px] self-center" />
            <span className="font-display text-[22px] font-medium tracking-[-0.01em] text-ink">
              TÊXTIL SCF
            </span>
            <span className="hidden font-mono text-[9.5px] uppercase tracking-[0.22em] text-ink-2 sm:inline">
              Estamparia Digital
            </span>
          </a>

          {/* Links (desktop, uma linha - enxutos p/ caber com as 2 ações).
              O conjunto completo fica no overlay mobile e no rodapé. */}
          <div className="hidden items-center gap-7 lg:flex">
            {links.slice(0, 4).map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-[14px] text-ink-2 transition-colors duration-200 hover:text-[var(--color-indigo)]"
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {/* Indicador de idioma. PT ativo; EN entra quando houver copy EN
                (ver memory: textil-scf-i18n-pending). Não é controle morto. */}
            <span className="hidden font-mono text-[11px] tracking-[0.1em] md:inline">
              <span className="text-ink" aria-current="true">
                PT
              </span>
              <span className="px-1 text-[var(--color-line)]">/</span>
              <span className="text-ink-2/55" title="Em breve">
                EN
              </span>
            </span>
            {/* Área do Cliente: discreta, neutra, à parte (login utilitário) */}
            <a
              href={CATALOGO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-1.5 rounded-[var(--radius-input)] border border-[var(--color-line)] px-3.5 py-2 text-[12.5px] text-ink-2 transition-colors duration-200 hover:border-[var(--color-ink-2)] hover:text-ink sm:inline-flex"
            >
              <LockSimple size={14} aria-hidden="true" />
              Área do Cliente
            </a>

            {/* Hambúrguer (mobile) */}
            <button
              type="button"
              aria-label="Abrir menu"
              aria-expanded={open}
              onClick={() => setOpen(true)}
              className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] lg:hidden"
            >
              <span className="h-px w-6 bg-ink" />
              <span className="h-px w-6 bg-ink" />
            </button>
          </div>
        </nav>
      </header>

      {/* Overlay full-screen (mobile) */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[70] flex flex-col bg-[var(--color-ink)] px-7 py-7 lg:hidden"
            initial={reduce ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2.5">
                <LogoMark onDark className="h-9 w-[18px]" />
                <span className="font-display text-[22px] font-medium text-bone">
                  TÊXTIL SCF
                </span>
              </span>
              <button
                type="button"
                aria-label="Fechar menu"
                onClick={() => setOpen(false)}
                className="font-mono text-[12px] uppercase tracking-[0.2em] text-bone-dim"
              >
                Fechar
              </button>
            </div>

            <nav className="mt-16 flex flex-col gap-6">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="font-display text-[34px] font-light leading-none text-bone"
                  initial={reduce ? false : { opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  {l.label}
                </motion.a>
              ))}
            </nav>

            <div className="mt-auto">
              <Button
                href={CATALOGO_URL}
                variant="ghostDark"
                className="w-full"
                external
                onClick={() => setOpen(false)}
              >
                <LockSimple size={16} aria-hidden="true" />
                Área do Cliente
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
