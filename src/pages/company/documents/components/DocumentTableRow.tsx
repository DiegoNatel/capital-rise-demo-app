
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { InvestorDocument } from "@/types/documents";
import { getDocumentIcon, getAccessLevelBadge } from "./DocumentIcons";
import DocumentActions from "./DocumentActions";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface DocumentTableRowProps {
  document: InvestorDocument;
  onDeleteDocument: (id: string) => void;
}

const DocumentTableRow = ({ document, onDeleteDocument }: DocumentTableRowProps) => {
  return (
    <tr className="border-b hover:bg-gray-50 dark:hover:bg-gray-900/10">
      <td className="py-3 px-4">
        <div className="flex items-center">
          {getDocumentIcon(document.type)}
          <div className="ml-3">
            <div className="font-medium">{document.title}</div>
            <div className="text-sm text-gray-500">{document.description}</div>
          </div>
        </div>
      </td>
      <td className="py-3 px-4">
        <span className="capitalize">{document.category}</span>
      </td>
      <td className="py-3 px-4">
        {format(new Date(document.publishedAt), "dd/MM/yyyy", { locale: ptBR })}
      </td>
      <td className="py-3 px-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center">
                {getAccessLevelBadge(document.accessLevel)}
              </div>
            </TooltipTrigger>
            <TooltipContent>
              {document.accessLevel === 'public' && 'Visível para todos os investidores'}
              {document.accessLevel === 'registered' && 'Somente investidores registrados'}
              {document.accessLevel === 'private' && 'Somente investidores atuais'}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </td>
      <td className="py-3 px-4">
        {document.fileSize}
      </td>
      <td className="py-3 px-4 text-right">
        <DocumentActions 
          documentId={document.id} 
          documentTitle={document.title}
          onDeleteDocument={onDeleteDocument}
        />
      </td>
    </tr>
  );
};

export default DocumentTableRow;
