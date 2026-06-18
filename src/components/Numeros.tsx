import { Reveal } from "./ui/Reveal";

interface Stat {
  num: string;
  unit?: string;
  label: string;
}

// Fatos concretos a confirmar entram entre colchetes (brief §6).
const stats: Stat[] = [
  { num: "[2.400]", unit: "dpi", label: "Resolução de impressão" },
  { num: "[00]", unit: "anos", label: "No mercado têxtil" },
  { num: "[90]", unit: "% menos água", label: "Que o processo convencional" },
  { num: "[48]", unit: "h", label: "Prazo médio de amostra" },
];

export function Numeros() {
  return (
    <section className="border-y border-[var(--color-line)] bg-bone-2 py-14 md:py-16">
      <div className="container-scf grid grid-cols-2 gap-y-10 sm:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal
            key={s.label}
            delay={i * 0.06}
            className={
              "px-1 sm:px-7 " +
              (i !== 0 ? "sm:border-l sm:border-[var(--color-line)]" : "")
            }
          >
            <p className="font-display text-[clamp(34px,4vw,56px)] font-normal leading-none tracking-[-0.02em] text-ink">
              {s.num}
              {s.unit && (
                <span className="ml-1.5 align-baseline text-[clamp(15px,1.6vw,21px)] text-[var(--color-indigo)]">
                  {s.unit}
                </span>
              )}
            </p>
            <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-2">
              {s.label}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
