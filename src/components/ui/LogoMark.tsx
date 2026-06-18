import { LOGO_SRC } from "../../data/site";

interface LogoMarkProps {
  /** sobre fundo escuro (footer / overlay) -> marca em osso; senão tinta */
  onDark?: boolean;
  /** controla o tamanho/proporção da marca (ex.: "h-7 w-4") */
  className?: string;
}

/**
 * Marca SCF recolorível via CSS `mask` + `currentColor`:
 * tinta no fundo claro, osso no fundo escuro. Usa UM só arquivo (alpha = forma
 * da marca) para todas as superfícies.
 *
 * Renderiza `null` enquanto LOGO_SRC estiver vazio (em site.ts), para a nav
 * nunca exibir um quadrado quebrado antes de a logo existir.
 *
 * >>> Ajustar a proporção (w/h) quando o arquivo real entrar - a marca é
 * retangular vertical. <<<
 */
export function LogoMark({ onDark = false, className = "h-7 w-[16px]" }: LogoMarkProps) {
  if (!LOGO_SRC) return null;
  return (
    <span
      aria-hidden="true"
      className={`block shrink-0 ${onDark ? "text-bone" : "text-ink"} ${className}`}
      style={{
        backgroundColor: "currentColor",
        WebkitMaskImage: `url("${LOGO_SRC}")`,
        maskImage: `url("${LOGO_SRC}")`,
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
        WebkitMaskSize: "contain",
        maskSize: "contain",
      }}
    />
  );
}
