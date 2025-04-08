
import React from "react";
import { Calculator, DollarSign, PieChart } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface TokenizationStepProps {
  formData: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const TokenizationStep = ({ formData, handleInputChange }: TokenizationStepProps) => {
  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="tokenName">Nome do Token</Label>
        <Input 
          id="tokenName"
          name="tokenName"
          value={formData.tokenName}
          onChange={handleInputChange}
          placeholder="Ex: GreenTech Solutions Token"
          className="mt-1"
          required
        />
      </div>
      
      <div>
        <Label htmlFor="tokenSymbol">Símbolo do Token</Label>
        <Input 
          id="tokenSymbol"
          name="tokenSymbol"
          value={formData.tokenSymbol}
          onChange={handleInputChange}
          placeholder="Ex: GTS"
          className="mt-1"
          maxLength={5}
          required
        />
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Use 3-5 caracteres maiúsculos para o símbolo do token
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="tokenPrice">
            <span className="flex items-center">
              <DollarSign className="h-4 w-4 mr-1" />
              Preço por Token (R$)
            </span>
          </Label>
          <Input 
            id="tokenPrice"
            name="tokenPrice"
            value={formData.tokenPrice}
            onChange={handleInputChange}
            placeholder="5.00"
            className="mt-1"
            type="number"
            step="0.01"
            min="0.01"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="totalTokens">
            <span className="flex items-center">
              <Calculator className="h-4 w-4 mr-1" />
              Quantidade Total de Tokens
            </span>
          </Label>
          <Input 
            id="totalTokens"
            name="totalTokens"
            value={formData.totalTokens}
            readOnly
            className="mt-1 bg-slate-50 dark:bg-slate-800"
          />
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Calculado automaticamente (Valor da Captação ÷ Preço por Token)
          </p>
        </div>
      </div>
      
      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
        <h4 className="font-medium flex items-center text-blue-800 dark:text-blue-300 mb-2">
          <PieChart className="h-5 w-5 mr-2" />
          Resumo da Tokenização
        </h4>
        {formData.goalAmount && formData.tokenPrice ? (
          <div className="space-y-2 text-sm">
            <p>
              <span className="text-slate-600 dark:text-slate-300">Valor da Captação:</span>{" "}
              <span className="font-medium">R$ {parseFloat(formData.goalAmount).toLocaleString()}</span>
            </p>
            <p>
              <span className="text-slate-600 dark:text-slate-300">Preço por Token:</span>{" "}
              <span className="font-medium">R$ {parseFloat(formData.tokenPrice).toFixed(2)}</span>
            </p>
            <p>
              <span className="text-slate-600 dark:text-slate-300">Quantidade de Tokens:</span>{" "}
              <span className="font-medium">{formData.totalTokens ? parseInt(formData.totalTokens).toLocaleString() : "-"}</span>
            </p>
            <p>
              <span className="text-slate-600 dark:text-slate-300">Investimento Mínimo:</span>{" "}
              <span className="font-medium">
                {formData.minInvestment ? 
                  `R$ ${parseFloat(formData.minInvestment).toLocaleString()} (${Math.round(parseFloat(formData.minInvestment) / parseFloat(formData.tokenPrice))} tokens)` : 
                  "-"
                }
              </span>
            </p>
          </div>
        ) : (
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Preencha o valor da captação e o preço por token para visualizar o resumo da tokenização.
          </p>
        )}
      </div>
    </div>
  );
};

export default TokenizationStep;
