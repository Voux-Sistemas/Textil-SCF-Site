import { Reveal } from "./ui/Reveal";
import { patternStyle } from "../lib/patterns";

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
      <div className="container-scf grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Imagem (esquerda).
            >>> TROCAR por foto real (água / processo / natureza) quando houver:
            preencha public/ e troque este <div> por <img src=... />. <<< */}
        <Reveal className="lg:col-span-5">
          <div
            aria-hidden="true"
            className="aspect-[4/5] w-full overflow-hidden rounded-[var(--radius-card)] shadow-[0_18px_44px_-26px_rgba(27,28,32,0.5)]"
            style={patternStyle("Botânica", "sustentabilidade-scf")}
          />
        </Reveal>

        {/* Conteúdo (direita) */}
        <div className="lg:col-span-6 lg:col-start-7">
          <Reveal>
            <p className="font-display text-[clamp(28px,3.6vw,44px)] font-light leading-[1.1] tracking-[-0.02em] text-ink">
              Menos recurso por metro, sem abrir mão da cor.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="mt-8 flex items-baseline gap-3">
              <span className="font-display text-[clamp(48px,7vw,84px)] font-normal leading-none tracking-[-0.02em] text-[var(--color-indigo)]">
                [90]
              </span>
              <span className="font-display text-[clamp(22px,3vw,32px)] text-[var(--color-indigo)]">
                %
              </span>
              <span className="ml-2 max-w-[16ch] text-[14.5px] leading-[1.4] text-ink-2">
                menos água que a estamparia convencional
              </span>
            </div>
          </Reveal>
          <div className="mt-8">
            {pontos.map((p, i) => (
              <Reveal key={p.titulo} delay={0.12 + i * 0.06}>
                <div className="border-t border-[var(--color-line)] py-5">
                  <h3 className="font-display text-[20px] font-medium leading-tight text-ink">
                    {p.titulo}
                  </h3>
                  <p className="mt-1.5 max-w-[46ch] text-[15px] leading-[1.55] text-ink-2">
                    {p.texto}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
