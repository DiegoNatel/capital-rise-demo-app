
import { Company, companies } from "./companies";
import { OfferWithCompany } from "@/pages/investor/components/OfferCard";

export interface Offer {
  id: string;
  companyId: string;
  title: string;
  description: string;
  goalAmount: number;
  raisedAmount: number;
  minInvestment: number;
  tokenSymbol: string;
  tokenPrice: number;
  totalTokens: number;
  soldTokens: number;
  startDate: string;
  endDate: string;
  status: 'active' | 'completed' | 'upcoming' | 'cancelled';
  category: string;
  highlights: string[];
  documents: {
    name: string;
    type: string;
    url: string;
  }[];
  risks: string[];
  updates: {
    date: string;
    title: string;
    content: string;
  }[];
  investors: number;
}

export const offers: Offer[] = [
  {
    id: "offer-001",
    companyId: "comp-001",
    title: "Series A Investment Round",
    description: "GreenTech Solutions is raising capital to expand its residential solar energy solutions across Brazil and develop next-generation energy storage technology.",
    goalAmount: 5000000,
    raisedAmount: 3250000,
    minInvestment: 5000,
    tokenSymbol: "GTS",
    tokenPrice: 3.47,
    totalTokens: 1440922,
    soldTokens: 936599,
    startDate: "2024-02-01",
    endDate: "2024-04-30",
    status: "active",
    category: "Clean Energy",
    highlights: [
      "Expanding to 5 new cities in Brazil",
      "R&D for next-gen battery technology",
      "Projected 65% revenue growth in next 12 months"
    ],
    documents: [
      {
        name: "Business Plan",
        type: "PDF",
        url: "#"
      },
      {
        name: "Financial Projections",
        type: "PDF",
        url: "#"
      },
      {
        name: "Term Sheet",
        type: "PDF",
        url: "#"
      }
    ],
    risks: [
      "Regulatory changes in energy sector",
      "Competitive market with large incumbents",
      "Technology development delays"
    ],
    updates: [
      {
        date: "2024-03-15",
        title: "New Partnership Announced",
        content: "We've secured a partnership with a major utility company that will expand our reach to 50,000 additional households."
      },
      {
        date: "2024-03-01",
        title: "50% Funding Milestone Reached",
        content: "We're excited to announce that we've reached 50% of our funding goal! Thank you to all our investors for your support."
      }
    ],
    investors: 142
  },
  {
    id: "offer-002",
    companyId: "comp-002",
    title: "Expansion Investment Round",
    description: "FinFlow is raising capital to expand its payment processing infrastructure and enter new markets in Colombia and Mexico.",
    goalAmount: 4000000,
    raisedAmount: 2100000,
    minInvestment: 2500,
    tokenSymbol: "FFT",
    tokenPrice: 1.82,
    totalTokens: 2197802,
    soldTokens: 1153846,
    startDate: "2024-01-15",
    endDate: "2024-04-15",
    status: "active",
    category: "Fintech",
    highlights: [
      "International expansion to Colombia and Mexico",
      "Enhanced fraud detection system",
      "New enterprise client dashboard"
    ],
    documents: [
      {
        name: "Business Plan",
        type: "PDF",
        url: "#"
      },
      {
        name: "Market Analysis",
        type: "PDF",
        url: "#"
      },
      {
        name: "Term Sheet",
        type: "PDF",
        url: "#"
      }
    ],
    risks: [
      "Regulatory challenges in new markets",
      "Currency exchange rate fluctuations",
      "Integration with local banking systems"
    ],
    updates: [
      {
        date: "2024-03-10",
        title: "New Office in Bogotá",
        content: "We've secured office space in Bogotá and hired our first team members in Colombia."
      },
      {
        date: "2024-02-20",
        title: "Enhanced Security Features",
        content: "Our new fraud detection system has been deployed, reducing fraudulent transactions by 45% in initial tests."
      }
    ],
    investors: 167
  },
  {
    id: "offer-003",
    companyId: "comp-003",
    title: "Series B Funding Round",
    description: "HealthSync is seeking investment to scale its telemedicine platform, enhance AI diagnostic capabilities, and expand its network of healthcare providers.",
    goalAmount: 7500000,
    raisedAmount: 7500000,
    minInvestment: 10000,
    tokenSymbol: "HST",
    tokenPrice: 2.65,
    totalTokens: 2830189,
    soldTokens: 2830189,
    startDate: "2023-11-01",
    endDate: "2024-02-01",
    status: "completed",
    category: "Healthcare",
    highlights: [
      "AI diagnostic tool with 92% accuracy",
      "Partnerships with 50 new healthcare providers",
      "Mobile app redesign with enhanced patient features"
    ],
    documents: [
      {
        name: "Business Plan",
        type: "PDF",
        url: "#"
      },
      {
        name: "Clinical Validation Studies",
        type: "PDF",
        url: "#"
      },
      {
        name: "Term Sheet",
        type: "PDF",
        url: "#"
      }
    ],
    risks: [
      "Healthcare regulatory compliance",
      "Data privacy and security concerns",
      "Professional liability issues"
    ],
    updates: [
      {
        date: "2024-02-01",
        title: "Funding Round Completed",
        content: "We're thrilled to announce that we've successfully closed our Series B funding round, raising R$7.5 million."
      },
      {
        date: "2024-01-15",
        title: "AI Diagnostic Tool Launch",
        content: "Our AI diagnostic assistant has been officially launched after successful beta testing with 20 healthcare providers."
      }
    ],
    investors: 86
  },
  {
    id: "offer-004",
    companyId: "comp-004",
    title: "Growth Capital Round",
    description: "LogiTech Freight is raising capital to expand its blockchain-based logistics platform across South America and develop new features for real-time cargo tracking.",
    goalAmount: 6000000,
    raisedAmount: 0,
    minInvestment: 7500,
    tokenSymbol: "LFT",
    tokenPrice: 4.18,
    totalTokens: 1435407,
    soldTokens: 0,
    startDate: "2024-04-15",
    endDate: "2024-07-15",
    status: "upcoming",
    category: "Logistics",
    highlights: [
      "Expansion to Argentina and Chile",
      "Integration with major customs systems",
      "Enhanced real-time tracking with IoT sensors"
    ],
    documents: [
      {
        name: "Business Plan",
        type: "PDF",
        url: "#"
      },
      {
        name: "Technology Roadmap",
        type: "PDF",
        url: "#"
      },
      {
        name: "Term Sheet",
        type: "PDF",
        url: "#"
      }
    ],
    risks: [
      "Cross-border regulatory challenges",
      "Infrastructure limitations in certain regions",
      "Integration with legacy logistics systems"
    ],
    updates: [],
    investors: 0
  },
  {
    id: "offer-005",
    companyId: "comp-005",
    title: "Expansion Funding Round",
    description: "AgroSmart is raising capital to enhance its IoT agricultural monitoring systems and expand coverage to new crop types and regions.",
    goalAmount: 4500000,
    raisedAmount: 4500000,
    minInvestment: 5000,
    tokenSymbol: "AST",
    tokenPrice: 3.94,
    totalTokens: 1142132,
    soldTokens: 1142132,
    startDate: "2023-09-01",
    endDate: "2023-12-01",
    status: "completed",
    category: "Agriculture",
    highlights: [
      "Support for 15 new crop types",
      "Advanced soil nutrient monitoring",
      "Precision irrigation optimization"
    ],
    documents: [
      {
        name: "Business Plan",
        type: "PDF",
        url: "#"
      },
      {
        name: "Agricultural Impact Report",
        type: "PDF",
        url: "#"
      },
      {
        name: "Term Sheet",
        type: "PDF",
        url: "#"
      }
    ],
    risks: [
      "Weather and climate uncertainties",
      "Regional connectivity challenges",
      "Agricultural market fluctuations"
    ],
    updates: [
      {
        date: "2023-12-01",
        title: "Funding Successfully Completed",
        content: "We've successfully closed our funding round, raising the full R$4.5 million. Thank you to all our investors!"
      },
      {
        date: "2023-11-15",
        title: "New Crop Analysis Features",
        content: "We've released new crop analysis features for coffee and sugarcane, two of Brazil's most important agricultural products."
      }
    ],
    investors: 103
  }
];

// Add company data to each offer
export const offersWithCompanyData: OfferWithCompany[] = offers.map(offer => {
  const company = companies.find(c => c.id === offer.companyId);
  return {
    ...offer,
    company: company || null
  };
});
