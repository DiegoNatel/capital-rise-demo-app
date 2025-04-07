
export interface Company {
  id: string;
  name: string;
  logo: string;
  industry: string;
  description: string;
  foundedYear: number;
  location: string;
  employees: number;
  valuation: number;
  growth: number;
  website: string;
  status: 'active' | 'closed' | 'upcoming';
  highlights: string[];
  financials: {
    revenue: number[];
    profit: number[];
    years: string[];
  };
  team: {
    name: string;
    position: string;
    image: string;
  }[];
}

export const companies: Company[] = [
  {
    id: "comp-001",
    name: "GreenTech Solutions",
    logo: "/placeholder.svg",
    industry: "Clean Energy",
    description: "GreenTech Solutions develops sustainable energy solutions for residential and commercial applications, focusing on solar integration and energy storage technologies.",
    foundedYear: 2018,
    location: "São Paulo, Brazil",
    employees: 76,
    valuation: 25000000,
    growth: 68,
    website: "https://example.com/greentech",
    status: 'active',
    highlights: [
      "Patented energy storage technology",
      "85% efficiency in solar conversion",
      "Contracts with 3 major utilities"
    ],
    financials: {
      revenue: [1200000, 3500000, 7800000],
      profit: [-800000, 250000, 1700000],
      years: ["2021", "2022", "2023"]
    },
    team: [
      {
        name: "Marina Silva",
        position: "CEO & Founder",
        image: "/placeholder.svg"
      },
      {
        name: "Rafael Oliveira",
        position: "CTO",
        image: "/placeholder.svg"
      },
      {
        name: "Carla Mendes",
        position: "CFO",
        image: "/placeholder.svg"
      }
    ]
  },
  {
    id: "comp-002",
    name: "FinFlow",
    logo: "/placeholder.svg",
    industry: "Fintech",
    description: "FinFlow provides innovative payment solutions for small and medium-sized businesses across Latin America, with a focus on reducing transaction costs and improving cash flow management.",
    foundedYear: 2020,
    location: "Rio de Janeiro, Brazil",
    employees: 42,
    valuation: 18000000,
    growth: 115,
    website: "https://example.com/finflow",
    status: 'active',
    highlights: [
      "Processing R$1.2B in annual transactions",
      "Integration with all major Brazilian banks",
      "50,000+ merchant clients"
    ],
    financials: {
      revenue: [800000, 3200000, 6500000],
      profit: [-1200000, -400000, 900000],
      years: ["2021", "2022", "2023"]
    },
    team: [
      {
        name: "João Santos",
        position: "CEO & Founder",
        image: "/placeholder.svg"
      },
      {
        name: "Luciana Costa",
        position: "COO",
        image: "/placeholder.svg"
      },
      {
        name: "Marcos Ribeiro",
        position: "CTO",
        image: "/placeholder.svg"
      }
    ]
  },
  {
    id: "comp-003",
    name: "HealthSync",
    logo: "/placeholder.svg",
    industry: "Health Tech",
    description: "HealthSync develops telemedicine platforms and digital health solutions that connect patients with healthcare providers, enabling remote consultations and continuous health monitoring.",
    foundedYear: 2019,
    location: "Belo Horizonte, Brazil",
    employees: 58,
    valuation: 22000000,
    growth: 87,
    website: "https://example.com/healthsync",
    status: 'active',
    highlights: [
      "300,000+ registered patients",
      "Partnership with 120 hospitals",
      "AI-powered diagnostic assistance"
    ],
    financials: {
      revenue: [950000, 2800000, 5700000],
      profit: [-650000, 150000, 1200000],
      years: ["2021", "2022", "2023"]
    },
    team: [
      {
        name: "Ana Ferreira",
        position: "CEO & Co-Founder",
        image: "/placeholder.svg"
      },
      {
        name: "Dr. Paulo Sousa",
        position: "CMO & Co-Founder",
        image: "/placeholder.svg"
      },
      {
        name: "Thiago Lima",
        position: "CTO",
        image: "/placeholder.svg"
      }
    ]
  },
  {
    id: "comp-004",
    name: "LogiTech Freight",
    logo: "/placeholder.svg",
    industry: "Logistics",
    description: "LogiTech Freight is revolutionizing the logistics industry with its blockchain-based tracking system and optimization algorithms for freight management across South America.",
    foundedYear: 2017,
    location: "Curitiba, Brazil",
    employees: 104,
    valuation: 35000000,
    growth: 53,
    website: "https://example.com/logitech",
    status: 'upcoming',
    highlights: [
      "Managed 250,000+ shipments",
      "Reduced logistics costs by 23% on average",
      "Integrated with major ERP systems"
    ],
    financials: {
      revenue: [3500000, 5900000, 9200000],
      profit: [200000, 850000, 2100000],
      years: ["2021", "2022", "2023"]
    },
    team: [
      {
        name: "Roberto Almeida",
        position: "CEO & Founder",
        image: "/placeholder.svg"
      },
      {
        name: "Carolina Vieira",
        position: "COO",
        image: "/placeholder.svg"
      },
      {
        name: "Felipe Martins",
        position: "CTO",
        image: "/placeholder.svg"
      }
    ]
  },
  {
    id: "comp-005",
    name: "AgroSmart",
    logo: "/placeholder.svg",
    industry: "AgTech",
    description: "AgroSmart provides IoT solutions for precision agriculture, helping farmers optimize resource usage, increase yields, and implement sustainable farming practices.",
    foundedYear: 2016,
    location: "Campinas, Brazil",
    employees: 87,
    valuation: 29000000,
    growth: 42,
    website: "https://example.com/agrosmart",
    status: 'closed',
    highlights: [
      "Deployed on 150,000+ hectares of farmland",
      "35% average increase in crop yields",
      "25% reduction in water usage"
    ],
    financials: {
      revenue: [4200000, 6100000, 8800000],
      profit: [350000, 1200000, 2400000],
      years: ["2021", "2022", "2023"]
    },
    team: [
      {
        name: "Fernando Costa",
        position: "CEO & Co-Founder",
        image: "/placeholder.svg"
      },
      {
        name: "Daniela Santos",
        position: "CTO & Co-Founder",
        image: "/placeholder.svg"
      },
      {
        name: "Luis Pereira",
        position: "COO",
        image: "/placeholder.svg"
      }
    ]
  }
];
