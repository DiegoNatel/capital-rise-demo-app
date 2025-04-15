
import { FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const DocumentWarning = () => {
  return (
    <Card className="bg-amber-50 dark:bg-amber-900/20 border-amber-100 dark:border-amber-800">
      <CardContent className="pt-6">
        <div className="flex items-start">
          <FileText className="text-amber-800 dark:text-amber-400 mr-4 h-5 w-5 mt-0.5" />
          <div>
            <h3 className="font-medium text-amber-800 dark:text-amber-300 mb-2">
              Importante
            </h3>
            <p className="text-sm text-amber-700 dark:text-amber-400">
              Todos os documentos serão verificados pela equipe de compliance antes de serem disponibilizados aos investidores.
              Certifique-se de que não estão sendo divulgadas informações confidenciais ou privilegiadas.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentWarning;
