
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus, FileText, Filter, Shield, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription 
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { investorDocuments } from "@/data/documents";
import { InvestorDocument } from "@/types/documents";
import DocumentUploadForm from "./DocumentUploadForm";
import CompanyDocumentTable from "./CompanyDocumentTable";
import AccessControl from "../../investor/components/documents/AccessControl";

const CompanyDocumentRepository = () => {
  const navigate = useNavigate();
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [showAccessControl, setShowAccessControl] = useState(false);
  const [documents, setDocuments] = useState<InvestorDocument[]>(
    // Filter to only show the current company's documents
    // In a real app, this would be based on the logged-in company
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

        <div className="grid grid-cols-1 gap-6">
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold">Documentos da Empresa</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Aqui você pode gerenciar todos os documentos compartilhados com investidores.
              </p>
            </div>
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
          </div>

          {showAccessControl && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center">
                  <Users className="mr-2 h-5 w-5 text-blue-600" />
                  Controle de Acesso a Documentos
                </CardTitle>
                <CardDescription>
                  Defina quais tipos de investidores podem acessar os documentos da sua empresa
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AccessControl />
              </CardContent>
            </Card>
          )}

          {showUploadForm && (
            <DocumentUploadForm onDocumentUploaded={handleDocumentUploaded} />
          )}

          <Tabs defaultValue="all" className="w-full">
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                <TabsTrigger value="all">Todos</TabsTrigger>
                <TabsTrigger value="financial">Financeiros</TabsTrigger>
                <TabsTrigger value="legal">Legais</TabsTrigger>
                <TabsTrigger value="presentations">Apresentações</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all" className="mt-0">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Todos os Documentos</CardTitle>
                  <CardDescription>
                    Lista completa dos documentos da sua empresa
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <CompanyDocumentTable
                    documents={documents}
                    onDeleteDocument={handleDeleteDocument}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="financial" className="mt-0">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Documentos Financeiros</CardTitle>
                  <CardDescription>
                    Demonstrações financeiras, relatórios e projeções
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <CompanyDocumentTable
                    documents={documents.filter(doc => doc.type === 'financial')}
                    onDeleteDocument={handleDeleteDocument}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="legal" className="mt-0">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Documentos Legais</CardTitle>
                  <CardDescription>
                    Contratos, termos, regulamentos e documentação legal
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <CompanyDocumentTable
                    documents={documents.filter(doc => doc.type === 'legal')}
                    onDeleteDocument={handleDeleteDocument}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="presentations" className="mt-0">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Apresentações</CardTitle>
                  <CardDescription>
                    Pitch decks, apresentações para investidores e roadshows
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <CompanyDocumentTable
                    documents={documents.filter(doc => doc.type === 'presentations')}
                    onDeleteDocument={handleDeleteDocument}
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <Card className="bg-amber-50 dark:bg-amber-900/20 border-amber-100 dark:border-amber-800">
            <CardContent className="pt-6">
              <div className="flex items-start">
                <FileText className="text-amber-800 dark:text-amber-400 mr-4 h-5 w-5 mt-0.5" />
                <div>
                  <h3 className="font-medium text-amber-800 dark:text-amber-300 mb-2">
                    Importante
                  </h3>
                  <p className="text-sm text-amber-700 dark:text-amber-400">
                    Todos os documentos serão verificados pela equipe de compliance antes de serem disponibilizados aos investidores.
                    Certifique-se de que não estão sendo divulgadas informações confidenciais ou privilegiadas.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default CompanyDocumentRepository;
