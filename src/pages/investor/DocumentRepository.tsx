import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  FileText,
  FileCog,
  FileCheck,
  Folder,
  BarChart3,
  Search,
  Filter
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DocumentList from "./components/documents/DocumentList";
import VersionHistory from "./components/documents/VersionHistory";
import AccessControl from "./components/documents/AccessControl";
import DocumentAnalytics from "./components/documents/DocumentAnalytics";
import { investorDocuments } from "@/data/documents";

const DocumentRepository = () => {
  const [activeTab, setActiveTab] = useState("financial");
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("all");

  const filteredDocuments = investorDocuments.filter((doc) => {
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = category === "all" || doc.category === category;
    const matchesTab = doc.type === activeTab;
    
    return matchesSearch && matchesCategory && matchesTab;
  });

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

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Gerenciamento</CardTitle>
                <CardDescription>Ferramentas administrativas</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-1 px-4 pb-4">
                  <Button variant="ghost" className="w-full justify-start" onClick={() => {}}>
                    <VersionHistory documentId="doc-001" />
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" onClick={() => {}}>
                    <FileCog className="h-4 w-4 mr-2" />
                    Controle de Acesso
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" onClick={() => {}}>
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Análise de Documentos
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-3">
            <Tabs 
              defaultValue="financial" 
              value={activeTab}
              onValueChange={setActiveTab}
              className="space-y-4"
            >
              <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2">
                <TabsTrigger value="financial" className="flex items-center space-x-2">
                  <FileText className="h-4 w-4" />
                  <span>Financeiros</span>
                </TabsTrigger>
                <TabsTrigger value="legal" className="flex items-center space-x-2">
                  <FileCheck className="h-4 w-4" />
                  <span>Legais</span>
                </TabsTrigger>
                <TabsTrigger value="presentations" className="flex items-center space-x-2">
                  <Folder className="h-4 w-4" />
                  <span>Apresentações</span>
                </TabsTrigger>
                <TabsTrigger value="others" className="flex items-center space-x-2">
                  <FileCog className="h-4 w-4" />
                  <span>Outros</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="financial" className="space-y-4">
                <DocumentList documents={filteredDocuments} />
              </TabsContent>

              <TabsContent value="legal" className="space-y-4">
                <DocumentList documents={filteredDocuments} />
              </TabsContent>

              <TabsContent value="presentations" className="space-y-4">
                <DocumentList documents={filteredDocuments} />
              </TabsContent>

              <TabsContent value="others" className="space-y-4">
                <DocumentList documents={filteredDocuments} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default DocumentRepository;
