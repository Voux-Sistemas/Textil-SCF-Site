import { Reveal } from "./ui/Reveal";
import { Marquee } from "./ui/Marquee";

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
      <Reveal>
        <Marquee durationSec={78}>
          {stats.map((s) => (
            <div key={s.label} className="flex shrink-0 items-baseline gap-3.5 px-12">
              <span className="font-display text-[clamp(34px,4vw,54px)] font-normal leading-none tracking-[-0.02em] text-ink">
                {s.num}
                {s.unit && (
                  <span className="ml-1.5 text-[clamp(15px,1.6vw,21px)] text-[var(--color-indigo)]">
                    {s.unit}
                  </span>
                )}
              </span>
              <span className="max-w-[18ch] font-mono text-[11px] uppercase leading-snug tracking-[0.14em] text-ink-2">
                {s.label}
              </span>
            </div>
          ))}
        </Marquee>
      </Reveal>
    </section>
  );
}
