
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const EditProfileHeader = () => {
  const navigate = useNavigate();
  
  return (
    <>
      <Button 
        variant="ghost" 
        className="flex items-center mb-6" 
        onClick={() => navigate("/company")}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Voltar ao Portal
      </Button>

      <div className="flex items-center mb-8">
        <div className="h-16 w-16 bg-white shadow rounded-xl flex items-center justify-center mr-4">
          <span className="text-xl font-bold text-brand-blue-500">ED</span>
        </div>
        <div>
          <h1 className="text-3xl font-bold">Editar Perfil da Empresa</h1>
          <p className="text-slate-500 dark:text-slate-400">
            Atualize as informações da sua empresa
          </p>
        </div>
      </div>
    </>
  );
};

export default EditProfileHeader;

