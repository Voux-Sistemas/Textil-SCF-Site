export interface Marco {
  ano: string; // placeholder entre colchetes onde for fato concreto
  titulo: string;
  texto: string;
}

/**
 * Marcos da história da Casa. Onde houver fato concreto a preencher, o valor
 * vem entre colchetes para localizar fácil (ex.: [19XX], [ano]).
 */
export const timeline: Marco[] = [
  {
    ano: "[19XX]",
    titulo: "Fundação",
    texto: "A Casa nasce em [cidade], dedicada à estampa têxtil sob encomenda.",
  },
  {
    ano: "[ano]",
    titulo: "Primeira impressora digital",
    texto: "Migração da estampa convencional para o inkjet de alta definição.",
  },
  {
    ano: "[ano]",
    titulo: "Estúdio de criação",
    texto: "Abertura do estúdio próprio de desenvolvimento de estampa exclusiva.",
  },
  {
    ano: "[ano]",
    titulo: "Certificação [X]",
    texto: "Adesão a padrões de qualidade e responsabilidade ambiental.",
  },
  {
    ano: "[ano]",
    titulo: "Grandes marcas nacionais",
    texto: "O acervo passa a vestir coleções de marcas líderes do país.",
  },
];
