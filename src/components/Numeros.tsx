import { Reveal } from "./ui/Reveal";

interface Stat {
  num: string;
  unit?: string;
  label: string;
}

// Fatos concretos a confirmar entram entre colchetes (brief §6).
const stats: Stat[] = [
  { num: "[00]", unit: "anos", label: "no mercado têxtil" },
  { num: "[2.400]", unit: "dpi", label: "de resolução de impressão" },
];

/* Faixa esbelta de indicadores: número e rótulo na MESMA linha de base,
   rótulo em Switzer minúscula (o mono caixa-alta empilhado ficou "quadrado"
   demais pro cliente). Divisão sólida com o resto da página via border-y. */
export function Numeros() {
  return (
    <section className="border-y border-[var(--color-line)] bg-bone-2 py-9 md:py-11">
      <div className="container-scf flex flex-col gap-6 sm:flex-row sm:items-baseline sm:gap-x-20">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.06}>
            <p className="flex flex-wrap items-baseline gap-x-3">
              <span className="font-display text-[clamp(30px,3.2vw,44px)] font-medium leading-none tracking-[-0.02em] text-ink">
                {s.num}
                {s.unit && (
                  <span className="ml-1.5 text-[clamp(15px,1.5vw,19px)] font-normal text-[var(--color-indigo)]">
                    {s.unit}
                  </span>
                )}
              </span>
              <span className="text-[15.5px] leading-snug text-ink-2">{s.label}</span>
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
