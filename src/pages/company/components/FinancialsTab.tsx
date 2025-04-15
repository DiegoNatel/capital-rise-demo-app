
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, TrendingUp, Briefcase } from "lucide-react";

interface FinancialsTabProps {
  companyData: any;
}

const FinancialsTab = ({ companyData }: FinancialsTabProps) => {
  return (
    <div className="space-y-8 mt-6">
      <Card>
        <CardHeader>
          <CardTitle>Informações Financeiras</CardTitle>
          <CardDescription>
            Demonstrações financeiras e indicadores
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div>
            <h3 className="font-medium text-lg mb-4">Demonstrativo de Resultados</h3>
            <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-700">
                    <th className="text-left p-3 text-sm font-medium">Item</th>
                    {companyData.financials.years.map((year, index) => (
                      <th key={index} className="text-right p-3 text-sm font-medium">{year}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-slate-200 dark:border-slate-700">
                    <td className="p-3">Receita</td>
                    {companyData.financials.revenue.map((value, index) => (
                      <td key={index} className="text-right p-3">R$ {value.toLocaleString()}</td>
                    ))}
                  </tr>
                  <tr className="border-t border-slate-200 dark:border-slate-700">
                    <td className="p-3">Lucro Bruto</td>
                    {companyData.financials.revenue.map((value, index) => (
                      <td key={index} className="text-right p-3">R$ {Math.round(value * 0.65).toLocaleString()}</td>
                    ))}
                  </tr>
                  <tr className="border-t border-slate-200 dark:border-slate-700">
                    <td className="p-3">Despesas Operacionais</td>
                    {companyData.financials.revenue.map((value, index) => (
                      <td key={index} className="text-right p-3">R$ {Math.round(value * 0.5).toLocaleString()}</td>
                    ))}
                  </tr>
                  <tr className="border-t border-slate-200 dark:border-slate-700 font-medium">
                    <td className="p-3">Lucro Líquido</td>
                    {companyData.financials.profit.map((value, index) => (
                      <td key={index} className="text-right p-3">R$ {value.toLocaleString()}</td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">Indicadores Financeiros</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Calendar className="h-5 w-5 text-slate-500 mr-2" />
                  <h4 className="font-medium">Margem Líquida</h4>
                </div>
                <p className="text-2xl font-semibold">
                  {Math.round((companyData.financials.profit[companyData.financials.profit.length - 1] / companyData.financials.revenue[companyData.financials.revenue.length - 1]) * 100)}%
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Último ano fiscal
                </p>
              </div>
              
              <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <TrendingUp className="h-5 w-5 text-slate-500 mr-2" />
                  <h4 className="font-medium">Taxa de Crescimento</h4>
                </div>
                <p className="text-2xl font-semibold">
                  {companyData.growth}%
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  CAGR 3 anos
                </p>
              </div>
              
              <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Briefcase className="h-5 w-5 text-slate-500 mr-2" />
                  <h4 className="font-medium">ROI Projetado</h4>
                </div>
                <p className="text-2xl font-semibold">
                  32%
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  5 anos (estimativa)
                </p>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">Cap Table</h3>
            <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-700">
                    <th className="text-left p-3 text-sm font-medium">Acionista</th>
                    <th className="text-right p-3 text-sm font-medium">Percentual</th>
                    <th className="text-right p-3 text-sm font-medium">Valor</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-slate-200 dark:border-slate-700">
                    <td className="p-3">Fundadores</td>
                    <td className="text-right p-3">65%</td>
                    <td className="text-right p-3">R$ {(companyData.valuation * 0.65).toLocaleString()}</td>
                  </tr>
                  <tr className="border-t border-slate-200 dark:border-slate-700">
                    <td className="p-3">Investidores Anjo</td>
                    <td className="text-right p-3">15%</td>
                    <td className="text-right p-3">R$ {(companyData.valuation * 0.15).toLocaleString()}</td>
                  </tr>
                  <tr className="border-t border-slate-200 dark:border-slate-700">
                    <td className="p-3">Tokenholders</td>
                    <td className="text-right p-3">12%</td>
                    <td className="text-right p-3">R$ {(companyData.valuation * 0.12).toLocaleString()}</td>
                  </tr>
                  <tr className="border-t border-slate-200 dark:border-slate-700">
                    <td className="p-3">Pool de Opções</td>
                    <td className="text-right p-3">8%</td>
                    <td className="text-right p-3">R$ {(companyData.valuation * 0.08).toLocaleString()}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <div className="w-full flex justify-end space-x-4">
            <Button variant="outline">Atualizar Dados</Button>
            <Button variant="outline">Fazer Upload de Documentos</Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default FinancialsTab;
