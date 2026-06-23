# Têxtil SCF — Site Institucional

Site institucional + vitrine da **Têxtil SCF** (estamparia digital têxtil).
Single-page, com a Área do Cliente levando ao site de catálogo (separado).

**Stack:** Vite + React + TypeScript + Tailwind v4 + Framer Motion.

---

## Rodar localmente

Pré-requisito: **Node.js 20+** (https://nodejs.org).

```bash
git clone https://github.com/vouxmidiabr/Textil-SCF-Site.git
cd Textil-SCF-Site
npm install
npm run dev
```

Abre em **http://localhost:5173**.

### Scripts
| Comando           | O que faz                                        |
|-------------------|--------------------------------------------------|
| `npm run dev`     | Desenvolvimento, com hot reload                  |
| `npm run build`   | Build de produção (gera a pasta `dist/`)         |
| `npm run preview` | Pré-visualiza o build localmente                 |
| `npm start`       | Serve o `dist/` (usado no deploy)                |

---

## Estrutura

```
src/
  components/        seções (Hero, Acervo, Processo, ...) + ui/ (primitivos)
  data/
    site.ts          CATALOGO_URL (link da Área do Cliente) + LOGO_SRC
    estampas.ts      acervo de estampas (ref, nome, família, ficha, img)
    timeline.ts      marcos da história ("A Casa")
  lib/patterns.ts    gerador de estampas em CSS (placeholder até entrar foto real)
  styles/tokens.css  design tokens (cores, fontes, espaçamento)
public/              imagens estáticas (logo etc.)
```

## Pontos de integração (o que ainda falta preencher)

- **URL do catálogo:** `src/data/site.ts` → `CATALOGO_URL` (hoje é placeholder).
- **Imagens reais:** trocar os padrões CSS por `<img>`. Ver `PrintPlate.tsx` e preencher
  `estampa.img` em `src/data/estampas.ts` (pipeline R2 → WebP com watermark).
- **Dados / copy:** textos entre colchetes (`[00] anos`, `[cidade]`, `[19XX]`...) — ver
  `BRIEFING-CLIENTE.md` para o questionário que coleta tudo.
- **Área do Cliente:** este site **não tem login próprio** — só leva ao login do site de
  catálogo (construído à parte). Nenhuma autenticação acontece aqui.

## Deploy

Configurado para **Railway** (`railway.json`): build via Nixpacks + `serve -s dist` na
porta do ambiente. Qualquer push na branch `main` dispara um novo deploy.
