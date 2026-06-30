/* Faixa de imagem full-bleed: respiro editorial entre seções.
   Imagem em tom neutro/industrial (a cor viva fica nas estampas, não aqui). */
interface ImageBandProps {
  src: string;
  alt: string;
}

export function ImageBand({ src, alt }: ImageBandProps) {
  return (
    <section className="relative border-y border-[var(--color-line)]">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="h-[clamp(220px,40vh,440px)] w-full object-cover"
      />
    </section>
  );
}
