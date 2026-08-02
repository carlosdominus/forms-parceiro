import React from "react";
import { ShieldCheck, ArrowRight, Sparkles } from "lucide-react";
import { StaggerTestimonials } from "./ui/stagger-testimonials";
import { AnimatedText } from "./ui/AnimatedText";
import { LiquidMetalButton } from "./ui/liquid-metal-button";

interface Props {
  onNext?: () => void;
  onPrev?: () => void;
}

export default function Dobra5Oferta({ onNext, onPrev }: Props) {
  return (
    <div className="relative text-white py-12 md:py-20" id="oferta-container">
      
      {/* Background lights */}
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-[#41F20A]/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Header section with very clean copywriting */}
      <div className="space-y-4 max-w-6xl mx-auto text-left mb-12 md:mb-14 px-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-[#41F20A]/20 text-[#41F20A] text-[10px] font-bold tracking-widest rounded-full uppercase font-mono">
          <ShieldCheck size={11} />
          Parceria e Escopo Inclusos
        </div>
        <AnimatedText
          as="h2"
          text="A equipe ao seu lado"
          className="text-3xl md:text-5xl font-extrabold tracking-tight leading-none text-white"
        />
        <AnimatedText
          as="p"
          text="Nós financiamos e assessoramos toda a estrutura técnica, copy e edição. Você grava o conteúdo que domina, e nosso time cuida da escala operacional e distribuição de anúncios."
          className="font-sans text-zinc-400 text-sm md:text-base max-w-xl leading-relaxed"
          initialDelayMs={150}
        />
      </div>

      {/* Interactive Staggered Testimonials showing the crew */}
      <div className="relative z-10 w-full overflow-hidden">
        <StaggerTestimonials />
      </div>

      {/* Brief extra details about our high-tech setup */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mt-12 px-4 text-left">
        <div className="bg-zinc-950/40 border border-white/[0.03] p-5 rounded-2xl flex gap-4 items-start">
          <div className="p-2.5 h-10 w-10 rounded-lg bg-[#41F20A]/5 border border-[#41F20A]/15 flex items-center justify-center shrink-0">
            <Sparkles className="text-[#41F20A]" size={16} />
          </div>
          <div className="space-y-1.5">
            <h4 className="text-xs font-extrabold text-white tracking-wide">
              Virtual office integrado
            </h4>
            <p className="text-[11px] text-zinc-400 leading-normal">
              Equipe síncrona trabalhando inside nosso QG virtual no Gather. De segunda a sexta, monitorando seu funil de vendas em tempo real.
            </p>
          </div>
        </div>
        <div className="bg-zinc-950/40 border border-white/[0.03] p-5 rounded-2xl flex gap-4 items-start">
          <div className="p-2.5 h-10 w-10 rounded-lg bg-[#41F20A]/5 border border-[#41F20A]/15 flex items-center justify-center shrink-0">
            <ShieldCheck className="text-[#41F20A]" size={16} />
          </div>
          <div className="space-y-1.5">
            <h4 className="text-xs font-extrabold text-white tracking-wide">
              Custo zero de assinaturas
            </h4>
            <p className="text-[11px] text-zinc-400 leading-normal">
              Nossa agência cobre 100% de ferramentas Premium de IA, domínios, servidores, plataformas de vídeo e automação digital.
            </p>
          </div>
        </div>
      </div>

      {/* Transition navigation controls */}
      {(onPrev || onNext) && (
        <div className="relative z-10 pt-12 md:pt-16 flex flex-col sm:flex-row items-center justify-center gap-4">
          {onPrev && (
            <button 
              onClick={onPrev}
              className="px-6 py-2.5 bg-black hover:bg-zinc-900 text-zinc-400 hover:text-white border border-white/10 hover:border-white/20 text-xs font-bold uppercase tracking-wider rounded-full transition active:scale-95 cursor-pointer"
            >
              Voltar
            </button>
          )}
          {onNext && (
            <LiquidMetalButton
              onClick={onNext}
              label="Avançar"
              icon={<ArrowRight size={14} className="text-[#41F20A]" />}
            />
          )}
        </div>
      )}

    </div>
  );
}
