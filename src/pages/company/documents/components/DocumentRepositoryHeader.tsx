
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const DocumentRepositoryHeader = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex items-center mb-6">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => navigate("/company")}
        className="mr-4"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Voltar
      </Button>
      <div>
        <h1 className="text-3xl font-bold">Repositório de Documentos</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Gerencie todos os documentos da sua empresa
        </p>
      </div>
    </div>
  );
};

export default DocumentRepositoryHeader;
