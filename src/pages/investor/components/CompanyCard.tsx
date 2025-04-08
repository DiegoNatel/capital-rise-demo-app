
import { Link } from "react-router-dom";
import { Building, ChevronRight, Clock, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Company } from "@/data/companies";

export interface CompanyWithOffers extends Company {
  offers: any[];
  hasActiveOffer: boolean;
  hasUpcomingOffer: boolean;
}

const CompanyCard = ({ company }: { company: CompanyWithOffers }) => {
  return (
    <Link 
      key={company.id} 
      to={`/company/${company.id}`}
      className="block"
    >
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 border border-slate-200 dark:border-slate-700 h-full relative">
        {company.hasActiveOffer && (
          <div className="absolute top-4 right-4 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 rounded-full px-3 py-1 text-xs font-medium flex items-center">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Rodada Ativa
          </div>
        )}
        {!company.hasActiveOffer && company.hasUpcomingOffer && (
          <div className="absolute top-4 right-4 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 rounded-full px-3 py-1 text-xs font-medium flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            Em Breve
          </div>
        )}
        <div className="flex items-center mb-4">
          <div className="h-12 w-12 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center mr-4">
            <Building className="h-6 w-6 text-slate-500" />
          </div>
          <div>
            <h3 className="font-medium text-lg">{company.name}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">{company.industry}</p>
          </div>
        </div>
        
        <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 line-clamp-2">
          {company.description}
        </p>
        
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="bg-slate-50 dark:bg-slate-700 rounded p-2">
            <p className="text-xs text-slate-500 dark:text-slate-400">Valuation</p>
            <p className="font-medium">R$ {(company.valuation / 1000000).toFixed(1)}M</p>
          </div>
          <div className="bg-slate-50 dark:bg-slate-700 rounded p-2">
            <p className="text-xs text-slate-500 dark:text-slate-400">Crescimento</p>
            <p className="font-medium text-green-500">+{company.growth}%</p>
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button variant="ghost" size="sm" className="gap-1">
            Ver Detalhes <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Link>
  );
};

export default CompanyCard;
