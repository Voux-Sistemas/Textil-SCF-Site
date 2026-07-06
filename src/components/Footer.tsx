import {
  LockSimple,
  WhatsappLogo,
  EnvelopeSimple,
  MapPin,
  InstagramLogo,
} from "@phosphor-icons/react";
import { LogoMark } from "./ui/LogoMark";
import { CATALOGO_URL } from "../data/site";

const nav = [
  { label: "Acervo", href: "#acervo" },
  { label: "Serviços", href: "#servicos" },
  { label: "Processo", href: "#processo" },
  { label: "A Casa", href: "#a-casa" },
];

export function Footer() {
  const ano = new Date().getFullYear();

  return (
    <footer className="bg-[var(--color-ink)]">
      {/* Ourela: o par do fio de cor do topo - abre no header, fecha aqui */}
      <div aria-hidden="true" className="selvedge" />
      <div className="container-scf py-16 md:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          {/* Marca + Área do Cliente */}
          <div className="md:col-span-5">
            <span className="flex items-center gap-2.5">
              <LogoMark onDark className="h-12 w-[23px]" />
              <span className="font-display text-[24px] font-medium text-bone">
                TÊXTIL SCF
              </span>
            </span>
            <p className="mt-4 max-w-[34ch] text-[15px] leading-[1.6] text-bone-dim">
              Estamparia digital têxtil. Cor fiel ao padrão, da arte à fixação,
              para marcas que tratam a estampa como assinatura.
            </p>
            <a
              href={CATALOGO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-[var(--radius-input)] border border-white/20 px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-bone transition-colors hover:border-white/50"
            >
              <LockSimple size={14} weight="bold" aria-hidden="true" />
              Área do Cliente
            </a>
          </div>

          {/* Navegar */}
          <nav className="md:col-span-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-indigo-soft)]">
              Navegar
            </p>
            <ul className="mt-5 space-y-3">
              {nav.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-[15px] text-bone-dim transition-colors hover:text-bone"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contato */}
          <div className="md:col-span-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-indigo-soft)]">
              Contato
            </p>
            <ul className="mt-5 space-y-3 text-[15px] text-bone-dim">
              <li>
                <a
                  href="https://wa.me/55[tel]"
                  className="inline-flex items-center gap-2.5 transition-colors hover:text-bone"
                >
                  <WhatsappLogo size={17} aria-hidden="true" />
                  WhatsApp [tel]
                </a>
              </li>
              <li>
                <a
                  href="mailto:contato@textilscf.com.br"
                  className="inline-flex items-center gap-2.5 transition-colors hover:text-bone"
                >
                  <EnvelopeSimple size={17} aria-hidden="true" />
                  contato@textilscf.com.br
                </a>
              </li>
              <li>
                <span className="inline-flex items-center gap-2.5">
                  <MapPin size={17} aria-hidden="true" />
                  [endereço], [cidade]
                </span>
              </li>
              <li>
                <a
                  href="#"
                  className="inline-flex items-center gap-2.5 transition-colors hover:text-bone"
                >
                  <InstagramLogo size={17} aria-hidden="true" />
                  @textilscf
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Barra inferior */}
        <div className="mt-16 flex flex-col gap-3 border-t border-white/12 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[11px] tracking-[0.04em] text-bone-dim">
            © {ano} Têxtil SCF. Estamparia Digital.
          </p>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-bone-dim">
            Acervo catalogado · [cidade]
          </p>
        </div>
      </div>
    </footer>
  );
}
