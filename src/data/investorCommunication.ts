
export interface Announcement {
  id: string;
  companyId: string;
  companyName: string;
  title: string;
  content: string;
  date: string;
  category: 'general' | 'financial' | 'corporate' | 'product';
  important: boolean;
}

export interface FinancialReport {
  id: string;
  companyId: string;
  companyName: string;
  title: string;
  period: string;
  date: string;
  documentUrl: string;
  highlights: string[];
}

export interface Event {
  id: string;
  companyId: string;
  companyName: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  type: 'earnings_call' | 'shareholder_meeting' | 'product_launch' | 'conference';
  registrationUrl?: string;
}

export interface Question {
  id: string;
  companyId: string;
  userId: string;
  userName: string;
  question: string;
  date: string;
  status: 'pending' | 'answered';
  answer?: {
    content: string;
    answeredBy: string;
    date: string;
  };
}

// Mock data for announcements
export const announcements: Announcement[] = [
  {
    id: "1",
    companyId: "1",
    companyName: "TechVentures",
    title: "Lançamento da nova plataforma blockchain",
    content: "Temos o prazer de anunciar o lançamento da nossa nova plataforma blockchain que oferecerá maior segurança e eficiência para nossos usuários.",
    date: "2025-04-05",
    category: "product",
    important: true
  },
  {
    id: "2",
    companyId: "2",
    companyName: "GreenEnergy",
    title: "Expansão para novos mercados na América Latina",
    content: "A GreenEnergy está se expandindo para cinco novos países na América Latina, incluindo Chile, Colômbia e Peru.",
    date: "2025-03-28",
    category: "corporate",
    important: false
  },
  {
    id: "3",
    companyId: "3",
    companyName: "HealthInnovate",
    title: "Aprovação regulatória para novo dispositivo médico",
    content: "Recebemos aprovação da ANVISA para nosso novo dispositivo de monitoramento remoto de pacientes.",
    date: "2025-04-01",
    category: "general",
    important: true
  },
  {
    id: "4",
    companyId: "1",
    companyName: "TechVentures",
    title: "Resultados financeiros do primeiro trimestre de 2025",
    content: "Divulgamos hoje os resultados financeiros do primeiro trimestre de 2025, mostrando um crescimento de 25% na receita.",
    date: "2025-04-08",
    category: "financial",
    important: true
  }
];

// Mock data for financial reports
export const financialReports: FinancialReport[] = [
  {
    id: "1",
    companyId: "1",
    companyName: "TechVentures",
    title: "Relatório Financeiro Q1 2025",
    period: "Jan - Mar 2025",
    date: "2025-04-08",
    documentUrl: "#",
    highlights: [
      "Crescimento de receita de 25% ano a ano",
      "Margem de lucro aumentou para 32%",
      "Novos investimentos em P&D totalizando R$ 15 milhões"
    ]
  },
  {
    id: "2",
    companyId: "2",
    companyName: "GreenEnergy",
    title: "Relatório Financeiro Anual 2024",
    period: "Jan - Dez 2024",
    date: "2025-03-15",
    documentUrl: "#",
    highlights: [
      "Receita anual de R$ 250 milhões",
      "EBITDA de R$ 75 milhões (30% de margem)",
      "Expansão internacional para 3 novos países"
    ]
  },
  {
    id: "3",
    companyId: "3",
    companyName: "HealthInnovate",
    title: "Relatório Financeiro Q4 2024",
    period: "Out - Dez 2024",
    date: "2025-02-10",
    documentUrl: "#",
    highlights: [
      "Crescimento de receita de 18% no quarto trimestre",
      "Aprovação de 2 novos produtos pela ANVISA",
      "Aquisição da MedTech Solutions por R$ 35 milhões"
    ]
  }
];

// Mock data for events
export const events: Event[] = [
  {
    id: "1",
    companyId: "1",
    companyName: "TechVentures",
    title: "Chamada de Resultados Q1 2025",
    date: "2025-04-15",
    time: "14:00",
    location: "Webinar online",
    description: "Apresentação dos resultados financeiros do primeiro trimestre de 2025 e perspectivas para o restante do ano.",
    type: "earnings_call",
    registrationUrl: "#"
  },
  {
    id: "2",
    companyId: "2",
    companyName: "GreenEnergy",
    title: "Assembleia Geral de Acionistas",
    date: "2025-05-10",
    time: "10:00",
    location: "Sede da empresa, São Paulo",
    description: "Assembleia geral ordinária para votação de temas importantes e eleição do conselho de administração.",
    type: "shareholder_meeting"
  },
  {
    id: "3",
    companyId: "3",
    companyName: "HealthInnovate",
    title: "Lançamento de Nova Linha de Produtos",
    date: "2025-06-05",
    time: "16:00",
    location: "Hotel Windsor, Rio de Janeiro",
    description: "Evento de lançamento da nossa nova linha de dispositivos de monitoramento remoto de saúde.",
    type: "product_launch",
    registrationUrl: "#"
  },
  {
    id: "4",
    companyId: "1",
    companyName: "TechVentures",
    title: "Participação na Blockchain Conference 2025",
    date: "2025-07-12",
    time: "09:00",
    location: "Expo Center Norte, São Paulo",
    description: "Nossa equipe apresentará os últimos avanços em tecnologia blockchain para o setor financeiro.",
    type: "conference",
    registrationUrl: "#"
  }
];

// Mock data for Q&A
export const questions: Question[] = [
  {
    id: "1",
    companyId: "1",
    userId: "user1",
    userName: "Carlos Silva",
    question: "Quais são os planos da empresa para expansão internacional em 2025?",
    date: "2025-04-01",
    status: "answered",
    answer: {
      content: "Estamos planejando expandir para a Europa e Ásia no segundo semestre de 2025, começando por Portugal, Espanha e Singapura. Mais detalhes serão divulgados em nossa próxima chamada de resultados em 15 de abril.",
      answeredBy: "Ana Costa, CFO",
      date: "2025-04-03"
    }
  },
  {
    id: "2",
    companyId: "2",
    userId: "user2",
    userName: "Marina Santos",
    question: "Como a empresa está se preparando para as novas regulamentações ambientais?",
    date: "2025-03-25",
    status: "answered",
    answer: {
      content: "Já estamos em conformidade com as novas regulamentações que entrarão em vigor em 2026. Investimos R$ 20 milhões em tecnologias de redução de emissões nos últimos 12 meses e nossa equipe de conformidade trabalha diretamente com os órgãos reguladores.",
      answeredBy: "Roberto Menezes, Diretor de Compliance",
      date: "2025-03-27"
    }
  },
  {
    id: "3",
    companyId: "1",
    userId: "user3",
    userName: "Pedro Almeida",
    question: "Qual é a estratégia da empresa para enfrentar a crescente concorrência no setor?",
    date: "2025-04-05",
    status: "pending"
  }
];

// Get events for calendar
export const getUpcomingEvents = () => {
  const today = new Date();
  return events.filter(event => new Date(event.date) >= today)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};

// Get recent announcements
export const getRecentAnnouncements = (limit = 5) => {
  return [...announcements]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
};

// Get financial reports
export const getFinancialReportsByCompany = (companyId: string) => {
  return financialReports.filter(report => report.companyId === companyId);
};

// Get company questions
export const getQuestionsByCompany = (companyId: string) => {
  return questions.filter(question => question.companyId === companyId);
};
