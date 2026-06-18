import type { ReactNode } from "react";

type Variant = "solid" | "indigo" | "ghost" | "ghostDark" | "onDark";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  variant?: Variant;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
  /** abre em nova aba com rel seguro (links externos, ex.: catálogo) */
  external?: boolean;
}

/* Retângulo editorial de raio 4px (não-pílula). Micro-deslocamento de 1px no
   hover. Contraste verificado: texto sempre legível sobre o fundo do botão (AA). */
const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius-input)] px-6 py-3.5 " +
  "text-[14px] font-semibold leading-none tracking-[0.01em] transition-all duration-300 " +
  "hover:-translate-y-px";

const variants: Record<Variant, string> = {
  // tinta sólida + texto osso
  solid: "bg-[var(--color-ink)] text-[var(--color-bone)] hover:bg-[var(--color-indigo-deep)]",
  // índigo de marca + texto osso
  indigo: "bg-[var(--color-indigo)] text-[var(--color-bone)] hover:bg-[var(--color-indigo-deep)]",
  // fantasma: borda tinta, preenche no hover
  ghost:
    "border border-[var(--color-ink)] text-[var(--color-ink)] " +
    "hover:bg-[var(--color-ink)] hover:text-[var(--color-bone)]",
  // fantasma sobre fundo escuro (overlay mobile)
  ghostDark:
    "border border-[var(--color-bone)]/35 text-[var(--color-bone)] " +
    "hover:bg-[var(--color-bone)] hover:text-[var(--color-ink)]",
  // sobre fundo escuro: osso sólido + texto índigo
  onDark:
    "bg-[var(--color-bone)] text-[var(--color-indigo-deep)] hover:bg-white",
};

export function Button({
  children,
  href,
  variant = "solid",
  onClick,
  type = "button",
  className = "",
  external = false,
}: ButtonProps) {
  const cls = `${base} ${variants[variant]} ${className}`;
  if (href) {
    return (
      <a
        href={href}
        onClick={onClick}
        className={cls}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  }
  return (
    <button type={type} onClick={onClick} className={cls}>
      {children}
    </button>
  );
}
