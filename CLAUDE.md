# CLAUDE.md — Têxtil SCF (site institucional)

Contexto para qualquer sessão de Claude Code neste projeto. **Leia antes de editar.**

## O que é
Site institucional single-page da **Têxtil SCF** (estamparia digital têxtil, B2B).
NÃO é loja — posiciona a empresa. O catálogo completo (com preços) é um site
**separado**; aqui a "Área do Cliente" só leva ao login dele (link externo).

## Como rodar
- `npm install` e depois `npm run dev` → http://localhost:5173
- `npm run build` (produção, gera `dist/`) · `npm start` (serve o `dist/`)
- Deploy: **Railway** (`railway.json`), redeploy a cada push na `main`. Node 20+.

## Stack
Vite + React + TypeScript + Tailwind v4 (`@tailwindcss/vite`) + Framer Motion + `@phosphor-icons/react`.

## Conceito e design — NÃO QUEBRAR
Conceito **"Arquivo Vivo de Cor"**: a MOLDURA é sóbria e cool-neutra; a COR vive
nas estampas. O monograma SCF é sistema de marca (janela onde a estampa aparece,
e elemento de arquitetura).

- **Tom:** casa têxtil SÉRIA, tradicional, premium. **NÃO** "tech/startup".
- **Paleta:** neutros cool (zinc) + acento **índigo** `#2c3e6b`. **Nunca** fundo
  creme quente + serifa de alto contraste + brass — é o "cara de IA" que o cliente baniu.
- **VERDE É BANIDO** (veto do dono). Nada verde em lugar nenhum, nem nos padrões
  gerados (`src/lib/patterns.ts` - matiz ~65..180 proibida) nem em acentos.
- **Sistema de tinta** (a cor "de estampa" do site): tokens `--ink-*` em tokens.css
  (índigo, vinho, coral, âmbar). Vive em 3 lugares SÓ: InkFlow no monograma do
  hero, ourela `.selvedge` no topo (Nav) e no rodapé. Não multiplicar - a
  moldura continua sóbria.
- **Fontes:** Cabinet Grotesk (display) + Switzer (corpo) + Space Mono (técnico).
  Ênfase em título = **peso**, não itálico (a display não tem itálico real).
- **Raio único ~4px.** Sem pílulas; sem sharp-total ("jornalzão").
- **Divisões de seção marcadas e sólidas** — sem fades de cor entre seções
  (o cliente rejeitou: dava ar "tech" demais).
- **Motion calmo e contido.** Carrosséis lentos (logos, serviços). Respeitar
  `prefers-reduced-motion` sempre.
- Tokens em `src/styles/tokens.css`.

## Regras de conteúdo
- Copy em **português**, tom institucional/técnico, enxuto.
- **ZERO em-dash (—).** Usar hífen normal. (regra forte)
- Fatos a confirmar ficam entre colchetes: `[00] anos`, `[cidade]`, `[19XX]`, `[tel]`.

## Onde mexer
- `src/data/site.ts` — `CATALOGO_URL` (link da Área do Cliente, **trocar pela real**) + `LOGO_SRC`.
- `src/data/estampas.ts` — acervo (preencher `img` com foto real quando houver).
- `src/data/timeline.ts` — marcos da história ("A Casa").
- `src/components/` — seções; `ui/` primitivos.
- `public/` — imagens estáticas (`logo-scf.png` já está lá).
- `BRIEFING-CLIENTE.md` — questionário para coletar dados e fotos do cliente.

## Pendente
- Preencher `CATALOGO_URL` (hoje placeholder).
- Trocar os padrões CSS (`src/lib/patterns.ts`) por **fotos reais** via `estampa.img` /
  `<img>` (ver `PrintPlate.tsx` — o ponto de troca está comentado).
- Preencher os `[colchetes]` com dados reais (ver briefing).
- Decidir PT/EN (toggle preparado; hoje só PT).
