
export interface Token {
  id: string;
  symbol: string;
  name: string;
  companyId: string;
  companyName: string;
  iconUrl: string;
  price: number;
  priceChange24h: number;
  marketCap: number;
  volume24h: number;
  totalSupply: number;
  circulatingSupply: number;
  launchDate: string;
  description: string;
  category: string;
  priceHistory: {
    date: string;
    price: number;
  }[];
}

export const tokens: Token[] = [
  {
    id: "token-001",
    symbol: "GTS",
    name: "GreenTech Solutions Token",
    companyId: "comp-001",
    companyName: "GreenTech Solutions",
    iconUrl: "/placeholder.svg",
    price: 3.47,
    priceChange24h: 5.2,
    marketCap: 17350000,
    volume24h: 875000,
    totalSupply: 10000000,
    circulatingSupply: 5000000,
    launchDate: "2022-06-15",
    description: "GTS is a security token representing equity in GreenTech Solutions, a leading sustainable energy company.",
    category: "Equity",
    priceHistory: [
      { date: "2023-01-01", price: 2.10 },
      { date: "2023-02-01", price: 2.35 },
      { date: "2023-03-01", price: 2.42 },
      { date: "2023-04-01", price: 2.65 },
      { date: "2023-05-01", price: 2.91 },
      { date: "2023-06-01", price: 2.78 },
      { date: "2023-07-01", price: 2.95 },
      { date: "2023-08-01", price: 3.12 },
      { date: "2023-09-01", price: 3.24 },
      { date: "2023-10-01", price: 3.18 },
      { date: "2023-11-01", price: 3.33 },
      { date: "2023-12-01", price: 3.29 },
      { date: "2024-01-01", price: 3.42 },
      { date: "2024-02-01", price: 3.30 },
      { date: "2024-03-01", price: 3.47 }
    ]
  },
  {
    id: "token-002",
    symbol: "FFT",
    name: "FinFlow Token",
    companyId: "comp-002",
    companyName: "FinFlow",
    iconUrl: "/placeholder.svg",
    price: 1.82,
    priceChange24h: -2.1,
    marketCap: 9100000,
    volume24h: 542000,
    totalSupply: 20000000,
    circulatingSupply: 5000000,
    launchDate: "2022-09-22",
    description: "FFT represents ownership rights in FinFlow, an innovative payment solutions provider for SMEs in Latin America.",
    category: "Equity",
    priceHistory: [
      { date: "2023-01-01", price: 1.05 },
      { date: "2023-02-01", price: 1.12 },
      { date: "2023-03-01", price: 1.24 },
      { date: "2023-04-01", price: 1.35 },
      { date: "2023-05-01", price: 1.42 },
      { date: "2023-06-01", price: 1.38 },
      { date: "2023-07-01", price: 1.45 },
      { date: "2023-08-01", price: 1.53 },
      { date: "2023-09-01", price: 1.61 },
      { date: "2023-10-01", price: 1.58 },
      { date: "2023-11-01", price: 1.67 },
      { date: "2023-12-01", price: 1.72 },
      { date: "2024-01-01", price: 1.79 },
      { date: "2024-02-01", price: 1.86 },
      { date: "2024-03-01", price: 1.82 }
    ]
  },
  {
    id: "token-003",
    symbol: "HST",
    name: "HealthSync Token",
    companyId: "comp-003",
    companyName: "HealthSync",
    iconUrl: "/placeholder.svg",
    price: 2.65,
    priceChange24h: 1.8,
    marketCap: 13250000,
    volume24h: 690000,
    totalSupply: 15000000,
    circulatingSupply: 5000000,
    launchDate: "2022-04-08",
    description: "HST represents shares in HealthSync, a telemedicine platform that connects patients with healthcare providers.",
    category: "Equity",
    priceHistory: [
      { date: "2023-01-01", price: 1.85 },
      { date: "2023-02-01", price: 1.92 },
      { date: "2023-03-01", price: 1.97 },
      { date: "2023-04-01", price: 2.05 },
      { date: "2023-05-01", price: 2.12 },
      { date: "2023-06-01", price: 2.08 },
      { date: "2023-07-01", price: 2.15 },
      { date: "2023-08-01", price: 2.27 },
      { date: "2023-09-01", price: 2.34 },
      { date: "2023-10-01", price: 2.29 },
      { date: "2023-11-01", price: 2.38 },
      { date: "2023-12-01", price: 2.47 },
      { date: "2024-01-01", price: 2.53 },
      { date: "2024-02-01", price: 2.60 },
      { date: "2024-03-01", price: 2.65 }
    ]
  },
  {
    id: "token-004",
    symbol: "LFT",
    name: "LogiTech Freight Token",
    companyId: "comp-004",
    companyName: "LogiTech Freight",
    iconUrl: "/placeholder.svg",
    price: 4.18,
    priceChange24h: 3.5,
    marketCap: 20900000,
    volume24h: 1250000,
    totalSupply: 12000000,
    circulatingSupply: 5000000,
    launchDate: "2021-11-30",
    description: "LFT represents ownership in LogiTech Freight, a logistics company leveraging blockchain for supply chain optimization.",
    category: "Equity",
    priceHistory: [
      { date: "2023-01-01", price: 3.15 },
      { date: "2023-02-01", price: 3.24 },
      { date: "2023-03-01", price: 3.32 },
      { date: "2023-04-01", price: 3.40 },
      { date: "2023-05-01", price: 3.51 },
      { date: "2023-06-01", price: 3.47 },
      { date: "2023-07-01", price: 3.58 },
      { date: "2023-08-01", price: 3.67 },
      { date: "2023-09-01", price: 3.79 },
      { date: "2023-10-01", price: 3.72 },
      { date: "2023-11-01", price: 3.85 },
      { date: "2023-12-01", price: 3.93 },
      { date: "2024-01-01", price: 4.02 },
      { date: "2024-02-01", price: 4.10 },
      { date: "2024-03-01", price: 4.18 }
    ]
  },
  {
    id: "token-005",
    symbol: "AST",
    name: "AgroSmart Token",
    companyId: "comp-005",
    companyName: "AgroSmart",
    iconUrl: "/placeholder.svg",
    price: 3.94,
    priceChange24h: -0.8,
    marketCap: 19700000,
    volume24h: 935000,
    totalSupply: 10000000,
    circulatingSupply: 5000000,
    launchDate: "2021-08-17",
    description: "AST represents shares in AgroSmart, an AgTech company providing IoT solutions for precision agriculture.",
    category: "Equity",
    priceHistory: [
      { date: "2023-01-01", price: 3.30 },
      { date: "2023-02-01", price: 3.38 },
      { date: "2023-03-01", price: 3.45 },
      { date: "2023-04-01", price: 3.51 },
      { date: "2023-05-01", price: 3.59 },
      { date: "2023-06-01", price: 3.55 },
      { date: "2023-07-01", price: 3.62 },
      { date: "2023-08-01", price: 3.70 },
      { date: "2023-09-01", price: 3.77 },
      { date: "2023-10-01", price: 3.73 },
      { date: "2023-11-01", price: 3.81 },
      { date: "2023-12-01", price: 3.87 },
      { date: "2024-01-01", price: 3.92 },
      { date: "2024-02-01", price: 3.97 },
      { date: "2024-03-01", price: 3.94 }
    ]
  }
];
