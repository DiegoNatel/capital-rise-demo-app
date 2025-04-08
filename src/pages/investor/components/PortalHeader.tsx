
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, Building, Briefcase } from "lucide-react";

const PortalHeader = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
      <div>
        <h1 className="text-3xl font-bold">Oportunidades de Investimento</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Explore ofertas de empresas inovadoras em diversos setores
        </p>
      </div>
      
      <div className="flex flex-wrap gap-2">
        <Link to="/marketplace">
          <Button variant="outline" className="gap-2">
            <Briefcase className="h-4 w-4" />
            <span>Ver Marketplace</span>
          </Button>
        </Link>
        
        <Button variant="outline" className="gap-2">
          <Search className="h-4 w-4" />
          <span>Pesquisar empresas</span>
        </Button>
        
        <Link to="/company">
          <Button variant="outline" className="gap-2">
            <Building className="h-4 w-4" />
            <span>Portal da Empresa</span>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default PortalHeader;
