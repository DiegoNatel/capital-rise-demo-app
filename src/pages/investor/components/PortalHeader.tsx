
import { Link } from "react-router-dom";
import { DollarSign, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const PortalHeader = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
      <div>
        <h1 className="text-3xl font-bold">Oportunidades de Investimento</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Explore ofertas de empresas inovadoras em diversos setores
        </p>
      </div>
      
      <div className="flex items-center gap-2">
        <div className="bg-slate-50 dark:bg-slate-800 rounded-full flex overflow-hidden p-1 shadow-sm border border-slate-200 dark:border-slate-700">
          <Button 
            variant="ghost" 
            className="rounded-full flex items-center gap-2 px-4 hover:bg-white dark:hover:bg-slate-700"
            asChild
          >
            <Link to="/investor/portfolio">
              <DollarSign className="h-4 w-4" />
              <span>Meu Portfólio</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PortalHeader;
