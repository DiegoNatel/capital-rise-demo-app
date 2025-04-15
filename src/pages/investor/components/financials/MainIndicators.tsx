
import React from "react";
import { DollarSign, TrendingDown, FileText, Calendar, Briefcase } from "lucide-react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface MainIndicatorsProps {
  companyData: any;
}

const MainIndicators = ({ companyData }: MainIndicatorsProps) => {
  // Check if financials data exists
  if (!companyData?.financials?.revenue || !companyData?.financials?.profit) {
    return (
      <div className="p-4 text-center">
        <p className="text-slate-500">Indicadores principais não disponíveis.</p>
      </div>
    );
  }

  // Prepare data for the chart
  const chartData = companyData.financials.years?.map((year: string, index: number) => ({
    name: year,
    receitas: companyData.financials.revenue[index],
    lucro: companyData.financials.profit[index],
  })) || [];

  // Calculate metrics
  const latestRevenueIndex = companyData.financials.revenue.length - 1;
  const latestProfitIndex = companyData.financials.profit.length - 1;
  
  const currentRevenue = companyData.financials.revenue[latestRevenueIndex];
  const currentProfit = companyData.financials.profit[latestProfitIndex];
  const shortTermDebt = currentRevenue * 0.18; // Simulated value
  const cashRetained = currentRevenue * 1.8; // Simulated value
  const fundraising = 0; // Example value from image
  
  // Calculate additional metrics for bottom section
  const netMargin = Math.round((currentProfit / currentRevenue) * 100);
  const grossMargin = 52; // Example from image
  const returnOnAssets = -33; // Example from image
  const earningsPerShare = -4.27; // Example from image
  const employeeRevenue = 131400.20; // Example from image
  const cashRisk = 48; // Example from image
  const receivablesRisk = 16.873; // Example from image
  const debtRisk = 35; // Example from image

  return (
    <div className="space-y-8">
      <h3 className="font-medium text-lg mb-4">Visão geral <span className="text-sm font-normal text-slate-500">1 de jan. — 31 de dez. de 2023</span></h3>
      
      {/* Top metrics cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
          <div className="flex justify-between items-start mb-2">
            <div className="bg-green-100 p-2 rounded-lg">
              <DollarSign className="h-5 w-5 text-green-500" />
            </div>
            <span className="px-1.5 py-0.5 bg-green-100 text-green-800 rounded text-xs">+20%</span>
          </div>
          <p className="text-lg font-bold">$ {currentRevenue.toLocaleString()}</p>
          <p className="text-xs text-slate-500 uppercase">RECEITA</p>
        </div>
        
        <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
          <div className="flex justify-between items-start mb-2">
            <div className="bg-red-100 p-2 rounded-lg">
              <TrendingDown className="h-5 w-5 text-red-500" />
            </div>
            <span className="invisible px-1.5 py-0.5 rounded text-xs">-</span>
          </div>
          <p className="text-lg font-bold text-red-500">-$ {Math.abs(currentProfit).toLocaleString()}</p>
          <p className="text-xs text-slate-500 uppercase">PERDA LÍQUIDA</p>
        </div>
        
        <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
          <div className="flex justify-between items-start mb-2">
            <div className="bg-blue-100 p-2 rounded-lg">
              <FileText className="h-5 w-5 text-blue-500" />
            </div>
            <span className="px-1.5 py-0.5 bg-green-100 text-green-800 rounded text-xs">+54%</span>
          </div>
          <p className="text-lg font-bold">$ {shortTermDebt.toLocaleString()}</p>
          <p className="text-xs text-slate-500 uppercase">DÍVIDA DE CURTO PRAZO</p>
        </div>
        
        <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
          <div className="flex justify-between items-start mb-2">
            <div className="bg-slate-100 p-2 rounded-lg">
              <Calendar className="h-5 w-5 text-slate-500" />
            </div>
            <span className="invisible px-1.5 py-0.5 rounded text-xs">-</span>
          </div>
          <p className="text-lg font-bold">$ {fundraising.toLocaleString()}</p>
          <p className="text-xs text-slate-500 uppercase">ANGARIAÇAO EM 2023</p>
        </div>
        
        <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
          <div className="flex justify-between items-start mb-2">
            <div className="bg-yellow-100 p-2 rounded-lg">
              <Briefcase className="h-5 w-5 text-yellow-500" />
            </div>
            <span className="px-1.5 py-0.5 bg-green-100 text-green-800 rounded text-xs">+38%</span>
          </div>
          <p className="text-lg font-bold">$ {cashRetained.toLocaleString()}</p>
          <p className="text-xs text-slate-500 uppercase">NUMERÁRIO DETIDO</p>
        </div>
      </div>
      
      {/* Revenue vs Profit Chart */}
      <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
        <ChartContainer
          className="h-[300px]"
          config={{
            receitas: {
              label: "Receitas",
              color: "#10b981",
            },
            lucro: {
              label: "Lucro",
              color: "#ef4444",
            },
          }}
        >
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 30, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis 
              tickFormatter={(value) => `US$ ${Math.abs(value / 1000000).toFixed(1)}M`}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-white p-3 border border-slate-200 rounded-md shadow-md">
                      <p className="font-semibold">{label}</p>
                      {payload.map((entry, index) => {
                        // Ensure entry.value is treated as a number
                        const value = typeof entry.value === 'string' ? parseFloat(entry.value) : Number(entry.value);
                        return (
                          <p key={index} style={{ color: entry.color }}>
                            {entry.name === "lucro" ? "Lucro: " : "Receitas: "}
                            <span className="font-medium">
                              {value < 0 ? "-" : ""}US$ {Math.abs(value).toLocaleString()}
                            </span>
                          </p>
                        );
                      })}
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey="receitas" fill="#10b981" name="Receitas" />
            <Bar dataKey="lucro" fill="#ef4444" name="Lucro" />
          </BarChart>
        </ChartContainer>
      </div>
      
      {/* Bottom metrics cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
          <p className="text-sm mb-2">Margem Líquida:</p>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-red-500">{netMargin}%</span>
            <span className="bg-slate-100 p-1 rounded-full">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 16V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </div>
        </div>
        
        <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
          <p className="text-sm mb-2">Margem bruta:</p>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold">{grossMargin}%</span>
            <span className="bg-slate-100 p-1 rounded-full">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 16V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </div>
        </div>
        
        <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
          <p className="text-sm mb-2">Retorno sobre os ativos:</p>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-red-500">{returnOnAssets}%</span>
            <span className="bg-slate-100 p-1 rounded-full">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 16V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </div>
        </div>
        
        <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
          <p className="text-sm mb-2">Lucro por ação:</p>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-red-500">-$ {Math.abs(earningsPerShare).toFixed(2)}</span>
            <span className="bg-slate-100 p-1 rounded-full">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 16V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </div>
        </div>
        
        <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
          <p className="text-sm mb-2">Receita por colaborador:</p>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold">$ {employeeRevenue.toLocaleString()}</span>
            <span className="bg-slate-100 p-1 rounded-full">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 16V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </div>
        </div>
        
        <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
          <p className="text-sm mb-2">Risco sobre créditos e numerário:</p>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold">{cashRisk}%</span>
            <span className="bg-slate-100 p-1 rounded-full">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 16V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </div>
        </div>
        
        <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
          <p className="text-sm mb-2">Risco para valores a receber:</p>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold">{receivablesRisk}%</span>
            <span className="bg-slate-100 p-1 rounded-full">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 16V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </div>
        </div>
        
        <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
          <p className="text-sm mb-2">Risco de endividamento:</p>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold">{debtRisk}%</span>
            <span className="bg-slate-100 p-1 rounded-full">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 16V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainIndicators;

