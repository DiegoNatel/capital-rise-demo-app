
import VersionHistory from "./VersionHistory";
import AccessControl from "./AccessControl";
import DocumentAnalytics from "./DocumentAnalytics";

interface ManagementContentProps {
  activeManagementTool: string | null;
  selectedDocumentId: string | null;
}

const ManagementContent = ({ activeManagementTool, selectedDocumentId }: ManagementContentProps) => {
  if (!activeManagementTool) return null;

  return (
    <div className="mb-6">
      <h3 className="text-xl font-semibold mb-2">
        {activeManagementTool === "version-history" && "Histórico de Versões"}
        {activeManagementTool === "access-control" && "Controle de Acesso"}
        {activeManagementTool === "analytics" && "Análise de Documentos"}
      </h3>
      <div className="mb-4">
        {activeManagementTool === "version-history" && (
          <VersionHistory documentId={selectedDocumentId || "doc-001"} />
        )}
        {activeManagementTool === "access-control" && (
          <AccessControl />
        )}
        {activeManagementTool === "analytics" && (
          <DocumentAnalytics />
        )}
      </div>
    </div>
  );
};

export default ManagementContent;
