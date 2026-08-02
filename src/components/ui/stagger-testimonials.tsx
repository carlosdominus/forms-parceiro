import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const SQRT_5000 = Math.sqrt(5000);

export interface TeamMember {
  tempId: number;
  testimonial: string;
  by: string;
  role: string;
  imgSrc: string;
}

const teamMembers: TeamMember[] = [
  {
    tempId: 0,
    testimonial: "CEO do Grupo Dominus e estrategista. Lidera a união perfeita de dados sob tráfego frio e psicologia humana para gerar faturamentos exponenciais.",
    by: "Gilberto Ortiz",
    role: "Copy e Gestão",
    imgSrc: "https://dominus.site/slides/mariana/img/gil.png"
  },
  {
    tempId: 1,
    testimonial: "Coprodutor e Gestor tático focado em escala massiva em canais pagos. Responsável por mais de 7 Dígitos investidos com alta conversão.",
    by: "Felipe Martins",
    role: "Tráfego",
    imgSrc: "https://dominus.site/slides/mariana/img/felipe.jpg"
  },
  {
    tempId: 2,
    testimonial: "Estrategista em otimização de campanhas, desenhando caminhos de distribuição inteligente para alimentar continuamente nossos funis.",
    by: "Guilherme",
    role: "Tráfego",
    imgSrc: "https://dominus.site/slides/mariana/img/guilherme.webp"
  },
  {
    tempId: 3,
    testimonial: "Editor de vídeo sênior especialista em edição de Reels e conteúdos verticais dinâmicos de alta retenção, criados para prender a atenção e viralizar.",
    by: "Vitor",
    role: "Edição de Reels",
    imgSrc: "https://dominus.site/slides/mariana/img/vitor.webp"
  },
  {
    tempId: 4,
    testimonial: "Copywriter obstinado em quebras de padrão e construção de mensagens impossíveis de serem ignoradas pelo público-alvo.",
    by: "Stony",
    role: "Copywriter",
    imgSrc: "https://dominus.site/slides/mariana/img/stony.webp"
  },
  {
    tempId: 5,
    testimonial: "Especialista em edição de VSLs de alta conversão, unindo ritmo dinâmico, sound design cirúrgico e quebras de padrão constantes para prender o lead.",
    by: "Arthur",
    role: "Edição de VSL",
    imgSrc: "https://dominus.site/slides/mariana/img/arthur.webp"
  },
  {
    tempId: 6,
    testimonial: "Editor focado na estruturação e montagem técnica de VSLs de alta conversão e criativos em escala, aplicando efeitos visuais estratégicos.",
    by: "Luciano",
    role: "Edição de VSL",
    imgSrc: "https://dominus.site/slides/mariana/img/luciano.webp"
  },
  {
    tempId: 7,
    testimonial: "Especialista responsável pelo design e estrutura de páginas de alta velocidade e conversão, além de coordenar todo o suporte estratégico e automações de recuperação inteligente de vendas ativas.",
    by: "Carlos",
    role: "Páginas, Suporte e Recuperação",
    imgSrc: "https://dominus.site/slides/mariana/img/gabriel.webp"
  }
];

