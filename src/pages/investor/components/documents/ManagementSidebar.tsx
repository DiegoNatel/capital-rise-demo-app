
import { Button } from "@/components/ui/button";
import { Clock, FileCog, BarChart3 } from "lucide-react";

interface ManagementSidebarProps {
  activeManagementTool: string | null;
  onToolSelect: (tool: string) => void;
}

const ManagementSidebar = ({ activeManagementTool, onToolSelect }: ManagementSidebarProps) => {
  return (
    <div className="p-4 md:w-64 border-r">
      <h3 className="text-lg font-semibold mb-2">Gerenciamento</h3>
      <p className="text-sm text-muted-foreground mb-4">Ferramentas administrativas</p>
      
      <div className="space-y-1">
        <Button 
          variant={activeManagementTool === "version-history" ? "secondary" : "ghost"}
          className="w-full justify-start"
          onClick={() => onToolSelect("version-history")}
        >
          <Clock className="h-4 w-4 mr-2" />
          Histórico de Versões
        </Button>
        <Button 
          variant={activeManagementTool === "access-control" ? "secondary" : "ghost"}
          className="w-full justify-start"
          onClick={() => onToolSelect("access-control")}
        >
          <FileCog className="h-4 w-4 mr-2" />
          Controle de Acesso
        </Button>
        <Button 
          variant={activeManagementTool === "analytics" ? "secondary" : "ghost"}
          className="w-full justify-start"
          onClick={() => onToolSelect("analytics")}
        >
          <BarChart3 className="h-4 w-4 mr-2" />
          Análise de Documentos
        </Button>
      </div>
    </div>
  );
};

export default ManagementSidebar;
