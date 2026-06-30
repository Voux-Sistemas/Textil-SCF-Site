# Imagens de demonstração - Têxtil SCF

Guia pra gerar (via IA) as imagens de exemplo que vão no mockup, pra o cliente ver
o site "vestido". Depois, as fotos reais da empresa entram nos mesmos lugares.

**Regra de ouro do projeto:** a moldura do site é sóbria e cool-neutra; **a cor só
vive nas estampas**. Então:
- Estampas = explosão de cor, ricas e fiéis.
- Fotos de ambiente/fábrica = tom neutro frio (concreto, aço, cinza), e o **único
  ponto de cor viva é o tecido estampado** dentro da cena.
- Tudo fotorrealista, premium, sem cara de banco de imagem.

---

## BLOCO DE ESTILO (cole no FIM de todo prompt)

> Fotografia realista, estilo editorial premium de catálogo têxtil. Luz natural
> suave e difusa (luz de janela), sem flash duro. Ambiente e superfícies em tom
> neutro frio (concreto aparente, aço escovado, cinza-zinco, branco-osso). Cores
> fiéis, ricas e bem definidas. Foco preciso, alta resolução. SEM nenhum texto,
> letra, número, logotipo ou marca d'água na imagem. Sem aparência de stock
> genérico, sem pessoas posando/sorrindo para a câmera.

(Para os modelos que usam parâmetro de proporção, eu marco o `--ar` em cada item.)

---

# PARTE 1 - Estampas (o produto)

Essas encaixam em slots que **já existem** no site. É só salvar e apontar.

## 1.1 Hero - estampa vista pelo monograma SCF  ·  VERTICAL (--ar 2:3)
A estampa aparece recortada dentro da letra/monograma SCF (janela alta e estreita).
Tem que ser a mais bonita do conjunto, com **movimento** (o tecido drapeando).

> Close vertical de um tecido fino de seda/crepe estampado com padrão tie-dye/shibori
> em tons de índigo profundo, azul-petróleo e branco-osso, com nuances orgânicas como
> pigmento se espalhando na trama. O tecido cai em dobras suaves verticais, com leve
> brilho onde a luz toca. Enquadramento fechado, o tecido preenche todo o quadro.
> [+ BLOCO DE ESTILO]

Arquivo: `hero-estampa.jpg` (vertical, mínimo 1400x2400px)