interface TestimonialCardProps {
  position: number;
  testimonial: TeamMember;
  handleMove: (steps: number) => void;
  cardSize: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ 
  position, 
  testimonial, 
  handleMove, 
  cardSize 
}) => {
  const isCenter = position === 0;

  return (
    <div
      onClick={() => handleMove(position)}
      className={cn(
        "absolute left-1/2 top-1/2 cursor-pointer border-2 p-6 transition-all duration-500 ease-in-out select-none rounded-[24px]",
        isCenter 
          ? "z-20 bg-[#41F20A] text-black border-[#41F20A] font-semibold" 
          : "z-0 bg-zinc-950 text-zinc-300 border-zinc-900 hover:border-[#41F20A]/40"
      )}
      style={{
        width: cardSize,
        height: cardSize + 25,
        transform: `
          translate(-50%, -50%) 
          translateX(${(cardSize / 1.55) * position}px)
          translateY(${isCenter ? -70 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 3 : -3}deg)
        `,
        boxShadow: isCenter ? "0px 10px 30px rgba(65, 242, 10, 0.22)" : "0px 5px 15px rgba(0,0,0,0.6)"
      }}
    >
      
      {/* Profile Image with role */}
      <div className="flex items-center gap-3.5 mb-4 border-b border-black/5 pb-3">
        <img
          src={testimonial.imgSrc}
          alt={testimonial.by}
          className="h-14 w-12 bg-zinc-900 object-cover object-top rounded-lg border border-white/10 shrink-0"
          style={{
            boxShadow: isCenter ? "3px 3px 0px #0a0a0a" : "3px 3px 0px #27272a"
          }}
        />
        <div>
          <h4 className={cn(
            "text-base font-extrabold pb-0.5 tracking-tight leading-tight",
            isCenter ? "text-black" : "text-white"
          )}>
            {testimonial.by}
          </h4>
          <span className={cn(
            "text-[9px] uppercase tracking-widest font-mono font-black",
            isCenter ? "text-black/75" : "text-[#41F20A]"
          )}>
            {testimonial.role}
          </span>
        </div>
      </div>

      <div className="relative pt-2">
        <p className={cn(
          "text-xs leading-relaxed font-medium md:text-[13px]",
          isCenter ? "text-black" : "text-zinc-400"
        )}>
          "{testimonial.testimonial}"
        </p>
      </div>

      <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
        <span className={cn(
          "text-[8px] font-mono uppercase tracking-widest",
          isCenter ? "text-black/60" : "text-zinc-600"
        )}>
          EQUIPE DE EXPERTS
        </span>
      </div>
    </div>
  );
};

export const StaggerTestimonials: React.FC = () => {
  const [cardSize, setCardSize] = useState(340);
  const [testimonialsList, setTestimonialsList] = useState<TeamMember[]>(teamMembers);

  const handleMove = (steps: number) => {
    const newList = [...testimonialsList];
    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = newList.shift();
        if (!item) return;
        newList.push({ ...item, tempId: Math.random() });
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = newList.pop();
        if (!item) return;
        newList.unshift({ ...item, tempId: Math.random() });
      }
    }
    setTestimonialsList(newList);
  };

  useEffect(() => {
    const updateSize = () => {
      const { matches } = window.matchMedia("(min-width: 640px)");
      setCardSize(matches ? 340 : 270);
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height: 530 }}
    >
      {/* Side shading gradients to fade background cards at screen edge */}
      <div className="absolute inset-y-0 left-0 w-8 sm:w-28 bg-gradient-to-r from-black via-black/65 to-transparent pointer-events-none z-10" />
      <div className="absolute inset-y-0 right-0 w-8 sm:w-28 bg-gradient-to-l from-black via-black/65 to-transparent pointer-events-none z-10" />

      {/* Testimonial container with grid alignment */}
      <div className="absolute inset-x-0 h-full top-6 flex items-center justify-center pointer-events-none">
        <div className="relative w-full h-full max-w-4xl pointer-events-auto">
          {testimonialsList.map((testimonial, index) => {
            const position = testimonialsList.length % 2
              ? index - (testimonialsList.length + 1) / 2
              : index - testimonialsList.length / 2;
            
            // Render up to 5 cards (-2 to 2) to go all the way to the page margins
            const absPos = Math.abs(position);
            if (absPos > 2.2) return null; 

            return (
              <TestimonialCard
                key={testimonial.tempId}
                testimonial={testimonial}
                handleMove={handleMove}
                position={position}
                cardSize={cardSize}
              />
            );
          })}
        </div>
      </div>

      {/* Slide Navigation Buttons */}
      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-3 z-30">
        <button
          onClick={() => handleMove(-1)}
          className={cn(
            "flex h-11 w-11 items-center justify-center text-xl transition-all cursor-pointer rounded-xl",
            "bg-zinc-950/90 border border-zinc-800 text-zinc-400 hover:text-[#41F20A] hover:border-[#41F20A]/40 active:scale-95"
          )}
          aria-label="Previous testimonial"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={() => handleMove(1)}
          className={cn(
            "flex h-11 w-11 items-center justify-center text-xl transition-all cursor-pointer rounded-xl",
            "bg-zinc-950/90 border border-zinc-800 text-zinc-400 hover:text-[#41F20A] hover:border-[#41F20A]/40 active:scale-95"
          )}
          aria-label="Next testimonial"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};
