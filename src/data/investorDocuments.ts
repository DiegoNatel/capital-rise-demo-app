
import { v4 as uuidv4 } from 'uuid';

export const investorDocuments = [
  {
    id: "doc-001",
    title: "Relatório Anual 2024",
    description: "Relatório financeiro anual com demonstrativos completos",
    company: "TechVision Brasil",
    type: "financial",
    category: "annual",
    publishedAt: "2024-03-15",
    version: "1.2",
    url: "#",
    fileSize: "4.2 MB",
    accessLevel: "public"
  },
  {
    id: "doc-002",
    title: "Relatório Q1 2024",
    description: "Resultados financeiros do primeiro trimestre",
    company: "TechVision Brasil",
    type: "financial",
    category: "quarterly",
    publishedAt: "2024-04-20",
    version: "1.0",
    url: "#",
    fileSize: "2.8 MB",
    accessLevel: "public"
  },
  {
    id: "doc-003",
    title: "Contrato de Investidor",
    description: "Termos e condições para investidores",
    company: "GreenEnergy S.A.",
    type: "legal",
    category: "legal",
    publishedAt: "2023-12-10",
    version: "2.1",
    url: "#",
    fileSize: "1.5 MB",
    accessLevel: "private"
  },
  {
    id: "doc-004",
    title: "Apresentação para Investidores",
    description: "Apresentação da empresa e planos futuros",
    company: "GreenEnergy S.A.",
    type: "presentations",
    category: "presentation",
    publishedAt: "2024-02-28",
    version: "1.3",
    url: "#",
    fileSize: "8.7 MB",
    accessLevel: "public"
  },
  {
    id: "doc-005",
    title: "Prospecto da Oferta",
    description: "Detalhes completos da oferta de tokenização",
    company: "BlockFin Investimentos",
    type: "legal",
    category: "prospectus",
    publishedAt: "2024-01-05",
    version: "1.1",
    url: "#",
    fileSize: "5.3 MB",
    accessLevel: "registered"
  },
  {
    id: "doc-006",
    title: "Relatório ESG 2023",
    description: "Relatório de práticas ambientais, sociais e de governança",
    company: "GreenEnergy S.A.",
    type: "financial",
    category: "annual",
    publishedAt: "2023-12-15",
    version: "1.0",
    url: "#",
    fileSize: "3.9 MB",
    accessLevel: "public"
  },
  {
    id: "doc-007",
    title: "Registro de Acionistas",
    description: "Lista atualizada de acionistas principais",
    company: "BlockFin Investimentos",
    type: "legal",
    category: "legal",
    publishedAt: "2024-03-01",
    version: "4.2",
    url: "#",
    fileSize: "1.2 MB",
    accessLevel: "private"
  },
  {
    id: "doc-008",
    title: "Relatório Q4 2023",
    description: "Resultados financeiros do quarto trimestre",
    company: "TechVision Brasil",
    type: "financial",
    category: "quarterly",
    publishedAt: "2024-01-20",
    version: "1.0",
    url: "#",
    fileSize: "2.5 MB",
    accessLevel: "public"
  },
  {
    id: "doc-009",
    title: "Apresentação Roadshow 2024",
    description: "Apresentação utilizada durante roadshow para investidores",
    company: "TechVision Brasil",
    type: "presentations",
    category: "presentation",
    publishedAt: "2024-02-10",
    version: "1.1",
    url: "#",
    fileSize: "12.3 MB",
    accessLevel: "registered"
  },
  {
    id: "doc-010",
    title: "Balanço Patrimonial 2023",
    description: "Balanço patrimonial detalhado do ano fiscal 2023",
    company: "BlockFin Investimentos",
    type: "financial",
    category: "annual",
    publishedAt: "2024-03-25",
    version: "1.0",
    url: "#",
    fileSize: "3.1 MB",
    accessLevel: "public"
  }
];

