
import { useState } from "react";
import { 
  Download,
  Clock,
  Eye,
  FileText,
  FileCheck,
  File
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import VersionHistory from "./VersionHistory";
import { InvestorDocument } from "@/types/documents";

interface DocumentListProps {
  documents: InvestorDocument[];
}

const DocumentList = ({ documents }: DocumentListProps) => {
  const [selectedDocument, setSelectedDocument] = useState<InvestorDocument | null>(null);

  const getDocumentIcon = (docType: string) => {
    switch (docType) {
      case "financial":
        return <FileText className="h-5 w-5 text-blue-500" />;
      case "legal":
        return <FileCheck className="h-5 w-5 text-green-500" />;
      default:
        return <File className="h-5 w-5 text-slate-500" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date);
  };

  if (documents.length === 0) {
    return (
      <div className="text-center py-12">
        <File className="h-12 w-12 text-slate-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-slate-700">Nenhum documento encontrado</h3>
        <p className="text-slate-500">
          Tente ajustar seus filtros ou termos de busca
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-md border">
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
            <TableRow key={doc.id}>
              <TableCell className="font-medium flex items-center gap-2">
                {getDocumentIcon(doc.type)}
                {doc.title}
              </TableCell>
              <TableCell>{doc.company}</TableCell>
              <TableCell>{formatDate(doc.publishedAt)}</TableCell>
              <TableCell>v{doc.version}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setSelectedDocument(doc)}
                      >
                        <Clock className="h-3.5 w-3.5 mr-1" />
                        Histórico
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Histórico de Versões</DialogTitle>
                        <DialogDescription>
                          Histórico de alterações do documento {selectedDocument?.title}
                        </DialogDescription>
                      </DialogHeader>
                      {selectedDocument && (
                        <VersionHistory documentId={selectedDocument.id} />
                      )}
                    </DialogContent>
                  </Dialog>
                  
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
    </div>
  );
};

export default DocumentList;
