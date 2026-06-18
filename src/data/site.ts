/* =========================================================================
   Configuração de links externos do site institucional.

   O CATÁLOGO COMPLETO (com referências, fichas e PREÇOS) é um site SEPARADO,
   já construído pelo sócio. A "Área do Cliente" deste site institucional não
   tem login próprio: ela leva o cliente direto ao login desse catálogo.

   >>> TROCAR pela URL real do site de catálogo quando estiver definida. <<<
   ========================================================================= */
export const CATALOGO_URL = "https://catalogo.textilscf.com.br"; // TODO: URL real do catálogo

/* Rótulo único para a ação "entrar no catálogo" - usado em nav, acervo e footer.
   Mantém uma só intenção/rótulo em toda a página. */
export const AREA_CLIENTE_LABEL = "Área do Cliente";

/* Marca SCF. Vazio "" = mostra só o wordmark "TÊXTIL SCF" (sem quebrar nada).
   Quando a logo estiver salva em public/ (ideal: SVG transparente; ou PNG de
   fundo transparente, alta resolução), aponte aqui, ex.: "/logo-scf.svg".
   A marca é recolorida por CSS (tinta no fundo claro, osso no fundo escuro). */
export const LOGO_SRC = "/logo-scf.png"; // marca SCF recortada (304x624, ratio ~0.49)
