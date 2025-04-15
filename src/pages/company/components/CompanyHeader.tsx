
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileText, Pencil } from "lucide-react";

interface CompanyHeaderProps {
  companyData: any;
}

const CompanyHeader = ({ companyData }: CompanyHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-6 mb-8">
      <div className="flex-1">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="h-20 w-20 bg-white shadow rounded-xl flex items-center justify-center">
            <span className="text-2xl font-bold text-brand-blue-500">{companyData.name.substring(0, 2)}</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold">{companyData.name}</h1>
            <p className="text-slate-500 dark:text-slate-400">
              {companyData.industry} • {companyData.location} • Fundada em {companyData.foundedYear}
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-4">
            <p className="text-sm text-slate-500 dark:text-slate-400">Valuation</p>
            <p className="text-lg font-semibold">R$ {(companyData.valuation / 1000000).toFixed(1)}M</p>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-4">
            <p className="text-sm text-slate-500 dark:text-slate-400">Funcionários</p>
            <p className="text-lg font-semibold">{companyData.employees}</p>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-4">
            <p className="text-sm text-slate-500 dark:text-slate-400">Crescimento Anual</p>
            <p className="text-lg font-semibold text-green-500">+{companyData.growth}%</p>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-4">
            <p className="text-sm text-slate-500 dark:text-slate-400">Capital Captado</p>
            <p className="text-lg font-semibold">R$ 3.2M</p>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col gap-3 min-w-[200px]">
        <Button variant="outline" className="w-full" asChild>
          <Link to="/company/documents">
            <FileText className="mr-2 h-4 w-4" />
            Ver Documentos
          </Link>
        </Button>
        <Button variant="outline" className="w-full" asChild>
          <Link to="/company/edit-profile">
            <Pencil className="mr-2 h-4 w-4" />
            Editar Perfil
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default CompanyHeader;
