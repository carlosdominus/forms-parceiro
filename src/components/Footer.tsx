import React from "react";
import { Instagram, Youtube, Linkedin } from "lucide-react";

interface FooterProps {
  onOpenFormTime?: () => void;
  onOpenFormParceiro?: () => void;
  onNavClick?: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
}

export default function Footer({ onOpenFormTime, onOpenFormParceiro, onNavClick }: FooterProps) {
  const navLinks = [
    { label: "Onde atuamos", href: "#onde-atuamos" },
    { label: "Sobre nós", href: "#sobre-nos" },
    { label: "Trabalhe conosco", href: "#trabalhe-conosco" },
  ];

  const socialLinks = [
    {
      name: "Instagram",
      href: "https://instagram.com",
      icon: Instagram,
    },
    {
      name: "YouTube",
      href: "https://youtube.com",
      icon: Youtube,
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com",
      icon: Linkedin,
    },
  ];

  return (
    <footer className="w-full bg-[#0a0a0a] border-t border-zinc-900 text-zinc-300 py-12 sm:py-16 md:py-20 px-6 sm:px-12 md:px-16 selection:bg-zinc-800 selection:text-white">
      <div className="max-w-[1920px] mx-auto space-y-12 sm:space-y-16">
        
        {/* BLOCO SUPERIOR (Linha única no desktop, empilha em coluna no mobile) */}
        <div className="flex flex-col md:flex-row items-start justify-between gap-10 md:gap-16">
          
          {/* LADO ESQUERDO: Navegação + Formulários ao lado */}
          <div className="order-1 md:order-2 flex flex-col sm:flex-row items-start gap-8 sm:gap-12 lg:gap-16">
            
            {/* Bloco de Navegação (Links em coluna) */}
            <div className="flex flex-col space-y-3">
              <div>
                <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-[0.2em] font-semibold">
                  NAVEGAÇÃO
                </span>
                <div className="w-8 h-[1px] bg-[#41F20A]/40 mt-1.5 mb-1" />
              </div>

              <nav className="flex flex-col space-y-2.5">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => {
                      if (onNavClick) {
                        onNavClick(e, link.href);
                      } else {
                        e.preventDefault();
                        const targetId = link.href.replace("#", "");
                        const el = document.getElementById(targetId);
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                    className="text-sm font-sans font-medium text-zinc-300 hover:text-[#41F20A] transition-colors duration-200 cursor-pointer w-fit"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>

            {/* Segundo Menu: FORMULÁRIOS */}
            <div className="flex flex-col space-y-3">
              <div>
                <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-[0.2em] font-semibold">
                  FORMULÁRIOS
                </span>
                <div className="w-8 h-[1px] bg-[#41F20A]/40 mt-1.5 mb-1" />
              </div>

              <nav className="flex flex-col space-y-2.5">
                <a
                  href="https://dominus.site/forms/colaborador"
                  className="text-sm font-sans font-medium text-zinc-300 hover:text-[#41F20A] transition-colors duration-200 cursor-pointer w-fit"
                >
                  Quero fazer parte do time
                </a>
                <a
                  href="https://dominus.site/forms/expert"
                  className="text-sm font-sans font-medium text-zinc-300 hover:text-[#41F20A] transition-colors duration-200 cursor-pointer w-fit"
                >
                  Quero ser parceiro
                </a>
              </nav>
            </div>

          </div>

          {/* LADO DIREITO: Redes Sociais */}
          <div className="order-2 md:order-3 flex flex-col space-y-3">
            <div>
              <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-[0.2em] font-semibold">
                SIGA-NOS
              </span>
              <div className="w-8 h-[1px] bg-[#41F20A]/40 mt-1.5 mb-1" />
            </div>

            <div className="flex items-center gap-3 sm:gap-4">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="w-12 h-12 sm:w-[50px] sm:h-[50px] rounded-full border border-zinc-800 hover:border-[#41F20A] bg-zinc-950 hover:bg-[#41F20A]/10 text-zinc-300 hover:text-[#41F20A] flex items-center justify-center transition-all duration-300 shadow-sm hover:shadow-[0_0_15px_rgba(65,242,10,0.35)] focus:outline-none focus:ring-2 focus:ring-[#41F20A]"
                  >
                    <IconComponent size={20} className="transition-transform duration-300 group-hover:scale-110" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* LOGO DA MARCA (No mobile fica após as redes sociais: order-3) */}
          <a 
            href="#faturamento" 
            onClick={(e) => {
              if (onNavClick) {
                onNavClick(e, "#faturamento");
              } else {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            className="order-3 md:order-1 group flex items-center focus:outline-none focus:ring-2 focus:ring-[#41F20A] rounded-lg p-1 transition pt-2 md:pt-0"
            aria-label="Ir para o topo - Dominus"
          >
            <img
              src="https://dominus.site/image/logo-extensa-branca.webp"
              alt="Dominus Logo"
              width={540}
              height={96}
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
              className="h-14 sm:h-18 md:h-[96px] w-auto object-contain brightness-100 group-hover:brightness-110 transition duration-300"
            />
          </a>

        </div>

        {/* BLOCO INFERIOR (Linha de Créditos) */}
        <div className="pt-8 border-t border-zinc-900/90 flex flex-wrap items-center justify-center gap-8 sm:gap-12 md:gap-[72px] text-xs sm:text-sm text-zinc-500 font-sans text-center">
          
          <span className="text-zinc-400 font-medium">By Dominus</span>

          <div className="flex items-center gap-6">
            <a 
              href="#termos" 
              className="underline underline-offset-4 hover:text-zinc-200 transition-colors duration-200"
            >
              Termos
            </a>
            <a 
              href="#privacidade" 
              className="underline underline-offset-4 hover:text-zinc-200 transition-colors duration-200"
            >
              Privacidade
            </a>
          </div>

          <span>© 2026 Todos os direitos reservados.</span>

        </div>

      </div>
    </footer>
  );
}
