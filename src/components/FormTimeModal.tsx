import React, { useState, useEffect } from "react";
import { X, ChevronLeft, Check, CheckCircle2, ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { LiquidMetalButton } from "./ui/liquid-metal-button";

interface FormTimeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WEBHOOK_URL = "https://nen.auto-jornada.space/webhook/forms-site";

export default function FormTimeModal({ isOpen, onClose }: FormTimeModalProps) {
  const [step, setStep] = useState<number>(1);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Form State
  const [area, setArea] = useState<string>("Tráfego Pago / Media Buyer");
  const [nome, setNome] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [whatsapp, setWhatsapp] = useState<string>("");
  const [portfolio, setPortfolio] = useState<string>("");
  const [mensagem, setMensagem] = useState<string>("");

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const totalSteps = 2;

  const handleNext = () => {
    if (step === 1 && !area) return;
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const sendWebhook = async () => {
    const payload = {
      tipo_formulario: "Time / Colaborador (Candidatura)",
      categoria: "Recrutamento / Carreira",
      origem: "Site DOMINUS - Formulário Fazer Parte do Time",
      timestamp: new Date().toISOString(),
      data_formatada: new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" }),
      dados_resposta: {
        nome,
        email,
        whatsapp,
        area_atuacao: area,
        portfolio_linkedin: portfolio,
        mensagem_cases: mensagem || "Não informada",
      },
      metadata: {
        page_url: typeof window !== "undefined" ? window.location.href : "",
        user_agent: typeof navigator !== "undefined" ? navigator.userAgent : "",
        language: typeof navigator !== "undefined" ? navigator.language : "",
        screen_width: typeof window !== "undefined" ? window.innerWidth : 0,
        screen_height: typeof window !== "undefined" ? window.innerHeight : 0,
      }
    };

    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      console.error("Erro ao enviar dados ao webhook:", err);
    }
  };

  const handleSubmit = async (e?: React.FormEvent | React.MouseEvent) => {
    if (e) e.preventDefault();
    if (!nome.trim() || !email.trim() || !whatsapp.trim() || !portfolio.trim()) return;

    setIsSubmitting(true);
    await sendWebhook();
    setIsSubmitting(false);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setStep(1);
    setArea("Tráfego Pago / Media Buyer");
    setNome("");
    setEmail("");
    setWhatsapp("");
    setPortfolio("");
    setMensagem("");
    onClose();
  };

  const canContinue = () => {
    if (step === 1) return area.length > 0;
    if (step === 2) return nome.trim() !== "" && email.trim() !== "" && whatsapp.trim() !== "" && portfolio.trim() !== "";
    return true;
  };

  const areaOptions = [
    "Tráfego Pago / Media Buyer",
    "Copywriting / Direct Response",
    "Edição de Vídeo & Motion",
    "Gestão de Atendimento & Vendas",
    "Design & Landing Pages",
    "Gestão de Coprodução / Projetos"
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto overflow-x-hidden bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
      
      {/* Background glow effect */}
      <div className="absolute w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] max-w-full bg-[#41F20A]/10 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none" />

      {/* Container do Modal Liquid Glass */}
      <div className="relative w-full max-w-lg sm:max-w-xl bg-[#08090d]/80 backdrop-blur-2xl border border-white/10 rounded-2xl sm:rounded-[2.5rem] p-5 sm:p-8 md:p-10 shadow-[0_20px_80px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(255,255,255,0.15)] my-auto flex flex-col min-h-[480px] sm:min-h-[520px] justify-between z-10 box-border overflow-hidden">
        
        {/* Top Gloss Highlight Line for Liquid Glass Effect */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#41F20A]/5 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header Navigation & Segmented Progress Bar */}
        <div className="space-y-6">
          <div className="flex items-center justify-between gap-4">
            {step > 1 && !submitted ? (
              <button
                onClick={handleBack}
                className="w-10 h-10 rounded-full bg-[#121319] border border-zinc-800 text-zinc-300 hover:text-white flex items-center justify-center transition hover:bg-zinc-800 focus:outline-none shrink-0"
                aria-label="Voltar etapa"
              >
                <ChevronLeft size={20} />
              </button>
            ) : (
              <div className="w-10 h-10 shrink-0" />
            )}

            {/* Segmented Progress Bar */}
            {!submitted && (
              <div className="flex items-center gap-2 flex-1 max-w-[140px] mx-auto">
                {Array.from({ length: totalSteps }).map((_, idx) => {
                  const currentIdx = idx + 1;
                  const isCompleted = currentIdx < step;
                  const isActive = currentIdx === step;

                  return (
                    <div
                      key={idx}
                      className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                        isActive
                          ? "bg-[#41F20A] shadow-[0_0_12px_rgba(65,242,10,0.6)]"
                          : isCompleted
                          ? "bg-[#41F20A]/60"
                          : "bg-zinc-800/80"
                      }`}
                    />
                  );
                })}
              </div>
            )}

            {/* Close Button */}
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-[#121319] border border-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center transition hover:bg-zinc-800 focus:outline-none shrink-0"
              aria-label="Fechar formulário"
            >
              <X size={20} />
            </button>
          </div>

          {/* Conteúdo por Etapa */}
          {submitted ? (
            /* Estado de Sucesso */
            <div className="py-10 text-center space-y-6 my-auto">
              <div className="w-20 h-20 rounded-full bg-[#41F20A]/10 border border-[#41F20A]/40 flex items-center justify-center text-[#41F20A] mx-auto shadow-[0_0_35px_rgba(65,242,10,0.35)]">
                <CheckCircle2 size={44} />
              </div>
              
              <div className="space-y-3">
                <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
                  Candidatura Enviada!
                </h3>
                <p className="text-sm sm:text-base text-zinc-400 font-sans max-w-md mx-auto leading-relaxed">
                  Recebemos seus dados. Analisaremos seu portfólio e entraremos em contato via WhatsApp/E-mail.
                </p>
              </div>

              <div className="pt-4 flex justify-center">
                <LiquidMetalButton
                  label="VOLTAR"
                  icon={<ArrowLeft size={14} className="text-[#41F20A]" />}
                  onClick={handleReset}
                  width={180}
                />
              </div>
            </div>
          ) : (
            <div className="space-y-6 pt-2">
              
              {/* ETAPA 1 */}
              {step === 1 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-200">
                  <div className="space-y-1">
                    <h2 className="text-xl sm:text-2xl font-bold font-heading text-white tracking-tight">
                      Quero Fazer Parte do Time
                    </h2>
                    <p className="text-xs sm:text-sm text-zinc-400 font-sans">
                      Selecione sua principal área de atuação
                    </p>
                  </div>

                  <div className="space-y-2.5">
                    {areaOptions.map((option) => {
                      const isSelected = area === option;
                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => setArea(option)}
                          className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between transition-all duration-200 ${
                            isSelected
                              ? "bg-[#181922] border-[#41F20A] text-white shadow-[0_0_20px_rgba(65,242,10,0.18)]"
                              : "bg-[#121319] border-zinc-800/80 text-zinc-300 hover:bg-[#171822] hover:border-zinc-700"
                          }`}
                        >
                          <span className="text-sm font-medium pr-4">{option}</span>
                          <div
                            className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 transition-all ${
                              isSelected
                                ? "bg-[#41F20A] border-[#41F20A] text-black shadow-[0_0_10px_rgba(65,242,10,0.6)]"
                                : "border-zinc-600 bg-zinc-950/80"
                            }`}
                          >
                            {isSelected && <Check size={14} strokeWidth={3} />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ETAPA 2 - DADOS DE CONTATO & PORTFÓLIO */}
              {step === 2 && (
                <form id="time-form" onSubmit={handleSubmit} className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-200">
                  <div className="space-y-1">
                    <h2 className="text-xl sm:text-2xl font-bold font-heading text-white tracking-tight">
                      Dados para Contato & Portfólio
                    </h2>
                    <p className="text-xs sm:text-sm text-zinc-400 font-sans">
                      Informe onde podemos avaliar seus trabalhos
                    </p>
                  </div>

                  <div className="space-y-3.5 pt-1">
                    <div className="space-y-1">
                      <label className="text-[11px] font-mono text-zinc-400 font-semibold uppercase tracking-wider">
                        Nome Completo *
                      </label>
                      <input
                        type="text"
                        required
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        placeholder="Seu nome completo"
                        className="w-full bg-[#121319] border border-zinc-800/90 focus:border-[#41F20A] rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-[#41F20A] transition"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div className="space-y-1">
                        <label className="text-[11px] font-mono text-zinc-400 font-semibold uppercase tracking-wider">
                          E-mail Principal *
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="seu.email@exemplo.com"
                          className="w-full bg-[#121319] border border-zinc-800/90 focus:border-[#41F20A] rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-[#41F20A] transition"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-mono text-zinc-400 font-semibold uppercase tracking-wider">
                          WhatsApp (com DDD) *
                        </label>
                        <input
                          type="tel"
                          required
                          value={whatsapp}
                          onChange={(e) => setWhatsapp(e.target.value)}
                          placeholder="(11) 99999-9999"
                          className="w-full bg-[#121319] border border-zinc-800/90 focus:border-[#41F20A] rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-[#41F20A] transition"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-mono text-zinc-400 font-semibold uppercase tracking-wider">
                        Link do Portfólio / LinkedIn / Behance *
                      </label>
                      <input
                        type="url"
                        required
                        value={portfolio}
                        onChange={(e) => setPortfolio(e.target.value)}
                        placeholder="https://linkedin.com/in/seu-perfil ou link do drive"
                        className="w-full bg-[#121319] border border-zinc-800/90 focus:border-[#41F20A] rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-[#41F20A] transition"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-mono text-zinc-400 font-semibold uppercase tracking-wider">
                        Mensagem / Principais Cases (Opcional)
                      </label>
                      <textarea
                        rows={2}
                        value={mensagem}
                        onChange={(e) => setMensagem(e.target.value)}
                        placeholder="Conte brevemente sobre seus melhores trabalhos..."
                        className="w-full bg-[#121319] border border-zinc-800/90 focus:border-[#41F20A] rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-[#41F20A] transition resize-none"
                      />
                    </div>
                  </div>
                </form>
              )}

            </div>
          )}
        </div>

        {/* Bottom CTA Button with Liquid Metal Pill */}
        {!submitted && (
          <div className="pt-6 mt-6 border-t border-zinc-900/80 flex justify-center w-full max-w-full">
            {step < totalSteps ? (
              <div className={!canContinue() ? "opacity-50 pointer-events-none transition w-full flex justify-center" : "transition w-full flex justify-center"}>
                <LiquidMetalButton
                  label="CONTINUAR"
                  icon={<ArrowRight size={14} className="text-[#41F20A]" />}
                  onClick={handleNext}
                  width={280}
                />
              </div>
            ) : (
              <div className={!canContinue() || isSubmitting ? "opacity-50 pointer-events-none transition w-full flex justify-center" : "transition w-full flex justify-center"}>
                <LiquidMetalButton
                  label={isSubmitting ? "ENVIANDO..." : "ENVIAR CANDIDATURA"}
                  icon={isSubmitting ? <Loader2 size={14} className="text-[#41F20A] animate-spin" /> : <ArrowRight size={14} className="text-[#41F20A]" />}
                  onClick={handleSubmit}
                  width={300}
                />
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
