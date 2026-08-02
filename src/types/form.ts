export type QuestionType = 
  | "curto" 
  | "longo" 
  | "unica" 
  | "multipla" 
  | "numero" 
  | "link" 
  | "telefone"
  | "checkbox";

export type RoleCategory = 
  | "Copywriter" 
  | "Editor de vídeo" 
  | "Gestor de tráfego" 
  | "Gestor de projetos";

export type TrackId = 
  | "T1" // Copywriter de criativos
  | "T2" // Copywriter de VSL
  | "T3" // Editor de vídeo de criativos
  | "T4" // Editor de vídeo de VSL
  | "T5" // Gestor de tráfego júnior
  | "T6" // Gestor de tráfego pleno/sênior
  | "T7"; // Gestor de projetos

export interface OptionItem {
  label: string;
  value: string;
  subFieldPrompt?: string; // Prompt for conditional sub-question when selected
}

export interface Question {
  id: string;
  label: string;
  type: QuestionType;
  options?: string[] | OptionItem[];
  placeholder?: string;
  required?: boolean;
  helpText?: string;
  conditionalSubQuestion?: {
    triggerValue: string; // e.g. "Sim"
    id: string;
    label: string;
    type: QuestionType;
    placeholder?: string;
  };
}

export interface TrackConfig {
  id: TrackId;
  title: string;
  roleName: string;
  description: string;
  testWord: string; // For Attention test (e.g., DISCIPLINA, CRIATIVO, ESCRITA, PROCESSO)
  questions: Question[];
}

export interface CandidateAnswers {
  // Bloco 0 - Abertura
  nome: string;
  instagram: string;
  whatsapp: string;

  // Bloco 1 - Roteamento
  vaga: RoleCategory | "";
  copywriterTipo?: "Criativos" | "VSL" | "Os dois";
  editorTipo?: "Criativos" | "VSL" | "Os dois";
  copywriterMaisForte?: "Criativos" | "VSL";
  editorMaisForte?: "Criativos" | "VSL";
  trafegoNivel?: "Junior" | "Senior";
  trilhaId: TrackId | "";

  // Bloco 2 - Respostas da Trilha
  trackAnswers: Record<string, string | string[]>;

  // Bloco 3 - Disponibilidade e Dinheiro
  fullTimeExclusivo: "Sim" | "Não" | "";
  trabalhandoAtualmente: "Sim" | "Não" | "";
  tempoInicio: "Imediatamente" | "Em até 15 dias" | "Em até 30 dias" | "Mais de 30 dias" | "";
  motivoSaida: string;
  flexibilidadeHorarios: "Sim" | "Não" | "";
  comentarioFinaisDeSemana?: string;
  escalouSeisDigitos?: "Sim" | "Não" | "";
  detalheSeisDigitos?: string;
  pretensaoSalarial?: string;

  // Bloco 4 - Fechamento
  comoConheceu: "Instagram" | "Indicação" | "Grupo/comunidade" | "Anúncio" | "Outro" | "";
  testeAtencaoResposta: string;
  destaqueImportante?: string;
  idade: number | "";
  temCnpj: "Sim" | "Não" | "Estou em processo de abertura" | "";
  autorizaLgpd: boolean;
}

export type CandidateTag = 
  | "qualificado"
  | "prioritario"
  | "desqualificado"
  | "atenção_reprovado"
  | "abaixo_da_barra"
  | "fora_da_faixa";

export interface CandidateSubmission {
  id: string;
  timestamp: string;
  dataFormatted: string;
  trackId: TrackId;
  vaga: string;
  especialidade: string;
  coberturaDupla?: boolean;
  tags: CandidateTag[];
  answers: CandidateAnswers;
}
