
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TermsStepProps {
  formData: any;
  handleCheckboxChange: (name: string, checked: boolean) => void;
  handleSelectChange: (name: string, value: string) => void;
}

const TermsStep = ({ formData, handleCheckboxChange, handleSelectChange }: TermsStepProps) => {
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4">
        <h3 className="font-medium text-lg mb-4">Direitos dos Tokens</h3>
        
        <div className="space-y-4">
          <div className="flex items-start">
            <input 
              type="checkbox" 
              id="termsRightToDividends" 
              className="h-4 w-4 mt-1 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" 
              checked={formData.termsRightToDividends}
              onChange={(e) => handleCheckboxChange("termsRightToDividends", e.target.checked)}
            />
            <div className="ml-3">
              <Label htmlFor="termsRightToDividends" className="font-medium">
                Direito a Dividendos
              </Label>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Os detentores de tokens terão direito a uma parte dos lucros da empresa
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <input 
              type="checkbox" 
              id="termsVotingRights" 
              className="h-4 w-4 mt-1 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" 
              checked={formData.termsVotingRights}
              onChange={(e) => handleCheckboxChange("termsVotingRights", e.target.checked)}
            />
            <div className="ml-3">
              <Label htmlFor="termsVotingRights" className="font-medium">
                Direito a Voto
              </Label>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Os detentores de tokens terão direito a voto em decisões estratégicas da empresa
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4">
        <h3 className="font-medium text-lg mb-4">Período de Bloqueio (Lockup)</h3>
        
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
          Defina o período mínimo durante o qual os investidores não poderão vender seus tokens
        </p>
        
        <div className="max-w-xs">
          <Select 
            name="termsLockupPeriod" 
            value={formData.termsLockupPeriod} 
            onValueChange={(value) => handleSelectChange("termsLockupPeriod", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione o período de bloqueio" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">Sem período de bloqueio</SelectItem>
              <SelectItem value="3">3 meses</SelectItem>
              <SelectItem value="6">6 meses</SelectItem>
              <SelectItem value="12">12 meses</SelectItem>
              <SelectItem value="18">18 meses</SelectItem>
              <SelectItem value="24">24 meses</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-100 dark:border-amber-800">
        <h4 className="font-medium text-amber-800 dark:text-amber-300 mb-2">
          Importante sobre Termos
        </h4>
        <p className="text-sm text-amber-700 dark:text-amber-400">
          Os termos definidos aqui serão incluídos no contrato inteligente (smart contract) dos tokens e não poderão
          ser alterados após a criação da oferta. Certifique-se de que estão alinhados com sua estratégia de negócios.
        </p>
      </div>
    </div>
  );
};

export default TermsStep;
