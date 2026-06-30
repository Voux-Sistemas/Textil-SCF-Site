import { Reveal } from "./ui/Reveal";
import { SectionHeader } from "./ui/SectionHeader";

interface Etapa {
  n: string;
  titulo: string;
  texto: string;
}

const etapas: Etapa[] = [
  { n: "01", titulo: "Arte", texto: "Recebimento do arquivo, rapport e perfil de cor." },
  { n: "02", titulo: "Preparação", texto: "Base têxtil tratada e calibrada para receber a tinta." },
  { n: "03", titulo: "Impressão", texto: "Inkjet de alta definição, gota a gota sobre a base." },
  { n: "04", titulo: "Fixação", texto: "Calandra e vaporização. Solidez à lavagem e à luz." },
  { n: "05", titulo: "Controle", texto: "Conferência de cor no padrão Pantone antes da expedição." },
];

export function Processo() {
  return (
    <section id="processo" className="bg-[var(--color-ink)]">
      <div className="container-scf section-pad">
        <SectionHeader
          onDark
          title={
            <>
              Cinco passos entre o arquivo e o{" "}
              <span className="font-medium">tecido pronto</span>.
            </>
          }
        />

        {/* Imagens do processo: a máquina, a fixação e o detalhe da impressão */}
        <Reveal delay={0.1} className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
          <img
            src="/fabrica-impressao.png"
            alt="Impressora têxtil digital imprimindo um tecido estampado"
            loading="lazy"
            decoding="async"
            className="aspect-[16/9] w-full rounded-[var(--radius-card)] border border-white/10 object-cover md:col-span-2"
          />
          <img
            src="/fabrica-fixacao.png"
            alt="Fixação do tecido em calandra com vapor"
            loading="lazy"
            decoding="async"
            className="aspect-[4/3] w-full rounded-[var(--radius-card)] border border-white/10 object-cover"
          />
          <img
            src="/fabrica-detalhe.png"
            alt="Detalhe da máquina de impressão e da tinta"
            loading="lazy"
            decoding="async"
            className="aspect-[4/3] w-full rounded-[var(--radius-card)] border border-white/10 object-cover"
          />
        </Reveal>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
          {etapas.map((e, i) => (
            <Reveal
              key={e.n}
              delay={i * 0.07}
              className={
                "px-0 py-7 lg:px-6 lg:py-0 " +
                (i !== 0
                  ? "border-t border-white/12 pt-7 sm:pt-7 lg:border-l lg:border-t-0 lg:pt-0"
                  : "")
              }
            >
              <span className="font-mono text-[13px] text-[var(--color-indigo-soft)]">
                {e.n}
              </span>
              <h3 className="mt-4 font-display text-[24px] font-medium leading-tight text-bone">
                {e.titulo}
              </h3>
              <p className="mt-2.5 text-[15px] leading-[1.55] text-bone-dim">
                {e.texto}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
