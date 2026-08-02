import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Instagram, Sparkles, ArrowRight } from "lucide-react";

interface Props {
  onNext: () => void;
  onPrev?: () => void;
}

export default function Dobra4Equipe({ onNext }: Props) {
  const [currentSlideMari, setCurrentSlideMari] = useState(0);
  const [currentSlideBruno, setCurrentSlideBruno] = useState(0);

  const mariSlides = [
    "https://dominus.site/slides/mariana/img/110k.webp",
    "https://dominus.site/slides/mariana/img/4k.webp",
    "https://dominus.site/slides/mariana/img/29.9k.webp",
  ];

  const brunoSlides = [
    "https://dominus.site/slides/mariana/img/exemplo1.png",
  ];

  const nextMari = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSlideMari((prev) => (prev + 1) % mariSlides.length);
  };

  const prevMari = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSlideMari((prev) => (prev - 1 + mariSlides.length) % mariSlides.length);
  };

  const nextBruno = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSlideBruno((prev) => (prev + 1) % brunoSlides.length);
  };

  const prevBruno = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSlideBruno((prev) => (prev - 1 + brunoSlides.length) % brunoSlides.length);
  };

  return (
    <div 
      className="relative text-white py-12 md:py-20 overflow-hidden" 
      id="dobra4-container"
    >
      {/* Decorative background lights - Enhanced brand glow (GPU promoted & scaled) */}
      <div 
        className="absolute top-[20%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] scale-[4] bg-[#41F20A]/20 rounded-full blur-[40px] pointer-events-none animate-pulse duration-[8000ms]" 
        style={{ willChange: "transform", transform: "translate(-50%, -50%) translateZ(0)" }}
      />
      <div 
        className="absolute bottom-[15%] right-[10%] w-[150px] h-[150px] scale-[3.33] bg-[#41F20A]/8 rounded-full blur-[35px] pointer-events-none" 
        style={{ willChange: "transform", transform: "translateZ(0)" }}
      />

      {/* Category Header Badge */}
      <div className="relative z-10 space-y-4 max-w-4xl mx-auto text-center mb-10 md:mb-16 px-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#41F20A]/10 border border-[#41F20A]/35 text-[#41F20A] text-[10px] font-bold tracking-widest rounded-full uppercase font-mono">
          <Sparkles size={11} className="animate-pulse" />
          Estudo de Caso Prático
        </div>
        <h2 className="text-3xl md:text-5.5xl font-extrabold tracking-tight leading-none text-white">
          Exemplos na prática
        </h2>
      </div>

      {/* Main Grid: Mariana on the Left, Bruno on the Right */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto px-4 items-stretch">
        
        {/* Left Column: Mariana Contin */}
        <div className="flex flex-col space-y-6">
          
          {/* Header section with Instagram Link */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1">
            <h3 className="text-xl md:text-2xl lg:text-[26px] font-extrabold text-white tracking-wide leading-[1.1] min-w-0 md:min-w-[340px]">
              Os melhores<br />
              conteúdos do<br />
              seu perfil.
            </h3>
            <a 
              href="https://www.instagram.com/maricontinonutri/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] uppercase font-mono tracking-wider font-bold text-[#41F20A] hover:text-white transition flex items-center gap-1.5 bg-[#41F20A]/10 px-3 py-1 rounded-full border border-[#41F20A]/20 shrink-0 self-start sm:self-auto"
            >
              <Instagram size={11} />
              <span>@maricontinonutri</span>
            </a>
          </div>

          {/* Mariana's Full Profile Image (mari.png) - Clickable to Instagram */}
          <a 
            href="https://www.instagram.com/maricontinonutri/"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full select-none"
          >
            <img 
              src="https://dominus.site/slides/mariana/img/mari.png" 
              alt="Mariana Contin Profile"
              referrerPolicy="no-referrer"
              className="w-full h-auto object-contain transition-transform duration-500 hover:scale-[1.01]"
            />
          </a>

          {/* Mariana's Content Carousel */}
          <div className="h-[400px] sm:h-[460px] md:h-[510px] flex flex-col justify-between rounded-2xl bg-black/40 border border-white/10 p-3 relative group">
            
            {/* Main Slide Image */}
            <a 
              href="https://www.instagram.com/maricontinonutri/"
              target="_blank"
              rel="noopener noreferrer"
              className="relative block w-full h-[calc(100%-46px)] overflow-hidden rounded-xl bg-zinc-950/40 border border-white/5"
            >
              <img 
                src={mariSlides[currentSlideMari]}
                alt={`Conteúdo Mariana ${currentSlideMari + 1}`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain block mx-auto transition-transform duration-300 group-hover:scale-[1.01]"
              />
              
              <div className="absolute top-3 right-3 bg-black/85 backdrop-blur-md text-[8.5px] font-mono text-[#41F20A] uppercase border border-[#41F20A]/25 rounded-lg px-2.5 py-1 tracking-wider font-bold shadow-lg">
                Ver no Instagram ↗
              </div>
            </a>

            {/* Slider Controls */}
            <div className="flex items-center justify-between h-[36px] mt-2 px-1">
              <button 
                onClick={prevMari}
                className="p-1.5 rounded-xl bg-zinc-900 border border-white/10 text-white hover:bg-zinc-800 hover:text-[#41F20A] transition active:scale-95 cursor-pointer"
                title="Slide Anterior"
              >
                <ChevronLeft size={16} />
              </button>

              {/* Dot Indicators */}
              <div className="flex items-center gap-1.5">
                {mariSlides.map((_, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setCurrentSlideMari(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      currentSlideMari === idx ? "w-6 bg-[#41F20A]" : "w-1.5 bg-zinc-700 hover:bg-zinc-600"
                    }`}
                  />
                ))}
              </div>

              <button 
                onClick={nextMari}
                className="p-1.5 rounded-xl bg-zinc-900 border border-white/10 text-white hover:bg-zinc-800 hover:text-[#41F20A] transition active:scale-95 cursor-pointer"
                title="Próximo Slide"
              >
                <ChevronRight size={16} />
              </button>
            </div>

          </div>

        </div>

        {/* Right Column: Bruno Goytacaz */}
        <div className="flex flex-col space-y-6">
          
          {/* Header section with Instagram Link */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1">
            <h3 className="text-xl md:text-2xl lg:text-[26px] font-extrabold text-white tracking-wide leading-[1.1] min-w-0 md:min-w-[340px]">
              <span className="whitespace-nowrap">Porque grandes</span><br />
              <span className="whitespace-nowrap">perfis sempre</span><br />
              <span className="whitespace-nowrap">viralizam?</span>
            </h3>
            <a 
              href="https://www.instagram.com/onutridasestrelas/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] uppercase font-mono tracking-wider font-bold text-[#41F20A] hover:text-white transition flex items-center gap-1.5 bg-[#41F20A]/10 px-3 py-1 rounded-full border border-[#41F20A]/20 shrink-0 self-start sm:self-auto"
            >
              <Instagram size={11} />
              <span>@onutridasestrelas</span>
            </a>
          </div>

          {/* Bruno's Full Profile Image (bruno.png) - Clickable to Instagram */}
          <a 
            href="https://www.instagram.com/onutridasestrelas/"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full select-none"
          >
            <img 
              src="https://dominus.site/slides/mariana/img/bruno.png" 
              alt="Bruno Goytacaz Profile"
              referrerPolicy="no-referrer"
              className="w-full h-auto object-contain transition-transform duration-500 hover:scale-[1.01]"
            />
          </a>

          {/* Bruno's Content Carousel */}
          <div className="h-[400px] sm:h-[460px] md:h-[510px] flex flex-col justify-between rounded-2xl bg-black/40 border border-white/10 p-3 relative group">
            
            {/* Main Slide Image */}
            <a 
              href="https://www.instagram.com/onutridasestrelas/"
              target="_blank"
              rel="noopener noreferrer"
              className="relative block w-full h-[calc(100%-46px)] overflow-hidden rounded-xl bg-zinc-950/40 border border-white/5"
            >
              <img 
                src={brunoSlides[currentSlideBruno]}
                alt={`Conteúdo Bruno ${currentSlideBruno + 1}`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain block mx-auto transition-transform duration-300 group-hover:scale-[1.01]"
              />
              
              <div className="absolute top-3 right-3 bg-black/85 backdrop-blur-md text-[8.5px] font-mono text-[#41F20A] uppercase border border-[#41F20A]/25 rounded-lg px-2.5 py-1 tracking-wider font-bold shadow-lg">
                Ver no Instagram ↗
              </div>
            </a>

            {/* Slider Controls */}
            <div className="flex items-center justify-between h-[36px] mt-2 px-1">
              <button 
                onClick={prevBruno}
                className="p-1.5 rounded-xl bg-zinc-900 border border-white/10 text-white hover:bg-zinc-800 hover:text-[#41F20A] transition active:scale-95 cursor-pointer"
                title="Slide Anterior"
              >
                <ChevronLeft size={16} />
              </button>

              {/* Dot Indicators */}
              <div className="flex items-center gap-1.5">
                {brunoSlides.map((_, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setCurrentSlideBruno(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      currentSlideBruno === idx ? "w-6 bg-[#41F20A]" : "w-1.5 bg-zinc-750 hover:bg-zinc-650"
                    }`}
                  />
                ))}
              </div>

              <button 
                onClick={nextBruno}
                className="p-1.5 rounded-xl bg-zinc-900 border border-[#41F20A]/30 text-white hover:bg-zinc-850 hover:text-[#41F20A] transition active:scale-95 cursor-pointer"
                title="Próximo Slide"
              >
                <ChevronRight size={16} />
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* Primary Transition Flow Interactive Button */}
      <div className="relative z-10 pt-12 md:pt-16 text-center">
        <button 
          onClick={onNext}
          className="inline-flex items-center gap-2.5 px-8 py-3 bg-[#41F20A] hover:bg-[#34c408] text-black font-extrabold text-xs tracking-wider uppercase rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-[#41F20A]/20 scale-100 hover:scale-[1.02] active:scale-[0.98] select-none cursor-pointer"
        >
          <span>Avançar</span>
          <ArrowRight size={13} className="text-black" />
        </button>
      </div>

    </div>
  );
}
