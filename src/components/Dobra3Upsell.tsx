import React from "react";
import { Percent, ArrowRight } from "lucide-react";

interface Props {
  onNext: () => void;
  onPrev: () => void;
}

export default function Dobra3Upsell({ onNext, onPrev }: Props) {
  return (
    <div className="relative text-white py-12 md:py-20" id="upsell-container">
      
      {/* Decorative background glow */}
      <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-[#41F20A]/5 rounded-full blur-[110px] pointer-events-none" />

      {/* Header Section */}
      <div className="space-y-4 max-w-3xl text-left mb-12 md:mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-[#41F20A]/20 text-[#41F20A] text-[10px] font-bold tracking-widest rounded-full uppercase font-mono">
          <Percent size={11} className="text-[#41F20A]" />
          LTV & Maximização do Carrinho
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-none text-white">
          Upsell pós-compra imediato
        </h2>
        <p className="font-sans text-zinc-400 text-sm md:text-md leading-relaxed max-w-xl">
          Logo após a compra, no momento em que o cliente está com o cartão na mão e a dopamina no pico, fazemos uma oferta adicional estratégica de um clique.
        </p>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start relative z-10">
        
        {/* Left Side: Standard Flow */}
        <div className="space-y-4">
          <h3 className="text-md font-extrabold text-red-400 tracking-wide border-l-2 border-red-500 pl-3">
            É isso que acontece com seu cliente hoje
          </h3>
          <div className="rounded-2xl overflow-hidden border border-white/5 bg-zinc-950/40 p-2 shadow-xl">
            <img 
              src="https://dominus.site/slides/mariana/img/upsell-mari_converted.webp" 
              alt="Fluxo de Compra Atual"
              referrerPolicy="no-referrer"
              className="w-full h-auto object-contain rounded-xl"
            />
          </div>
        </div>

        {/* Right Side: Pro Flow */}
        <div className="space-y-4">
          <h3 className="text-md font-extrabold text-[#41F20A] tracking-wide border-l-2 border-[#41F20A] pl-3">
            Isso é o que acontece com os grandes players:
          </h3>
          <div className="rounded-2xl overflow-hidden border border-[#41F20A]/15 bg-zinc-950/40 p-2 shadow-xl shadow-[#41F20A]/5">
            <img 
              src="https://dominus.site/slides/mariana/img/upsell-cariani_converted.webp" 
              alt="Fluxo de Compra Cariani"
              referrerPolicy="no-referrer"
              className="w-full h-auto object-contain rounded-xl"
            />
          </div>
        </div>

      </div>

      {/* Controls */}
      <div className="relative z-10 pt-12 md:pt-16 flex flex-col sm:flex-row items-center justify-center gap-4">
        <button 
          onClick={onPrev}
          className="px-6 py-2.5 bg-black hover:bg-zinc-900 text-zinc-400 hover:text-white border border-white/10 hover:border-white/20 text-xs font-bold uppercase tracking-wider rounded-full transition active:scale-95 cursor-pointer"
        >
          Voltar para VSL
        </button>
        <button 
          onClick={onNext}
          className="inline-flex items-center gap-2 px-8 py-3 bg-[#41F20A] hover:bg-[#34c408] text-black font-extrabold text-xs tracking-wider uppercase rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-[#41F20A]/20 scale-100 hover:scale-[1.02] active:scale-[0.98] select-none cursor-pointer"
        >
          <span>Análise de Perfis</span>
          <ArrowRight size={13} className="text-black" />
        </button>
      </div>

    </div>
  );
}
