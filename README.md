# Têxtil SCF — Site Institucional

Site institucional + vitrine da **Têxtil SCF** (estamparia digital têxtil).
Single-page, com a Área do Cliente levando ao site de catálogo (separado).

**Stack:** Vite + React + TypeScript + Tailwind v4 + Framer Motion.

---

## Rodar localmente

Pré-requisito: **Node.js 20+** (https://nodejs.org).

```bash
git clone https://github.com/Voux-Sistemas/Textil-SCF-Site.git
cd Textil-SCF-Site
npm install
cp .env.example .env.local   # e ajuste, se precisar (veja "Variáveis")
npm run dev
```

Abre em **http://localhost:5173**.

### Variáveis

São de **build** (Vite) e nenhuma é segredo: vão para dentro do JS do site. Sem
elas, o `npm run build` para com o motivo (`vite.config.ts`).

| Variável | Valor | Para quê |
|---|---|---|
| `VITE_API_URL` | `https://api.scftextil.com.br` | a API da SCF (o acervo e o orçamento) |
| `VITE_WHATSAPP_NUMERO` | `5511963349523` | o WhatsApp da SCF, só dígitos, com o 55 |

> **Cuidado ao testar o botão de orçamento:** ele grava de verdade na Loja da API
> que estiver no `VITE_API_URL`. Para testar, suba a API local (no
> `gestao-estamparia`: `npm run dev:api`) e use `VITE_API_URL=http://localhost:3000`.

### Scripts
| Comando           | O que faz                                        |
|-------------------|--------------------------------------------------|
| `npm run dev`     | Desenvolvimento, com hot reload                  |
| `npm run build`   | Build de produção (gera a pasta `dist/`)         |
| `npm run preview` | Pré-visualiza o build localmente                 |
| `npm start`       | Serve o `dist/` com o `serve` (só o Railway de reserva; sai na S5) |

---

## Estrutura

```
src/
  components/        seções (Hero, Acervo, Processo, ...) + ui/ (primitivos)
  data/
    site.ts          CATALOGO_URL (Área do Cliente), WHATSAPP_NUMERO e LOGO_SRC
    timeline.ts      marcos da história ("A Casa")
  lib/
    api.ts           a API da SCF: o recorte do acervo e o pedido de orçamento
    whatsapp.ts      link do WhatsApp e o texto de reserva (API fora do ar)
  styles/tokens.css  design tokens (cores, fontes, espaçamento)
public/              imagens estáticas (logo etc.)
```

## Integração com a API da SCF

A API é a do repositório `Voux-Sistemas/gestao-estamparia` (`apps/api`). O site usa
só as rotas públicas: sem cookie e **nunca com preço**.

- **Acervo** (`Acervo.tsx`): `GET /publico/estampas?destaque=1&por_pagina=12`. São as
  estampas que a SCF marca como **destaque** no PDV (Loja › Catálogo › "Destaque no
  site"), ativas e no catálogo, na ordem do código. As fotos vêm prontas de
  `img.scftextil.com.br`, já com a marca d'água; o site só desfoca. Estampa sem foto
  fica de fora. Os filtros aparecem quando o recorte tem duas categorias ou mais.
  Com a API fora (ou sem destaque marcado), a seção mostra um aviso e as saídas
  (Área do Cliente e WhatsApp).
- **Orçamento pelo WhatsApp** (`OrcamentoWhatsApp.tsx`, no detalhe da estampa): nome,
  WhatsApp, metros e observação vão para `POST /publico/orcamentos` (entra na Loja,
  canal whatsapp, com o número do pedido) e a conversa abre no WhatsApp da SCF com o
  texto que a API devolve. Se a API falhar, o WhatsApp abre do mesmo jeito, com o
  texto montado no site (sem o número do pedido).
- **Rodapé:** WhatsApp direto, sem gravar orçamento. O site não tem e-mail.

## O que ainda falta preencher

- **Dados / copy:** textos entre colchetes (`[00] anos`, `[cidade]`, `[19XX]`...) — ver
  `BRIEFING-CLIENTE.md` para o questionário que coleta tudo.
- **Área do Cliente:** este site **não tem login próprio** — só leva ao login do site de
  catálogo (construído à parte). Nenhuma autenticação acontece aqui.

## Deploy

**Coolify** (aplicação `scf-site`), a partir da `main`: Nixpacks como site estático.

**No ar desde 16/10/2026** em `https://scftextil.com.br`. O `www` redireciona para o
domínio sem `www`, e o HTTPS é do Let's Encrypt. O acervo mostra os destaques
marcados no PDV (12 hoje) e lê a API em `https://api.scftextil.com.br`.

| Campo | Valor |
|---|---|
| Install Command | `npm ci --include=dev` (o Vite é devDependency) |
| Build Command | `npm run build` |
| Publish Directory | `/dist` · porta 80 · estático + SPA |
| Build Variables | `VITE_API_URL`, `VITE_WHATSAPP_NUMERO` e `NIXPACKS_NODE_VERSION=22` |

- Mudou uma variável? **Deploy** novo (o valor entra no build; Restart não basta).
- Mudança de código vai numa branch nova, com PR. O que entra na `main` vai ao ar.
- **Railway:** o site antigo ficou lá de reserva, com o deploy automático desligado.
  A limpeza (S5) é por volta de 30/10/2026: desligar o serviço e tirar daqui o
  `railway.json`, a dependência `serve`, o `npm start` e as anotações `railway` do
  `catalog-info.yaml`.
