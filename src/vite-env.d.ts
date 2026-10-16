/// <reference types="vite/client" />

/* Variáveis de build (veja .env.example). O build falha se faltar alguma
   (vite.config.ts), então aqui elas sempre existem. */
interface ImportMetaEnv {
  /** Endereço da API da SCF, ex.: https://api.scftextil.com.br */
  readonly VITE_API_URL: string;
  /** WhatsApp da SCF só com dígitos e o 55, ex.: 5511963349523 */
  readonly VITE_WHATSAPP_NUMERO: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
