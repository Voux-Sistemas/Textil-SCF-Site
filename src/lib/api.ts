/* =========================================================================
   Cliente da API da SCF (repositório gestao-estamparia, apps/api).
   O site usa SÓ as rotas públicas (/publico/*): sem cookie e sem preço.
   O endereço vem de VITE_API_URL; o build falha sem ela (vite.config.ts).
   ========================================================================= */
const BASE = (import.meta.env.VITE_API_URL ?? "").replace(/\/+$/, "");

/* Uma estampa como o catálogo público entrega (catalogo.ts › paraPublico, na
   API). Preço e estoque nunca vêm aqui. As imagens já chegam com a marca
   d'água, servidas por img.scftextil.com.br. */
export interface Estampa {
  codigo: string; // "0048": texto, com os zeros
  nome: string;
  descricao: string | null;
  categoria: string | null;
  colecao: string | null;
  familia_cor: string | null;
  tecido: {
    composicao: string | null;
    gramatura: number | null; // g/m²
    largura: number | null; // cm
  } | null;
  imagem_url: string | null; // até 1200 px
  miniatura_url: string | null; // até 400 px
}

/* Quantas estampas o "recorte do acervo" mostra. A SCF escolhe quais no PDV
   (Loja › Catálogo › "Destaque no site"); vêm na ordem do código. */
export const NO_RECORTE = 12;

export class ErroDaApi extends Error {
  constructor(message: string, readonly status: number) {
    super(message);
  }
}

/* fetch com prazo (a API fora do ar não pode prender a tela) e erro em
   português: a API responde { erro: "..." } em toda falha. */
async function pedir<T>(caminho: string, init: RequestInit = {}, prazoMs = 10_000): Promise<T> {
  const controle = new AbortController();
  const relogio = setTimeout(() => controle.abort(), prazoMs);
  const externo = init.signal;
  externo?.addEventListener("abort", () => controle.abort(), { once: true });

  let r: Response;
  try {
    r = await fetch(`${BASE}${caminho}`, { ...init, signal: controle.signal });
  } catch {
    throw new ErroDaApi("Sem conexão com a SCF agora.", 0);
  } finally {
    clearTimeout(relogio);
  }
  const corpo = await r.json().catch(() => null);
  if (!r.ok) throw new ErroDaApi(corpo?.erro ?? "A SCF não respondeu como esperado.", r.status);
  return corpo as T;
}

/* O recorte: só as marcadas como destaque, ativas e no catálogo (a API filtra).
   Estampa sem foto fica de fora: no site, o acervo é a foto. */
export async function buscarRecorte(sinal?: AbortSignal): Promise<Estampa[]> {
  const r = await pedir<{ itens: Estampa[] }>(
    `/publico/estampas?destaque=1&por_pagina=${NO_RECORTE}`,
    { signal: sinal }
  );
  return r.itens.filter((e) => e.imagem_url || e.miniatura_url);
}

export interface PedidoDeOrcamento {
  nome: string;
  telefone: string;
  estampas: { codigo: string; metros: number }[];
  mensagem?: string;
  /* Campo-armadilha para robôs: vai sempre vazio (o input fica escondido). */
  website: string;
}

/* O botão de WhatsApp: grava o orçamento na Loja (canal whatsapp) e devolve
   o número do pedido e o texto pronto para abrir a conversa. Toda escrita na
   API exige o cabeçalho X-SCF. Limite: 10 pedidos por hora por IP. */
export function pedirOrcamento(p: PedidoDeOrcamento) {
  return pedir<{ ok: true; numero: number; mensagem: string }>(
    "/publico/orcamentos",
    {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-SCF": "1" },
      body: JSON.stringify(p),
    },
    8_000
  );
}
