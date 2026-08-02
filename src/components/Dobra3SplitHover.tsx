import { useState, useEffect, useRef } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { AnimatedText } from "./ui/AnimatedText";
import { LiquidMetalButton } from "./ui/liquid-metal-button";

interface Dobra3SplitHoverProps {
  onOpenFormTime?: () => void;
  onOpenFormParceiro?: () => void;
}

export default function Dobra3SplitHover({ onOpenFormTime, onOpenFormParceiro }: Dobra3SplitHoverProps) {
  const [hoveredPanel, setHoveredPanel] = useState<"left" | "right" | null>(null);
  const [activeMobilePanel, setActiveMobilePanel] = useState<"left" | "right" | null>(null);
  const [isNearViewport, setIsNearViewport] = useState(false);
  const [isMobile, setIsMobile] = useState(() => typeof window !== "undefined" && window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sectionRef = useRef<HTMLElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);

  // Lazy load card background images on demand when section approaches viewport
  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsNearViewport(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" }
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Mobile scroll trigger: activates image zoom and border glow when card center enters middle focal zone of viewport
  useEffect(() => {
    if (window.innerWidth >= 768) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (leftPanelRef.current && rightPanelRef.current) {
            const vh = window.innerHeight;
            const viewportCenter = vh * 0.50;

            const rectLeft = leftPanelRef.current.getBoundingClientRect();
            const rectRight = rightPanelRef.current.getBoundingClientRect();

            const leftCenter = rectLeft.top + rectLeft.height / 2;
            const rightCenter = rectRight.top + rectRight.height / 2;

            const distLeft = Math.abs(leftCenter - viewportCenter);
            const distRight = Math.abs(rightCenter - viewportCenter);

            // Focal threshold radius: panel center must be within 28% vh of viewport center
            const focalRadius = vh * 0.28;

            if (distLeft < focalRadius && distLeft <= distRight) {
              setActiveMobilePanel("left");
            } else if (distRight < focalRadius && distRight < distLeft) {
              setActiveMobilePanel("right");
            } else {
              setActiveMobilePanel(null);
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

  return (
    <section 
      ref={sectionRef}
      className="relative w-full bg-black overflow-hidden border-y border-white/10 scroll-mt-20"
      onMouseLeave={() => setHoveredPanel(null)}
      id="trabalhe-conosco"
    >
      {/* Container: Stacked on mobile (<768px), Flex Row full-width on Desktop (>=768px), Full screen height */}
      <div className="w-full min-h-[100dvh] flex flex-col md:flex-row h-auto md:h-[100dvh] transition-[flex,opacity] duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]">
        
        {/* ================= LEFT PANEL (Recrutamento / Colaboradores) ================= */}
        <div 
          ref={leftPanelRef}
          onMouseEnter={() => setHoveredPanel("left")}
          onClick={() => {
            if (window.innerWidth >= 768) {
              window.scrollTo({ top: 2142, behavior: "smooth" });
            } else {
              const el = document.getElementById("trabalhe-conosco");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }
          }}
          style={{
            flex: isMobile ? undefined : (hoveredPanel === "left" ? "85 85 0%" : hoveredPanel === "right" ? "15 15 0%" : "50 50 0%")
          }}
          className={`
            relative w-full md:w-auto aspect-[1080/1440] md:aspect-auto md:h-full overflow-hidden cursor-pointer
            transition-[flex,opacity,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
            border-b md:border-b-0 md:border-r border-white/10 group flex flex-col justify-center items-center px-6 sm:px-10 lg:px-16 text-center py-12 sm:py-16 md:py-20
            ${
              activeMobilePanel === "left" 
                ? "shadow-[inset_0_0_50px_rgba(65,242,10,0.25)] border-[#41F20A]/40 md:border-white/10" 
                : "opacity-90"
            }
          `}
        >
          {/* Background Image with Scroll-Driven Mobile Zoom Effect */}
          <div 
            className={`
              absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105
              ${activeMobilePanel === "left" ? "scale-115 md:scale-100" : "scale-100"}
            `}
            style={{
              backgroundImage: isNearViewport 
                ? (isMobile ? "url('https://dominus.site/image/card1-mobile.webp')" : "url('https://dominus.site/image/card1_converted.webp')")
                : "none"
            }}
          />
          <div 
            className={`
              absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent group-hover:via-black/20 group-hover:from-black/75 transition-opacity duration-500
              ${activeMobilePanel === "left" ? "via-black/25 bg-black/10" : "via-black/45 bg-black/30"}
            `} 
          />

          {/* Panel Content Wrapper */}
          <div className={`
            relative z-10 max-w-xl mx-auto space-y-6 transition-all duration-500 ease-out
            ${
              hoveredPanel === "right" 
                ? "md:opacity-0 md:pointer-events-none md:translate-y-6 md:scale-95" 
                : "md:opacity-100 md:pointer-events-auto md:translate-y-0 md:scale-100"
            }
          `}>
            {/* Title (H2) */}
            <AnimatedText
              as="h2"
              text="Uma equipe onde sua carreira cresce como juros compostos"
              highlights={["juros compostos"]}
              className="font-heading font-extrabold text-white tracking-tight leading-tight text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
            />

            {/* Subtitle */}
            <AnimatedText
              as="p"
              text="Chega de gastar seu talento no mercado de ofertas descartáveis. Na Dominus, você atua nos bastidores de grandes especialistas e autoridades, desenvolvendo estratégias sólidas, escala de alto padrão e um repertório profissional que fica para a sua vida."
              className="text-zinc-300 font-sans leading-relaxed max-w-md mx-auto text-sm sm:text-base md:text-lg"
              initialDelayMs={200}
            />

            {/* CTA Button */}
            <div className="pt-2 flex justify-center">
              <LiquidMetalButton
                href="https://dominus.site/forms/colaborador"
                onClick={(e) => {
                  e?.stopPropagation();
                }}
                label="Quero fazer parte do time"
                icon={<ArrowRight size={14} className="text-[#41F20A]" />}
              />
            </div>
          </div>
        </div>

        {/* ================= RIGHT PANEL (Parceria com Autoridades de Nicho) ================= */}
        <div 
          ref={rightPanelRef}
          onMouseEnter={() => setHoveredPanel("right")}
          onClick={() => {
            window.location.href = "https://dominus.site/forms/expert";
          }}
          style={{
            flex: isMobile ? undefined : (hoveredPanel === "right" ? "85 85 0%" : hoveredPanel === "left" ? "15 15 0%" : "50 50 0%")
          }}
          className={`
            relative w-full md:w-auto aspect-[1080/1440] md:aspect-auto md:h-full overflow-hidden cursor-pointer
            transition-[flex,opacity,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
            group flex flex-col justify-center items-center px-6 sm:px-10 lg:px-16 text-center py-12 sm:py-16 md:py-20
            ${
              activeMobilePanel === "right" 
                ? "shadow-[inset_0_0_50px_rgba(65,242,10,0.25)] border-[#41F20A]/40" 
                : "opacity-90"
            }
          `}
        >
          {/* Background Image with Scroll-Driven Mobile Zoom Effect */}
          <div 
            className={`
              absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105
              ${activeMobilePanel === "right" ? "scale-115 md:scale-100" : "scale-100"}
            `}
            style={{
              backgroundImage: isNearViewport 
                ? (isMobile ? "url('https://dominus.site/image/card2-mobile.webp')" : "url('https://dominus.site/image/card2_converted.webp')")
                : "none"
            }}
          />
          <div 
            className={`
              absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent group-hover:via-black/20 group-hover:from-black/75 transition-opacity duration-500
              ${activeMobilePanel === "right" ? "via-black/25 bg-black/10" : "via-black/45 bg-black/30"}
            `}
          />

          {/* Panel Content Wrapper */}
          <div className={`
            relative z-10 max-w-xl mx-auto space-y-6 transition-all duration-500 ease-out
            ${
              hoveredPanel === "left" 
                ? "md:opacity-0 md:pointer-events-none md:translate-y-6 md:scale-95" 
                : "md:opacity-100 md:pointer-events-auto md:translate-y-0 md:scale-100"
            }
          `}>
            {/* Title (H2) */}
            <AnimatedText
              as="h2"
              text="Domine o seu mercado e multiplique seus resultados"
              highlights={["multiplique seus resultados"]}
              className="font-heading font-extrabold text-white tracking-tight leading-tight text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
            />

            {/* Subtitle */}
            <AnimatedText
              as="p"
              text="Tenha uma equipe completa de bastidores cuidando do seu posicionamento, tráfego, vendas e escala enquanto você foca naquilo em que é impecável."
              className="text-zinc-300 font-sans leading-relaxed max-w-md mx-auto text-sm sm:text-base md:text-lg"
              initialDelayMs={200}
            />

            {/* CTA Button */}
            <div className="pt-2 flex justify-center">
              <LiquidMetalButton
                href="https://dominus.site/forms/expert"
                onClick={(e) => {
                  e?.stopPropagation();
                }}
                label="Quero ser parceiro"
                icon={<ArrowRight size={14} className="text-[#41F20A]" />}
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
