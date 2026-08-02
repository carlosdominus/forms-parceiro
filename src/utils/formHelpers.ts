import { CandidateAnswers, CandidateSubmission, CandidateTag, RoleCategory, TrackId } from "../types/form";
import { TRACKS } from "../data/formSchema";

export const WEBHOOK_URL = "https://nen.auto-jornada.space/webhook/forms-site";
export const STORAGE_KEY_CANDIDATES = "dominus_candidates_db_v1";
export const STORAGE_KEY_DRAFT = "dominus_form_draft_v1";

// Mask telephone input to Brazilian standard (XX) XXXXX-XXXX or (XX) XXXX-XXXX
export function maskPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits.length ? `(${digits}` : "";
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
}

// Reverse string helper
export function reverseString(str: string): string {
  return str.split("").reverse().join("");
}

// Get required attention test word for a track
export function getTestWordForTrack(trackId: TrackId): string {
  if (trackId in TRACKS) {
    return TRACKS[trackId].testWord;
  }
  return "DISCIPLINA";
}

// Evaluate test word answer
// The candidate is asked to write the word REVERSED (e.g. DISCIPLINA -> ANILPICSID)
export function isAttentionTestCorrect(trackId: TrackId, userInput: string): boolean {
  const targetWord = getTestWordForTrack(trackId);
  const expectedReversed = reverseString(targetWord).toUpperCase();
  const cleanedInput = userInput.trim().toUpperCase().replace(/\s+/g, "");

  return cleanedInput === expectedReversed;
}

// Evaluate qualification tags for candidate submission
export function evaluateCandidateTags(answers: CandidateAnswers, trackId: TrackId): CandidateTag[] {
  const tags: CandidateTag[] = [];

  // 1. Age & Full-time checks
  const isMinor = typeof answers.idade === "number" && answers.idade < 18;
  const isNotFullTime = answers.fullTimeExclusivo === "Não";

  if (isMinor || isNotFullTime) {
    tags.push("desqualificado");
  }

  // 2. Attention Test Check
  const attentionOk = isAttentionTestCorrect(trackId, answers.testeAtencaoResposta);
  if (!attentionOk) {
    tags.push("atenção_reprovado");
  }

  // 3. Track-specific rules
  if (trackId === "T6") {
    // Pleno/Sênior traffic
    const q3Ans = answers.trackAnswers["t6_q3"];
    if (q3Ans === "Ainda não atingi esse resultado") {
      tags.push("abaixo_da_barra");
    }
  }

  if (trackId === "T5") {
    // Junior traffic
    const q11Ans = answers.trackAnswers["t5_q11"];
    if (q11Ans === "Não") {
      tags.push("fora_da_faixa");
    }
  }

  // 4. Priority qualifiers
  if (!tags.includes("desqualificado") && !tags.includes("atenção_reprovado")) {
    if (trackId === "T2") {
      const leadText = (answers.trackAnswers["t2_q14"] as string) || "";
      if (leadText.trim().length > 80) {
        tags.push("prioritario");
      }
    }
    
    if (trackId === "T6" && answers.trackAnswers["t6_q3"] === "Sim, eu escrevi e posso provar") {
      tags.push("prioritario");
    }

    if (tags.length === 0) {
      tags.push("qualificado");
    }
  }

  return tags;
}

// URL Pre-selection Parser
export function parseUrlPreselection(): {
  vaga?: RoleCategory;
  copywriterTipo?: "Criativos" | "VSL";
  editorTipo?: "Criativos" | "VSL";
  trafegoNivel?: "Junior" | "Senior";
  trilhaId?: TrackId;
} {
  if (typeof window === "undefined") return {};

  const urlParams = new URLSearchParams(window.location.search);
  const param = (urlParams.get("vaga") || urlParams.get("trilha") || urlParams.get("role") || "").toLowerCase();

  if (!param) return {};

  if (param.includes("copy-vsl") || param.includes("copywriter-vsl") || param === "t2") {
    return { vaga: "Copywriter", copywriterTipo: "VSL", trilhaId: "T2" };
  }
  if (param.includes("copy-criativos") || param.includes("copywriter-criativos") || param === "t1") {
    return { vaga: "Copywriter", copywriterTipo: "Criativos", trilhaId: "T1" };
  }
  if (param.includes("editor-vsl") || param === "t4") {
    return { vaga: "Editor de vídeo", editorTipo: "VSL", trilhaId: "T4" };
  }
  if (param.includes("editor-criativo") || param === "t3") {
    return { vaga: "Editor de vídeo", editorTipo: "Criativos", trilhaId: "T3" };
  }
  if (param.includes("trafego-junior") || param.includes("junior") || param === "t5") {
    return { vaga: "Gestor de tráfego", trafegoNivel: "Junior", trilhaId: "T5" };
  }
  if (param.includes("trafego-senior") || param.includes("senior") || param.includes("pleno") || param === "t6") {
    return { vaga: "Gestor de tráfego", trafegoNivel: "Senior", trilhaId: "T6" };
  }
  if (param.includes("gestor-projetos") || param.includes("projetos") || param === "t7") {
    return { vaga: "Gestor de projetos", trilhaId: "T7" };
  }

  return {};
}

