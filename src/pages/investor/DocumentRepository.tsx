
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
  Filter,
  Eye,
  Download,
  Clock
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import DocumentList from "./components/documents/DocumentList";
import VersionHistory from "./components/documents/VersionHistory";
import AccessControl from "./components/documents/AccessControl";
import DocumentAnalytics from "./components/documents/DocumentAnalytics";
import { investorDocuments } from "@/data/documents";

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

  // Selected document for detail viewing
  const selectedDocument = selectedDocumentId 
    ? investorDocuments.find(doc => doc.id === selectedDocumentId)
    : null;
    
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date);
  };

  const getDocumentIcon = (docType: string) => {
    switch (docType) {
      case "financial":
        return <FileText className="h-5 w-5 text-blue-500" />;
      case "legal":
        return <FileCheck className="h-5 w-5 text-green-500" />;
      case "presentations":
        return <Folder className="h-5 w-5 text-yellow-500" />;
      default:
        return <FileText className="h-5 w-5 text-slate-500" />;
    }
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
                  <div className="p-4 md:w-64 md:border-r">
                    <h3 className="text-lg font-semibold mb-2">Gerenciamento</h3>
                    <p className="text-sm text-muted-foreground mb-4">Ferramentas administrativas</p>
                    
                    <div className="space-y-1">
                      <Button 
                        variant={activeManagementTool === "version-history" ? "secondary" : "ghost"}
                        className="w-full justify-start"
                        onClick={() => handleToolSelect("version-history")}
                      >
                        <Clock className="h-4 w-4 mr-2" />
                        Histórico de Versões
                      </Button>
                      <Button 
                        variant={activeManagementTool === "access-control" ? "secondary" : "ghost"}
                        className="w-full justify-start"
                        onClick={() => handleToolSelect("access-control")}
                      >
                        <FileCog className="h-4 w-4 mr-2" />
                        Controle de Acesso
                      </Button>
                      <Button 
                        variant={activeManagementTool === "analytics" ? "secondary" : "ghost"}
                        className="w-full justify-start"
                        onClick={() => handleToolSelect("analytics")}
                      >
                        <BarChart3 className="h-4 w-4 mr-2" />
                        Análise de Documentos
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
                      <div className="flex overflow-x-auto">
                        <TabsTrigger 
                          value="financial" 
                          className="flex items-center data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:shadow-none"
                        >
                          <FileText className="h-4 w-4 mr-2" />
                          <span>Financeiros</span>
                        </TabsTrigger>
                        <TabsTrigger 
                          value="legal" 
                          className="flex items-center data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:shadow-none"
                        >
                          <FileCheck className="h-4 w-4 mr-2" />
                          <span>Legais</span>
                        </TabsTrigger>
                        <TabsTrigger 
                          value="presentations" 
                          className="flex items-center data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:shadow-none"
                        >
                          <Folder className="h-4 w-4 mr-2" />
                          <span>Apresentações</span>
                        </TabsTrigger>
                        <TabsTrigger 
                          value="others" 
                          className="flex items-center data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:shadow-none"
                        >
                          <FileCog className="h-4 w-4 mr-2" />
                          <span>Outros</span>
                        </TabsTrigger>
                      </div>
                    </TabsList>
                    
                    <div className="p-4">
                      {activeManagementTool ? (
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
                      ) : (
                        <>
                          <TabsContent value="financial" className="mt-0">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Documento</TableHead>
                                  <TableHead>Empresa</TableHead>
                                  <TableHead>Data de Publicação</TableHead>
                                  <TableHead>Versão</TableHead>
                                  <TableHead className="text-right">Ações</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {filteredDocuments.map((doc) => (
                                  <TableRow key={doc.id} className="cursor-pointer hover:bg-muted/80">
                                    <TableCell className="font-medium flex items-center gap-2">
                                      {getDocumentIcon(doc.type)}
                                      {doc.title}
                                    </TableCell>
                                    <TableCell>{doc.company}</TableCell>
                                    <TableCell>{formatDate(doc.publishedAt)}</TableCell>
                                    <TableCell>v{doc.version}</TableCell>
                                    <TableCell className="text-right">
                                      <div className="flex justify-end gap-2">
                                        <Button 
                                          variant="outline" 
                                          size="sm"
                                          onClick={() => {
                                            setSelectedDocumentId(doc.id);
                                            handleToolSelect("version-history");
                                          }}
                                        >
                                          <Clock className="h-3.5 w-3.5 mr-1" />
                                          Histórico
                                        </Button>
                                        
                                        <Button
                                          variant="outline"
                                          size="sm"
                                          onClick={() => window.open(doc.url, "_blank")}
                                        >
                                          <Eye className="h-3.5 w-3.5 mr-1" />
                                          Visualizar
                                        </Button>
                                        
                                        <Button variant="default" size="sm">
                                          <Download className="h-3.5 w-3.5 mr-1" />
                                          Download
                                        </Button>
                                      </div>
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </TabsContent>

                          <TabsContent value="legal" className="mt-0">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Documento</TableHead>
                                  <TableHead>Empresa</TableHead>
                                  <TableHead>Data de Publicação</TableHead>
                                  <TableHead>Versão</TableHead>
                                  <TableHead className="text-right">Ações</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {filteredDocuments.map((doc) => (
                                  <TableRow key={doc.id} className="cursor-pointer hover:bg-muted/80">
                                    <TableCell className="font-medium flex items-center gap-2">
                                      {getDocumentIcon(doc.type)}
                                      {doc.title}
                                    </TableCell>
                                    <TableCell>{doc.company}</TableCell>
                                    <TableCell>{formatDate(doc.publishedAt)}</TableCell>
                                    <TableCell>v{doc.version}</TableCell>
                                    <TableCell className="text-right">
                                      <div className="flex justify-end gap-2">
                                        <Button 
                                          variant="outline" 
                                          size="sm"
                                          onClick={() => {
                                            setSelectedDocumentId(doc.id);
                                            handleToolSelect("version-history");
                                          }}
                                        >
                                          <Clock className="h-3.5 w-3.5 mr-1" />
                                          Histórico
                                        </Button>
                                        
                                        <Button
                                          variant="outline"
                                          size="sm"
                                          onClick={() => window.open(doc.url, "_blank")}
                                        >
                                          <Eye className="h-3.5 w-3.5 mr-1" />
                                          Visualizar
                                        </Button>
                                        
                                        <Button variant="default" size="sm">
                                          <Download className="h-3.5 w-3.5 mr-1" />
                                          Download
                                        </Button>
                                      </div>
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </TabsContent>

                          <TabsContent value="presentations" className="mt-0">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Documento</TableHead>
                                  <TableHead>Empresa</TableHead>
                                  <TableHead>Data de Publicação</TableHead>
                                  <TableHead>Versão</TableHead>
                                  <TableHead className="text-right">Ações</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {filteredDocuments.map((doc) => (
                                  <TableRow key={doc.id} className="cursor-pointer hover:bg-muted/80">
                                    <TableCell className="font-medium flex items-center gap-2">
                                      {getDocumentIcon(doc.type)}
                                      {doc.title}
                                    </TableCell>
                                    <TableCell>{doc.company}</TableCell>
                                    <TableCell>{formatDate(doc.publishedAt)}</TableCell>
                                    <TableCell>v{doc.version}</TableCell>
                                    <TableCell className="text-right">
                                      <div className="flex justify-end gap-2">
                                        <Button 
                                          variant="outline" 
                                          size="sm"
                                          onClick={() => {
                                            setSelectedDocumentId(doc.id);
                                            handleToolSelect("version-history");
                                          }}
                                        >
                                          <Clock className="h-3.5 w-3.5 mr-1" />
                                          Histórico
                                        </Button>
                                        
                                        <Button
                                          variant="outline"
                                          size="sm"
                                          onClick={() => window.open(doc.url, "_blank")}
                                        >
                                          <Eye className="h-3.5 w-3.5 mr-1" />
                                          Visualizar
                                        </Button>
                                        
                                        <Button variant="default" size="sm">
                                          <Download className="h-3.5 w-3.5 mr-1" />
                                          Download
                                        </Button>
                                      </div>
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </TabsContent>
                          
                          <TabsContent value="others" className="mt-0">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Documento</TableHead>
                                  <TableHead>Empresa</TableHead>
                                  <TableHead>Data de Publicação</TableHead>
                                  <TableHead>Versão</TableHead>
                                  <TableHead className="text-right">Ações</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {filteredDocuments.map((doc) => (
                                  <TableRow key={doc.id} className="cursor-pointer hover:bg-muted/80">
                                    <TableCell className="font-medium flex items-center gap-2">
                                      {getDocumentIcon(doc.type)}
                                      {doc.title}
                                    </TableCell>
                                    <TableCell>{doc.company}</TableCell>
                                    <TableCell>{formatDate(doc.publishedAt)}</TableCell>
                                    <TableCell>v{doc.version}</TableCell>
                                    <TableCell className="text-right">
                                      <div className="flex justify-end gap-2">
                                        <Button 
                                          variant="outline" 
                                          size="sm"
                                          onClick={() => {
                                            setSelectedDocumentId(doc.id);
                                            handleToolSelect("version-history");
                                          }}
                                        >
                                          <Clock className="h-3.5 w-3.5 mr-1" />
                                          Histórico
                                        </Button>
                                        
                                        <Button
                                          variant="outline"
                                          size="sm"
                                          onClick={() => window.open(doc.url, "_blank")}
                                        >
                                          <Eye className="h-3.5 w-3.5 mr-1" />
                                          Visualizar
                                        </Button>
                                        
                                        <Button variant="default" size="sm">
                                          <Download className="h-3.5 w-3.5 mr-1" />
                                          Download
                                        </Button>
                                      </div>
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
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
