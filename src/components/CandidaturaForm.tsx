import React, { useState } from "react";
import { 
  User, 
  Instagram, 
  Phone, 
  CheckCircle2, 
  ChevronLeft, 
  ArrowRight, 
  Loader2, 
  Check,
  ShieldCheck,
  AlertCircle
} from "lucide-react";
import { LiquidMetalButton } from "./ui/liquid-metal-button";
import { maskPhone } from "../utils/formHelpers";

const WEBHOOK_URL = "https://nen.auto-jornada.space/webhook/forms-site";

const EQ1_OPTIONS = [
  "Lançamento (webinar/evento)",
  "Venda manual (DM, WhatsApp, indicação)",
  "Já tenho um funil/página rodando",
  "Ainda não vendo, só tenho conteúdo/audiência"
];

const EXCLUSIVE_OPTION = "Ainda não vendo, só tenho conteúdo/audiência";

const EQ2_OPTIONS = [
  "Ainda não faturo",
  "Até R$20.000",
  "R$20 mil a R$100 mil/mês",
  "Acima de R$ 100 mil/mês"
];

const EQ3_OPTIONS = [
  "SIM",
  "NÃO"
];

function getFormattedDateSP(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    timeZone: "America/Sao_Paulo",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };
  const parts = new Intl.DateTimeFormat("pt-BR", options).formatToParts(date);
  const map: Record<string, string> = {};
  parts.forEach((p) => {
    map[p.type] = p.value;
  });
  return `${map.day}/${map.month}/${map.year}, ${map.hour}:${map.minute}`;
}

