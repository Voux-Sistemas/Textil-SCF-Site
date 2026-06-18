import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

interface MagneticProps {
  children: ReactNode;
  /** intensidade da atração (0..1) */
  strength?: number;
  className?: string;
}

/**
 * Atração magnética ao cursor. Roda FORA do ciclo de render do React
 * (useMotionValue/useSpring) para não re-renderizar por frame nem travar no
 * mobile. Respeita prefers-reduced-motion (fica imóvel).
 */
export function Magnetic({ children, strength = 0.35, className = "inline-flex" }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 160, damping: 14, mass: 0.1 });
  const sy = useSpring(y, { stiffness: 160, damping: 14, mass: 0.1 });

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  }
  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
