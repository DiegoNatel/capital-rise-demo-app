
import { InvestorDocument } from "@/types/documents";
import DocumentTableRow from "./components/DocumentTableRow";
import EmptyDocumentState from "./components/EmptyDocumentState";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
} from "@/components/ui/table";

interface CompanyDocumentTableProps {
  documents: InvestorDocument[];
  onDeleteDocument: (id: string) => void;
}

const CompanyDocumentTable = ({ documents, onDeleteDocument }: CompanyDocumentTableProps) => {
  if (documents.length === 0) {
    return <EmptyDocumentState />;
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Documento</TableHead>
            <TableHead>Categoria</TableHead>
            <TableHead>Data</TableHead>
            <TableHead>Acesso</TableHead>
            <TableHead>Tamanho</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {documents.map((document) => (
            <DocumentTableRow 
              key={document.id} 
              document={document} 
              onDeleteDocument={onDeleteDocument} 
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CompanyDocumentTable;