export default function CandidaturaForm() {
  const [step, setStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Form State
  const [eq1, setEq1] = useState<string[]>([]);
  const [eq2, setEq2] = useState<string>("");
  const [eq3, setEq3] = useState<string>("");
  const [nome, setNome] = useState<string>("");
  const [instagram, setInstagram] = useState<string>("");
  const [whatsapp, setWhatsapp] = useState<string>("");

  // Toggle multi-select for Screen 1
  const handleToggleEq1 = (opt: string) => {
    setValidationError(null);
    if (opt === EXCLUSIVE_OPTION) {
      if (eq1.includes(EXCLUSIVE_OPTION)) {
        setEq1([]);
      } else {
        setEq1([EXCLUSIVE_OPTION]);
      }
    } else {
      if (eq1.includes(opt)) {
        setEq1(eq1.filter((item) => item !== opt));
      } else {
        setEq1([...eq1.filter((item) => item !== EXCLUSIVE_OPTION), opt]);
      }
    }
  };

  // Validation per step
  const validateCurrentStep = (): boolean => {
    setValidationError(null);

    if (step === 1) {
      if (eq1.length === 0) {
        setValidationError("Selecione pelo menos uma opção para continuar.");
        return false;
      }
      return true;
    }

    if (step === 2) {
      if (!eq2) {
        setValidationError("Selecione uma opção para continuar.");
        return false;
      }
      return true;
    }

    if (step === 3) {
      if (!eq3) {
        setValidationError("Selecione uma opção para continuar.");
        return false;
      }
      return true;
    }

    if (step === 4) {
      if (!nome.trim()) {
        setValidationError("Por favor, informe seu nome completo.");
        document.getElementById("field-nome")?.focus();
        return false;
      }
      if (!instagram.trim()) {
        setValidationError("Por favor, informe seu Instagram.");
        document.getElementById("field-instagram")?.focus();
        return false;
      }
      const digits = whatsapp.replace(/\D/g, "");
      if (digits.length < 10 || digits.length > 11) {
        setValidationError("Por favor, informe um WhatsApp válido com DDD (10 ou 11 dígitos).");
        document.getElementById("field-whatsapp")?.focus();
        return false;
      }
      return true;
    }

    return true;
  };

  const handleNext = () => {
    setValidationError(null);
    if (validateCurrentStep()) {
      if (step < 4) {
        setValidationError(null);
        setStep((prev) => prev + 1);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  const handleBack = () => {
    setValidationError(null);
    setSubmitError(null);
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (isSubmitting) return;
    if (!validateCurrentStep()) return;

    setIsSubmitting(true);
    setSubmitError(null);

    const now = new Date();
    const formattedInstagram = instagram.trim().startsWith("@")
      ? instagram.trim()
      : `@${instagram.trim()}`;
    const cleanWhatsapp = whatsapp.replace(/\D/g, "");

    const payload = {
      tipo_formulario: "DOMINUS Expert - Qualificacao",
      timestamp: now.toISOString(),
      data_formatada: getFormattedDateSP(now),
      lead: {
        nome: nome.trim(),
        instagram: formattedInstagram,
        whatsapp: cleanWhatsapp,
      },
      respostas: {
        e_q1: eq1,
        e_q2: eq2,
        e_q3: eq3,
      },
      metadata: {
        page_url: typeof window !== "undefined" ? window.location.href : "",
        user_agent: typeof navigator !== "undefined" ? navigator.userAgent : "",
        language: typeof navigator !== "undefined" ? navigator.language : "",
        screen_resolution: typeof window !== "undefined" ? `${window.innerWidth}x${window.innerHeight}` : "",
      },
    };

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Servidor retornou status ${response.status}`);
      }

      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error("Erro no envio do diagnóstico:", err);
      setSubmitError("Erro ao enviar. Por favor, tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 4) {
      handleNext();
    } else {
      handleSubmit();
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto my-6 px-3 sm:px-6 relative z-10">
      
      {/* Container Glass Box */}
      <div className="relative bg-[#08090d]/85 backdrop-blur-2xl border border-white/10 rounded-2xl sm:rounded-[2.5rem] p-5 sm:p-8 md:p-10 shadow-[0_20px_80px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(255,255,255,0.15)] flex flex-col justify-between overflow-hidden">
        
        {/* Top Gloss Highlight Line */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#41F20A]/5 rounded-full blur-3xl pointer-events-none" />

        {/* Header Bar with Header Label, Step Navigation & Progress Indicator */}
        {!submitted && (
          <div className="space-y-4 pb-6 border-b border-zinc-800/80">
            {/* Header Label */}
            <span className="text-[11px] font-mono text-[#41F20A] uppercase tracking-wider font-semibold block text-center">
              DIAGNÓSTICO DE PERFIL E FUNIL
            </span>

            <div className="flex items-center justify-between gap-4">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={isSubmitting}
                  className="w-10 h-10 rounded-full bg-[#121319] border border-zinc-800 text-zinc-300 hover:text-white flex items-center justify-center transition hover:bg-zinc-800 focus:outline-none shrink-0 disabled:opacity-50"
                  aria-label="Voltar etapa"
                >
                  <ChevronLeft size={20} />
                </button>
              ) : (
                <div className="w-10 h-10" />
              )}

              {/* Progress Indicator (4 segments) */}
              <div className="flex items-center gap-2 flex-1 max-w-[200px] mx-auto justify-center">
                <span className="text-[11px] font-mono text-zinc-400 font-semibold">
                  Etapa {step} de 4
                </span>
                <div className="flex items-center gap-1.5 flex-1">
                  {Array.from({ length: 4 }).map((_, idx) => {
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
                            : "bg-zinc-800"
                        }`}
                      />
                    );
                  })}
                </div>
              </div>

              <div className="w-10 h-10" />
            </div>
          </div>
        )}

        {/* =========================================================================
            SCREEN CONTENT SWITCHING (STEPS 1 to 4 + SUBMITTED STATE)
           ========================================================================= */}

        {submitted ? (
          /* =========================================================================
             TELA FINAL — DEPOIS DO ENVIO
             ========================================================================= */
          <div className="py-10 text-center space-y-8 my-auto animate-in fade-in zoom-in-95 duration-300">
            <div className="w-20 h-20 rounded-full bg-[#41F20A]/10 border border-[#41F20A]/40 flex items-center justify-center text-[#41F20A] mx-auto shadow-[0_0_40px_rgba(65,242,10,0.35)]">
              <CheckCircle2 size={46} />
            </div>

            <div className="space-y-4 max-w-lg mx-auto">
              <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-white">
                Diagnóstico em análise
              </h2>
              <div className="text-sm sm:text-base text-zinc-300 font-sans leading-relaxed space-y-4">
                <p>Suas respostas já chegaram para o nosso time.</p>
                <p>
                  Em até 2 dias úteis você recebe no WhatsApp a leitura do seu perfil: em que estágio sua operação está hoje, qual o gargalo mais provável no seu estágio e o que costuma destravar quem está exatamente nesse ponto.
                </p>
                <p className="text-zinc-400">Fique de olho no número que você cadastrou.</p>
              </div>

              <div className="pt-6 flex justify-center">
                <a
                  href="https://dominus.site/"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-[#121319] hover:bg-[#181922] border border-zinc-800 hover:border-[#41F20A]/50 text-xs sm:text-sm font-mono text-zinc-200 hover:text-white transition-all shadow-[0_4px_20px_rgba(0,0,0,0.5)] group"
                >
                  <span>Voltar para dominus.site</span>
                  <ArrowRight size={16} className="text-[#41F20A] group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleFormSubmit} className="pt-6 space-y-8">
            
            {/* Validation Error Banner */}
            {validationError && (
              <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono flex items-center gap-2 animate-in fade-in">
                <AlertCircle size={16} className="shrink-0" />
                <span>{validationError}</span>
              </div>
            )}

            {/* Submit Error Banner */}
            {submitError && (
              <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono flex items-center gap-2 animate-in fade-in">
                <AlertCircle size={16} className="shrink-0" />
                <span>{submitError}</span>
              </div>
            )}

            {/* =========================================================================
                TELA 1 — MÚLTIPLA ESCOLHA
               ========================================================================= */}
            {step === 1 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="space-y-2">
                  <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-white tracking-tight">
                    Como você vende hoje?
                  </h1>
                  <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed">
                    Selecione todas as opções que se aplicam.
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  {EQ1_OPTIONS.map((opt) => {
                    const isSelected = eq1.includes(opt);
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => handleToggleEq1(opt)}
                        className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between transition-all duration-200 ${
                          isSelected
                            ? "bg-[#181922] border-[#41F20A] text-white shadow-[0_0_20px_rgba(65,242,10,0.18)]"
                            : "bg-[#121319] border-zinc-800/80 text-zinc-300 hover:bg-[#171822] hover:border-zinc-700"
                        }`}
                      >
                        <span className="text-sm font-medium pr-3 leading-snug">{opt}</span>
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-all ${
                            isSelected
                              ? "bg-[#41F20A] border-[#41F20A] text-black shadow-[0_0_10px_rgba(65,242,10,0.6)]"
                              : "border-zinc-700 bg-zinc-950/80"
                          }`}
                        >
                          {isSelected && <Check size={12} strokeWidth={3} />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* =========================================================================
                TELA 2 — ESCOLHA ÚNICA
               ========================================================================= */}
            {step === 2 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="space-y-2">
                  <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-white tracking-tight">
                    Qual seu faturamento mensal atual?
                  </h2>
                  <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed">
                    O que trava quem fatura R$ 15 mil é diferente do que trava quem fatura R$ 150 mil. Essa resposta define a leitura.
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  {EQ2_OPTIONS.map((opt) => {
                    const isSelected = eq2 === opt;
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => {
                          setValidationError(null);
                          setEq2(opt);
                        }}
                        className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between transition-all duration-200 ${
                          isSelected
                            ? "bg-[#181922] border-[#41F20A] text-white shadow-[0_0_20px_rgba(65,242,10,0.18)]"
                            : "bg-[#121319] border-zinc-800/80 text-zinc-300 hover:bg-[#171822] hover:border-zinc-700"
                        }`}
                      >
                        <span className="text-sm font-medium pr-3 leading-snug">{opt}</span>
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-all ${
                            isSelected
                              ? "bg-[#41F20A] border-[#41F20A] text-black shadow-[0_0_10px_rgba(65,242,10,0.6)]"
                              : "border-zinc-700 bg-zinc-950/80"
                          }`}
                        >
                          {isSelected && <Check size={12} strokeWidth={3} />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* =========================================================================
                TELA 3 — ESCOLHA ÚNICA
               ========================================================================= */}
            {step === 3 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="space-y-2">
                  <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-white tracking-tight">
                    Você está disposto a investir tempo e dinheiro em uma estrutura capaz de gerar + R$100.000 de LUCRO por mês?
                  </h2>
                  <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed">
                    Estrutura custa antes de devolver. Responder não aqui não elimina ninguém — só muda o diagnóstico.
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  {EQ3_OPTIONS.map((opt) => {
                    const isSelected = eq3 === opt;
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => {
                          setValidationError(null);
                          setEq3(opt);
                        }}
                        className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between transition-all duration-200 ${
                          isSelected
                            ? "bg-[#181922] border-[#41F20A] text-white shadow-[0_0_20px_rgba(65,242,10,0.18)]"
                            : "bg-[#121319] border-zinc-800/80 text-zinc-300 hover:bg-[#171822] hover:border-zinc-700"
                        }`}
                      >
                        <span className="text-sm font-medium pr-3 leading-snug">{opt}</span>
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-all ${
                            isSelected
                              ? "bg-[#41F20A] border-[#41F20A] text-black shadow-[0_0_10px_rgba(65,242,10,0.6)]"
                              : "border-zinc-700 bg-zinc-950/80"
                          }`}
                        >
                          {isSelected && <Check size={12} strokeWidth={3} />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* =========================================================================
                TELA 4 — CONTATO
               ========================================================================= */}
            {step === 4 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="space-y-2">
                  <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-white tracking-tight">
                    Para onde enviamos seu diagnóstico?
                  </h2>
                  <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed">
                    Analisamos suas respostas e te devolvemos a leitura do seu perfil no WhatsApp.
                  </p>
                </div>

                <div className="space-y-4 pt-2">
                  {/* 1. Nome Completo */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-zinc-300 font-semibold uppercase tracking-wider flex items-center gap-1.5">
                      <User size={14} className="text-[#41F20A]" />
                      1. Nome completo *
                    </label>
                    <input
                      id="field-nome"
                      type="text"
                      required
                      value={nome}
                      onChange={(e) => {
                        setValidationError(null);
                        setNome(e.target.value);
                      }}
                      placeholder="Ex: João Silva"
                      className="w-full bg-[#121319] border border-zinc-800/90 focus:border-[#41F20A] rounded-2xl px-4 py-3.5 text-base text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-[#41F20A] transition"
                    />
                  </div>

                  {/* 2. Instagram */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-zinc-300 font-semibold uppercase tracking-wider flex items-center gap-1.5">
                      <Instagram size={14} className="text-[#41F20A]" />
                      2. @ do Instagram *
                    </label>
                    <input
                      id="field-instagram"
                      type="text"
                      required
                      value={instagram}
                      onChange={(e) => {
                        setValidationError(null);
                        setInstagram(e.target.value);
                      }}
                      placeholder="@seu.perfil"
                      className="w-full bg-[#121319] border border-zinc-800/90 focus:border-[#41F20A] rounded-2xl px-4 py-3.5 text-base text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-[#41F20A] transition"
                    />
                  </div>

                  {/* 3. WhatsApp com máscara */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-zinc-300 font-semibold uppercase tracking-wider flex items-center gap-1.5">
                      <Phone size={14} className="text-[#41F20A]" />
                      3. WhatsApp *
                    </label>
                    <input
                      id="field-whatsapp"
                      type="tel"
                      required
                      value={whatsapp}
                      onChange={(e) => {
                        setValidationError(null);
                        setWhatsapp(maskPhone(e.target.value));
                      }}
                      placeholder="(11) 99999-9999"
                      className="w-full bg-[#121319] border border-zinc-800/90 focus:border-[#41F20A] rounded-2xl px-4 py-3.5 text-base font-mono text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-[#41F20A] transition"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Navigation CTA Bar */}
            <div className="pt-6 mt-6 border-t border-zinc-900 flex flex-col items-center justify-center gap-3 w-full">
              {step < 4 ? (
                <LiquidMetalButton
                  type="button"
                  label="PRÓXIMA ETAPA"
                  icon={<ArrowRight size={14} className="text-[#41F20A]" />}
                  onClick={handleNext}
                  width={240}
                />
              ) : (
                <LiquidMetalButton
                  type="submit"
                  label={isSubmitting ? "ENVIANDO..." : "RECEBER MEU DIAGNÓSTICO"}
                  icon={
                    isSubmitting ? (
                      <Loader2 size={14} className="text-[#41F20A] animate-spin" />
                    ) : (
                      <ShieldCheck size={15} className="text-[#41F20A]" />
                    )
                  }
                  onClick={handleSubmit}
                  width={280}
                />
              )}

              {step > 1 && (
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={isSubmitting}
                  className="px-5 py-2.5 rounded-2xl bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800/80 text-xs font-mono text-zinc-400 hover:text-white transition flex items-center justify-center gap-1.5 disabled:opacity-50 mt-1"
                >
                  <ChevronLeft size={16} />
                  <span>Anterior</span>
                </button>
              )}
            </div>

          </form>
        )}
      </div>
    </div>
  );
}
