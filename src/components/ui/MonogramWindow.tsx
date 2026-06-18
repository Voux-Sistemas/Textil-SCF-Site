import type { ReactNode } from "react";
import { LOGO_SRC } from "../../data/site";

interface MonogramWindowProps {
  children: ReactNode;
  className?: string;
}

/**
 * A silhueta da marca SCF como JANELA: o conteúdo (uma estampa) aparece apenas
 * dentro do monograma; o resto fica transparente. Encarna o conceito do site -
 * moldura sóbria, cor explosiva DENTRO da marca.
 *
 * Usa LOGO_SRC (PNG transparente) como máscara. Se a máscara não for suportada,
 * degrada para o retângulo da estampa (ainda válido).
 */
export function MonogramWindow({ children, className = "" }: MonogramWindowProps) {
  return (
    <div
      className={className}
      style={{
        WebkitMaskImage: `url("${LOGO_SRC}")`,
        maskImage: `url("${LOGO_SRC}")`,
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
      }}
    >
      {children}
    </div>
  );
}
