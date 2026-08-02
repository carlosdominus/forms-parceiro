import { TrackConfig, TrackId } from "../types/form";

export const TRACKS: Record<TrackId, TrackConfig> = {
  T1: {
    id: "T1",
    title: "Copywriter de Criativos",
    roleName: "Copywriter",
    description: "Produção diária de ganchos, roteiros e variações de anúncios de alta conversão.",
    testWord: "ESCRITA",
    questions: [
      {
        id: "t1_q2",
        label: "Já fez algum curso de copywriting? Se sim, quais?",
        type: "longo",
        placeholder: "Cites cursos, mentorias ou livros principais...",
        required: true,
      },
      {
        id: "t1_q3",
        label: "Para quais nichos você já escreveu e qual tipo de produto? (info, nutra, etc.)",
        type: "longo",
        placeholder: "Ex: Saude, emagrecimento (nutra), desenvolvimento pessoal (infoproduto)...",
        required: true,
      },
      {
        id: "t1_q4",
        label: "Em quais idiomas você escreve?",
        type: "multipla",
        options: ["Português", "Inglês", "Espanhol", "Outro"],
        required: true,
      },
      {
        id: "t1_q5",
        label: "Qual a sua experiência com o mercado de DR (Direct Response)?",
        type: "longo",
        placeholder: "Explique seu nível de vivência em ofertas diretas...",
        required: true,
      },
      {
        id: "t1_q6",
        label: "Já trabalhou com produção diária de criativos? Quantos normalmente produz em um dia?",
        type: "unica",
        options: [
          "Nunca produzi em volume diário",
          "Até 5/dia",
          "6 a 10/dia",
          "11 a 15/dia",
          "Mais de 15/dia"
        ],
        required: true,
      },
      {
        id: "t1_q7",
        label: "Esses criativos eram roteiros novos ou variações de um que já rodava?",
        type: "unica",
        options: [
          "Só variações",
          "Mais variações que novos",
          "Metade e metade",
          "Na maioria roteiros novos"
        ],
        required: true,
      },
      {
        id: "t1_q8",
        label: "Você escreve a partir de briefing pronto ou também faz a pesquisa e a big idea?",
        type: "unica",
        options: [
          "Só executo briefing",
          "Faço as duas coisas",
          "Sou eu quem cria a big idea"
        ],
        required: true,
      },
      {
        id: "t1_q9",
        label: "Como funciona sua relação com o editor? Você entrega roteiro, referência visual, as duas coisas?",
        type: "longo",
        placeholder: "Detalhe como organiza e orienta a edição...",
        required: true,
      },
      {
        id: "t1_q10",
        label: "Você acompanha as métricas dos seus criativos (CTR, hook rate, CPA) e reescreve com base nelas?",
        type: "unica",
        options: [
          "Sim, é minha rotina",
          "Já fiz, mas não sempre",
          "Nunca tive acesso às métricas"
        ],
        required: true,
      },
      {
        id: "t1_q11",
        label: "Descreva em até 3 parágrafos a sua última experiência profissional e as suas responsabilidades.",
        type: "longo",
        placeholder: "Resuma sua atuação anterior e conquistas...",
        required: true,
      },
      {
        id: "t1_q12",
        label: "Se tiver portfólio ou amostras de textos, compartilhe o link (lembre-se de deixar o link aberto)",
        type: "link",
        placeholder: "https://drive.google.com/...",
        required: true,
      }
    ]
  },

  T2: {
    id: "T2",
    title: "Copywriter de VSL",
    roleName: "Copywriter",
    description: "Criação de cartas de vendas em vídeo (VSLs) de alta retenção e conversão em massa.",
    testWord: "ESCRITA",
    questions: [
      {
        id: "t2_q2",
        label: "Já fez algum curso de copywriting? Se sim, quais?",
        type: "longo",
        placeholder: "Listar cursos, mentorias...",
        required: true,
      },
      {
        id: "t2_q3",
        label: "Para quais nichos você já escreveu e qual tipo de produto? (info, nutra, etc.)",
        type: "longo",
        placeholder: "Detalhe seus nichos e modelos de oferta...",
        required: true,
      },
      {
        id: "t2_q4",
        label: "Em quais idiomas você escreve?",
        type: "multipla",
        options: ["Português", "Inglês", "Espanhol", "Outro"],
        required: true,
      },
      {
        id: "t2_q5",
        label: "Quantas VSLs completas você já escreveu do zero?",
        type: "unica",
        options: ["Nenhuma ainda", "1 a 3", "4 a 10", "Mais de 10"],
        required: true,
      },
      {
        id: "t2_q6",
        label: "Você já escreveu uma VSL que vendeu pelo menos 6 dígitos?",
        type: "unica",
        options: ["Sim", "Não"],
        required: true,
        conditionalSubQuestion: {
          triggerValue: "Sim",
          id: "t2_q6a",
          label: "Qual era o produto/nicho, qual foi o faturamento aproximado e como você consegue comprovar?",
          type: "longo",
          placeholder: "Detalhes de faturamento e comprovação..."
        }
      },
      {
        id: "t2_q7",
        label: "Você escreve do zero, adapta/traduz VSL gringa, ou os dois?",
        type: "unica",
        options: ["Escrevo do zero", "Adapto e traduzo", "Os dois"],
        required: true,
      },
      {
        id: "t2_q8",
        label: "Qual estrutura você costuma usar para montar uma VSL? (lead, mecanismo, prova, oferta, fechamento)",
        type: "longo",
        placeholder: "Explicite suas etapas de narrativa...",
        required: true,
      },
      {
        id: "t2_q9",
        label: "Qual seu prazo médio para entregar a primeira versão de uma VSL completa?",
        type: "unica",
        options: ["Até 3 dias", "4 a 7 dias", "8 a 15 dias", "Mais de 15 dias"],
        required: true,
      },
      {
        id: "t2_q10",
        label: "Você sabe ler métricas de VSL (retenção, ponto de queda, CPA) e reescrever trechos com base nelas?",
        type: "unica",
        options: ["Sim, é minha rotina", "Já fiz algumas vezes", "Nunca tive acesso"],
        required: true,
      },
      {
        id: "t2_q11",
        label: "Você também escreve os criativos que alimentam a VSL ou só a VSL?",
        type: "unica",
        options: ["Só VSL", "As duas coisas"],
        required: true,
      },
      {
        id: "t2_q12",
        label: "Descreva em até 3 parágrafos a sua última experiência profissional e as suas responsabilidades.",
        type: "longo",
        placeholder: "Sua bagagem e histórico de trabalho...",
        required: true,
      },
      {
        id: "t2_q13",
        label: "Compartilhe o link de 1 VSL sua (roteiro em doc ou vídeo no ar) — deixe o link aberto",
        type: "link",
        placeholder: "https://docs.google.com/...",
        required: true,
      },
      {
        id: "t2_q14",
        label: "Escreva aqui o lead (primeiros 30 segundos) de uma VSL para um suplemento de emagrecimento. Máximo 10 linhas.",
        type: "longo",
        placeholder: "Escreva seu gancho e lead persuasivo aqui...",
        required: true,
        helpText: "Demonstre seu poder de gancho e retenção nos primeiros segundos.",
      }
    ]
  },

  T3: {
    id: "T3",
    title: "Editor de Vídeo de Criativos",
    roleName: "Editor de vídeo",
    description: "Edição dinâmica de criativos para anúncios com retenção, ritmo e ganchos fortes.",
    testWord: "CRIATIVO",
    questions: [
      {
        id: "t3_q1",
        label: "Há quanto tempo você atua como editor de vídeo?",
        type: "unica",
        options: ["Menos de 1 ano", "1 a 2 anos", "2 a 4 anos", "Mais de 4 anos"],
        required: true,
      },
      {
        id: "t3_q2",
        label: "Já fez algum curso de edição? Se sim, quais?",
        type: "longo",
        placeholder: "Cursos, escolas ou especializações...",
        required: true,
      },
      {
        id: "t3_q3",
        label: "Quais softwares de edição você domina?",
        type: "multipla",
        options: ["Premiere", "After Effects", "DaVinci Resolve", "CapCut", "Final Cut", "Photoshop", "Illustrator", "Outro"],
        required: true,
      },
      {
        id: "t3_q4",
        label: "Qual a capacidade do seu equipamento atual (computador/notebook) para renderizações intensas e volume elevado?",
        type: "longo",
        placeholder: "Modelo, processador, placa de vídeo, HD/SSD e memória RAM...",
        required: true,
      },
      {
        id: "t3_q5",
        label: "Sua internet aguenta subir e baixar arquivos pesados todo dia? Qual a velocidade?",
        type: "curto",
        placeholder: "Ex: 500 Mega Fibra (100 Upload)...",
        required: true,
      },
      {
        id: "t3_q6",
        label: "Quantos criativos novos você consegue entregar por dia?",
        type: "unica",
        options: ["Até 3", "4 a 8", "9 a 15", "Mais de 15"],
        required: true,
      },
      {
        id: "t3_q7",
        label: "Você edita a partir de roteiro pronto ou também propõe a ideia e o corte?",
        type: "unica",
        options: ["Só executo roteiro", "Faço as duas coisas", "Costumo criar a ideia"],
        required: true,
      },
      {
        id: "t3_q8",
        label: "Tem experiência com lip sync e IA?",
        type: "unica",
        options: ["Sim", "Não"],
        required: true,
        conditionalSubQuestion: {
          triggerValue: "Sim",
          id: "t3_q8a",
          label: "Quais ferramentas você usa?",
          type: "longo",
          placeholder: "Ex: HeyGen, SyncLabs, ElevenLabs, Runway..."
        }
      },
      {
        id: "t3_q9",
        label: "Como você avalia a sua habilidade como editor de vídeo?",
        type: "unica",
        options: [
          "Sei apenas o básico",
          "Já editei, domino as principais ferramentas, mas não me considero um editor de primeira linha ainda",
          "Dou aula, domino todas as ferramentas e estou pronto para fazer tudo o que me pedirem"
        ],
        required: true,
      },
      {
        id: "t3_q10",
        label: "Por favor, compartilhe o link do seu portfólio com exemplos de criativos (link do Google Drive com permissão aberta)",
        type: "link",
        placeholder: "https://drive.google.com/...",
        required: true,
      }
    ]
  },

  T4: {
    id: "T4",
    title: "Editor de Vídeo de VSL",
    roleName: "Editor de vídeo",
    description: "Edição técnica de VSLs longas, ritmo, gráficos de oferta, prova social e sincronização IA.",
    testWord: "CRIATIVO",
    questions: [
      {
        id: "t4_q1",
        label: "Há quanto tempo você atua como editor de vídeo?",
        type: "unica",
        options: ["Menos de 1 ano", "1 a 2 anos", "2 a 4 anos", "Mais de 4 anos"],
        required: true,
      },
      {
        id: "t4_q2",
        label: "Já fez algum curso de edição? Se sim, quais?",
        type: "longo",
        placeholder: "Fontes de estudo e aperfeiçoamento...",
        required: true,
      },
      {
        id: "t4_q3",
        label: "Quais softwares de edição você domina?",
        type: "multipla",
        options: ["Premiere", "After Effects", "DaVinci Resolve", "CapCut", "Final Cut", "Photoshop", "Illustrator", "Outro"],
        required: true,
      },
      {
        id: "t4_q4",
        label: "Qual a capacidade do seu equipamento atual para renderizações intensas e volume elevado?",
        type: "longo",
        placeholder: "Configuração do seu PC/Mac (CPU, GPU, RAM, SSD)...",
        required: true,
      },
      {
        id: "t4_q5",
        label: "Sua internet aguenta subir e baixar arquivos pesados todo dia? Qual a velocidade?",
        type: "curto",
        placeholder: "Ex: 600 Mega Fibra...",
        required: true,
      },
      {
        id: "t4_q6",
        label: "Quantas VSLs completas você já editou do zero?",
        type: "unica",
        options: ["Nenhuma ainda", "1 a 3", "4 a 10", "Mais de 10"],
        required: true,
      },
      {
        id: "t4_q7",
        label: "Tem experiência com lip sync e IA?",
        type: "unica",
        options: ["Sim", "Não"],
        required: true,
        conditionalSubQuestion: {
          triggerValue: "Sim",
          id: "t4_q7a",
          label: "Quais ferramentas você usa?",
          type: "longo",
          placeholder: "Ferramentas de IA para lip-sync e áudio..."
        }
      },
      {
        id: "t4_q8",
        label: "Qual o prazo médio que você leva para fazer lip sync e editar uma VSL de 45 a 50 minutos?",
        type: "unica",
        options: ["Até 2 dias", "3 a 5 dias", "6 a 10 dias", "Mais de 10 dias"],
        required: true,
      },
      {
        id: "t4_q9",
        label: "Você domina B-roll, legenda dinâmica, prova social em tela e gráficos de oferta?",
        type: "longo",
        placeholder: "Comente sua experiência nesses elementos visuais...",
        required: true,
      },
      {
        id: "t4_q10",
        label: "Como você avalia a sua habilidade como editor de vídeo?",
        type: "unica",
        options: [
          "Sei apenas o básico",
          "Já editei, domino as principais ferramentas, mas não me considero um editor de primeira linha ainda",
          "Dou aula, domino todas as ferramentas e estou pronto para fazer tudo o que me pedirem"
        ],
        required: true,
      },
      {
        id: "t4_q11",
        label: "Por favor, compartilhe o link do seu portfólio com exemplos de VSLs e criativos (link do Google Drive com acesso liberado)",
        type: "link",
        placeholder: "https://drive.google.com/...",
        required: true,
      }
    ]
  },

  T5: {
    id: "T5",
    title: "Gestor de Tráfego Júnior",
    roleName: "Gestor de tráfego",
    description: "Vaga de entrada com treinamento interno, rotina operacional consistente em Ads.",
    testWord: "DISCIPLINA",
    questions: [
      {
        id: "t5_q1",
        label: "Por que você tem interesse em trabalhar com tráfego pago — TikTok/Facebook Ads?",
        type: "longo",
        placeholder: "Sua motivação para entrar na área...",
        required: true,
      },
      {
        id: "t5_q2",
        label: "O que você sabe hoje sobre tráfego pago — TikTok/Facebook Ads? (mesmo que seja pouco)",
        type: "longo",
        placeholder: "Sua bagagem teórica e prática atual...",
        required: true,
      },
      {
        id: "t5_q3",
        label: "Você se sente confortável em executar tarefas operacionais repetitivas diariamente, mantendo disciplina e atenção aos detalhes?",
        type: "unica",
        options: ["Sim", "Não"],
        required: true,
      },
      {
        id: "t5_q4",
        label: "Você já teve contato com alguma dessas ferramentas?",
        type: "multipla",
        options: [
          "TikTok Ads",
          "Facebook Ads",
          "ClickUp",
          "AdsPower",
          "RedTrack",
          "Utmify",
          "Canva",
          "Google Planilhas",
          "Nenhuma ainda"
        ],
        required: true,
      },
      {
        id: "t5_q5",
        label: "Quais são suas expectativas de aprendizado e crescimento nos próximos 12 meses?",
        type: "longo",
        placeholder: "Seus objetivos na DOMINUS...",
        required: true,
      },
      {
        id: "t5_q6",
        label: "Como você lida quando precisa aprender algo novo rapidamente?",
        type: "longo",
        placeholder: "Sua postura diante de novos desafios...",
        required: true,
      },
      {
        id: "t5_q7",
        label: "Quais hábitos do seu dia a dia demonstram sua disciplina e consistência?",
        type: "longo",
        placeholder: "Rotina pessoal e compromisso...",
        required: true,
      },
      {
        id: "t5_q8",
        label: "Tem algum curso, certificação, hobby ou experiência (mesmo que pequena) relacionada a marketing, TikTok Ads, Facebook Ads ou análise de dados que gostaria de destacar?",
        type: "longo",
        placeholder: "Destaques e aprendizados prévios...",
        required: true,
      },
      {
        id: "t5_q9",
        label: "Já fez parte de algum projeto antes? Se sim, quanto investiu em tráfego?",
        type: "unica",
        options: [
          "Este será meu primeiro projeto",
          "+10k",
          "+100k",
          "+1M"
        ],
        required: true,
      },
      {
        id: "t5_q10",
        label: "Compartilhe algo sobre você que acredita que pode te diferenciar nessa vaga",
        type: "longo",
        placeholder: "Seu diferencial pessoal...",
        required: true,
      },
      {
        id: "t5_q11",
        label: "O salário inicial é de R$ 2.000,00 mensal. Está disposto a iniciar com esse valor e posteriormente ter oportunidade de crescer na empresa?",
        type: "unica",
        options: ["Sim", "Não"],
        required: true,
      }
    ]
  },

  T6: {
    id: "T6",
    title: "Gestor de Tráfego Pleno/Sênior",
    roleName: "Gestor de tráfego",
    description: "Escala agressiva de orçamento, verba diária alta e histórico comprovado em Direct Response.",
    testWord: "DISCIPLINA",
    questions: [
      {
        id: "t6_q2",
        label: "Quais plataformas você domina?",
        type: "multipla",
        options: ["Facebook/Meta Ads", "TikTok Ads", "Google Ads", "YouTube", "Native (Taboola/Outbrain)", "Outra"],
        required: true,
      },
      {
        id: "t6_q3",
        label: "Um dos requisitos é que você tenha um faturamento comprovado de múltiplos 6 dígitos gerados com seus ADs (acima de R$ 200.000) no mercado de Direct Response.",
        type: "unica",
        options: ["Sim, eu escrevi e posso provar", "Ainda não atingi esse resultado"],
        required: true,
        conditionalSubQuestion: {
          triggerValue: "Sim, eu escrevi e posso provar",
          id: "t6_q3a",
          label: "Qual era o produto/nicho, em que período, e como você comprova?",
          type: "longo",
          placeholder: "Detalhamento de produto, faturamento e provas de dashboard..."
        }
      },
      {
        id: "t6_q4",
        label: "Qual o maior budget diário que você já gerenciou sozinho?",
        type: "unica",
        options: ["Até R$ 500/dia", "R$ 500 a 2k/dia", "R$ 2k a 10k/dia", "Mais de R$ 10k/dia"],
        required: true,
      },
      {
        id: "t6_q5",
        label: "Para quais países e nichos você já rodou?",
        type: "longo",
        placeholder: "Ex: Brasil, EUA, Europa; Nutra, Info, Black/White...",
        required: true,
      },
      {
        id: "t6_q6",
        label: "Descreva a estrutura de conta que você usa para escalar (CBO/ABO, número de campanhas, escala horizontal vs vertical)",
        type: "longo",
        placeholder: "Descreva seu método prático de escala...",
        required: true,
      },
      {
        id: "t6_q7",
        label: "Como você decide matar ou escalar um criativo? Quais métricas olha e em quanto tempo?",
        type: "longo",
        placeholder: "CPA, CTR, Hook Rate, Hold Rate, ROAS...",
        required: true,
      },
      {
        id: "t6_q8",
        label: "Quais ferramentas de tracking e gestão você domina?",
        type: "multipla",
        options: ["RedTrack", "Voluum", "Utmify", "Hyros", "AdsPower", "ClickUp", "Google Planilhas", "Outra"],
        required: true,
      },
      {
        id: "t6_q9",
        label: "Você já cuidou de BMs, contas e reativação de contas bloqueadas?",
        type: "unica",
        options: ["Sim, faço isso sozinho", "Já ajudei, mas não domino", "Nunca cuidei disso"],
        required: true,
      },
      {
        id: "t6_q10",
        label: "Como é a sua relação com o time de copy e edição? Você briefa criativo, pede ângulo novo, participa da análise?",
        type: "longo",
        placeholder: "Descreva sua integração no ecossistema...",
        required: true,
      },
      {
        id: "t6_q11",
        label: "Descreva o melhor resultado que você já entregou: produto, verba, faturamento e período.",
        type: "longo",
        placeholder: "O maior case da sua carreira em tráfego...",
        required: true,
      },
      {
        id: "t6_q12",
        label: "Compartilhe prints de gerenciador ou dashboard que comprovem seus resultados (link do Google Drive com permissão aberta)",
        type: "link",
        placeholder: "https://drive.google.com/...",
        required: true,
      }
    ]
  },

  T7: {
    id: "T7",
    title: "Gestor de Projetos e Operação",
    roleName: "Gestor de projetos",
    description: "Gestão de fluxos de produção diária em Direct Response, prazos e garantia de entregas.",
    testWord: "PROCESSO",
    questions: [
      {
        id: "t7_q1",
        label: "Há quanto tempo você atua com gestão de projetos ou de operação?",
        type: "unica",
        options: ["Menos de 1 ano", "1 a 2 anos", "2 a 4 anos", "Mais de 4 anos"],
        required: true,
      },
      {
        id: "t7_q2",
        label: "Já geriu um time de marketing? Quantas pessoas e quais funções?",
        type: "longo",
        placeholder: "Tamanho do time e funções coordenadas...",
        required: true,
      },
      {
        id: "t7_q3",
        label: "Qual a sua experiência com o mercado de DR (Direct Response)?",
        type: "longo",
        placeholder: "Sua bagagem em operações de resposta direta...",
        required: true,
      },
      {
        id: "t7_q4",
        label: "Quais ferramentas de gestão você domina?",
        type: "multipla",
        options: ["ClickUp", "Notion", "Trello", "Asana", "Monday", "Slack", "Google Workspace", "Outra"],
        required: true,
      },
      {
        id: "t7_q5",
        label: "Descreva como você organizaria a rotina de um time que precisa entregar 15 criativos novos por dia (copy + edição + subida)",
        type: "longo",
        placeholder: "Passo a passo prático de organização da esteira...",
        required: true,
        helpText: "Mini-teste prático: demonstre sua visão de processo e rotina diária.",
      },
      {
        id: "t7_q6",
        label: "Você já montou processo ou SOP do zero? Descreva um que você criou e o que mudou depois dele.",
        type: "longo",
        placeholder: "Exemplo real de SOP e ganho de eficiência...",
        required: true,
      },
      {
        id: "t7_q7",
        label: "Quais métricas você acompanha para saber se a operação está saudável?",
        type: "longo",
        placeholder: "Gargalos, refações, taxa de cumprimento de prazos...",
        required: true,
      },
      {
        id: "t7_q8",
        label: "O que você faz quando alguém do time atrasa entrega pela terceira vez seguida?",
        type: "longo",
        placeholder: "Abordagem e plano de ação...",
        required: true,
      },
      {
        id: "t7_q9",
        label: "Você se sente confortável cobrando entrega e dando feedback duro?",
        type: "unica",
        options: ["Sim, faço isso naturalmente", "Faço, mas me custa", "Prefiro que outra pessoa faça"],
        required: true,
      },
      {
        id: "t7_q10",
        label: "Como você conduz uma reunião de análise sem que ela vire uma conversa sem decisão?",
        type: "longo",
        placeholder: "Pauta, roteiro, dono da ação e prazos...",
        required: true,
      },
      {
        id: "t7_q11",
        label: "Descreva em até 3 parágrafos a sua última experiência profissional e as suas responsabilidades.",
        type: "longo",
        placeholder: "Resumo do seu histórico profissional recente...",
        required: true,
      }
    ]
  }
};
