import React, { useEffect, useRef, useState } from "react";

interface ServiceCardProps {
  key?: React.Key;
  title: string;
  description: string;
  index: number;
  colSpan?: string;
  isVisible: boolean;
  prefersReducedMotion: boolean;
  className?: string;
}

function ServiceCard({
  title,
  description,
  index,
  colSpan = "lg:col-span-1",
  isVisible,
  prefersReducedMotion,
  className = "",
}: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileActive, setIsMobileActive] = useState(false);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  // Mobile scroll trigger: illuminates card when centered in viewport on mobile (< 1024px) with rAF throttling
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileActive(false);
        return;
      }
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (cardRef.current) {
            const rect = cardRef.current.getBoundingClientRect();
            const viewportCenter = window.innerHeight * 0.5;
            const cardCenter = rect.top + rect.height / 2;
            const distanceToCenter = Math.abs(cardCenter - viewportCenter);

            // Activate highlight when the card is in the vertical center focal zone
            if (distanceToCenter < window.innerHeight * 0.28) {
              setIsMobileActive(true);
            } else {
              setIsMobileActive(false);
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || window.innerWidth < 1024) return;
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });

    // Calculate subtle 3D tilt (-3.5 deg to +3.5 deg)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateY = ((x - centerX) / centerX) * 3.5;
    const rotateX = -((y - centerY) / centerY) * 3.5;
    setTilt({ rotateX, rotateY });
  };

  const handleMouseEnter = () => {
    if (prefersReducedMotion || window.innerWidth < 1024) return;
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  const delay = 250 + index * 80;
  const isCardHighlighted = isHovered || isMobileActive;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative group bg-zinc-950/95 border rounded-2xl p-6 sm:p-8 overflow-hidden transition-all duration-300 flex flex-col justify-center ${colSpan} ${className} ${
        isCardHighlighted
          ? "border-[#41F20A]/60 shadow-[0_0_24px_rgba(65,242,10,0.15)]"
          : "border-zinc-800/90 shadow-2xl"
      }`}
      style={{
        transform:
          isVisible || prefersReducedMotion
            ? (tilt.rotateX !== 0 || tilt.rotateY !== 0
                ? `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`
                : "none")
            : "perspective(1000px) translateY(24px)",
        opacity: isVisible || prefersReducedMotion ? 1 : 0,
        filter: isVisible || prefersReducedMotion ? "none" : "blur(4px)",
        transition: prefersReducedMotion
          ? "none"
          : `opacity 0.6s ease-out ${delay}ms, transform 0.4s ease-out, border-color 0.3s ease, box-shadow 0.3s ease, filter 0.6s ease-out ${delay}ms`,
      }}
    >
      {/* Desktop Radial Spotlight Effect following cursor (Hidden on Mobile to preserve 100% text contrast) */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl transition-opacity duration-300 z-0 hidden lg:block"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(450px circle at ${mousePos.x}px ${mousePos.y}px, rgba(65, 242, 10, 0.12), transparent 70%)`,
        }}
      />

      {/* Subtle Top Accent Line */}
      <div
        className="pointer-events-none absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#41F20A] to-transparent transition-opacity duration-300 z-10"
        style={{ opacity: isCardHighlighted ? 1 : 0.25 }}
      />

      {/* Card Content */}
      <div className="relative z-10 space-y-3 sm:space-y-4">
        <h3 className="text-xl sm:text-2xl font-bold font-heading text-[#41F20A] tracking-tight">
          {title}
        </h3>

        <p className="text-sm sm:text-base text-zinc-300 font-sans leading-relaxed font-normal">
          {description}
        </p>
      </div>
    </div>
  );
}

