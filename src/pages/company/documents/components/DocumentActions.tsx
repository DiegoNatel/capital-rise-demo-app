
import { Plus, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DocumentActionsProps {
  showUploadForm: boolean;
  showAccessControl: boolean;
  setShowUploadForm: (show: boolean) => void;
  setShowAccessControl: (show: boolean) => void;
}

const DocumentActions = ({ 
  showUploadForm, 
  showAccessControl, 
  setShowUploadForm, 
  setShowAccessControl 
}: DocumentActionsProps) => {
  return (
    <div className="flex space-x-2">
      <Button
        variant="outline"
        onClick={() => {
          setShowAccessControl(!showAccessControl);
          if (showUploadForm) setShowUploadForm(false);
        }}
        className="flex items-center"
      >
        {showAccessControl ? (
          <>Ocultar Controle de Acesso</>
        ) : (
          <>
            <Shield className="mr-2 h-4 w-4" />
            Controle de Acesso
          </>
        )}
      </Button>
      <Button
        onClick={() => {
          setShowUploadForm(!showUploadForm);
          if (showAccessControl) setShowAccessControl(false);
        }}
        className="flex items-center"
      >
        {showUploadForm ? (
          <>Cancelar</>
        ) : (
          <>
            <Plus className="mr-2 h-4 w-4" />
            Adicionar Documento
          </>
        )}
      </Button>
    </div>
  );
};

export default DocumentActions;
