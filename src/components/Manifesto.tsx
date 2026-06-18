import { Reveal } from "./ui/Reveal";
import { LogoMark } from "./ui/LogoMark";

export function Manifesto() {
  return (
    <section className="relative overflow-hidden section-pad">
      {/* Monograma gigante em baixo-relevo (selo de casa, heritage) */}
      <LogoMark className="pointer-events-none absolute right-[-6vw] top-1/2 hidden h-[130%] w-[34vw] max-w-[420px] -translate-y-1/2 opacity-[0.05] md:block" />

      <div className="container-scf relative z-10">
        <Reveal delay={0.08}>
          <p className="max-w-[24ch] font-display text-[clamp(28px,4.2vw,52px)] font-light leading-[1.08] tracking-[-0.02em] text-ink md:max-w-[20ch]">
            A estampa é a primeira coisa que a cliente vê.{" "}
            <span className="font-medium text-[var(--color-indigo)]">Nós a tratamos</span> como a assinatura da
            marca.
          </p>
        </Reveal>
        <Reveal delay={0.16}>
          <div className="mt-10 flex max-w-[52ch] items-start gap-5">
            <span
              aria-hidden="true"
              className="mt-3 h-px w-12 shrink-0"
              style={{ backgroundColor: "var(--color-indigo)" }}
            />
            <p className="text-[18px] leading-[1.6] text-ink-2">
              Não imprimimos um desenho sobre o tecido. Calibramos cor, base e
              fixação até a estampa virar parte da peça. O que sai do rolo é o
              que a marca assina.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
