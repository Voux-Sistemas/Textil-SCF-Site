import { useState, type FormEvent } from "react";
import { WhatsappLogo, ArrowUpRight } from "@phosphor-icons/react";
import { Button } from "./ui/Button";
import { pedirOrcamento, type Estampa } from "../lib/api";
import { linkWhatsApp, mensagemSemRegistro } from "../lib/whatsapp";
import { CATALOGO_URL } from "../data/site";

/* Pedido de orçamento de UMA estampa pelo WhatsApp (dentro do PrintModal).
   1. grava o pedido na API (POST /publico/orcamentos: entra na Loja, canal
      whatsapp, com o número do pedido);
   2. abre a conversa no WhatsApp da SCF com o texto que a API devolveu.
   Se a API falhar (fora do ar, sem rede, limite por hora), abre o WhatsApp do
   mesmo jeito, com o texto montado aqui: o contato não se perde. Sem preço. */

type Etapa =
  | { tipo: "inicio" }
  | { tipo: "formulario" }
  | { tipo: "registrado"; numero: number; url: string; abriu: boolean }
  | { tipo: "semRegistro"; url: string; abriu: boolean };

const rotulo = "font-mono text-[10.5px] uppercase tracking-[0.12em] text-ink-2";
const campo =
  "w-full rounded-[var(--radius-input)] border border-[var(--color-line)] bg-[var(--color-paper)] px-3 py-2.5 " +
  "text-[15px] text-ink placeholder:text-ink-2/55 transition-colors duration-200 hover:border-[var(--color-ink-2)]";

