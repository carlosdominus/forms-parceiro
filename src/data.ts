import { ExpertProfile, TeamMember } from "./types";

export const BASE_IMG_URL = "https://dominus.site/slides/mariana/img";

export const IMAGES = {
  placas: `${BASE_IMG_URL}/placas-hori_converted_converted.webp`,
  vslCariani: `${BASE_IMG_URL}/vsl-cariani.png`,
  vslGuto: `${BASE_IMG_URL}/vsl-guto.png`,
  vslIsa: `${BASE_IMG_URL}/vsl-isa.png`,
  instaRenato: `${BASE_IMG_URL}/insta-renato.png`,
  instaGuto: `${BASE_IMG_URL}/insta-guto.png`,
  instaIsadora: `${BASE_IMG_URL}/insta-isadora.png`,
};

export const EXPERTS: ExpertProfile[] = [
  {
    name: "Renato Cariani",
    handle: "@renato_cariani",
    followers: "14M+",
    instaImg: IMAGES.instaRenato,
    vslImg: IMAGES.vslCariani,
    niche: "Fitness & Suplementos",
    results: "Vendas multimilionárias integrando conteúdo, VSL e marcas parceiras."
  },
  {
    name: "Guto Galamba",
    handle: "@gutogalamba",
    followers: "1M+",
    instaImg: IMAGES.instaGuto,
    vslImg: IMAGES.vslGuto,
    niche: "Desenvolvimento Pessoal & Mentorias",
    results: "Autoridade gigante e funis de VSL convertendo leads frios diariamente."
  },
  {
    name: "Isadora Nogueira",
    handle: "@isadora.nogueiraoff",
    followers: "2.7M+",
    instaImg: IMAGES.instaIsadora,
    vslImg: IMAGES.vslIsa,
    niche: "Beleza, Negócios & Autocuidado",
    results: "Escala massiva usando ganchos impactantes direcionando para vídeo de vendas."
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Gilberto",
    role: "Copywriter & Estrategista de Conversão",
    description: "Especialista em construir narrativas de altíssimo impacto, pesquisar ângulos virais, roteirizar VSLs milionárias e estruturar o funil que maximiza o sentimento de valor do seu produto.",
    iconName: "PenTool"
  },
  {
    name: "Felipe",
    role: "Estrategista de Tráfego & Operação",
    description: "Coordenador dos canais de atração paga, estruturação técnica das páginas, otimização de campanhas de anúncios, infraestrutura de escala e integrações do funil.",
    iconName: "TrendingUp"
  },
  {
    name: "Time de Suporte Otimizado",
    role: "Editores, Designer & Atendimento",
    description: "Equipe especializada pronta para editar seus vídeos com os melhores ganchos de retenção, desenhar páginas de carregamento sub-segundo, gerenciar o suporte de alunos e ativar as ferramentas necessárias.",
    iconName: "Users"
  }
];

export const MARIANA_POSTS_ANALYSIS = [
  {
    type: "positive-format-1",
    title: "Post de Sucesso 1: Sentada em Consulta",
    views: "110.000 Visualizações",
    subtitle: "Formato Sentada na Consulta + Frase de Impacto no Topo",
    goodPoints: [
      "Quebra de barreira visual (Mariana em seu habitat profissional gera autoridade instantânea)",
      "A promessa do topo engaja diretamente na dor do público que busca emagrecer com rotina corrida"
    ],
    comparisonTitle: "Como o Maior do Nicho de Escala Faz:",
    comparisonTarget: "Bruno Goytacaz (2M+)",
    comparisonDetail: "Identificou o formato campeão de comparação de alimentos e replicou IMEDIATAMENTE (mesmo casaco, mesmo lugar) para surfar a onda do algoritmo de forma sequencial.",
    ourFeedback: "Sua segunda postagem similar saiu 3 a 4 semanas depois, o que quebrou o embalo do algoritmo. Além disso, o ângulo de promessa mudou de 'rotina corrida' (dor principal) para '4 refeições que eu faria' (solução vaga).",
    suggestedHeadlines: [
      "'4 refeições para emagrecer mesmo com a rotina corrida'",
      "'4 refeições que eu faria para secar e definir mesmo com a rotina corrida'"
    ]
  },
  {
    type: "positive-format-2",
    title: "Post de Sucesso 2: Top 10 Alimentos/Dicas",
    views: "30.000 Visualizações",
    subtitle: "Formato Educacional de Alto Alcance",
    goodPoints: [
      "Conteúdo prático de altíssima qualidade técnica",
      "Gera salvamentos e compartilhamentos por ser muito útil"
    ],
    comparisonTitle: "O Detalhe Crítico do Início:",
    comparisonTarget: "O Gancho de 3 Segundos",
    comparisonDetail: "Faltou um gatilho de padrão de quebra (pattern interrupt) no início para segurar o usuário que scrolla freneticamente nos primeiros 3 segundos.",
    ourFeedback: "Com nossa estrutura de copywriting profissional, criamos um gancho visual de 3 segundos que retém instantaneamente o lead, aumentando em até 10x o alcance deste mesmo estilo de postagem.",
    suggestedHeadlines: [
      "'Nunca faça isso antes de comer...' (Imagem piscando)",
      "'Parados no mercado!' (Começo movimentado)"
    ]
  }
];
