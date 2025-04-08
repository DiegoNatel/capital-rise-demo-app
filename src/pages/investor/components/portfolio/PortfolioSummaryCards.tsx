
import { DollarSign, BarChart3, ArrowUpRight, PieChart as PieChartIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface PortfolioSummaryCardsProps {
  totalInvestment: number;
  currentValue: number;
  totalProfitLoss: number;
  totalProfitLossPercentage: number;
  formatCurrency: (value: number) => string;
}

const PortfolioSummaryCards = ({
  totalInvestment,
  currentValue,
  totalProfitLoss,
  totalProfitLossPercentage,
  formatCurrency,
}: PortfolioSummaryCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Investimento Total
              </p>
              <h3 className="text-2xl font-bold mt-1">
                {formatCurrency(totalInvestment)}
              </h3>
            </div>
            <div className="h-12 w-12 rounded-full bg-brand-blue-100 dark:bg-brand-blue-900/30 flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-brand-blue-500" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Valor Atual
              </p>
              <h3 className="text-2xl font-bold mt-1">
                {formatCurrency(currentValue)}
              </h3>
            </div>
            <div className="h-12 w-12 rounded-full bg-brand-green-100 dark:bg-brand-green-900/30 flex items-center justify-center">
              <BarChart3 className="h-6 w-6 text-brand-green-500" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Lucro/Prejuízo
              </p>
              <h3 className="text-2xl font-bold mt-1 text-green-500">
                {formatCurrency(totalProfitLoss)}
              </h3>
            </div>
            <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <ArrowUpRight className="h-6 w-6 text-green-500" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Rendimento (%)
              </p>
              <h3 className="text-2xl font-bold mt-1 text-green-500">
                +{totalProfitLossPercentage.toFixed(2)}%
              </h3>
            </div>
            <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <PieChartIcon className="h-6 w-6 text-green-500" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PortfolioSummaryCards;
