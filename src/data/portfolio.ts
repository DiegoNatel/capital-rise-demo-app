
export interface PortfolioItem {
  id: string;
  userId: string;
  tokenId: string;
  tokenSymbol: string;
  tokenName: string;
  companyName: string;
  companyLogo: string;
  quantity: number;
  averagePurchasePrice: number;
  currentPrice: number;
  totalInvestment: number;
  currentValue: number;
  profitLoss: number;
  profitLossPercentage: number;
  purchaseDate: string;
  transactions: {
    id: string;
    date: string;
    type: 'buy' | 'sell';
    quantity: number;
    price: number;
    total: number;
  }[];
}

export const portfolioItems: PortfolioItem[] = [
  {
    id: "port-001",
    userId: "user-001",
    tokenId: "token-001",
    tokenSymbol: "GTS",
    tokenName: "GreenTech Solutions Token",
    companyName: "GreenTech Solutions",
    companyLogo: "/placeholder.svg",
    quantity: 2500,
    averagePurchasePrice: 2.95,
    currentPrice: 3.47,
    totalInvestment: 7375,
    currentValue: 8675,
    profitLoss: 1300,
    profitLossPercentage: 17.63,
    purchaseDate: "2023-08-15",
    transactions: [
      {
        id: "trans-001",
        date: "2023-08-15",
        type: "buy",
        quantity: 1500,
        price: 3.12,
        total: 4680
      },
      {
        id: "trans-002",
        date: "2023-11-22",
        type: "buy",
        quantity: 1000,
        price: 2.695,
        total: 2695
      }
    ]
  },
  {
    id: "port-002",
    userId: "user-001",
    tokenId: "token-003",
    tokenSymbol: "HST",
    tokenName: "HealthSync Token",
    companyName: "HealthSync",
    companyLogo: "/placeholder.svg",
    quantity: 1800,
    averagePurchasePrice: 2.34,
    currentPrice: 2.65,
    totalInvestment: 4212,
    currentValue: 4770,
    profitLoss: 558,
    profitLossPercentage: 13.25,
    purchaseDate: "2023-09-10",
    transactions: [
      {
        id: "trans-003",
        date: "2023-09-10",
        type: "buy",
        quantity: 1800,
        price: 2.34,
        total: 4212
      }
    ]
  },
  {
    id: "port-003",
    userId: "user-001",
    tokenId: "token-005",
    tokenSymbol: "AST",
    tokenName: "AgroSmart Token",
    companyName: "AgroSmart",
    companyLogo: "/placeholder.svg",
    quantity: 1200,
    averagePurchasePrice: 3.77,
    currentPrice: 3.94,
    totalInvestment: 4524,
    currentValue: 4728,
    profitLoss: 204,
    profitLossPercentage: 4.51,
    purchaseDate: "2023-09-22",
    transactions: [
      {
        id: "trans-004",
        date: "2023-09-22",
        type: "buy",
        quantity: 1200,
        price: 3.77,
        total: 4524
      }
    ]
  },
  {
    id: "port-004",
    userId: "user-001",
    tokenId: "token-002",
    tokenSymbol: "FFT",
    tokenName: "FinFlow Token",
    companyName: "FinFlow",
    companyLogo: "/placeholder.svg",
    quantity: 3000,
    averagePurchasePrice: 1.67,
    currentPrice: 1.82,
    totalInvestment: 5010,
    currentValue: 5460,
    profitLoss: 450,
    profitLossPercentage: 8.98,
    purchaseDate: "2023-11-05",
    transactions: [
      {
        id: "trans-005",
        date: "2023-11-05",
        type: "buy",
        quantity: 3000,
        price: 1.67,
        total: 5010
      }
    ]
  }
];

export const portfolioSummary = {
  totalInvestment: 21121,
  currentValue: 23633,
  totalProfitLoss: 2512,
  totalProfitLossPercentage: 11.89,
  allocationByIndustry: [
    { industry: "Clean Energy", percentage: 36.71 },
    { industry: "Healthcare", percentage: 20.18 },
    { industry: "Agriculture", percentage: 20.01 },
    { industry: "Fintech", percentage: 23.10 }
  ],
  performanceHistory: [
    { date: "2023-09-01", value: 19845 },
    { date: "2023-10-01", value: 20152 },
    { date: "2023-11-01", value: 20890 },
    { date: "2023-12-01", value: 21633 },
    { date: "2024-01-01", value: 22175 },
    { date: "2024-02-01", value: 22952 },
    { date: "2024-03-01", value: 23633 }
  ]
};
