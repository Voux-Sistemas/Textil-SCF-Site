import { WHATSAPP_NUMERO } from "../data/site";

/* Link oficial "click-to-chat" do WhatsApp da SCF, com o texto já escrito. */
export function linkWhatsApp(texto?: string): string {
  return `https://wa.me/${WHATSAPP_NUMERO}${texto ? `?text=${encodeURIComponent(texto)}` : ""}`;
}

/* "5511963349523" -> "(11) 96334-9523" (para mostrar no rodapé). */
export function telefoneLegivel(numero: string): string {
  const d = numero.replace(/\D/g, "").replace(/^55/, "");
  const m = d.match(/^(\d{2})(\d{4,5})(\d{4})$/);
  return m ? `(${m[1]}) ${m[2]}-${m[3]}` : numero;
}

/* Metros como a API escreve no texto do WhatsApp (fmtMetros, em @scf/regras). */
export const fmtMetros = (m: number) =>
  `${m.toLocaleString("pt-BR", { maximumFractionDigits: 1 })} m`;

/* Texto de reserva, quando a API não grava o pedido (fora do ar, sem rede,
   limite por hora): o mesmo formato do texto da API, sem o número do pedido.
   Assim o contato não se perde. */
export function mensagemSemRegistro(d: {
  nome: string;
  itens: { codigo: string; nome: string; metros: number }[];
  mensagem?: string;
}): string {
  return [
    `Olá, SCF Têxtil! Sou ${d.nome} e gostaria de um orçamento:`,
    "",
    ...d.itens.map((it) => `• ${it.codigo} - ${it.nome}: ${fmtMetros(it.metros)}`),
    ...(d.mensagem ? ["", d.mensagem] : []),
  ].join("\n");
}
