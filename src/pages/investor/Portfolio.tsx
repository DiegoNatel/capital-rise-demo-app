
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { portfolioItems, portfolioSummary } from "@/data/portfolio";
import {
  PortfolioHeader,
  PortfolioSummaryCards,
  PerformanceChart,
  PortfolioAssets,
  IndustryAllocation,
  TransactionHistory
} from "./components/portfolio";

const Portfolio = () => {
  const formatCurrency = (value: number) => {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };
  
  const formatPercent = (value: number) => {
    return `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`;
  };
  
  return (
    <MainLayout>
      <div className="container py-8">
        <PortfolioHeader 
          title="Meu Portfólio" 
          subtitle="Acompanhe seus investimentos e desempenho" 
        />
        
        <PortfolioSummaryCards 
          totalInvestment={portfolioSummary.totalInvestment}
          currentValue={portfolioSummary.currentValue}
          totalProfitLoss={portfolioSummary.totalProfitLoss}
          totalProfitLossPercentage={portfolioSummary.totalProfitLossPercentage}
          formatCurrency={formatCurrency}
        />
        
        <PerformanceChart performanceHistory={portfolioSummary.performanceHistory} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <PortfolioAssets 
            portfolioItems={portfolioItems}
            formatCurrency={formatCurrency}
            formatPercent={formatPercent}
          />
          
          <IndustryAllocation allocationByIndustry={portfolioSummary.allocationByIndustry} />
        </div>
        
        <TransactionHistory 
          portfolioItems={portfolioItems}
          formatCurrency={formatCurrency}
        />
      </div>
    </MainLayout>
  );
};

export default Portfolio;
