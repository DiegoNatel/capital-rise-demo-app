
import React from "react";
import { CheckCircle, AlertTriangle } from "lucide-react";

interface ReviewStepProps {
  formData: any;
  binanceRequirements: {
    id: string;
    label: string;
    description: string;
    required: boolean;
  }[];
}

const ReviewStep = ({ formData, binanceRequirements }: ReviewStepProps) => {
  return (
    <div className="space-y-6">
      <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-100 dark:border-green-800 mb-6">
        <h4 className="font-medium text-green-800 dark:text-green-300 mb-2 flex items-center">
          <CheckCircle className="h-5 w-5 mr-2" />
          Revisar e Confirmar
        </h4>
        <p className="text-sm text-green-700 dark:text-green-400">
          Por favor, revise todos os detalhes da sua oferta antes de criar. Após a criação, alguns detalhes não poderão ser alterados.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4">
          <h3 className="font-medium text-lg mb-3">Informações Básicas</h3>
          <div className="space-y-2 text-sm">
            <p><span className="text-slate-500 dark:text-slate-400">Título:</span> <span className="font-medium">{formData.title || "Não informado"}</span></p>
            <p><span className="text-slate-500 dark:text-slate-400">Categoria:</span> <span className="font-medium">{formData.category || "Não informada"}</span></p>
            <p><span className="text-slate-500 dark:text-slate-400">Valor da Captação:</span> <span className="font-medium">R$ {formData.goalAmount ? parseFloat(formData.goalAmount).toLocaleString() : "Não informado"}</span></p>
            <p><span className="text-slate-500 dark:text-slate-400">Investimento Mínimo:</span> <span className="font-medium">R$ {formData.minInvestment ? parseFloat(formData.minInvestment).toLocaleString() : "Não informado"}</span></p>
            <p><span className="text-slate-500 dark:text-slate-400">Período:</span> <span className="font-medium">{formData.startDate && formData.endDate ? `${formData.startDate} a ${formData.endDate}` : "Não informado"}</span></p>
          </div>
        </div>
        
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4">
          <h3 className="font-medium text-lg mb-3">Tokenização</h3>
          <div className="space-y-2 text-sm">
            <p><span className="text-slate-500 dark:text-slate-400">Nome do Token:</span> <span className="font-medium">{formData.tokenName || "Não informado"}</span></p>
            <p><span className="text-slate-500 dark:text-slate-400">Símbolo:</span> <span className="font-medium">{formData.tokenSymbol || "Não informado"}</span></p>
            <p><span className="text-slate-500 dark:text-slate-400">Preço por Token:</span> <span className="font-medium">R$ {formData.tokenPrice ? parseFloat(formData.tokenPrice).toFixed(2) : "Não informado"}</span></p>
            <p><span className="text-slate-500 dark:text-slate-400">Quantidade Total:</span> <span className="font-medium">{formData.totalTokens ? parseInt(formData.totalTokens).toLocaleString() : "Não informado"}</span></p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4">
          <h3 className="font-medium text-lg mb-3">Documentos</h3>
          <div className="space-y-2 text-sm">
            <p className={`flex items-center ${formData.documentsPitch ? "text-green-600 dark:text-green-400" : "text-red-500 dark:text-red-400"}`}>
              {formData.documentsPitch ? <CheckCircle className="h-4 w-4 mr-1" /> : <AlertTriangle className="h-4 w-4 mr-1" />}
              Pitch Deck: {formData.documentsPitch ? formData.documentsPitch.name : "Não enviado"}
            </p>
            <p className={`flex items-center ${formData.documentsFinancial ? "text-green-600 dark:text-green-400" : "text-slate-500 dark:text-slate-400"}`}>
              {formData.documentsFinancial ? <CheckCircle className="h-4 w-4 mr-1" /> : "-"}
              Financeiro: {formData.documentsFinancial ? formData.documentsFinancial.name : "Não enviado"}
            </p>
            <p className={`flex items-center ${formData.documentsLegal ? "text-green-600 dark:text-green-400" : "text-slate-500 dark:text-slate-400"}`}>
              {formData.documentsLegal ? <CheckCircle className="h-4 w-4 mr-1" /> : "-"}
              Legal: {formData.documentsLegal ? formData.documentsLegal.name : "Não enviado"}
            </p>
          </div>
        </div>
        
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4">
          <h3 className="font-medium text-lg mb-3">Termos</h3>
          <div className="space-y-2 text-sm">
            <p className="flex items-center">
              {formData.termsRightToDividends ? <CheckCircle className="h-4 w-4 mr-1 text-green-600 dark:text-green-400" /> : "-"}
              <span className={formData.termsRightToDividends ? "text-green-600 dark:text-green-400" : "text-slate-500 dark:text-slate-400"}>
                Direito a Dividendos
              </span>
            </p>
            <p className="flex items-center">
              {formData.termsVotingRights ? <CheckCircle className="h-4 w-4 mr-1 text-green-600 dark:text-green-400" /> : "-"}
              <span className={formData.termsVotingRights ? "text-green-600 dark:text-green-400" : "text-slate-500 dark:text-slate-400"}>
                Direito a Voto
              </span>
            </p>
            <p>
              <span className="text-slate-500 dark:text-slate-400">Período de Bloqueio:</span>{" "}
              <span className="font-medium">
                {formData.termsLockupPeriod === "0" ? "Sem bloqueio" : `${formData.termsLockupPeriod} meses`}
              </span>
            </p>
          </div>
        </div>
      </div>
      
      {formData.listOnBinance && (
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4">
          <h3 className="font-medium text-lg mb-3">Binance</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2 text-sm">
              <p><span className="text-slate-500 dark:text-slate-400">Tipo de Token:</span> <span className="font-medium">{formData.binanceTokenType || "Não selecionado"}</span></p>
              <p><span className="text-slate-500 dark:text-slate-400">Contato Compliance:</span> <span className="font-medium">{formData.binanceComplianceContact || "Não informado"}</span></p>
              <p className={`flex items-center ${formData.binanceWhitePaper ? "text-green-600 dark:text-green-400" : "text-red-500 dark:text-red-400"}`}>
                {formData.binanceWhitePaper ? <CheckCircle className="h-4 w-4 mr-1" /> : <AlertTriangle className="h-4 w-4 mr-1" />}
                White Paper: {formData.binanceWhitePaper ? formData.binanceWhitePaper.name : "Não enviado"}
              </p>
              <p className={`flex items-center ${formData.binanceSmartContractAudit ? "text-green-600 dark:text-green-400" : "text-red-500 dark:text-red-400"}`}>
                {formData.binanceSmartContractAudit ? <CheckCircle className="h-4 w-4 mr-1" /> : <AlertTriangle className="h-4 w-4 mr-1" />}
                Auditoria: {formData.binanceSmartContractAudit ? formData.binanceSmartContractAudit.name : "Não enviado"}
              </p>
            </div>
            
            <div className="space-y-2 text-sm">
              <h4 className="font-medium">Requisitos Atendidos:</h4>
              {binanceRequirements.map(req => (
                <p key={req.id} className="flex items-center">
                  {formData.binanceRequirements[req.id] ? 
                    <CheckCircle className="h-4 w-4 mr-1 text-green-600 dark:text-green-400" /> : 
                    <AlertTriangle className={`h-4 w-4 mr-1 ${req.required ? "text-red-500" : "text-amber-500"}`} />
                  }
                  <span className={formData.binanceRequirements[req.id] ? 
                    "text-green-600 dark:text-green-400" : 
                    req.required ? "text-red-500 dark:text-red-400" : "text-amber-500 dark:text-amber-400"
                  }>
                    {req.label}
                    {req.required && !formData.binanceRequirements[req.id] && " (Obrigatório)"}
                  </span>
                </p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewStep;
