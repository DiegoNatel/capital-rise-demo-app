
import React from "react";
import { AlertTriangle, CheckCircle, CurrencyBitcoin, FileText, Shield } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface BinanceRequirement {
  id: string;
  label: string;
  description: string;
  required: boolean;
}

interface BinanceStepProps {
  formData: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleCheckboxChange: (name: string, checked: boolean) => void;
  handleBinanceRequirementChange: (requirementId: string, checked: boolean) => void;
  handleSelectChange: (name: string, value: string) => void;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  binanceRequirements: BinanceRequirement[];
}

const BinanceStep = ({ 
  formData, 
  handleInputChange, 
  handleCheckboxChange, 
  handleBinanceRequirementChange, 
  handleSelectChange, 
  setFormData,
  binanceRequirements
}: BinanceStepProps) => {
  // Calculate the number of Binance requirements met
  const binanceRequirementsMet = Object.values(formData.binanceRequirements).filter(Boolean).length;
  const totalBinanceRequirements = binanceRequirements.length;
  const requiredBinanceRequirementsMet = binanceRequirements
    .filter(req => req.required)
    .filter(req => formData.binanceRequirements[req.id])
    .length;
  const totalRequiredBinanceRequirements = binanceRequirements.filter(req => req.required).length;

  return (
    <div className="space-y-6">
      <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-100 dark:border-amber-800 mb-6">
        <h4 className="font-medium text-amber-800 dark:text-amber-300 mb-2 flex items-center">
          <AlertTriangle className="h-5 w-5 mr-2" />
          Integração com Binance
        </h4>
        <p className="text-sm text-amber-700 dark:text-amber-400">
          Listar seu token na Binance requer atender a requisitos específicos e passar por um processo de aprovação.
          A Binance tem critérios rigorosos para listar novos tokens.
        </p>
      </div>

      <div className="flex items-start mb-6">
        <input 
          type="checkbox" 
          id="listOnBinance" 
          className="h-4 w-4 mt-1 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" 
          checked={formData.listOnBinance}
          onChange={(e) => handleCheckboxChange("listOnBinance", e.target.checked)}
        />
        <div className="ml-3">
          <Label htmlFor="listOnBinance" className="text-lg font-medium flex items-center">
            <CurrencyBitcoin className="h-5 w-5 mr-2 text-amber-500" />
            Desejo listar meu token na Binance
          </Label>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Ao marcar esta opção, você indica interesse em listar seu token na Binance e deve atender aos requisitos abaixo.
          </p>
        </div>
      </div>

      {formData.listOnBinance && (
        <>
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4 mb-6">
            <h3 className="font-medium text-lg mb-4 flex items-center">
              <Shield className="h-5 w-5 mr-2 text-blue-500" />
              Requisitos da Binance
            </h3>
            
            <div className="space-y-4 mb-4">
              {binanceRequirements.map((requirement) => (
                <div key={requirement.id} className="flex items-start">
                  <input 
                    type="checkbox" 
                    id={requirement.id} 
                    className="h-4 w-4 mt-1 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" 
                    checked={formData.binanceRequirements[requirement.id] || false}
                    onChange={(e) => handleBinanceRequirementChange(requirement.id, e.target.checked)}
                  />
                  <div className="ml-3">
                    <Label htmlFor={requirement.id} className="font-medium flex items-center">
                      {requirement.label}
                      {requirement.required && (
                        <span className="ml-1 text-red-500">*</span>
                      )}
                    </Label>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {requirement.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-slate-50 dark:bg-slate-700 p-3 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm font-medium">Progresso dos Requisitos</p>
                <p className="text-sm font-medium">
                  {requiredBinanceRequirementsMet}/{totalRequiredBinanceRequirements} obrigatórios • 
                  {binanceRequirementsMet}/{totalBinanceRequirements} total
                </p>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-600 rounded-full h-2.5">
                <div className="bg-blue-500 h-2.5 rounded-full" 
                  style={{ width: `${(binanceRequirementsMet / totalBinanceRequirements) * 100}%` }}></div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="binanceTokenType">
                Tipo de Token
              </Label>
              <Select 
                name="binanceTokenType" 
                value={formData.binanceTokenType} 
                onValueChange={(value) => handleSelectChange("binanceTokenType", value)}
              >
                <SelectTrigger id="binanceTokenType" className="mt-1">
                  <SelectValue placeholder="Selecione o tipo de token" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="BEP20">BEP-20 (Binance Smart Chain)</SelectItem>
                  <SelectItem value="BEP2">BEP-2 (Binance Chain)</SelectItem>
                  <SelectItem value="BEP8">BEP-8 (Binance Chain Mini-Tokens)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="binanceComplianceContact">
                Contato do Responsável por Compliance
              </Label>
              <Input 
                id="binanceComplianceContact"
                name="binanceComplianceContact"
                value={formData.binanceComplianceContact}
                onChange={handleInputChange}
                placeholder="nome@empresa.com"
                className="mt-1"
                type="email"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="border border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-4">
              <div className="flex flex-col items-center justify-center text-center">
                <FileText className="h-8 w-8 text-slate-400 mb-4" />
                <h3 className="font-medium mb-1">White Paper</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                  Documento detalhado sobre o projeto, tokenomics e utilidade
                </p>
                <Button type="button" variant="outline" size="sm" className="relative">
                  <span>Selecionar Arquivo</span>
                  <input 
                    type="file" 
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                    onChange={(e) => setFormData(prev => ({ ...prev, binanceWhitePaper: e.target.files?.[0] || null }))}
                  />
                </Button>
                
                {formData.binanceWhitePaper && (
                  <div className="mt-4 text-sm">
                    <p className="flex items-center text-green-600 dark:text-green-400">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      {formData.binanceWhitePaper.name}
                    </p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="border border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-4">
              <div className="flex flex-col items-center justify-center text-center">
                <Shield className="h-8 w-8 text-slate-400 mb-4" />
                <h3 className="font-medium mb-1">Auditoria de Smart Contract</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                  Relatório de auditoria de segurança do contrato
                </p>
                <Button type="button" variant="outline" size="sm" className="relative">
                  <span>Selecionar Arquivo</span>
                  <input 
                    type="file" 
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                    onChange={(e) => setFormData(prev => ({ ...prev, binanceSmartContractAudit: e.target.files?.[0] || null }))}
                  />
                </Button>
                
                {formData.binanceSmartContractAudit && (
                  <div className="mt-4 text-sm">
                    <p className="flex items-center text-green-600 dark:text-green-400">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      {formData.binanceSmartContractAudit.name}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BinanceStep;
