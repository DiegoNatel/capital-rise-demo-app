
import { FileText } from "lucide-react";
import { InvestorDocument } from "@/types/documents";
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
import CompanyDocumentTable from "../CompanyDocumentTable";

interface DocumentTabsProps {
  documents: InvestorDocument[];
  onDeleteDocument: (id: string) => void;
}

const DocumentTabs = ({ documents, onDeleteDocument }: DocumentTabsProps) => {
  return (
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
              onDeleteDocument={onDeleteDocument}
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
              onDeleteDocument={onDeleteDocument}
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
              onDeleteDocument={onDeleteDocument}
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
              onDeleteDocument={onDeleteDocument}
            />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default DocumentTabs;
