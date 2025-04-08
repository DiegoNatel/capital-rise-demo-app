
export const binanceRequirements = [
  { 
    id: "project_quality", 
    label: "Qualidade do Projeto", 
    description: "Avaliação técnica, equipe, e utilidade do token",
    required: true
  },
  { 
    id: "legal_compliance", 
    label: "Conformidade Legal", 
    description: "Verificação de que o token não é um security não registrado",
    required: true
  },
  { 
    id: "liquidity", 
    label: "Liquidez e Volume de Negociação", 
    description: "Demonstração de interesse e atividade no mercado",
    required: true
  },
  { 
    id: "security_audit", 
    label: "Segurança", 
    description: "Auditoria de smart contracts e avaliação de riscos",
    required: true
  },
  { 
    id: "white_paper", 
    label: "White Paper", 
    description: "Documento detalhado explicando o projeto, tecnologia e tokenomics",
    required: true
  },
  { 
    id: "community", 
    label: "Comunidade Ativa", 
    description: "Base de usuários engajada e presente em redes sociais",
    required: false
  },
  { 
    id: "market_maker", 
    label: "Market Maker", 
    description: "Parceria com um market maker para garantir liquidez",
    required: false
  },
];
