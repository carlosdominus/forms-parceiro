import React, { useState } from "react";
import { Coins, ShieldCheck, Check, HelpCircle } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";

interface Props {
  onPrev: () => void;
}

export default function Dobra6Pitch({ onPrev }: Props) {
  // 1. Core States for the Simulator
  const [faturamento, setFaturamento] = useState<number>(1000000);
  const [trafego, setTrafego] = useState<number>(500000);
  const [equipe, setEquipe] = useState<number>(40000); // R$ 40k
  const [imposto, setImposto] = useState<number>(6); // % DEFAULT 6%

  // Selected scenario: "cenario1" | "cenario2" | "personalizado"
  const [selectedScenario, setSelectedScenario] = useState<string>("cenario1");

  // Mode Type: "faturamento" (Expert receives % of Faturamento) | "lucro" (Expert receives % of Lucro)
  const [modelType, setModelType] = useState<"faturamento" | "lucro">("lucro");

  // Expert percent on Faturamento (Default 15%)
  const [expertPercentFaturamento, setExpertPercentFaturamento] = useState<number>(15);

  // Profit Split Type: "2" (50% / 50%) | "custom"
  const [partnerDivision, setPartnerDivision] = useState<string>("2");
  // Expert percent on profit (Default 50% depending on division or custom)
  const [expertPercentLucro, setExpertPercentLucro] = useState<number>(50);

  // Selected active platform for fees calculations
  const [selectedPlatform, setSelectedPlatform] = useState<"kiwify" | "eduzz" | "hotmart">("kiwify");

  // 2. Scenario Updater Callback
  const handleScenarioChange = (scenario: string) => {
    setSelectedScenario(scenario);
    if (scenario === "cenario1") {
      setFaturamento(1000000);
      setTrafego(500000);
      setEquipe(40000);
      setImposto(6);
    } else if (scenario === "cenario2") {
      setFaturamento(1000000);
      setTrafego(700000);
      setEquipe(50000);
      setImposto(6);
    }
  };

  // Slider change triggers "Personalizado"
  const handleFaturamentoChange = (val: number) => {
    setFaturamento(val);
    setSelectedScenario("personalizado");
  };

  const handleTrafegoChange = (val: number) => {
    setTrafego(val);
    setSelectedScenario("personalizado");
  };

  const handleEquipeChange = (val: number) => {
    setEquipe(val);
    setSelectedScenario("personalizado");
  };

  const handleImpostoChange = (val: number) => {
    setImposto(val);
    setSelectedScenario("personalizado");
  };

  // 3. Platform Fee Formula Calculations
  // Let's assume an average ticket of R$ 197 to find approximation for unit transactions
  const ticketAverage = 197;
  const salesUnits = Math.ceil(faturamento / ticketAverage);

  // Hotmart: 6-digits rate: 8.9% + R$ 1.00 | original: 9.9% + R$ 1.00
  const isSixDigits = faturamento >= 100000;
  const hotmartRate = isSixDigits ? 0.089 : 0.099;
  const hotmartFee = (faturamento * hotmartRate) + (salesUnits * 1.00);
  const hotmartNet = Math.max(0, faturamento - hotmartFee);

  // Eduzz: 4.90% + R$ 2.49
  const eduzzFee = (faturamento * 0.0490) + (salesUnits * 2.49);
  const eduzzNet = Math.max(0, faturamento - eduzzFee);

  // Kiwify: 8.99% + R$ 2.49
  const kiwifyFee = (faturamento * 0.0899) + (salesUnits * 2.49);
  const kiwifyNet = Math.max(0, faturamento - kiwifyFee);

  // Choose fee based on selected platform
  let activePlatformFee = kiwifyFee;
  if (selectedPlatform === "hotmart") activePlatformFee = hotmartFee;
  if (selectedPlatform === "eduzz") activePlatformFee = eduzzFee;

  // Impostos
  const impostoValue = faturamento * (imposto / 100);

  // Net Profit before Partnership Split
  const netProfitTotal = Math.max(
    0,
    faturamento - trafego - equipe - impostoValue - activePlatformFee
  );

  // Expert Shares
  const expertShareFaturamento = faturamento * (expertPercentFaturamento / 100);
  
  let currentExpertLucroPercent = expertPercentLucro;
  if (partnerDivision === "2") currentExpertLucroPercent = 50;

  const expertShareLucro = netProfitTotal * (currentExpertLucroPercent / 100);

  const finalExpertEarnings = modelType === "lucro" ? expertShareLucro : expertShareFaturamento;

  return (
    <div className="relative text-white py-12 md:py-20 animate-fade-in" id="proposta-container">
      
      {/* Decorative background glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#41F20A]/5 rounded-full blur-[130px] pointer-events-none" />

      {/* Header section - Responsive text sizes to prevent overflow, restricted description to exactly 1 line */}
      <div className="space-y-3.5 max-w-4xl mx-auto text-center mb-10 md:mb-14 px-4 select-none">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#41F20A]/10 border border-[#41F20A]/20 text-[#41F20A] text-[10px] md:text-xs font-bold tracking-widest rounded-full font-sans">
          <Coins size={12} />
          Provisão financeira coprodução
        </div>
        
        {/* Title optimized to occupy max 2 lines easily on desktop/mobile */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-tight text-white max-w-2xl mx-auto">
          Simulador técnico de ganhos
        </h2>

        {/* Subtitle explicitly designed to remain compact on 1 single line on large screens and tidy everywhere */}
        <p className="font-sans text-zinc-400 text-xs sm:text-sm tracking-wide block truncate max-w-3xl mx-auto pt-0.5 opacity-90">
          Arraste as alças para calcular o incremento imediato de receita que nossa coprodução trará:
        </p>
      </div>

      {/* Core Widget Canvas */}
      <div className="max-w-7xl mx-auto px-4 relative z-10 w-full space-y-8">
        
        {/* Parent Glass Board - Beautiful frosted styling resembling high-contrast glass glaze */}
        <div className="bg-white/[0.04] backdrop-blur-[24px] border border-white/10 p-5 md:p-8 rounded-[32px] shadow-[0_24px_60px_rgba(0,0,0,0.4)] space-y-8">
          
          {/* ==================== 1. CHAVES (TOP ROW) ==================== */}
          <div className="bg-white/[0.03] p-4 sm:p-5 rounded-2xl border border-white/5 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-center">
              
              {/* Selector A: Cenário de Negócio */}
              <div className="space-y-1.5">
                <label className="text-[10px] text-zinc-300 font-sans tracking-widest font-black uppercase flex items-center gap-1.5 select-none">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#41F20A] animate-pulse" />
                  1. Cenário de Operação
                </label>
                <div className="grid grid-cols-3 gap-1.5 bg-black/50 p-1.5 rounded-xl border border-white/5">
                  <button
                    onClick={() => handleScenarioChange("cenario1")}
                    className={`py-2 px-1 text-center rounded-lg text-[9px] font-sans font-black tracking-wider uppercase transition cursor-pointer ${
                      selectedScenario === "cenario1"
                        ? "bg-white text-black shadow-md"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    Cenário 1
                  </button>
                  <button
                    onClick={() => handleScenarioChange("cenario2")}
                    className={`py-2 px-1 text-center rounded-lg text-[9px] font-sans font-black tracking-wider uppercase transition cursor-pointer ${
                      selectedScenario === "cenario2"
                        ? "bg-white text-black shadow-md"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    Cenário 2
                  </button>
                  <button
                    onClick={() => setSelectedScenario("personalizado")}
                    className={`py-2 px-1 text-center rounded-lg text-[9px] font-sans font-black tracking-wider uppercase transition cursor-pointer ${
                      selectedScenario === "personalizado"
                        ? "bg-white text-black shadow-md"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    Manual ⚙️
                  </button>
                </div>
              </div>

              {/* Selector B: Recebimento do Expert (Faturamento vs Lucro) */}
              <div className="space-y-1.5">
                <label className="text-[10px] text-zinc-300 font-sans tracking-widest font-black uppercase flex items-center gap-1.5 select-none">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#41F20A]" />
                  2. Base de Distribuição
                </label>
                <div className="grid grid-cols-2 gap-1.5 bg-black/50 p-1.5 rounded-xl border border-white/5">
                  <button
                    onClick={() => setModelType("faturamento")}
                    className={`py-2 px-1 text-center rounded-lg text-[9px] font-sans font-black tracking-wider uppercase transition cursor-pointer ${
                      modelType === "faturamento"
                        ? "bg-white text-black shadow-md"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    % de Faturamento
                  </button>
                  <button
                    onClick={() => setModelType("lucro")}
                    className={`py-2 px-1 text-center rounded-lg text-[9px] font-sans font-black tracking-wider uppercase transition cursor-pointer ${
                      modelType === "lucro"
                        ? "bg-white text-black shadow-md"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    % de Lucro Real 💡
                  </button>
                </div>
              </div>

              {/* Selector C: Status details */}
              <div className="space-y-1 bg-white/[0.04] p-3 rounded-xl border border-white/5 select-none md:col-span-2 lg:col-span-1">
                <div className="text-[10px] text-zinc-400 font-sans uppercase font-extrabold tracking-wider leading-none">
                  Status de Rentabilidade:
                </div>
                <div className="text-[#41F20A] text-xs font-black font-sans uppercase tracking-tight py-0.5">
                  {selectedScenario === "cenario1" && "Alta Eficiência (Margem 45.4%)"}
                  {selectedScenario === "cenario2" && "Escala Agressiva (Margem 24.4%)"}
                  {selectedScenario === "personalizado" && "Simulação Manual Livre"}
                </div>
                <p className="text-[9px] text-zinc-400 font-sans">
                  {modelType === "lucro" 
                    ? "O recebido é líquido, após abater todos os custos operacionais do projeto." 
                    : "Comissão garantida calculada diretamente sobre o faturamento de vendas brute."}
                </p>
              </div>

            </div>
          </div>


          {/* ==================== 2. SLIDERS (DYNAMIC CONTROLS) ==================== */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 bg-white/[0.02] p-5 sm:p-6 rounded-2xl border border-white/5">
            
            {/* Slider 1: Faturamento Bruto */}
            <div className="space-y-2">
              <label className="text-xs text-zinc-300 font-sans uppercase flex justify-between tracking-wider font-extrabold select-none pb-0.5">
                <span className="flex items-center gap-1.5">Faturamento Bruto</span>
                <span className="text-[#41F20A] text-sm md:text-base font-black font-sans">
                  R$ <span className="font-sans font-semibold">{faturamento.toLocaleString("pt-BR")}</span>
                </span>
              </label>
              <input
                type="range"
                min="50000"
                max="2500000"
                step="25000"
                value={faturamento}
                onChange={(e) => handleFaturamentoChange(Number(e.target.value))}
                className="w-full h-[5px] bg-black/65 rounded-lg appearance-none cursor-pointer accent-[#41F20A] focus:outline-none"
              />
              <div className="flex justify-between text-[9px] text-zinc-500 font-sans uppercase font-extrabold leading-none select-none">
                <span>R$ <span className="font-sans font-semibold">50k</span></span>
                <span>R$ <span className="font-sans font-semibold">1.25M</span></span>
                <span>R$ <span className="font-sans font-semibold">2.50M</span></span>
              </div>
            </div>

            {/* Slider 2: Investimento em Tráfego */}
            <div className="space-y-2">
              <label className="text-xs text-zinc-300 font-sans uppercase flex justify-between tracking-wider font-extrabold select-none pb-0.5">
                <span>Tráfego Pago (Ad Spend)</span>
                <span className="text-[#41F20A] text-sm md:text-base font-black font-sans">
                  R$ <span className="font-sans font-semibold">{trafego.toLocaleString("pt-BR")}</span>
                </span>
              </label>
              <input
                type="range"
                min="0"
                max="1500000"
                step="25000"
                value={trafego}
                onChange={(e) => handleTrafegoChange(Number(e.target.value))}
                className="w-full h-[5px] bg-black/65 rounded-lg appearance-none cursor-pointer accent-[#41F20A] focus:outline-none"
              />
              <div className="flex justify-between text-[9px] text-zinc-500 font-sans uppercase font-extrabold leading-none select-none">
                <span>R$ <span className="font-sans font-semibold">0</span></span>
                <span>R$ <span className="font-sans font-semibold">750k</span></span>
                <span>R$ <span className="font-sans font-semibold">1.5M</span></span>
              </div>
            </div>

            {/* Slider 3: Equipe + Ferramentas */}
            <div className="space-y-2">
              <label className="text-xs text-zinc-300 font-sans uppercase flex justify-between tracking-wider font-extrabold select-none pb-0.5">
                <span>Equipe + Ferramentas</span>
                <span className="text-[#41F20A] text-sm md:text-base font-black font-sans">
                  R$ <span className="font-sans font-semibold">{equipe.toLocaleString("pt-BR")}</span>
                </span>
              </label>
              <input
                type="range"
                min="0"
                max="200000"
                step="5000"
                value={equipe}
                onChange={(e) => handleEquipeChange(Number(e.target.value))}
                className="w-full h-[5px] bg-black/65 rounded-lg appearance-none cursor-pointer accent-[#41F20A] focus:outline-none"
              />
              <div className="flex justify-between text-[9px] text-zinc-500 font-sans uppercase font-extrabold leading-none select-none">
                <span>R$ <span className="font-sans font-semibold">0</span></span>
                <span>R$ <span className="font-sans font-semibold">100k</span></span>
                <span>R$ <span className="font-sans font-semibold">200k</span></span>
              </div>
            </div>

            {/* Slider 4: Imposto % */}
            <div className="space-y-2">
              <label className="text-xs text-zinc-300 font-sans uppercase flex justify-between tracking-wider font-extrabold select-none pb-0.5">
                <span>Imposto da Emissão (Nota Fiscal)</span>
                <span className="text-[#41F20A] text-sm md:text-base font-black font-sans">
                  <span className="font-sans font-semibold">{imposto}</span>%
                </span>
              </label>
              <input
                type="range"
                min="0"
                max="15"
                step="1"
                value={imposto}
                onChange={(e) => handleImpostoChange(Number(e.target.value))}
                className="w-full h-[5px] bg-black/65 rounded-lg appearance-none cursor-pointer accent-[#41F20A] focus:outline-none"
              />
              <div className="flex justify-between text-[9px] text-zinc-500 font-sans uppercase font-extrabold leading-none select-none">
                <span><span className="font-sans font-semibold">0</span>% (Isento)</span>
                <span><span className="font-sans font-semibold">6</span>% (Simples Padrão)</span>
                <span><span className="font-sans font-semibold">15</span>%</span>
              </div>
            </div>

            {/* DYNAMIC SECONDARY SLIDERS BASED ON THE CORE CALC MODE */}
            <div className="md:col-span-2 pt-4 border-t border-white/5">
              {modelType === "faturamento" ? (
                // Commission Percent Setup
                <div className="space-y-2">
                  <label className="text-xs text-zinc-300 font-sans uppercase flex justify-between tracking-wider font-extrabold select-none pb-0.5">
                    <span>% de comissão pactuada para o Expert s/ Faturamento</span>
                    <span className="text-[#41F20A] text-sm md:text-base font-black font-sans">
                      <span className="font-sans font-semibold">{expertPercentFaturamento}</span>% (Recebimento Bruto)
                    </span>
                  </label>
                  <input
                    type="range"
                    min="5"
                    max="40"
                    step="1"
                    value={expertPercentFaturamento}
                    onChange={(e) => setExpertPercentFaturamento(Number(e.target.value))}
                    className="w-full h-[5px] bg-black/65 rounded-lg appearance-none cursor-pointer accent-[#41F20A] focus:outline-none"
                  />
                  <div className="flex justify-between text-[9px] text-zinc-500 font-sans uppercase font-extrabold leading-none select-none">
                    <span>Mínimo 5%</span>
                    <span>Padrão Coprodução 15%</span>
                    <span>Máximo 40%</span>
                  </div>
                </div>
              ) : (
                // Profit Distribution Division
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 select-none">
                    <label className="text-xs text-zinc-300 font-sans uppercase tracking-wider font-extrabold">
                      Configuração da Divisão societária s/ lucro:
                    </label>
                    
                    {/* Partner Selector */}
                    <div className="inline-flex bg-black/50 p-1 border border-white/10 rounded-full select-none">
                      <button
                        onClick={() => {
                          setPartnerDivision("2");
                          setExpertPercentLucro(50);
                        }}
                        className={`text-[9.5px] font-sans font-extrabold uppercase py-1.5 px-3.5 rounded-full tracking-wider transition cursor-pointer ${
                          partnerDivision === "2"
                            ? "bg-white text-black font-black"
                            : "text-zinc-400 hover:text-white"
                        }`}
                      >
                        2 Sócios (50/50)
                      </button>
                      <button
                        onClick={() => setPartnerDivision("custom")}
                        className={`text-[9.5px] font-sans font-extrabold uppercase py-1.5 px-3.5 rounded-full tracking-wider transition cursor-pointer ${
                          partnerDivision === "custom"
                            ? "bg-white text-black font-black"
                            : "text-zinc-400 hover:text-white"
                        }`}
                      >
                        Personalizar %
                      </button>
                    </div>
                  </div>

                  {partnerDivision === "custom" && (
                    <div className="space-y-2 mt-2">
                      <div className="flex justify-between text-xs text-zinc-400 font-sans">
                        <span>Define o repasse fixo do Expert:</span>
                        <span className="text-[#41F20A] font-bold font-sans"><span className="font-sans font-semibold">{expertPercentLucro}</span>%</span>
                      </div>
                      <input
                        type="range"
                        min="10"
                        max="100"
                        step="5"
                        value={expertPercentLucro}
                        onChange={(e) => setExpertPercentLucro(Number(e.target.value))}
                        className="w-full h-[5px] bg-black/65 rounded-lg appearance-none cursor-pointer accent-[#41F20A]"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>

          </div>


          {/* ==================== 3. COMPARATIVO PLATAFORMAS (PLACED ABOVE GENERAL SUMMARY) ==================== */}
          <div className="pt-6 border-t border-white/5 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 select-none">
              <div>
                <h3 className="text-base font-sans font-extrabold uppercase tracking-wider text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#41F20A] inline-block" />
                  Comparativo de Plataformas de Vendas
                </h3>
                <p className="text-xs text-zinc-400 font-sans mt-0.5">
                  Projeção de deduções operacionais prontas para o seu faturamento atual.
                  <span className="text-[#41F20A] font-semibold"> Clique nas caixas para simular nesta plataforma.</span>
                </p>
              </div>
              <div className="bg-[#41F20A]/10 border border-[#41F20A]/20 text-[#41F20A] text-[10px] px-3 py-1 rounded-full font-extrabold uppercase tracking-widest font-sans shrink-0 self-start sm:self-center">
                Taxas Ativas
              </div>
            </div>

            {/* Apple style liquid frosted cards with premium glass look & original colors */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
              
              {/* Hotmart Card - FROSTED APPLE WIDGET DESIGN WITH ORIGINAL BRAND LOGO */}
              <button 
                onClick={() => {
                  setSelectedPlatform("hotmart");
                }}
                className={`w-full text-left bg-white/[0.22] backdrop-blur-[30px] p-6 rounded-[28px] border transition-all duration-300 hover:scale-[1.03] hover:shadow-xl text-white flex flex-col justify-between space-y-5 cursor-pointer select-none ${
                  selectedPlatform === "hotmart"
                    ? "border-amber-400 ring-3 ring-amber-400/40 shadow-[0_0_35px_rgba(245,158,11,0.25)] scale-[1.02] bg-white/[0.28]"
                    : "border-white/20 hover:border-white/35 shadow-[0_12px_36px_rgba(0,0,0,0.15)]"
                }`}
              >
                <div className="flex justify-between items-center pb-3 border-b border-white/15 w-full">
                  <div className="h-6 w-24 flex items-center justify-start bg-white/70 p-1 rounded-md">
                    <img 
                      src="https://upload.wikimedia.org/wikipedia/commons/1/16/Hotmart_Logo.svg" 
                      alt="Hotmart" 
                      referrerPolicy="no-referrer"
                      className="max-h-full max-w-full object-contain" 
                    />
                  </div>
                  <div className="flex items-center gap-1.5">
                    {selectedPlatform === "hotmart" && (
                      <span className="p-0.5 bg-amber-500 text-white rounded-full"><Check size={8} strokeWidth={4} /></span>
                    )}
                    <span className={`text-[9.5px] tracking-wider uppercase px-2 py-0.5 rounded-full font-black font-sans bg-amber-500/10 text-amber-300 border border-amber-500/25`}>
                      {isSixDigits ? "8.9% Coprod" : "Padrão 9.9%"}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-2.5 w-full font-sans">
                  <div className="flex justify-between text-xs text-zinc-300">
                    <span>Taxa de Tabela:</span>
                    <span className="text-white font-black">{(isSixDigits ? "8,9% + R$ 1,00" : "9,9% + R$ 1,00")}</span>
                  </div>
                  <div className="flex justify-between text-xs text-zinc-300">
                    <span>Taxas Deduzidas:</span>
                    <span className="text-red-400 font-black">- R$ <span className="font-sans font-semibold">{hotmartFee.toLocaleString("pt-BR", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span></span>
                  </div>
                  <div className="pt-2.5 border-t border-white/10 flex justify-between text-xs items-center w-full font-sans">
                    <span className="text-zinc-200 font-bold">Líquido Recebido:</span>
                    <span className="text-[#41F20A] font-black text-base lg:text-lg">R$ <span className="font-sans font-semibold">{hotmartNet.toLocaleString("pt-BR", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span></span>
                  </div>
                </div>
              </button>

              {/* Eduzz Card - FROSTED APPLE WIDGET DESIGN WITH ORIGINAL BRAND LOGO */}
              <button 
                onClick={() => {
                  setSelectedPlatform("eduzz");
                }}
                className={`w-full text-left bg-white/[0.22] backdrop-blur-[30px] p-6 rounded-[28px] border transition-all duration-300 hover:scale-[1.03] hover:shadow-xl text-white flex flex-col justify-between space-y-5 cursor-pointer select-none ${
                  selectedPlatform === "eduzz"
                    ? "border-[#41F20A] ring-3 ring-[#41F20A]/40 shadow-[0_0_35px_rgba(65,242,10,0.25)] scale-[1.02] bg-white/[0.28]"
                    : "border-white/20 hover:border-white/35 shadow-[0_12px_36px_rgba(0,0,0,0.15)]"
                }`}
              >
                <div className="flex justify-between items-center pb-3 border-b border-white/15 w-full">
                  <div className="h-6 w-24 flex items-center justify-start bg-white/70 p-1 rounded-md">
                    <img 
                      src="https://ajuda.eduzz.com/hubfs/EDUZZ.LOGO.1.png" 
                      alt="Eduzz" 
                      referrerPolicy="no-referrer"
                      className="max-h-full max-w-full object-contain" 
                    />
                  </div>
                  <div className="flex items-center gap-1.5">
                    {selectedPlatform === "eduzz" && (
                      <span className="p-0.5 bg-[#41F20A] text-black rounded-full"><Check size={8} strokeWidth={4} /></span>
                    )}
                    <span className="bg-[#41F20A]/15 text-[#41F20A] text-[9.5px] border border-[#41F20A]/30 tracking-wider uppercase px-2 py-0.5 rounded-full font-black font-sans">
                      Taxa: 4.90%
                    </span>
                  </div>
                </div>
                
                <div className="space-y-2.5 w-full font-sans">
                  <div className="flex justify-between text-xs text-zinc-300">
                    <span>Taxa de Tabela:</span>
                    <span className="text-white font-black">4,9% + R$ 2,49</span>
                  </div>
                  <div className="flex justify-between text-xs text-zinc-300">
                    <span>Taxas Deduzidas:</span>
                    <span className="text-red-400 font-black">- R$ <span className="font-sans font-semibold">{eduzzFee.toLocaleString("pt-BR", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span></span>
                  </div>
                  <div className="pt-2.5 border-t border-white/10 flex justify-between text-xs items-center w-full font-sans">
                    <span className="text-zinc-200 font-bold">Líquido Recebido:</span>
                    <span className="text-[#41F20A] font-black text-base lg:text-lg">R$ <span className="font-sans font-semibold">{eduzzNet.toLocaleString("pt-BR", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span></span>
                  </div>
                </div>
              </button>

              {/* Kiwify Card - FROSTED APPLE WIDGET DESIGN WITH ORIGINAL BRAND LOGO */}
              <button 
                onClick={() => {
                  setSelectedPlatform("kiwify");
                }}
                className={`w-full text-left bg-white/[0.22] backdrop-blur-[30px] p-6 rounded-[28px] border transition-all duration-300 hover:scale-[1.03] hover:shadow-xl text-white flex flex-col justify-between space-y-5 cursor-pointer select-none ${
                  selectedPlatform === "kiwify"
                    ? "border-purple-400 ring-3 ring-purple-400/40 shadow-[0_0_35px_rgba(168,85,247,0.25)] scale-[1.02] bg-white/[0.28]"
                    : "border-white/20 hover:border-white/35 shadow-[0_12px_36px_rgba(0,0,0,0.15)]"
                }`}
              >
                <div className="flex justify-between items-center pb-3 border-b border-white/15 w-full">
                  <div className="h-6 w-24 flex items-center justify-start bg-white/70 p-1 rounded-md">
                    <img 
                      src="https://upload.wikimedia.org/wikipedia/commons/e/ed/Kiwify_logo_horizontal.svg" 
                      alt="Kiwify" 
                      referrerPolicy="no-referrer"
                      className="max-h-full max-w-full object-contain" 
                    />
                  </div>
                  <div className="flex items-center gap-1.5">
                    {selectedPlatform === "kiwify" && (
                      <span className="p-0.5 bg-purple-500 text-white rounded-full"><Check size={8} strokeWidth={4} /></span>
                    )}
                    <span className="bg-purple-500/15 text-purple-300 border border-purple-500/30 text-[9.5px] tracking-wider uppercase px-2 py-0.5 rounded-full font-black font-sans">
                      Padrão 8.99%
                    </span>
                  </div>
                </div>
                
                <div className="space-y-2.5 w-full font-sans">
                  <div className="flex justify-between text-xs text-zinc-300">
                    <span>Taxa de Tabela:</span>
                    <span className="text-white font-black">8,99% + R$ 2,49</span>
                  </div>
                  <div className="flex justify-between text-xs text-zinc-300">
                    <span>Taxas Deduzidas:</span>
                    <span className="text-red-400 font-black font-semibold">- R$ <span className="font-sans font-semibold">{kiwifyFee.toLocaleString("pt-BR", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span></span>
                  </div>
                  <div className="pt-2.5 border-t border-white/10 flex justify-between text-xs items-center w-full font-sans">
                    <span className="text-zinc-200 font-bold">Líquido Recebido:</span>
                    <span className="text-[#41F20A] font-black text-base lg:text-lg">R$ <span className="font-sans font-semibold">{kiwifyNet.toLocaleString("pt-BR", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span></span>
                  </div>
                </div>
              </button>

            </div>
          </div>


          {/* ==================== 4. RESUMO GERAL E CÁLCULO (PLACED BELOW PLATFORMS COMPARISON) ==================== */}
          <div className="bg-black/45 p-5 md:p-8 rounded-[24px] border border-white/10 shadow-xl space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/5 pb-4 gap-4 select-none">
              <div>
                <h4 className="text-xs uppercase font-sans tracking-widest font-black text-zinc-300 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#41F20A] inline-block animate-pulse" />
                  Demonstrativo Geral de Ganhos Estimados
                </h4>
                <p className="text-[10px] text-zinc-500 font-sans mt-0.5">
                  Repartição transparente descontando custos operacionais na simulação corrente.
                </p>
              </div>
              <div className="bg-[#41F20A]/10 border border-[#41F20A]/20 text-[#41F20A] text-[10px] px-3 py-1 rounded-full font-black uppercase tracking-widest font-sans self-start sm:self-center">
                Cálculo de Transparência
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
              
              {/* Card 1: Faturamento Bruto */}
              <div className="bg-white/[0.03] p-4 rounded-xl border border-white/5 space-y-1">
                <span className="text-[10px] text-zinc-400 font-sans font-extrabold uppercase tracking-wider block">
                  Faturamento Bruto
                </span>
                <span className="text-xl font-sans font-black text-white block">
                  R$ <span className="font-sans font-semibold">{faturamento.toLocaleString("pt-BR")}</span>,00
                </span>
                <span className="text-[9px] text-zinc-500 font-sans block leading-tight">
                  (<span className="font-sans font-semibold">{salesUnits}</span> vendas de R$ <span className="font-sans font-semibold">{ticketAverage}</span>)
                </span>
              </div>

              {/* Card 2: Deduções Operacionais (AdSpend + Equipe + Impostos) */}
              <div className="bg-white/[0.03] p-4 rounded-xl border border-white/5 space-y-1">
                <span className="text-[10px] text-red-400 font-sans font-extrabold uppercase tracking-wider block">
                  Custos Operacionais
                </span>
                <span className="text-xl font-sans font-black text-red-400 block">
                  R$ <span className="font-sans font-semibold">{(trafego + equipe + impostoValue).toLocaleString("pt-BR")}</span>,00
                </span>
                <span className="text-[9px] text-zinc-400 font-sans block leading-tight">
                  Traf: R$ <span className="font-sans font-semibold">{trafego.toLocaleString("pt-BR")}</span> | Imp: R$ <span className="font-sans font-semibold">{impostoValue.toLocaleString("pt-BR")}</span>
                </span>
              </div>

              {/* Card 3: Taxa de Processamento do Gateway */}
              <div className="bg-white/[0.03] p-4 rounded-xl border border-white/5 space-y-1">
                <span className="text-[10px] text-zinc-400 font-sans font-extrabold uppercase tracking-wider block">
                  Taxas {selectedPlatform.toUpperCase()}
                </span>
                <span className="text-xl font-sans font-black text-amber-400 block">
                  R$ <span className="font-sans font-semibold">{activePlatformFee.toLocaleString("pt-BR", { maximumFractionDigits: 0 })}</span>,00
                </span>
                <span className="text-[9px] text-zinc-500 font-sans block leading-tight">
                  Taxas de gateway simulatória
                </span>
              </div>

              {/* Card 4: Lucro Real Líquido Total */}
              <div className="bg-emerald-600/5 p-4 rounded-xl border border-emerald-500/20 space-y-1">
                <span className="text-[10px] text-emerald-400 font-sans font-extrabold uppercase tracking-wider block">
                  Lucro Real Sobrevivente
                </span>
                <span className="text-xl font-sans font-black text-emerald-400 block">
                  R$ <span className="font-sans font-semibold">{netProfitTotal.toLocaleString("pt-BR")}</span>,00
                </span>
                <span className="text-[9px] text-zinc-400 font-sans block leading-tight">
                  Disponível p/ split societário
                </span>
              </div>

            </div>

            {/* EXPONENT SCREEN WITH LIQUID GREEN GLOW FOR EXACT EXPERT COMMISSION */}
            <div className="bg-gradient-to-r from-emerald-950/25 via-[#1B4D3E]/10 to-emerald-950/30 p-6 rounded-2xl border border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
              
              <div className="space-y-1">
                <span className="text-[10px] text-[#41F20A] font-sans uppercase font-black tracking-widest block">
                  REPASSE PREVISTO PARA O EXPERT ({modelType === "faturamento" ? `${expertPercentFaturamento}% Faturamento` : `${currentExpertLucroPercent.toFixed(1)}% de Lucro`})
                </span>
                <h3 className="text-3.5xl lg:text-4xl font-sans font-black text-[#41F20A] leading-none">
                  R$ <span className="font-sans font-semibold">{Math.round(finalExpertEarnings).toLocaleString("pt-BR")}</span>,00
                </h3>
                <p className="text-xs text-zinc-300 font-sans max-w-lg pt-1">
                  Este é o montante financeiro final simulado para a carteira líquida de repasse do especialista neste período.
                </p>
              </div>

              <div className="shrink-0">
                <div className="bg-emerald-500/10 border border-[#41F20A]/30 p-4 rounded-xl text-center select-none">
                  <span className="text-[9px] text-zinc-300 font-sans uppercase block tracking-wider">Parte do Expert</span>
                  <span className="text-[#41F20A] font-sans font-bold text-lg leading-tight block pt-0.5">
                    {modelType === "faturamento" ? `${expertPercentFaturamento}% Bruto` : `${currentExpertLucroPercent.toFixed(1)}% Líquido`}
                  </span>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>

      {/* Contract terms of experimental proposal */}
      <div className="max-w-4xl mx-auto mt-12 px-4 relative z-10 text-center space-y-6 select-none">
        <div className="inline-flex items-center gap-2 text-xs text-zinc-400 justify-center">
          <ShieldCheck size={14} className="text-[#41F20A]" />
          <span className="font-heading font-extrabold uppercase text-[10px] tracking-widest font-sans">Segurança de nosso Contrato Experimental</span>
        </div>
        <p className="font-sans text-zinc-400 text-xs max-w-xl mx-auto leading-relaxed">
          Iniciamos com um período experimental de 60 dias assinado digitalmente pelo GOV.BR. Se você não estiver satisfeita com o entrosamento e os resultados gerados, encerramos a coprodução amigavelmente e sem qualquer burocracia ou multa.
        </p>
        
        {/* Return Button */}
        <div className="pt-6">
          <button 
            onClick={onPrev}
            className="px-6 py-2.5 bg-zinc-950 hover:bg-zinc-900 text-zinc-400 hover:text-white border border-white/5 hover:border-white/10 text-xs font-bold uppercase tracking-widest rounded-full transition active:scale-95 cursor-pointer font-sans"
          >
            Voltar para A Parceria
          </button>
        </div>
      </div>

    </div>
  );
}
