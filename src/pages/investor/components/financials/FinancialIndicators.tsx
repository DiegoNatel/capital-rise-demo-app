
import { Calendar, TrendingUp, Briefcase } from "lucide-react";

interface FinancialIndicatorsProps {
  companyData: any;
}

const FinancialIndicators = ({ companyData }: FinancialIndicatorsProps) => {
  return (
    <div>
      <h3 className="font-medium text-lg mb-4">Indicadores Financeiros</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <Calendar className="h-5 w-5 text-slate-500 mr-2" />
            <h4 className="font-medium">Margem Líquida</h4>
          </div>
          <p className="text-2xl font-semibold">
            {Math.round((companyData.financials.profit[companyData.financials.profit.length - 1] / companyData.financials.revenue[companyData.financials.revenue.length - 1]) * 100)}%
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Último ano fiscal
          </p>
        </div>
        
        <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <TrendingUp className="h-5 w-5 text-slate-500 mr-2" />
            <h4 className="font-medium">Taxa de Crescimento</h4>
          </div>
          <p className="text-2xl font-semibold">
            {companyData.growth}%
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            CAGR 3 anos
          </p>
        </div>
        
        <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <Briefcase className="h-5 w-5 text-slate-500 mr-2" />
            <h4 className="font-medium">ROI Projetado</h4>
          </div>
          <p className="text-2xl font-semibold">
            32%
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            5 anos (estimativa)
          </p>
        </div>
      </div>
    </div>
  );
};

export default FinancialIndicators;
