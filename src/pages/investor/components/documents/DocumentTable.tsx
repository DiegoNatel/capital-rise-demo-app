
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Download, Clock, Eye, FileText, FileCheck, Folder, FileCog } from "lucide-react";

interface DocumentTableProps {
  documents: Array<{
    id: string;
    title: string;
    company: string;
    publishedAt: string;
    version: string;
    type: string;
    url: string;
  }>;
  formatDate: (dateString: string) => string;
  onHistoryClick: (documentId: string) => void;
}

const DocumentTable = ({ documents, formatDate, onHistoryClick }: DocumentTableProps) => {
  const getDocumentIcon = (docType: string) => {
    switch (docType) {
      case "financial":
        return <FileText className="h-5 w-5 text-blue-500" />;
      case "legal":
        return <FileCheck className="h-5 w-5 text-green-500" />;
      case "presentations":
        return <Folder className="h-5 w-5 text-yellow-500" />;
      default:
        return <FileCog className="h-5 w-5 text-slate-500" />;
    }
  };

  return (
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
        {documents.map((doc) => (
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
                  onClick={() => onHistoryClick(doc.id)}
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
  );
};

export default DocumentTable;
