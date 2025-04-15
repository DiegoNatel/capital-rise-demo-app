
import { InvestorDocument } from "@/types/documents";
import { Button } from "@/components/ui/button";
import { Download, FileText, FileSpreadsheet, FileImage, Trash2, FileCode, Eye, Lock, Globe, Users } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

interface CompanyDocumentTableProps {
  documents: InvestorDocument[];
  onDeleteDocument: (id: string) => void;
}

const CompanyDocumentTable = ({ documents, onDeleteDocument }: CompanyDocumentTableProps) => {
  const [documentToDelete, setDocumentToDelete] = useState<string | null>(null);

  const getDocumentIcon = (type: string) => {
    switch (type) {
      case 'financial':
        return <FileSpreadsheet className="h-4 w-4 text-green-600" />;
      case 'legal':
        return <FileText className="h-4 w-4 text-blue-600" />;
      case 'presentations':
        return <FileImage className="h-4 w-4 text-purple-600" />;
      default:
        return <FileText className="h-4 w-4 text-gray-600" />;
    }
  };

  const getAccessLevelIcon = (accessLevel: string) => {
    switch (accessLevel) {
      case 'public':
        return <Globe className="h-4 w-4 text-green-600" />;
      case 'registered':
        return <Users className="h-4 w-4 text-blue-600" />;
      case 'private':
        return <Lock className="h-4 w-4 text-amber-600" />;
      default:
        return <Lock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getAccessLevelBadge = (accessLevel: string) => {
    switch (accessLevel) {
      case 'public':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Público</Badge>;
      case 'registered':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Registrado</Badge>;
      case 'private':
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Privado</Badge>;
      default:
        return <Badge variant="outline">Desconhecido</Badge>;
    }
  };

  const handleConfirmDelete = () => {
    if (documentToDelete) {
      onDeleteDocument(documentToDelete);
      setDocumentToDelete(null);
    }
  };

  if (documents.length === 0) {
    return (
      <div className="text-center py-12 border border-dashed rounded-lg">
        <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-1">
          Nenhum documento encontrado
        </h3>
        <p className="text-gray-500 dark:text-gray-400 mb-4 max-w-md mx-auto">
          Você ainda não possui documentos nesta categoria. Adicione documentos para compartilhar com seus investidores.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-3 px-4 font-medium text-sm">Documento</th>
            <th className="text-left py-3 px-4 font-medium text-sm">Categoria</th>
            <th className="text-left py-3 px-4 font-medium text-sm">Data</th>
            <th className="text-left py-3 px-4 font-medium text-sm">Acesso</th>
            <th className="text-left py-3 px-4 font-medium text-sm">Tamanho</th>
            <th className="text-right py-3 px-4 font-medium text-sm">Ações</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((document) => (
            <tr key={document.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-900/10">
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
                <div className="flex justify-end items-center">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        Visualizar
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Download className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        Download
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  
                  <AlertDialog open={documentToDelete === document.id} onOpenChange={(open) => !open && setDocumentToDelete(null)}>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                        onClick={() => setDocumentToDelete(document.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Excluir documento</AlertDialogTitle>
                        <AlertDialogDescription>
                          Tem certeza que deseja excluir o documento "{document.title}"? Esta ação não pode ser desfeita.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction 
                          className="bg-red-600 hover:bg-red-700"
                          onClick={handleConfirmDelete}
                        >
                          Excluir
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompanyDocumentTable;
