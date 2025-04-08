
import React from "react";
import { CheckCircle, FileText, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DocumentsStepProps {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

const DocumentsStep = ({ formData, setFormData }: DocumentsStepProps) => {
  return (
    <div className="space-y-6">
      <div className="border border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-6">
        <div className="flex flex-col items-center justify-center text-center">
          <Upload className="h-10 w-10 text-slate-400 mb-4" />
          <h3 className="font-medium text-lg mb-1">Pitch Deck / Apresentação</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
            Faça upload da apresentação com informações da empresa e da oportunidade
          </p>
          <Button type="button" variant="outline" className="relative">
            <span>Selecionar Arquivo</span>
            <input 
              type="file" 
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
              onChange={(e) => setFormData(prev => ({ ...prev, documentsPitch: e.target.files?.[0] || null }))}
            />
          </Button>
          
          {formData.documentsPitch && (
            <div className="mt-4 text-sm">
              <p className="flex items-center text-green-600 dark:text-green-400">
                <CheckCircle className="h-4 w-4 mr-1" />
                {formData.documentsPitch.name}
              </p>
            </div>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-6">
          <div className="flex flex-col items-center justify-center text-center">
            <FileText className="h-8 w-8 text-slate-400 mb-4" />
            <h3 className="font-medium mb-1">Demonstrações Financeiras</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
              Balanço patrimonial, DRE, projeções
            </p>
            <Button type="button" variant="outline" size="sm" className="relative">
              <span>Selecionar Arquivo</span>
              <input 
                type="file" 
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                onChange={(e) => setFormData(prev => ({ ...prev, documentsFinancial: e.target.files?.[0] || null }))}
              />
            </Button>
            
            {formData.documentsFinancial && (
              <div className="mt-4 text-sm">
                <p className="flex items-center text-green-600 dark:text-green-400">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  {formData.documentsFinancial.name}
                </p>
              </div>
            )}
          </div>
        </div>
        
        <div className="border border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-6">
          <div className="flex flex-col items-center justify-center text-center">
            <FileText className="h-8 w-8 text-slate-400 mb-4" />
            <h3 className="font-medium mb-1">Documentos Legais</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
              Contrato social, certidões, autorizações
            </p>
            <Button type="button" variant="outline" size="sm" className="relative">
              <span>Selecionar Arquivo</span>
              <input 
                type="file" 
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                onChange={(e) => setFormData(prev => ({ ...prev, documentsLegal: e.target.files?.[0] || null }))}
              />
            </Button>
            
            {formData.documentsLegal && (
              <div className="mt-4 text-sm">
                <p className="flex items-center text-green-600 dark:text-green-400">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  {formData.documentsLegal.name}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-100 dark:border-amber-800">
        <h4 className="font-medium text-amber-800 dark:text-amber-300 mb-2">
          Importante
        </h4>
        <p className="text-sm text-amber-700 dark:text-amber-400">
          Todos os documentos serão verificados pela equipe de compliance antes da publicação da oferta.
          Certifique-se de que as informações estão completas e precisas.
        </p>
      </div>
    </div>
  );
};

export default DocumentsStep;
