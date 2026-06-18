import type { ReactNode } from "react";

interface MarqueeProps {
  /** itens já espaçados (ex.: cada um com px-N) - serão duplicados p/ loop contínuo */
  children: ReactNode;
  /** segundos por volta completa (maior = mais lento) */
  durationSec?: number;
  /** inverte o sentido (desliza para a direita) */
  reverse?: boolean;
  className?: string;
}

/**
 * Carrossel horizontal contínuo e fluido (CSS, sem JS por frame).
 * Duplica o conteúdo e desliza translateX(-50%) em loop perfeito. Pausa no
 * hover; para sob prefers-reduced-motion (ver tokens.css). Fade nas bordas
 * via .marquee-wrap.
 */
export function Marquee({ children, durationSec = 36, reverse = false, className = "" }: MarqueeProps) {
  return (
    <div className={`marquee-wrap overflow-hidden ${className}`}>
      <div
        className="marquee-track flex w-max flex-nowrap"
        style={{
          ["--scf-marquee-dur" as string]: `${durationSec}s`,
          animationDirection: reverse ? "reverse" : undefined,
        }}
      >
        <div className="flex shrink-0 flex-nowrap items-center">{children}</div>
        <div className="flex shrink-0 flex-nowrap items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
