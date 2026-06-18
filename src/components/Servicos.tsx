import { Reveal } from "./ui/Reveal";
import { SectionHeader } from "./ui/SectionHeader";
import { Marquee } from "./ui/Marquee";

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
      </div>

      {/* Carrossel de serviços deslizando (sentido inverso), cards neutros */}
      <Reveal className="mt-12">
        <Marquee durationSec={66} reverse>
          {servicos.map((s) => (
            <article
              key={s.titulo}
              className="mr-5 flex min-h-[176px] w-[clamp(264px,80vw,340px)] shrink-0 flex-col justify-center rounded-[var(--radius-card)] border border-[var(--color-line)] bg-bone-2 p-7"
            >
              <h3 className="font-display text-[22px] font-medium leading-[1.05] text-ink">
                {s.titulo}
              </h3>
              <p className="mt-2.5 text-[15px] leading-[1.55] text-ink-2">{s.texto}</p>
            </article>
          ))}
        </Marquee>
      </Reveal>
    </section>
  );
}
