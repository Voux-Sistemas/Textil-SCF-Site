export type Familia =
  | "Botânica"
  | "Geométrica"
  | "Tie-dye"
  | "Animal"
  | "Étnica"
  | "Abstrata";

export interface Estampa {
  ref: string; // "SCF-0142"
  nome: string;
  familia: Familia;
  base: string; // base têxtil
  gramatura: string; // "120 g/m²"
  processo: string; // "Sublimação" | "Digital reativa"
  resolucao: string; // "2.400 dpi"
  img?: string; // URL .webp do bucket R2 (processado/com watermark). Ver PrintPlate.
  destaque?: boolean;
}

/**
 * Acervo placeholder. Os nomes e códigos SCF-XXXX são exemplos de catálogo.
 * Quando o pipeline R2 estiver ligado, preencha `img` com a URL .webp de cada
 * estampa. O PrintPlate troca automaticamente o padrão gerado pela imagem real.
 */
export const estampas: Estampa[] = [
  {
    ref: "SCF-0142",
    nome: "Jardim Tropical",
    familia: "Botânica",
    base: "Crepe poliéster",
    gramatura: "120 g/m²",
    processo: "Sublimação",
    resolucao: "2.400 dpi",
    destaque: true,
  },
  {
    ref: "SCF-0207",
    nome: "Folhagem Sombreada",
    familia: "Botânica",
    base: "Viscose",
    gramatura: "135 g/m²",
    processo: "Digital reativa",
    resolucao: "1.800 dpi",
  },
  {
    ref: "SCF-0318",
    nome: "Malha de Linhas",
    familia: "Geométrica",
    base: "Poliamida",
    gramatura: "110 g/m²",
    processo: "Sublimação",
    resolucao: "2.400 dpi",
  },
  {
    ref: "SCF-0354",
    nome: "Quadrante Quente",
    familia: "Geométrica",
    base: "Cetim poliéster",
    gramatura: "90 g/m²",
    processo: "Sublimação",
    resolucao: "2.400 dpi",
  },
  {
    ref: "SCF-0429",
    nome: "Maré de Índigo",
    familia: "Tie-dye",
    base: "Algodão penteado",
    gramatura: "160 g/m²",
    processo: "Digital reativa",
    resolucao: "1.440 dpi",
  },
  {
    ref: "SCF-0461",
    nome: "Névoa de Coral",
    familia: "Tie-dye",
    base: "Crepe poliéster",
    gramatura: "120 g/m²",
    processo: "Sublimação",
    resolucao: "2.400 dpi",
  },
  {
    ref: "SCF-0540",
    nome: "Pele de Onça",
    familia: "Animal",
    base: "Crepe poliéster",
    gramatura: "120 g/m²",
    processo: "Sublimação",
    resolucao: "2.400 dpi",
  },
  {
    ref: "SCF-0588",
    nome: "Casco de Cobra",
    familia: "Animal",
    base: "Microfibra",
    gramatura: "105 g/m²",
    processo: "Sublimação",
    resolucao: "2.400 dpi",
  },
  {
    ref: "SCF-0623",
    nome: "Tecelagem Ancestral",
    familia: "Étnica",
    base: "Linho misto",
    gramatura: "180 g/m²",
    processo: "Digital reativa",
    resolucao: "1.800 dpi",
  },
  {
    ref: "SCF-0671",
    nome: "Grafismo do Sertão",
    familia: "Étnica",
    base: "Algodão penteado",
    gramatura: "160 g/m²",
    processo: "Digital reativa",
    resolucao: "1.440 dpi",
  },
  {
    ref: "SCF-0744",
    nome: "Pigmento Solto",
    familia: "Abstrata",
    base: "Cetim poliéster",
    gramatura: "90 g/m²",
    processo: "Sublimação",
    resolucao: "2.400 dpi",
  },
  {
    ref: "SCF-0792",
    nome: "Aquarela Industrial",
    familia: "Abstrata",
    base: "Viscose",
    gramatura: "135 g/m²",
    processo: "Digital reativa",
    resolucao: "1.800 dpi",
  },
];

export const familias: Familia[] = [
  "Botânica",
  "Geométrica",
  "Tie-dye",
  "Animal",
  "Étnica",
  "Abstrata",
];

/* Aplicações sugeridas por família (segmentos, como catálogos têxteis fazem).
   Placeholder editorial - confirmar/ajustar com o cliente junto da copy. */
export const aplicacoes: Record<Familia, string[]> = {
  Botânica: ["Vestidos", "Camisaria", "Moda resort"],
  Geométrica: ["Camisaria", "Alfaiataria leve", "Acessórios"],
  "Tie-dye": ["Moda praia", "Athleisure", "Beachwear"],
  Animal: ["Vestidos", "Lenços", "Moda festa"],
  Étnica: ["Moda resort", "Saias e conjuntos", "Decoração leve"],
  Abstrata: ["Vestidos", "Moda festa", "Camisaria"],
};
