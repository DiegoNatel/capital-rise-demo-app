
import { FileText } from "lucide-react";

const EmptyDocumentState = () => {
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
};

export default EmptyDocumentState;
