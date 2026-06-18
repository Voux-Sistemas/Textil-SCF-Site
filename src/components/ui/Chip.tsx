interface ChipProps {
  children: string;
  active?: boolean;
  onClick?: () => void;
  /** chip estático (selo) vs interativo (filtro) */
  as?: "button" | "span";
}

/* Retângulo 4px editorial (não-pílula); ativo = índigo preenchido. Mono uppercase. */
export function Chip({ children, active = false, onClick, as = "button" }: ChipProps) {
  const cls =
    "inline-flex items-center rounded-[var(--radius-input)] border px-4 py-2 font-mono text-[11px] " +
    "uppercase tracking-[0.14em] transition-colors duration-200 " +
    (active
      ? "border-[var(--color-indigo)] bg-[var(--color-indigo)] text-[var(--color-bone)]"
      : "border-[var(--color-line)] text-[var(--color-ink-2)] hover:border-[var(--color-ink)] hover:text-[var(--color-ink)]");

  if (as === "span") {
    return <span className={cls}>{children}</span>;
  }
  return (
    <button type="button" onClick={onClick} className={cls} aria-pressed={active}>
      {children}
    </button>
  );
}
