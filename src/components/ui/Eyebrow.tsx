interface EyebrowProps {
  children: string;
  /** quando sobre fundo escuro (seção ink) */
  onDark?: boolean;
}

/**
 * Assinatura estrutural: traço curto índigo + rótulo mono uppercase.
 * Usado com parcimônia (apenas em seções-âncora), nunca em toda seção.
 */
export function Eyebrow({ children, onDark = false }: EyebrowProps) {
  return (
    <div className="flex items-center gap-3">
      <span
        aria-hidden="true"
        className="h-px w-[22px] shrink-0"
        style={{ backgroundColor: onDark ? "var(--color-indigo-soft)" : "var(--color-indigo)" }}
      />
      <span
        className="font-mono text-[11px] uppercase tracking-[0.2em]"
        style={{ color: onDark ? "var(--color-bone-dim)" : "var(--color-ink-2)" }}
      >
        {children}
      </span>
    </div>
  );
}
