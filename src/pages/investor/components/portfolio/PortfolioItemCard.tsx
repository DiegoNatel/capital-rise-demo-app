
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { PortfolioItem } from "@/data/portfolio";

interface PortfolioItemCardProps {
  item: PortfolioItem;
  formatCurrency: (value: number) => string;
  formatPercent: (value: number) => string;
}

const PortfolioItemCard = ({ item, formatCurrency, formatPercent }: PortfolioItemCardProps) => {
  return (
    <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div className="flex items-center mb-4 sm:mb-0">
          <div className="h-12 w-12 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center mr-4">
            <span className="font-bold">{item.tokenSymbol}</span>
          </div>
          <div>
            <h3 className="font-medium">{item.tokenName}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {item.companyName}
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full sm:w-auto">
          <div className="text-center sm:text-right">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Quantidade
            </p>
            <p className="font-medium">
              {item.quantity.toLocaleString()} {item.tokenSymbol}
            </p>
          </div>
          
          <div className="text-center sm:text-right">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Valor Atual
            </p>
            <p className="font-medium">
              {formatCurrency(item.currentValue)}
            </p>
          </div>
          
          <div className="text-center sm:text-right">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Lucro/Prejuízo
            </p>
            <p
              className={`font-medium ${
                item.profitLoss >= 0
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {formatCurrency(item.profitLoss)}
            </p>
          </div>
          
          <div className="text-center sm:text-right">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Rendimento
            </p>
            <p
              className={`font-medium flex items-center justify-center sm:justify-end ${
                item.profitLossPercentage >= 0
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {item.profitLossPercentage >= 0 ? (
                <ArrowUpRight className="h-3 w-3 mr-1" />
              ) : (
                <ArrowDownRight className="h-3 w-3 mr-1" />
              )}
              {formatPercent(item.profitLossPercentage)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioItemCard;
