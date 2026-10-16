import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

/* As variáveis que entram no JS na hora do build (veja .env.example). Sem
   elas o site sairia com o acervo e o WhatsApp quebrados; por isso o build
   PARA. No Coolify, deploy que falha deixa a versão anterior no ar. */
const OBRIGATORIAS: Record<string, RegExp> = {
  VITE_API_URL: /^https?:\/\/[^/]+/,
  VITE_WHATSAPP_NUMERO: /^55\d{10,11}$/,
};

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  if (command === "build") {
    // loadEnv junta os .env com as variáveis do ambiente (que valem mais).
    const env = loadEnv(mode, ".", "VITE_");
    const problemas = Object.entries(OBRIGATORIAS)
      .filter(([nome, formato]) => !formato.test(env[nome] ?? ""))
      .map(([nome]) => (env[nome] ? `${nome} com formato inválido` : `${nome} não definida`));
    if (problemas.length) {
      throw new Error(`Build parado: ${problemas.join("; ")}. Veja o .env.example.`);
    }
  }

  return {
    plugins: [react(), tailwindcss()],
  };
});
