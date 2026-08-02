import React, { useState, useEffect, useRef } from "react";

export default function RevenueComparisonCards() {
  const [hoveredCard, setHoveredCard] = useState<1 | 2 | null>(null);
  const [mobileActive1, setMobileActive1] = useState(false);
  const [mobileActive2, setMobileActive2] = useState(false);

  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);

  // Card 1 Data (Sozinho: Stagnant, low ceiling)
  const card1Bars = [
    { label: "M1", defaultHeight: 32, hoverHeight: 38 },
    { label: "M2", defaultHeight: 48, hoverHeight: 28 },
    { label: "M3", defaultHeight: 28, hoverHeight: 45 },
    { label: "M4", defaultHeight: 52, hoverHeight: 32 },
    { label: "M5", defaultHeight: 36, hoverHeight: 50 },
    { label: "M6", defaultHeight: 44, hoverHeight: 34 },
    { label: "M7", defaultHeight: 30, hoverHeight: 42 },
    { label: "M8", defaultHeight: 42, hoverHeight: 36 },
  ];

  // Card 2 Data (Com a Dominus: Scalable 7-figure trajectory)
  const card2Bars = [
    { label: "M1", defaultHeight: 22, hoverHeight: 18 },
    { label: "M2", defaultHeight: 34, hoverHeight: 28 },
    { label: "M3", defaultHeight: 46, hoverHeight: 48 },
    { label: "M4", defaultHeight: 58, hoverHeight: 66 },
    { label: "M5", defaultHeight: 70, hoverHeight: 84 },
    { label: "M6", defaultHeight: 82, hoverHeight: 98 },
    { label: "M7", defaultHeight: 90, hoverHeight: 115 },
    { label: "M8", defaultHeight: 98, hoverHeight: 138 },
  ];

  // Mobile scroll trigger: activates text overlay when scrolled down into card, keeps text visible when further down, reverts only when scrolling back up above threshold
  useEffect(() => {
    if (window.innerWidth >= 768) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (card1Ref.current && card2Ref.current) {
            const vh = window.innerHeight;
            const triggerLineCard1 = vh * 0.65; // Card 1 triggers when scrolled into lower-middle
            const triggerLineCard2 = vh * 0.42; // Card 2 triggers when scrolled into upper-middle (print 6 stage)

            const rect1 = card1Ref.current.getBoundingClientRect();
            const rect2 = card2Ref.current.getBoundingClientRect();

            // Card 1 text activates when scrolled down to Card 1
            if (window.scrollY >= 40 && rect1.top < triggerLineCard1 && rect1.bottom > 0) {
              setMobileActive1(true);
            } else if (rect1.top >= triggerLineCard1) {
              setMobileActive1(false);
            }

            // Card 2 text activates when scrolled down to upper-middle (print 6 stage)
            if (window.scrollY >= 40 && rect2.top < triggerLineCard2 && rect2.bottom > 0) {
              setMobileActive2(true);
            } else if (rect2.top >= triggerLineCard2) {
              setMobileActive2(false);
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isCard1Active = hoveredCard === 1 || mobileActive1;
  const isCard2Active = hoveredCard === 2 || mobileActive2;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-4 space-y-4">
      {/* Comparison Cards Grid */}
      <div className="flex flex-col md:flex-row items-stretch justify-center gap-6 sm:gap-8">
        
        {/* ==================== CARD 1: SOZINHO ==================== */}
        <div
          ref={card1Ref}
          className="group relative w-full md:w-[410px] lg:w-[420px] bg-[#0c0d12] border border-zinc-800/90 hover:border-zinc-700/80 rounded-[2rem] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-300 flex flex-col justify-between cursor-pointer"
          onMouseEnter={() => setHoveredCard(1)}
          onMouseLeave={() => setHoveredCard(null)}
          onClick={() => setHoveredCard(hoveredCard === 1 ? null : 1)}
        >
          {/* Top Visual Chart Area */}
          <div className="relative h-44 sm:h-48 bg-[#07080b] p-4 sm:p-5 flex flex-col justify-between overflow-hidden">
            
            {/* 1. Grid de fundo sutil com máscara radial */}
            <div
              className="absolute inset-0 opacity-25 pointer-events-none"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.25) 1px, transparent 0)`,
                backgroundSize: "18px 18px",
                maskImage: "radial-gradient(ellipse at center, black 30%, transparent 85%)",
                WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 85%)",
              }}
            />

            {/* 2. Gradiente radial de cor (glow neutro) */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(113,113,122,0.12),transparent_70%)] pointer-events-none" />

            {/* 3. Badges de percentual / metrica (centralizado no mobile, esquerda no desktop) */}
            <div
              className={`relative z-10 flex items-center justify-center md:justify-start gap-2 flex-wrap transition-all duration-300 ${
                isCard1Active ? "opacity-0 -translate-y-2 pointer-events-none" : "opacity-100 translate-y-0"
              }`}
            >
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900/90 border border-zinc-700/60 text-zinc-300 text-xs font-mono font-medium shadow-sm backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
                <span>R$ 18k/mês</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900/60 border border-zinc-800 text-zinc-400 text-xs font-mono font-medium backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-500" />
                <span>R$ 22k/mês</span>
              </div>
            </div>

            {/* 4. Barras do Gráfico (Sozinho) */}
            <div className="relative z-10 h-28 sm:h-30 w-full flex items-end justify-between gap-2.5 pt-2 px-2">
              {card1Bars.map((bar, idx) => {
                const heightPercent = isCard1Active ? bar.hoverHeight : bar.defaultHeight;
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                    <div className="w-full bg-zinc-900/40 rounded-t-sm h-full flex items-end overflow-hidden">
                      <div
                        className={`w-full rounded-t-md transition-all duration-500 ${
                          isCard1Active
                            ? "bg-gradient-to-t from-zinc-700 to-zinc-500 shadow-[0_0_8px_rgba(161,161,170,0.3)]"
                            : "bg-gradient-to-t from-zinc-900 via-zinc-800 to-zinc-600"
                        }`}
                        style={{
                          height: `${heightPercent}%`,
                          transitionTimingFunction: "cubic-bezier(0.6, 0.6, 0, 1)",
                        }}
                      />
                    </div>
                    <span className="text-[10px] font-mono text-zinc-600 group-hover:text-zinc-500 transition-colors">
                      {bar.label}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* 5. Painel no Hover (Legenda deslizante) */}
            <div
              className={`absolute inset-x-0 bottom-0 z-20 p-5 bg-gradient-to-t from-[#090a0e] via-[#090a0e]/95 to-transparent flex flex-col justify-end transition-all duration-500 ease-[cubic-bezier(0.6,0.6,0,1)] ${
                isCard1Active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-full pointer-events-none"
              }`}
            >
              <div className="space-y-1">
                <span className="text-[11px] uppercase font-mono tracking-wider text-zinc-400 font-bold block">
                  Faturamento sem estrutura
                </span>
                <p className="text-sm font-sans text-zinc-200 font-medium leading-snug">
                  Sobe e desce, mas não sai do lugar.
                </p>
              </div>
            </div>
          </div>

          {/* Corpo do Card */}
          <div className="p-5 sm:p-6 text-center space-y-1.5 border-t border-zinc-800/80 bg-[#0c0d12] flex-1 flex flex-col items-center justify-start">
            <h3 className="text-lg sm:text-[19px] font-bold font-sans text-white tracking-normal leading-snug text-center w-full">
              Sozinho, o teto chega rápido
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed text-center">
              Sem estrutura de tráfego, oferta e conversão, o faturamento oscila mas não escala.
            </p>
          </div>
        </div>

        {/* ==================== CARD 2: COM A DOMINUS ==================== */}
        <div
          ref={card2Ref}
          className="group relative w-full md:w-[410px] lg:w-[420px] bg-[#0c0d12] border border-[#41F20A]/30 hover:border-[#41F20A]/70 rounded-[2rem] overflow-hidden shadow-[0_10px_40px_rgba(65,242,10,0.12)] transition-all duration-300 flex flex-col justify-between cursor-pointer"
          onMouseEnter={() => setHoveredCard(2)}
          onMouseLeave={() => setHoveredCard(null)}
          onClick={() => setHoveredCard(hoveredCard === 2 ? null : 2)}
        >
          {/* Top Visual Chart Area */}
          <div className="relative h-44 sm:h-48 bg-[#07080b] p-4 sm:p-5 flex flex-col justify-between overflow-hidden">
            
            {/* 1. Grid de fundo sutil com máscara radial */}
            <div
              className="absolute inset-0 opacity-25 pointer-events-none"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, rgba(65,242,10,0.4) 1px, transparent 0)`,
                backgroundSize: "18px 18px",
                maskImage: "radial-gradient(ellipse at center, black 35%, transparent 85%)",
                WebkitMaskImage: "radial-gradient(ellipse at center, black 35%, transparent 85%)",
              }}
            />

            {/* 2. Gradiente radial de cor (Glow vibrante da marca #41F20A) */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_60%,rgba(65,242,10,0.18),transparent_70%)] pointer-events-none" />

            {/* 3. Badges de percentual / metrica (centralizado no mobile, esquerda no desktop) */}
            <div
              className={`relative z-10 flex items-center justify-center md:justify-start gap-2 flex-wrap transition-all duration-300 ${
                isCard2Active ? "opacity-0 -translate-y-2 pointer-events-none" : "opacity-100 translate-y-0"
              }`}
            >
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#41F20A]/15 border border-[#41F20A]/50 text-[#41F20A] text-xs font-mono font-bold shadow-[0_0_15px_rgba(65,242,10,0.3)] backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-[#41F20A] animate-pulse" />
                <span>+180%</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900/90 border border-[#41F20A]/30 text-white text-xs font-mono font-medium backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-[#41F20A]" />
                <span>R$ 1M/mês</span>
              </div>
            </div>

            {/* 4. Barras do Gráfico (Com a Dominus) */}
            <div className="relative z-10 h-28 sm:h-30 w-full flex items-end justify-between gap-2.5 pt-2 px-2">
              {card2Bars.map((bar, idx) => {
                const heightPercent = isCard2Active ? bar.hoverHeight : bar.defaultHeight;
                const isClimaxBar = idx >= card2Bars.length - 2;

                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                    <div className="w-full bg-zinc-900/40 rounded-t-sm h-full flex items-end overflow-hidden">
                      <div
                        className={`w-full rounded-t-md transition-all duration-500 ${
                          isCard2Active
                            ? "bg-gradient-to-t from-[#41F20A] via-[#61f533] to-[#bbfca6] shadow-[0_0_18px_rgba(65,242,10,0.8)]"
                            : isClimaxBar
                            ? "bg-gradient-to-t from-[#41F20A]/50 via-[#41F20A] to-[#80ff54] shadow-[0_0_10px_rgba(65,242,10,0.4)]"
                            : "bg-gradient-to-t from-zinc-800 via-[#41F20A]/40 to-[#41F20A]"
                        }`}
                        style={{
                          height: `${Math.min(heightPercent, 100)}%`,
                          transitionTimingFunction: "cubic-bezier(0.6, 0.6, 0, 1)",
                        }}
                      />
                    </div>
                    <span
                      className={`text-[10px] font-mono transition-colors ${
                        isCard2Active || isClimaxBar ? "text-[#41F20A] font-bold" : "text-zinc-500"
                      }`}
                    >
                      {bar.label}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* 5. Painel no Hover (Legenda deslizante) */}
            <div
              className={`absolute inset-x-0 bottom-0 z-20 p-5 bg-gradient-to-t from-[#090a0e] via-[#090a0e]/95 to-transparent flex flex-col justify-end transition-all duration-500 ease-[cubic-bezier(0.6,0.6,0,1)] ${
                isCard2Active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-full pointer-events-none"
              }`}
            >
              <div className="space-y-1">
                <span className="text-[11px] uppercase font-mono tracking-wider text-[#41F20A] font-extrabold block">
                  Trajetória de faturamento
                </span>
                <p className="text-sm font-sans text-white font-medium leading-snug">
                  Estrutura pensada para escalar pelo menos 7 dígitos por mês.
                </p>
              </div>
            </div>
          </div>

          {/* Corpo do Card */}
          <div className="p-5 sm:p-6 text-center space-y-1.5 border-t border-[#41F20A]/20 bg-[#0c0d12] flex-1 flex flex-col items-center justify-start">
            <h3 className="text-lg sm:text-[19px] font-bold font-sans text-white tracking-normal leading-snug text-center w-full">
              Com estrutura, o crescimento não para
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed text-center">
              Tráfego, oferta, copy e conversão trabalhando juntos rumo à meta de R$ 1 milhão por mês.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