export function OrcamentoWhatsApp({ estampa }: { estampa: Estampa }) {
  const [etapa, setEtapa] = useState<Etapa>({ tipo: "inicio" });
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [metros, setMetros] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [website, setWebsite] = useState(""); // armadilha: fica vazio
  const [erro, setErro] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);

  /* Mexeu num campo, o aviso de erro sai (volta no próximo envio, se for o caso). */
  const mudar =
    (definir: (v: string) => void) =>
    (e: { target: { value: string } }) => {
      definir(e.target.value);
      setErro(null);
    };

  /* As mesmas regras da API (nome, telefone com DDD, metros), para o pedido
     quase nunca voltar recusado. */
  function conferir(m: number): string | null {
    if (nome.trim().length < 2) return "Informe o seu nome.";
    const digitos = telefone.replace(/\D/g, "");
    if (digitos.length < 10 || digitos.length > 13) return "Informe o WhatsApp com DDD.";
    if (!(m > 0)) return "Informe quantos metros.";
    if (m > 100_000) return "No máximo 100.000 m por estampa.";
    return null;
  }

  async function enviar(ev: FormEvent) {
    ev.preventDefault();
    if (enviando) return;
    const m = Number(metros);
    const problema = conferir(m);
    if (problema) {
      setErro(problema);
      return;
    }
    setErro(null);
    setEnviando(true);

    /* A aba do WhatsApp abre JÁ, no clique: depois de esperar a API, o
       navegador bloquearia como pop-up. Bloqueou mesmo assim? Fica o botão. */
    const janela = window.open("", "_blank");
    if (janela) janela.opener = null;

    const dados = { nome: nome.trim(), telefone: telefone.trim(), mensagem: mensagem.trim() || undefined };
    let fim: Etapa;
    try {
      const r = await pedirOrcamento({ ...dados, estampas: [{ codigo: estampa.codigo, metros: m }], website });
      fim = { tipo: "registrado", numero: r.numero, url: linkWhatsApp(r.mensagem), abriu: !!janela };
    } catch {
      const texto = mensagemSemRegistro({
        nome: dados.nome,
        itens: [{ codigo: estampa.codigo, nome: estampa.nome, metros: m }],
        mensagem: dados.mensagem,
      });
      fim = { tipo: "semRegistro", url: linkWhatsApp(texto), abriu: !!janela };
    }
    if (janela && !janela.closed) janela.location.href = fim.url;
    setEtapa(fim);
    setEnviando(false);
  }

  if (etapa.tipo === "registrado" || etapa.tipo === "semRegistro") {
    return (
      <div role="status">
        <p className={rotulo}>
          {etapa.tipo === "registrado" ? `Orçamento nº ${etapa.numero} registrado` : "Conversa pelo WhatsApp"}
        </p>
        <p className="mt-2 text-[14.5px] leading-[1.55] text-ink-2">
          {etapa.tipo === "semRegistro" &&
            "Não conseguimos registrar o pedido agora, mas a conversa com a Casa segue pelo WhatsApp, com os dados da estampa. "}
          {etapa.abriu
            ? "A conversa abriu numa aba nova, com o pedido escrito. É só enviar."
            : "Abra a conversa abaixo: o pedido já vai escrito. É só enviar."}
        </p>
        <Button href={etapa.url} variant={etapa.abriu ? "ghost" : "indigo"} external className="mt-4 w-full sm:w-auto">
          <WhatsappLogo size={17} weight="bold" aria-hidden="true" />
          {etapa.abriu ? "Abrir o WhatsApp de novo" : "Abrir o WhatsApp"}
        </Button>
      </div>
    );
  }

  if (etapa.tipo === "inicio") {
    return (
      <div>
        <p className="text-[14.5px] leading-[1.55] text-ink-2">
          Peça o orçamento desta estampa: registramos o pedido e a conversa abre no
          WhatsApp da Casa. Cores nítidas, variantes e preços ficam na Área do Cliente.
        </p>
        <div className="mt-4 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
          <Button variant="indigo" onClick={() => setEtapa({ tipo: "formulario" })}>
            <WhatsappLogo size={17} weight="bold" aria-hidden="true" />
            Pedir orçamento pelo WhatsApp
          </Button>
          <Button href={CATALOGO_URL} variant="ghost" external>
            Área do Cliente
            <ArrowUpRight size={15} weight="bold" aria-hidden="true" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={enviar} noValidate className="relative">
      <p className={rotulo}>Pedido de orçamento · Ref. {estampa.codigo}</p>

      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 sm:col-span-2">
          <span className={rotulo}>Nome</span>
          <input
            className={campo}
            value={nome}
            onChange={mudar(setNome)}
            autoComplete="name"
            maxLength={80}
            required
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className={rotulo}>WhatsApp</span>
          <input
            className={campo}
            value={telefone}
            onChange={mudar(setTelefone)}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="(11) 90000-0000"
            maxLength={30}
            required
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className={rotulo}>Metros</span>
          <input
            className={campo}
            value={metros}
            onChange={mudar(setMetros)}
            type="number"
            inputMode="decimal"
            min="0.1"
            step="any"
            placeholder="ex.: 50"
            required
          />
        </label>
        <label className="flex flex-col gap-1.5 sm:col-span-2">
          <span className={rotulo}>Observações (opcional)</span>
          <textarea
            className={`${campo} resize-y`}
            value={mensagem}
            onChange={mudar(setMensagem)}
            rows={3}
            maxLength={500}
            placeholder="Base têxtil, prazo, cor..."
          />
        </label>
      </div>

      {/* Armadilha para robôs: escondida de quem usa o site, sempre vazia */}
      <div aria-hidden="true" className="absolute left-[-10000px] top-0 h-px w-px overflow-hidden">
        <label>
          Site
          <input tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
        </label>
      </div>

      {erro && (
        <p role="alert" className="mt-3 border-l-2 border-[var(--color-indigo)] pl-3 text-[13.5px] leading-[1.5] text-ink">
          {erro}
        </p>
      )}

      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center">
        <Button type="submit" variant="indigo" disabled={enviando}>
          <WhatsappLogo size={17} weight="bold" aria-hidden="true" />
          {enviando ? "Enviando..." : "Enviar e abrir o WhatsApp"}
        </Button>
        <button
          type="button"
          onClick={() => {
            setErro(null);
            setEtapa({ tipo: "inicio" });
          }}
          className="px-2 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-2 transition-colors hover:text-ink"
        >
          Voltar
        </button>
      </div>
    </form>
  );
}
