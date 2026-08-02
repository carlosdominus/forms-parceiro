import { ArrowDown } from "lucide-react";
import { AnimatedText } from "./ui/AnimatedText";
import { LiquidMetalButton } from "./ui/liquid-metal-button";
import RevenueComparisonCards from "./RevenueComparisonCards";

interface Props {
  onNext: () => void;
}

export default function Dobra1Hero({ onNext }: Props) {
  return (
    <div className="w-full relative pt-2 pb-2 md:pt-4 md:pb-6 text-center z-10 space-y-8 md:space-y-12">
      {/* Hidden eager image element for LCP asset discovery */}
      <img
        src="https://dominus.site/image/bk.webp"
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        decoding="sync"
        className="hidden"
      />
      

      {/* Main Hero Header Title */}
      <div className="space-y-6 max-w-5xl mx-auto pt-6 px-4 text-center">
        <AnimatedText
          as="h1"
          text="Um ambiente onde o básico é escalável e crescer é inevitável."
          highlights={["crescer é inevitável."]}
          immediateVisible={true}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-normal text-white leading-tight max-w-5xl mx-auto"
        />
        <AnimatedText
          as="p"
          text="Conectamos o poder da autoridade à estratégia de marketing de resposta direta."
          immediateVisible={true}
          initialDelayMs={100}
          className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed max-w-4xl mx-auto font-sans font-medium"
        />
      </div>

      {/* Seção de Comparação de Faturamento: Sozinho vs. Com a Dominus */}
      <div className="pt-2">
        <RevenueComparisonCards />
      </div>

      {/* Flow indicator */}
      <div className="pt-2 flex justify-center">
        <LiquidMetalButton
          onClick={onNext}
          label="Conheça Nossa Atuação"
          icon={<ArrowDown size={14} className="text-[#41F20A] animate-bounce" />}
        />
      </div>

    </div>
  );
}