// LocalStorage candidates persistence
export function getStoredCandidates(): CandidateSubmission[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CANDIDATES);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error("Error reading candidates from localStorage:", err);
    return [];
  }
}

export function saveCandidateLocally(submission: CandidateSubmission): void {
  if (typeof window === "undefined") return;
  try {
    const current = getStoredCandidates();
    const updated = [submission, ...current];
    localStorage.setItem(STORAGE_KEY_CANDIDATES, JSON.stringify(updated));
  } catch (err) {
    console.error("Error saving candidate to localStorage:", err);
  }
}

// LocalStorage draft persistence
export function saveFormDraft(data: { step: number; answers: CandidateAnswers }): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY_DRAFT, JSON.stringify(data));
  } catch (err) {
    console.error("Error saving form draft:", err);
  }
}

export function getFormDraft(): { step: number; answers: CandidateAnswers } | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_DRAFT);
    return raw ? JSON.parse(raw) : null;
  } catch (err) {
    return null;
  }
}

export function clearFormDraft(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEY_DRAFT);
  } catch (err) {
    console.error("Error clearing form draft:", err);
  }
}

// Send Webhook to DOMINUS recruitment server
export async function sendSubmissionWebhook(submission: CandidateSubmission): Promise<boolean> {
  const payload = {
    tipo_formulario: "DOMINUS Candidatura - Fluxo Condicional",
    vaga_aplicada: submission.vaga,
    especialidade: submission.especialidade,
    trilha_id: submission.trackId,
    cobertura_dupla: submission.coberturaDupla || false,
    timestamp: submission.timestamp,
    data_formatada: submission.dataFormatted,
    status_qualificacao: submission.tags,
    candidato: {
      nome: submission.answers.nome,
      instagram: submission.answers.instagram,
      whatsapp: submission.answers.whatsapp,
      idade: submission.answers.idade,
      tem_cnpj: submission.answers.temCnpj,
      pretensao_salarial: submission.answers.pretensaoSalarial || "Não informada / Fixo 2k",
      full_time_exclusivo: submission.answers.fullTimeExclusivo,
      trabalhando_atualmente: submission.answers.trabalhandoAtualmente,
      tempo_inicio: submission.answers.tempoInicio,
      motivo_saida: submission.answers.motivoSaida,
      flexibilidade_horarios: submission.answers.flexibilidadeHorarios,
      comentario_finais_semana: submission.answers.comentarioFinaisDeSemana || "",
      escalou_seis_digitos: submission.answers.escalouSeisDigitos || "",
      detalhe_seis_digitos: submission.answers.detalheSeisDigitos || "",
      como_conheceu: submission.answers.comoConheceu,
      destaque_importante: submission.answers.destaqueImportante || "",
      teste_atencao: {
        palavra_esperada: getTestWordForTrack(submission.trackId),
        palavra_invertida_esperada: reverseString(getTestWordForTrack(submission.trackId)),
        resposta_candidato: submission.answers.testeAtencaoResposta,
        correto: submission.tags.includes("atenção_reprovado") ? false : true,
      }
    },
    respostas_trilha: submission.answers.trackAnswers,
    metadata: {
      page_url: typeof window !== "undefined" ? window.location.href : "",
      user_agent: typeof navigator !== "undefined" ? navigator.userAgent : "",
      language: typeof navigator !== "undefined" ? navigator.language : "",
      screen_resolution: typeof window !== "undefined" ? `${window.innerWidth}x${window.innerHeight}` : "",
    }
  };

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return response.ok;
  } catch (err) {
    console.error("Webhook submission error:", err);
    return false; // non-blocking for user UI
  }
}

// Convert candidate list to CSV string for export
export function exportCandidatesToCSV(candidates: CandidateSubmission[]): string {
  if (candidates.length === 0) return "";

  const headers = [
    "ID",
    "Data",
    "Nome",
    "Instagram",
    "WhatsApp",
    "Vaga",
    "Especialidade/Trilha",
    "Tags Qualificação",
    "Idade",
    "CNPJ",
    "Pretensão Salarial",
    "Full Time Exclusivo",
    "Início",
    "Teste Atenção"
  ];

  const rows = candidates.map((c) => [
    c.id,
    c.dataFormatted,
    `"${c.answers.nome.replace(/"/g, '""')}"`,
    `"${c.answers.instagram.replace(/"/g, '""')}"`,
    `"${c.answers.whatsapp.replace(/"/g, '""')}"`,
    `"${c.vaga}"`,
    `"${c.especialidade} (${c.trackId})"`,
    `"${c.tags.join(", ")}"`,
    c.answers.idade || "",
    `"${c.answers.temCnpj}"`,
    `"${c.answers.pretensaoSalarial || ""}"`,
    `"${c.answers.fullTimeExclusivo}"`,
    `"${c.answers.tempoInicio}"`,
    `"${c.answers.testeAtencaoResposta}"`
  ]);

  return [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
}