export const documentVersions = [
  {
    id: uuidv4(),
    documentId: "doc-001",
    version: 1.2,
    modifiedAt: "2024-03-15T14:30:00Z",
    modifiedBy: "Carlos Silva",
    changeDescription: "Correção de dados financeiros na seção 3.2",
    url: "#"
  },
  {
    id: uuidv4(),
    documentId: "doc-001",
    version: 1.1,
    modifiedAt: "2024-03-10T09:15:00Z",
    modifiedBy: "Maria Oliveira",
    changeDescription: "Adição de gráficos comparativos",
    url: "#"
  },
  {
    id: uuidv4(),
    documentId: "doc-001",
    version: 1.0,
    modifiedAt: "2024-03-05T11:00:00Z",
    modifiedBy: "João Santos",
    changeDescription: "Versão inicial",
    url: "#"
  },
  {
    id: uuidv4(),
    documentId: "doc-003",
    version: 2.1,
    modifiedAt: "2023-12-10T16:45:00Z",
    modifiedBy: "Ana Costa",
    changeDescription: "Atualização de cláusulas legais",
    url: "#"
  },
  {
    id: uuidv4(),
    documentId: "doc-003",
    version: 2.0,
    modifiedAt: "2023-11-28T13:20:00Z",
    modifiedBy: "Ana Costa",
    changeDescription: "Revisão completa do documento",
    url: "#"
  },
  {
    id: uuidv4(),
    documentId: "doc-003",
    version: 1.0,
    modifiedAt: "2023-10-15T10:10:00Z",
    modifiedBy: "Pedro Almeida",
    changeDescription: "Versão inicial",
    url: "#"
  },
  {
    id: uuidv4(),
    documentId: "doc-004",
    version: 1.3,
    modifiedAt: "2024-02-28T09:30:00Z",
    modifiedBy: "Luciana Mendes",
    changeDescription: "Atualização de projeções financeiras",
    url: "#"
  },
  {
    id: uuidv4(),
    documentId: "doc-004",
    version: 1.2,
    modifiedAt: "2024-02-20T14:15:00Z",
    modifiedBy: "Luciana Mendes",
    changeDescription: "Adição de novos slides sobre expansão",
    url: "#"
  },
  {
    id: uuidv4(),
    documentId: "doc-004",
    version: 1.1,
    modifiedAt: "2024-02-10T11:45:00Z",
    modifiedBy: "Roberto Ferreira",
    changeDescription: "Correção de dados e formatação",
    url: "#"
  },
  {
    id: uuidv4(),
    documentId: "doc-004",
    version: 1.0,
    modifiedAt: "2024-02-05T08:30:00Z",
    modifiedBy: "Roberto Ferreira",
    changeDescription: "Versão inicial",
    url: "#"
  }
];

export const documentAccessLevels = [
  {
    id: uuidv4(),
    investorType: "Investidor Individual",
    access: "read",
    enabled: true,
    lastUpdated: "2024-03-01"
  },
  {
    id: uuidv4(),
    investorType: "Investidor Institucional",
    access: "download",
    enabled: true,
    lastUpdated: "2024-03-01"
  },
  {
    id: uuidv4(),
    investorType: "Investidor Qualificado",
    access: "download",
    enabled: true,
    lastUpdated: "2024-03-01"
  },
  {
    id: uuidv4(),
    investorType: "Parceiro Estratégico",
    access: "download",
    enabled: true,
    lastUpdated: "2024-03-01"
  },
  {
    id: uuidv4(),
    investorType: "Visitante Não Registrado",
    access: "none",
    enabled: false,
    lastUpdated: "2024-03-01"
  }
];

export const documentAnalytics = {
  viewsByDocument: [
    { name: "Relatório Anual 2024", views: 245 },
    { name: "Relatório Q1 2024", views: 187 },
    { name: "Apresentação para Investidores", views: 310 },
    { name: "Prospecto da Oferta", views: 162 },
    { name: "Relatório ESG 2023", views: 98 }
  ],
  downloadsByType: [
    { name: "Financeiro", value: 42 },
    { name: "Legal", value: 28 },
    { name: "Apresentação", value: 35 },
    { name: "Prospecto", value: 15 },
    { name: "ESG", value: 10 }
  ],
  accessByInvestorType: [
    { name: "Individual", value: 40 },
    { name: "Institucional", value: 25 },
    { name: "Qualificado", value: 20 },
    { name: "Estratégico", value: 10 },
    { name: "Outro", value: 5 }
  ],
  topDocuments: [
    { name: "Apresentação para Investidores", views: 310 },
    { name: "Relatório Anual 2024", views: 245 },
    { name: "Relatório Q1 2024", views: 187 },
    { name: "Prospecto da Oferta", views: 162 },
    { name: "Relatório ESG 2023", views: 98 }
  ]
};