export default function DobraSobreNos() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check user preference for reduced motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setPrefersReducedMotion(true);
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (sectionRef.current) observer.unobserve(sectionRef.current);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Bloco 1 Text (A dor)
  const block1Text =
    "A maioria das autoridades do mercado possui um conhecimento extraordinário, mas peca na falta de infraestrutura, escala comercial e previsibilidade de receita.";

  // Bloco 2 Text Parts (A virada)
  const block2Words = [
    { word: "A", type: "normal" },
    { word: "Dominus", type: "normal" },
    { word: "nasce", type: "normal" },
    { word: "como", type: "normal" },
    { word: "o", type: "normal" },
    { word: "motor", type: "green" },
    { word: "estratégico", type: "green" },
    { word: "e", type: "green" },
    { word: "operacional", type: "green" },
    { word: "que", type: "normal" },
    { word: "assume", type: "normal" },
    { word: "a", type: "normal" },
    { word: "complexidade", type: "normal" },
    { word: "dos", type: "normal" },
    { word: "bastidores", type: "normal" },
    { word: "para", type: "normal" },
    { word: "que", type: "normal" },
    { word: "você", type: "normal" },
    { word: "foque", type: "normal" },
    { word: "apenas", type: "normal" },
    { word: "no", type: "normal" },
    { word: "seu", type: "normal" },
    { word: "genius", type: "genius" },
    { word: "zone.", type: "genius" },
  ];

  const block1WordsList = block1Text.split(" ");

  return (
    <section
      ref={sectionRef}
      id="sobre-nos"
      className="w-full bg-[#0a0a0a] py-[clamp(80px,10vh,140px)] px-4 sm:px-6 md:px-12 relative overflow-hidden border-t border-zinc-900/80 scroll-mt-20"
    >
      {/* Subtle Static Ambient Background Glow (GPU promoted & scaled) */}
      <div 
        className="absolute top-1/3 left-1/4 -translate-y-1/2 w-[150px] h-[150px] scale-[3.33] bg-[#41F20A]/5 rounded-full blur-[35px] pointer-events-none" 
        style={{ willChange: "transform", transform: "translate3d(0, -50%, 0)" }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* UNIFIED 3-COLUMN BENTO GRID - PERFECT VERTICAL & HORIZONTAL ALIGNMENT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          
          {/* ROW 1 LEFT (2 Cols) - Texto Principal "Sobre Nós" */}
          <div className="lg:col-span-2 flex flex-col justify-center space-y-6 sm:space-y-8 p-1 sm:p-2">
            
            {/* Eyebrow */}
            <div className="text-[#41F20A] text-sm sm:text-base md:text-lg font-extrabold tracking-[0.25em] font-heading drop-shadow-[0_0_15px_rgba(65,242,10,0.4)] uppercase">
              SOBRE NÓS
            </div>

            {/* Bloco 1 (A Dor) */}
            <p className="text-zinc-300 text-lg sm:text-xl md:text-2xl leading-relaxed font-normal font-sans">
              {block1WordsList.map((word, idx) => {
                const delay = idx * 35;
                return (
                  <span
                    key={idx}
                    className="inline-block mr-[0.25em]"
                    style={{
                      opacity: isVisible || prefersReducedMotion ? 1 : 0,
                      transform:
                        isVisible || prefersReducedMotion ? "none" : "translateY(16px)",
                      filter: isVisible || prefersReducedMotion ? "none" : "blur(4px)",
                      transition: prefersReducedMotion
                        ? "none"
                        : `opacity 0.6s ease-out ${delay}ms, transform 0.6s ease-out ${delay}ms, filter 0.6s ease-out ${delay}ms`,
                    }}
                  >
                    {word}
                  </span>
                );
              })}
            </p>

            {/* Bloco 2 (A Virada) */}
            <p className="text-white text-xl sm:text-2xl md:text-3xl lg:text-[2rem] leading-snug font-semibold font-sans pt-2">
              {block2Words.map((item, idx) => {
                const delay = (block1WordsList.length + idx) * 35;
                const isGreen = item.type === "green";
                const isGenius = item.type === "genius";

                if (isGenius) {
                  return (
                    <span
                      key={idx}
                      className="inline-block mr-[0.25em] italic text-[#41F20A] font-extrabold underline decoration-[#41F20A]/70 underline-offset-8 drop-shadow-[0_0_16px_rgba(65,242,10,0.5)] font-heading"
                      style={{
                        opacity: isVisible || prefersReducedMotion ? 1 : 0,
                        transform:
                          isVisible || prefersReducedMotion ? "none" : "translateY(16px)",
                        filter: isVisible || prefersReducedMotion ? "none" : "blur(4px)",
                        transition: prefersReducedMotion
                          ? "none"
                          : `opacity 0.6s ease-out ${delay}ms, transform 0.6s ease-out ${delay}ms, filter 0.6s ease-out ${delay}ms`,
                      }}
                    >
                      {item.word}
                    </span>
                  );
                }

                if (isGreen) {
                  return (
                    <span
                      key={idx}
                      className="inline-block mr-[0.25em] text-[#41F20A] font-bold drop-shadow-[0_0_12px_rgba(65,242,10,0.4)]"
                      style={{
                        opacity: isVisible || prefersReducedMotion ? 1 : 0,
                        transform:
                          isVisible || prefersReducedMotion ? "none" : "translateY(16px)",
                        filter: isVisible || prefersReducedMotion ? "none" : "blur(4px)",
                        transition: prefersReducedMotion
                          ? "none"
                          : `opacity 0.6s ease-out ${delay}ms, transform 0.6s ease-out ${delay}ms, filter 0.6s ease-out ${delay}ms`,
                      }}
                    >
                      {item.word}
                    </span>
                  );
                }

                return (
                  <span
                    key={idx}
                    className="inline-block mr-[0.25em]"
                    style={{
                      opacity: isVisible || prefersReducedMotion ? 1 : 0,
                      transform:
                        isVisible || prefersReducedMotion ? "none" : "translateY(16px)",
                      filter: isVisible || prefersReducedMotion ? "none" : "blur(4px)",
                      transition: prefersReducedMotion
                        ? "none"
                        : `opacity 0.6s ease-out ${delay}ms, transform 0.6s ease-out ${delay}ms, filter 0.6s ease-out ${delay}ms`,
                    }}
                  >
                    {item.word}
                  </span>
                );
              })}
            </p>

          </div>

          {/* ROW 1 RIGHT (1 Col) - CARD ESTRUTURA DE FUNIL */}
          <ServiceCard
            index={0}
            title="Estrutura de Funil"
            description="Página bonita não vende sozinha. Arquitetura de funil pensada de ponta a ponta — páginas, sequência, checkout — pra cada etapa empurrar a próxima."
            colSpan="lg:col-span-1"
            isVisible={isVisible}
            prefersReducedMotion={prefersReducedMotion}
            className="h-full min-h-[220px]"
          />

          {/* ROW 2 LEFT (2 Cols) - TRÁFEGO & AQUISIÇÃO */}
          <ServiceCard
            index={1}
            title="Tráfego & Aquisição"
            description="Não escalamos por sorte. Gestão de tráfego pago com decisão orientada a dado, testando ângulo, público e criativo até achar o que realmente converte."
            colSpan="lg:col-span-2"
            isVisible={isVisible}
            prefersReducedMotion={prefersReducedMotion}
          />

          {/* ROW 2 RIGHT (1 Col) - EDIÇÃO & CRIATIVOS */}
          <ServiceCard
            index={2}
            title="Edição & Criativos"
            description="Criativo não é estética, é performance. Edição pensada pra reter atenção nos primeiros segundos e conduzir até a conversão."
            colSpan="lg:col-span-1"
            isVisible={isVisible}
            prefersReducedMotion={prefersReducedMotion}
          />

          {/* ROW 3 LEFT (2 Cols) - COPY QUE VENDE */}
          <ServiceCard
            index={3}
            title="Copy que Vende"
            description="Cada palavra tem uma função: gerar clique, gerar confiança ou gerar venda. Copy estruturada pra cada etapa da jornada, do anúncio ao pós-venda."
            colSpan="lg:col-span-2"
            isVisible={isVisible}
            prefersReducedMotion={prefersReducedMotion}
          />

          {/* ROW 3 RIGHT (1 Col) - GESTÃO DE ATENDIMENTO */}
          <ServiceCard
            index={4}
            title="Gestão de Atendimento"
            description="Lead esfriando é receita perdida. Atendimento estruturado, com script, follow-up e conversão trabalhada em cada ponto de contato."
            colSpan="lg:col-span-1"
            isVisible={isVisible}
            prefersReducedMotion={prefersReducedMotion}
          />

        </div>

      </div>
    </section>
  );
}

