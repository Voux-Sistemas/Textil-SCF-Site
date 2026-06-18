import type { CSSProperties } from "react";
import type { Familia } from "../data/estampas";

/* =========================================================================
   Gerador de estampas em CSS (placeholder enquanto o pipeline R2 não entra).
   O briefing pede explicitamente padrões gerados para o grid não ficar com
   cara de placeholder cinza. Cada família tem um motivo próprio; o código de
   referência (ex.: SCF-0142) serve de seed para variar matiz e posição, de
   modo que duas estampas da mesma família não fiquem idênticas.

   Direção de cor: fundos PROFUNDOS e saturados (não lavados) - sobre a moldura
   cool-neutra, a placa é o ponto de cor explosiva. Lavado = cara de IA.

   >>> PONTO DE TROCA: quando houver foto real, o PrintPlate usa <img src> e
   este gerador deixa de ser chamado. Ver PrintPlate.tsx. <<<
   ========================================================================= */

// Hash estável a partir do código de referência -> 0..1
function seedOf(ref: string): number {
  let h = 0;
  for (let i = 0; i < ref.length; i++) {
    h = (h * 31 + ref.charCodeAt(i)) >>> 0;
  }
  return (h % 1000) / 1000;
}

const wrap = (n: number) => ((n % 360) + 360) % 360;

export function patternStyle(familia: Familia, ref: string): CSSProperties {
  const s = seedOf(ref);
  const jitter = (base: number, range: number) => base + (s - 0.5) * range;

  switch (familia) {
    /* Folhagem densa: base verde profunda + folhas claras + uma flor de contraste */
    case "Botânica": {
      const h = wrap(jitter(140, 30)); // verde
      return {
        backgroundColor: `hsl(${h} 44% 24%)`,
        backgroundImage: [
          `radial-gradient(38% 50% at ${22 + s * 14}% 28%, hsl(${wrap(h + 6)} 55% 52%) 0%, transparent 60%)`,
          `radial-gradient(46% 42% at 80% ${62 + s * 10}%, hsl(${wrap(h - 18)} 60% 44%) 0%, transparent 58%)`,
          `radial-gradient(30% 38% at 58% 80%, hsl(${wrap(h + 14)} 58% 58%) 0%, transparent 55%)`,
          `radial-gradient(24% 30% at ${72 - s * 20}% 22%, hsl(${wrap(h + 150)} 72% 62%) 0%, transparent 50%)`,
        ].join(","),
      };
    }

    /* Malha geométrica: losangos saturados sobre base média */
    case "Geométrica": {
      const h = wrap(jitter(28, 200));
      const c1 = `hsl(${h} 66% 55%)`;
      const c2 = `hsl(${wrap(h + 180)} 46% 24%)`;
      const bg = `hsl(${wrap(h + 20)} 42% 40%)`;
      return {
        backgroundColor: bg,
        backgroundImage: [
          `repeating-linear-gradient(45deg, ${c1} 0 14px, transparent 14px 42px)`,
          `repeating-linear-gradient(-45deg, ${c2} 0 14px, transparent 14px 42px)`,
        ].join(","),
        backgroundSize: "60px 60px, 60px 60px",
      };
    }

    /* Tie-dye: anéis concêntricos que se fundem, base profunda */
    case "Tie-dye": {
      const h = wrap(jitter(215, 80)); // índigo -> coral conforme seed
      return {
        backgroundColor: `hsl(${h} 52% 24%)`,
        backgroundImage: [
          `radial-gradient(circle at ${35 + s * 30}% ${40 + s * 20}%, hsl(${wrap(h + 10)} 78% 72%) 0%, hsl(${h} 66% 46%) 24%, hsl(${wrap(h - 15)} 60% 28%) 52%, hsl(${wrap(h - 30)} 55% 18%) 100%)`,
          `radial-gradient(circle at ${70 - s * 25}% ${75 - s * 20}%, hsl(${wrap(h + 28)} 72% 66%) 0%, transparent 46%)`,
        ].join(","),
      };
    }

    /* Animal: rosetas tipo onça, dois deslocamentos, contraste forte */
    case "Animal": {
      const h = wrap(jitter(34, 26)); // tan
      const spot = `hsl(${wrap(h - 18)} 62% 15%)`;
      const ring = `hsl(${wrap(h - 4)} 56% 33%)`;
      const bg = `hsl(${h} 56% 58%)`;
      return {
        backgroundColor: bg,
        backgroundImage: [
          `radial-gradient(circle at 50% 50%, ${spot} 0 18%, ${ring} 19% 30%, transparent 32%)`,
          `radial-gradient(circle at 50% 50%, ${spot} 0 16%, ${ring} 17% 28%, transparent 30%)`,
        ].join(","),
        backgroundSize: "54px 54px, 54px 54px",
        backgroundPosition: "0 0, 27px 27px",
      };
    }

    /* Étnica: bandas kilim em zigue-zague sobre base profunda */
    case "Étnica": {
      const h = wrap(jitter(8, 60)); // brick / mostarda
      const a = `hsl(${h} 64% 48%)`;
      const b = `hsl(${wrap(h + 200)} 46% 24%)`;
      const c = `hsl(${wrap(h + 38)} 66% 58%)`;
      return {
        backgroundColor: `hsl(${wrap(h + 18)} 40% 32%)`,
        backgroundImage: [
          `repeating-linear-gradient(60deg, ${a} 0 10px, transparent 10px 20px)`,
          `repeating-linear-gradient(-60deg, ${b} 0 10px, transparent 10px 20px)`,
          `repeating-linear-gradient(0deg, ${c} 0 4px, transparent 4px 40px)`,
        ].join(","),
        backgroundSize: "46px 80px, 46px 80px, 100% 80px",
      };
    }

    /* Abstrata: blooms de pigmento saturado (chave CMYK) sobre base profunda */
    case "Abstrata": {
      const h = wrap(jitter(330, 360));
      return {
        backgroundColor: `hsl(${wrap(h + 40)} 32% 30%)`,
        backgroundImage: [
          `radial-gradient(40% 45% at ${25 + s * 20}% 35%, hsl(${h} 82% 60%) 0%, transparent 58%)`,
          `radial-gradient(45% 50% at 78% 30%, hsl(${wrap(h + 150)} 80% 56%) 0%, transparent 56%)`,
          `radial-gradient(50% 55% at 55% 80%, hsl(${wrap(h + 60)} 82% 62%) 0%, transparent 58%)`,
        ].join(","),
      };
    }
  }
}
