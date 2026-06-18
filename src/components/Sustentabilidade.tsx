import { Reveal } from "./ui/Reveal";

const pontos = [
  {
    titulo: "Água em ciclo",
    texto: "Tratamento e reúso de efluentes. O que entra na produção não vai parar no rio.",
  },
  {
    titulo: "Tinta de base aquosa",
    texto: "Pigmentos com menor impacto, sem os solventes da estampa convencional.",
  },
  {
    titulo: "Impressão sob demanda",
    texto: "Imprimimos a metragem exata do pedido. Sem telas, sem sobra, sem desperdício.",
  },
];

export function Sustentabilidade() {
  return (
    <section
      id="sustentabilidade"
      className="border-y border-[var(--color-line)] bg-bone-2 section-pad"
    >
      <div className="container-scf grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-12">
        {/* Destaque */}
        <div className="lg:col-span-5">
          <Reveal delay={0.06}>
            <p className="font-display text-[clamp(28px,3.6vw,44px)] font-light leading-[1.1] tracking-[-0.02em] text-ink">
              Menos recurso por metro, sem abrir mão da cor.
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="mt-10 flex items-baseline gap-3">
              <span className="font-display text-[clamp(56px,8vw,96px)] font-normal leading-none tracking-[-0.02em] text-[var(--color-indigo)]">
                [90]
              </span>
              <span className="font-display text-[clamp(24px,3vw,34px)] text-[var(--color-indigo)]">
                %
              </span>
              <span className="ml-2 max-w-[16ch] text-[14.5px] leading-[1.4] text-ink-2">
                menos água que a estamparia convencional
              </span>
            </div>
          </Reveal>
        </div>

        {/* Pontos */}
        <div className="lg:col-span-6 lg:col-start-7">
          {pontos.map((p, i) => (
            <Reveal key={p.titulo} delay={0.1 + i * 0.07}>
              <div className="border-t border-[var(--color-line)] py-7">
                <h3 className="font-display text-[22px] font-medium leading-tight text-ink">
                  {p.titulo}
                </h3>
                <p className="mt-2 max-w-[46ch] text-[16px] leading-[1.6] text-ink-2">
                  {p.texto}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
