import { Reveal } from "./ui/Reveal";
import { Marquee } from "./ui/Marquee";

/* Marcas inventadas (exemplo). Logos tipográficos no registro de moda:
   wordmark é a forma real de logo do setor. Sem rótulo de categoria abaixo. */
interface Marca {
  nome: string;
  cls: string;
}

const marcas: Marca[] = [
  { nome: "Marés", cls: "font-display text-[28px] tracking-[-0.01em]" },
  { nome: "ATELIER NORTE", cls: "font-mono text-[15px] uppercase tracking-[0.22em]" },
  { nome: "Casa Lumè", cls: "font-display font-light text-[29px] tracking-[-0.01em]" },
  { nome: "VERANO", cls: "font-sans font-semibold text-[21px] tracking-[0.18em]" },
  { nome: "Tropici", cls: "font-display text-[29px] tracking-[-0.02em]" },
  { nome: "LENÇÓIS", cls: "font-mono text-[14px] uppercase tracking-[0.26em]" },
  { nome: "Oficina Áurea", cls: "font-display text-[25px]" },
  { nome: "praiana.", cls: "font-sans font-medium text-[24px] lowercase" },
];

export function Clientes() {
  return (
    <section className="section-pad">
      <div className="container-scf">
        <Reveal>
          <h2 className="max-w-[18ch] font-display text-[clamp(28px,3.6vw,44px)] font-light leading-[1.1] tracking-[-0.02em] text-ink">
            Vestem as estampas da SCF.
          </h2>
        </Reveal>
      </div>

      {/* Mural de logos em carrossel contínuo (full-bleed, desliza pro lado) */}
      <Reveal className="mt-12">
        <Marquee durationSec={64}>
          {marcas.map((m) => (
            <span
              key={m.nome}
              className={`${m.cls} shrink-0 whitespace-nowrap px-10 text-ink-2 opacity-50 transition-all duration-300 hover:text-[var(--color-indigo)] hover:opacity-100`}
            >
              {m.nome}
            </span>
          ))}
        </Marquee>
      </Reveal>

      <div className="container-scf">
        {/* Depoimento curto */}
        <Reveal delay={0.1}>
          <figure className="mx-auto mt-16 max-w-[40ch] text-center">
            <blockquote className="font-display text-[clamp(22px,2.8vw,32px)] font-light leading-[1.3] text-ink">
              “A cor que aprovamos na amostra é a cor que chega no rolo. Com a
              SCF, a gente parou de torcer.”
            </blockquote>
            <figcaption className="mt-6 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-2">
              [Cliente], [cargo]
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
