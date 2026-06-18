import { Reveal } from "./ui/Reveal";
import { Chip } from "./ui/Chip";
import { PrintPlate } from "./PrintPlate";
import { timeline } from "../data/timeline";
import { estampas } from "../data/estampas";

const selos = ["[ABVTEX]", "Padrão Pantone", "Baixa metragem", "[Certificação]"];
const placaCasa = estampas.find((e) => e.ref === "SCF-0429") ?? estampas[0];

export function Historia() {
  return (
    <section id="a-casa" className="section-pad">
      <div className="container-scf">
        {/* Split: narrativa + placa */}
        <div className="grid grid-cols-1 items-end gap-12 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6">
            <Reveal delay={0.06}>
              <p className="max-w-[22ch] font-display text-[clamp(28px,3.8vw,46px)] font-light leading-[1.1] tracking-[-0.02em] text-ink">
                Uma casa têxtil que vende cor, com a disciplina de quem produz
                em escala.
              </p>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-7 max-w-[52ch] text-[17px] leading-[1.65] text-ink-2">
                Há [00] anos em [cidade], a Têxtil SCF imprime estampa para
                marcas que não abrem mão de cor fiel e prazo cumprido. Do
                estúdio de criação ao controle de cor na expedição, cada rolo
                passa pela mesma régua. É por isso que grandes marcas voltam.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <div className="mt-8 flex flex-wrap gap-2.5">
                {selos.map((s) => (
                  <Chip key={s} as="span">
                    {s}
                  </Chip>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="mx-auto w-full max-w-[420px] lg:col-span-6 lg:max-w-none">
            <PrintPlate estampa={placaCasa} />
          </Reveal>
        </div>

        {/* Timeline */}
        <div className="mt-20 grid grid-cols-1 gap-y-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-y-0">
          {timeline.map((m, i) => (
            <Reveal
              key={i}
              delay={i * 0.07}
              className={
                "pl-5 lg:pl-0 lg:pr-6 " +
                "border-l border-[var(--color-line)] lg:border-l-0 lg:border-t lg:pt-5"
              }
            >
              <p className="font-display text-[26px] font-normal leading-none text-ink">
                {m.ano}
              </p>
              <p className="mt-2 font-mono text-[10.5px] uppercase tracking-[0.16em] text-[var(--color-indigo)]">
                {m.titulo}
              </p>
              <p className="mt-2.5 max-w-[28ch] text-[14.5px] leading-[1.5] text-ink-2">
                {m.texto}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