## 1.2 Acervo - 12 estampas  ·  RETRATO (--ar 4:5)
Vão na galeria (aparecem desfocadas + marca d'água, mas ainda vale ter boas).
**Prompt base** (repita trocando só a descrição da estampa):

> Corte de tecido estampado preenchendo todo o quadro, proporção retrato 4:5, visto
> de cima (flat lay) com leve relevo da trama. Estampa nítida, repetição de padrão
> (rapport) visível, cor rica e fiel sobre base têxtil. ESTAMPA: {descrição abaixo}.
> [+ BLOCO DE ESTILO]

| Arquivo | Família | Estampa (descrição p/ trocar no prompt) |
|---|---|---|
| `scf-0142.jpg` | Botânica | folhagem tropical densa, verdes profundos com toques de coral e laranja-queimado, fundo escuro |
| `scf-0207.jpg` | Botânica | folhas sobrepostas em sombra, verde-musgo e oliva, quase monocromático e elegante |
| `scf-0318.jpg` | Geométrica | grade de linhas finas entrelaçadas, índigo sobre branco-osso, minimal e técnico |
| `scf-0354.jpg` | Geométrica | blocos/quadrantes geométricos em tons quentes (terracota, ocre, vinho) |
| `scf-0429.jpg` | Tie-dye | shibori índigo profundo, ondas de azul e branco-osso (a estampa "Maré de Índigo") |
| `scf-0461.jpg` | Tie-dye | tie-dye etéreo e esfumaçado em coral, rosa-queimado e creme |
| `scf-0540.jpg` | Animal | padrão onça clássico em ocre, caramelo e preto, sofisticado |
| `scf-0588.jpg` | Animal | escamas de cobra em cinza-esverdeado e bronze, brilho metálico sutil |
| `scf-0623.jpg` | Étnica | grafismo étnico tecido, terracota, índigo e cru, geométrico tribal |
| `scf-0671.jpg` | Étnica | grafismos rústicos de arte popular nordestina, ocre, marrom e branco |
| `scf-0744.jpg` | Abstrata | respingos e manchas de pigmento abstratos, multicolor sobre osso, gestual |
| `scf-0792.jpg` | Abstrata | aquarela abstrata fluida em índigo, cinza e toques de coral |

> Se faltar tempo, gere só **1 por família (6 imagens)** - já é suficiente pro mockup.

## 1.3 A Casa - placa vitrine nítida
É a mesma `scf-0429.jpg` (Maré de Índigo) acima, só que aqui ela aparece **nítida**
(sem desfoque). A mesma imagem serve. Não precisa gerar outra.

---

# PARTE 2 - Fotos da empresa (processo + casa)

São as que mais imergem o cliente ("a empresa dele no site"). **Ainda não têm slot
no layout** - eu adiciono o espaço quando você tiver as imagens (é ajuste rápido).
Em todas: ambiente neutro/industrial, **a cor viva é só o tecido estampado**.

## 2.1 Processo - 5 etapas  ·  HORIZONTAL (--ar 3:2)

**01 · Arte**
> Mesa de estúdio de criação têxtil: mãos de uma designer ajustando um padrão de
> estampa na tela de um computador, ao lado amostras de tecido estampado coloridas
> e uma carta de cores. Atelier neutro em madeira clara e cinza, luz de janela.
> Foco nas mãos e nas amostras coloridas. [+ BLOCO DE ESTILO]
Arquivo: `processo-01-arte.jpg`

**02 · Preparação**
> Rolo de tecido branco/cru sendo alinhado na entrada de uma grande impressora
> têxtil digital. Tecido liso e esticado, maquinário em aço e cinza, ambiente
> industrial limpo e neutro. Ainda sem cor (tecido em branco). [+ BLOCO DE ESTILO]
Arquivo: `processo-02-preparacao.jpg`

**03 · Impressão**  (a foto-herói do processo)
> Close de uma impressora têxtil digital inkjet de grande formato imprimindo: a
> cabeça de impressão desliza e o tecido sai estampado com um padrão vibrante. Forte
> contraste entre a máquina em aço/cinza e a explosão de cor que surge no tecido.
> Luz industrial neutra, foco na linha onde o branco vira cor. [+ BLOCO DE ESTILO]
Arquivo: `processo-03-impressao.jpg`

**04 · Fixação**
> Tecido estampado passando por uma calandra com vapor: rolos de aço aquecidos, leve
> vapor no ar difundindo a luz, o tecido colorido emergindo fixado e vívido. Ambiente
> industrial em tons de aço e concreto. [+ BLOCO DE ESTILO]
Arquivo: `processo-04-fixacao.jpg`

**05 · Controle**
> Mãos segurando uma amostra de tecido estampado ao lado de uma carta/leque Pantone,
> conferindo a fidelidade da cor sob luz neutra de cabine de cor. Mesa cinza neutra,
> foco na comparação de cor entre a amostra e o padrão. [+ BLOCO DE ESTILO]
Arquivo: `processo-05-controle.jpg`

## 2.2 A Casa - ambiente e equipe

**Atelier / galpão**  ·  HORIZONTAL (--ar 3:2) - a principal
> Vista ampla do interior de uma estamparia têxtil: rolos de tecido estampado
> coloridos organizados em prateleiras de aço, piso de concreto, pé-direito alto,
> luz natural entrando por janelas industriais. Os únicos pontos de cor são os
> tecidos estampados. Atmosfera de casa séria e organizada. [+ BLOCO DE ESTILO]
Arquivo: `casa-atelier.jpg`

**Equipe** (opcional)  ·  RETRATO ou QUADRADO
> Retrato ambiente, documental e não posado, de um profissional têxtil conferindo um
> rolo de tecido estampado contra a luz; jaleco/avental neutro, ambiente de fábrica
> em tons frios. Autêntico, não sorrindo para a câmera. [+ BLOCO DE ESTILO]
Arquivo: `casa-equipe.jpg`

**Fachada** (opcional)  ·  HORIZONTAL (--ar 16:9)
> Fachada de um galpão industrial têxtil no fim de tarde, arquitetura sóbria em
> concreto e aço, discreta e séria, sem letreiros. Luz natural suave. [+ BLOCO DE ESTILO]
Arquivo: `casa-fachada.jpg`

---

# Como me entregar
Joga os arquivos em `public/` (ou me manda). Eu:
1. Aponto as estampas no acervo (`src/data/estampas.ts`, campo `img`) - imediato.
2. Coloco a estampa do Hero pela janela do monograma - ajuste rápido.
3. Adiciono os espaços de foto no **Processo** e na **A Casa** e ligo as imagens.

> Prioridade pra um mockup convincente: **hero-estampa** + **6 estampas (1 por
> família)** + **processo-03-impressao** + **casa-atelier**. Com essas 9 o site já
> "veste" por completo na apresentação.
