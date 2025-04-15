import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { investorDocuments } from "@/data/documents";
import { InvestorDocument } from "@/types/documents";
import DocumentUploadForm from "./DocumentUploadForm";
import DocumentRepositoryHeader from "./components/DocumentRepositoryHeader";
import RepositoryActions from "./components/RepositoryActions";
import DocumentTabs from "./components/DocumentTabs";
import DocumentWarning from "./components/DocumentWarning";
import AccessControlCard from "./components/access-control/AccessControlCard";

const CompanyDocumentRepository = () => {
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [showAccessControl, setShowAccessControl] = useState(false);
  const [documents, setDocuments] = useState<InvestorDocument[]>(
    investorDocuments.filter(doc => doc.company === "TechVision Brasil")
  );

  const handleDocumentUploaded = (newDocument: InvestorDocument) => {
    setDocuments(prev => [newDocument, ...prev]);
    setShowUploadForm(false);
  };

  const handleDeleteDocument = (documentId: string) => {
    setDocuments(prev => prev.filter(doc => doc.id !== documentId));
  };

  return (
    <MainLayout>
      <div className="container py-8">
        <DocumentRepositoryHeader />

        <div className="grid grid-cols-1 gap-6">
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold">Documentos da Empresa</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Aqui você pode gerenciar todos os documentos compartilhados com investidores.
              </p>
            </div>
            <RepositoryActions 
              showUploadForm={showUploadForm} 
              showAccessControl={showAccessControl}
              setShowUploadForm={setShowUploadForm}
              setShowAccessControl={setShowAccessControl}
            />
          </div>

          {showAccessControl && <AccessControlCard />}

          {showUploadForm && (
            <DocumentUploadForm onDocumentUploaded={handleDocumentUploaded} />
          )}

          <DocumentTabs 
            documents={documents} 
            onDeleteDocument={handleDeleteDocument} 
          />

          <DocumentWarning />
        </div>
      </div>
    </MainLayout>
  );
};

export default CompanyDocumentRepository;
