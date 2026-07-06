import { motion, useReducedMotion, type Variants } from "framer-motion";
import { LockSimple } from "@phosphor-icons/react";
import { Button } from "./ui/Button";
import { Eyebrow } from "./ui/Eyebrow";
import { LogoMark } from "./ui/LogoMark";
import { MonogramWindow } from "./ui/MonogramWindow";
import { InkFlow } from "./ui/InkFlow";
import { CATALOGO_URL } from "../data/site";

/* Estampas em crossfade lento atrás do hero (pedido do cliente). O ciclo CSS
   está em tokens.css (.hero-slide, 2 slides x 9s); a 1ª repete por baixo como
   fallback estático (reduced-motion / carga).
   CONTRASTE: a estampa é escurecida (filter) + scrim em gradiente quase sólido
   à esquerda - o texto e a marca nunca se misturam com o padrão. */
const slides = [
  { src: "/estampa-hero-1.jpg", alt: "" },
  { src: "/estampa-hero-2.jpg", alt: "" },
];

export function Hero() {
  const reduce = useReducedMotion();

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.12, delayChildren: 0.15 } },
  };
  const item: Variants = {
    hidden: reduce ? { opacity: 1 } : { opacity: 0, y: 22 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section
      id="topo"
      className="relative flex min-h-[100dvh] items-center overflow-hidden bg-[var(--color-ink)] pb-20 pt-24"
    >
      {/* Slideshow de estampas + scrim (quase sólido à esquerda, onde está o
          texto; abre à direita, onde a estampa aparece de verdade) */}
      <div aria-hidden="true" className="absolute inset-0">
        <img
          src={slides[0].src}
          alt=""
          className="absolute inset-0 h-full w-full object-cover brightness-[0.82]"
        />
        {slides.map((s, i) => (
          <img
            key={s.src}
            src={s.src}
            alt=""
            loading={i === 0 ? "eager" : "lazy"}
            decoding="async"
            className="hero-slide absolute inset-0 h-full w-full object-cover brightness-[0.82]"
            style={{ animationDelay: `${i * 9}s` }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-ink)]/[0.96] via-[var(--color-ink)]/[0.84] to-[var(--color-ink)]/[0.42]" />
        {/* Reforço vertical: base mais escura ancora os botões */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[var(--color-ink)]/70 to-transparent" />
      </div>

      {/* Monograma fantasma: arquitetura ao fundo, sangrando pela direita */}
      <LogoMark
        onDark
        className="pointer-events-none absolute right-[-13vw] top-1/2 hidden h-[108vh] w-[53vh] -translate-y-1/2 opacity-[0.05] lg:block"
      />

      {/* Moldura blueprint: cantos finos (atelier / planta técnica) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-[clamp(20px,5vw,80px)] bottom-12 top-28 hidden lg:block"
      >
        <span className="absolute left-0 top-0 h-5 w-5 border-l border-t border-white/25" />
        <span className="absolute right-0 top-0 h-5 w-5 border-r border-t border-white/25" />
        <span className="absolute bottom-0 left-0 h-5 w-5 border-b border-l border-white/25" />
        <span className="absolute bottom-0 right-0 h-5 w-5 border-b border-r border-white/25" />
      </div>

      <div className="container-scf relative grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">
        {/* Tipografia */}
        <motion.div
          className="lg:col-span-6"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={item} className="mb-7">
            <Eyebrow onDark>Estamparia digital têxtil · desde [19XX]</Eyebrow>
          </motion.div>

          <h1 className="font-display text-[clamp(46px,7.2vw,98px)] font-light leading-[0.95] tracking-[-0.03em] text-bone">
            <motion.span variants={item} className="block">
              A cor que o tecido
            </motion.span>
            <motion.span variants={item} className="block pb-1 font-medium leading-[1.05]">
              não esquece.
            </motion.span>
          </h1>

          <motion.p
            variants={item}
            className="mt-7 max-w-[46ch] text-[19px] leading-[1.55] text-bone-dim"
          >
            Estamparia digital de alta definição para marcas que tratam a
            estampa como identidade. Da arte à fixação.
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-4">
            <Button href="#acervo" variant="indigo">
              Ver o acervo
            </Button>
            <Button href={CATALOGO_URL} variant="ghostDark" external>
              <LockSimple size={16} weight="bold" aria-hidden="true" />
              Área do Cliente
            </Button>
          </motion.div>
        </motion.div>

        {/* Monograma-vitrine: a estampa vista ATRAVÉS da marca SCF.
            Revela subindo, como o pigmento tingindo a trama. */}
        <div className="relative lg:col-span-6">
          <motion.div
            className="mx-auto w-fit"
            initial={reduce ? false : { clipPath: "inset(100% 0% 0% 0%)", opacity: 0 }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <MonogramWindow className="h-[58vh] max-h-[620px] min-h-[320px] w-[28vh] min-w-[156px] max-w-[300px]">
              <InkFlow />
            </MonogramWindow>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
