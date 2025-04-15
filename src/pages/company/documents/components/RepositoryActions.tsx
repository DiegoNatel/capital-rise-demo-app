
import { PlusCircle, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface RepositoryActionsProps {
  showUploadForm: boolean;
  showAccessControl: boolean;
  setShowUploadForm: (show: boolean) => void;
  setShowAccessControl: (show: boolean) => void;
}

const RepositoryActions = ({
  showUploadForm,
  showAccessControl,
  setShowUploadForm,
  setShowAccessControl,
}: RepositoryActionsProps) => {
  return (
    <div className="flex gap-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={showAccessControl ? "default" : "outline"}
              size="sm"
              onClick={() => setShowAccessControl(!showAccessControl)}
              className="flex items-center"
            >
              <Lock className="mr-2 h-4 w-4" />
              Controle de Acesso
            </Button>
          </TooltipTrigger>
          <TooltipContent>Gerenciar quem pode acessar seus documentos</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Button
        variant={showUploadForm ? "default" : "outline"}
        size="sm"
        onClick={() => setShowUploadForm(!showUploadForm)}
        className="flex items-center"
      >
        <PlusCircle className="mr-2 h-4 w-4" />
        {showUploadForm ? "Cancelar" : "Adicionar Documento"}
      </Button>
    </div>
  );
};

export default RepositoryActions;
