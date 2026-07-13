import { Reveal } from "./ui/Reveal";
import { SectionHeader } from "./ui/SectionHeader";

interface Servico {
  titulo: string;
  texto: string;
}

const servicos: Servico[] = [
  {
    titulo: "Estamparia digital",
    texto:
      "Impressão inkjet de alta definição em metragem corrida. Cor fiel, sem limite de tons.",
  },
  {
    titulo: "Sublimação",
    texto:
      "Cor vibrante e durável em bases sintéticas. A tinta vira parte da fibra, sem toque.",
  },
  {
    titulo: "Estampa localizada",
    texto:
      "Desenho posicionado peça a peça, no lugar exato do corte. Para coleções de assinatura.",
  },
  {
    titulo: "Desenvolvimento exclusivo",
    texto:
      "Estúdio de criação próprio. Desenhamos o rapport e o perfil de cor da sua marca.",
  },
];

/* Lista editorial estática (fios finos, sem caixas): o carrossel de cards
   quadrados foi rejeitado pelo cliente ("widgets quadrados passando").
   Hierarquia por tipografia e hairlines, não por elevação. */
export function Servicos() {
  return (
    <section id="servicos" className="section-pad">
      <div className="container-scf">
        <SectionHeader
          title={
            <>
              O que a <span className="font-medium">Casa</span> faz.
            </>
          }
        />

        <div className="mt-9 border-b border-[var(--color-line)] md:mt-11">
          {servicos.map((s, i) => (
            <Reveal key={s.titulo} delay={i * 0.05}>
              <div className="grid grid-cols-1 gap-y-1.5 border-t border-[var(--color-line)] py-6 md:grid-cols-12 md:items-baseline md:gap-x-8 md:py-7">
                <span
                  aria-hidden="true"
                  className="font-mono text-[11px] tracking-[0.12em] text-ink-2 md:col-span-1"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-[22px] font-medium leading-[1.1] text-ink md:col-span-4">
                  {s.titulo}
                </h3>
                <p className="mt-1 text-[15.5px] leading-[1.55] text-ink-2 md:col-span-7 md:mt-0 md:max-w-[54ch]">
                  {s.texto}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
