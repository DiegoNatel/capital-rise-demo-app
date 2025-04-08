
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const PortalHeader = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
      <div>
        <h1 className="text-3xl font-bold">Oportunidades de Investimento</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Explore ofertas de empresas inovadoras em diversos setores
        </p>
      </div>
      
      {/* Search button to help find companies */}
      <div>
        <Button variant="outline" className="gap-2">
          <Search className="h-4 w-4" />
          <span>Pesquisar empresas</span>
        </Button>
      </div>
    </div>
  );
};

export default PortalHeader;
