
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { 
  Tabs, 
  TabsContent
} from "@/components/ui/tabs";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { investorDocuments } from "@/data/documents";
import ManagementSidebar from "./components/documents/ManagementSidebar";
import DocumentTabs from "./components/documents/DocumentTabs";
import DocumentTable from "./components/documents/DocumentTable";
import ManagementContent from "./components/documents/ManagementContent";

const DocumentRepository = () => {
  const [activeTab, setActiveTab] = useState("financial");
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [selectedDocumentId, setSelectedDocumentId] = useState<string | null>(null);
  const [activeManagementTool, setActiveManagementTool] = useState<string | null>(null);

  const filteredDocuments = investorDocuments.filter((doc) => {
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = category === "all" || doc.category === category;
    const matchesTab = doc.type === activeTab;
    
    return matchesSearch && matchesCategory && matchesTab;
  });

  const handleDocumentSelect = (documentId: string) => {
    setSelectedDocumentId(documentId);
  };

  const handleToolSelect = (tool: string) => {
    setActiveManagementTool(activeManagementTool === tool ? null : tool);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleHistoryClick = (documentId: string) => {
    setSelectedDocumentId(documentId);
    setActiveManagementTool("version-history");
  };
    
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date);
  };

  return (
    <MainLayout>
      <div className="container py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Repositório de Documentos</h1>
          <p className="text-slate-600 mt-2">
            Acesse todos os documentos relacionados às suas empresas investidas
          </p>
        </div>

        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Buscar documentos..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Todas as categorias" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as categorias</SelectItem>
                    <SelectItem value="annual">Relatórios Anuais</SelectItem>
                    <SelectItem value="quarterly">Relatórios Trimestrais</SelectItem>
                    <SelectItem value="legal">Documentos Legais</SelectItem>
                    <SelectItem value="presentation">Apresentações</SelectItem>
                    <SelectItem value="prospectus">Prospectos</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-6">
          <Card>
            <CardContent className="p-0">
              <Tabs 
                defaultValue="financial" 
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <div className="flex flex-col md:flex-row border-b">
                  <ManagementSidebar 
                    activeManagementTool={activeManagementTool} 
                    onToolSelect={handleToolSelect} 
                  />
                  
                  <div className="flex-1">
                    <DocumentTabs activeTab={activeTab} onTabChange={handleTabChange} />
                    
                    <div className="p-4">
                      <ManagementContent 
                        activeManagementTool={activeManagementTool} 
                        selectedDocumentId={selectedDocumentId} 
                      />

                      {!activeManagementTool && (
                        <>
                          <TabsContent value="financial" className="mt-0">
                            <DocumentTable 
                              documents={filteredDocuments} 
                              formatDate={formatDate} 
                              onHistoryClick={handleHistoryClick} 
                            />
                          </TabsContent>

                          <TabsContent value="legal" className="mt-0">
                            <DocumentTable 
                              documents={filteredDocuments} 
                              formatDate={formatDate} 
                              onHistoryClick={handleHistoryClick} 
                            />
                          </TabsContent>

                          <TabsContent value="presentations" className="mt-0">
                            <DocumentTable 
                              documents={filteredDocuments} 
                              formatDate={formatDate} 
                              onHistoryClick={handleHistoryClick} 
                            />
                          </TabsContent>
                          
                          <TabsContent value="others" className="mt-0">
                            <DocumentTable 
                              documents={filteredDocuments} 
                              formatDate={formatDate} 
                              onHistoryClick={handleHistoryClick} 
                            />
                          </TabsContent>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default DocumentRepository;
