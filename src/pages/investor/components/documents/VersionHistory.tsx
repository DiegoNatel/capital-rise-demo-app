
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Download, Clock, FileText } from "lucide-react";
import { documentVersions } from "@/data/documents";

interface VersionHistoryProps {
  documentId: string;
}

const VersionHistory = ({ documentId }: VersionHistoryProps) => {
  // Filter versions for this document
  const versions = documentVersions.filter(
    (version) => version.documentId === documentId
  ).sort((a, b) => b.version - a.version);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  if (versions.length === 0) {
    return <div className="py-4">Nenhum histórico de versão disponível.</div>;
  }

  return (
    <div className="overflow-x-auto rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Versão</TableHead>
            <TableHead>Data de Modificação</TableHead>
            <TableHead>Modificado Por</TableHead>
            <TableHead>Alterações</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {versions.map((version) => (
            <TableRow key={version.id}>
              <TableCell className="font-medium">v{version.version}</TableCell>
              <TableCell>{formatDate(version.modifiedAt)}</TableCell>
              <TableCell>{version.modifiedBy}</TableCell>
              <TableCell>{version.changeDescription}</TableCell>
              <TableCell className="text-right">
                <Button variant="outline" size="sm">
                  <Download className="h-3.5 w-3.5 mr-1" />
                  Download
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default VersionHistory;
