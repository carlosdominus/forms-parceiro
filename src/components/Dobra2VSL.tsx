import { useEffect, useRef, useState } from "react";
import { AnimatedText } from "./ui/AnimatedText";

export default function Dobra2VSL() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [ondeX, setOndeX] = useState(0);
  const [atuamosX, setAtuamosX] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (sectionRef.current) {
            const rect = sectionRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            const totalDistance = windowHeight + rect.height;
            const currentProgress = (windowHeight - rect.top) / totalDistance;
            const clamped = Math.max(0, Math.min(1, currentProgress));
            
            // Parallax horizontal movement on scroll
            const moveAmount = (clamped - 0.5) * 180;
            setOndeX(moveAmount);
            setAtuamosX(-moveAmount);
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

  // Text content & highlights
  const eyebrowText = "ONDE ATUAMOS";
  const headlineText = "Nosso trabalho é transformar conhecimento em uma marca que gera influência, oportunidades e vendas.";
  const paragraphText = "Criamos estratégias que posicionam especialistas como referência em seus nichos, gerando audiência qualificada, autoridade e um fluxo previsível de clientes sem depender apenas de indicação ou conteúdo viral.";
  const paragraphHighlights = [
    "posicionam especialistas como referência em seus nichos",
    "fluxo previsível de clientes"
  ];

  return (
    <div className="relative text-white w-full" id="dobra2-container">
      
      {/* SECTION: ONDE ATUAMOS with ambient green mesh gradient & smooth vertical spacing */}
      <section
        ref={sectionRef}
        id="onde-atuamos"
        className="relative w-full bg-black min-h-[75vh] flex flex-col justify-center items-center py-12 sm:py-24 md:py-36 px-4 md:px-8 overflow-hidden my-2 md:my-8"
      >
        {/* Style block for slow organic floating ambient glows */}
        <style>{`
          @keyframes floatGlow1 {
            0% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(40px, -30px) scale(1.1); }
            66% { transform: translate(-30px, 35px) scale(0.95); }
            100% { transform: translate(0px, 0px) scale(1); }
          }
          @keyframes floatGlow2 {
            0% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(-35px, 30px) scale(0.9); }
            66% { transform: translate(35px, -35px) scale(1.1); }
            100% { transform: translate(0px, 0px) scale(1); }
          }
          @keyframes floatGlow3 {
            0% { transform: translate(-50%, -50%) scale(1); }
            50% { transform: translate(calc(-50% + 30px), calc(-50% + 20px)) scale(1.1); }
            100% { transform: translate(-50%, -50%) scale(1); }
          }
        `}</style>

        {/* Ambient Moving Green Radial Glow Orbs (Tighter & Very Subtle) */}
        <div 
          className="absolute top-1/3 left-1/4 w-[220px] sm:w-[320px] h-[220px] sm:h-[320px] rounded-full bg-[#41F20A]/[0.04] blur-[70px] pointer-events-none z-0"
          style={{ animation: "floatGlow1 22s ease-in-out infinite" }}
        />
        <div 
          className="absolute bottom-1/3 right-1/4 w-[240px] sm:w-[340px] h-[240px] sm:h-[340px] rounded-full bg-[#41F20A]/[0.03] blur-[80px] pointer-events-none z-0"
          style={{ animation: "floatGlow2 28s ease-in-out infinite" }}
        />
        <div 
          className="absolute top-1/2 left-1/2 w-[280px] sm:w-[400px] h-[180px] sm:h-[260px] rounded-full bg-[#41F20A]/[0.03] blur-[90px] pointer-events-none z-0"
          style={{ animation: "floatGlow3 20s ease-in-out infinite" }}
        />

        {/* Top Smooth Transition Gradient */}
        <div className="absolute top-0 inset-x-0 h-20 sm:h-32 bg-gradient-to-b from-black via-black/80 to-transparent pointer-events-none z-10" />

        {/* Bottom Smooth Transition Gradient */}
        <div className="absolute bottom-0 inset-x-0 h-20 sm:h-32 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none z-10" />

        {/* Mobile Watermark: "ONDE" (left to right) and "ATUAMOS" (right to left) stacked in two lines at top behind eyebrow */}
        <div 
          className="md:hidden absolute top-3 sm:top-6 left-1/2 -translate-x-1/2 font-black font-heading tracking-wider uppercase select-none pointer-events-none z-0 text-center flex flex-col items-center justify-center w-full"
          style={{
            fontSize: "clamp(4.2rem, 16vw, 7.5rem)",
          }}
        >
          {/* Green glow beam directly behind ONDE ATUAMOS */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[150%] bg-gradient-to-r from-[#41F20A]/0 via-[#41F20A]/15 to-[#41F20A]/0 rounded-full blur-[40px] -z-10 pointer-events-none" />
          <span 
            className="relative z-10 text-white/[0.10] drop-shadow-[0_0_15px_rgba(65,242,10,0.25)] leading-[0.85] transition-transform duration-75 ease-out"
            style={{
              transform: `translateX(${ondeX}px)`,
              willChange: "transform",
            }}
          >
            ONDE
          </span>
          <span 
            className="relative z-10 text-white/[0.10] drop-shadow-[0_0_15px_rgba(65,242,10,0.25)] leading-[0.85] transition-transform duration-75 ease-out"
            style={{
              transform: `translateX(${atuamosX}px)`,
              willChange: "transform",
            }}
          >
            ATUAMOS
          </span>
        </div>

        {/* Desktop Watermark 1: "ONDE" top-left */}
        <div 
          className="hidden md:block absolute top-[8%] left-[4%] font-black font-heading tracking-wider uppercase select-none pointer-events-none z-0 leading-none whitespace-nowrap transition-transform duration-75 ease-out"
          style={{
            fontSize: "clamp(8rem, 14vw, 12rem)",
            transform: `translateX(${ondeX}px)`,
            willChange: "transform",
          }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[150%] bg-gradient-to-r from-[#41F20A]/0 via-[#41F20A]/18 to-[#41F20A]/0 rounded-full blur-[60px] -z-10 pointer-events-none" />
          <span className="relative z-10 text-white/[0.12] drop-shadow-[0_0_20px_rgba(65,242,10,0.25)]">
            ONDE
          </span>
        </div>

        {/* Desktop Watermark 2: "ATUAMOS" bottom-right */}
        <div 
          className="hidden md:block absolute bottom-[8%] right-[4%] font-black font-heading tracking-wider uppercase select-none pointer-events-none z-0 leading-none whitespace-nowrap transition-transform duration-75 ease-out"
          style={{
            fontSize: "clamp(8rem, 14vw, 12rem)",
            transform: `translateX(${atuamosX}px)`,
            willChange: "transform",
          }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[150%] bg-gradient-to-r from-[#41F20A]/0 via-[#41F20A]/18 to-[#41F20A]/0 rounded-full blur-[60px] -z-10 pointer-events-none" />
          <span className="relative z-10 text-white/[0.12] drop-shadow-[0_0_20px_rgba(65,242,10,0.25)]">
            ATUAMOS
          </span>
        </div>

        {/* Foreground Content */}
        <div className="relative z-10 max-w-[920px] mx-auto text-center space-y-6 sm:space-y-8 px-4 py-4">
          
          {/* 1. Eyebrow */}
          <div className="text-[#41F20A] text-lg sm:text-2xl md:text-3xl font-extrabold tracking-[0.25em] font-sans drop-shadow-[0_0_15px_rgba(65,242,10,0.4)]">
            <AnimatedText
              text={eyebrowText}
              as="span"
            />
          </div>

          {/* 2. Headline Principal */}
          <AnimatedText
            as="h2"
            text={headlineText}
            className="text-[clamp(1.7rem,4.2vw,3.2rem)] font-bold text-white leading-snug sm:leading-normal tracking-normal drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]"
            initialDelayMs={150}
          />

          {/* 3. Parágrafo com trechos em destaque */}
          <AnimatedText
            as="p"
            text={paragraphText}
            highlights={paragraphHighlights}
            className="text-zinc-200 text-base sm:text-xl md:text-2xl lg:text-3xl font-sans leading-relaxed max-w-4xl mx-auto font-normal sm:font-medium tracking-normal drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]"
            initialDelayMs={300}
          />

        </div>
      </section>

    </div>
  );
}
