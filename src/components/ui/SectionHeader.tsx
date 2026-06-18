import type { ReactNode } from "react";
import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";

interface SectionHeaderProps {
  eyebrow?: string;
  title: ReactNode;
  /** texto de apoio, empilhado SOB o título (sem split-header flutuante) */
  lead?: ReactNode;
  onDark?: boolean;
  className?: string;
}

/**
 * Cabeçalho de seção. Empilha vertical: eyebrow -> título Display -> lead.
 * Evita deliberadamente o padrão "título grande à esquerda + parágrafo
 * pequeno flutuando à direita" (banido pelo método anti-slop).
 */
export function SectionHeader({
  eyebrow,
  title,
  lead,
  onDark = false,
  className = "",
}: SectionHeaderProps) {
  return (
    <Reveal className={className}>
      {eyebrow && (
        <div className="mb-5">
          <Eyebrow onDark={onDark}>{eyebrow}</Eyebrow>
        </div>
      )}
      <h2
        className="font-display max-w-[16ch] text-[clamp(30px,4.5vw,56px)] font-light leading-[1.02] tracking-[-0.02em]"
        style={{ color: onDark ? "var(--color-bone)" : "var(--color-ink)" }}
      >
        {title}
      </h2>
      {lead && (
        <p
          className="mt-6 max-w-[58ch] text-[19px] leading-[1.55]"
          style={{ color: onDark ? "var(--color-bone-dim)" : "var(--color-ink-2)" }}
        >
          {lead}
        </p>
      )}
    </Reveal>
  );
}
