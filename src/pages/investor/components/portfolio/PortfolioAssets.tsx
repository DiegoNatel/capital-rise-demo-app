
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PortfolioItem } from "@/data/portfolio";
import PortfolioItemCard from "./PortfolioItemCard";
import PortfolioAssetsTable from "./PortfolioAssetsTable";

interface PortfolioAssetsProps {
  portfolioItems: PortfolioItem[];
  formatCurrency: (value: number) => string;
  formatPercent: (value: number) => string;
}

const PortfolioAssets = ({ portfolioItems, formatCurrency, formatPercent }: PortfolioAssetsProps) => {
  const [viewType, setViewType] = useState<"cards" | "table">("cards");
  
  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Meus Ativos</CardTitle>
            <CardDescription>
              Detalhes dos seus investimentos atuais
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <button
              className={`h-8 w-8 p-0 flex items-center justify-center rounded ${
                viewType === "cards" 
                  ? "bg-primary text-primary-foreground" 
                  : "border border-input bg-background hover:bg-accent hover:text-accent-foreground"
              }`}
              onClick={() => setViewType("cards")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="7" height="7" x="3" y="3" rx="1" />
                <rect width="7" height="7" x="14" y="3" rx="1" />
                <rect width="7" height="7" x="14" y="14" rx="1" />
                <rect width="7" height="7" x="3" y="14" rx="1" />
              </svg>
            </button>
            <button
              className={`h-8 w-8 p-0 flex items-center justify-center rounded ${
                viewType === "table" 
                  ? "bg-primary text-primary-foreground" 
                  : "border border-input bg-background hover:bg-accent hover:text-accent-foreground"
              }`}
              onClick={() => setViewType("table")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" x2="21" y1="6" y2="6" />
                <line x1="3" x2="21" y1="12" y2="12" />
                <line x1="3" x2="21" y1="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {viewType === "cards" ? (
          <div className="space-y-4">
            {portfolioItems.map((item) => (
              <PortfolioItemCard 
                key={item.id} 
                item={item} 
                formatCurrency={formatCurrency} 
                formatPercent={formatPercent} 
              />
            ))}
          </div>
        ) : (
          <PortfolioAssetsTable 
            portfolioItems={portfolioItems} 
            formatCurrency={formatCurrency} 
            formatPercent={formatPercent} 
          />
        )}
      </CardContent>
    </Card>
  );
};

export default PortfolioAssets;
