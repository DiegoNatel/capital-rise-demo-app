
export interface Company {
  id: string;
  name: string;
  industry: string;
  description: string;
  foundedYear: number;
  location: string;
  website: string;
  employees: number;
  valuation: number;
  growth: number;
  team: TeamMember[];
  highlights: string[];
  financials: {
    years: number[];
    revenue: number[];
    profit: number[];
  };
  logo?: string;
}

export interface TeamMember {
  name: string;
  position: string;
  photo?: string;
}

export interface Offer {
  id: string;
  companyId: string;
  title: string;
  description: string;
  goalAmount: number;
  raisedAmount: number;
  investors: number;
  tokenSymbol: string;
  tokenPrice: number;
  startDate: string;
  endDate: string;
  status: 'active' | 'completed' | 'upcoming' | 'cancelled';
  companyName?: string;
  companyIndustry?: string;
  companyLogo?: string;
}
