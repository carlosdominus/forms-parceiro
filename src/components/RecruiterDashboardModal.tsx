import React, { useState, useEffect, useMemo } from "react";
import { 
  X, 
  Search, 
  Download, 
  Filter, 
  Trash2, 
  User, 
  Instagram, 
  Phone, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Sparkles, 
  ExternalLink,
  ShieldAlert,
  FileSpreadsheet,
  Clock,
  Layers,
  Check,
  ChevronRight
} from "lucide-react";
import { CandidateSubmission, CandidateTag, TrackId } from "../types/form";
import { getStoredCandidates, exportCandidatesToCSV, STORAGE_KEY_CANDIDATES } from "../utils/formHelpers";

interface RecruiterDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RecruiterDashboardModal({ isOpen, onClose }: RecruiterDashboardModalProps) {
  const [candidates, setCandidates] = useState<CandidateSubmission[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedTag, setSelectedTag] = useState<string>("ALL");
  const [selectedTrack, setSelectedTrack] = useState<string>("ALL");
  const [activeCandidate, setActiveCandidate] = useState<CandidateSubmission | null>(null);

  // Load candidates when modal opens
  useEffect(() => {
    if (isOpen) {
      setCandidates(getStoredCandidates());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Clear candidates handler
  const handleClearAll = () => {
    if (window.confirm("Deseja apagar o histórico de candidaturas salvas localmente?")) {
      localStorage.removeItem(STORAGE_KEY_CANDIDATES);
      setCandidates([]);
      setActiveCandidate(null);
    }
  };

  // Export CSV handler
  const handleExportCSV = () => {
    const csvContent = exportCandidatesToCSV(candidates);
    if (!csvContent) return;

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `dominus_candidatos_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered Candidates list
  const filteredCandidates = candidates.filter((c) => {
    const matchSearch =
      c.answers.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.answers.instagram.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.answers.whatsapp.includes(searchTerm) ||
      c.vaga.toLowerCase().includes(searchTerm.toLowerCase());

    const matchTag =
      selectedTag === "ALL" || c.tags.includes(selectedTag as CandidateTag);

    const matchTrack =
      selectedTrack === "ALL" || c.trackId === selectedTrack || c.vaga.includes(selectedTrack);

    return matchSearch && matchTag && matchTrack;
  });

  // Tag Badge Renderer
  const renderTagBadge = (tag: CandidateTag) => {
    switch (tag) {
      case "prioritario":
        return (
          <span className="px-2.5 py-0.5 rounded-full bg-[#41F20A]/20 border border-[#41F20A]/50 text-[#41F20A] text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1">
            <Sparkles size={11} /> PRIORITÁRIO
          </span>
        );
      case "qualificado":
        return (
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[10px] font-mono font-semibold uppercase tracking-wider flex items-center gap-1">
            <CheckCircle2 size={11} /> QUALIFICADO
          </span>
        );
      case "desqualificado":
        return (
          <span className="px-2.5 py-0.5 rounded-full bg-red-500/20 border border-red-500/40 text-red-300 text-[10px] font-mono font-semibold uppercase tracking-wider flex items-center gap-1">
            <XCircle size={11} /> DESQUALIFICADO
          </span>
        );
      case "atenção_reprovado":
        return (
          <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[10px] font-mono font-semibold uppercase tracking-wider flex items-center gap-1">
            <ShieldAlert size={11} /> ATENÇÃO REPROVADO
          </span>
        );
      case "abaixo_da_barra":
        return (
          <span className="px-2.5 py-0.5 rounded-full bg-orange-500/20 border border-orange-500/40 text-orange-300 text-[10px] font-mono font-semibold uppercase tracking-wider flex items-center gap-1">
            <AlertTriangle size={11} /> ABAIXO DA BARRA
          </span>
        );
      case "fora_da_faixa":
        return (
          <span className="px-2.5 py-0.5 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-300 text-[10px] font-mono font-semibold uppercase tracking-wider flex items-center gap-1">
            FORA DA FAIXA
          </span>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-xl overflow-y-auto">
      
      {/* Background glow */}
      <div className="absolute w-[600px] h-[600px] bg-[#41F20A]/10 rounded-full blur-[160px] pointer-events-none" />

      {/* Main Container */}
      <div className="relative w-full max-w-5xl bg-[#08090d]/95 border border-white/10 rounded-2xl sm:rounded-[2rem] p-5 sm:p-8 shadow-2xl my-auto flex flex-col min-h-[600px] max-h-[90vh] overflow-hidden z-10">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between pb-6 border-b border-zinc-800 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#41F20A]/10 border border-[#41F20A]/30 text-[#41F20A] flex items-center justify-center font-bold">
              RH
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-white">
                Painel de Triagem DOMINUS
              </h2>
              <p className="text-xs text-zinc-400 font-sans">
                {candidates.length} candidatura(s) recebida(s) no banco local
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {candidates.length > 0 && (
              <>
                <button
                  onClick={handleExportCSV}
                  className="px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-[#41F20A]/50 text-xs font-mono text-zinc-300 hover:text-white flex items-center gap-1.5 transition"
                  title="Exportar em CSV"
                >
                  <FileSpreadsheet size={15} className="text-[#41F20A]" />
                  <span className="hidden sm:inline">Exportar CSV</span>
                </button>
                <button
                  onClick={handleClearAll}
                  className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-500 hover:text-red-400 hover:border-red-500/30 transition"
                  title="Limpar Lista"
                >
                  <Trash2 size={16} />
                </button>
              </>
            )}

            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center transition"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="py-4 grid grid-cols-1 sm:grid-cols-3 gap-3 border-b border-zinc-800/80">
          {/* Search Input */}
          <div className="relative">
            <Search size={15} className="absolute left-3.5 top-3 text-zinc-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por nome, @, whatsapp..."
              className="w-full bg-[#121319] border border-zinc-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#41F20A]"
            />
          </div>

          {/* Tag Filter */}
          <select
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
            className="bg-[#121319] border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-300 focus:outline-none font-mono"
          >
            <option value="ALL">Todas as Tags</option>
            <option value="prioritario">Prioritários</option>
            <option value="qualificado">Qualificados</option>
            <option value="desqualificado">Desqualificados</option>
            <option value="atenção_reprovado">Atenção Reprovado</option>
            <option value="abaixo_da_barra">Abaixo da Barra</option>
            <option value="fora_da_faixa">Fora da Faixa</option>
          </select>

          {/* Track Filter */}
          <select
            value={selectedTrack}
            onChange={(e) => setSelectedTrack(e.target.value)}
            className="bg-[#121319] border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-300 focus:outline-none font-mono"
          >
            <option value="ALL">Todas as Vagas / Trilhas</option>
            <option value="Copywriter">Copywriter</option>
            <option value="Editor de vídeo">Editor de vídeo</option>
            <option value="Gestor de tráfego">Gestor de tráfego</option>
            <option value="Gestor de projetos">Gestor de projetos</option>
            <option value="T1">T1 - Copy Criativos</option>
            <option value="T2">T2 - Copy VSL</option>
            <option value="T3">T3 - Editor Criativos</option>
            <option value="T4">T4 - Editor VSL</option>
            <option value="T5">T5 - Tráfego Júnior</option>
            <option value="T6">T6 - Tráfego Sênior</option>
            <option value="T7">T7 - Gestor Projetos</option>
          </select>
        </div>

        {/* Content Body: Split View Table / Candidate Detail Modal */}
        <div className="flex-1 overflow-y-auto py-4 space-y-3">
          {filteredCandidates.length === 0 ? (
            <div className="py-20 text-center space-y-3">
              <Layers size={36} className="mx-auto text-zinc-600" />
              <p className="text-sm text-zinc-400 font-sans">
                Nenhuma candidatura encontrada com os filtros selecionados.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-zinc-800/60">
              {filteredCandidates.map((c) => (
                <div
                  key={c.id}
                  onClick={() => setActiveCandidate(c)}
                  className="p-4 rounded-xl bg-[#10121a]/60 hover:bg-[#141724] border border-transparent hover:border-zinc-800 transition cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-bold text-white group-hover:text-[#41F20A] transition">
                        {c.answers.nome}
                      </span>
                      <span className="text-xs font-mono text-zinc-500">
                        {c.answers.instagram}
                      </span>
                      {c.tags.map((t) => (
                        <React.Fragment key={t}>{renderTagBadge(t)}</React.Fragment>
                      ))}
                    </div>

                    <div className="text-xs text-zinc-400 flex items-center gap-4 flex-wrap">
                      <span className="font-mono text-zinc-300">
                        {c.vaga} • {c.especialidade} ({c.trackId})
                      </span>
                      <span>WhatsApp: {c.answers.whatsapp}</span>
                      <span>Data: {c.dataFormatted}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveCandidate(c);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300 group-hover:text-white group-hover:border-[#41F20A]/50 flex items-center gap-1 transition"
                    >
                      <span>Detalhes</span>
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Detailed Candidate Modal overlay */}
        {activeCandidate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
            <div className="relative w-full max-w-2xl bg-[#0a0c12] border border-white/10 rounded-2xl p-6 space-y-6 shadow-2xl max-h-[85vh] overflow-y-auto my-auto">
              
              {/* Header */}
              <div className="flex items-start justify-between border-b border-zinc-800 pb-4">
                <div>
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h3 className="text-xl font-bold font-heading text-white">
                      {activeCandidate.answers.nome}
                    </h3>
                    {activeCandidate.tags.map((t) => (
                      <React.Fragment key={t}>{renderTagBadge(t)}</React.Fragment>
                    ))}
                  </div>
                  <p className="text-xs font-mono text-[#41F20A]">
                    {activeCandidate.vaga} — {activeCandidate.especialidade} ({activeCandidate.trackId})
                  </p>
                </div>

                <button
                  onClick={() => setActiveCandidate(null)}
                  className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Contatos & Info Base */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3.5 rounded-xl bg-[#12141e] border border-zinc-800 text-xs font-sans">
                <div>
                  <span className="text-zinc-500 block font-mono text-[10px] uppercase">Instagram</span>
                  <span className="text-white font-semibold">{activeCandidate.answers.instagram}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block font-mono text-[10px] uppercase">WhatsApp</span>
                  <span className="text-white font-semibold">{activeCandidate.answers.whatsapp}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block font-mono text-[10px] uppercase">Idade / CNPJ</span>
                  <span className="text-white font-semibold">{activeCandidate.answers.idade} anos • {activeCandidate.answers.temCnpj}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block font-mono text-[10px] uppercase">Pretensão Salarial</span>
                  <span className="text-[#41F20A] font-semibold">{activeCandidate.answers.pretensaoSalarial || "Fixo 2k"}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block font-mono text-[10px] uppercase">Full-Time Exclusivo</span>
                  <span className="text-white font-semibold">{activeCandidate.answers.fullTimeExclusivo}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block font-mono text-[10px] uppercase">Início</span>
                  <span className="text-white font-semibold">{activeCandidate.answers.tempoInicio}</span>
                </div>
              </div>

              {/* Teste de Atenção Result */}
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs space-y-1">
                <span className="font-mono text-amber-400 font-bold block uppercase">
                  Teste de Atenção: {activeCandidate.tags.includes("atenção_reprovado") ? "REPROVADO" : "APROVADO"}
                </span>
                <p className="text-zinc-300">
                  Resposta dada: <strong className="font-mono text-white">"{activeCandidate.answers.testeAtencaoResposta}"</strong>
                </p>
              </div>

              {/* Track Specific Responses */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-wider font-bold">
                  Respostas Técnicas da Trilha ({activeCandidate.trackId})
                </h4>
                
                <div className="space-y-3">
                  {Object.entries(activeCandidate.answers.trackAnswers).map(([qKey, qVal]) => (
                    <div key={qKey} className="p-3 rounded-xl bg-[#12131a] border border-zinc-800/80 text-xs space-y-1">
                      <span className="text-zinc-400 font-mono text-[10px] block">Campo [{qKey}]:</span>
                      <p className="text-zinc-200 leading-relaxed whitespace-pre-wrap font-sans">
                        {Array.isArray(qVal) ? qVal.join(", ") : String(qVal || "-")}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
